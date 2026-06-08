/** Shared Tailwind class strings for app (auth / onboarding / dashboard) UI */
export const tw = {
  page: 'relative z-[1] min-h-screen',
  pageCenter: 'relative z-[1] flex min-h-screen flex-col items-center justify-center px-4 py-[92px]',

  card: 'w-full max-w-[420px] rounded-xl border border-scalova-border bg-scalova-bg p-[33px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
  cardSignup: 'w-full max-w-[420px] overflow-hidden rounded-xl border border-scalova-border-strong p-px shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]',
  cardInner: 'flex flex-col gap-[23px] p-8',

  label: 'text-xs font-medium tracking-[0.24px] text-scalova-muted',
  labelBright: 'text-xs font-medium tracking-[0.24px] text-scalova-text',
  input:
    'w-full rounded-lg border border-scalova-border-strong bg-scalova-input px-[17px] py-[13px] text-sm text-scalova-text outline-none placeholder:text-scalova-muted/50 focus:border-scalova-accent focus:ring-[3px] focus:ring-scalova-accent/15',
  inputIcon: 'pl-[41px]',

  btnPrimary:
    'inline-flex w-full items-center justify-center gap-2 rounded-lg border-0 bg-scalova-accent px-[17px] py-3 text-xs font-medium tracking-[0.24px] text-scalova-accent-dark transition hover:brightness-110 hover:-translate-y-px cursor-pointer',
  btnPrimaryLight:
    'inline-flex items-center justify-center gap-2 rounded-lg border-0 bg-scalova-accent-light px-8 py-3 text-xs font-medium tracking-[0.24px] text-scalova-accent-deep shadow-[0_0_7.5px_rgba(86,197,254,0.2)] transition hover:brightness-105 cursor-pointer',
  btnGhost:
    'inline-flex items-center justify-center rounded-lg border border-scalova-border-strong bg-transparent px-8 py-3 text-xs font-medium tracking-[0.24px] text-scalova-text transition hover:bg-white/[0.04] cursor-pointer',
  btnOutline:
    'inline-flex items-center justify-center rounded border border-scalova-border-strong px-[17px] py-2 text-xs font-medium tracking-[0.24px] text-scalova-text transition hover:bg-white/[0.04] cursor-pointer',
  oauth:
    'flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-scalova-border text-xs font-medium tracking-[0.24px] text-scalova-text transition hover:border-scalova-border-strong hover:bg-white/[0.04] cursor-pointer',
  oauthFilled:
    'flex w-full items-center justify-center gap-3 rounded-lg border border-scalova-border-strong bg-scalova-card px-[17px] py-[11px] text-xs font-medium tracking-[0.24px] text-scalova-text transition hover:bg-white/[0.04] cursor-pointer',

  link: 'text-scalova-accent underline decoration-scalova-accent/30',
  linkSoft: 'font-medium text-scalova-accent-light no-underline hover:underline',

  panel: 'overflow-hidden rounded-2xl border border-white/[0.06] bg-scalova-deep/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl',
  panelHeader:
    'flex items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5',
  panelTitle: 'text-lg font-semibold tracking-[-0.02em] text-scalova-text',
  panelLink:
    'text-xs font-medium text-scalova-accent-light transition hover:text-scalova-accent hover:underline',
} as const;
