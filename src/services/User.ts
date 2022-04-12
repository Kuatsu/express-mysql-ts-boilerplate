import bcrypt from 'bcrypt';
import AppConfig from '../config';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import ModelTypes from '../types/models';

export default class UserService {
  private userModel: UserModel;
  private localAuthModel: LocalAuthModel;

  constructor(userModel: UserModel, localAuthModel: LocalAuthModel) {
    this.userModel = userModel;
    this.localAuthModel = localAuthModel;
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
}
