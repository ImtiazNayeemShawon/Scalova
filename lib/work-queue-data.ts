export type WorkQueueStatus = 'in_progress' | 'pending' | 'completed' | 'failed';

export type WorkQueueItem = {
  id: string;
  deliverable: string;
  deliverableLines?: [string, string];
  description: string;
  descriptionLines?: [string, string];
  status: WorkQueueStatus;
  progress: number;
  estTime: string;
  estTimeLines?: [string, string];
  cost: string;
  icon: 'chart' | 'mail' | 'code' | 'database';
  failed?: boolean;
};

export const WORK_QUEUE_ITEMS: WorkQueueItem[] = [
  {
    id: '1',
    icon: 'chart',
    deliverable: 'Q3 Financial Report',
    deliverableLines: ['Q3 Financial', 'Report'],
    description: 'Compile data from Stripe & QuickBooks, generate executive summary.',
    descriptionLines: ['Compile data from Stripe & QuickBooks,', 'generate executive summary.'],
    status: 'in_progress',
    progress: 65,
    estTime: '45m remaining',
    estTimeLines: ['45m', 'remaining'],
    cost: '$4.50',
  },
  {
    id: '2',
    icon: 'mail',
    deliverable: 'Client Outreach Sync',
    deliverableLines: ['Client Outreach', 'Sync'],
    description: 'Draft personalized follow-ups for enterprise leads from last week.',
    descriptionLines: ['Draft personalized follow-ups for enterprise', 'leads from last week.'],
    status: 'pending',
    progress: 0,
    estTime: 'Est. 1h 20m',
    estTimeLines: ['Est. 1h', '20m'],
    cost: '$8.00',
  },
  {
    id: '3',
    icon: 'code',
    deliverable: 'API Endpoint Refactor',
    deliverableLines: ['API Endpoint', 'Refactor'],
    description: 'Optimize database queries for user/auth endpoints.',
    descriptionLines: ['Optimize database queries for user/auth', 'endpoints.'],
    status: 'completed',
    progress: 100,
    estTime: '--',
    cost: '$12.50',
  },
  {
    id: '4',
    icon: 'database',
    deliverable: 'Data Synchronization',
    deliverableLines: ['Data', 'Synchronization'],
    description: 'Sync local cache with remote MongoDB cluster.',
    descriptionLines: ['Sync local cache with remote MongoDB', 'cluster.'],
    status: 'failed',
    progress: 42,
    estTime: 'Halted',
    cost: '$2.10',
    failed: true,
  },
];
