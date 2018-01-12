const db_connections = require('../database/db_connections');

const parent_children_and_da = (parent_id) => db_connections.query('SELECT children.first_name AS child_name, designated_adults.first_name AS da_name FROM children INNER JOIN designated_adults ON children.parent_id = designated_adults.parent_id and children.parent_id = $1', [parent_id])

module.exports = parent_children_and_da;
