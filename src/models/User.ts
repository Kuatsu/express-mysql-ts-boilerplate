import { uuid } from 'uuidv4';
import db from '../config/db';
import { DbUser } from '../types/db';
import { BasicUser, User } from '../types/models';

export const create = async (user: BasicUser): Promise<User> => {
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
};

export const findOne = async (userId: string): Promise<User> => {
  const result = await db.execute<DbUser[]>(
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
};

export const findAll = async (): Promise<User[]> => {
  const result = await db.execute<DbUser[]>(
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
};
