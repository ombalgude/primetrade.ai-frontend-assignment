import { Router } from 'express';
import authRouter from './auth.routes';
import taskRouter from './task.routes';
import userRouter from './user.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/tasks', taskRouter);

export default router;

