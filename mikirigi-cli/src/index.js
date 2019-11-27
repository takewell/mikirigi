#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const program = require("commander");
const {
  wirteRepositoryStars,
  storerepositoryLanguages,
  storerepositoryReleases,
  wirteRepositoryDownloads,
  writeNPMkeywordPackages
} = require("./lib/action");
const Repo = require("./models/repos");
const RepoStas = require("./models/repoStats");
const Star = require("./models/stars");
const DownLoad = require("./models/downloads");
const { database } = require("../src/lib/databaseLoader");

// Repo.sync({ force: false }).then(() => {
//   RepoStas.belongsTo(Repo, { foreignKey: 'nameWithOwner' });
//   Star.belongsTo(Repo, { foreignKey: 'nameWithOwner' });
//   DownLoad.belongsTo(Repo, { foreignKey: 'nameWithOwner' });
//   RepoStas.sync();
//   Star.sync();
//   DownLoad.sync();
// })

console.log(
  chalk.red(figlet.textSync("mikirigi-cli", { horizontalLayout: "full" }))
);

program.version("0.0.1").description("CLI for GitHub graphql API v4");

program
  .command("sr")
  .description("insert repository <nameWithOwner>")
  .action(cmd => {
    Repo.upsert({
      nameWithOwner: cmd
    }).then(() => {
      database.close();
    });
  });

program
  .command("wrs")
  .description("write repository stars <nameWithOwner>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    wirteRepositoryStars({ ownerName, repoName });
  });

program
  .command("wrl")
  .description("write repository languages <nameWithOwner>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storerepositoryLanguages({ ownerName, repoName });
  });

program
  .command("wrr")
  .description("write repository releases <nameWithOwner>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storerepositoryReleases({ ownerName, repoName });
  });

program
  .command("wrd")
  .description("write repository downloads by npm <name>")
  .action(cmd => {
    wirteRepositoryDownloads({ name: cmd });
  });

program
  .command("wkp")
  .description("write keywords packages by npm <name>")
  .action(cmd => {
    writeNPMkeywordPackages({ keyword: cmd });
  });

program.parse(process.argv);
