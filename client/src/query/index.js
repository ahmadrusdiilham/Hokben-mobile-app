const { gql } = require("@apollo/client");

export const GET_ITEMS = gql`
  query Query {
    getItems {
      name
      imgUrl
      id
    }
  }
`;

export const GET_ITEMS_AND_CATEGORIES = gql`
  query Query {
    getItems {
      name
      imgUrl
      id
    }
    getCategories {
      name
      id
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    getCategories {
      id
      name
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query Query($getItemId: ID!) {
    getItem(id: $getItemId) {
      id
      name
      imgUrl
      price
      description
      CategoryId
      Category {
        name
        id
      }
      User {
        email
      }
      Ingredients {
        name
        id
        ItemId
      }
    }
  }
`;
