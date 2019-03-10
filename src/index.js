'use strict';
const minimist = require('minimist');


module.exports = () => {
  const args = minimist(process.argv.slice(2)); // eliminates 'node maestro'
  const cmd = args._[0]

  switch(cmd) {
    default:
      if (args.g)
        require('./commands/github')(args);
      else
        console.log("expected -g flag to specify github repo name");
      break
  }
  console.log(args);
}