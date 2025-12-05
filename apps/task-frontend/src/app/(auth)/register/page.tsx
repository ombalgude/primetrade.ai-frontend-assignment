// apps/task-frontend/src/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/src/components/Button';
import { Card } from '@repo/ui/src/components/Card';
import { Input } from '@repo/ui/src/components/Input';

import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, token } = await authService.register({ name, email, password });
      setAuth({ user, token });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-4 sm:p-6">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center space-y-2">
          <h1 className="handwritten-title text-4xl text-ink">Create your account</h1>
          <p className="text-sm text-soft-gray">Sign up in seconds and start organizing your work.</p>
        </div>

        {error && (
          <div className="error-stamp bg-red-50 border border-red-300 p-3 rounded-lg text-red-700 w-full mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-300 text-center">
          <p className="text-sm text-soft-gray">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-blue font-semibold hover:underline transition">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}