import React from "react";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import securePage from "../hocs/securePage";

import "../styles/pages/account-settings.scss";
import cx from "classnames";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      context: { user },
    } = this.props;
    if (user && user.error) return "Error Loading Inventory";
    if (user) {
      return <div>{user.id}</div>;
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(withRouter, securePage, withContext)(AccountSettings);
