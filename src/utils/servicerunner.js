'use strict';
const shell = require('shelljs');
const yaml = require('js-yaml');
const fs   = require('fs');

// @param string command -- the command to run
// @param string location -- filepath where we want to run the command 
// @param string name -- name of the service 
// @param bool terminalWindow -- flag whether to open command in a new terminal window
module.exports = (command, location, name, terminalWindow) => {

  // runs the command in a new terminal window without relying on osascript. the recipe: 
  // 1. prepend the command with 'cd' to the command's location
  // 2. echo the command to ${name}.command
  // 3. make ${name}.command executable 
  // 4. open ${name}.command
  if (terminalWindow) {
    command = `cd ${location} && ` + command;
    command = `echo "${command}" > ${name}.command; chmod +x ${name}.command; open ${name}.command;`;
  }

  // this is what actually runs the command
  if (shell.exec(command).code !== 0 ) {
    // TODO: keep the processes around so that maestro can terminate them if needed, or if we run shutdown
    // this is probably required before running a command without terminalWindow = true will make sense
    shell.echo(`Error running ${name}`);
    shell.exit(1);
  }

  return command;
}