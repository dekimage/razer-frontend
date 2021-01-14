import Link from "next/link";
import Tag from "../Tag/Tag";
import iconLock1 from "../../assets/fonts/lock1.svg";
import iconLock2 from "../../assets/fonts/lock2.svg";

import "./style.scss";

const LockSection = (props) => {
  const { context, card, popover = false } = props;
  const user = context && context.user;
  const level = context && user && context.calculateXpFunction(user.xp).level;
  const cardLevel =
    context &&
    card &&
    card.locked_by_xp &&
    context.calculateXpFunction(card.locked_by_xp).level;

  const LoginCta = () => {
    return (
      <div className="section-subHeader">
        <div className="text-small mt5 flex justify-center">
          Log in to check requirements
        </div>
        <div className="button button-primary mt5">Log in</div>
        <div className="text-small mt5 flex justify-center">
          Don't have account?
        </div>
        <div className="button button-secondary mb5 mt5">Join For Free</div>
      </div>
    );
  };

  return (
    <>
      {!popover && (
        <div className="lockSection section-subHeader">
          {/* LOCKED BY KEY */}
          {!!card.locked_by_key && (
            <div className="locker-wrapper">
              <div className="locker">
                <img src={iconLock1} style={{ width: "50px" }} />
              </div>

              <div className="locker-container">
                <Tag
                  name="Locked"
                  primaryColor="#303030"
                  secondaryColor="#212121"
                  textColor="#afafaf"
                />
              </div>

              <div className="locker-wrapper__text">
                Requires{" "}
                <span style={{ color: "black", fontWeight: "600" }}>
                  {card.locked_by_key.name}
                </span>{" "}
                from expansion set {""}
                <span style={{ color: "black", fontWeight: "600" }}>
                  <Link
                    href={`/expansion/${card.expansion.id}`}
                    as={`/expansion/${card.expansion.id}`}
                  >
                    <a>{card.expansion.name}</a>
                  </Link>
                </span>{" "}
                to unlock this card.
              </div>

              {context.user && (
                <div className="section-subHeader">
                  <Link
                    href={`/expansion/${card.expansion.id}`}
                    as={`/expansion/${card.expansion.id}`}
                  >
                    <div className="button button-primary mb5 mt1">
                      <a>View Expansion</a>
                    </div>
                  </Link>
                </div>
              )}

              {!context.user && <LoginCta />}
            </div>
          )}

          {/* LOCKED BY XP */}
          {card.locked_by_xp && (
            <div className="locker-wrapper">
              <div className="locker">
                <img src={iconLock2} style={{ width: "50px" }} />
              </div>
              <div className="locker-container">
                <div className="locker-container-tag">
                  <Tag
                    name="Locked"
                    primaryColor="#303030"
                    secondaryColor="#212121"
                    textColor="#afafaf"
                  />
                </div>
              </div>
              <div className="section-subHeader">
                <div className="locker-wrapper__text">
                  Requires&nbsp;
                  <span style={{ color: "black", fontWeight: "600" }}>
                    Level {cardLevel}&nbsp;
                  </span>
                  to unlock this card.
                </div>
              </div>

              {context.user && (
                <div className="section-subHeader">
                  <div className="locker-wrapper__text">
                    You are currently&nbsp;
                    <span style={{ color: "black", fontWeight: "600" }}>
                      Level {level}
                    </span>
                    .
                  </div>
                  <div className="button button-primary mb5 mt1">
                    How do I level up?
                  </div>
                </div>
              )}
              {!context.user && <LoginCta />}
            </div>
          )}
        </div>
      )}

      {/* Popover Locker Section - Minified */}
      {popover && (
        <div className="lockSection">
          {!!card.locked_by_key && (
            <div>
              <div className="locker">
                <img src={iconLock1} />
              </div>
              Locked By Key:{card.locked_by_key[0].id}
              <div>
                Requires
                <Link
                  href={`/expansion/${card.expansion.id}`}
                  as={`/expansion/${card.expansion.id}`}
                >
                  <a>{card.expansion.name}</a>
                </Link>
                pruchased.
              </div>
            </div>
          )}
          {card.locked_by_xp && (
            <div>
              <div className="locker">
                <img src={iconLock2} style={{ width: "50px" }} />
              </div>
              {context.user && (
                <div>
                  <div>Requires level: {card.xp}</div>
                  <div>Your current level is: {level}</div>
                </div>
              )}
              {!context.user && (
                <div>
                  <div>Requires level experience: ${card.locked_by_xp}</div>
                  <div>Sign up / Log In to start leveling! ==> CTA LOGIN</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LockSection;
