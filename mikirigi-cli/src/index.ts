#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

console.log(
  chalk.red(
    figlet.textSync('mikirigi-cli', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .description("CLI for GitHub graphql API v4")
  .option('-p, --peppers', 'Add peppers')
  .parse(process.argv);
