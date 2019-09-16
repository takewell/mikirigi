const fs = require("fs");
const { execQuery } = require("./execQuery");
const {
  ViewerQuery,
  GetRepositoryStars,
  GetRepositoryLanguages,
  GetRepositoryReleases
} = require("./query");

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
    endCursor: "",
    execDate: new Date()
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

exports.storeRepositoriLanguages = async ({ ownerName, repoName }) => {
  const res = await execQuery(GetRepositoryLanguages, {
    ownerName,
    repoName
  });
  const { repository } = res.data;
  const languages = repository.languages.edges.map(e => {
    return {
      name: e.node.name,
      size: e.size
    };
  });
  const repoData = {
    name: repository.name,
    totalCount: repository.languages.totalCount,
    languages,
    endCursor: "",
    execDate: new Date()
  };

  let endCursor = repository.languages.pageInfo.endCursor;
  const hasSecond = repository.languages.pageInfo.hasNextPage;
  console.info("exec", hasSecond);
  while (true) {
    if (!hasSecond) {
      break;
    }
    const resp = await execQuery(GetRepositoryLanguages, {
      repoName,
      ownerName,
      cursor: endCursor
    });
    const { repository } = resp.data;
    Array.prototype.push.apply(
      languages,
      repository.languages.edges.map(e => {
        return {
          name: e.node.name,
          size: e.size
        };
      })
    );
    endCursor = repository.languages.pageInfo.endCursor;
    const hasNext = repository.languages.pageInfo.hasNextPage;
    console.info("exec", hasNext);
    if (hasNext) {
      continue;
    } else {
      repoData.endCursor = endCursor;
      break;
    }
  }
  await writef(
    `${process.cwd()}/${ownerName}_${repoName}_languages.json`,
    JSON.stringify(repoData, null, 2)
  );
};

exports.storeRepositoriReleases = async ({ ownerName, repoName }) => {
  const res = await execQuery(GetRepositoryReleases, {
    ownerName,
    repoName
  });
  const { repository } = res.data;
  const releases = repository.releases.edges.map(e => {
    const {
      name,
      createdAt,
      publishedAt,
      updatedAt,
      isDraft,
      isPrerelease,
      tagName,
      releaseAssets
    } = e.node;
    return {
      name,
      createdAt,
      publishedAt,
      updatedAt,
      isDraft,
      isPrerelease,
      tagName,
      releaseAssetsCount: releaseAssets.totalCount,
      releaseAssets: releaseAssets.nodes.map(e => {
        const { name, contentType, size } = e;
        return {
          name,
          contentType,
          size
        };
      })
    };
  });
  const repoData = {
    name: repository.name,
    totalCount: repository.releases.totalCount,
    releases,
    endCursor: "",
    execDate: new Date()
  };

  let endCursor = repository.releases.pageInfo.endCursor;
  const hasSecond = repository.releases.pageInfo.hasNextPage;
  console.info("exec", hasSecond);
  while (true) {
    if (!hasSecond) {
      break;
    }
    const resp = await execQuery(GetRepositoryReleases, {
      repoName,
      ownerName,
      cursor: endCursor
    });
    const { repository } = resp.data;
    Array.prototype.push.apply(
      releases,
      repository.releases.edges.map(e => {
        const {
          name,
          createdAt,
          publishedAt,
          updatedAt,
          isDraft,
          isPrerelease,
          tagName,
          releaseAssets
        } = e.node;
        return {
          name,
          createdAt,
          publishedAt,
          updatedAt,
          isDraft,
          isPrerelease,
          tagName,
          releaseAssetsCount: releaseAssets.totalCount,
          releaseAssets: releaseAssets.nodes.map(e => {
            const { name, contentType, size } = e;
            return {
              name,
              contentType,
              size
            };
          })
        };
      })
    );
    endCursor = repository.releases.pageInfo.endCursor;
    const hasNext = repository.releases.pageInfo.hasNextPage;
    console.info("exec", hasNext);
    if (hasNext) {
      continue;
    } else {
      repoData.endCursor = endCursor;
      break;
    }
  }
  await writef(
    `${process.cwd()}/${ownerName}_${repoName}_releases.json`,
    JSON.stringify(repoData, null, 2)
  );
};
