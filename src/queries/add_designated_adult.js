const db_connections = require('../database/db_connections');

const add_designated_adult = (designated_adult_info) => {
return db_connections.query('INSERT INTO designated_adults (parent_id, first_name, last_name, email, address, postcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)', [designated_adult_info.parent_id, designated_adult_info.first_name, designated_adult_info.last_name, designated_adult_info.email, designated_adult_info.address, designated_adult_info.postcode, designated_adult_info.phone])
}
module.exports = add_designated_adult;
