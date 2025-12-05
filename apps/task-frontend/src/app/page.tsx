import Link from 'next/link';
import { Button } from '@repo/ui/src/components/Button';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-paper ruled-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center lg:py-20">
        {/* Hero Section */}
        <section className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="handwritten-title text-5xl sm:text-6xl lg:text-7xl text-ink leading-tight">
              Stay on top of 
              <span className="block mt-2 text-accent-blue">
                your tasks
              </span>
            </h1>
            <p className="text-lg text-soft-gray max-w-xl">
              Create an account, log in, and manage your tasks in a focused, distraction-free workspace designed for productivity and clarity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 pt-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Get started — Create account
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg">
                I already have an account
              </Button>
            </Link>
          </div>
        </section>

        {/* Preview Card */}
        <section className="flex-1">
          <div className="paper-card p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-soft-gray font-semibold mb-2">
                Dashboard Preview
              </p>
              <h3 className="handwritten-title text-2xl text-ink">What you'll get</h3>
            </div>

            <div className="space-y-4">
              <div className="paper-card bg-yellow-50 border-yellow-300 p-4">
                <p className="text-xs text-soft-gray font-semibold uppercase mb-1">Open Tasks</p>
                <p className="text-3xl font-bold text-kraft-brown">7</p>
                <p className="text-xs text-soft-gray mt-2">Manage and prioritize your queue</p>
              </div>

              <div className="paper-card bg-blue-50 border-blue-300 p-4">
                <p className="text-xs text-soft-gray font-semibold uppercase mb-1">Completed</p>
                <p className="text-3xl font-bold text-accent-blue">21</p>
                <p className="text-xs text-soft-gray mt-2">Track your accomplishments</p>
              </div>

              <div className="paper-card bg-green-50 border-green-300 p-4">
                <p className="text-xs text-soft-gray font-semibold uppercase mb-1">Profile</p>
                <p className="text-3xl font-bold text-accent-green">Synced</p>
                <p className="text-xs text-soft-gray mt-2">Your account, always secure</p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <p className="text-xs font-semibold text-ink uppercase mb-3">How to get started</p>
              <ol className="text-xs text-soft-gray space-y-2 list-decimal pl-5">
                <li>Sign up with your email</li>
                <li>Create your first task</li>
                <li>Complete and track progress</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
