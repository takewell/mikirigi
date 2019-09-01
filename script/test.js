const { execQuery } = require("./index");
const { ViewerQuery, GetRepositoryStars } = require("./query");

test("ViewerQuery", async () => {
  const res = await execQuery(ViewerQuery);
  expect(res).toMatchSnapshot();
});

test("GetRepository", async () => {
  const res = await execQuery(GetRepositoryStars, {
    repoName: 'lucet',
    ownerName:'fastly',
    cousor: "Y3Vyc29yOnYyOpO5MjAxOS0wMy0yOFQwMDo1NzozMSswOTowMADOCbBF9g=="
  });
  expect(JSON.stringify(res.data, null, 2)).toMatchSnapshot();
});
