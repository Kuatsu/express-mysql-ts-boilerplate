import express from 'express';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import UserService from '../services/User';
import db from '../config/db';
import ApiTypes from '../types/api';
import validateReq from '../middlewares/validateReq';
import ApiError from '../utils/ApiError';
import { ErrorStatus } from '../types/global';

const router = express.Router();
const userService = new UserService(new UserModel(db), new LocalAuthModel(db));

router.post('/', validateReq, async (
  req: express.Request<any, ApiTypes.Response.CreateLocalUser, ApiTypes.Request.CreateLocalUser, any>,
  res,
  next,
) => {
  const { email, password, firstName } = req.body;
  try {
    const { user, localAuth } = await userService.createLocalUser(email, password, firstName);

    return res.json({
      id: user.id,
      email: localAuth.email,
      firstName: user.firstName,
      createdOn: user.createdOn.toISOString(),
    });
  } catch (e: any) {
    if (e.message === 'not_found') return next(new ApiError('not_found', ErrorStatus.NotFound, e));
    return next(new ApiError('server', ErrorStatus.Server, e));
  }
});

router.get('/:userId', validateReq, async (
  req: express.Request<ApiTypes.Params.GetSingleUser, ApiTypes.Response.GetSingleUser, any, any>,
  res,
  next,
) => {
  const { userId } = req.params;
  try {
    const { user } = await userService.findUser(userId);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      createdOn: user.createdOn.toISOString(),
    });
  } catch (e: any) {
    if (e.message === 'not_found') return next(new ApiError('not_found', ErrorStatus.NotFound, e));
    return next(new ApiError('server', ErrorStatus.Server, e));
  }
});

export default router;
