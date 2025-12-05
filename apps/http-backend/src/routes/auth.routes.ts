import { Router } from 'express';
import { loginSchema, registerSchema } from '@repo/common';

import { login, register } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  register,
);
authRouter.post('/login', validateBody(loginSchema), login);

export default authRouter;

