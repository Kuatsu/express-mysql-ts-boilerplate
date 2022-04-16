import jwt from 'jsonwebtoken';
import AppConfig from '../config';
import JwtTokenModel from '../models/JwtToken';
import UserModel from '../models/User';
import { JwtPayload } from '../types/global';
import ModelTypes from '../types/models';

export default class JwtTokenService {
  private jwtTokenModel: JwtTokenModel;
  private userModel: UserModel;

  constructor(jwtTokenModel: JwtTokenModel, userModel: UserModel) {
    this.jwtTokenModel = jwtTokenModel;
    this.userModel = userModel;
  }

  async sign(
    user: ModelTypes.User,
  ): Promise<ModelTypes.JwtToken> {
    const payload: JwtPayload = {
      providerId: user.providerId,
      providerType: user.providerType,
      userId: user.id,
    };
    const token = jwt.sign(payload, AppConfig.jwtSecret, { expiresIn: '60d' });

    return this.jwtTokenModel.create({
      token,
      userId: user.id,
    });
  }

  async verify(
    token: string,
  ): Promise<JwtPayload> {
    const jwtData = jwt.verify(token, AppConfig.jwtSecret) as JwtPayload;
    await this.userModel.findOne(jwtData.userId);
    const jwtToken = await this.jwtTokenModel.findOneByToken(token);
    if (jwtToken.revoked) throw new Error('invalid_jwt');
    return jwtData;
  }

  async renew(
    token: string,
  ): Promise<ModelTypes.JwtToken> {
    const oldJwtData = jwt.verify(token, AppConfig.jwtSecret) as JwtPayload;
    await this.userModel.findOne(oldJwtData.userId);

    const oldJwtToken = await this.jwtTokenModel.findOneByToken(token);
    if (oldJwtToken.revoked) {
      throw new Error('revoked');
    }

    const user = await this.userModel.findOne(oldJwtToken.userId);
    const newToken = await this.sign(user);

    return newToken;
  }

  async revoke(
    token: string,
  ): Promise<ModelTypes.JwtToken> {
    const jwtToken = await this.jwtTokenModel.findOneByToken(token);
    await this.jwtTokenModel.revoke(jwtToken.id);
    return this.jwtTokenModel.findOneByToken(token);
  }
}
