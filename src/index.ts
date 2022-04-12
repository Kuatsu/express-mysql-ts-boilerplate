import express from 'express';
import AppConfig from './config';
import db from './config/db';
import UserController from './controllers/User';

const app = express();

db.connect(); // Test database connection

app.use(express.json());

app.use('/user', UserController);

app.listen(AppConfig.port, () => {
  console.log(`🚀 Server started at http://localhost:${AppConfig.port}`);
});
