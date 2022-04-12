import express, { Request, Response } from 'express';

const app = express();
const port = 1337;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
})

app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`);
})
