import { v4 as uuid } from 'uuid';
import mysql from 'mysql2/promise';
import ModelTypes from '../types/models';

export default class LocalAuthModel {
  private db: mysql.Connection;

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  async create(localAuth: ModelTypes.BasicLocalAuth): Promise<ModelTypes.LocalAuth> {
    const localAuthId = uuid();
    const createdOn = new Date();
    await this.db.execute(
      'INSERT INTO local_auth (id, email, password, created_on) VALUES (?, ?, ?, ?)',
      [localAuthId, localAuth.email, localAuth.password, createdOn],
    );

    return {
      ...localAuth,
      id: localAuthId,
      createdOn,
    };
  }
}
