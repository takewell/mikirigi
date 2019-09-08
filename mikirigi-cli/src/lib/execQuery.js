const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const { InMemoryCache } = require("apollo-cache-inmemory");

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const API_ENDPOINT = "https://api.github.com/graphql";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: GITHUB_ACCESS_TOKEN
        ? `Bearer ${GITHUB_ACCESS_TOKEN}`
        : null
    }
  };
});

const link = authLink.concat(new HttpLink({ uri: API_ENDPOINT, fetch }));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

exports.execQuery = (query, variables) => {
  return new Promise((resolve, reject) => {
    client
      .query({ query, variables })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
