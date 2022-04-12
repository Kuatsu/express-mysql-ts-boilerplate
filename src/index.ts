import express from 'express';
import helmet from 'helmet';
import AppConfig from './config';
import db from './config/db';
import UserController from './controllers/User';
import ApiError from './utils/ApiError';

const app = express();

db.connect(); // Test database connection

app.use(express.json());
app.use(helmet());

app.use('/user', UserController);

// Error handler
app.use((error: ApiError, req: express.Request, res: express.Response, _next: express.NextFunction) => res
  .status(error.statusCode)
  .json({ code: error.code, error: AppConfig.nodeEnv === 'development' ? error.data.error : undefined }));

app.listen(AppConfig.port, () => {
  console.log(`🚀 Server started at http://localhost:${AppConfig.port}`);
});
