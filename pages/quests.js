import React from "react";
import { withRouter } from "next/router";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import { withContext } from "../components/Context/AppProvider";
import Link from "next/link";
import cx from "classnames";

import Modal from "../components/Reactstrap/Modal";
import QuestModal from "../components/Modals/QuestModal/QuestModal";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import Section from "../components/Section/Section";
import { collectionLinks } from "../data/header";

import "../styles/pages/quests.scss";

class Quests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "active",
    };
  }

  render() {
    const { context } = this.props;
    const { user } = context;
    const { filter } = this.state;
    if (user && user.error) return "Error Loading Quests";
    if (user) {
      return (
        <>
          <SecondaryHeader links={collectionLinks} />
          <Section
            name="Quests"
            description="Do real life challenges to complete quests."
            image="http://localhost:1337/spellbook.png"
          />
          <div className="quests">
            <div className="inventory--filters">
              <div
                className={cx("inventory--filters__item", {
                  active: filter == "active",
                })}
                onClick={() => {
                  this.setState({ filter: "active" });
                }}
              >
                Active
              </div>
              <div
                className={cx("inventory--filters__item", {
                  active: filter == "completed",
                })}
                onClick={() => {
                  this.setState({ filter: "completed" });
                }}
              >
                Completed
              </div>
            </div>
            <div className="questsWrapper">
              {filter == "active" &&
                user.questedCards &&
                (user.questedCards.length > 0 ? (
                  <div className="questsContainer">
                    {user.questedCards.map((card, i) => {
                      return (
                        <div className="quest--trigger" key={i}>
                          <Modal
                            title={`"${card.quest.name}"`}
                            trigger={
                              <div className="quest">
                                <div className="quest--number">{i + 1}</div>
                                <div className="flex flex-column flex-grow justify-between">
                                  <div className="quest--name">
                                    "{card.quest.name}"
                                  </div>
                                  <div className="flex flex-row justify-between">
                                    <div className="quest--card">
                                      From:
                                      <span className="quest--cardLink">
                                        {card.name}
                                      </span>
                                    </div>
                                    <div className="quest--status">active</div>
                                  </div>
                                </div>
                                <div className="quest--mark  active">?</div>
                              </div>
                            }
                          >
                            <QuestModal card={card} context={context} />
                          </Modal>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>You have no open quests</div>
                ))}
              {filter == "completed" &&
                user.completedCards &&
                (user.completedCards.length > 0 ? (
                  <div className="questsContainer">
                    {user.completedCards.map((card, i) => {
                      return (
                        <div className="quest--trigger" key={i}>
                          <Modal
                            title={`Quest: ${card.quest.name}`}
                            trigger={
                              <div className="quest">
                                <div className="quest--number">{i + 1}</div>
                                <div className="flex flex-column flex-grow justify-between">
                                  <div className="quest--name">
                                    "{card.quest.name}"
                                  </div>
                                  <div className="flex flex-row justify-between">
                                    <div className="quest--card">
                                      From:
                                      <Link href={`/card/${card.id}`}>
                                        <span className="quest--cardLink">
                                          {card.name}
                                        </span>
                                      </Link>
                                    </div>
                                    <div className="quest--status">
                                      completed
                                    </div>
                                  </div>
                                </div>
                                <div className="quest--mark complete">
                                  &#10004;
                                </div>
                              </div>
                            }
                          >
                            <QuestModal card={card} context={context} />
                          </Modal>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>You have no completed Quests yet.</div>
                ))}
            </div>
          </div>
        </>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Quests);
