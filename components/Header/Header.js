import React from "react";
import Link from "next/link";
import "./style.scss";
import { links, profile } from "../../data/header";
import Search from "../Search/Search";
import cx from "classnames";

import appNewIcon from "../../assets/fonts/dash-app.svg";
import categoriesNewIcon from "../../assets/fonts/dash-categories.svg";
import shopNewIcon from "../../assets/fonts/dash-shop.svg";
import cardsNewIcon from "../../assets/fonts/dash-cards.svg";
import skillsNewIcon from "../../assets/fonts/dash-skills.svg";
import upgradesNewIcon from "../../assets/fonts/dash-upgrades.svg";

import menuIcon from "../../assets/fonts/menu.svg";
import closeIcon from "../../assets/fonts/close.svg";
import logoIcon from "../../assets/fonts/diamond.svg";

// new
import closeBlackIcon from "../../assets/fonts/closeBlack.svg";
import menuBlackIcon from "../../assets/fonts/menuBlack.svg";

import userProfileIcon from "../../assets/fonts/userProfile.svg";
import profileBlackIcon from "../../assets/fonts/profile-black.svg";

import realmsIcon from "../../assets/fonts/realms.svg";
import mapIcon from "../../assets/fonts/map-white.svg";

import profileIcon from "../../assets/fonts/profile-wizard-white.svg";
import shopIcon from "../../assets/fonts/shop.svg";

import inventoryIcon from "../../assets/fonts/inventory-white.svg";
import collectionIcon from "../../assets/fonts/spell-book-white.svg";
import questIcon from "../../assets/fonts/question.svg";

import bagIcon from "../../assets/fonts/bag.svg";
import creditCard from "../../assets/fonts/credit-card.svg";
import settingsIcon from "../../assets/fonts/settings.svg";
import logoutIcon from "../../assets/fonts/logout.svg";

import homeIcon from "../../assets/fonts/pokemap.svg";
import collectionIconBottom from "../../assets/fonts/spell-book.svg";
import profileIconBottom from "../../assets/fonts/profile-wizard.svg";
import inventoryIconBottom from "../../assets/fonts/inventory.svg";
import mapIconBottom from "../../assets/fonts/map.svg";

import keyIcon from "../../assets/fonts/key.svg";
import flameIcon from "../../assets/fonts/flame.svg";
import diamondIcon from "../../assets/fonts/diamond-currency.svg";
import coinIcon from "../../assets/fonts/coin.svg";

const collectionIcons = [
  profileIcon,
  collectionIcon,
  inventoryIcon,
  inventoryIcon,
  questIcon,
];
const accountIcons = [bagIcon, creditCard, settingsIcon, logoutIcon];

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProfileOpen: false,
      isCollectionOpen: false,
      isMenuOpen: false,
      explainerType: false,
    };
  }

  onClose = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  render() {
    const { isAuthenticated, unsetToken, route } = this.props;
    const { isMenuOpen } = this.state;

    const HeaderItem = ({ href, as, name, dropdown }) => {
      return (
        <Link href={href} as={as}>
          <div className="desktop-header--item">
            <div className="desktop-header--text">{name}</div>
            {dropdown && (
              <div className="dropdownBar">
                {dropdown.map((d, i) => (
                  <DropdownItem key={i} href={d.href} name={d.name} />
                ))}
              </div>
            )}
          </div>
        </Link>
      );
    };

    const DropdownItem = ({ href, as, name, icon }) => {
      return (
        <Link href={href} as={as}>
          <div
            className="dropdownBar--link"
            onClick={name == "Log out" && unsetToken}
          >
            <div className="dropdownBar--link__icon">
              <img src={icon} height="20px" />
            </div>

            {name}
          </div>
        </Link>
      );
    };

    return (
      <div>
        {this.state.isMenuOpen && (
          <div className="newDesktopHeader">
            <div className="newDesktopHeader-logo">
              <div
                className="open-icon"
                onClick={() =>
                  this.setState({ isMenuOpen: !this.state.isMenuOpen })
                }
              >
                <img
                  height="25px"
                  src={isMenuOpen ? closeBlackIcon : menuBlackIcon}
                />
              </div>
              <div>
                <Link href="/" as="/">
                  <img
                    height="60px"
                    src="http://localhost:1337/brawlhalla.png"
                  />
                </Link>
              </div>
            </div>
            <Link href="/dashboard" as="/dashboard">
              <div className="newDesktopHeader-item">
                <img height="18px" src={appNewIcon} />
                <div className="ml1">Tasks</div>
              </div>
            </Link>

            <Link href="/realms" as="/realms">
              <div className="newDesktopHeader-item">
                <img height="18px" src={categoriesNewIcon} />
                <div className="ml1">Learn</div>
              </div>
            </Link>

            <Link href="/expansions" as="/expansions">
              <div className="newDesktopHeader-item">
                <img height="18px" src={shopNewIcon} />
                <div className="ml1">Expansions</div>
              </div>
            </Link>

            <Link href="/completed" as="/completed">
              <div className="newDesktopHeader-item active">
                <img height="18px" src={cardsNewIcon} />
                <div className="ml1">Cards</div>
              </div>
            </Link>

            <Link href="/spells" as="/spells">
              <div className="newDesktopHeader-item">
                <img height="18px" src={skillsNewIcon} />
                <div className="ml1">Skills</div>
              </div>
            </Link>

            <Link href="/upgrades" as="/upgrades">
              <div className="newDesktopHeader-item">
                <img height="18px" src={upgradesNewIcon} />
                <div className="ml1">Upgrades</div>
              </div>
            </Link>
          </div>
        )}

        <div className="desktop-header">
          <div
            className="open-icon"
            onClick={() =>
              this.setState({ isMenuOpen: !this.state.isMenuOpen })
            }
          >
            <img
              height="25px"
              src={isMenuOpen ? closeBlackIcon : menuBlackIcon}
            />
          </div>
          <Link href="/" as="/">
            <div className="desktop-header--item">
              <img height="60px" src="http://localhost:1337/brawlhalla.png" />
            </div>
          </Link>

          <div className="desktop-header--search">
            <Search />
          </div>

          <div className="desktop-header--grow"></div>

          <div className="currencies">
            <div
              className={cx("currencies-explainer", {
                active: this.state.explainerType === "key",
              })}
            >
              BOX - Key
            </div>
            <div
              className={cx("currencies-explainer", {
                active: this.state.explainerType === "flame",
              })}
            >
              BOX - Flame
            </div>
            <div
              className={cx("currencies-explainer", {
                active: this.state.explainerType === "diamond",
              })}
            >
              BOX - Diamond
            </div>
            <div
              className={cx("currencies-explainer", {
                active: this.state.explainerType === "gold",
              })}
            >
              BOX - Gold
            </div>

            <div
              className="currenciesBox"
              onClick={() => {
                this.setState({
                  explainerType:
                    this.state.explainerType === "key" ? false : "key",
                });
              }}
              onBlur={() => {
                this.setState({ explainerType: false });
              }}
              tabIndex={0}
            >
              <div className="currenciesBox-icon">
                <img src={keyIcon} width="28px" />
              </div>
              <div className="currenciesBox-amount">2</div>
            </div>

            <div
              className="currenciesBox"
              onClick={() => {
                this.setState({
                  explainerType:
                    this.state.explainerType === "flame" ? false : "flame",
                });
              }}
              onBlur={() => {
                this.setState({ explainerType: false });
              }}
              tabIndex={0}
            >
              <div className="currenciesBox-icon">
                <img src={flameIcon} width="28px" />
              </div>
              <div className="currenciesBox-amount">3</div>
            </div>

            <div
              className="currenciesBox"
              onClick={() => {
                this.setState({
                  explainerType:
                    this.state.explainerType === "diamond" ? false : "diamond",
                });
              }}
              onBlur={() => {
                this.setState({ explainerType: false });
              }}
              tabIndex={0}
            >
              <div className="currenciesBox-icon">
                <img src={diamondIcon} width="28px" />
              </div>
              <div className="currenciesBox-amount">6</div>
            </div>

            <div
              className="currenciesBox"
              onClick={() => {
                this.setState({
                  explainerType:
                    this.state.explainerType === "gold" ? false : "gold",
                });
              }}
              onBlur={() => {
                this.setState({ explainerType: false });
              }}
              tabIndex={0}
            >
              <div className="currenciesBox-icon">
                <img src={coinIcon} width="28px" />
              </div>
              <div className="currenciesBox-amount">29</div>
            </div>
          </div>

          {isAuthenticated ? (
            <div
              className={cx("desktop-header--profile", {
                active: this.state.isProfileOpen,
              })}
              onClick={() => {
                this.setState({ isProfileOpen: !this.state.isProfileOpen });
              }}
              onBlur={() => {
                this.setState({ isProfileOpen: false });
              }}
              tabIndex={0}
            >
              <div className="desktop-header--item">
                <div className="desktop-header--text">
                  <img height="28px" src={profileBlackIcon} />
                </div>
                <div className="dropdownBar">
                  <div className="dropdownBar--separator">Collection</div>
                  {profile.dropdown.collection.map((d, i) => (
                    <DropdownItem
                      key={i}
                      href={d.href}
                      name={d.name}
                      icon={collectionIcons[i]}
                    />
                  ))}
                  <div className="dropdownBar--separator">Account</div>
                  {profile.dropdown.account.map((d, i) => (
                    <DropdownItem
                      key={i}
                      href={d.href}
                      name={d.name}
                      icon={accountIcons[i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="desktop-header--profile">
              <Link href="/signin">
                <a className="desktop-header--profile__loginButton">Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="desktop-header--profile__signUpButton">
                  Join Free
                </a>
              </Link>
            </div>
          )}
        </div>

        <div
          className="mobile-header"
          style={{ position: isMenuOpen && "fixed" }}
        >
          <div className="open-icon">
            <Link href="/" as="/">
              <a>
                <img height="35px" src={logoIcon} />
              </a>
            </Link>
          </div>

          <div className="desktop-header--search">
            <Search />
          </div>

          <div
            className="open-icon"
            onClick={() =>
              this.setState({ isMenuOpen: !this.state.isMenuOpen })
            }
          >
            <img height="35px" src={isMenuOpen ? closeIcon : menuIcon} />
          </div>

          {/* Open Menu */}

          {isMenuOpen && (
            <div className="openMobile-header">
              <div className="openMobile-header-box">
                <div className="divider-label">World</div>

                <Link href="/realms" as="/realms">
                  <div
                    className="openMobile-header-item"
                    onClick={() => {
                      this.onClose();
                    }}
                  >
                    <div className="pr1">
                      <img src={mapIcon} height="35px" />
                    </div>
                    Realms
                  </div>
                </Link>

                <Link href="/expansions" as="/expansions">
                  <div
                    className="openMobile-header-item"
                    onClick={() => {
                      this.onClose();
                    }}
                  >
                    <div className="pr1">
                      <img src={shopIcon} height="35px" />
                    </div>
                    Expansions
                  </div>
                </Link>

                {isAuthenticated ? (
                  <div className="openMobile-header-isLogged-box">
                    <div className="divider-label">Collection</div>
                    <Link href="/prfile" as="/profile">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={profileIcon} height="35px" />
                        </div>
                        Character
                      </div>
                    </Link>

                    <Link href="/completed" as="/completed">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={collectionIcon} height="35px" />
                        </div>
                        Cards
                      </div>
                    </Link>

                    <Link href="/spells" as="/spells">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={collectionIcon} height="35px" />
                        </div>
                        Spells
                      </div>
                    </Link>

                    <Link href="/inventory" as="/inventory">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={inventoryIcon} height="35px" />
                        </div>
                        Inventory
                      </div>
                    </Link>

                    <Link href="/quests" as="/quests">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={questIcon} height="35px" />
                        </div>
                        Quests
                      </div>
                    </Link>

                    <div className="divider-label">Account</div>

                    <Link href="/cart" as="/cart">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={bagIcon} height="35px" />
                        </div>
                        Cart
                      </div>
                    </Link>

                    <Link href="/payments" as="/payments">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={creditCard} height="35px" />
                        </div>
                        Payments
                      </div>
                    </Link>

                    <Link href="/account" as="/account">
                      <div
                        className="openMobile-header-item"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        <div className="pr1">
                          <img src={settingsIcon} height="35px" />
                        </div>
                        Settings
                      </div>
                    </Link>

                    <Link href="/" as="/">
                      <div
                        className="openMobile-header-item"
                        onClick={unsetToken}
                      >
                        <div className="pr1">
                          <img src={logoutIcon} height="35px" />
                        </div>
                        Log out
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="openMobile-header-loginSignupBox">
                    <Link href="/login" as="/login">
                      <div
                        className="openMobile-header-loginButton"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        Log In
                      </div>
                    </Link>

                    <Link href="/signup" as="/signup">
                      <div
                        className="openMobile-header-signUpButton"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        Sign up - Free
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mobile-header-bottom-menu">
          <Link href="/" as="/">
            <div className={cx("bottom-header-item", route == "/" && "active")}>
              <div className="bottom-header-item--icon">
                <img src={homeIcon} />
              </div>
              <div className="bottom-header-item--label">Home</div>
            </div>
          </Link>

          <Link href="/realms" as="/realms">
            <div
              className={cx(
                "bottom-header-item",
                route == "/realms" && "active"
              )}
            >
              <div className="bottom-header-item--icon">
                <img src={mapIconBottom} />
              </div>
              <div className="bottom-header-item--label">Realms</div>
            </div>
          </Link>

          <Link href="/completed" as="/completed">
            <div
              className={cx(
                "bottom-header-item",
                (route == "/completed" ||
                  route == "/saved" ||
                  route == "favorites" ||
                  route == "/inprogress") &&
                  "active"
              )}
            >
              <div className="bottom-header-item--icon">
                <img src={collectionIconBottom} />
              </div>
              <div className="bottom-header-item--label">Collection</div>
            </div>
          </Link>

          <Link href="/inventory" as="/inventory">
            <div
              className={cx(
                "bottom-header-item",
                route == "/inventory" && "active"
              )}
            >
              <div className="bottom-header-item--icon">
                <img src={inventoryIconBottom} />
              </div>
              <div className="bottom-header-item--label">Inventory</div>
            </div>
          </Link>

          <Link href="/profile" as="/profile">
            <div
              className={cx(
                "bottom-header-item",
                route == "/profile" && "active"
              )}
            >
              <div className="bottom-header-item--icon">
                <img src={profileIconBottom} />
              </div>
              <div className="bottom-header-item--label">Profile</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
