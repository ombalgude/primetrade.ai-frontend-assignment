import prisma from '@repo/db';
import { NextFunction, Request, Response } from 'express';

import { createHttpError } from '../utils/http-error';
import { verifyToken } from '../utils/jwt';
import { asyncHandler } from '../utils/async-handler';
import { serializeUser } from '../utils/user';
import type { AuthenticatedRequest } from '../types/request';

const extractToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw createHttpError(401, 'Authorization header missing');
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw createHttpError(401, 'Invalid authorization header');
  }

  return token;
};

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = extractToken(req);
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw createHttpError(401, 'User no longer exists');
    }

    const authReq = req as AuthenticatedRequest;
    authReq.user = serializeUser(user);
    authReq.token = token;
    next();
  },
);

