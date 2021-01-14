import React from "react";
import defaultPage from "../hocs/defaultPage";
import Link from "next/link";
import Router from "next/router";
import { compose } from "recompose";
import { withContext } from "../components/Context/AppProvider";
import { graphql } from "react-apollo";

import { GET_REALM_CARDS, GET_ALL_REALMS } from "../GQL/Query";

import gemCommon from "../assets/fonts/gem1.svg";
import gemRare from "../assets/fonts/gem2.svg";
import gemEpic from "../assets/fonts/gem3.svg";
import gemLegendary from "../assets/fonts/gem4.svg";
import heart from "../assets/fonts/heart2.svg";
import heartFull from "../assets/fonts/heart-full.svg";

import "../styles/pages/home.scss";

const rarityGems = {
  common: gemCommon,
  rare: gemRare,
  epic: gemEpic,
  legendary: gemLegendary,
  mystic: gemLegendary,
  hidden: gemEpic,
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const loggedIn = this.props.context.loggedIn;
    if (loggedIn) {
      // Router.push("/realms"); // redirect if you're already logged in
    }
  }
  render() {
    const { data } = this.props;

    return (
      <div className="newcards-list">
        <div className="section-newCards">
          {data.realm &&
            data.realm.cards.map((c, i) => {
              return (
                <div className="newCard">
                  <div className="newCard-bookmark">
                    <img src={heart} style={{ width: "20px" }} />
                  </div>
                  <div className="newCard-sectionLeft">
                    {c.image && (
                      <div className="newCard-sectionLeft--image">
                        <img src={`http://localhost:1337${c.image.url}`} />
                      </div>
                    )}
                  </div>
                  <div className="newCard-sectionRight">
                    {/* name */}
                    <div className="newCard-name">{c.name}</div>
                    {/* description */}
                    <div className="newCard-description">
                      Real description for this card is that, at no cost that's
                      it. For those who find shall understand. And those who
                      won't shall not.
                    </div>
                    <div className="newCard-stats">
                      <div className="newCard-stats-item">
                        <ion-icon name="hourglass-outline"></ion-icon>&nbsp;6
                        Minutes
                      </div>
                      <div className="newCard-stats-item">
                        <ion-icon name="star-outline"></ion-icon>&nbsp;2 Skills
                        {/* &nbsp; <ion-icon name="checkmark-outline"></ion-icon> */}
                      </div>
                    </div>

                    {/* Rarity logo */}
                    {/* <div className="newCard-realm">
                      {c.rarity && (
                        <img
                          src={rarityGems[c.rarity]}
                          style={{ width: "20px" }}
                        />
                      )}
                      &nbsp;{c.rarity}
                    </div> */}

                    {/* free/premium btn */}
                    <div className="newCard-cta">
                      <div className="newCard-tags">
                        {/* Realm logo*/}
                        <div className="newCard-realm">
                          {c.logo && (
                            <img
                              src={`http://localhost:1337${c.logo.url}`}
                              style={{ width: "25px" }}
                            />
                          )}
                          &nbsp;{c.realm.name}
                        </div>
                        {/* Expansion logo */}
                        <div className="newCard-realm">
                          {c.expansion && (
                            <div>
                              <img
                                // src={`http://localhost:1337${c.expansion.image[0].url}`}
                                style={{ width: "30px" }}
                              />
                              &nbsp;{c.expansion.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="newCard-btn">Free</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default compose(
  defaultPage,
  withContext,
  graphql(GET_REALM_CARDS, {
    options: (props) => {
      return {
        variables: {
          id: 1,
        },
      };
    },
    props: ({ data }) => ({ data }),
  })
)(Index);
