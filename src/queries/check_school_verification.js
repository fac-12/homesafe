const db_connections = require('../database/db_connections');

const check_school_verification = (email) =>{
  db_connections.query('SELECT verified FROM schools WHERE email = $1', [email])
}

module.exports = check_school_verification;
