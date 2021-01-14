import React from "react";
import { withContext } from "../../Context/AppProvider";

import "../style.scss";

import iconLock1 from "../../../assets/fonts/lock1.svg";
import iconLock2 from "../../../assets/fonts/lock2.svg";
import iconUnlock from "../../../assets/fonts/unlock.svg";

const SearchCard = (props) => {
  const { card, i, locked } = props;

  const lockIcon = iconLock2;
  return (
    <div key={i} className="searchResult-box--item">
      <div className="searchResult-box--item__image">
        {card.image && (
          <img
            src={`http://localhost:1337${card.image.url}`}
            height="60px"
            width="60px"
          />
        )}
      </div>
      <div className="searchResult-box--item__body">
        <div className="flex flex-row align-center">
          <div className="text-medium-header">{card.name}</div>
          {card.realm.logo && (
            <img
              src={`http://localhost:1337${card.realm.logo.url}`}
              height="15px"
              width="20px"
            />
          )}
        </div>

        {/* <div className="search-tags">{card.extraTags}</div> */}
      </div>
      {/* //Locker Section */}
      <div className="locker-box">
        {/* Locked */}
        {locked && (
          <div>
            {!!card.locked_by_key && (
              <div className="locker-box--locker">
                {/* for key params => card.locked_by_keys[0] */}
                <img src={lockIcon} />
              </div>
            )}
            {card.locked_by_xp && (
              <div className="locker-box--locker">
                {/* for xp  params => card.locked_by_xp.id */}
                <img src={lockIcon} />
              </div>
            )}
          </div>
        )}
        {/* Open */}
        {!locked && (
          <div className="play-icon">
            <ion-icon
              size="large"
              name="return-down-forward-outline"
            ></ion-icon>
          </div>
        )}
      </div>
    </div>
  );
};

export default withContext(SearchCard);
