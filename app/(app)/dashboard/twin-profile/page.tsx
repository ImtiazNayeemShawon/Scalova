'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/lib/app-routes';
import {
  IconAdjustments,
  IconArrowUpRight,
  IconChartLine,
  IconCheck,
  IconClock,
  IconCopy,
  IconFileText,
  IconMail,
  IconPhoto,
  IconPlayerPlay,
  IconRefresh,
  IconSettingsAutomation,
  IconTrendingUp,
} from '@tabler/icons-react';
import { StatusBadge, dash } from '@/components/app/dashboard-ui';
import { tw } from '@/lib/app-tw';
import {
  APPROVAL_CHART_BARS,
  RECENT_OUTPUTS,
  STYLE_PARAMETERS,
  TWIN_PROFILE,
} from '@/lib/twin-profile-data';
import type { OutputCategory, RecentOutput, StyleParameter } from '@/lib/twin-profile-data';
import { cn } from '@/lib/utils';

const OUTPUT_CATEGORY_STYLES: Record<
  OutputCategory,
  { badge: string; text: string; icon: typeof IconMail }
> = {
  email: {
    badge: 'border border-scalova-accent-light/20 bg-scalova-accent-light/10',
    text: 'text-scalova-accent-light',
    icon: IconMail,
  },
  doc: {
    badge: 'border border-scalova-warm/20 bg-scalova-warm/10',
    text: 'text-scalova-warm',
    icon: IconFileText,
  },
  deck: {
    badge: 'border border-scalova-accent-light/20 bg-scalova-accent-light/10',
    text: 'text-scalova-accent-light',
    icon: IconPlayerPlay,
  },
};

function MetaChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-scalova-deep/80 px-3.5 py-2 backdrop-blur-sm">
      <span className="text-scalova-muted">{icon}</span>
      <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">{label}</span>
      <span className="text-xs font-medium tracking-[0.24px] text-scalova-text">{value}</span>
    </div>
  );
}

function StyleSlider({ param }: { param: StyleParameter }) {
  const leftActive = param.activeSide === 'left';
  const fillFromRight = param.id === 'assertive';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.55px]">
        <span
          className={cn(
            leftActive ? 'font-semibold text-scalova-text' : 'font-normal text-scalova-muted'
          )}
        >
          {param.leftLabel}
        </span>
        <span
          className={cn(
            !leftActive ? 'font-semibold text-scalova-text' : 'font-normal text-scalova-muted'
          )}
        >
          {param.rightLabel}
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full border border-scalova-border-strong/30 bg-scalova-deep">
        <div
          className={cn(
            'absolute inset-y-0 rounded-full shadow-[0_0_10px_rgba(86,197,254,0.5)]',
            fillFromRight
              ? 'right-0 bg-gradient-to-l from-scalova-accent-light to-scalova-accent'
              : 'left-0 bg-gradient-to-r from-scalova-accent-light to-scalova-accent'
          )}
          style={{ width: `${param.fillPercent}%` }}
        />
      </div>
    </div>
  );
}

function OutputCard({ output }: { output: RecentOutput }) {
  const style = OUTPUT_CATEGORY_STYLES[output.category];
  const CategoryIcon = style.icon;

  return (
    <article className={cn(dash.surface, 'flex h-[250px] flex-col overflow-hidden')}>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded px-[9px] py-[3px] text-[10px] uppercase tracking-[0.25px]',
              style.badge,
              style.text
            )}
          >
            <CategoryIcon size={10} stroke={1.75} />
            {output.categoryLabel}
          </span>
          <span className="text-[10px] text-scalova-muted">{output.timeAgo}</span>
        </div>
        <h3 className="mb-2 text-sm font-semibold leading-[17.5px]">{output.title}</h3>
        <div className="min-h-0 flex-1 overflow-hidden rounded border border-scalova-border-strong/50 bg-scalova-bg/80 p-3 opacity-80">
          <pre className="font-mono text-[11px] leading-[17.88px] tracking-[0.22px] text-scalova-muted whitespace-pre-wrap">
            {output.snippet.join('\n')}
          </pre>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-scalova-border-strong px-5 py-[13px]">
        <span className="inline-flex items-center gap-1 rounded border border-scalova-border-strong bg-scalova-elevated px-[7px] py-[3px] text-[10px] text-scalova-muted">
          <IconCheck size={9} stroke={2} className="text-scalova-green" />
          {output.score}
        </span>
        <button
          type="button"
          className="text-scalova-muted transition hover:text-scalova-text"
          aria-label={`Copy ${output.title}`}
        >
          <IconCopy size={15} stroke={1.5} />
        </button>
      </div>
    </article>
  );
}

export default function TwinProfilePage() {
  const maxBar = Math.max(...APPROVAL_CHART_BARS);

  return (
    <div className={dash.pageShellNarrow}>
      <section className={cn(dash.surface, 'relative overflow-hidden p-6 sm:p-8')}>
        <div
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-scalova-accent-light/10 blur-[50px]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="relative size-32 shrink-0 overflow-hidden rounded-xl border border-scalova-border-strong bg-scalova-deep shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard/twin-avatar.png"
              alt=""
              className="size-full object-cover"
              width={128}
              height={128}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-scalova-deep to-transparent mix-blend-multiply"
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[32px] font-semibold leading-[38.4px] tracking-[-0.8px]">
                {TWIN_PROFILE.name}
              </h1>
              <StatusBadge label={TWIN_PROFILE.status} tone="accent" />
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-[22.75px] text-scalova-muted">
              {TWIN_PROFILE.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <MetaChip
                icon={<IconRefresh size={13} stroke={1.75} />}
                label="Adapter:"
                value={TWIN_PROFILE.adapter}
              />
              <MetaChip
                icon={<IconFileText size={12} stroke={1.75} />}
                label="Training:"
                value={TWIN_PROFILE.training}
              />
              <MetaChip
                icon={<IconClock size={12} stroke={1.75} />}
                label="Last Sync:"
                value={TWIN_PROFILE.lastSync}
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 lg:ml-auto">
            <button
              type="button"
              className="flex size-[33px] items-center justify-center rounded border border-scalova-border-strong text-scalova-muted transition hover:bg-white/[0.04] hover:text-scalova-text"
              aria-label="Adjust twin settings"
            >
              <IconAdjustments size={15} stroke={1.5} />
            </button>
            <button
              type="button"
              className="flex size-[33px] items-center justify-center rounded border border-scalova-border-strong text-scalova-muted transition hover:bg-white/[0.04] hover:text-scalova-text"
              aria-label="View twin gallery"
            >
              <IconPhoto size={16} stroke={1.5} />
            </button>
          </div>
        </div>
      </section>

      <div className={dash.grid}>
        <section className={cn(dash.surface, 'col-span-12 flex flex-col p-6 xl:col-span-8')}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <IconChartLine size={15} stroke={1.5} className="text-scalova-accent-light" />
                <h2 className={tw.panelTitle}>Approval Rate</h2>
              </div>
              <p className="mt-1 text-xs font-medium tracking-[0.24px] text-scalova-muted">
                Human-in-loop acceptance over 30 days
              </p>
            </div>
            <div className="text-right">
              <p className="text-[32px] font-semibold leading-[38.4px] tracking-[-0.64px] text-scalova-accent-light">
                {TWIN_PROFILE.approvalRate}
              </p>
              <p className="flex items-center justify-end gap-1 text-xs font-medium tracking-[0.24px] text-scalova-warm">
                <IconTrendingUp size={10} stroke={2} />
                {TWIN_PROFILE.approvalDelta}
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[220px] items-end justify-center px-2">
            <div
              className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-20"
              aria-hidden
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-px w-full bg-scalova-border-strong" />
              ))}
            </div>
            <div className="relative flex h-[220px] w-full items-end justify-between gap-0.5">
              {APPROVAL_CHART_BARS.map((height, index) => {
                const isLast = index === APPROVAL_CHART_BARS.length - 1;
                const barHeight = Math.round((height / maxBar) * 220);
                return (
                  <div
                    key={index}
                    className={cn(
                      'min-w-0 flex-1 rounded-t-sm',
                      isLast ? 'bg-scalova-accent-light' : 'bg-scalova-accent-light/40'
                    )}
                    style={{ height: barHeight }}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className={cn(dash.surface, 'col-span-12 p-6 xl:col-span-4')}>
          <div className="mb-6 flex items-center gap-2">
            <IconSettingsAutomation size={17} stroke={1.5} className="text-scalova-accent-light" />
            <h2 className={tw.panelTitle}>Style Parameters</h2>
          </div>
          <div className="flex flex-col justify-center gap-6 py-4">
            {STYLE_PARAMETERS.map((param) => (
              <StyleSlider key={param.id} param={param} />
            ))}
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <IconFileText size={17} stroke={1.5} className="text-scalova-accent-light" />
            <h2 className={tw.panelTitle}>Recent Outputs</h2>
          </div>
          <Link href={APP_ROUTES.workQueue} className={cn(tw.panelLink, 'inline-flex items-center gap-1')}>
            View All
            <IconArrowUpRight size={10} stroke={2} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {RECENT_OUTPUTS.map((output) => (
            <OutputCard key={output.id} output={output} />
          ))}
        </div>
      </section>
    </div>
  );
}
