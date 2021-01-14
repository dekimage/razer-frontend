import React from "react";
import { Button } from "reactstrap";
import cx from "classnames";

import "../../styles/reactstrap.scss";
import iconCheckmark from "../../assets/fonts/tick.svg";
import iconHeart from "../../assets/fonts/heart.svg";
import iconBookmark from "../../assets/fonts/bookmark.svg";
import iconLego from "../../assets/fonts/lego.svg";

import iconCheckmark_off from "../../assets/fonts/check-mark.svg";
import iconHeart_off from "../../assets/fonts/heart-off.svg";
import iconBookmark_off from "../../assets/fonts/bookmark-off.svg";
import iconLego_off from "../../assets/fonts/lego-off.svg";

const CommandCenter = ({ card, context, isPage }) => {
  return (
    <div
      className="commandCenter"
      style={{
        flexDirection: "row",
        paddingLeft: isPage ? "0" : ".5rem",
      }}
    >
      {/* completed toggle */}
      {!isPage &&
        (context.checkToggle(card.id, "completedCards") ? (
          <div
            className="commandCenter--button toolTip"
            style={{ margin: "1rem 0" }}
            onClick={() => context.onComplete(card, false)}
          >
            <span className="toolTip tooltiptext">Undo Completion</span>
            <img src={iconCheckmark} style={{ height: "25px" }} />
          </div>
        ) : (
          <div
            className="commandCenter--button toolTip"
            style={{ margin: "1rem 0" }}
            onClick={() => context.onComplete(card, true)}
          >
            <span className="toolTip tooltiptext">Mark Complete</span>
            <img src={iconCheckmark_off} style={{ height: "25px" }} />
          </div>
        ))}

      {!!isPage &&
        (context.checkToggle(card.id, "completedCards") ? (
          <div
            className="commandCenter--pageButton"
            onClick={() => context.onComplete(card, false)}
          >
            Complete
          </div>
        ) : (
          <div
            className="commandCenter--pageButton toolTip"
            onClick={() => context.onComplete(card, true)}
          >
            Completed
          </div>
        ))}

      {/* save for later toggle */}
      {context.checkToggle(card.id, "savedLater") ? (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() => context.onSaveFavorBuild(card, false, "savedLater")}
        >
          <span className="toolTip tooltiptext">Remove from Saved</span>
          <img src={iconBookmark} style={{ height: "25px" }} />
        </div>
      ) : (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() => context.onSaveFavorBuild(card, true, "savedLater")}
        >
          <span className="toolTip tooltiptext">Save for Later</span>
          <img src={iconBookmark_off} style={{ height: "25px" }} />
        </div>
      )}
      {/* favorites toggle */}
      {context.checkToggle(card.id, "favouriteCards") ? (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() =>
            context.onSaveFavorBuild(card, false, "favouriteCards")
          }
        >
          <span className="toolTip tooltiptext">Remove from Favorites</span>
          <img src={iconHeart} style={{ height: "25px" }} />
        </div>
      ) : (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() => context.onSaveFavorBuild(card, true, "favouriteCards")}
        >
          <span className="toolTip tooltiptext">Add to Favorites</span>
          <img src={iconHeart_off} style={{ height: "25px" }} />
        </div>
      )}
      {/* add to build toggle */}
      {context.checkToggle(card.id, "buildCards") ? (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() => context.onSaveFavorBuild(card, false, "buildCards")}
        >
          <span className="toolTip tooltiptext">Remove from In-Progress</span>
          <img src={iconLego} style={{ height: "25px" }} />
        </div>
      ) : (
        <div
          className="commandCenter--button toolTip"
          style={{ margin: isPage ? "0 .5rem" : "1rem 0" }}
          onClick={() => context.onSaveFavorBuild(card, true, "buildCards")}
        >
          <span className="toolTip tooltiptext">Add In Progress</span>
          <img src={iconLego_off} style={{ height: "25px" }} />
        </div>
      )}
    </div>
  );
};

export default CommandCenter;
