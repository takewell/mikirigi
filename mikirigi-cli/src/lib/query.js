const gql = require("graphql-tag");

exports.ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      login
    }
  }
`;

exports.GetRepositoryStars = gql`
  query GetRepositoryStars(
    $repoName: String!
    $ownerName: String!
    $cursor: String
  ) {
    repository(name: $repoName, owner: $ownerName) {
      nameWithOwner
      stargazers(
        first: 100
        after: $cursor
        orderBy: { field: STARRED_AT, direction: ASC }
      ) {
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
      nameWithOwner
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

exports.GetRepositoryReleases = gql`
  query GetRepositoryReleases(
    $repoName: String!
    $ownerName: String!
    $corsor: String
  ) {
    repository(name: $repoName, owner: $ownerName) {
      nameWithOwner
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
            name
            createdAt
            publishedAt
            updatedAt
            isDraft
            isPrerelease
            tagName
            releaseAssets(first: 100) {
              totalCount
              nodes {
                name
                contentType
                size
              }
            }
          }
        }
      }
    }
  }
`;
