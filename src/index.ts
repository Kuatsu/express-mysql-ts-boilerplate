import express, { Request, Response } from 'express';
import AppConfig from './config';
import db from './config/db';

const app = express();

db.connect(); // Test database connection

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(AppConfig.port, () => {
  console.log(`🚀 Server started at http://localhost:${AppConfig.port}`);
});
