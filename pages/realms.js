import React from "react";
import defaultPage from "../hocs/defaultPage";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { GET_ALL_REALMS } from "../GQL/Query";

import "../styles/pages/realms.scss";

import RealmCard from "../components/RealmCard/RealmCard";

class Realm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: { realms, loading, error },
      context: { realmsCardsCount, loggedIn },
    } = this.props;
    console.log(realms);
    if (error) {
      return <div>Error Loading Realms...</div>;
    }
    if (loggedIn && realms && realmsCardsCount) {
      return (
        <div>
          <div className="section-realms-header">
            <div className="section-header pb1">
              The Latest Wisdom to Optimize your life.
            </div>
            <div className="section-subHeader">
              Let’s change the world. One person at a time. Starting with you
              and me. Today. Here’s the latest Optimize Wisdom to get you
              started.
            </div>
          </div>
          <div className="section-realms">
            <div className="realms-container">
              {realms.map((realm, i) => {
                const progressTable = realmsCardsCount.filter(
                  (r) => realm.id == r.id
                )[0];
                return (
                  <RealmCard
                    key={i}
                    realm={realm}
                    progressTable={progressTable}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    if (!loggedIn && realms) {
      return (
        <div>
          <div className="section-realms-header">
            <div className="section-header pb1">
              The Latest Wisdom to Optimize your life.
            </div>
            <div className="section-subHeader">
              Let’s change the world. One person at a time. Starting with you
              and me. Today. Here’s the latest Optimize Wisdom to get you
              started.
            </div>
          </div>
          <div className="section-realms">
            <div className="realms-container">
              {realms.map((realm, i) => {
                return <RealmCard key={i} realm={realm} />;
              })}
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default compose(
  defaultPage,
  withRouter,
  withContext,
  graphql(GET_ALL_REALMS)
)(Realm);
