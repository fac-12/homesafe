const db_connections = require('../database/db_connections.js')

const search_pickups = (school_id, today_date) => db_connections.query(
  `SELECT scheduled_pickups.pickup_date,scheduled_pickups.keyword, children.first_name AS child_first_name, children.last_name AS child_last_name, children.school_id, designated_adults.first_name AS da_first_name, designated_adults.last_name AS da_last_name
  FROM scheduled_pickups INNER JOIN children ON scheduled_pickups.child_id = children.id
  INNER JOIN designated_adults ON scheduled_pickups.designated_adult_id = designated_adults.id
  WHERE children.school_id = $1 AND scheduled_pickups.pickup_date = $2`,
  [
    school_id,
    today_date
  ]);

module.exports = search_pickups;
