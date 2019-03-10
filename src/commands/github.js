'use strict';
const shell = require('shelljs');
const yaml = require('js-yaml');
const fs   = require('fs');
const runner = require('../utils/runner');
const githubPath = '~/Documents/Github/'


module.exports = (args) => {
  const githubProject = args.g;
  const defaultLocation = `${githubPath}${githubProject}`
  shell.cd(defaultLocation);

  try {
    const config = yaml.safeLoad(fs.readFileSync('./maestro.yml', 'utf8'));
    
    for ( const [serviceName, service] of Object.entries(config.services) ) {
      console.log(`starting service ${serviceName}...`);
      
      const location = service.location ? service.location : defaultLocation;
      runner(service.command, location, serviceName, service.terminalWindow);
    }
  }
  catch (e) {
    console.log(e);
  }
}
