import 'dotenv/config';

const AppConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.NODE_PORT || '0', 10),
  database: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_DB_NAME,
    port: parseInt(process.env.DATABASE_PORT || '0', 10),
  },
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '0', 10),
  jwtSecret: process.env.JWT_TOKEN || '',
};

export default AppConfig;
