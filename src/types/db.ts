import { RowDataPacket } from 'mysql2';
import { ProviderType } from './global';

namespace DbTypes {
  export interface User extends RowDataPacket {
    id: string,
    provider_id: string,
    provider_type: ProviderType,
    first_name: string,
    created_on: string
  }

  export interface LocalAuth extends RowDataPacket {
    id: string,
    email: string,
    password: string,
    created_on: string,
  }

  export interface JwtToken extends RowDataPacket {
    id: string,
    user_id: string,
    token: string,
    revoked: 0 | 1,
    created_on: string,
  }
}

export default DbTypes;
