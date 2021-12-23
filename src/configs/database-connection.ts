import {createConnection} from 'mysql2';

import {host, password, database, user, mysqlPort} from './env';

// Initialization db connection
export default createConnection({
  host,
  port: mysqlPort as number,
  user,
  password,
  database,
  multipleStatements: true,
});
