import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateCompletedCards($updateUserInput: updateUserInput) {
    updateUser(input: $updateUserInput) {
      user {
        id
        xp
        completedCards {
          id
          name
          xp
          type
        }
        savedLater {
          id
          name
          xp
          type
        }
        favouriteCards {
          id
          name
          xp
          type
        }
        buildCards {
          id
          name
          xp
          type
        }
        inventory {
          id
        }
        keys {
          id
          name
        }
      }
    }
  }
`;
