const db_connections = require('../database/db_connections.js')

const check_parent = (email) => db_connections.query('SELECT CASE WHEN EXISTS(SELECT email FROM parents WHERE email = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END', [email])

module.exports = check_parent;
