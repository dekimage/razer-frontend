import React, { useState } from "react";
import { withContext } from "../Context/AppProvider";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { GET_CARD } from "../../GQL/Query";
import Link from "next/link";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import LockSection from "../LockSection/LockSection";
import Tag from "../../components/Tag/Tag";
import "../../styles/reactstrap.scss";

import gemCommon from "../../assets/fonts/gem1.svg";
import gemRare from "../../assets/fonts/gem2.svg";
import gemEpic from "../../assets/fonts/gem3.svg";
import gemLegendary from "../../assets/fonts/gem4.svg";

const CardPopover = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const onClose = () => setPopoverOpen(false);
  const { id, name } = props;
  const {
    data: { loading, error, card },
    context,
  } = props;

  // to static data + add correct gems for rarities
  const rarityGems = {
    common: gemCommon,
    rare: gemRare,
    epic: gemEpic,
    legendary: gemLegendary,
    mystic: gemLegendary,
    hidden: gemEpic,
  };

  const { user } = context;
  const lockState = user && card && context.checkCardLockStatus(card, user);
  const cardNameColor = (rarity) => {
    let color;
    if (rarity == "common") {
      color = "#246ee9";
    }
    if (rarity == "rare") {
      color = "#ffa11d";
    }
    if (rarity == "epic") {
      color = "#5c16c5";
    }
    if (rarity == "legendary") {
      color = "#ff1053";
    }
    return color;
  };

  if (error) return "Error Loading Card Link";
  if (card) {
    return (
      <div style={{ display: "inline-block", position: "relative" }}>
        <div
          id={"Popover-" + id}
          type="button"
          className="card-popover-btn"
          onClick={() => toggle()}
          onBlur={() => onClose()}
        >
          <div className="card-popover-btn-monkey">
            {card.image && (
              <img
                src={`http://localhost:1337${card.image.url}`}
                style={{ height: "18px" }}
              />
            )}
          </div>
          <div
            className="card-popover-btn-name"
            style={{ color: cardNameColor(card.rarity) }}
          >
            {name}
          </div>
        </div>
        <Popover
          trigger="legacy"
          placement="bottom"
          isOpen={popoverOpen}
          target={"Popover-" + id}
          ref={props.ref}
          {...props}
        >
          <PopoverHeader>
            <div className="card-popover-header">
              <div className="card-popover-header-name">{name}</div>
              {!card.isOpen && user && lockState.status == "open" ? (
                <Tag
                  name="open"
                  primaryColor="#246ee9"
                  secondaryColor="#2047ab"
                  textColor="white"
                />
              ) : (
                <Tag
                  name="Locked"
                  primaryColor="#303030"
                  secondaryColor="#212121"
                  textColor="#afafaf"
                />
              )}
            </div>
          </PopoverHeader>
          <PopoverBody>
            {/* Status: Open */}
            <div className="card-popover-body">
              <div className="card-popover-image">
                {card.image && (
                  <img
                    src={`http://localhost:1337${card.image.url}`}
                    style={{ height: "100px" }}
                  />
                )}
              </div>
              <div className="card-popover-stats">
                <div className="card-popover-stats-realm">
                  {card.logo && (
                    <img
                      src={`http://localhost:1337${card.logo.url}`}
                      style={{ height: "20px" }}
                    />
                  )}
                  {card.realm.name}
                </div>
                <div className="card-popover-stats-expansion">
                  {card.expansion.name}
                </div>
                <div className="card-popover-stats-rarity">
                  <img
                    src={rarityGems[card.rarity]}
                    style={{ height: "1rem", marginRight: ".2rem" }}
                  />

                  {card.rarity}
                </div>
              </div>
            </div>
            <div className="card-popover-cta">
              {/* STATUS: OPEN */}
              {(card.isOpen ||
                (!card.isOpen && user && lockState.status == "open")) && (
                <div style={{ width: "100%" }}>
                  <Link as={`/card/${card.id}`} href={`/card?id=${card.id}`}>
                    <a>
                      <div className="button button-primary">
                        <span className="pr5">View</span>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                    </a>
                  </Link>
                </div>
              )}
            </div>

            {/* Status: Locked */}
            {((user && !(lockState && lockState.status == "open")) ||
              (!user && !card.isOpen)) && (
              <LockSection card={card} context={context} popover />
            )}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
  // loading...
  return (
    <div onBlur={() => onClose()}>
      <Button id="Popover1" type="button">
        Launch Popover
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>Data Loading...</PopoverBody>
      </Popover>
    </div>
  );
};

export default compose(
  withContext,
  graphql(GET_CARD, {
    options: (props) => {
      return {
        variables: {
          id: props.id,
        },
      };
    },
    props: ({ data }) => ({ data }),
  })
)(CardPopover);
