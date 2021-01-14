import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "next/router";
import { compose } from "recompose";
import defaultPage from "../hocs/defaultPage";
import { withContext } from "../components/Context/AppProvider";
import { GET_ALL_EXPANSIONS } from "../GQL/Query";
import Link from "next/link";

class Expansions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      context: { addToCart },
      data: { expansions, loading, error }
    } = this.props;
    if (error) return "Error Loading Expansions";
    if (expansions && !loading) {
      return (
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {expansions.map((expansion, i) => {
            return (
              <div
                key={i}
                style={{
                  width: "175px",
                  height: "175px",
                  border: "1px solid black",
                  margin: "20px",
                  padding: "10px"
                }}
              >
                <div>{expansion.name}</div>
                <div>{expansion.description}</div>
                <div>{expansion.key.name}</div>
                <Link
                  as={`/expansion/${expansion.id}`}
                  href={`/expansion?id=${expansion.id}`}
                >
                  <a className="btn btn-primary">Learn More</a>
                </Link>
                <button onClick={() => addToCart(expansion)}>
                  + ADD TO CART
                </button>
              </div>
            );
          })}
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_ALL_EXPANSIONS, {
    props: ({ data }) => ({
      data
    })
  })
)(Expansions);
