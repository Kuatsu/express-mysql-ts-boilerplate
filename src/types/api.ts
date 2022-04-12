namespace ApiTypes {
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
  }
}

export default ApiTypes;
