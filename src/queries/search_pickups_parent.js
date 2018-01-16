const db_connections = require('../database/db_connections.js')

const search_pickups_parent = (parent_id) => db_connections.query(
  `SELECT scheduled_pickups.pickup_date, children.first_name AS child_name, designated_adults.first_name AS da_name
  FROM scheduled_pickups INNER JOIN children ON scheduled_pickups.child_id = children.id
  INNER JOIN designated_adults ON scheduled_pickups.designated_adult_id = designated_adults.id
  WHERE children.parent_id = scheduled_pickups.parent_id
  AND designated_adults.parent_id = scheduled_pickups.parent_id
  AND scheduled_pickups.parent_id = $1`,
  [
    parent_id
  ]);

module.exports = search_pickups_parent;
