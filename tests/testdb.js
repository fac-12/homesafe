const test = require('tape');
const runDbBuild = require('../src/database/db_build.js');
// const addParent = require('../src/queries/add_parent');
// const checkParent = require('../src/queries/check_parent');
// const checkSchool = require('../src/queries/check_school');
// const addSchool = require('../src/queries/add_school');

test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
})

// test('check parent exists', (t) => {
//   runDbBuild().then(() => {
//     const email = 'k@a.com';
//     return checkParent(email)
//   }).then((queryRes) => {
//     t.equal(queryRes[0].case, true, 'If parent exists then check_parent should return true- promise');
//     t.end();
//   }).catch((err) => {
//     throw err;
//   })
// })
//
// const dummyParent = {
//   first_name: "user1",
//   last_name: "Blah",
//   email: "blah@blah.com",
//   password: "password",
//   address: "blah",
//   postcode: "blah",
//   phone: "07828873542"
// };
//
// test('testing add_parent query adds a parent', (t) => {
//   runDbBuild().then(() => {
//     return addParent(dummyParent)
//   }).then((res) => {
//     t.equal(res[0].id, 3, 'new user has been added');
//     t.end();
//   }).catch((err) => {
//     throw err;
//   });
// })
//
// const dummySchool = {
//   name: "St James School",
//   email: "blah@blah.com",
//   password: "password",
//   verification_number: "345",
//   verified: "f"
// };
//
// test('check that school doesn\'t exist', (t) => {
//   runDbBuild().then(() => {
//     return checkSchool(dummySchool.email)
//   }).then((res) => {
//     t.equal(res[0].case, false, 'school has not been added');
//     t.end();
//   }).catch((err) => {
//     throw err;
//   });
// })
//
// test('check school exists', (t) => {
//   runDbBuild().then(() => {
//     return addSchool(dummySchool.name, dummySchool.email, dummySchool.password, dummySchool.verification_number, dummySchool.verified)
//   }).then(() => {
//     return checkSchool(dummySchool.email)
//   }).then((res) => {
//     t.equal(res[0].case, true, 'school has been added');
//     t.end();
//   }).catch((err) => {
//     throw err;
//   });
// })
