import express from 'express';
import helmet from 'helmet';
import AppConfig from './config';
import db from './config/db';
import UserController from './controllers/User';
import AuthController from './controllers/Auth';
import ApiError from './utils/ApiError';
import JwtTokenService from './services/JwtToken';
import JwtTokenModel from './models/JwtToken';
import UserModel from './models/User';
import UserService from './services/User';
import LocalAuthModel from './models/LocalAuth';
import VerifyJwtMiddleware from './middlewares/VerifyJwt';

const app = express();
const router = express.Router();

db.connect(); // Test database connection

// Build needed dependencies for injection into services / controllers / models
const localAuthModel = new LocalAuthModel(db);
const jwtTokenModel = new JwtTokenModel(db);
const userModel = new UserModel(db);
const jwtTokenService = new JwtTokenService(jwtTokenModel, userModel);
const userService = new UserService(userModel, localAuthModel, jwtTokenService);
const verifyJwtMiddleware = new VerifyJwtMiddleware(jwtTokenService);
const authController = new AuthController(router, jwtTokenService, userService);
const userController = new UserController(router, jwtTokenService, userService, verifyJwtMiddleware);

app.use(express.json());
app.use(helmet());

app.use('/user', userController.getRouter());
app.use('/auth', authController.getRouter());

// Error handler
app.use((error: ApiError, req: express.Request, res: express.Response, _next: express.NextFunction) => res
  .status(error.statusCode)
  .json({ code: error.code, error: AppConfig.nodeEnv === 'development' && error.data ? error.data.error : undefined }));

app.listen(AppConfig.port, () => {
  console.log(`🚀 Server started at http://localhost:${AppConfig.port}`);
});
