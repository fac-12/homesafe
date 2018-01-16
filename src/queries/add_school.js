const db_connections = require('../database/db_connections');

const add_school = (name, email, password, verification_number, verified) => db_connections.query(
  `INSERT INTO schools
  (name, email, password, verification_number, verified)
  VALUES ($1, $2, $3, $4, $5)`,
  [
    name,
    email,
    password,
    verification_number,
    verified
  ])

module.exports = add_school;
