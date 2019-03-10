'use strict';
const shell = require('shelljs');
const yaml = require('js-yaml');
const fs   = require('fs');

module.exports = (command, location, name, terminalWindow) => {

  if (terminalWindow) {
    command = `cd ${location} && ` + command;
    command = `echo "${command}" > ${name}.command; chmod +x ${name}.command; open ${name}.command;`;
  }

  if (shell.exec(command).code !== 0 ) {
    shell.echo(`Error running ${name}`);
    shell.exit(1);
  }
}