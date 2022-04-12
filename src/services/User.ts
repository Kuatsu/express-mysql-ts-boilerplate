import bcrypt from 'bcrypt';
import AppConfig from '../config';
import LocalAuthModel from '../models/LocalAuth';
import UserModel from '../models/User';
import ModelTypes from '../types/models';

export default class UserService {
  private userModel: typeof UserModel;
  private localAuthModel: typeof LocalAuthModel;

  constructor(userModel: typeof UserModel, localAuthModel: typeof LocalAuthModel) {
    this.userModel = userModel;
    this.localAuthModel = localAuthModel;
  }

  async createLocalUser(email: string, password: string, firstName: string): Promise<ModelTypes.User> {
    const encryptedPassword = await bcrypt.hash(password, AppConfig.bcryptRounds);
    const localAuth = await this.localAuthModel.create({ email, password: encryptedPassword });
    const user = await this.userModel.create({
      providerType: 'local',
      providerId: localAuth.id,
      firstName,
    });
    return user;
  }
}
