const db_connections = require('../database/db_connections.js')

const search_pickups = (date) => db_connections.query('SELECT * FROM scheduled_pickups WHERE pickup_date=$1', [date]);

module.exports = search_pickups;
