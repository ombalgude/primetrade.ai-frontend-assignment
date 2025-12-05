// apps/task-frontend/src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@repo/ui/src/components/Button';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white/80 backdrop-blur-md paper-card shadow-ink-light">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent-blue stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="handwritten-title text-xl">Primetrade</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {user && pathname !== '/' ? (
            <>
              <Link href="/dashboard" className="text-soft-gray hover:text-ink transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/profile" className="text-soft-gray hover:text-ink transition-colors font-medium">
                Profile
              </Link>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-300">
                <span className="text-soft-gray">{user.name}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
