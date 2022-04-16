import { v4 as uuid } from 'uuid';
import mysql from 'mysql2/promise';
import ModelTypes from '../types/models';
import DbTypes from '../types/db';

export default class JwtTokenModel {
  private db: mysql.Connection;

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  async create(jwtToken: ModelTypes.BasicJwtToken): Promise<ModelTypes.JwtToken> {
    const jwtTokenId = uuid();
    const createdOn = new Date();
    await this.db.execute(
      'INSERT INTO jwt_tokens (id, user_id, token, revoked, created_on) VALUES (?, ?, ?, ?, ?)',
      [jwtTokenId, jwtToken.userId, jwtToken.token, 0, createdOn],
    );

    return {
      ...jwtToken,
      id: jwtTokenId,
      revoked: false,
      createdOn,
    };
  }

  async findOne(jwtTokenId: string): Promise<ModelTypes.JwtToken> {
    const result = await this.db.execute<DbTypes.JwtToken[]>(
      'SELECT * FROM jwt_tokens WHERE id = ?',
      [jwtTokenId],
    );
    const [rows] = result;
    if (rows.length === 0) throw new Error('not_found');
    const jwtToken = rows[0];

    return {
      id: jwtToken.id,
      userId: jwtToken.user_id,
      token: jwtToken.token,
      revoked: jwtToken.revoked !== 0,
      createdOn: new Date(jwtToken.created_on),
    };
  }

  async findOneByToken(token: string): Promise<ModelTypes.JwtToken> {
    const result = await this.db.execute<DbTypes.JwtToken[]>(
      'SELECT * FROM jwt_tokens WHERE token = ?',
      [token],
    );
    const [rows] = result;
    if (rows.length === 0) throw new Error('not_found');
    const jwtToken = rows[0];

    return {
      id: jwtToken.id,
      userId: jwtToken.user_id,
      token: jwtToken.token,
      revoked: jwtToken.revoked !== 0,
      createdOn: new Date(jwtToken.created_on),
    };
  }

  async revoke(jwtTokenId: string): Promise<ModelTypes.JwtToken> {
    await this.db.execute(
      'UPDATE jwt_tokens SET revoked = 1 WHERE id = ? ',
      [jwtTokenId],
    );

    return this.findOne(jwtTokenId);
  }
}
