import React, { Component } from "react";
import securePage from "../hocs/securePage";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import Router from "next/router";
import { graphql } from "react-apollo";
import { GET_ALL_EXPANSIONS } from "../GQL/Query";
import { bundlesDescription } from "../data/bundles.js";

import "../styles/pages/checkout.scss";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }

  render() {
    const {
      context: { cart, user, addToCart, removeFromCart, toCheckout },
      loading,
      error,
      data: { expansions }
    } = this.props;

    console.log("SHOPPING BASKET===>", cart);

    const total =
      cart && cart.length > 0
        ? cart
            .map(expansion => expansion.price)
            .reduce((total, amount) => total + amount)
        : 0;
    const expansionsCount = cart && cart.length;
    const bonuses =
      cart && cart.length > 0
        ? bundlesDescription.filter(b => b.count == expansionsCount)[0].bonus
        : "None";
    const bonus = cart ? `${bonuses[0]} ${bonuses[1]}` : "None";
    const discount =
      cart && cart.length > 0
        ? bundlesDescription.filter(b => b.count == expansionsCount)[0].discount
        : 0;

    const totalDiscounted = (total / 100) * (100 - discount);
    const isCartEmpty = cart && cart.length === 0;
    const isBundlesEmpty =
      cart &&
      user &&
      expansions &&
      !expansions
        .map(exp => !user.keys.some(key => key.id == exp.key.id))
        .some(bool => bool == true);

    if (expansions && user && cart && (!isCartEmpty || !isBundlesEmpty)) {
      return (
        <div className="checkout-layout">
          <div className="checkout">
            <div className="bundlesBox">
              <div className="basket">
                <span className="headline">Cart:</span>
                {cart.length > 0 &&
                  cart.map((expansion, i) => {
                    return (
                      <div key={i} className="basket-item">
                        <img
                          src={`http://localhost:1337${expansion.image[0].url}`}
                          height={"75px"}
                        />
                        <div className="basket-item--name">
                          {expansion.name}
                        </div>
                        <div className="basket-item--price">
                          ${expansion.price}
                          <div
                            className="basket-item--trash"
                            onClick={() => removeFromCart(expansion)}
                          >
                            X
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {cart.length == 0 && (
                  <div>
                    Your Cart is empty. Add Expansions below or browse catalog
                    here:
                    <button onClick={() => Router.push("/expansions")}>
                      Shop Expansions
                    </button>
                  </div>
                )}
              </div>
              <span className="headline">Special Bundle:</span>+ Add Expansions
              To Earn Special Discount & Exlusive Bonuses!
              <div className="benefits-box">
                {expansions.map((e, i) => {
                  return (
                    <div key={i} className="benefits">
                      <div className="benefits-expansion">
                        {bundlesDescription[i].count}
                        {bundlesDescription[i].count == 1
                          ? " Expansion:"
                          : " Expansions:"}
                      </div>
                      <div className="benefits-discount-box">
                        <div className="benefits-discount-box-label">
                          Discount:
                        </div>

                        <div
                          className={`summary-item--discount color-${i + 1}`}
                          style={{ width: "3.5rem", margin: "0 .4rem" }}
                        >
                          -{bundlesDescription[i].discount}%
                        </div>
                      </div>
                      <div>
                        <div className="benefits-discount-box-label">
                          Special Bonus:
                        </div>
                        <div>
                          {bundlesDescription[i].bonus.map((bonus, i) => (
                            <div key={i} className="benefits-bonus">
                              {bonus}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="catalog">
                {expansions.map((expansion, i) => {
                  if (
                    !cart.some(e => e.id == expansion.id) &&
                    !user.keys.some(key => key.id == expansion.key.id)
                  ) {
                    return (
                      <div key={i} className="catalog-item">
                        <div className="catalog-item--name">
                          {expansion.name}
                        </div>
                        <div className="catalog-item--body">
                          <img
                            src={`http://localhost:1337${expansion.image[0].url}`}
                            height={"75px"}
                          />
                          <div className="catalog-item--actions">
                            <div className="catalog-item--info">?</div>
                            <div className="catalog-item--price">
                              ${expansion.price}
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => addToCart(expansion)}
                          className="catalog-item--button"
                        >
                          + Add
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="summary">
                <span className="headline"> Summary:</span>
                <div className="bonus"> Special Bonus: {bonus}</div>
                <div className="summary">
                  <div className="summary-item">
                    Original Price:{" "}
                    <div className="summary-item--original">${total}</div>
                  </div>
                  <div className="summary-item">
                    Bundle Discount: ({cart.length})
                    <div
                      className={`summary-item--discount color-${expansionsCount}`}
                    >
                      -{discount}%
                    </div>
                  </div>
                  <div className="summary-item">
                    Total: <div>${Math.round(totalDiscounted)}</div>
                  </div>
                </div>
              </div>
              {isCartEmpty ? (
                <div className="checkout-button checkout-button-disabled">
                  Continue to Checkout ->
                </div>
              ) : (
                <div
                  className="checkout-button"
                  onClick={() => {
                    toCheckout(total, discount, totalDiscounted);
                    Router.push("/checkout");
                  }}
                >
                  Continue to Checkout ->
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (isBundlesEmpty && isCartEmpty) {
      //
      return (
        <div>
          You Have Purchased All Current Expansions! Access hidden realm here =>
          ...
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}
export default compose(
  securePage,
  withContext,
  graphql(GET_ALL_EXPANSIONS, {
    props: ({ data }) => ({
      data
    })
  })
)(Cart);
