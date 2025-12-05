import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';


export interface JwtPayload {
  sub: string;
  email: string;
}

export const signToken = (payload: JwtPayload) => {
  const secret = env.JWT_SECRET as Secret;
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  const secret = env.JWT_SECRET as Secret;
  return jwt.verify(token, secret) as JwtPayload;
};

