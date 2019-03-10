'use strict';
const shell = require('shelljs');
const githubPath = '~/Documents/Github/'


module.exports = (args) => {
  const githubProject = args.g;
  shell.cd(`${githubPath}${githubProject}`);
  console.log(shell.ls());
}