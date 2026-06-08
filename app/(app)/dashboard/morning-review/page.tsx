'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  IconCheck,
  IconChevronRight,
  IconFileText,
  IconThumbDown,
  IconX,
} from '@tabler/icons-react';
import { PageHeader } from '@/components/app/page-header';
import { EmptyState, StatusBadge, dash } from '@/components/app/dashboard-ui';
import { APP_ROUTES } from '@/lib/app-routes';
import {
  MORNING_REVIEW_INBOX,
  type MorningReviewInboxItem,
  type ReviewStatus,
} from '@/lib/morning-review-data';
import { cn } from '@/lib/utils';

const STATUS_TONE: Record<ReviewStatus, 'accent' | 'danger'> = {
  needs_review: 'accent',
  critical: 'danger',
};

const STATUS_LABEL: Record<ReviewStatus, string> = {
  needs_review: 'Needs review',
  critical: 'Critical',
};

function scoreTone(score: number) {
  if (score >= 85) return 'text-scalova-green';
  if (score >= 70) return 'text-scalova-amber';
  return 'text-scalova-danger';
}

function InboxRow({
  item,
  selected,
  onSelect,
}: {
  item: MorningReviewInboxItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full flex-col gap-2.5 border-b border-white/[0.04] px-5 py-4 text-left transition',
        selected ? 'bg-scalova-accent/[0.08]' : 'hover:bg-white/[0.03]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <StatusBadge label={STATUS_LABEL[item.status]} tone={STATUS_TONE[item.status]} />
        <span className="text-[10px] tabular-nums text-scalova-faint">{item.timeAgo} ago</span>
      </div>
      <p className="text-sm font-semibold leading-snug">{item.title}</p>
      <p className="line-clamp-2 text-xs leading-relaxed text-scalova-muted">{item.excerpt}</p>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-scalova-faint">{item.twin}</span>
        <span className={cn('font-semibold tabular-nums', scoreTone(item.score))}>{item.score}</span>
      </div>
    </button>
  );
}

export default function MorningReviewPage() {
  const [selectedId, setSelectedId] = useState(MORNING_REVIEW_INBOX[0]?.id ?? '');
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const pending = useMemo(
    () => MORNING_REVIEW_INBOX.filter((item) => !reviewedIds.has(item.id)),
    [reviewedIds]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.twin.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q)
    );
  }, [pending, search]);

  const selected =
    filtered.find((item) => item.id === selectedId) ??
    pending.find((item) => item.id === selectedId) ??
    filtered[0] ??
    pending[0];

  const markReviewed = (id: string) => {
    setReviewedIds((prev) => new Set(prev).add(id));
    const next = pending.find((item) => item.id !== id);
    if (next) setSelectedId(next.id);
  };

  return (
    <div className={dash.pageShell}>
      <PageHeader
        eyebrow="Review"
        title="Morning Review"
        description="Approve or refine deliverables your twins completed overnight."
        actions={
          <Link href={APP_ROUTES.workQueue} className={dash.btnSecondary}>
            Work Queue
            <IconChevronRight size={12} />
          </Link>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-scalova-muted">
          <span className="font-semibold text-scalova-text">{pending.length}</span> awaiting review
          {reviewedIds.size > 0 ? (
            <span className="text-scalova-faint"> · {reviewedIds.size} done this session</span>
          ) : null}
        </p>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter inbox..."
          className={cn(dash.input, 'max-w-xs')}
        />
      </div>

      {pending.length === 0 ? (
        <EmptyState
          title="All caught up"
          description="No deliverables need review. Check back after the next overnight run."
          action={
            <Link href={APP_ROUTES.dashboard} className={dash.btnPrimary}>
              Back to Dashboard
            </Link>
          }
        />
      ) : (
        <div
          className={cn(
            dash.surface,
            'grid min-h-[min(560px,70vh)] grid-cols-1 overflow-hidden lg:grid-cols-[minmax(300px,340px)_1fr]'
          )}
        >
          <div className="flex max-h-[70vh] flex-col overflow-y-auto border-b border-white/[0.06] lg:max-h-none lg:border-b-0 lg:border-r">
            {filtered.length === 0 ? (
              <p className="p-6 text-sm text-scalova-muted">No items match your search.</p>
            ) : (
              filtered.map((item) => (
                <InboxRow
                  key={item.id}
                  item={item}
                  selected={selected?.id === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))
            )}
          </div>

          {selected ? (
            <div className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-scalova-faint">
                    <span>{selected.breadcrumb[0]}</span>
                    <IconChevronRight size={10} stroke={2} />
                    <span>{selected.breadcrumb[1]}</span>
                    <span>·</span>
                    <span>{selected.model}</span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">{selected.title}</h2>
                  <p className="mt-1 text-xs text-scalova-muted">
                    {selected.twin} · Score{' '}
                    <span className={cn('font-semibold', scoreTone(selected.score))}>
                      {selected.score}
                    </span>
                  </p>
                </div>
                {selected.status === 'critical' ? (
                  <StatusBadge label="Low confidence" tone="danger" />
                ) : null}
              </div>

              <div className="grid grid-cols-3 gap-4 border-b border-white/[0.06] px-6 py-4">
                {(
                  [
                    ['Elapsed', selected.stats.elapsed],
                    ['Tokens', selected.stats.tokens],
                    ['Cost', selected.stats.cost],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-center">
                    <p className={dash.eyebrow}>{label}</p>
                    <p className="mt-1 text-sm font-medium tabular-nums">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
                <div>
                  <h3 className={dash.eyebrow}>Twin summary</h3>
                  <p className="mt-2 text-sm leading-relaxed text-scalova-text">{selected.summary}</p>
                </div>
                <div className={cn(dash.surfaceInset, 'p-4')}>
                  <div className="mb-2 flex items-center gap-2 text-scalova-muted">
                    <IconFileText size={14} stroke={1.75} />
                    <span className="text-xs font-medium">{selected.previewFile}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-scalova-muted">{selected.excerpt}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 border-t border-white/[0.06] px-6 py-4">
                <button type="button" onClick={() => markReviewed(selected.id)} className={dash.btnPrimary}>
                  <IconCheck size={14} stroke={2} />
                  Approve
                </button>
                <button type="button" onClick={() => markReviewed(selected.id)} className={dash.btnSecondary}>
                  <IconThumbDown size={14} stroke={1.75} />
                  Request changes
                </button>
                <button
                  type="button"
                  onClick={() => markReviewed(selected.id)}
                  className={cn(dash.btnGhost, 'sm:ml-auto')}
                  aria-label="Skip for now"
                >
                  <IconX size={14} stroke={1.75} />
                  Skip
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
