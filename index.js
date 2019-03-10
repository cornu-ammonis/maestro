"use strict";
const minimist = require('minimist');


module.exports = () => {
  const args = minimist(process.argv.slice(2)); // eliminates 'node maestro'
  console.log(args);
}