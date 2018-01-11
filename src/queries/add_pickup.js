const db_connections = require('../database/db_connections');

const add_pickup = (parent_id, child_id, pickup_date, keyword) => db_connections.query('INSERT INTO scheduled_pickups (parent_id, child_id, pickup_date, keyword) VALUES ($1, $2, $3, $4)', [parent_id, child_id, pickup_date, keyword])

module.exports = add_pickup;
