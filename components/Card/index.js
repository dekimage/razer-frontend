import React from "react";
import Link from "next/link";
import cx from "classnames";
import CommandCenter from "./CommandCenter";
import Tag from "../Tag/Tag";

import Modal from "../Reactstrap/Modal";
import LockSection from "../LockSection/LockSection";

import iconLock1 from "../../assets/fonts/lock1.svg";
import iconLock2 from "../../assets/fonts/lock2.svg";
import iconUnlock from "../../assets/fonts/unlock.svg";
import gemCommon from "../../assets/fonts/gem1.svg";
import gemRare from "../../assets/fonts/gem2.svg";
import gemEpic from "../../assets/fonts/gem3.svg";
import gemLegendary from "../../assets/fonts/gem4.svg";
import iconFlag from "../../assets/fonts/flag-variant.svg";
import iconBanner from "../../assets/fonts/banner.svg";

import "./style.scss";

const Card = ({ card, context }) => {
  const { user } = context;
  const lockState = user && card && context.checkCardLockStatus(card, user);
  // to static data + add correct banners for type/expansion
  const typeBanners = {
    free: iconFlag,
    premium: iconBanner,
    retro: iconFlag,
    legacy: iconBanner,
  };
  // to static data + add correct gems for rarities
  const rarityGems = {
    common: gemCommon,
    rare: gemRare,
    epic: gemEpic,
    legendary: gemLegendary,
    mystic: gemLegendary,
    hidden: gemEpic,
  };

  const CardBody = (cardParams) => {
    const card = cardParams.card;
    const locked = cardParams.locked;
    return (
      <div className={cx("cardBox", { locked: locked })}>
        {/* Locks Icons */}
        <div className="cardBox-lockIcon">
          {((user && !(lockState && lockState.status == "open")) ||
            (!user && !card.isOpen)) && (
            <div className="lockCenter">
              {((lockState && lockState.status == "lockedByKey") ||
                (!user && !!card.locked_by_key)) && (
                <div className="lockImage">
                  <img src={iconLock1} />
                </div>
              )}
              {((lockState && lockState.status == "lockedByXp") ||
                (!user && card.locked_by_xp)) && (
                <div className="lockImage">
                  <img src={iconLock2} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="cardBox--gem">
          <img src={rarityGems[card.rarity]} />
        </div>
        <div className="cardBox--image">
          <div className="cardBox--name">{card.name}</div>
          <div
            className="flex flex-center"
            style={{ borderTop: "1px solid black" }}
          >
            {card.image && (
              <img
                src={`http://localhost:1337${card.image.url}`}
                className="cardBox--art"
              />
            )}
          </div>
        </div>
        <div className="cardBox--description">
          <div className="cardBox--description__box"></div>
        </div>
        <div className="cardBox--description__ribbon">
          {/* <img src={typeBanners[card.type]} /> */}
        </div>
        <div className="cardBox--description__tag">
          <div className="cardBox--description__tag-position">
            {/* <Tag
              name={card.realm.tag.name}
              primaryColor={card.realm.tag.primaryColor}
              secondaryColor={card.realm.tag.secondaryColor}
              textColor={card.realm.tag.textColor}
            /> */}
            {/* Open */}
            {/* Closed */}
            {locked ? (
              <Tag
                name="Locked"
                primaryColor="#303030"
                secondaryColor="#212121"
                textColor="#afafaf"
              />
            ) : (
              <Tag
                name="open"
                primaryColor="#246ee9"
                secondaryColor="#2047ab"
                textColor="white"
              />
            )}

            {/* <Tag
              name="Completed &#10003;"
              primaryColor="#5ec47b"
              secondaryColor="#54AD6D"
              textColor="white"
            />

            <Tag
              name="In Progress"
              primaryColor="#ffb855"
              secondaryColor="#ffa11d"
              textColor="white" 
            /> */}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div key={card.id} className="outerCard">
      <div className="cardBody">
        {console.log(card)}
        {card.realm.logo && (
          <img
            className="cardBox--logo"
            src={`http://localhost:1337${card.realm.logo.url}`}
          />
        )}

        {/* Card Body */}

        {/* Status: Open */}
        {(card.isOpen ||
          (!card.isOpen && user && lockState.status == "open")) && (
          <Link as={`/card/${card.id}`} href={`/card?id=${card.id}`}>
            <a>
              <CardBody card={card} locked={false} />
            </a>
          </Link>
        )}

        {/* Status: User + Locked */}
        {!card.isOpen && user && lockState.status !== "open" && (
          <Modal
            title="Card Requirements"
            trigger={<CardBody card={card} locked={true} />}
          >
            <LockSection card={card} context={context} />
          </Modal>
        )}

        {/* Status: Public + Locked */}
        {!card.isOpen && !user && (
          <Modal
            title="Card Requirements"
            className=""
            trigger={<CardBody card={card} locked={true} />}
          >
            <LockSection card={card} context={context} />
          </Modal>
        )}

        {/* Command Center */}

        {/* Proxy Comand center or not give any info at all? */}
        {/* {!user && card.isOpen && (
          <div>Log in or Sign up to perform actions</div>
        )} */}
      </div>

      {/* Status: User + Open */}
      {/* {(card.isOpen ||
          (!card.isOpen && user && lockState.status == "open")) &&
          lockState.status == "open" && (
            <CommandCenter card={card} context={context} isPage={false} />
          )} */}

      {/* Card Footer */}
      {/* Status: User + Locked */}
      {/* <div className="cardFooter">
        
        {((!card.isOpen && user && lockState.status !== "open") ||
          (!card.isOpen && !user)) && (
          <Modal
            title="Card Requirements"
            className=""
            trigger={<div className="btn-card-unlock">Unlock Card</div>}
          >
            <LockSection card={card} context={context} />
          </Modal>
        )}
      </div> */}
    </div>
  );
};

// Old Btn CTA
// <Link as={`/card/${card.id}`} href={`/card?id=${card.id}`}>
// <div className="btn-card-view">
//   <a>Open</a>
// </div>
// </Link>

export default Card;
