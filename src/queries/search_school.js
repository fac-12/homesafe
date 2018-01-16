const db_connections = require('../database/db_connections.js')

const search_school = (school_name) => db_connections.query(
  `SELECT CASE WHEN EXISTS
  (SELECT name FROM schools WHERE name = $1)
  THEN CAST (true AS BOOLEAN)
  ELSE CAST (false AS BOOLEAN) END`,
  [
    school_name
  ]);

module.exports = search_school;
