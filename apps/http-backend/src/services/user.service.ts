import type { UserProfileUpdateInput } from '@repo/common';
import prisma from '@repo/db';

import { createHttpError } from '../utils/http-error';
import { serializeUser } from '../utils/user';

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return serializeUser(user);
};

export const updateUserProfile = async (
  userId: string,
  payload: UserProfileUpdateInput,
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });

  return serializeUser(user);
};


