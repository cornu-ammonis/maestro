'use strict';
const shell = require('shelljs');
const yaml = require('js-yaml');
const fs   = require('fs');
const serviceRunner = require('../utils/servicerunner');

const githubPath = '~/Documents/Github/'

module.exports = (args) => {
  const githubProject = args.g;
  const defaultLocation = `${githubPath}${githubProject}`
  shell.cd(defaultLocation);

  try {
    const config = yaml.safeLoad(fs.readFileSync('./maestro.yml', 'utf8'));
    
    for ( const [serviceName, service] of Object.entries(config.services) ) {
      log(`starting service ${serviceName}...`);
      
      const location = service.location ? service.location : defaultLocation;
      serviceRunner(service.command, location, serviceName, service.terminalWindow);
    }
  }
  catch (e) {
    log(e);
  }
}
