const gql = require("graphql-tag");

exports.ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      login
    }
  }
`;

exports.GetRepositoryStars = gql`
  query GetRepositoryStars($repoName: String!, $ownerName: String!, $cursor: String) {
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

exports.GetRepositoryLanguages = gql`
  query GetRepositoryLanguages(
    $repoName: String!
    $ownerName: String!
    $corsor: String
  ) {
    repository(name: $repoName, owner: $ownerName) {
      name
      languages(
        first: 100
        after: $corsor
        orderBy: { field: SIZE, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        totalSize
        edges {
          node {
            name
          }
          size
        }
      }
    }
  }
`;

exports.GetRepositoryRelease = gql`
  query GetRepositoryRelease(
    $repoName: String!
    $ownerName: String!
    $corsor: String
  ) {
    repository(name: $repoName, owner: $ownerName) {
      name
      releases(
        first: 100
        after: $corsor
        orderBy: { field: CREATED_AT, direction: ASC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            releaseAssets(first: 100) {
              totalCount
              nodes {
                name
                contentType
                size
              }
            }
            name
            createdAt
            publishedAt
            updatedAt
            isDraft
            isPrerelease
            tagName
          }
        }
      }
    }
  }
`;
