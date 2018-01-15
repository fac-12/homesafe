const db_connections = require('../database/db_connections');

const add_parent = (parent_info) => db_connections.query('INSERT INTO parents (first_name, last_name, email, password, address, postcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [parent_info.first_name, parent_info.last_name, parent_info.email, parent_info.password, parent_info.address, parent_info.postcode, parent_info.phone])

module.exports = add_parent;
