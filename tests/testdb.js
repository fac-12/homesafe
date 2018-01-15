const test = require('tape');
const runDbBuild = require('../src/database/db_build.js');
// const check_parent = require('../src/queries/check_parent.js')

test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
})
//
// test('check parent exists', (t) => {
//      runDbBuild().then(() => {
//        let email = 'k@a.com';
//        return check_parent(email)
//      }).then((queryRes) => {
//        t.equal(queryRes[0].case, true, 'If parent exists then check_parent should return true- promise');
//        t.end();
//      }).catch((err) => {
//        throw err;
//      })
//    })
