import 'dotenv/config';

const AppConfig = {
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_DB_NAME,
  },
};

export default AppConfig;
