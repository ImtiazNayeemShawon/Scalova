'use client';

import Image from 'next/image';
import {
  IconBrandGithub,
  IconDatabase,
  IconLink,
  IconPlus,
  IconServer,
} from '@tabler/icons-react';
import {
  INTEGRATION_CARDS,
  MCP_SERVER_STATUS,
  type IntegrationCard,
  type IntegrationConnectionStatus,
} from '@/lib/integrations-hub-data';
import { PageHeader } from '@/components/app/page-header';
import { Panel, StatusBadge, dash } from '@/components/app/dashboard-ui';
import { cn } from '@/lib/utils';

const STATUS_TONE: Record<IntegrationConnectionStatus, 'green' | 'danger' | 'muted'> = {
  connected: 'green',
  auth_failed: 'danger',
  disconnected: 'muted',
};

const STATUS_LABEL: Record<IntegrationConnectionStatus, string> = {
  connected: 'Connected',
  auth_failed: 'Auth Failed',
  disconnected: 'Disconnected',
};

const ACTION_CLASS: Record<IntegrationCard['action'], string> = {
  configure: dash.btnSecondary,
  reconnect:
    'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-scalova-danger/30 bg-scalova-danger/10 px-4 py-2.5 text-xs font-semibold text-scalova-danger transition hover:bg-scalova-danger/15',
  connect: dash.btnSecondary,
};

function IntegrationIcon({ card }: { card: IntegrationCard }) {
  if (card.icon === 'snowflake') {
    return <IconDatabase size={22} stroke={1.5} className="text-scalova-accent-light" />;
  }
  if (card.icon === '/icons/brands/github.svg') {
    return <IconBrandGithub size={22} stroke={1.5} className="text-scalova-text" />;
  }
  return <Image src={card.icon} alt="" width={22} height={22} className="opacity-90" />;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-scalova-faint">{label}</span>
      <span className="font-medium text-scalova-text">{value}</span>
    </div>
  );
}

function IntegrationHubCard({ card }: { card: IntegrationCard }) {
  const actionLabel =
    card.action === 'configure' ? 'Configure' : card.action === 'reconnect' ? 'Reconnect' : 'Connect';
  const dimmed = card.status === 'disconnected';

  return (
    <article
      className={cn(
        dash.surface,
        'flex flex-col gap-0 p-5 transition hover:border-white/[0.1]',
        dimmed && 'opacity-75',
        card.status === 'auth_failed' && 'border-scalova-danger/25'
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-scalova-elevated">
          <IntegrationIcon card={card} />
        </div>
        <StatusBadge label={STATUS_LABEL[card.status]} tone={STATUS_TONE[card.status]} />
      </div>

      <h3 className="text-lg font-semibold tracking-[-0.02em]">{card.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-scalova-muted">{card.description}</p>

      {card.lastSync && card.scope ? (
        <div
          className={cn(
            'mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4',
            card.status === 'auth_failed' && 'opacity-60'
          )}
        >
          <MetaRow label="Last Sync" value={card.lastSync} />
          <MetaRow label="Scope" value={card.scope} />
        </div>
      ) : null}

      <button type="button" className={cn(ACTION_CLASS[card.action], 'mt-5 w-full')}>
        {card.action === 'connect' ? <IconLink size={14} stroke={1.75} /> : null}
        {actionLabel}
      </button>
    </article>
  );
}

export default function IntegrationsHubPage() {
  const { activeConnections, totalConnections, dataSynced24h, avgLatency } = MCP_SERVER_STATUS;

  return (
    <div className={dash.pageShellWide}>
      <PageHeader
        eyebrow="Connect"
        title="Integrations Hub"
        description="Connect Scalova to your external tools and data sources via MCP (Model Context Protocol)."
        actions={
          <button type="button" className={dash.btnPrimary}>
            <IconPlus size={12} stroke={2.5} />
            Add Integration
          </button>
        }
      />

      <Panel
        title="MCP Server Status"
        icon={<IconServer size={18} stroke={1.5} />}
        action={
          <StatusBadge label="All systems operational" tone="accent" />
        }
        bodyClassName="grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        <div>
          <p className={dash.eyebrow}>Active Connections</p>
          <p className="mt-2 flex items-end gap-1">
            <span className="text-2xl font-semibold tabular-nums">{activeConnections}</span>
            <span className="pb-0.5 text-sm text-scalova-faint">/ {totalConnections}</span>
          </p>
        </div>
        <div className="border-white/[0.06] sm:border-l sm:pl-6">
          <p className={dash.eyebrow}>Data Synced (24h)</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{dataSynced24h}</p>
        </div>
        <div className="border-white/[0.06] sm:border-l sm:pl-6">
          <p className={dash.eyebrow}>Avg Latency</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{avgLatency}</p>
        </div>
      </Panel>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {INTEGRATION_CARDS.map((card) => (
          <IntegrationHubCard key={card.id} card={card} />
        ))}
      </section>
    </div>
  );
}
