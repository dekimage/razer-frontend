import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";

// process.browser -> typeof window === "undefined" // I should swap it for this probably cus its deprecated - only if it makes any problem in future

// Replace this with your project's endpoint
const GQL_API =
  `${process.env.API_URL}/graphql` ||
  "https://titan-backend-3-5-0.herokuapp.com/graphql" ||
  "http://localhost:1337/graphql";
let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const httpLink = createHttpLink({
  uri: GQL_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("jwt");
  // console.log("JWT Token:", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function createApolloClient(initialState) {
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState || {}),
    link: authLink.concat(httpLink),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}
