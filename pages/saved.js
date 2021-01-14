import { withRouter } from "next/router";
import Link from "next/link";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import securePage from "../hocs/securePage";

import { withContext } from "../components/Context/AppProvider";

import { GET_ALL_CARDS } from "../GQL/Query";

import Dropdown from "../components/Reactstrap/Dropdown";

import {
  Button,
  Card as CardElement,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import Card from "../components/Card";

class Completed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      filters: {
        rarity: "",
        type: "",
        realm: ""
      }
    };
    this.onSearch = this.onSearch.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.filterCards = this.filterCards.bind(this);
  }

  setFilters(filterType, value) {
    this.setState({
      filters: {
        ...this.state.filters,
        [filterType]: value
      }
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
      cards = cards.filter(c => c.name.toLowerCase().includes(search));
    }
    if (filters.rarity) {
      cards = cards.filter(c => c.rarity == filters.rarity);
    }
    if (filters.type) {
      cards = cards.filter(c => c.type == filters.type);
    }
    if (filters.realm) {
      cards = cards.filter(c => c.realm.name == filters.realm);
    }
    return cards;
  }

  render() {
    //static files
    const optionsRarity = [
      "common",
      "rare",
      "epic",
      "legendary",
      "mystic",
      "hidden"
    ];
    const optionsType = ["free", "premium", "retro", "legacy"];
    const optionsRealm = ["Visionary's Desert", "Ninja's Productivity"];

    const { dataCards, context } = this.props;
    if (context.dataUser.error) return "Error Loading Cards";
    if (context.dataUser.user && !context.dataUser.loading && context.user) {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Row>
            <Col>
              <div>Search:</div>
              <input
                type="text"
                value={this.state.search}
                onChange={this.onSearch}
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Dropdown
              filterType={"realm"}
              options={optionsRealm}
              filterBy={this.setFilters}
            />
            <Dropdown
              filterType={"rarity"}
              options={optionsRarity}
              filterBy={this.setFilters}
            />
            <Dropdown
              filterType={"type"}
              options={optionsType}
              filterBy={this.setFilters}
            />
          </div>

          <Row>
            <Col xs="9" style={{ padding: 0 }}>
              <div style={{ display: "inline-block" }} className="h-100">
                {this.filterCards(context.user.savedLater).map(card => (
                  <Card
                    card={card}
                    dataUser={context.dataUser}
                    context={context}
                  />
                ))}
              </div>
            </Col>
          </Row>
          {/* ALL CARDS */}
          <Row>
            <Col xs="9" style={{ padding: 0 }}>
              <div style={{ display: "inline-block" }} className="h-100">
                {dataCards.cards.map(card => (
                  <Card
                    card={card}
                    dataUser={context.dataUser}
                    context={context}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    return <h1>Loading</h1>;
  }
}

export default compose(
  withRouter,
  securePage,
  withContext,
  graphql(GET_ALL_CARDS, { name: "dataCards" })
)(Completed);
