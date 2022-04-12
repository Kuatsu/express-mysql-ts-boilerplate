import { v4 as uuid } from 'uuid';
import mysql from 'mysql2/promise';
import DbTypes from '../types/db';
import ModelTypes from '../types/models';

export default class UserModel {
  private db: mysql.Connection;

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  async create(user: ModelTypes.BasicUser): Promise<ModelTypes.User> {
    const userId = uuid();
    const createdOn = new Date();
    await this.db.execute(
      'INSERT INTO users (id, provider_type, provider_id, first_name, created_on) VALUES (?, ?, ?, ?, ?)',
      [userId, user.providerType, user.providerId, user.firstName, createdOn],
    );

    return {
      ...user,
      id: userId,
      createdOn,
    };
  }

  async findOne(userId: string): Promise<ModelTypes.User> {
    const result = await this.db.execute<DbTypes.User[]>(
      'SELECT * FROM users WHERE id = ?',
      [userId],
    );
    const [rows] = result;
    if (rows.length === 0) throw new Error('not_found');
    const user = rows[0];

    return {
      id: user.id,
      providerType: user.provider_type,
      providerId: user.provider_id,
      firstName: user.first_name,
      createdOn: new Date(user.created_on),
    };
  }

  async findAll(): Promise<ModelTypes.User[]> {
    const result = await this.db.execute<DbTypes.User[]>(
      'SELECT * FROM users',
    );
    const [rows] = result;
    if (rows.length === 0) throw new Error('not_found');

    return rows.map((user) => ({
      id: user.id,
      providerType: user.provider_type,
      providerId: user.provider_id,
      firstName: user.first_name,
      createdOn: new Date(user.created_on),
    }));
  }
}
