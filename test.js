import test from 'ava';

global.td = require('testdouble');

let testLog, entryPoint;
test.beforeEach(t => {
  testLog = td.replace('./src/log').log;
  entryPoint = require('./src/index');
});

test.afterEach(t => {
  td.reset();
})

test ('entryPoint prints expected use of -g flag if improperly specified ', t => {
  process.argv = [ '', '', '' ]
  entryPoint();
  
  td.verify(testLog("expected -g flag to specify github repo name"));
  t.pass();
});

test ('entryPoint is a function', t => {
  t.is(typeof entryPoint, 'function');
});



