const db_connections = require('../database/db_connections');

const get_school_id = (school_name) => db_connections.query(
  `SELECT id FROM schools WHERE name = $1`,
  [
    school_name
  ])

module.exports = get_school_id;
