const puppeteer = require("puppeteer");
const { writef } = require('../src/lib/action');
const keyword = 'iot'

(async () => {
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
      `https://www.npmjs.com/search?q=keywords%3A${keyword}&page=${pageNum}&perPage=20`,
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

  const v = await Promise.all(
    [...Array(2).keys()].map(i => {
      const f = getKeyword({ keyword , pageNum: i });
      return f
    })
  )
  await writef(
    `${process.cwd()}/${ownerName}_${keyword}_.json`,
    JSON.stringify(repoData, null, 2)
  );
  await browser.close();
})();
