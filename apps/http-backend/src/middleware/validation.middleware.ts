import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

import { createHttpError } from '../utils/http-error';

const runValidation = (
  schema: ZodTypeAny,
  data: unknown,
  target: 'body' | 'query' | 'params',
  req: Request,
  next: NextFunction,
) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return next(
      createHttpError(400, `Invalid request ${target}`, parsed.error.flatten()),
    );
  }

  (req as Request & Record<typeof target, unknown>)[target] = parsed.data;
  return next();
};

export const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) =>
    runValidation(schema, req.body, 'body', req, next);
};

export const validateQuery = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) =>
    runValidation(schema, req.query, 'query', req, next);
};

