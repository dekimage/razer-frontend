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

class Profile extends React.Component {
  constructor(props) {
    super(props);
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
              <div className="welcome-box">
                <div className="text-header">Welcome Back Deni!</div>
                <div>Here is how you are doing today.</div>
              </div>

              {/* 2. SECTION PROFILE */}
              <div className="profile">
                <div className="profile-link">
                  <Link href="/profile">
                    <a>
                      <div className="progressRealms__viewMore">
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

            {/* 3. SECTION REALMS PROGRESS */}
            <div className="section-realms-progress">
              <div className="progressRealms">
                <div className="flex-row align-center justify-between pb1 mb1">
                  <div className="text-header">Your Progress</div>

                  <Link href="/realms">
                    <a>
                      <div className="progressRealms__viewMore">
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
