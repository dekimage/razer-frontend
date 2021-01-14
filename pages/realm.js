import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import Link from "next/link";
import defaultPage from "../hocs/defaultPage";
import { withContext } from "../components/Context/AppProvider";

import "../styles/pages/realm.scss";

import { GET_REALM_CARDS, GET_ALL_REALMS } from "../GQL/Query";

import Card from "../components/Card";

class Realm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRealms: false,
    };

    // this.setFilters = this.setFilters.bind(this);
  }
  // Refactor to prev.state ->
  setFilters = (filterType, value) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [filterType]: value,
      },
    });
  };

  render() {
    const {
      data: { loading, error, realm },
      realmsData: { realms },
      context,
    } = this.props;

    const links = realm && { realm: { id: realm.id, name: realm.name } };
    // Realm Result Component
    const RealmResult = (realm) => {
      const r = realm.realm;
      return (
        <div className="showRealms-box">
          <Link as={`/realm/${r.id}`} href={`/realm?id=${r.id}`}>
            <div
              className="showRealms-item"
              onClick={() => {
                this.setState({ showRealms: !this.state.showRealms });
              }}
            >
              <div className="showRealms-item--logo">
                {r.logo && (
                  <img
                    src={`http://localhost:1337${r.logo.url}`}
                    height={"50px"}
                  />
                )}
              </div>
              <div className="showRealms-item--autogrow">
                <div className="showRealms-item--nameBox">
                  <span className="showRealms-item--name text-header">
                    {r.name}
                  </span>
                  {/* <div>
                    <Tag
                      name={r.tag.name}
                      primaryColor={r.tag.primaryColor}
                      secondaryColor={r.tag.secondaryColor}
                      textColor={r.tag.textColor}
                    />
                  </div> */}
                </div>
                <div className="showRealms-item--description text-subHeader">
                  {r.description}
                </div>
              </div>
              <div className="showRealms-item--play">
                <ion-icon
                  size="large"
                  name="return-down-forward-outline"
                ></ion-icon>
              </div>
            </div>
          </Link>
        </div>
      );
    };

    const realmsNoCurrentRealm =
      realms && realm && realms.filter((r) => r.id !== realm.id);

    if (error) return "Error Loading Cards";
    if (realm) {
      return (
        <div>
          {realm.background && (
            <div
              style={{
                background: `url('http://localhost:1337${realm.background.url}')`,
              }}
              className="realm-background"
            >
              <div className="realm-background-overlay"></div>
            </div>
          )}

          <div className="realm-wrapper">
            {/* <Breadcrumbs links={links} /> */}

            <div className="infoSection">
              <div
                className="infoSection--box"
                onClick={() => {
                  this.setState({ showRealms: !this.state.showRealms });
                }}
              >
                <div>
                  {/* Remove this logic on assets */}
                  {realm.logo && (
                    <img
                      src={`http://localhost:1337${realm.logo.url}`}
                      height={"85px"}
                    />
                  )}
                </div>
                <div className="infoSection--insideBox">
                  <div className="flex flex-row align-center">
                    <div className="realm-name section-header">
                      {realm.name}
                    </div>
                  </div>

                  <div className="realm-description section-subHeader">
                    {realm.description}
                  </div>
                  {/* <div className="realm-cards-count">
                    Cards: {realm.cards.length}
                  </div> */}
                </div>
                {this.state.showRealms ? (
                  <div
                    className="showRealms"
                    onClick={() => {
                      this.setState({ showRealms: !this.state.showRealms });
                    }}
                  >
                    <ion-icon name="chevron-up-outline" size="large"></ion-icon>
                  </div>
                ) : (
                  <div
                    className="showRealms"
                    onClick={() => {
                      this.setState({ showRealms: !this.state.showRealms });
                    }}
                  >
                    <ion-icon
                      name="chevron-down-outline"
                      size="large"
                    ></ion-icon>
                  </div>
                )}
              </div>
            </div>
            {this.state.showRealms && realms && realm && (
              <div className="showRealms-box-container">
                <div className="showRealms-scrollable">
                  {realmsNoCurrentRealm.map((r, i) => {
                    return <RealmResult key={i} realm={r} />;
                  })}
                </div>
              </div>
            )}
            <div className="section-cards">
              <div className="cards-wrapper">
                {realm.cards.map((card, i) => (
                  <Card key={i} card={card} context={context} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <h1>Loading</h1>;
  }
}

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_REALM_CARDS, {
    options: (props) => {
      return {
        variables: {
          id: props.router.query.id,
        },
      };
    },
    props: ({ data }) => ({ data }),
  }),
  graphql(GET_ALL_REALMS, { name: "realmsData" })
)(Realm);
