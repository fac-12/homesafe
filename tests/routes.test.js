const request = require('supertest');
const app = require('../src/app.js');
const test = require('tape');

test('All routes should return the expected results', t => {
  request(app)
    .get('/school_profile')
    .expect(403)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});
