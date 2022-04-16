import express from 'express';
import ApiError from '../utils/ApiError';
import { ErrorStatus, JwtPayload } from '../types/global';
import JwtTokenService from '../services/JwtToken';

export default class VerifyJwtMiddleware {
  private jwtTokenService: JwtTokenService;

  constructor(jwtTokenService: JwtTokenService) {
    this.jwtTokenService = jwtTokenService;
    this.verifyJwt = this.verifyJwt.bind(this);
  }

  async verifyJwt(req: express.Request | any, res: express.Response, next: express.NextFunction) {
    let token: string = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
      return next(new ApiError('invalid_jwt', ErrorStatus.Unauthorized, new Error()));
    }

    token = token.substring(7, token.length);
    let jwtPayload: JwtPayload;
    try {
      jwtPayload = await this.jwtTokenService.verify(token);
    } catch (e: any) {
      return next(new ApiError('invalid_jwt', ErrorStatus.Unauthorized, e));
    }
    req.body._jwtPayload = jwtPayload;
    return next();
  }
}
