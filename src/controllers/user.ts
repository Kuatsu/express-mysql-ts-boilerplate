import express from 'express';
import UserService from '../services/User';
import ApiTypes from '../types/api';
import ApiError from '../utils/ApiError';
import { ErrorStatus, JwtPayload } from '../types/global';
import JwtTokenService from '../services/JwtToken';
import VerifyJwtMiddleware from '../middlewares/VerifyJwt';
import ValidateReqMiddleware from '../middlewares/ValidateReq';

export default class UserController {
  private router: express.Router;

  constructor(
    router: express.Router,
    jwtTokenService: JwtTokenService,
    userService: UserService,
    verifyJwtMiddleware: VerifyJwtMiddleware,
  ) {
    router.post('/', ValidateReqMiddleware.validateReq, async (
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

    router.get('/:userId', verifyJwtMiddleware.verifyJwt, ValidateReqMiddleware.validateReq, async (
      req: express.Request<
      ApiTypes.Params.GetSingleUser, ApiTypes.Response.GetSingleUser, { _jwtPayload: JwtPayload }, any
      >,
      res,
      next,
    ) => {
      const { userId } = req.params;
      const jwtPayload = req.body._jwtPayload;
      try {
        const { user } = await userService.findUser(userId);
        if (jwtPayload.userId !== user.id) throw new Error('no_access');

        return res.json({
          id: user.id,
          firstName: user.firstName,
          createdOn: user.createdOn.toISOString(),
        });
      } catch (e: any) {
        if (e.message === 'not_found') return next(new ApiError('not_found', ErrorStatus.NotFound, e));
        if (e.message === 'no_access') return next(new ApiError('no_access', ErrorStatus.Forbidden, e));
        return next(new ApiError('server', ErrorStatus.Server, e));
      }
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
