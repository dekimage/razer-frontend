import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
import { withContext } from "../Context/AppProvider";
import Link from "next/link";
import Modal from "../Reactstrap/Modal";
import LockSection from "../LockSection/LockSection";

import debounce from "debounce";
import SearchCard from "./SearchCard/SearchCard";

import SearchSVG from "../../assets/fonts/searchBlack.svg";
import closeIcon from "../../assets/fonts/closeBlack.svg";

import "./style.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      result: [],
      isSearching: false,
    };
    this.onSearch = debounce(this.onSearch.bind(this), 1000);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSearch(value) {
    const { search } = this.state;
    if (search.length > 0) {
      this.setState({ isSearching: true });
      strapi
        .getEntries("cards", { name_contains: value })
        .then((res) => this.setState({ result: res, isSearching: false }));
    }
  }

  onChange(e) {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    this.setState(() => ({ search: value }));
    this.setState({ isSearching: true });
    if (value.length > 0) {
      this.onSearch(value);
    }
    if (value.length < 1) {
      this.setState({ result: [] });
    }
  }

  onClose(e) {
    if (e) {
      e.persist();
    }
    this.setState({ search: "", result: [], isSearching: false });
  }

  render() {
    const { search, result, isSearching } = this.state;
    const {
      context: { user, checkCardLockStatus },
    } = this.props;

    const openCardsResult =
      result &&
      result.filter(
        (card) =>
          card.isOpen ||
          (!card.isOpen &&
            user &&
            checkCardLockStatus(card, user).status == "open")
      );

    const lockedCardsResult =
      result &&
      result.filter(
        (card) =>
          (!card.isOpen &&
            user &&
            checkCardLockStatus(card, user).status != "open") ||
          (!card.isOpen && !user)
      );
    return (
      <div className="searchBox">
        <div className="btn-search">
          <img src={SearchSVG} style={{ height: "15px" }} />
        </div>
        <input
          type="text"
          value={search}
          onChange={this.onChange}
          placeholder="Search Cards"
        />
        {search.length > 0 && (
          <div className="btn-search clear" onClick={() => this.onClose()}>
            <img src={closeIcon} style={{ height: "15px" }} />
          </div>
        )}

        {search.length > 0 && (
          <div
            className="search-background"
            onClick={() => this.onClose()}
          ></div>
        )}
        {search.length > 0 && (
          <div className="searchResult-box">
            <div className="search-label section-subHeader">
              {!isSearching && (
                <div>
                  Search Results for: "
                  <span style={{ color: "black" }}>{search}</span>"
                </div>
              )}
              {isSearching && "Searching..."}
            </div>
            <div className="searchResult-scrollable">
              {!isSearching && result.length === 0 && search.length > 0 && (
                <div>No Results Found...</div>
              )}

              {openCardsResult && openCardsResult.length > 0 && (
                <div className="lockedCardsLabel text-header">Open Cards:</div>
              )}
              {openCardsResult &&
                openCardsResult.length > 0 &&
                openCardsResult.map((card, i) => (
                  <div key={i} onClick={() => this.onClose()}>
                    <Link as={`/card/${card.id}`} href={`/card?id=${card.id}`}>
                      <div>
                        <SearchCard key={i} card={card} locked={false} />
                      </div>
                    </Link>
                  </div>
                ))}

              {lockedCardsResult && lockedCardsResult.length > 0 && (
                <div className="lockedCardsLabel text-header">
                  Locked Cards:
                </div>
              )}
              {lockedCardsResult &&
                lockedCardsResult.length > 0 &&
                lockedCardsResult.map((card, i) => (
                  <Modal
                    title="Card Requirements"
                    className="unlockModal"
                    trigger={<SearchCard key={i} card={card} locked />}
                    key={i}
                  >
                    <LockSection card={card} context={this.props.context} />
                  </Modal>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withContext(Search);
