namespace ApiTypes {
  export type ErrorCode = 'validation_error' | 'server' | 'not_found';

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
  }
}

export default ApiTypes;
