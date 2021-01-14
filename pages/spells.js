import React from "react";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from "next/link";
import Spell from "../components/Spell/Spell";
import Dropdown from "../components/Reactstrap/Dropdown";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import Section from "../components/Section/Section";

import { collectionLinks } from "../data/header";
import { optionsSpellTypes, optionsRealm } from "../data/filters";
import "../styles/pages/spells.scss";

import iconLink from "../assets/fonts/send.svg";

class Spells extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      filters: {
        rarity: "",
        type: "",
        realm: "",
      },
    };

    this.onSearch = this.onSearch.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.filterCards = this.filterCards.bind(this);
    this.filterSpells = this.filterSpells.bind(this);
  }

  setFilters(filterType, value) {
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
    let cards = cardList;
    const { filters } = this.state;
    if (filters.realm) {
      cards = cards.filter((c) => c.realm.name == filters.realm);
    }
    return cards;
  }

  filterSpells(spellList) {
    let spells = spellList;
    const { search, filters } = this.state;
    if (search) {
      spells = spells.filter((s) => s.name.toLowerCase().includes(search));
    }
    if (filters.type) {
      spells = spells.filter((s) => s.type == filters.type.toLowerCase());
    }
    return spells;
  }

  render() {
    const {
      context: { user },
    } = this.props;
    const spells = user && user.spells;
    const cardsWithEmptySpells =
      user &&
      user.completedCards.map((card) => {
        return { ...card, completedSpells: [] };
      });
    const renderSpells = (cards, spells) => {
      spells.forEach((s) => {
        cards.forEach((c) => {
          if (s.card.id == c.id) {
            c.completedSpells.push(s);
          }
        });
      });
      return cards;
    };

    const cardsWithSpells = user && renderSpells(cardsWithEmptySpells, spells);
    // console.log(cardsWithSpells);
    console.log(spells);

    if (user && user.error) return "Error Loading Spells";

    if (user) {
      return (
        <div>
          <SecondaryHeader links={collectionLinks} />
          <Section
            name="Spells"
            description="All life skills and techniques in your pocket."
            image="http://localhost:1337/spellbook.png"
          />

          <div className="flex flex-row flex-center p1">
            <Dropdown
              filterType={"realm"}
              options={optionsRealm}
              filterBy={this.setFilters}
            />
            <Dropdown
              filterType={"type"}
              options={optionsSpellTypes}
              filterBy={this.setFilters}
            />
          </div>

          {/* SPELLS */}
          <div className="spellsContainer">
            {this.filterSpells(user.spells).map((spell, y) => {
              return (
                <Spell spell={spell} key={y} context={this.props.context} />
              );
            })}
          </div>
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Spells);
