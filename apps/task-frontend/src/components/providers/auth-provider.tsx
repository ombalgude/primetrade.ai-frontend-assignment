'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';
import { User } from '@repo/db';
import { userService } from '@/services/user-service';
// import { LoginUserSchema } from '@repo/common/src/schemas/auth.schema';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, setToken, clearAuth } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const profile = await userService.getProfile();
          setUser(profile);
        } catch (error) {
          console.error('Failed to load user profile', error);
          clearAuth();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, [token, clearAuth]);

  const login = async (email: string, password: string) => {
    const { token } = await authService.login({ email, password });
    setToken(token);
    const profile = await userService.getProfile();
    setUser(profile);
  };

  const register = async (name: string, email: string, password: string) => {
    const { token } = await authService.register({ name, email, password });
    setToken(token);
    const profile = await userService.getProfile();
    setUser(profile);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
