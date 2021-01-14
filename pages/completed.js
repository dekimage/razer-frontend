import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import cx from "classnames";

import Dropdown from "../components/Reactstrap/Dropdown";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import Section from "../components/Section/Section";

import { collectionLinks } from "../data/header";
import { optionsRarity, optionsType, optionsRealm } from "../data/filters";
import Card from "../components/Card";

import "../styles/pages/inventory.scss";
import "../styles/pages/collection_cards.scss";

//Static Data
const links = [
  {
    label: "Completed",
    href: "completed",
    as: "completed",
  },
  {
    label: "Watched",
    href: "watched",
    as: "watched",
  },
  {
    label: "Saved",
    href: "saved",
    as: "saved",
  },
  {
    label: "Favorites",
    href: "favorites",
    as: "favorites",
  },
];

class Completed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      filters: {
        rarity: "",
        realm: "",
      },
      showFilters: true,
      filter: "Completed",
    };
    this.onSearch = this.onSearch.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.filterCards = this.filterCards.bind(this);
  }

  setFilters(filterType, value) {
    filterType = filterType.toLowerCase();
    this.setState({
      filters: {
        ...this.state.filters,
        [filterType]: value,
      },
    });
  }

  onSearch(e) {
    const value = e.target.value.toLowerCase();
    this.setState(() => ({ search: value }));
  }

  filterCards(cardList) {
    const { search, filters } = this.state;
    let cards = cardList;
    if (search) {
      cards = cards.filter((c) => c.name.toLowerCase().includes(search));
    }
    if (filters.rarity) {
      cards = cards.filter((c) => c.rarity == filters.rarity.toLowerCase());
    }
    if (filters.realm) {
      cards = cards.filter((c) => c.realm.name == filters.realm);
    }
    return cards;
  }

  render() {
    const { context } = this.props;
    const { user } = context;
    const { filter } = this.state;
    let userCards;
    let sectionLabelName;

    //do same label for description
    //do same label for image
    if (user && filter == "Completed") {
      userCards = user.completedCards || [];
      sectionLabelName = "Completed Cards";
    }
    if (user && filter == "Progress") {
      userCards = user.questedCards || [];
      sectionLabelName = "Cards In Progress";
    }
    if (user && filter == "Saved") {
      userCards = user.savedLater || [];
      sectionLabelName = "Cards Saved For Later";
    }
    if (user && filter == "Favorites") {
      userCards = user.favouriteCards || [];
      sectionLabelName = "Favorite Cards";
    }
    //experimental active build tab?
    if (user && filter == "Active") {
      userCards = user.buildCards || [];
    }

    if (user) {
      return (
        <div>
          <SecondaryHeader links={collectionLinks} />
          {/* INTRO SECTION */}
          <Section
            name={sectionLabelName}
            // description="Show what you are made of."
            description="Complete real life challenges to add cards in collection."
            image="http://localhost:1337/chest.png"
          />

          <div className="collection-page">
            <div className="outer-wrapper">
              <div className="inner-wrapper">
                {/* TABS */}
                <div className="inventory--filters">
                  <div
                    className={cx("inventory--filters__item", {
                      active: filter == "Completed",
                    })}
                    onClick={() => {
                      this.setState({ filter: "Completed" });
                    }}
                  >
                    Completed{" "}
                    {user.completedCards.length > 0 && (
                      <div
                        className={cx("inventory--filters__item--counter", {
                          activeCounter: filter == "Completed",
                        })}
                      >
                        {user.completedCards.length}
                      </div>
                    )}
                  </div>

                  <div
                    className={cx("inventory--filters__item", {
                      active: filter == "Saved",
                    })}
                    onClick={() => {
                      this.setState({ filter: "Saved" });
                    }}
                  >
                    Saved{" "}
                    {user.savedLater.length > 0 && (
                      <div
                        className={cx("inventory--filters__item--counter", {
                          activeCounter: filter == "Saved",
                        })}
                      >
                        {user.savedLater.length}
                      </div>
                    )}
                  </div>
                  <div
                    className={cx("inventory--filters__item", {
                      active: filter == "Favorites",
                    })}
                    onClick={() => {
                      this.setState({ filter: "Favorites" });
                    }}
                  >
                    Favorites
                    {user.favouriteCards.length > 0 && (
                      <div
                        className={cx("inventory--filters__item--counter", {
                          activeCounter: filter == "Favorites",
                        })}
                      >
                        {user.favouriteCards.length}
                      </div>
                    )}
                  </div>
                </div>

                {/* FILTERS */}
                {this.state.showFilters && (
                  <div className="collection-filters">
                    {/* <div className="collection-filters__item">Filter by:</div> */}

                    <div className="collection-filters__item">
                      <Dropdown
                        filterType={"Realm"}
                        options={optionsRealm}
                        filterBy={this.setFilters}
                      />
                    </div>

                    <div className="collection-filters__item">
                      <Dropdown
                        filterType={"Rarity"}
                        options={optionsRarity}
                        filterBy={this.setFilters}
                      />
                    </div>

                    <div className="collection-filters__item">
                      <input
                        className="collection-filters__item--search"
                        placeholder="Filter by name..."
                        type="text"
                        value={this.state.search}
                        onChange={this.onSearch}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="section-cards_collection">
              <div className="cards-wrapper_collection">
                {userCards.length == 0 && (
                  <div className="">No Cards Yet. Click here to learn.</div>
                )}
                {this.filterCards(userCards).map((card, i) => (
                  <Card key={i} card={card} context={context} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <h1>Loading</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Completed);
