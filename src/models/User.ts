import { v4 as uuid } from 'uuid';
import DbTypes from '../types/db';
import ModelTypes from '../types/models';

export default class UserModel {
  static async create(user: ModelTypes.BasicUser): Promise<ModelTypes.User> {
    const userId = uuid();
    const createdOn = new Date();
    await db.execute(
      'INSERT INTO users (id, provider_type, provider_id, first_name, created_on) VALUES (?, ?, ?, ?, ?)',
      [userId, user.providerType, user.providerId, user.firstName, createdOn],
    );

    return {
      ...user,
      id: userId,
      createdOn,
    };
  }

  static async findOne(userId: string): Promise<ModelTypes.User> {
    const result = await db.execute<DbTypes.User[]>(
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

  static async findAll(): Promise<ModelTypes.User[]> {
    const result = await db.execute<DbTypes.User[]>(
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
