// apps/task-frontend/src/app/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { withAuth } from '@/components/auth/withAuth';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@repo/ui/src/components/Button';
import { Card } from '@repo/ui/src/components/Card';
import { Input } from '@repo/ui/src/components/Input';
import Skeleton from '@/components/ui/Skeleton';
import { userService } from '@/services/user-service';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const { user, setAuth, token, clearAuth } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userService.updateProfile({
        name,
        email,
        ...(password && { password }),
      });
      if (token) {
        setAuth({ user: updatedUser, token });
      }
      setSuccess('Profile updated successfully!');
      setPassword('');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-paper ruled-paper">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10 space-y-2">
            <h1 className="handwritten-title text-5xl text-ink">Your Profile</h1>
            <p className="text-soft-gray">Manage your account information and preferences</p>
          </div>

          {/* Profile Card */}
          <Card className="mb-8">
            {error && (
              <div className="error-stamp bg-red-50 border border-red-300 p-3 rounded-lg text-red-700 w-full mb-5">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-300 p-3 rounded-lg text-green-700 w-full mb-5 font-semibold">
                {success}
              </div>
            )}

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-32 mx-auto rounded-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <Input
                    label="New Password (Optional)"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep your current password"
                    disabled={loading}
                  />
                  <p className="text-xs text-soft-gray mt-2">Only fill this in if you want to change your password</p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-300">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* User info summary */}
          <div className="paper-card p-6 text-center">
            <p className="text-soft-gray text-sm">
              Thank you for being a member of our community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
