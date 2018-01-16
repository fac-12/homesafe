const db_connections = require('../database/db_connections');


const all_schools = ()=> db_connections.query('SELECT name FROM schools')

module.exports = all_schools
