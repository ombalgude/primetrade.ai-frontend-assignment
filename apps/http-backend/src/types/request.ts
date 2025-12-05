import { Request } from 'express';
import type { SerializedUser } from '../utils/user';

export type AuthenticatedRequest = Request & {
  user?: SerializedUser;
  token?: string;
};


