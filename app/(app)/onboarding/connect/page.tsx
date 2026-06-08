'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { IconArrowRight, IconBrandGoogle, IconBrandWindows } from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { OnboardingStepHeader } from '@/components/app/step-indicator';
import { cn } from '@/lib/utils';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES, INTEGRATIONS } from '@/lib/app-routes';

const BRAND_ICONS: Record<string, ReactNode> = {
  google: <IconBrandGoogle size={18} stroke={1.5} />,
  microsoft: <IconBrandWindows size={18} stroke={1.5} />,
};

export default function ConnectAccountsPage() {
  const router = useRouter();
  const [connected, setConnected] = useState<Set<string>>(new Set());

  const toggleConnect = (id: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`${tw.page} flex flex-col items-center px-6 py-12 sm:px-24`}>
      <AmbientBackground />
      <div className="relative z-[1] w-full max-w-5xl">
        <OnboardingStepHeader
          step={1}
          total={4}
          section="Data sources"
          title="Connect your workspace"
          description="Scalova's digital twins require access to your tools to analyze workflows and automate tasks. Connect the platforms your team uses most to build your AI workforce."
          centered
        />

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((item) => {
            const isConnected = connected.has(item.id);
            return (
              <div
                key={item.id}
                className="flex min-h-[160px] flex-col justify-between rounded-lg border border-scalova-border bg-scalova-card p-[21px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded border border-scalova-border-strong/30 bg-scalova-elevated">
                    {item.icon ? (
                      <Image src={item.icon} alt="" width={22} height={22} />
                    ) : item.letter ? (
                      <span className="text-base font-bold">{item.letter}</span>
                    ) : (
                      BRAND_ICONS[item.id]
                    )}
                  </div>
                  <span className="text-xl font-medium tracking-[-0.2px]">{item.name}</span>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded px-[11px] py-1 text-xs font-medium uppercase tracking-[0.3px]',
                      isConnected
                        ? 'border border-scalova-accent/30 bg-scalova-accent/10 text-scalova-accent-light'
                        : 'border border-scalova-border-strong bg-scalova-muted-bar/30 text-scalova-muted'
                    )}
                  >
                    <span className={cn('size-1.5 rounded-full', isConnected ? 'bg-scalova-accent-light shadow-[0_0_6px_#56c5fe]' : 'bg-scalova-faint')} />
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                  <button type="button" className={tw.btnOutline} onClick={() => toggleConnect(item.id)}>
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <nav className="flex items-center justify-between border-t border-scalova-border pt-8">
          <Link href={APP_ROUTES.signup} className="text-xs font-medium tracking-[0.24px] text-scalova-muted hover:text-scalova-text">
            Skip for now
          </Link>
          <button type="button" className={tw.btnPrimaryLight} onClick={() => router.push(APP_ROUTES.onboarding.deliverables)}>
            Continue Setup
            <IconArrowRight size={11} stroke={2.5} />
          </button>
        </nav>
      </div>
    </div>
  );
}
