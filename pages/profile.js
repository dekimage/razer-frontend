import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Milestones from "../components/Milestones/Milestones";

import { milestones } from "../data/milestones";

//figure out where import
import iconLock1 from "../assets/fonts/lock1.svg";

import { collectionLinks } from "../data/header";

import "../styles/pages/profile.scss";

const stats = [
  {
    name: "Agility",
    value: 7,
    image: "agility",
  },
  {
    name: "Flame",
    value: 5,
    image: "flame",
  },
  {
    name: "Wisdom",
    value: 2,
    image: "wisdom",
  },
  {
    name: "Influence",
    value: 3,
    image: "influence",
  },
  {
    name: "Key Limit",
    value: 4,
    image: "key-limit",
  },
];

const cards = [
  {
    name: "Deadline",
    image: "",
    time: "4h ago",
  },
];

const RecentCard = ({ card }) => {
  return (
    <Link href={`/card/${card.id}`} key={card.id}>
      <div className="recentCard">
        <div className="recentCard-name">
          {card.logo && (
            <div className="recentCard-realm">
              <img
                src={`http://localhost:1337${card.logo.url}`}
                style={{ width: "20px" }}
              />
            </div>
          )}

          <div className="ml5">{card.name}</div>
        </div>

        {card.image && (
          <div className="recentCard-image">
            <img
              src={`http://localhost:1337${card.image.url}`}
              style={{ width: "150px" }}
            />
          </div>
        )}

        <div className="recentCard-time">3h ago</div>
      </div>
    </Link>
  );
};

const AddBuddy = () => {
  return (
    <div className="addBuddy">
      <div className="addBuddy-button">+</div>
      <div className="addBuddy-label">Add buddy</div>
    </div>
  );
};

const NewModal = () => {
  return <div className="newModal">Hi I am new Modal!</div>;
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addBuddyModal: false,
    };
  }

  render() {
    const {
      context: { user, realmsCardsCount, calculateXpFunction, loggedIn },
    } = this.props;

    const xp = user && user.xp;
    const levelToXpResult = user && calculateXpFunction(xp);
    const level = user && levelToXpResult.level;
    const toNextLevel = user && levelToXpResult.toNextLevel;
    const progress = user && Math.round(levelToXpResult.progress);

    const toNextLevelTotal = xp + (toNextLevel - progress);

    const upcomingMilestones = milestones
      .filter((m) => m.level > level)
      .slice(0, 4);

    const top5Realms =
      realmsCardsCount &&
      realmsCardsCount.sort((a, b) => b.counter - a.counter).slice(0, 5);

    if (user && user.error) return "Error Loading Profile";
    if (user && top5Realms) {
      return (
        <div className="section-dashboard">
          <div className="dashboard-wrapper">
            {/* 1. SECTION WELCOME */}
            <div className="section-welcome">
              {/* 2. SECTION PROFILE */}
              <div className="profile">
                <div className="profile-link">
                  <Link href="/profile">
                    <a>
                      <div className="viewMore">
                        <div className="pr5"> Edit</div>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                    </a>
                  </Link>
                </div>

                <div className="profile-avatar">
                  <img src="" />
                </div>
                <div className="text-header">Deni</div>
                <div className="text-small">Level {level}</div>
                <div className="profile-xpBar">
                  <div
                    className="profile-xpBar--filled"
                    style={{ "--progress": (progress / toNextLevel) * 100 }}
                  ></div>
                </div>
                <div className="text-small">
                  {progress}/{toNextLevel}
                </div>
                {/* TOTAL XP / TOTAL TO NEXT */}
                {/* <div className="text-small">
                  {xp}/{toNextLevelTotal}
                </div> */}
              </div>
            </div>
            {/* 3. SECTION STATS */}
            <div className="text-header">Stats:</div>
            <div className="section-stats">
              {stats.map((stat) => {
                return (
                  <div className="stat">
                    <div className="stat-image">
                      <img
                        height="40px"
                        src={`http://localhost:1337/${stat.image}.png`}
                      />
                    </div>
                    <div className="stat-name">{stat.name}</div>
                    <div className="stat-value">{stat.value}</div>
                  </div>
                );
              })}
            </div>
            {/* 4. SECTION CARDS */}
            <div className="flex-row align-center justify-between pb1 mb1">
              <div className="text-header">Recently Learned (12):</div>
              <Link href="/completed">
                <a>
                  <div className="viewMore">
                    <div className="pr5"> View All</div>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </a>
              </Link>
            </div>
            <div className="recentCards-list">
              {user &&
                user.completedCards.map((c, i) => {
                  return <RecentCard card={c} />;
                })}
            </div>
            {/* 5. SECTION BUDDIES */}
            <div className="flex-row align-center justify-between pb1 mb1">
              <div className="text-header">Your buddies (3):</div>
              <Link href="/completed">
                <a>
                  <div className="viewMore">
                    <div className="pr5"> View All</div>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                </a>
              </Link>
            </div>
            <div className="buddies-list">
              <div className="buddy">
                <div className="buddy-name">Smiki</div>
                <div className="buddy-image"></div>

                <div className="buddy-key">Next key:</div>
                <div className="buddy-timer">12:34:30</div>
                <div className="buddy-card-label">Last Learned Card:</div>
                <div className="buddy-card">Strategic Thinking</div>
              </div>
              <div
                onClick={() => {
                  this.setState({ addBuddyModal: true });
                }}
              >
                <AddBuddy />
              </div>

              <AddBuddy />
              <AddBuddy />
              <AddBuddy />
            </div>
            {/* //continue new modal ;) */}
            <NewModal />
            {/* 3. SECTION REALMS PROGRESS */}
            <div className="section-realms-progress">
              <div className="progressRealms">
                <div className="flex-row align-center justify-between pb1 mb1">
                  <div className="text-header">Your Progress</div>

                  <Link href="/realms">
                    <a>
                      <div className="viewMore">
                        <div className="pr5"> View All</div>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                    </a>
                  </Link>
                </div>
                <div>
                  {top5Realms.map((realm, i) => {
                    return (
                      <div className="progressRealmItem" key={i}>
                        <Link
                          as={`/realm/${realm.id}`}
                          href={`/realm?id=${realm.id}`}
                        >
                          <div className="flex-row">
                            <div>
                              {realm.logo && (
                                <img
                                  src={`http://localhost:1337${realm.logo}`}
                                  height={"25px"}
                                  className="pr5"
                                />
                              )}
                            </div>
                            <div className="progressRealmItem-name">
                              {realm.name}
                            </div>
                          </div>
                        </Link>

                        <div>
                          <ProgressBar progress={realm.progress} />
                          <div className="progressRealmItem-bar">
                            <div> {realm.progress}% Complete</div>
                            <div>
                              {realm.counter}/{realm.total} Cards
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 4. REWARDS MILESTONES PROGRESS */}
              <Milestones
                isFullView={false}
                milestones={upcomingMilestones}
                level={level}
              />

              {/* <FOOTER></FOOTER> */}
            </div>
          </div>
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Profile);
