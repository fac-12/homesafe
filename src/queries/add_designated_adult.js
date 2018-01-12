const db_connections = require('../database/db_connections');

const add_designated_adult = (parent_id, first_name, last_name, email, address, postcode, phone) => {
return db_connections.query('INSERT INTO designated_adults (parent_id, first_name, last_name, email, address, postcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)', [parent_id, first_name, last_name, email, address, postcode, phone])
}
module.exports = add_designated_adult;
