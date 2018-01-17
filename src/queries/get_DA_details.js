const db_connections = require('../database/db_connections');

const get_DA_details = (parent_id) => db_connections.query(
  `SELECT designated_adults.first_name,designated_adults.last_name FROM designated_adults WHERE designated_adults.parent_id = $1`,
  [
    parent_id
  ]);


module.exports = get_DA_details;
