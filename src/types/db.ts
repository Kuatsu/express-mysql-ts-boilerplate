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
}

export default DbTypes;
