import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withContext } from "../components/Context/AppProvider";
import defaultPage from "../hocs/defaultPage";

import { GET_EXPANSION } from "../GQL/Query";

class ExpansionPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: { loading, error, expansion },
      context
    } = this.props;

    if (expansion) {
      return (
        <div>
          <div>{expansion.name}</div>
          <button>Buy Now</button>
        </div>
      );
    }
    if (error) return "Error Loading Cards";
    return <h1>Loading...</h1>;
  }
}

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_EXPANSION, {
    options: props => {
      return {
        variables: {
          id: props.router.query.id
        }
      };
    },
    props: ({ data }) => ({ data })
  })
)(ExpansionPage);
