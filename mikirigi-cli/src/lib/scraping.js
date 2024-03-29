const puppeteer = require("puppeteer");

exports.scrapingNPMPackages = async (keyword) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const getKeywordTotalCount = async ({ keyword }) => {
    const page = await browser.newPage();
    await page.goto(
      `https://www.npmjs.com/search?q=keywords%3A${keyword}&page=1&perPage=20`,
      {
        waitUntil: "domcontentloaded"
      }
    );
    const json = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("h2"), e => e.innerText);
      // return {
      //   totalCount,
      //   totalPage: Math.round(totalCount / 20)
      // };
    });
    return page.close().then(() => {
      return new Promise((resolve, reject) =>
        json ? resolve(json) : reject(new Error("json undefind"))
      );
    });
  };

  const getKeyword = async ({ keyword, pageNum }) => {
    const page = await browser.newPage();
    await page.goto(
      `https://www.npmjs.com/search?ranking=popularity&q=keywords%3A${keyword}&page=${pageNum}&perPage=20`,
      {
        waitUntil: "domcontentloaded"
      }
    );
    const json = await page.evaluate(() => {
      const names = Array.from(
        document.querySelectorAll(".flex.flex-row.items-end.pr3"),
        e => e.innerText
      );
      const descriptions = Array.from(
        document.querySelectorAll(".w-80 > p"),
        e => e.innerText
      );
      const keywords = Array.from(document.querySelectorAll(".w-80 > ul"), e =>
        e.innerText.split("\n")
      );
      const authors = Array.from(
        document.querySelectorAll(".flex.flex-row.pl1.br3"),
        e => e.innerText
      );
      return names.map((name, i) => {
        return {
          name,
          descriptions: descriptions[i],
          keyword: keywords[i],
          author: authors[i]
        };
      });
    });
    return page.close().then(() => {
      return new Promise((resolve, reject) =>
        json ? resolve(json) : reject(new Error("json undefind"))
      );
    });
  };

  // flat を polifill
  if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
      var flattend = [];
      (function flat(array, depth) {
        for (let el of array) {
          if (Array.isArray(el) && depth > 0) {
            flat(el, depth - 1); 
          } else {
            flattend.push(el);
          }
        }
      })(this, Math.floor(depth) || 1);
      return flattend;
    };
  }

  const packages = await Promise.all(
    [...Array(100).keys()].map(i => {
      const f = getKeyword({ keyword, pageNum: i });
      return f;
    })
  );

  await browser.close();
  return packages.flat();
};

exports.scrapingPackagesProperty = async (name) => {

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const getPrpperty = async ({name}) => {
    const page = await browser.newPage();
    await page.goto(
      `https://www.npmtrends.com/${name}`,
      {
        waitUntil: "domcontentloaded"
      }
    )
    const json = await page.evaluate(() => {
      // const nameWithOwer = document.querySelector("table.table > tbody > tr > td > a.name-header").href.replace('https://github.com/', '')
      const names = Array.from(
        document.querySelectorAll("table.table > tbody > tr > td"),
        e => e.innerText
      );
      return names;
      // const stars = document.querySelectorAll("table.table > tbody > tr > td")[1].innerText
      // const forks = document.querySelectorAll("table.table > tbody > tr > td")[2].innerText
      // const issues = document.querySelectorAll("table.table > tbody > tr > td")[3].innerText
      // return {
      //   name,
      //   // nameWithOwer,
      //   stars,
      //   forks,
      //   issues
      // }  
    });
    return page.close().then(() => {
      return new Promise((resolve, reject) =>
        json ? resolve(json) : reject(new Error("json undefind"))
      );
    });
  }

  const property = await getPrpperty({name})
  await browser.close();
  return property
}
