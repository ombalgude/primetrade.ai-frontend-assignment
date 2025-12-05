import type { LoginInput, RegisterInput } from '@repo/common';
import { Request, Response } from 'express';

import { authenticateUser, registerUser } from '../services/auth.service';
import { asyncHandler } from '../utils/async-handler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as RegisterInput;
  const result = await registerUser(payload);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as LoginInput;
  const result = await authenticateUser(payload);
  res.status(200).json(result);
});

