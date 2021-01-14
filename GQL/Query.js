import gql from "graphql-tag";
// Security Vulnrability?? - JSON type
export const GET_FILTERED_CARDS = gql`
  query($id: JSON) {
    cards(where: { id: $id }) {
      id
      name
    }
  }
`;

export const GET_EXPANSION = gql`
  query($id: ID!) {
    expansion(id: $id) {
      id
      name
      price
      description
      image {
        url
      }
      logo {
        url
      }
      key {
        id
        name
        cards {
          id
          name
        }
      }
      description
    }
  }
`;

export const GET_ALL_EXPANSIONS = gql`
  {
    expansions {
      id
      name
      description
      price
      logo {
        url
      }
      image {
        url
      }
      key {
        id
        name
        locks_card {
          id
          name
        }
      }
    }
  }
`;

export const GET_REALMS_CARDS_COUNTER = gql`
  {
    realms {
      id
      name
      logo {
        url
      }
      cards {
        id
      }
    }
  }
`;

export const GET_ALL_REALMS = gql`
  {
    realms {
      id
      name
      description

      cover {
        url
      }
      background {
        url
      }
      logo {
        url
      }
      cards {
        id
        type
      }
    }
  }
`;

export const GET_REALM = gql`
  query($id: ID!) {
    realm(id: $id) {
      id
      name
      cover {
        url
      }
      background {
        url
      }
      logo {
        url
      }
      description
    }
  }
`;

export const GET_REALM_CARDS = gql`
  query($id: ID!) {
    realm(id: $id) {
      id
      name
      description
      cover {
        url
      }
      background {
        url
      }
      logo {
        url
      }

      cards {
        id
        name
        xp
        type
        rarity
        expansion {
          id
          name
          image {
            url
          }
        }
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
          cover {
            url
          }
          background {
            url
          }

          logo {
            url
          }
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }
    }
  }
`;

export const GET_CARD = gql`
  query($id: ID!) {
    card(id: $id) {
      id
      name

      expansion {
        id
        name
      }

      logo {
        url
      }
      image {
        url
      }
      realm {
        id
        name

        logo {
          url
        }
      }
      isOpen
      rarity
      xp
      type
      locked_by_xp

      locked_by_key {
        id
        name
      }
      relatedCards {
        id
        name
        xp
        type
        rarity
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }
    }
  }
`;

export const GET_CARD_PAGE = gql`
  query($id: ID!) {
    cardPage(id: $id) {
      id
      name
      description

      expansion {
        id
        name
      }
      logo {
        url
      }
      image {
        url
      }

      spells {
        id
        name
        description
        type
        image {
          url
        }
      }
      realm {
        id
        name

        logo {
          url
        }
        background {
          url
        }
        cover {
          url
        }
      }

      isOpen
      rarity
      xp
      type
      locked_by_xp

      locked_by_key {
        id
        name
      }
      relatedCards {
        id
        name
        xp
        type
        rarity
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_CARDS = gql`
  {
    cards {
      id
      name
      xp
      type
      description

      rarity
      isOpen
      logo {
        url
      }
      realm {
        id
        name
      }

      locked_by_xp

      locked_by_key {
        id
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      xp
      username
      orders {
        id
        amount
        originalPrice
        status
        discountApplied
        created_at
      }
      spells {
        id
        name
        type
        description
        image {
          url
        }
        card {
          id
          realm {
            id
            name
            logo {
              url
            }
          }
        }
      }

      completedCards {
        id
        name
        xp
        type
        rarity
        expansion {
          id
          name
        }
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name

          logo {
            url
          }
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
        spells {
          id
          name
          description
          type
          image {
            url
          }
        }
      }
      savedLater {
        id
        name
        xp
        type
        rarity
        expansion {
          id
          name
        }
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }
      favouriteCards {
        id
        name
        xp
        type
        rarity
        expansion {
          id
          name
        }
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }
      buildCards {
        id
        name
        xp
        type
        rarity
        expansion {
          id
          name
        }
        isOpen

        image {
          url
        }
        logo {
          url
        }
        realm {
          id
          name
        }

        locked_by_xp

        locked_by_key {
          id
          name
        }
      }

      keys {
        id
        name
        description
        image {
          url
        }
        locks_card {
          id
          name
        }
        expansion {
          id
          name
        }
      }
    }
  }
`;
