const db_connections = require('../database/db_connections');

const add_child = (child_info) => {
  return db_connections.query(
    `INSERT INTO children
    (parent_id, school_id, first_name, last_name, year, dob)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      child_info.parent_id, 
      child_info.school_id,
      child_info.first_name,
      child_info.last_name,
      child_info.year,
      child_info.dob
    ])
}
module.exports = add_child;
