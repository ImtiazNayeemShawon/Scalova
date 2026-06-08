'use client';

import { useState } from 'react';
import {
  IconBrackets,
  IconDownload,
  IconHeadset,
  IconLayoutGrid,
  IconPlus,
} from '@tabler/icons-react';
import {
  BILLING_OVERVIEW,
  SETTINGS_TABS,
  TWIN_COMPUTE_ROWS,
  formatCurrency,
  type SettingsTabId,
  type TwinComputeRow,
} from '@/lib/settings-data';
import { PageHeader } from '@/components/app/page-header';
import { ProgressBar, dash } from '@/components/app/dashboard-ui';
import { cn } from '@/lib/utils';

const ICON_TONE_STYLES: Record<
  TwinComputeRow['iconTone'],
  { box: string; icon: string }
> = {
  accent: {
    box: 'bg-scalova-accent-light/10',
    icon: 'text-scalova-accent-light',
  },
  violet: {
    box: 'bg-[rgba(224,182,255,0.1)]',
    icon: 'text-[#e0b6ff]',
  },
  warm: {
    box: 'bg-scalova-warm/10',
    icon: 'text-scalova-warm',
  },
};

function TwinComputeIcon({ row }: { row: TwinComputeRow }) {
  const tone = ICON_TONE_STYLES[row.iconTone];
  const props = { size: 18, stroke: 1.5, className: tone.icon };

  return (
    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded', tone.box)}>
      {row.icon === 'code' ? (
        <IconBrackets {...props} />
      ) : row.icon === 'grid' ? (
        <IconLayoutGrid {...props} />
      ) : (
        <IconHeadset {...props} />
      )}
    </div>
  );
}

function TwinComputeRowItem({ row }: { row: TwinComputeRow }) {
  return (
    <div className="flex flex-col gap-4 border-b border-scalova-border-strong/50 px-[13px] py-[13px] last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <TwinComputeIcon row={row} />
        <div className="min-w-0">
          <p className="text-sm font-medium leading-[22.4px]">{row.name}</p>
          <p className="text-xs font-medium tracking-[0.24px] text-scalova-muted">ID: {row.twinId}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-8">
        <div className="text-right">
          <p className="text-sm leading-[22.4px]">{row.computeHours} hrs</p>
          <p className="text-xs font-medium tracking-[0.24px] text-scalova-muted">Compute Time</p>
        </div>
        <p className="w-24 text-right text-xl font-medium tracking-[-0.2px] tabular-nums">
          {formatCurrency(row.cost)}
        </p>
      </div>
    </div>
  );
}

function BillingPanel() {
  const { monthlySpend, monthlyLimit, utilizedPercent, daysRemaining, activeSeats, seatLimit } =
    BILLING_OVERVIEW;

  return (
    <div className={dash.stackMd}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <article className={cn(dash.surface, 'relative col-span-1 overflow-hidden p-5 lg:col-span-2')}>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-scalova-accent-light/5 to-transparent"
            aria-hidden
          />
          <div className="relative flex flex-col gap-2">
            <h3 className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">
              Current Monthly Spend
            </h3>
            <div className="flex flex-wrap items-end gap-4 pb-4">
              <p className="text-[32px] font-semibold leading-[38.4px] tracking-[-0.64px]">
                {formatCurrency(monthlySpend)}
              </p>
              <p className="pb-1 text-sm leading-[22.4px] text-scalova-warm">
                / {formatCurrency(monthlyLimit)} limit
              </p>
            </div>
            <ProgressBar value={utilizedPercent} tone="accent" />
            <div className="flex items-center justify-between text-xs font-medium tracking-[0.24px] text-scalova-muted">
              <span>{utilizedPercent}% utilized</span>
              <span>{daysRemaining} days remaining</span>
            </div>
          </div>
        </article>

        <article className={cn(dash.surface, 'flex flex-col justify-between p-5')}>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">
              Active Seats
            </h3>
            <p className="mt-4 text-[32px] font-semibold leading-[38.4px] tracking-[-0.64px]">
              {activeSeats}
              <span className="ml-1 text-sm font-normal text-scalova-muted">/ {seatLimit}</span>
            </p>
          </div>
          <button
            type="button"
            className={cn(dash.btnSecondary, 'mt-4 w-full')}
          >
            <IconPlus size={10} stroke={2} />
            Add Seats
          </button>
        </article>
      </div>

      <section className={cn(dash.surface, 'overflow-hidden')}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-scalova-border-strong px-5 py-5">
          <h3 className="text-xl font-medium tracking-[-0.2px]">Twin Compute Breakdown</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium tracking-[0.24px] text-scalova-muted transition hover:text-scalova-text"
          >
            <IconDownload size={11} stroke={1.75} />
            Export CSV
          </button>
        </div>
        <div className="px-5 py-5">
          {TWIN_COMPUTE_ROWS.map((row) => (
            <TwinComputeRowItem key={row.id} row={row} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfilePanel() {
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@acme.co');
  const [timezone, setTimezone] = useState('America/New_York');

  return (
    <form
      className={cn(dash.surface, 'flex flex-col gap-5 p-6')}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">Full name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={dash.input}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">Work email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={dash.input}
          />
        </label>
      </div>
      <label className="flex max-w-md flex-col gap-2">
        <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">Timezone</span>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className={dash.select}
        >
          <option value="America/New_York">Eastern (US)</option>
          <option value="America/Los_Angeles">Pacific (US)</option>
          <option value="Europe/London">London</option>
        </select>
      </label>
      <button
        type="submit"
        className={dash.btnPrimary}
      >
        Save profile
      </button>
    </form>
  );
}

function SecurityPanel() {
  const [mfa, setMfa] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <div className={cn(dash.surface, 'flex flex-col gap-6 p-6')}>
      {[
        {
          id: 'mfa',
          title: 'Require MFA for admins',
          desc: 'Applies to all workspace administrators.',
          checked: mfa,
          onChange: setMfa,
        },
        {
          id: 'sessions',
          title: 'New session alerts',
          desc: 'Email when a new device signs in.',
          checked: sessionAlerts,
          onChange: setSessionAlerts,
        },
      ].map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-scalova-muted">{item.desc}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={item.checked}
            onClick={() => item.onChange(!item.checked)}
            className={cn(
              'relative h-6 w-10 shrink-0 rounded-full transition',
              item.checked ? 'bg-scalova-accent-light' : 'bg-scalova-elevated'
            )}
          >
            <span
              className={cn(
                'absolute top-1 size-4 rounded-full transition',
                item.checked ? 'right-1 bg-scalova-accent-deep' : 'left-1 bg-scalova-muted'
              )}
            />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={dash.btnSecondary}
      >
        Rotate API keys
      </button>
    </div>
  );
}

function PrivacyPanel() {
  const [retention, setRetention] = useState('90');
  const [anonymize, setAnonymize] = useState(false);

  return (
    <div className={cn(dash.surface, 'flex flex-col gap-5 p-6')}>
      <label className="flex max-w-sm flex-col gap-2">
        <span className="text-xs font-medium tracking-[0.24px] text-scalova-muted">
          Log retention (days)
        </span>
        <select
          value={retention}
          onChange={(e) => setRetention(e.target.value)}
          className={dash.select}
        >
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="365">1 year</option>
        </select>
      </label>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Anonymize exported reports</p>
          <p className="text-xs text-scalova-muted">Strip PII from CSV and PDF exports.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={anonymize}
          onClick={() => setAnonymize((v) => !v)}
          className={cn(
            'relative h-6 w-10 shrink-0 rounded-full transition',
            anonymize ? 'bg-scalova-accent-light' : 'bg-scalova-elevated'
          )}
        >
          <span
            className={cn(
              'absolute top-1 size-4 rounded-full transition',
              anonymize ? 'right-1 bg-scalova-accent-deep' : 'left-1 bg-scalova-muted'
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>('billing');

  return (
    <div className={dash.pageShellNarrow}>
      <PageHeader eyebrow="Account" title="Settings" description="Manage profile, billing, security, and privacy for your workspace." />
      <div className={dash.stackSm}>
        <div
          className="flex gap-4 overflow-x-auto border-b border-white/[0.06] sm:gap-6"
          role="tablist"
          aria-label="Settings sections"
        >
          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'shrink-0 pb-3 text-xs font-medium tracking-[0.24px] transition',
                  isActive
                    ? 'border-b-2 border-scalova-accent-light pb-[14px] text-scalova-accent-light'
                    : 'text-scalova-muted hover:text-scalova-text'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel">
        {activeTab === 'billing' && <BillingPanel />}
        {activeTab === 'profile' && <ProfilePanel />}
        {activeTab === 'security' && <SecurityPanel />}
        {activeTab === 'privacy' && <PrivacyPanel />}
      </div>
    </div>
  );
}
