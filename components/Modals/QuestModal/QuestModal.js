// import Dust from "../../Inventory/Dust/Dust";
import Link from "next/link";
import iconXp from "../../../assets/fonts/xp.svg";
// import "./style.scss";
const QuestModal = ({ card, context }) => {
  return (
    <>
      {card.quest && (
        <div className="questModal">
          <div className="questModal--cardLink">
            From Card:{" "}
            <Link href={`/card/${card.id}`}>
              <a>{card.name}</a>
            </Link>
          </div>
          <div className="questModal--story">
            <div className="text-header">Story:</div>
            <div className="text-small">{card.quest.story}</div>
          </div>
          <div className="questModal--story">
            <div className="text-header">Requirements:</div>
            <div className="text-small">{card.quest.requirements}</div>
          </div>
          <div className="questModal--story">
            <div className="text-header">Rewards:</div>
            <div className="questModal--rewards">
              {/* <Dust itemComponent={card.item} src={"quest"} /> */}
              <div className="questModal--rewards__dust">
                <div className="questModal--rewards__dust-quantity">1</div>
                <img
                  src={`http://localhost:1337${card.item.image[0].url}`}
                  style={{ width: "75px" }}
                />
              </div>
              <div className="questModal--rewards__xp">
                + {card.xp} XP
                <img src={iconXp} style={{ height: "20px" }} />
              </div>
            </div>
          </div>

          {/* Action Center Buttons */}
          {context.checkToggle(card.id, "questedCards") ? (
            <div className="questModal--buttonBox">
              {/* Card is Quested */}
              {/* <div className="button-wrapper"> */}
              <div
                className="button button-primary mr1"
                onClick={() => {
                  context.onComplete(card, true);
                  context.onSaveFavorBuild(card, false, "questedCards");
                }}
              >
                Complete Quest
                {/* </div> */}
              </div>

              <div
                className="button button-secondary ml1"
                onClick={() =>
                  context.onSaveFavorBuild(card, false, "questedCards")
                }
              >
                Abandon Quest
              </div>
            </div>
          ) : (
            <div className="questModal--buttonBox">
              {/* Card is not Quested - check complete */}
              {context.checkToggle(card.id, "completedCards") ? (
                <div
                  className="button button-secondary"
                  onClick={() => context.onComplete(card, false)}
                >
                  Forget Quest
                </div>
              ) : (
                <div
                  className="button button-primary"
                  onClick={() =>
                    context.onSaveFavorBuild(card, true, "questedCards")
                  }
                >
                  Start Quest
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuestModal;
