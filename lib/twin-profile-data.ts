export const TWIN_PROFILE = {
  name: 'Project_Nexus',
  status: 'ACTIVE' as const,
  description:
    'Primary operational twin assigned to external communications, technical documentation generation, and executive summary synthesis. Optimized for clarity and assertive tone.',
  adapter: 'v2.4.1',
  training: '8,432 Samples',
  lastSync: '12m ago',
  approvalRate: '96.8%',
  approvalDelta: '2.4%',
} as const;

/** Bar heights (px) for the approval rate chart — last bar is highlighted */
export const APPROVAL_CHART_BARS = [
  88, 99, 110, 92, 132, 143, 154, 150, 165, 176, 172, 187, 180, 198, 194, 202, 209, 207, 211, 216,
] as const;

export type StyleParamSide = 'left' | 'right';

export type StyleParameter = {
  id: string;
  leftLabel: string;
  rightLabel: string;
  activeSide: StyleParamSide;
  /** 0–100 fill from the left label side */
  fillPercent: number;
};

export const STYLE_PARAMETERS: StyleParameter[] = [
  { id: 'formal', leftLabel: 'FORMAL', rightLabel: 'CASUAL', activeSide: 'left', fillPercent: 12 },
  { id: 'concise', leftLabel: 'CONCISE', rightLabel: 'VERBOSE', activeSide: 'left', fillPercent: 25 },
  {
    id: 'technical',
    leftLabel: 'TECHNICAL',
    rightLabel: 'ACCESSIBLE',
    activeSide: 'right',
    fillPercent: 88,
  },
  {
    id: 'assertive',
    leftLabel: 'ASSERTIVE',
    rightLabel: 'DIPLOMATIC',
    activeSide: 'right',
    fillPercent: 70,
  },
];

export type OutputCategory = 'email' | 'doc' | 'deck';

export type RecentOutput = {
  id: string;
  category: OutputCategory;
  categoryLabel: string;
  timeAgo: string;
  title: string;
  snippet: string[];
  score: string;
};

export const RECENT_OUTPUTS: RecentOutput[] = [
  {
    id: '1',
    category: 'email',
    categoryLabel: 'EMAIL',
    timeAgo: '2h ago',
    title: 'Q3 Architecture Review Update',
    snippet: [
      '> Subject: Structural Adjustments',
      'Required for v3 Deployment Team,',
      'following the initial load tests, it',
      'is clear the current caching…',
      'strategy is insufficient. Immediate',
    ],
    score: '99% Score',
  },
  {
    id: '2',
    category: 'doc',
    categoryLabel: 'DOC',
    timeAgo: '5h ago',
    title: 'API Integration Guidelines',
    snippet: [
      '# Authentication All endpoints',
      'require Bearer token authorization.',
      '## Rate Limits - Standard tier: 100',
      'req/min - Enterprise tier: Uncapped…',
      'Exceeding limits will result in a',
    ],
    score: '95% Score',
  },
  {
    id: '3',
    category: 'deck',
    categoryLabel: 'DECK',
    timeAgo: '1d ago',
    title: 'Investor Update - Series B Pitch',
    snippet: [
      '[Slide 4: Market Traction] - 300%',
      'YoY Growth in active enterprise',
      'deployments. - Churn reduced to <2%',
      'through enhanced onboarding…',
      'protocols. - Scalova AI',
    ],
    score: '98% Score',
  },
];
