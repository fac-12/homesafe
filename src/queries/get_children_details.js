const db_connections = require('../database/db_connections');

const get_chidren_details = (parent_id) => db_connections.query(
  `SELECT children.first_name,children.last_name FROM children WHERE children.parent_id = $1`,
  [
    parent_id
  ]);


module.exports = get_children_details;
