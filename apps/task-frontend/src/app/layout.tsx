import type { Metadata } from 'next';
import { Inter, Patrick_Hand } from 'next/font/google';
import './globals.css';

import { AppProviders } from '@/components/providers/app-providers';
import { Header } from '@/components/layout/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Primetrade Dashboard',
  description:
    'Secure task management dashboard with JWT auth and PostgreSQL backend.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased ${inter.variable} ${hand.variable} bg-paper text-ink`}>
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <footer className="border-t border-gray-300 bg-gray-50 px-4 py-4 text-center text-xs text-soft-gray">
            © {new Date().getFullYear()} Primetrade.ai. All rights reserved.
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
