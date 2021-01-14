import React from "react";
import Router from "next/router";
import JsxParser from "react-jsx-parser";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { Container } from "reactstrap";
import { withContext } from "../components/Context/AppProvider";
import defaultPage from "../hocs/defaultPage";

import Card from "../components/Card";
import LockSection from "../components/LockSection/LockSection";
import Modal from "../components/Reactstrap/Modal";
import Spell from "../components/Spell/Spell";
import CardPopover from "../components/Reactstrap/CardPopover";
import RealmPopover from "../components/Reactstrap/RealmPopover";
import QuestModal from "../components/Modals/QuestModal/QuestModal";

import { GET_CARD, GET_CARD_PAGE } from "../GQL/Query";

//remove and replace in cms - icons
import gemCommon from "../assets/fonts/gem1.svg";

import "../styles/pages/card.scss";

const DESCRIPTION_MAX = 700;

class CardView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
    };
    this.formatDescription = this.formatDescription.bind(this);
  }

  formatDescription(description) {
    let jsx = description;
    if (description) {
      jsx = jsx
        .replace(/@@/g, "<MagicCardLink name={'")
        .replace(/##/g, "'} id={")
        .replace(/\$\$/g, "} />");

      jsx = jsx
        .replace(/@\*@/g, "<MagicRealmLink name={'")
        .replace(/#\*#/g, "'} id={")
        .replace(/\$\*\$/g, "} />");
    }

    const MagicCardLink = (props) => (
      <CardPopover id={props.id} name={props.name} />
    );
    const MagicRealmLink = (props) => (
      <RealmPopover id={props.id} name={props.name} />
    );

    return (
      <JsxParser components={{ MagicCardLink, MagicRealmLink }} jsx={jsx} />
    );
  }

  render() {
    const {
      data: { loading, error, cardPage },
      reducedData,
      context,
      context: { user },
    } = this.props;

    const card = cardPage || reducedData.card;
    const lockState = user && card && context.checkCardLockStatus(card, user);

    const breadcrumbLinks = card && {
      realm: { id: card.realm.id, name: card.realm.name },
      card: { id: card.id, name: card.name },
    };
    const descriptionLength =
      card && card.description && card.description.length;
    const truncatedDescription =
      card &&
      card.description &&
      card.description.slice(0, DESCRIPTION_MAX).concat("...");

    if (card) {
      return (
        <div>
          {/* <Breadcrumbs links={breadcrumbLinks} /> */}
          {(card.isOpen || (user && lockState.status == "open")) && (
            <div>
              <div
                className="backgroundSection"
                style={
                  card.realm.background
                    ? {
                        backgroundImage: `url(http://localhost:1337${card.realm.background.url})`,
                      }
                    : {}
                }
              >
                <div className="backgroundBlackScreen">
                  <div className="cardImage">
                    {card.image && (
                      <img
                        className="cardImage--img"
                        src={`http://localhost:1337${card.image.url}`}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="card-container">
                <div
                  className="backgroundSection-backArrowContainer"
                  onClick={() => Router.back()}
                >
                  <ion-icon name="arrow-back-outline" size="large"></ion-icon>
                </div>
                <div className="basic-info-section">
                  <div className="cardNameLogoContainer">
                    {card.realm.logo && (
                      <img
                        src={`http://localhost:1337${card.realm.logo.url}`}
                        style={{ height: "50px" }}
                      />
                    )}
                    <div className="cardName section-header">{card.name}</div>
                  </div>
                  {/* <div className="flex flexColumn flex-center">
                    <span className="stats-item--label">Concepts: </span>
                    <span className="extraTags">{card.extraTags}</span>
                  </div> */}
                  <div className="xp-bar"></div>
                  <div className="xp">
                    {card.xp} <span className="stats-item--label">XP</span>
                  </div>

                  {/* ----Stats Section----*/}
                  <div className="stats">
                    <div className="stats-item">
                      <div className="stats-item--label">Rarity</div>
                      <div className="stats-item--value">
                        <img src={gemCommon} height="15px" />
                      </div>
                    </div>

                    <div className="stats-item">
                      <div className="stats-item--label">Type</div>
                      <div className="stats-item--value">{card.type}</div>
                    </div>

                    <div className="stats-item">
                      <div className="stats-item--label">Expansion</div>
                      <div className="stats-item--value">
                        {card.expansion && card.expansion.name}
                      </div>
                    </div>

                    <div className="stats-item">
                      <div className="stats-item--label">Realm</div>
                      <div className="stats-item--value">{card.realm.name}</div>
                    </div>

                    <div className="stats-item">
                      <div className="stats-item--label">Drop</div>
                      <div className="stats-item--value">
                        {card.item && card.item.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---Video section---- */}
                <div className="video-section">
                  {/* <div className="video-buttons">
                    <div className="btn-dependencies">
                      <ion-icon
                        size="small"
                        name="infinite-outline"
                        style={{ paddingRight: ".3rem" }}
                      ></ion-icon>
                      <span>dependencies</span>
                    </div>
                  </div> */}

                  <div className="video">Play</div>
                  <div className="commandCenterBox">
                    {/* Quest Modal */}
                    <div>
                      <Modal
                        title={`Quest: "${card.quest && card.quest.name}"`}
                        trigger={
                          <div className="button button-primary">
                            Open Quest
                          </div>
                        }
                      >
                        <QuestModal card={card} context={context} />
                      </Modal>
                    </div>

                    {/* <--- COMMAND CENTER ---> */}
                    {/* {user && card && (
                      <CommandCenter card={card} context={context} isPage />
                    )} */}
                  </div>
                </div>

                {/* Description Section */}
                <div className="header section-header">Description:</div>
                <div className="description text-content">
                  {descriptionLength > DESCRIPTION_MAX ? (
                    this.state.showMore ? (
                      <div>{this.formatDescription(card.description)}</div>
                    ) : (
                      <div>{this.formatDescription(truncatedDescription)}</div>
                    )
                  ) : (
                    this.formatDescription(card.description)
                  )}
                </div>
                {descriptionLength > DESCRIPTION_MAX && (
                  <div
                    onClick={() => {
                      this.setState({ showMore: !this.state.showMore });
                    }}
                    className="showMore text-subHeader"
                  >
                    {this.state.showMore ? "Show Less" : "Show More"}
                  </div>
                )}

                {/* Spells Section */}
                <div className="header section-header">Spells:</div>
                {card.spells &&
                  card.spells.map((spell, i) => {
                    return <Spell spell={spell} key={i} context={context} />;
                  })}

                {/* Related Cards Section */}
                <div className="header section-header">Related Cards:</div>
                <div className="related-section">
                  {card.relatedCards.map((c, i) => (
                    <Card key={i} card={c} context={context} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {((!card.isOpen && user && lockState.status !== "open") ||
            (!card.isOpen && !user)) && (
            <LockSection card={card} context={context} />
          )}
        </div>
      );
    }
    if (error) return "Error Loading Cards";
    return <h1>Loading...</h1>;
  }
}

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_CARD, {
    name: "reducedData",
    options: (props) => {
      return {
        variables: {
          id: props.router.query.id,
        },
      };
    },
  }),
  graphql(GET_CARD_PAGE, {
    name: "data",
    options: (props) => {
      return {
        variables: {
          id: props.router.query.id,
        },
      };
    },
    props: ({ data }) => ({ data }),
  })
)(CardView);
