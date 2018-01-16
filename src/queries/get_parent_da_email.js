const db_connections = require('../database/db_connections');

const get_parent_da_email = (designated_adult_id,parent_id) => db_connections.query(
  `SELECT designated_adults.email AS da_email,parents.email FROM designated_adults
  INNER JOIN parents ON designated_adults.parent_id = parents.id
  WHERE designated_adults.id = $1 AND parents.id = $2`,
  [
    designated_adult_id,
    parent_id
  ]);


module.exports = get_parent_da_email;
