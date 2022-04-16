import bcrypt from 'bcrypt';
import AppConfig from '../config';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import ModelTypes from '../types/models';
import JwtTokenService from './JwtToken';

export default class UserService {
  private userModel: UserModel;
  private localAuthModel: LocalAuthModel;
  private jwtTokenService: JwtTokenService;

  constructor(userModel: UserModel, localAuthModel: LocalAuthModel, jwtTokenService: JwtTokenService) {
    this.userModel = userModel;
    this.localAuthModel = localAuthModel;
    this.jwtTokenService = jwtTokenService;
  }

  async createLocalUser(
    email: string,
    password: string,
    firstName: string,
  ): Promise<{ user: ModelTypes.User, localAuth: ModelTypes.LocalAuth }> {
    const encryptedPassword = await bcrypt.hash(password, AppConfig.bcryptRounds);
    const localAuth = await this.localAuthModel.create({ email, password: encryptedPassword });
    const user = await this.userModel.create({
      providerType: 'local',
      providerId: localAuth.id,
      firstName,
    });
    return { user, localAuth };
  }

  async loginLocally(
    email: string,
    password: string,
  ): Promise<ModelTypes.JwtToken> {
    const encryptedPassword = await bcrypt.hash(password, AppConfig.bcryptRounds);
    let localAuth: ModelTypes.LocalAuth;
    try {
      localAuth = await this.localAuthModel.findOneByEmail(email);
    } catch (e: any) {
      if (e.message === 'not_found') throw new Error('wrong_email_or_password');
      else throw new Error('server');
    }

    try {
      await bcrypt.compare(localAuth!.password, encryptedPassword);
    } catch (e: any) {
      throw new Error('wrong_email_or_password');
    }

    const user = await this.userModel.findOneByProvider(localAuth.id, 'local');

    return this.jwtTokenService.sign(user);
  }

  async findUser(
    userId: string,
  ): Promise<{ user: ModelTypes.User }> {
    const user = await this.userModel.findOne(userId);
    return { user };
  }
}
