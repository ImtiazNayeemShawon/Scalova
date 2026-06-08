export type IntegrationConnectionStatus = 'connected' | 'auth_failed' | 'disconnected';

export type IntegrationCard = {
  id: string;
  name: string;
  description: string;
  status: IntegrationConnectionStatus;
  lastSync?: string;
  scope?: string;
  icon: string;
  action: 'configure' | 'reconnect' | 'connect';
};

export const MCP_SERVER_STATUS = {
  operational: true,
  activeConnections: 12,
  totalConnections: 24,
  dataSynced24h: '4.2 GB',
  avgLatency: '42ms',
} as const;

export const INTEGRATION_CARDS: IntegrationCard[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Codebase analysis, PR reviews, and issue tracking automation.',
    status: 'connected',
    lastSync: '2 mins ago',
    scope: 'Full Access (Read/Write)',
    icon: '/icons/brands/github.svg',
    action: 'configure',
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    description: 'Read-only data warehouse access for analytics queries.',
    status: 'connected',
    lastSync: '1 hr ago',
    scope: 'Read Only',
    icon: 'snowflake',
    action: 'configure',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Workspace messaging and thread summarization.',
    status: 'auth_failed',
    lastSync: '3 days ago',
    scope: 'Channels (Read)',
    icon: '/icons/brands/slack.svg',
    action: 'reconnect',
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Extract design tokens and layout properties.',
    status: 'disconnected',
    icon: '/icons/brands/figma.svg',
    action: 'connect',
  },
];
