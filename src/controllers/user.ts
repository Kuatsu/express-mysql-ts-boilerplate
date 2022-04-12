import express from 'express';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import UserService from '../services/User';
import db from '../config/db';
import ApiTypes from '../types/api';
import validateReq from '../middlewares/validateReq';

const router = express.Router();
const userService = new UserService(new UserModel(db), new LocalAuthModel(db));

// TODO: Add JOI validation
router.post('/', validateReq, async (
  req: express.Request<any, ApiTypes.Response.CreateLocalUser, ApiTypes.Request.CreateLocalUser, any>,
  res,
  _next,
) => {
  const { email, password, firstName } = req.body;
  const { user, localAuth } = await userService.createLocalUser(email, password, firstName);

  return res.json({
    id: user.id,
    email: localAuth.email,
    firstName: user.firstName,
    createdOn: user.createdOn.toISOString(),
  });
});

router.get('/:userId', validateReq, async (
  req: express.Request<ApiTypes.Params.GetSingleUser, ApiTypes.Response.GetSingleUser, any, any>,
  res,
  _next,
) => {
  const { userId } = req.params;
  const { user } = await userService.findUser(userId);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    createdOn: user.createdOn.toISOString(),
  });
});

export default router;
