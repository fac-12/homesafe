const db_connections = require('../database/db_connections');

const parent_child_da_id = (parent_id, children_first_name, designated_adults_first_name) => {
return db_connections.query('SELECT children.id AS child_id, designated_adults.id AS da_id FROM children INNER JOIN designated_adults ON children.parent_id = designated_adults.parent_id and children.first_name = $2 and designated_adults.first_name = $3 AND children.parent_id = $1 AND designated_adults.parent_id = $1', [parent_id, children_first_name, designated_adults_first_name])
}

module.exports = parent_child_da_id;
