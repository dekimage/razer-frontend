import React from "react";
import { withRouter } from "next/router";
import { withContext } from "../components/Context/AppProvider";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import defaultPage from "../hocs/defaultPage";
import Milestones from "../components/Milestones/Milestones";
import { GET_FILTERED_CARDS } from "../GQL/Query";

//Static Data - Rewards
import { milestones } from "../data/milestones";

import "../styles/pages/rewards.scss";

class Rewards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      context: { user, calculateXpFunction },
    } = this.props;
    const { data } = this.props;
    const level = user && calculateXpFunction(user.xp).level;
    if (data) {
      return (
        <div className="page-rewards-container">
          <div className="section-rewards-header">
            <div className="section-header pb1">
              Level up to Unlock Rewards!
            </div>
            <div className="section-subHeader">
              Learn, Grow and Level up to Gain Access to Epic Cards and
              Exclusive Items!
            </div>
          </div>
          <div className="section-milestones">
            <Milestones isFullView milestones={milestones} level={level} />
          </div>
        </div>
      );
    }
    // if (!user) {
    //   return <div>Public Rewards</div>;
    // }
    return <h1>Loading...</h1>;
  }
}

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_FILTERED_CARDS, {
    options: (props) => {
      return {
        variables: {
          id: [1, 2, 3],
        },
      };
    },
    props: ({ data }) => ({ data }),
  })
)(Rewards);
