#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const program = require("commander");
const { storeRepositoriStars } = require("./lib/action");

console.log(
  chalk.red(figlet.textSync("mikirigi-cli", { horizontalLayout: "full" }))
);

program.version("0.0.1").description("CLI for GitHub graphql API v4");

program
  .command("srs")
  .description("store repositori stars <owner/reponame>")
  .action(cmd => {
    const [ownerName, repoName] = cmd.split("/");
    storeRepositoriStars({ ownerName, repoName });
  });

program.parse(process.argv);
