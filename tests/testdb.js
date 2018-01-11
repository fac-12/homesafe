const test = require('tape');
const bcrypt = require('bcryptjs');
const runDbBuild = require('../src/database/db_build.js');
const check_parent = require('../src/queries/check_parent.js');

test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
})

// test('check parent exists promise query', (t) => {
//     runDbBuild().then(() => {
//       let email = 'k@a.com';
//       check_parent(email)
//     }).then((queryRes) => {
//       t.equal(queryRes[0].case, true, 'If parent exists then check_parent should return true- promise');
//       t.end();
//     }).catch((err) => {
//       throw err;
//     })
//   })

test('check parent exists query', (t) => {
  runDbBuild(function(err, res) {
    let email = 'k@a.com';
    check_parent(email, (err, res) => {
      if(err) console.log(err);
      t.equal(res[0].case, true, 'If parent exists then check_parent should return true');
    })
    let email2 ='fjdfhk@fsjfl.com';
    check_parent(email2, (err, res) => {
      if(err) console.log( err);
        t.equal(res[0].case, false, 'If parent does not exist then check_parent should return false');
        t.end();
    })
  })
})
