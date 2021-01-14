import React from "react";
import { withRouter } from "next/router";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import { withContext } from "../components/Context/AppProvider";

import Item from "../components/Inventory/Item/Item";
import Dust from "../components/Inventory/Dust/Dust";
import Modal from "../components/Reactstrap/Modal";
import SecondaryHeader from "../components/SecondaryHeader/SecondaryHeader";
import Section from "../components/Section/Section";
import { collectionLinks } from "../data/header";

import cx from "classnames";
import "../styles/pages/inventory.scss";

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "dust",
    };
  }

  render() {
    const { context } = this.props;
    if (context.user && context.user.error) return "Error Loading Inventory";
    if (context.user) {
      const { filter } = this.state;
      return (
        <>
          <SecondaryHeader links={collectionLinks} />
          <Section
            name="Inventory"
            description="Collect different rewards by completing cards."
            image="http://localhost:1337/chest.png"
          />
          <div className="inventory">
            <div className="inventory--filters">
              <div
                className={cx("inventory--filters__item", {
                  active: filter == "dust",
                })}
                onClick={() => {
                  this.setState({ filter: "dust" });
                }}
              >
                Dust
              </div>
              <div
                className={cx("inventory--filters__item", {
                  active: filter == "items",
                })}
                onClick={() => {
                  this.setState({ filter: "items" });
                }}
              >
                items
              </div>
              <div
                className={cx("inventory--filters__item", {
                  active: filter == "keys",
                })}
                onClick={() => {
                  this.setState({ filter: "keys" });
                }}
              >
                Keys
              </div>
            </div>

            <div>
              {filter === "dust" && (
                <div className="itemsWrap">
                  {context.user.inventory.length > 0 ? (
                    context.user.inventory.map((item, i) => {
                      return (
                        <Dust itemComponent={item} key={i} src={"inventory"} />
                      );
                    })
                  ) : (
                    <div>
                      You have no dust yet. To obtain dust you need to complete
                      card quests. Click here to explore cards LINK..
                    </div>
                  )}
                </div>
              )}

              {filter === "items" && (
                <div className="itemsWrap">
                  {context.user.items.length > 0 ? (
                    context.user.items.map((item, i) => {
                      return <Item item={item} key={i} type={"item"} />;
                    })
                  ) : (
                    <div>
                      You have no items yet. Items are crafted in exchange for
                      dust. Click here to craft items...
                    </div>
                  )}
                </div>
              )}

              {filter === "keys" && (
                <div className="itemsWrap">
                  {context.user.keys.length > 0 ? (
                    context.user.keys.map((item, i) => {
                      return <Item item={item} key={i} type={"key"} />;
                    })
                  ) : (
                    <div>
                      You have no keys yet. Keys are obtained by purchasing
                      expansion sets. Explore Expansions LINK...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Inventory);
