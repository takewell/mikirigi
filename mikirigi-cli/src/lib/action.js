const fs = require("fs");
const { execQuery } = require("./execQuery");
const { ViewerQuery, GetRepositoryStars } = require("./query");

const writef = (filepath, data) => {
  return new Promise((resolve, reject) => {
    return fs.writeFile(filepath, data, err => {
      return err ? reject(err) : resolve();
    });
  });
};

exports.storeRepositoriStars = async ({ ownerName, repoName }) => {
  const res = await execQuery(GetRepositoryStars, {
    ownerName,
    repoName
  });
  const { repository } = res.data;
  const staredAts = repository.stargazers.edges.map(e => e.starredAt);
  const repoData = {
    name: repository.name,
    totalStarCount: repository.stargazers.totalCount,
    staredAts,
    endCursor: ""
  };

  let endCursor = repository.stargazers.pageInfo.endCursor;
  while (true) {
    const resp = await execQuery(GetRepositoryStars, {
      repoName,
      ownerName,
      cursor: endCursor
    });
    const { repository } = resp.data;
    Array.prototype.push.apply(
      staredAts,
      repository.stargazers.edges.map(e => e.starredAt)
    );
    endCursor = repository.stargazers.pageInfo.endCursor;
    const hasNext = repository.stargazers.pageInfo.hasNextPage;
    console.info("exec", hasNext);
    if (hasNext) {
      continue;
    } else {
      repoData.endCursor = endCursor;
      break;
    }
  }
  await writef(
    `${process.cwd()}/${ownerName}_${repoName}_stars.json`,
    JSON.stringify(repoData, null, 2)
  );
};
