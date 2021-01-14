import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import ProgressBar from "./../components/ProgressBar/ProgressBar";

import "../styles/pages/dashboard.scss";

import iconCheckmark from "../assets/fonts/checkmark.svg";
import iconCheckmarkFill from "../assets/fonts/checkmark-fill.svg";
import coinIcon from "../assets/fonts/coin.svg";
import diamondIcon from "../assets/fonts/diamond-currency.svg";
import arrowIcon from "../assets/fonts/right-arrow.svg";

const tasks = [
  {
    id: 1,
    image: {
      url: "",
    },
    link: "",
    function: "", // link to, open modal, custom function...
    name: "Add your first buddy!",
    description: "",
    isCompleted: true,
    isRepeatable: false,
    rewardCoins: 10,
    rewardGems: 0,
    rewardKeys: 0,
    rewardCards: 0,
  },
  {
    id: 2,
    image: {
      url: "",
    },
    link: "",
    function: "", // link to, open modal, custom function...
    name: "Bookmark your first card!",
    description: "Add your first card to bookmark and save it for later usage.",
    isCompleted: false,
    isRepeatable: false,
    rewardCoins: 10,
    rewardGems: 0,
    rewardKeys: 0,
    rewardCards: 0,
  },
  {
    id: 3,
    image: {
      url: "",
    },
    link: "",
    function: "", // link to, open modal, custom function...
    name: "Learn your first skills!",
    description: "",
    isCompleted: false,
    isRepeatable: false,
    rewardCoins: 10,
    rewardGems: 0,
    rewardKeys: 0,
    rewardCards: 0,
  },
  {
    id: 4,
    image: {
      url: "",
    },
    link: "",
    function: "", // link to, open modal, custom function...
    name: "Upgrade your first power stat!",
    description: "",
    isCompleted: true,
    isRepeatable: false,
    rewardCoins: 10,
    rewardGems: 0,
    rewardKeys: 0,
    rewardCards: 0,
  },
];
const upgrades = [
  {
    image: "agility",
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

class Dashboard extends React.Component {
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
        <div className="section">
          <div className="section-box">
            <div className="header-daily">
              <div>Your daily routine</div>
              <div className="header-progresBar">
                {/* progress */}
                <div className="header-progresBar--label">1/4</div>
                <ProgressBar progress={25} />
              </div>
            </div>
            {tasks.map((task) => {
              return (
                <div className="task">
                  <div className="task-image">img</div>
                  <div className="task-name">{task.name}</div>

                  <img
                    src={task.isCompleted ? iconCheckmark : iconCheckmarkFill}
                    style={{ width: "25px" }}
                  />
                </div>
              );
            })}
          </div>

          <div>Upgrades</div>
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

export default compose(withRouter, securePage, withContext)(Dashboard);
