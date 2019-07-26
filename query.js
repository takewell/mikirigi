const gql = require('graphql-tag');

exports.ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      login
   }
  }
`

exports.getStars = gql`
  query 
{
  repository(name: "tensorflow", owner: "tensorflow") {
    name
    stargazers(last: 100, before:"Y3Vyc29yOnYyOpO5MjAxOS0wNy0yM1QwNTozMDoyMiswOTowMADOCrBMgg==" orderBy: {field: STARRED_AT direction: ASC} ) {
      totalCount
      pageInfo{
        hasNextPage,
        startCursor,
        endCursor
      }
      edges {
        starredAt
        node {
          name
        }
      }
    }
  }
}

`