import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import ProgressBar from "./../components/ProgressBar/ProgressBar";

import "../styles/pages/upgrades.scss";

import iconCheckmark from "../assets/fonts/checkmark.svg";
import iconCheckmarkFill from "../assets/fonts/checkmark-fill.svg";
import coinIcon from "../assets/fonts/coin.svg";
import diamondIcon from "../assets/fonts/diamond-currency.svg";
import arrowIcon from "../assets/fonts/right-arrow.svg";

const upgrades = [
  {
    image: "test",
    name: "Agility",
    current: 7,
    next: 9,
    cost: 25,
    currency: "coin",
    description:
      " Agility decreases time for generating new key. 1 agility = 1 hour faster key gain.",
  },
  {
    image: "flame",
    name: "Flame",
    current: 6,
    next: 5,
    cost: 35,
    currency: "coin",
    description:
      " Agility decreases time for generating new key. 1 agility = 1 hour faster key gain.",
  },
  {
    image: "wisdom",
    name: "Wisdom",
    current: 1,
    next: 2,
    cost: 25,
    currency: "coin",
    description: " xxyz",
  },
  {
    image: "influence",
    name: "Influence",
    current: 3,
    next: 4,
    cost: 1,
    currency: "diamond",
    description: " yyz",
  },
  {
    image: "key-limit",
    name: "Key Limit",
    current: 2,
    next: 3,
    cost: 45,
    currency: "coin",
    description: " suuaa",
  },
];

class Upgrades extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      context: { user, loggedIn },
    } = this.props;

    if (user && user.error) return "Error Loading Profile";
    if (user) {
      return (
        <div className="section-upgrades">
          <div className="upgrade-header">Upgrades</div>
          <div>Spend coins or gems to boost your stats.</div>
          {upgrades.map((upgrade) => {
            return (
              <div className="upgrade">
                <div className="upgrade-image">
                  <img
                    height="60px"
                    src={`http://localhost:1337/${upgrade.image}.png`}
                  />
                </div>
                <div className="upgrade-name">{upgrade.name}:</div>
                <div className="upgrade-stats">
                  <div className="upgrade-stats--currentStat">
                    {upgrade.current}
                  </div>

                  <div className="upgrade-stats--arrow">
                    <img src={arrowIcon} width="18px" />
                  </div>
                  <div className="upgrade-stats--nextStat">{upgrade.next}</div>
                </div>

                <div className="flex-row">
                  <div className="upgrade-cost">
                    <div className="upgrade-cost--value">{upgrade.cost}</div>
                    <img
                      src={upgrade.currency === "coin" ? coinIcon : diamondIcon}
                      width="16px"
                    />
                  </div>
                  <div className="upgrade-button">+</div>
                </div>
              </div>
            );
          })}

          <div className="upgrade-description">
            Agility decreases time for generating new key. 1 agility = 1 hour
            faster key gain.
          </div>
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Upgrades);
