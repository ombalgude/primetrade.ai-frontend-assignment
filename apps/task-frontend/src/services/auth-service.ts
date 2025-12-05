import {
  LoginInput,
  RegisterInput,
} from '@repo/common/src/schemas/auth.schema';
import { api } from '@/lib/api';

export const authService = {
  login: async (credentials: LoginInput) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
  register: async (userInfo: RegisterInput) => {
    const { data } = await api.post('/auth/register', userInfo);
    return data;
  },
};
