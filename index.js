const fs = require("fs");
const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { ViewerQuery, GetRepositoryStars } = require("./query");

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

const execQuery = (query, variables) => {
  return new Promise((resolve, reject) => {
    client
      .query({ query, variables })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};


(async () => {
  const v = {
    repoName: "lucet",
    ownerName: "fastly",
    cousor: "Y3Vyc29yOnYyOpO5MjAxOS0wMy0yOFQwMDo1NzozMSswOTowMADOCbBF9g=="
  };
  const res = await execQuery(GetRepositoryStars, v);
  const { repository } = res.data;
  const starredAts = repository.stargazers.edges.map(e => e.starredAt);
  const repo = {
    name: repository.name,
    totalStarCount: repository.stargazers.totalCount,
    starredAts: starredAts
  };
  let endCursor = repository.stargazers.pageInfo.endCursor;
  await writef("./output.json", JSON.stringify(repo, null, 2));
})();

const writef = (filepath, data) => {
  return new Promise((resolve, reject) => {
    return fs.writeFile(filepath, data, err => {
      return err ? reject(err) : resolve();
    });
  });
};

module.exports = {
  execQuery
};
