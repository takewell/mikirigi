const { execNPMQuery } = require("../src/lib/execQuery");

/**
 * Limits
 * Bulk queries are limited to at most 128 packages at a time and at most 365 days of data.
 * All other queries are limited to at most 18 months of data. The earliest date for which data will be returned is January 10, 2015.
 */

test("Get npm donwloads api", async () => {
  const ranges = ["2018-03-01:2019-09-01", "2016-09-01:2018-02-28"]
  const res = await execNPMQuery("react", ranges[1]);
  const json = await res.json()
  console.log("res", json);
  // expect(res).toMatchSnapshot();
});
