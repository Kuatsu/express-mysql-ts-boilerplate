import { ErrorStatus } from '../types/global';

class ApiError extends Error {
  public data: { error: Error };
  public statusCode: ErrorStatus;
  public code: string;
  constructor(code: string, status: ErrorStatus, error: Error) {
    super(error.message);

    this.data = { error };
    this.statusCode = status;
    this.code = code;
  }
}

export default ApiError;
