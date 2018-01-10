const test = require('tape');

test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
})
