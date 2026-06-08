/** Dashboard spacing & surface tokens — 4px base, 8px rhythm */
export const dash = {
  /* Layout — vertical rhythm */
  page: 'mx-auto w-full max-w-[1400px]',
  pageWide: 'mx-auto w-full max-w-[1600px]',
  pageNarrow: 'mx-auto w-full max-w-[1200px]',
  /** Page wrapper: max-width + consistent section gaps */
  pageShell: 'mx-auto flex w-full max-w-[1400px] flex-col gap-8',
  pageShellWide: 'mx-auto flex w-full max-w-[1600px] flex-col gap-8',
  pageShellNarrow: 'mx-auto flex w-full max-w-[1200px] flex-col gap-8',
  stack: 'flex flex-col gap-8',
  stackMd: 'flex flex-col gap-6',
  stackSm: 'flex flex-col gap-4',
  grid: 'grid min-w-0 grid-cols-12 gap-5',
  metricsGrid: 'col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4',

  /* Surfaces */
  surface:
    'rounded-2xl border border-white/[0.06] bg-scalova-deep/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl',
  surfaceFlat: 'rounded-2xl border border-white/[0.06] bg-scalova-deep/90',
  surfaceInset:
    'rounded-xl border border-white/[0.05] bg-scalova-bg/60 p-4 sm:p-[18px]',
  divider: 'border-white/[0.06]',

  /* Typography */
  eyebrow: 'text-[10px] font-semibold uppercase tracking-[0.12em] text-scalova-faint',
  pageTitle:
    'text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-scalova-text sm:text-[2rem] sm:leading-[1.15]',
  pageDesc: 'mt-1 max-w-2xl text-sm leading-[1.6] text-scalova-muted',
  sectionTitle: 'text-base font-semibold leading-snug tracking-[-0.02em] text-scalova-text sm:text-lg',
  sectionDesc: 'mt-0.5 text-xs leading-[1.5] text-scalova-muted',

  /* Panel */
  panelHeader:
    'flex min-h-[60px] items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-[18px]',
  panelBody: 'p-5 sm:p-6',
  panelBodyTight: 'p-4 sm:p-5',
  panelList: 'flex flex-col gap-3',
  panelLink:
    'inline-flex items-center gap-1 text-xs font-medium text-scalova-accent-light transition hover:text-scalova-accent hover:underline',

  /* Lists & tables */
  listDivide: 'divide-y divide-white/[0.05]',
  listItem: 'flex gap-4 py-4',
  tableCell: 'px-5 py-3.5',
  tableCellY: 'py-4',

  /* Controls */
  input:
    'w-full rounded-xl border border-white/[0.08] bg-scalova-bg/80 px-3.5 py-2.5 text-sm leading-none text-scalova-text outline-none transition placeholder:text-scalova-faint focus:border-scalova-accent-light/40 focus:ring-2 focus:ring-scalova-accent/15',
  search:
    'min-w-0 flex-1 border-0 bg-transparent text-sm leading-none text-scalova-text outline-none placeholder:text-scalova-faint',
  select:
    'w-full rounded-xl border border-white/[0.08] bg-scalova-bg/80 px-3.5 py-2.5 text-sm leading-none text-scalova-text outline-none focus:border-scalova-accent-light/40 focus:ring-2 focus:ring-scalova-accent/15',

  btnPrimary:
    'inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-scalova-accent-light px-4 text-xs font-semibold leading-none text-scalova-accent-deep shadow-[0_0_20px_rgba(86,197,254,0.2)] transition hover:brightness-110 active:scale-[0.98]',
  btnSecondary:
    'inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-xs font-medium leading-none text-scalova-text transition hover:border-white/[0.12] hover:bg-white/[0.05] active:scale-[0.98]',
  btnGhost:
    'inline-flex h-8 items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-medium leading-none text-scalova-muted transition hover:bg-white/[0.04] hover:text-scalova-text',

  filterTrigger:
    'inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-scalova-bg/50 px-3.5 text-xs font-medium leading-none text-scalova-text transition hover:border-white/[0.12] hover:bg-white/[0.04]',

  /* Shell */
  contentPad: 'px-5 py-6 sm:px-6 sm:py-7 lg:px-8',
  headerH: 'h-[4.25rem] shrink-0',
  sidebarW: 'w-[260px]',

  /* Nav */
  navWrap: 'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2.5',
  navItem:
    'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium leading-none text-scalova-muted transition',
  navItemActive:
    'bg-scalova-accent/[0.12] text-scalova-accent-light shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',

  /* Metric */
  metricCard:
    'group relative flex min-h-[132px] flex-col justify-between gap-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-scalova-deep/70 p-5 backdrop-blur-xl transition hover:border-white/[0.1]',
  metricValue: 'text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-scalova-text',
  metricLabel: 'text-[11px] font-semibold uppercase tracking-[0.08em] text-scalova-faint',
  iconBox:
    'flex size-9 shrink-0 items-center justify-center rounded-xl bg-scalova-accent/10 ring-1 ring-scalova-accent-light/20',

  /* Table */
  tableWrap:
    'overflow-hidden rounded-2xl border border-white/[0.06] bg-scalova-deep/70 backdrop-blur-xl',
  tableHead:
    'border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.08em] text-scalova-faint',
  tableRow: 'border-t border-white/[0.04] transition hover:bg-white/[0.02]',

  badge:
    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.06em]',
} as const;
