import { ProviderType } from './global';

export interface BasicUser {
  providerId: string,
  providerType: ProviderType,
  firstName: string,
}

export interface User extends BasicUser {
  id: string,
  createdOn: Date,
}
