'use strict';
const shell = require('shelljs');
const yaml = require('js-yaml');
const fs   = require('fs');
const githubPath = '~/Documents/Github/'


module.exports = (args) => {
  const githubProject = args.g;
  shell.cd(`${githubPath}${githubProject}`);

  try {
    const config = yaml.safeLoad(fs.readFileSync('./maestro.yml', 'utf8'));
    console.log(config);
  }
  catch (e) {
    console.log(e);
  }
}