// apps/task-frontend/src/components/auth/withAuth.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const { token } = useAuthStore();

    useEffect(() => {
      if (!token) {
        router.replace('/login');
      }
    }, [token, router]);

    if (!token) {
      // You can render a loading spinner here
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
