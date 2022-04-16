export type ProviderType = 'local'; // | 'apple' | 'google' | 'facebook'...

export enum ErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Server = 500,
}

export interface JwtPayload {
  userId: string;
  providerId: string;
  providerType: ProviderType;
}
