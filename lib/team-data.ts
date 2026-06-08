export const TEAM_OVERVIEW = {
  title: 'Team Overview',
  subtitle: 'Manage organization-wide twin deployments and governance policies.',
  spendCap: 5000,
  spendCapDisplay: '$5,000',
  dataScope: 'Standard (G-Suite + Drive)',
} as const;

export const TEAM_METRICS = [
  {
    id: 'active-twins',
    label: 'ACTIVE TWINS',
    value: '142',
    trend: '12%',
    trendLabel: 'vs last month',
    icon: 'users' as const,
  },
  {
    id: 'tasks-automated',
    label: 'TASKS AUTOMATED',
    value: '24.5k',
    trend: '5.4%',
    trendLabel: 'this week',
    icon: 'bolt' as const,
  },
  {
    id: 'approval-rate',
    label: 'AVG. APPROVAL RATE',
    value: '98.2%',
    fillPercent: 98,
    icon: 'thumb' as const,
    accent: true,
  },
  {
    id: 'compute-spend',
    label: 'TOTAL COMPUTE SPEND',
    value: '$4,290',
    sub: '72% of monthly cap',
    icon: 'wallet' as const,
  },
] as const;

/** Org usage chart bar heights (px) — Thu is highlighted */
export const ORG_USAGE_BARS = [
  { label: 'Mon', height: 82 },
  { label: 'Tue', height: 124 },
  { label: 'Wed', height: 113 },
  { label: 'Thu', height: 175, highlight: true },
  { label: 'Fri', height: 62 },
] as const;

export type TwinStatus = 'active' | 'learning' | 'paused';

export type TeamMember = {
  id: string;
  initials: string;
  name: string;
  role: string;
  status: TwinStatus;
  approvalRate: number | null;
  tasksPerWeek: number;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    initials: 'SD',
    name: 'Sarah Davis',
    role: 'Marketing Director',
    status: 'active',
    approvalRate: 98.1,
    tasksPerWeek: 428,
  },
  {
    id: '2',
    initials: 'MJ',
    name: 'Marcus Johnson',
    role: 'Lead Engineer',
    status: 'learning',
    approvalRate: 82.4,
    tasksPerWeek: 156,
  },
  {
    id: '3',
    initials: 'EL',
    name: 'Elena Rodriguez',
    role: 'HR Business Partner',
    status: 'paused',
    approvalRate: null,
    tasksPerWeek: 0,
  },
];
