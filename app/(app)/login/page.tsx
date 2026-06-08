'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IconArrowRight, IconBrandGoogle, IconBrandWindows } from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { BrandMark } from '@/components/app/brand-mark';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES } from '@/lib/app-routes';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(APP_ROUTES.onboarding.connect);
  };

  return (
    <div className={tw.pageCenter}>
      <AmbientBackground />
      <div className="relative z-[1] flex w-full max-w-[420px] flex-col items-center gap-2">
        <div className={`${tw.card} flex flex-col gap-8`}>
          <header className="flex flex-col items-center gap-4 text-center">
            <BrandMark size="auth" showName={false} href="" />
            <div>
              <h1 className="text-xl font-medium tracking-[-0.2px]">Welcome back</h1>
              <p className="text-sm leading-[22.4px] text-scalova-muted">Sign in to manage your digital workforce.</p>
            </div>
          </header>

          <div className="flex w-full flex-col gap-3">
            <button type="button" className={tw.oauth}>
              <IconBrandGoogle size={15} stroke={1.75} />
              Continue with Google
            </button>
            <button type="button" className={tw.oauth}>
              <IconBrandWindows size={14} stroke={1.75} />
              Continue with Microsoft
            </button>
          </div>

          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-scalova-border" />
            <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">Or</span>
            <span className="h-px flex-1 bg-scalova-border" />
          </div>

          <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className={tw.label} htmlFor="email">
                Email Address
              </label>
              <input id="email" className={tw.input} type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={tw.label} htmlFor="password">
                  Password
                </label>
                <button type="button" className={`${tw.link} border-0 bg-transparent p-0 text-xs cursor-pointer`}>
                  Forgot?
                </button>
              </div>
              <input id="password" className={tw.input} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </div>
            <div className="pt-2">
              <button type="submit" className={tw.btnPrimary}>
                Sign In
                <IconArrowRight size={11} stroke={2.5} />
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-scalova-muted">
            Don&apos;t have an account?{' '}
            <Link href={APP_ROUTES.signup} className={tw.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
