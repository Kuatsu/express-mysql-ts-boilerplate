import { uuid } from 'uuidv4';
import db from '../config/db';
import ModelTypes from '../types/models';

export default class LocalAuthModel {
  static async create(localAuth: ModelTypes.BasicLocalAuth): Promise<ModelTypes.LocalAuth> {
    const localAuthId = uuid();
    const createdOn = new Date();
    await db.execute(
      'INSERT INTO users (id, email, password, created_on) VALUES (?, ?, ?, ?, ?)',
      [localAuthId, localAuth.email, localAuth.password, createdOn],
    );

    return {
      ...localAuth,
      id: localAuthId,
      createdOn,
    };
  }
}
