import { api } from '@/lib/api';
import { User } from '@repo/db';

export const userService = {
  getProfile: async () => {
    const { data } = await api.get<User>('/user/profile');
    return data;
  },
  updateProfile: async (userData: Partial<User>) => {
    const { data } = await api.put<User>('/user/profile', userData);
    return data;
  },
};
