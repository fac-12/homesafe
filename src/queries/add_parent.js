const db_connections = require('../database/db_connections');

const add_parent = (first_name, last_name, email, password, address, postcode, phone) => db_connections.query('INSERT INTO parents (first_name, last_name, email, password, address, postcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)', [first_name, last_name, email, password, address, postcode, phone])

module.exports = add_parent;
