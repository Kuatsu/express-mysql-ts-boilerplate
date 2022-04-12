export type ProviderType = 'local'; // | 'apple' | 'google' | 'facebook'...

export enum ErrorStatus {
  BadRequest = 400,
  NotFound = 404,
  Server = 500,
}
