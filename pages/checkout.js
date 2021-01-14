import React, { Component } from "react";
import securePage from "../hocs/securePage";
// import Cart from "../components/Cart/Cart";

import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import Router from "next/router";

import CheckoutForm from "../components/Checkout/CheckoutForm";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethodOpen: "card",
      checkoutSucceeded: false,
    };
  }

  componentWillUnmount() {
    this.setState({ checkoutSucceeded: false });
  }

  setCheckoutSucceeded = () => {
    this.setState({ checkoutSucceeded: true });
  };

  render() {
    const { context } = this.props;
    const { paymentMethodOpen, paymentSucceeded } = this.state;

    if (
      context &&
      context.cart &&
      context.cart.length === 0 &&
      !paymentSucceeded
    ) {
      return (
        <div>
          Cart is Empty - CTA go back to shopping cart/basket to add products +
        </div>
      );
    }
    if (context && context.cart && context.user && context.cart.length > 0) {
      return (
        <CheckoutForm
          context={context}
          setCheckoutSucceeded={this.setCheckoutSucceeded}
        />
      );
    }
    return <div>Loading</div>;
  }
}
export default compose(securePage, withContext)(Checkout);
