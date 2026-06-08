export type ReviewStatus = 'needs_review' | 'critical';

export type MorningReviewInboxItem = {
  id: string;
  status: ReviewStatus;
  timeAgo: string;
  title: string;
  excerpt: string;
  twin: string;
  score: number;
  breadcrumb: [string, string];
  model: string;
  stats: {
    elapsed: string;
    tokens: string;
    cost: string;
  };
  previewFile: string;
  summary: string;
};

export const MORNING_REVIEW_INBOX: MorningReviewInboxItem[] = [
  {
    id: '1',
    status: 'needs_review',
    timeAgo: '3m',
    title: 'Q3 Marketing Strategy Deck',
    excerpt:
      'Compiled competitor analysis, target demographics, and proposed ad spend allocation for the upcoming quarter.',
    twin: 'StrategyTwin',
    score: 87,
    breadcrumb: ['Marketing', 'Decks'],
    model: 'v2.1 Model',
    stats: { elapsed: '4m 12s', tokens: '14,205', cost: '$0.42' },
    previewFile: 'deck_preview_v1.pdf',
    summary: `I have compiled the Q3 strategy focusing heavily on the Gen-Z demographic shift identified in last month's telemetry. Ad spend has been reallocated from legacy platforms to short-form video channels (TikTok, Reels) resulting in a projected 15% increase in engagement. Note: I flagged the competitor analysis section for human review as "Competitor X" recently changed their pricing model, which may affect our positioning statements on slide 14.`,
  },
  {
    id: '2',
    status: 'critical',
    timeAgo: '5m',
    title: 'API v2.4 Documentation',
    excerpt:
      'Generated Swagger definitions and markdown guides for the new authentication endpoints and rate limits.',
    twin: 'DocuTwin',
    score: 54,
    breadcrumb: ['Engineering', 'Docs'],
    model: 'v2.0 Model',
    stats: { elapsed: '6m 48s', tokens: '22,104', cost: '$0.61' },
    previewFile: 'api_docs_v2.4.md',
    summary:
      'Drafted OpenAPI specs and companion guides for the v2.4 auth overhaul. Several endpoint descriptions still reference deprecated scopes — please verify sections 3.2 and 5.1 before publishing to the developer portal.',
  },
  {
    id: '3',
    status: 'needs_review',
    timeAgo: '1m',
    title: 'Weekly Social Media Copy',
    excerpt:
      'Drafted 15 tweets and 3 LinkedIn posts focusing on the new product launch features and customer quotes.',
    twin: 'CopyTwin',
    score: 76,
    breadcrumb: ['Marketing', 'Social'],
    model: 'v2.1 Model',
    stats: { elapsed: '2m 05s', tokens: '8,420', cost: '$0.18' },
    previewFile: 'social_week_42.txt',
    summary:
      'Prepared a full week of social copy aligned with the launch narrative. Tone is upbeat and product-led; thread #4 may need legal approval for the customer quote attribution.',
  },
  {
    id: '4',
    status: 'needs_review',
    timeAgo: '8m',
    title: 'Q2 Financial Data Extraction',
    excerpt:
      'Extracted unstructured PDF data into organized CSV format for the finance team reconciliation workflow.',
    twin: 'DataTwin',
    score: 95,
    breadcrumb: ['Finance', 'Data'],
    model: 'v2.2 Model',
    stats: { elapsed: '3m 30s', tokens: '11,892', cost: '$0.29' },
    previewFile: 'q2_extract.csv',
    summary:
      'Parsed 148 pages of PDF statements into structured CSV with 99.2% field match confidence. Flagged three ambiguous currency rows on page 72 for manual confirmation.',
  },
];
