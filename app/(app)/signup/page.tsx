'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { BrandMark } from '@/components/app/brand-mark';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES } from '@/lib/app-routes';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(APP_ROUTES.onboarding.connect);
  };

  return (
    <div className={tw.pageCenter}>
      <AmbientBackground variant="onboarding" />
      <div className="relative z-[1] flex w-full max-w-[420px] flex-col items-center">
        <header className="mb-2 flex flex-col items-center">
          <BrandMark size="md" name="Scalova AI" href="" />
        </header>

        <div className={tw.cardSignup}>
          <div className={tw.cardInner}>
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">Account creation</span>
              <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">Step 1 of 3</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-scalova-muted-bar">
              <div className="h-full w-1/3 rounded-full bg-scalova-accent" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Create your account</h1>
              <p className="text-left text-sm leading-[22.4px] text-scalova-muted">
                Join the digital twin workforce platform.
              </p>
            </div>

            <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
              {[
                { id: 'name', label: 'Full Name', icon: IconUser, type: 'text', placeholder: 'Jane Doe', value: name, set: setName, auto: 'name' },
                { id: 'work-email', label: 'Work Email', icon: IconMail, type: 'email', placeholder: 'jane@company.com', value: email, set: setEmail, auto: 'email' },
              ].map((f) => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label className={tw.labelBright} htmlFor={f.id}>{f.label}</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-scalova-faint">
                      <f.icon size={12} stroke={1.75} />
                    </span>
                    <input id={f.id} className={`${tw.input} ${tw.inputIcon}`} type={f.type} placeholder={f.placeholder} value={f.value} onChange={(e) => f.set(e.target.value)} autoComplete={f.auto} required />
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className={tw.labelBright} htmlFor="signup-password">Password</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-scalova-faint">
                    <IconLock size={14} stroke={1.75} />
                  </span>
                  <input
                    id="signup-password"
                    className={`${tw.input} ${tw.inputIcon} pr-[41px]`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-scalova-faint hover:text-scalova-muted cursor-pointer"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className={tw.btnPrimary}>
                  Continue
                  <IconArrowRight size={12} stroke={2.5} />
                </button>
              </div>
            </form>

            <div className="flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-scalova-border-strong" />
              <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">Or</span>
              <span className="h-px flex-1 bg-scalova-border-strong" />
            </div>

            <div className="flex w-full flex-col gap-3">
              <button type="button" className={tw.oauthFilled}>
                <IconBrandGoogle size={14} stroke={1.75} />
                Continue with Google
              </button>
              <button type="button" className={tw.oauthFilled}>
                <IconBrandGithub size={14} stroke={1.75} />
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-scalova-muted">
          Already have an account?{' '}
          <Link href={APP_ROUTES.login} className={tw.linkSoft}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
