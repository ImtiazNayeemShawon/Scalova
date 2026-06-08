export const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'billing', label: 'Billing' },
  { id: 'security', label: 'Security' },
  { id: 'privacy', label: 'Privacy' },
] as const;

export type SettingsTabId = (typeof SETTINGS_TABS)[number]['id'];

export const BILLING_OVERVIEW = {
  monthlySpend: 2450,
  monthlyLimit: 5000,
  utilizedPercent: 49,
  daysRemaining: 12,
  activeSeats: 14,
  seatLimit: 20,
} as const;

export type TwinComputeIcon = 'code' | 'grid' | 'headset';

export type TwinComputeRow = {
  id: string;
  name: string;
  twinId: string;
  computeHours: number;
  cost: number;
  icon: TwinComputeIcon;
  iconTone: 'accent' | 'violet' | 'warm';
};

export const TWIN_COMPUTE_ROWS: TwinComputeRow[] = [
  {
    id: '1',
    name: 'DevOps Automator Alpha',
    twinId: 'TWN-8932',
    computeHours: 420,
    cost: 840,
    icon: 'code',
    iconTone: 'accent',
  },
  {
    id: '2',
    name: 'Data Pipeline Sentinel',
    twinId: 'TWN-4110',
    computeHours: 315,
    cost: 630,
    icon: 'grid',
    iconTone: 'violet',
  },
  {
    id: '3',
    name: 'L1 Triage Bot',
    twinId: 'TWN-2099',
    computeHours: 245,
    cost: 490,
    icon: 'headset',
    iconTone: 'warm',
  },
];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
