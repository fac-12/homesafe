const request = require('supertest');
const app = require('../src/app.js');
const test = require('tape');




const protectedRoutes = [
  '/view_DA',
  '/parent_profile',
  '/view_children',
  '/add_da_page',
  '/school_profile',
  '/upcoming_schedules',
  '/schedule_pickup',
  '/add_child_page',
  '/add_da_page'
]

protectedRoutes.forEach(protectedRoute => {
  test('All routes should return 403 if you don\'t have a valid cookie', t => {
    request('http://homesafefac.herokuapp.com')
      .get(`${protectedRoute}`)
      .expect(403)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        t.error(err, `Correct status code 403 for route: ${protectedRoute}`);
        t.end();
      });
  });
})

const unprotectedRoutes = [
  '/',
  '/school_login_page',
  '/parent_login_page',
  '/user_select',
  '/user_select_register',
  '/parent_registration_form',
  '/school_registration_form'
]
unprotectedRoutes.forEach(unprotectedRoute => {
  test('All routes should return 200', t => {
    request(app)
      .get(`${unprotectedRoute}`)
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        t.error(err, `Correct status code 200 for route: ${unprotectedRoute}`);
        t.end();
      });
  });
});

// const dummyDa = {
//   first_name: 'jamie',
//   last_name: 'Coe',
//   email: 'jamie.coe@gmail.com',
//   address: '42 Music Street',
//   postcode: 'E1 2345',
//   phone: '07826845360',
// };




// test('Post a new designated adult', (t) => {
//   const express = require('express');
//
//   const application = express();
//   const session = require('express-session');
//
//   app.use(session({
//     secret: process.env.SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 3 * 60 * 60 * 1000,
//     },
//     loggedin: true
//   }))
//   request(app)
//     .post('/add__da')
//     .send(dummyDa)
//     .expect(302)
//     .expect('Content-Type', 'text/html; charset=utf-8')
//     .end((err, res) => {
//       t.error(err, `No errors in the post request`);
//       t.end();
//     });
// });


test.onFinish(() => process.exit(0));
