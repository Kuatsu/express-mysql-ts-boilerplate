/* eslint-disable max-len */

namespace ApiTypes {
  export type ErrorCode = 'validation_error' | 'server' | 'not_found' | 'wrong_email_or_password' | 'invalid_jwt' | 'no_access';

  export namespace Params {
    export interface GetSingleUser {
      userId: string;
    }
  }
  export namespace Request {
    export interface CreateLocalUser {
      email: string;
      password: string;
      firstName: string;
    }

    export interface AuthLocal {
      email: string;
      password: string;
      oldJwtToken?: string;
    }
  }

  export namespace Response {
    export interface CreateLocalUser {
      id: string;
      email: string;
      firstName: string;
      createdOn: string;
    }

    export interface GetSingleUser {
      id: string;
      firstName: string;
      createdOn: string;
    }

    export interface AuthLocal {
      userId: string;
      jwtToken: string;
    }
  }
}

export default ApiTypes;
