import { ProviderType } from './global';

namespace ModelTypes {
  export interface BasicUser {
    providerId: string,
    providerType: ProviderType,
    firstName: string,
  }

  export interface User extends BasicUser {
    id: string,
    createdOn: Date,
  }

  export interface BasicLocalAuth {
    email: string,
    password: string,
  }

  export interface LocalAuth extends BasicLocalAuth {
    id: string,
    createdOn: Date,
  }
}

export default ModelTypes;
