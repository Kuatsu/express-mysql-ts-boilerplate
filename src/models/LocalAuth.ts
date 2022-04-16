import { v4 as uuid } from 'uuid';
import mysql from 'mysql2/promise';
import ModelTypes from '../types/models';
import DbTypes from '../types/db';

export default class LocalAuthModel {
  private db: mysql.Connection;

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  async create(localAuth: ModelTypes.BasicLocalAuth): Promise<ModelTypes.LocalAuth> {
    if (await this.checkEmailExists(localAuth.email)) throw new Error('email_exists');

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

  async findOneByEmail(email: string): Promise<ModelTypes.LocalAuth> {
    const result = await this.db.execute<DbTypes.LocalAuth[]>(
      'SELECT * FROM local_auth WHERE email = ?',
      [email],
    );
    const [rows] = result;
    if (rows.length === 0) throw new Error('not_found');
    const localAuth = rows[0];

    return {
      id: localAuth.id,
      email: localAuth.email,
      password: localAuth.password,
      createdOn: new Date(localAuth.created_on),
    };
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      await this.findOneByEmail(email);
    } catch (e: any) {
      if (e.message === 'not_found') return false;
    }
    return true;
  }
}
