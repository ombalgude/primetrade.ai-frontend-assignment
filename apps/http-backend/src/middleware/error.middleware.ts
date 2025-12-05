import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let status = err.status ?? 500;
  let details = err.details;

  if (err instanceof ZodError) {
    status = 400;
    details = err.flatten();
  }

  const response = {
    status,
    message: err.message || 'Unexpected server error',
    details,
  };

  if (process.env.NODE_ENV !== 'production') {
    console.error('[API ERROR]', err);
  }

  res.status(status).json(response);
};

