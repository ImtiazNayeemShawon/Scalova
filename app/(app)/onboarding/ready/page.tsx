'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconArrowRight, IconAdjustments, IconBrain, IconCheck } from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES } from '@/lib/app-routes';

export default function TwinReadyPage() {
  const router = useRouter();

  return (
    <div className={tw.pageCenter}>
      <AmbientBackground variant="grid" />
      <div className="relative z-[1] flex w-full max-w-[672px] flex-col items-center text-center">
        <div className="relative mb-12 size-48 rounded-full border border-scalova-border-strong bg-scalova-elevated p-[9px] shadow-[0_0_20px_rgba(86,197,254,0.2)]">
          <div className="size-full overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/onboarding/ai-core.png" alt="" width={174} height={174} className="size-full object-cover opacity-85 mix-blend-screen" />
          </div>
          <span className="absolute -right-4 -top-4 flex size-8 items-center justify-center rounded-full border border-scalova-border-strong bg-scalova-elevated text-scalova-accent-light">
            <IconCheck size={14} stroke={2.5} />
          </span>
        </div>

        <h1 className="text-[32px] font-semibold tracking-[-0.64px]">Twin Ready</h1>
        <p className="mt-2 text-sm leading-[22.4px] text-scalova-muted">
          Your digital twin has been successfully configured and is actively synchronizing with your workflow
          preferences.
        </p>

        <div className="my-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-scalova-border-strong bg-scalova-elevated p-[21px] text-left">
            <div className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">
              <IconBrain size={18} stroke={1.5} className="text-scalova-accent-light" />
              Initial approval rate
            </div>
            <p>
              <span className="text-xl font-bold tracking-[-0.2px]">92%</span>
              <span className="ml-2 text-xs text-scalova-accent-light">+High Confidence</span>
            </p>
          </div>
          <div className="rounded-xl border border-scalova-border-strong bg-scalova-elevated p-[21px] text-left">
            <div className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">
              <IconAdjustments size={18} stroke={1.5} className="text-scalova-accent-light" />
              Style profile
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-scalova-accent/20 bg-scalova-accent/10 px-[13px] py-1 text-xs font-medium">
              <span className="size-2 rounded-full bg-scalova-accent-light" />
              Balanced
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button type="button" className={`${tw.btnPrimary} w-auto shadow-[0_0_20px_rgba(86,197,254,0.2)]`} onClick={() => router.push(APP_ROUTES.dashboard)}>
            Go to Dashboard
            <IconArrowRight size={10} stroke={2.5} />
          </button>
          <Link href={APP_ROUTES.dashboard} className={tw.btnGhost}>
            Assign First Task
          </Link>
        </div>
      </div>
    </div>
  );
}
