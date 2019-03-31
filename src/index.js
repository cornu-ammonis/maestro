'use strict';
const minimist = require('minimist');
const { log } = require('./log');

module.exports = () => {
  const args = minimist(process.argv.slice(2)); // eliminates 'node maestro' which will always precede real args
  const cmd = args._[0] // base command, may be empty by default

  switch(cmd) {
    default:

      // github service runner is the default command. it expects a -g flag which contains the 
      // foldername of the github repo in which to find/run the services. 
      if (args.g) 
        require('./commands/github')(args);
      else
        log("expected -g flag to specify github repo name");
      break
  }
}