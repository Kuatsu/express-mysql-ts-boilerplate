import express from 'express';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import UserService from '../services/User';
import db from '../config/db';
import ApiTypes from '../types/api';

const router = express.Router();
const userService = new UserService(new UserModel(db), new LocalAuthModel(db));

// TODO: Add JOI validation
router.post('/', async (
  req: express.Request<{}, ApiTypes.Response.CreateLocalUser, ApiTypes.Request.CreateLocalUser, {}>,
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

export default router;
