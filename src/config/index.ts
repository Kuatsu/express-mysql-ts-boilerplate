import 'dotenv/config';

const AppConfig = {
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_DB_NAME,
  },
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '0', 10),
};

export default AppConfig;
