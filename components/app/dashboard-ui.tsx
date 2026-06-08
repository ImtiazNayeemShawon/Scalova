import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { dash } from '@/lib/dashboard-ui';

export function PageTitle({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'flex flex-col gap-5 border-b border-white/[0.06] pb-7 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        {eyebrow ? <span className={dash.eyebrow}>{eyebrow}</span> : null}
        <h1 className={dash.pageTitle}>{title}</h1>
        {description ? <p className={dash.pageDesc}>{description}</p> : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-2.5">{actions}</div>
      ) : null}
    </header>
  );
}

export function Panel({
  title,
  description,
  action,
  icon,
  children,
  className,
  bodyClassName,
  noPadding,
  fill,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
  /** Stretch panel to fill grid cell height */
  fill?: boolean;
}) {
  return (
    <section className={cn(dash.surface, 'flex flex-col overflow-hidden', fill && 'h-full', className)}>
      <div className={dash.panelHeader}>
        <div className="flex min-w-0 items-center gap-3">
          {icon ? (
            <div className={cn(dash.iconBox, 'text-scalova-accent-light')}>{icon}</div>
          ) : null}
          <div className="min-w-0">
            <h2 className={dash.sectionTitle}>{title}</h2>
            {description ? <p className={dash.sectionDesc}>{description}</p> : null}
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={cn(!noPadding && dash.panelBody, 'flex flex-1 flex-col', bodyClassName)}>
        {children}
      </div>
    </section>
  );
}

export function MetricCard({
  label,
  value,
  sub,
  subTone = 'muted',
  icon,
  highlight,
  className,
}: {
  label: string;
  value: string;
  sub: string;
  subTone?: 'muted' | 'warm' | 'green';
  icon?: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        dash.metricCard,
        highlight &&
          'before:pointer-events-none before:absolute before:-right-8 before:-top-8 before:size-32 before:rounded-full before:bg-scalova-accent-light/15 before:blur-2xl',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={dash.metricLabel}>{label}</span>
        {icon ? <div className={dash.iconBox}>{icon}</div> : null}
      </div>
      <div className="mt-auto space-y-1.5 pt-3">
        <p className={dash.metricValue}>{value}</p>
        <p
          className={cn(
            'text-xs font-medium leading-snug',
            subTone === 'warm' && 'text-scalova-warm',
            subTone === 'green' && 'text-scalova-green',
            subTone === 'muted' && 'text-scalova-muted'
          )}
        >
          {sub}
        </p>
      </div>
    </article>
  );
}

export function StatusBadge({
  label,
  tone = 'neutral',
  className,
}: {
  label: string;
  tone?: 'accent' | 'warm' | 'green' | 'danger' | 'neutral' | 'muted';
  className?: string;
}) {
  const tones = {
    accent: 'border-scalova-accent-light/25 bg-scalova-accent-light/10 text-scalova-accent-light',
    warm: 'border-scalova-warm/25 bg-scalova-warm/10 text-scalova-warm',
    green: 'border-scalova-green/25 bg-scalova-green/10 text-scalova-green',
    danger: 'border-scalova-danger/25 bg-scalova-danger/10 text-scalova-danger',
    neutral: 'border-white/[0.08] bg-white/[0.04] text-scalova-muted',
    muted: 'border-white/[0.06] bg-scalova-elevated text-scalova-faint',
  };
  const dots = {
    accent: 'bg-scalova-accent-light',
    warm: 'bg-scalova-warm',
    green: 'bg-scalova-green',
    danger: 'bg-scalova-danger',
    neutral: 'bg-scalova-muted',
    muted: 'bg-scalova-faint',
  };

  return (
    <span className={cn(dash.badge, tones[tone], className)}>
      <span className={cn('size-1.5 shrink-0 rounded-full', dots[tone])} />
      {label}
    </span>
  );
}

export function IconBox({
  children,
  tone = 'accent',
  className,
}: {
  children: ReactNode;
  tone?: 'accent' | 'elevated' | 'warm' | 'danger';
  className?: string;
}) {
  const tones = {
    accent: 'bg-scalova-accent/10 ring-scalova-accent-light/20 text-scalova-accent-light',
    elevated: 'bg-scalova-elevated ring-white/[0.06] text-scalova-muted',
    warm: 'bg-scalova-warm/10 ring-scalova-warm/20 text-scalova-warm',
    danger: 'bg-scalova-danger/10 ring-scalova-danger/20 text-scalova-danger',
  };
  return (
    <div className={cn(dash.iconBox, tones[tone], className)}>
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        dash.surface,
        'flex flex-col items-center justify-center gap-5 px-8 py-20 text-center'
      )}
    >
      <h2 className={dash.sectionTitle}>{title}</h2>
      <p className="max-w-sm text-sm leading-relaxed text-scalova-muted">{description}</p>
      {action}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = 'accent',
  className,
}: {
  value: number;
  tone?: 'accent' | 'green' | 'amber' | 'danger' | 'muted';
  className?: string;
}) {
  const fill = {
    accent: 'bg-scalova-accent-light',
    green: 'bg-scalova-green',
    amber: 'bg-scalova-amber',
    danger: 'bg-scalova-danger',
    muted: 'bg-scalova-faint',
  };
  return (
    <div
      className={cn('h-1.5 overflow-hidden rounded-full bg-white/[0.06]', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-500', fill[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export { dash };
