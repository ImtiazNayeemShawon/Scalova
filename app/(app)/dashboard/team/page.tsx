'use client';

import { useMemo, useState } from 'react';
import {
  IconBolt,
  IconChartBar,
  IconDotsVertical,
  IconDownload,
  IconPlus,
  IconSearch,
  IconShield,
  IconThumbUp,
  IconTrendingUp,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import { DropdownItem, DropdownMenu, FilterDropdown } from '@/components/app/dropdown-menu';
import { PageHeader } from '@/components/app/page-header';
import { ProgressBar, StatusBadge, dash } from '@/components/app/dashboard-ui';
import {
  ORG_USAGE_BARS,
  TEAM_MEMBERS,
  TEAM_METRICS,
  TEAM_OVERVIEW,
} from '@/lib/team-data';
import type { TeamMember, TwinStatus } from '@/lib/team-data';
import { cn } from '@/lib/utils';

const TABLE_GRID =
  'grid grid-cols-[minmax(200px,1.3fr)_minmax(130px,0.85fr)_minmax(160px,1fr)_minmax(100px,0.7fr)_minmax(56px,0.45fr)]';

const STATUS_STYLES: Record<
  TwinStatus,
  { badge: string; dot: string; label: string }
> = {
  active: {
    badge: 'border border-scalova-accent-light/20 bg-scalova-accent-light/10 text-scalova-accent-light',
    dot: 'bg-scalova-accent-light',
    label: 'ACTIVE',
  },
  learning: {
    badge: 'border border-scalova-warm/20 bg-scalova-warm/10 text-scalova-warm',
    dot: 'bg-scalova-warm',
    label: 'LEARNING',
  },
  paused: {
    badge: 'border border-scalova-border-strong bg-scalova-elevated text-scalova-muted',
    dot: 'bg-scalova-border-strong',
    label: 'PAUSED',
  },
};

function MetricIcon({ type }: { type: (typeof TEAM_METRICS)[number]['icon'] }) {
  const props = { size: 16, stroke: 1.5, className: 'text-scalova-muted' };
  switch (type) {
    case 'users':
      return <IconUsers {...props} />;
    case 'bolt':
      return <IconBolt {...props} />;
    case 'thumb':
      return <IconThumbUp {...props} className="text-scalova-accent-light" />;
    case 'wallet':
      return <IconWallet {...props} />;
    default:
      return <IconUsers {...props} />;
  }
}

const TWIN_STATUS_TONE: Record<TwinStatus, 'accent' | 'warm' | 'muted'> = {
  active: 'accent',
  learning: 'warm',
  paused: 'muted',
};

function TwinStatusBadge({ status }: { status: TwinStatus }) {
  const s = STATUS_STYLES[status];
  return <StatusBadge label={s.label} tone={TWIN_STATUS_TONE[status]} />;
}

function ApprovalCell({ rate }: { rate: number | null }) {
  if (rate === null) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-scalova-muted">--</span>
        <div className="h-1 w-16 rounded-full bg-scalova-elevated" />
      </div>
    );
  }

  const tone = rate >= 90 ? 'green' : 'amber';
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm tabular-nums">{rate}%</span>
      <div className="h-1 w-16 overflow-hidden rounded-full bg-scalova-elevated">
        <div
          className={cn(
            'h-full rounded-full',
            tone === 'green' ? 'bg-scalova-green' : 'bg-scalova-amber'
          )}
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
}

const DATA_SCOPE_OPTIONS = [
  { value: 'org', label: 'Organization-wide' },
  { value: 'team', label: 'Team-scoped only' },
  { value: 'project', label: 'Project-scoped' },
];

function TeamRow({ member }: { member: TeamMember }) {
  return (
    <div
      className={cn(
        TABLE_GRID,
        'items-center border-t border-white/[0.04] px-6 py-4 transition hover:bg-white/[0.03]'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded border border-scalova-border-strong bg-scalova-deep text-xs font-bold tracking-[0.24px]">
          {member.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-[22.4px]">{member.name}</p>
          <p className="text-xs font-medium tracking-[0.24px] text-scalova-muted">{member.role}</p>
        </div>
      </div>
      <div>
        <TwinStatusBadge status={member.status} />
      </div>
      <ApprovalCell rate={member.approvalRate} />
      <span
        className={cn(
          'text-sm',
          member.status === 'paused' ? 'text-scalova-muted' : 'text-scalova-text'
        )}
      >
        {member.tasksPerWeek}
      </span>
      <div className="flex justify-end">
        <DropdownMenu
          align="right"
          trigger={
            <button
              type="button"
              className="p-1 text-scalova-muted transition hover:text-scalova-text"
              aria-label={`Actions for ${member.name}`}
            >
              <IconDotsVertical size={14} stroke={1.75} />
            </button>
          }
        >
          <DropdownItem>View twin profile</DropdownItem>
          <DropdownItem>Adjust allocation</DropdownItem>
          <DropdownItem>{member.status === 'paused' ? 'Resume twin' : 'Pause twin'}</DropdownItem>
          <DropdownItem destructive>Revoke access</DropdownItem>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [externalComm, setExternalComm] = useState(true);
  const [dataScope, setDataScope] = useState('org');
  const [memberSearch, setMemberSearch] = useState('');
  const spendUsedPercent = 72;
  const maxBar = Math.max(...ORG_USAGE_BARS.map((b) => b.height));

  const filteredMembers = useMemo(() => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.status.includes(q)
    );
  }, [memberSearch]);

  return (
    <div className={dash.pageShellNarrow}>
      <PageHeader
        eyebrow="Organization"
        title={TEAM_OVERVIEW.title}
        description={TEAM_OVERVIEW.subtitle}
        actions={
          <>
            <button type="button" className={dash.btnSecondary}>
              <IconDownload size={11} stroke={1.75} />
              Export Report
            </button>
            <button type="button" className={dash.btnPrimary}>
              <IconPlus size={10} stroke={2} />
              Provision Twin
            </button>
          </>
        }
      />

      <section
        className={dash.metricsGrid}
        aria-label="Team metrics"
      >
        {TEAM_METRICS.map((metric) => (
          <article
            key={metric.id}
            className={cn(
              dash.metricCard,
              'justify-between',
              'accent' in metric &&
                metric.accent &&
                'after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-br after:from-scalova-accent-light/5 after:to-transparent'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">
                {metric.label}
              </span>
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded',
                  'accent' in metric && metric.accent
                    ? 'bg-scalova-accent-light/10'
                    : 'bg-scalova-elevated'
                )}
              >
                <MetricIcon type={metric.icon} />
              </div>
            </div>
            <div>
              <p
                className={cn(
                  'text-[32px] font-bold leading-8',
                  'accent' in metric && metric.accent && 'text-scalova-accent-light'
                )}
              >
                {metric.value}
              </p>
              {'trend' in metric ? (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium tracking-[0.24px]">
                  <IconTrendingUp size={10} stroke={2} className="text-scalova-green" />
                  <span className="text-scalova-green">+{metric.trend}</span>
                  <span className="text-scalova-muted">{metric.trendLabel}</span>
                </p>
              ) : null}
              {'fillPercent' in metric ? (
                <ProgressBar value={metric.fillPercent} tone="accent" className="mt-3" />
              ) : null}
              {'sub' in metric ? (
                <p className="mt-2 text-xs font-medium tracking-[0.24px] text-scalova-muted">
                  {metric.sub}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <div className={dash.grid}>
        <section className={cn(dash.surface, 'col-span-12 flex flex-col xl:col-span-4')}>
          <div className={cn(dash.panelHeader, '!min-h-0')}>
            <div className="flex items-center gap-2.5">
            <IconShield size={16} stroke={1.5} className="text-scalova-accent-light" />
              <h2 className={dash.sectionTitle}>Governance Controls</h2>
            </div>
          </div>
          <div className={cn(dash.panelBody, dash.stackMd)}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium tracking-[0.24px]">
                <span>Global Spend Cap (Monthly)</span>
                <span className="text-scalova-muted">{TEAM_OVERVIEW.spendCapDisplay}</span>
              </div>
              <ProgressBar value={spendUsedPercent} tone="accent" />
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-medium">External Comm Toggles</p>
                <p className="text-xs font-medium tracking-[0.24px] text-scalova-muted">
                  Allow twins to email outside domains
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={externalComm}
                onClick={() => setExternalComm((v) => !v)}
                className={cn(
                  'relative h-6 w-10 shrink-0 rounded-full transition',
                  externalComm ? 'bg-scalova-accent-light' : 'bg-scalova-elevated'
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 size-4 rounded-full bg-scalova-accent-deep transition',
                    externalComm ? 'right-1' : 'left-1 bg-scalova-muted'
                  )}
                />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-[0.24px]">Default Data Scope</span>
              <FilterDropdown
                label="Scope"
                value={dataScope}
                options={DATA_SCOPE_OPTIONS}
                onChange={setDataScope}
                className="w-full justify-between"
              />
            </div>
          </div>
        </section>

        <section className={cn(dash.surface, 'col-span-12 flex flex-col xl:col-span-8')}>
          <div className={dash.panelHeader}>
            <div className="flex items-center gap-2.5">
              <IconChartBar size={18} stroke={1.5} className="text-scalova-accent-light" />
              <h2 className={dash.sectionTitle}>Org Usage Analytics</h2>
            </div>
            <div className="flex gap-1.5">
              {(['week', 'month'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'rounded px-3 py-1 text-xs font-medium capitalize tracking-[0.24px] transition',
                    period === p
                      ? 'bg-scalova-accent/15 text-scalova-accent-light'
                      : 'text-scalova-muted hover:bg-white/[0.04] hover:text-scalova-text'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className={cn(dash.panelBody, 'pt-2')}>
          <div className="relative flex min-h-[220px] items-end justify-center gap-2 rounded-xl border border-white/[0.05] bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_5%,transparent_5%),linear-gradient(180deg,rgba(255,255,255,0.03)_5%,transparent_5%)] bg-[length:24px_24px] px-4 pb-4 pt-10">
            {ORG_USAGE_BARS.map((bar) => {
              const barHeight = Math.round((bar.height / maxBar) * 175);
              return (
                <div key={bar.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-full rounded-t-sm',
                      'highlight' in bar && bar.highlight
                        ? 'border-t-2 border-scalova-accent-light bg-scalova-accent-light shadow-[0_0_7.5px_rgba(86,197,254,0.3)]'
                        : 'bg-scalova-accent-light/30'
                    )}
                    style={{ height: barHeight }}
                  />
                  <span className="text-[10px] text-scalova-muted">{bar.label}</span>
                </div>
              );
            })}
          </div>
          </div>
        </section>
      </div>

      <section className={dash.tableWrap}>
        <div className={cn(dash.panelHeader, 'flex-col gap-4 sm:flex-row sm:items-center')}>
          <h2 className={dash.sectionTitle}>Employee Twin Allocation</h2>
          <label className="relative flex w-full max-w-64 items-center sm:w-64">
            <IconSearch
              size={14}
              stroke={1.75}
              className="pointer-events-none absolute left-3 text-scalova-faint"
            />
            <input
              type="search"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Filter by name or status..."
              className={cn(dash.input, 'py-2 pl-9 pr-3 text-xs')}
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <div className={cn(TABLE_GRID, 'min-w-[640px] border-b border-white/[0.06] bg-white/[0.02] px-6 py-3.5')}>
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-scalova-muted">
              Employee
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-scalova-muted">
              Twin Status
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-scalova-muted">
              Approval Rate
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-scalova-muted">
              Tasks/Week
            </span>
            <span className="text-right text-xs font-semibold uppercase tracking-[0.6px] text-scalova-muted">
              Actions
            </span>
          </div>
          {filteredMembers.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-scalova-muted">No team members match your search.</p>
          ) : (
            filteredMembers.map((member) => <TeamRow key={member.id} member={member} />)
          )}
        </div>
      </section>
    </div>
  );
}
