import React from "react";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./style.scss";

const RealmCard = ({
  realm: { id, name, cover, logo, tag, area, cards },
  progressTable,
}) => {
  return (
    <div className="realmCard">
      <Link as={`/realm/${id}`} href={`/realm?id=${id}`}>
        <div>
          {/* Remove when assets are done */}
          {cover && (
            <div
              className="coverImage"
              style={{
                backgroundImage: `url(http://localhost:1337${cover.url})`,
              }}
            ></div>
          )}

          {logo && (
            <div className="realmCard-logo">
              <img src={`http://localhost:1337${logo.url}`} />
            </div>
          )}
          <div
            style={{
              padding: ".7rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="text-header" style={{ paddingBottom: ".3rem" }}>
              {name}
            </div>
            {/* <div className="text-subHeader">{area}</div> */}
            <div className="section-cardsCounter">
              <div className="cardsCounter">
                <div className="card-icon">
                  <ion-icon size="small" name="reader"></ion-icon>
                </div>
                <div className="text-subHeader">
                  {/* {cards.filter((card) => card.type == "free").length} Free */}
                  6 Free Cards
                </div>
              </div>

              <div className="cardsCounter">
                <div className="card-icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </div>
                <div className="text-subHeader">
                  {/* {cards.filter((card) => card.type == "premium").length}{" "} */}
                  3 Premium Cards
                </div>
              </div>
            </div>

            {/* If Logged in */}
            {progressTable && (
              <div>
                <ProgressBar progress={progressTable.progress} />
                <div className="progressLabel">
                  <div> {progressTable.progress}% Complete</div>
                  <div>
                    {progressTable.counter}/{progressTable.total}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RealmCard;
