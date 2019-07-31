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
    cursor: "Y3Vyc29yOnYyOpO5MjAxOS0wMy0yOFQwMDo1NzozMSswOTowMADOCbBF9g=="
  };
  const res = await execQuery(GetRepositoryStars, v);
  const { repository } = res.data;
  const staredAts = repository.stargazers.edges.map(e => e.starredAt);
  const repoData = {
    name: repository.name,
    totalStarCount: repository.stargazers.totalCount,
    staredAts
  };

  let endCursor = repository.stargazers.pageInfo.endCursor;
  while (true) {
    const resp = await execQuery(GetRepositoryStars, {
      repoName: v.repoName,
      ownerName: v.ownerName,
      cursor: endCursor
    });
    const { repository } = resp.data;
    Array.prototype.push.apply(
      staredAts,
      repository.stargazers.edges.map(e => e.starredAt)
    );
    endCursor = repository.stargazers.pageInfo.endCursor;
    const hasNext = repository.stargazers.pageInfo.hasNextPage;
    console.info('exec', hasNext);
    if (hasNext) {
      continue;
    } else {
      repoData.endCursor = endCursor;
      break;
    }
  }
  await writef("./output.json", JSON.stringify(repoData, null, 2));
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
