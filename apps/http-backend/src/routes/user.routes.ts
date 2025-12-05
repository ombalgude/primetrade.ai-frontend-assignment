import { Router } from 'express';
import { userProfileUpdateSchema } from '@repo/common';

import { authenticate } from '../middleware/auth.middleware';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { validateBody } from '../middleware/validation.middleware';

const userRouter = Router();

userRouter.use(authenticate);
userRouter.get('/profile', getProfile);
userRouter.put('/profile', validateBody(userProfileUpdateSchema), updateProfile);

export default userRouter;

