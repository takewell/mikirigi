#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const program = require("commander");
const {
  storerepositoryStars,
  storerepositoryLanguages,
  storerepositoryReleases
} = require("./lib/action");
const Repo = require('./models/repos');

Repo.sync({force: false })

console.log(
  chalk.red(figlet.textSync("mikirigi-cli", { horizontalLayout: "full" }))
);

program.version("0.0.1").description("CLI for GitHub graphql API v4");

program
  .command("srs")
  .description("store repository stars <owner/reponame>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storerepositoryStars({ ownerName, repoName });
  });

program
  .command("srl")
  .description("store repository languages <owner/reponame>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storerepositoryLanguages({ ownerName, repoName });
  });

program
  .command("srr")
  .description("store repository releases <owner/reponame>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storerepositoryReleases({ ownerName, repoName });
  });

program.parse(process.argv);
