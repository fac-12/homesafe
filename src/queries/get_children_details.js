const db_connections = require('../database/db_connections');

const get_children_details = (parent_id) => db_connections.query(
  `SELECT first_name,last_name FROM children WHERE parent_id = $1`,
  [
    parent_id
  ]);


module.exports = get_children_details;
