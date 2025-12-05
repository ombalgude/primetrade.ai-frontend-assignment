import type { UserProfileUpdateInput } from '@repo/common';
import { Request, Response } from 'express';

import { createHttpError } from '../utils/http-error';
import { getUserProfile, updateUserProfile } from '../services/user.service';
import { asyncHandler } from '../utils/async-handler';
import type { AuthenticatedRequest } from '../types/request';

const getAuthenticatedUserId = (req: Request) => {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user?.id;
  if (!userId) {
    throw createHttpError(401, 'Authentication required');
  }
  return userId;
};

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const profile = await getUserProfile(userId);
  res.json({ user: profile });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const payload = req.body as UserProfileUpdateInput;
  const updated = await updateUserProfile(userId, payload);
  res.json({ user: updated });
});

