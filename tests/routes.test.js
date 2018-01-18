const request = require('supertest');
const app = require('../src/app.js');
const test = require('tape');


const protectedRoutes = ['/view_DA', '/parent_profile', '/view_children','/add_da_page',
'/school_profile','/upcoming_schedules','/schedule_pickup','/add_child_page','/add_da_page']
protectedRoutes.forEach(protectedRoute => {
  test('All routes should return 403 if you don\'t have a valid cookie', t => {
  request(app)
    .get(`${protectedRoute}`)
    .expect(403)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      t.error(err,`for ${protectedRoute}`);
      t.same(res.status, 403, `Status code is correct`);
      t.end();
    });
});
})
