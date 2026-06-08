export const APP_ROUTES = {
  login: '/login',
  signup: '/signup',
  onboarding: {
    connect: '/onboarding/connect',
    deliverables: '/onboarding/deliverables',
    bootstrap: '/onboarding/bootstrap',
    ready: '/onboarding/ready',
  },
  dashboard: '/dashboard',
  morningReview: '/dashboard/morning-review',
  workQueue: '/dashboard/work-queue',
  twinProfile: '/dashboard/twin-profile',
  integrations: '/dashboard/integrations',
  team: '/dashboard/team',
  settings: '/dashboard/settings',
} as const;

export type DeliverableId =
  | 'decks'
  | 'websites'
  | 'marketing'
  | 'dashboards'
  | 'legal'
  | 'design'
  | 'video'
  | 'blog'
  | 'spreadsheets'
  | 'reports';

export const DELIVERABLES: {
  id: DeliverableId;
  label: string;
  icon: string;
}[] = [
  { id: 'decks', label: 'Presentation Decks', icon: 'presentation' },
  { id: 'websites', label: 'Websites', icon: 'world' },
  { id: 'marketing', label: 'Marketing Copy', icon: 'speakerphone' },
  { id: 'dashboards', label: 'Data Dashboards', icon: 'layout-grid' },
  { id: 'legal', label: 'Legal Documents', icon: 'gavel' },
  { id: 'design', label: 'Design Assets', icon: 'palette' },
  { id: 'video', label: 'Video Scripts', icon: 'movie' },
  { id: 'blog', label: 'Blog Posts', icon: 'article' },
  { id: 'spreadsheets', label: 'Spreadsheets', icon: 'table' },
  { id: 'reports', label: 'Reports', icon: 'report' },
];

export const INTEGRATIONS: {
  id: string;
  name: string;
  icon?: string;
  letter?: string;
}[] = [
  { id: 'google', name: 'Google Workspace' },
  { id: 'microsoft', name: 'Microsoft 365' },
  { id: 'slack', name: 'Slack', icon: '/icons/brands/slack.svg' },
  { id: 'notion', name: 'Notion', icon: '/icons/brands/notion.svg' },
  { id: 'hubspot', name: 'HubSpot', letter: 'H' },
  { id: 'figma', name: 'Figma', icon: '/icons/brands/figma.svg' },
  { id: 'salesforce', name: 'Salesforce', icon: '/icons/brands/salesforce.svg' },
];
