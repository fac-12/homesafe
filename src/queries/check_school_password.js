const db_connections = require('../database/db_connections.js')

const check_school_password = (email) => db_connections.query('SELECT id, password, name FROM schools WHERE email=$1', [email]);

module.exports = check_school_password;
