const db_connections = require('../database/db_connections.js')

const check_parent_password = (email) => db_connections.query('SELECT password, first_name FROM parents WHERE email=$1', [email]);

module.exports = check_parent_password;
