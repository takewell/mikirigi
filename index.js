const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { ViewerQuery } = require("./query");

// TODO: 環境変数にする

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const link = authLink.concat(
  new HttpLink({ uri: "https://api.github.com/graphql", fetch })
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const execQuery = query => {
  client
    .query({ query })
    .then(resp => console.log(resp.data.viewer.login))
    .catch(error => console.error(error));
};

execQuery(ViewerQuery);
