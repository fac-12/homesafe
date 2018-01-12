const db_connections = require('../database/db_connections');

const add_pickup = (pickup_info) => db_connections.query('INSERT INTO scheduled_pickups (parent_id, child_id, pickup_date, keyword) VALUES ($1, $2, $3, $4)', [pickup_info.parent_id, pickup_info.child_id, pickup_info.pickup_date, pickup_info.keyword])

module.exports = add_pickup;
