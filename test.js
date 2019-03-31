import test from 'ava';
global.td = require('testdouble');

// TODO: break out helpers/before and after each, and tests per module, into separate files as number becomes significant 

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



// Service Runner Tests

test ('servicerunner is a function', t => {
  const serviceRunner = require('./src/utils/servicerunner');
  t.is(typeof serviceRunner, 'function');
});


const command = 'test command to execute';
const location = 'some/dir';
const name = 'somename';
const terminalWindow = true;

const expectedCommandString = `echo "cd ${location} && ${command}" > ${name}.command; chmod +x ${name}.command; open ${name}.command;`;

test ('servicerunner executes and returns command string with correct incorporation of arguments', t => {
  const stubExec = td.func();
  td.when(stubExec(td.matchers.isA(String))).thenReturn({code: 0});
  const testShell = td.replace('shelljs', {
    exec: stubExec
  });

  const serviceRunner = require('./src/utils/servicerunner');
 

  const returnedCommand = serviceRunner(command, location, name, terminalWindow);

  t.is(returnedCommand, expectedCommandString);
  td.verify(testShell.exec(expectedCommandString));
});


