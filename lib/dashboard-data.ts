export type TaskStatus = 'executing' | 'review' | 'planning';

export const DASHBOARD_NAV = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'queue', label: 'Work Queue', href: '/dashboard/work-queue' },
  { id: 'review', label: 'Morning Review', href: '/dashboard/morning-review' },
  { id: 'twin', label: 'Twin Profile', href: '/dashboard/twin-profile' },
  { id: 'integrations', label: 'Integrations', href: '/dashboard/integrations' },
  { id: 'team', label: 'Team', href: '/dashboard/team' },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings' },
] as const;

export const METRICS = [
  {
    label: 'Tasks completed',
    value: '12',
    sub: '↑ 2 from yesterday',
    subTone: 'warm' as const,
    icon: 'check',
  },
  {
    label: 'Approval rate',
    value: '94%',
    sub: 'Top decile performance',
    subTone: 'muted' as const,
    icon: 'thumb',
  },
  {
    label: 'Hours saved',
    value: '42h',
    sub: 'This week',
    subTone: 'muted' as const,
    icon: 'clock',
  },
  {
    label: 'Output volume',
    value: '1.2k',
    sub: 'Items generated',
    subTone: 'muted' as const,
    icon: 'grid',
    glow: true,
  },
];

export const ACTIVE_OPERATIONS = [
  {
    id: '1',
    title: 'Q3 Financial Data Aggregation',
    description: 'Extracting metrics from 14 sources',
    status: 'executing' as TaskStatus,
    statusDetail: '45% Complete',
    icon: 'refresh',
  },
  {
    id: '2',
    title: 'Client Onboarding Pitch Deck',
    description: 'Drafting slide content & layouts',
    status: 'review' as TaskStatus,
    statusDetail: 'Awaiting approval',
    icon: 'deck',
  },
  {
    id: '3',
    title: 'Competitor Analysis Report',
    description: 'Structuring research parameters',
    status: 'planning' as TaskStatus,
    statusDetail: 'Queued',
    icon: 'brain',
  },
];

export const MORNING_REVIEW = [
  { label: 'Landing Page Copy (Web)', score: 88, tone: 'green' as const, fill: 88 },
  { label: 'Sales Strategy (Deck)', score: 76, tone: 'amber' as const, fill: 76 },
  { label: 'API Spec Draft (Doc)', score: 91, tone: 'green' as const, fill: 91 },
];

export type ActivityIconVariant = 'accent' | 'elevated';

export type ActivityItem = {
  id: string;
  icon: string;
  iconVariant: ActivityIconVariant;
  message: string;
  bold?: string;
  highlight?: string;
  middle?: string;
  suffix?: string;
  time: string;
};

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    icon: 'check',
    iconVariant: 'accent',
    message: 'You approved ',
    bold: 'Marketing Campaign Assets',
    time: '2 hours ago',
  },
  {
    id: '2',
    icon: 'target',
    iconVariant: 'elevated',
    message: 'Twin ',
    highlight: 'Data Analyst',
    middle: ' completed ',
    bold: 'Weekly Report Generation',
    time: '4 hours ago',
  },
  {
    id: '3',
    icon: 'plus',
    iconVariant: 'elevated',
    message: 'New task ',
    bold: 'Customer Survey Analysis',
    suffix: ' added to Work Queue',
    time: 'Yesterday at 4:30 PM',
  },
];
