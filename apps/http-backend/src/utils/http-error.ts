import { ApiError } from '../middleware/error.middleware';

export const createHttpError = (
  status: number,
  message: string,
  details?: unknown,
): ApiError => {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.details = details;
  return error;
};


