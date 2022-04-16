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

  export interface BasicJwtToken {
    token: string,
    userId: string,
  }

  export interface JwtToken extends BasicJwtToken {
    id: string,
    revoked: boolean,
    createdOn: Date,
  }
}

export default ModelTypes;
