const db_connections = require('../database/db_connections');

const update_verified_status = (verification_number) =>{
  db_connections.query('UPDATE schools SET verified = true WHERE verification_number = $1', [verification_number])
}

module.exports = update_verified_status;
