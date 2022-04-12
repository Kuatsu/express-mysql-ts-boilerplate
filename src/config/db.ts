import mysql from 'mysql2/promise';
import AppConfig from '.';

const db = await mysql.createConnection({
  host: AppConfig.database.host,
  user: AppConfig.database.username,
  password: AppConfig.database.password,
  database: AppConfig.database.dbName,
});

export default db;
