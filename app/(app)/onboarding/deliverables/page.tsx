'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconArticle,
  IconCheck,
  IconGavel,
  IconLayoutGrid,
  IconMovie,
  IconPalette,
  IconPresentation,
  IconReport,
  IconSpeakerphone,
  IconTable,
  IconWorld,
} from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { BrandMark } from '@/components/app/brand-mark';
import { cn } from '@/lib/utils';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES, DELIVERABLES, type DeliverableId } from '@/lib/app-routes';

const DELIVERABLE_ICONS: Record<DeliverableId, ReactNode> = {
  decks: <IconPresentation size={17} stroke={1.5} />,
  websites: <IconWorld size={17} stroke={1.5} />,
  marketing: <IconSpeakerphone size={17} stroke={1.5} />,
  dashboards: <IconLayoutGrid size={17} stroke={1.5} />,
  legal: <IconGavel size={17} stroke={1.5} />,
  design: <IconPalette size={17} stroke={1.5} />,
  video: <IconMovie size={17} stroke={1.5} />,
  blog: <IconArticle size={17} stroke={1.5} />,
  spreadsheets: <IconTable size={17} stroke={1.5} />,
  reports: <IconReport size={17} stroke={1.5} />,
};

const DEFAULT_SELECTED: DeliverableId[] = ['decks', 'websites', 'marketing', 'dashboards', 'legal'];

export default function DeliverablesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<DeliverableId>>(new Set(DEFAULT_SELECTED));

  const toggle = (id: DeliverableId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={`${tw.page} min-h-screen bg-scalova-deep px-4 py-12 sm:px-12`}>
      <AmbientBackground variant="onboarding" />
      <div className="fixed left-8 top-8 z-[2] hidden lg:block">
        <BrandMark />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1000px]">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-scalova-accent-light/20 bg-scalova-accent-light/10 px-[13px] py-1 text-xs font-medium uppercase tracking-[1.2px] text-scalova-accent-light">
              Step 2 of 4
            </span>
            <span className="h-px w-12 bg-scalova-border-strong" />
            <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">Capabilities</span>
          </div>
          <h1 className="text-[32px] font-semibold tracking-[-0.64px]">Choose Deliverable Types</h1>
          <p className="mt-2 max-w-2xl text-sm leading-[22.75px] text-scalova-muted">
            Select the core outputs your digital twin workforce will be responsible for generating. This helps
            configure the specialized models required for your workspace.
          </p>
        </header>

        <div className="mb-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {DELIVERABLES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                'relative flex min-h-[128px] flex-col items-center justify-center rounded-xl border border-[#262626] bg-[#1a1a1a] px-4 py-6 transition cursor-pointer',
                selected.has(item.id) && 'border-scalova-accent-light bg-scalova-accent/5 shadow-[0_0_0_1px_rgba(86,197,254,0.25)]'
              )}
              onClick={() => toggle(item.id)}
              aria-pressed={selected.has(item.id)}
            >
              <span
                className={cn(
                  'absolute right-4 top-4 flex size-[15px] items-center justify-center rounded-full border border-scalova-border-strong opacity-0 transition',
                  selected.has(item.id) && 'border-scalova-accent bg-scalova-accent text-scalova-accent-dark opacity-100'
                )}
              >
                <IconCheck size={10} stroke={3} />
              </span>
              <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-scalova-border-strong bg-scalova-elevated text-scalova-accent-light">
                {DELIVERABLE_ICONS[item.id]}
              </span>
              <span className="text-center text-xs font-medium tracking-[0.24px]">{item.label}</span>
            </button>
          ))}
        </div>

        <nav className="flex items-center justify-between border-t border-scalova-border-strong pt-8">
          <Link href={APP_ROUTES.onboarding.connect} className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.24px] text-scalova-muted hover:text-scalova-text">
            <IconArrowLeft size={11} stroke={2} />
            Back
          </Link>
          <button
            type="button"
            className={tw.btnPrimaryLight}
            disabled={selected.size === 0}
            onClick={() => router.push(APP_ROUTES.onboarding.bootstrap)}
          >
            Continue
            <IconArrowRight size={11} stroke={2.5} />
          </button>
        </nav>
      </div>
    </div>
  );
}
