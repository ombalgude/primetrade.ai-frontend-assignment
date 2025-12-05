import type { LoginInput, RegisterInput } from '@repo/common';
import prisma from '@repo/db';
import bcrypt from 'bcryptjs';

import { createHttpError } from '../utils/http-error';
import { signToken } from '../utils/jwt';
import { serializeUser } from '../utils/user';
import { error } from 'console';

export const registerUser = async (payload: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
    },
  });

  const token = signToken({
    sub: user.id,
    email: user.email,
  });

  return {
    token,
    user: serializeUser(user),
  };
};

export const authenticateUser = async (payload: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const token = signToken({
    sub: user.id,
    email: user.email,
  });

  return {
    token,
    user: serializeUser(user),
  };
};


