const gql = require("graphql-tag");

exports.ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      login
    }
  }
`;

exports.GetRepository = gql`
  query GetRepository($repoName: String!, $ownerName: String!, $cursor: String) {
    repository(name: $repoName, owner: $ownerName) {
      name
      stargazers(first: 100, after: $cursor, orderBy: { field: STARRED_AT, direction: ASC }) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          starredAt
        }
      }
    }
  }
`;
