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
    const row = result[0][0];

    return {
      id: row.id,
      providerType: row.provider_type,
      providerId: row.provider_id,
      firstName: row.first_name,
      createdOn: new Date(row.created_on),
    };
  }

  async findAll(): Promise<ModelTypes.User[]> {
    const result = await this.db.execute<DbTypes.User[]>(
      'SELECT * FROM users',
    );
    const [rows] = result;

    return rows.map((row) => ({
      id: row.id,
      providerType: row.provider_type,
      providerId: row.provider_id,
      firstName: row.first_name,
      createdOn: new Date(row.created_on),
    }));
  }
}
