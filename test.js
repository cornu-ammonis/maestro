import test from 'ava';
const entryPoint = require('./src/index');

test ('entryPoint is a function', t => {
  t.is(typeof entryPoint, 'function');
});

