import express, { Request, Response } from 'express';
import AppConfig from './config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(AppConfig.port, () => {
  console.log(`🚀 Server started at http://localhost:${AppConfig.port}`);
});
