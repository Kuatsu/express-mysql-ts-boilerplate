import ApiTypes from '../types/api';
import { ErrorStatus } from '../types/global';

class ApiError extends Error {
  public data: { error: Error };
  public statusCode: ErrorStatus;
  public code: string;
  constructor(code: ApiTypes.ErrorCode, status: ErrorStatus, error: Error) {
    super(error.message);

    this.data = { error };
    this.statusCode = status;
    this.code = code;
  }
}

export default ApiError;
