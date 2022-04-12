import { RowDataPacket } from 'mysql2';
import { ProviderType } from './global';

export interface DbUser extends RowDataPacket {
  id: string,
  provider_id: string,
  provider_type: ProviderType,
  first_name: string,
  created_on: string
}
