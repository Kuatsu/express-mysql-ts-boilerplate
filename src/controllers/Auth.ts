import express from 'express';
import UserService from '../services/User';
import ApiTypes from '../types/api';
import ApiError from '../utils/ApiError';
import { ErrorStatus } from '../types/global';
import JwtTokenService from '../services/JwtToken';
import ValidateReqMiddleware from '../middlewares/ValidateReq';

export default class AuthController {
  private router: express.Router;

  constructor(router: express.Router, jwtTokenService: JwtTokenService, userService: UserService) {
    router.post('/local', ValidateReqMiddleware.validateReq, async (
      req: express.Request<any, ApiTypes.Response.AuthLocal, ApiTypes.Request.AuthLocal, any>,
      res,
      next,
    ) => {
      const { email, password, oldJwtToken } = req.body;
      try {
        const jwtToken = await userService.loginLocally(email, password);
        if (oldJwtToken) jwtTokenService.revoke(oldJwtToken);

        return res.json({
          userId: jwtToken.userId,
          jwtToken: jwtToken.token,
        });
      } catch (e: any) {
        if (e.message === 'wrong_email_or_password') {
          return next(new ApiError('wrong_email_or_password', ErrorStatus.Unauthorized, e));
        }
        return next(new ApiError('server', ErrorStatus.Server, e));
      }
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
