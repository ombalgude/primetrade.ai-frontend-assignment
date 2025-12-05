import 'express-serve-static-core';

import type { SerializedUser } from '../utils/user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: SerializedUser;
    token?: string;
  }
}


