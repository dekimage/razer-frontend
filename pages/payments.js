import React from "react";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";

import "../styles/pages/payments.scss";

class Payments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      context: { user }
    } = this.props;
    if (user && user.error) return "Error Loading Payments";
    if (user) {
      return (
        <div className="payments-section">
          <h3 className="flex flex-center pb1 pt1">Payments</h3>
          <div className="order-table labels">
            <div className="order">
              <div className="order-item">ID</div>
              <div className="order-item">Amount</div>
              <div className="order-item">Original Price</div>
              <div className="order-item">Discount Applied</div>
              <div className="order-item">Created At</div>
              <div className="order-item">Status</div>
            </div>
          </div>
          <div className="order-table">
            {user.orders.map(order => {
              const date = new Date(order.created_at)
                .toISOString()
                .substring(0, 10);
              const status = order.status.split(".")[1];
              return (
                <div className="order">
                  <div className="order-item">{order.id}</div>
                  <div className="order-item">${order.amount}</div>
                  <div className="order-item">${order.originalPrice}</div>
                  <div className="order-item">{order.discountApplied}</div>
                  <div className="order-item">{date}</div>
                  <div className="order-item">{status}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(Payments);
