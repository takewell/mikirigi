const { execQuery } = require("../src/lib/execQuery");
const { ViewerQuery, GetRepositoryStars } = require("../src/lib/query");

test("ViewerQuery", async () => {
  const res = await execQuery(ViewerQuery);
  expect(res).toMatchSnapshot();
});
