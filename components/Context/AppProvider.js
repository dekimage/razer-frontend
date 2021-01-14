import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import Cookies from "js-cookie";

import { graphql } from "react-apollo";
import { compose } from "recompose";

import { toast } from "react-toastify";

import { UPDATE_USER } from "../../GQL/Mutation";
import { GET_USER, GET_REALMS_CARDS_COUNTER } from "../../GQL/Query";

const apiUrl =
  process.env.API_URL ||
  "https://titan-backend-3-5-0.herokuapp.com" ||
  "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.dataUser && !!this.props.dataUser.user,
      user: this.props.dataUser ? this.props.dataUser.user : "",
      search: "",
      filters: "",
      cart: [],
      total: 0,
      discount: 0,
      totalDiscounted: 0,
      realmsCardsCount: this.props.realmsCardsCount
        ? this.props.realmsCardsCount
        : [],
    };

    this.onComplete = this.onComplete.bind(this);
    this.onSaveFavorBuild = this.onSaveFavorBuild.bind(this);
    this.checkToggle = this.checkToggle.bind(this);
    this.createUpdatedInventory = this.createUpdatedInventory.bind(this);
    this.checkCardLockStatus = this.checkCardLockStatus.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.toCheckout = this.toCheckout.bind(this);
    this.onPurchaseComplete = this.onPurchaseComplete.bind(this);
    this.calculateRealmCardsProgress = this.calculateRealmCardsProgress.bind(
      this
    );
    this.calculateXpFunction = this.calculateXpFunction.bind(this);
  }
  componentDidMount() {
    const cart = Cookies.getJSON("cart");
    if (cart) {
      this.setState({ cart });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataUser.user !== this.props.dataUser.user) {
      this.setState({ user: nextProps.dataUser.user });
    }
    if (nextProps.dataUser.user !== this.props.dataUser.user) {
      this.setState({ loggedIn: !!nextProps.dataUser.user });
    }
    if (
      nextProps.realmsCardsCount.realms !== this.props.realmsCardsCount.realms
    ) {
      this.setState({ realmsCardsCount: nextProps.realmsCardsCount.realms });
    }
  }

  calculateXpFunction(x) {
    const stages = [
      {
        level: 1,
        minimum: 0,
        maximum: 11,
        total: 1000,
        progression: 100,
      },
      {
        level: 11,
        minimum: 1000,
        maximum: 21,
        total: 2500,
        progression: 150,
      },
      {
        level: 21,
        minimum: 2500,
        maximum: 31,
        total: 4500,
        progression: 200,
      },
      {
        level: 31,
        minimum: 4500,
        maximum: 41,
        total: 7000,
        progression: 250,
      },
      {
        level: 41,
        minimum: 7000,
        maximum: 51,
        total: 10000,
        progression: 300,
      },
      {
        level: 51,
        minimum: 10000,
        maximum: 61,
        total: 13500,
        progression: 350,
      },
      {
        level: 61,
        minimum: 13500,
        maximum: 71,
        total: 17500,
        progression: 400,
      },
    ];
    let levelDifference;
    let baseLevel;
    let toNextLevel;
    let progress;
    for (let i = 0; i < stages.length; i++) {
      if (x < stages[i].total) {
        const fullDifference = (x - stages[i].minimum) / stages[i].progression;
        //To next level x => 150/x
        toNextLevel = stages[i].progression;
        //Xp Progress x => x/250
        progress = (fullDifference - Math.floor(fullDifference)) * toNextLevel;
        //Level
        levelDifference = Math.floor(fullDifference);
        baseLevel = stages[i].level;
        const level = baseLevel + levelDifference;
        return { level, toNextLevel, progress };
      }
    }
  }

  calculateRealmCardsProgress() {
    if (
      this.state.realmsCardsCount.loading ||
      !this.state.user ||
      !this.state.user.completedCards
    ) {
      return;
    }
    const realms = this.state.realmsCardsCount;
    const completedCards = this.state.user.completedCards.map((c) =>
      parseInt(c.id)
    );

    const ownedCardsTable =
      realms &&
      realms.map((realm) => {
        const { id, name, logo } = realm;
        const totalCards = realm.cards.length;
        const ownedCards = realm.cards.filter((card) =>
          completedCards.includes(parseInt(card.id))
        ).length;

        return {
          id,
          name,
          counter: ownedCards,
          total: totalCards,
          progress: Math.round((ownedCards / totalCards) * 100),
          logo: logo && logo.url,
        };
      });
    return ownedCardsTable;
  }

  onRegisterUser = (user) => {
    this.setState({ user });
  };

  createUpdatedInventory(inventory, itemId, isCompleted) {
    // Fixing ID type String to Integer
    inventory = inventory.map((item) => {
      return {
        id: parseInt(item.id),
        quantity: item.quantity,
        item_info: parseInt(item.item_info.id),
      };
    });

    const isItemInInventory = inventory.filter(
      (item) => parseInt(item.item_info) === itemId
    ).length;

    if (isItemInInventory) {
      inventory = inventory.map((item) => {
        if (parseInt(item.item_info) === itemId) {
          return {
            ...item,
            quantity: isCompleted ? item.quantity + 1 : item.quantity - 1,
          };
        }
        return {
          ...item,
        };
      });
    } else {
      inventory.push({
        item_info: itemId,
        quantity: 1,
      });
    }
    return inventory;
  }

  onComplete(card, isCompleted) {
    const { id, item, xp } = card;
    //for security - user.id === userId

    // update Inventory
    let inventory = this.props.dataUser.user.inventory;
    inventory = this.createUpdatedInventory(
      inventory,
      parseInt(item.id),
      isCompleted
    );

    // update Completed Cards
    let completedCards = this.props.dataUser.user.completedCards.map((c) =>
      parseInt(c.id)
    );
    if (isCompleted) {
      completedCards.push(id);
    } else {
      completedCards = completedCards.filter((c) => c !== parseInt(id));
    }

    // update Experience
    const adjustedXp = isCompleted
      ? this.props.dataUser.user.xp + xp
      : this.props.dataUser.user.xp - xp;

    this.props
      .mutate({
        variables: {
          updateUserInput: {
            where: {
              id: this.props.children.props.userId,
            },
            data: {
              completedCards,
              xp: adjustedXp,
              inventory,
            },
          },
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: {
              id: this.props.children.props.userId,
            },
          },
        ],
      })
      .then((res) => {
        if (res.data.updateUser.user) {
          if (isCompleted) {
            toast("Marked as Complete!");
            toast(`You gained ${xp} XP!`);
            toast(`You obtained 1 x ${item.name}`);
          } else {
            toast("Removed from Completed!");
            toast(`You lost ${xp} XP!`);
            toast(`You lost 1 x ${item.name}`);
          }
        }
      });
    // const CompletedToast = ({ closeToast }) => <div></div>;
  }
  //TODO:   Change wording to neutral function that upates all completed and spells and quests etc...
  onSaveFavorBuild(card, isCompleted, listType) {
    const { id } = card;

    // update Completed Cards
    let completedCards = this.props.dataUser.user[listType].map((c) =>
      parseInt(c.id)
    );
    if (isCompleted) {
      completedCards.push(id);
    } else {
      completedCards = completedCards.filter((c) => c !== parseInt(id));
    }

    this.props
      .mutate({
        variables: {
          updateUserInput: {
            where: {
              id: this.props.children.props.userId,
            },
            data: {
              [listType]: completedCards,
            },
          },
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: {
              id: this.props.children.props.userId,
            },
          },
        ],
      })
      .then((res) => {
        if (res.data.updateUser.user) {
          if (isCompleted) {
            switch (listType) {
              case "savedLater":
                toast("Marked as Saved for Later!");
                break;
              case "favouriteCards":
                toast("Marked as Favorites!");
                break;
              case "buildCards":
                toast("Marked as In Progress!");
                break;
            }
          } else {
            switch (listType) {
              case "savedLater":
                toast("Removed from Saved for Later!");
                break;
              case "favouriteCards":
                toast("Removed from Favorites!");
                break;
              case "buildCards":
                toast("Removed from In Progress!");
                break;
            }
          }
        }
      });
  }

  checkToggle(cardId, type) {
    const completedCards =
      this.state.user[type].length > 0 &&
      this.state.user[type].map((card) => parseInt(card.id));
    return completedCards && completedCards.includes(parseInt(cardId));
  }

  checkCardLockStatus(card, user) {
    if (!!card.locked_by_key) {
      const cardKey = card.locked_by_key;
      if (user.keys.some((key) => key.id == cardKey.id)) {
        return { status: "open", params: cardKey };
      }
      return { status: "lockedByKey", params: cardKey };
    }

    if (!!card.locked_by_xp) {
      const cardXp = card.locked_by_xp;
      if (user.xp > cardXp) {
        return { status: "open", params: cardXp };
      }
      return { status: "lockedByXp", params: cardXp };
    }

    return { status: "open" };
  }

  addToCart(expansion) {
    this.setState(
      {
        cart: this.state.cart.concat(expansion),
      },
      () => Cookies.set("cart", this.state.cart)
    );
  }

  removeFromCart(expansion) {
    const cart = [...this.state.cart];
    const index = cart.findIndex((e) => e.id === expansion.id);

    cart.splice(index, 1);
    this.setState(
      {
        cart: cart,
      },
      () => Cookies.set("cart", this.state.cart)
    );
  }

  toCheckout(total, discount, totalDiscounted) {
    this.setState({
      total,
      discount,
      totalDiscounted,
    });
  }

  onPurchaseComplete() {
    this.setState(
      {
        cart: [],
        total: 0,
        discount: 0,
        totalDiscounted: 0,
      },
      () => Cookies.set("cart", this.state.cart)
    );
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          user: this.state.user,
          cart: this.state.cart,
          total: this.state.total,
          discount: this.state.discount,
          totalDiscounted: this.state.totalDiscounted,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          toCheckout: this.toCheckout,
          onPurchaseComplete: this.onPurchaseComplete,
          onComplete: this.onComplete,
          onSaveFavorBuild: this.onSaveFavorBuild,
          checkToggle: this.checkToggle,
          checkCardLockStatus: this.checkCardLockStatus,
          onRegisterUser: this.onRegisterUser,
          realmsCardsCount: this.calculateRealmCardsProgress(),
          calculateXpFunction: this.calculateXpFunction,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}

export default compose(
  graphql(UPDATE_USER),
  graphql(GET_REALMS_CARDS_COUNTER, { name: "realmsCardsCount" }),
  graphql(GET_USER, {
    name: "dataUser",
    options: (props) => {
      return {
        variables: {
          id: props.children.props.userId,
        },
      };
    },
  })
)(AppProvider);
