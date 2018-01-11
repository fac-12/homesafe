const db_connections = require('../database/db_connections');

const add_child = (parent_id, school_id, first_name, last_name, year, dob) => db_connections.query('INSERT INTO children (parent_id, school_id, first_name, last_name, year, dob) VALUES ($1, $2, $3, $4, $5, $6)', [parent_id, school_id, first_name, last_name, year, dob])

module.exports = add_child;
