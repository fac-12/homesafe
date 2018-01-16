const db_connections = require('../database/db_connections');

const check_verification_number = (verification_number) => {
  return db_connections.query(
    `SELECT verification_number
    FROM schools
    WHERE verification_number = $1`,
    [
      verification_number
    ])
}

module.exports = check_verification_number;
