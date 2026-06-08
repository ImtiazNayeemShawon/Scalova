'use client';

import { useMemo, useState } from 'react';
import {
  IconChartBar,
  IconCode,
  IconDatabase,
  IconMail,
} from '@tabler/icons-react';
import { FilterDropdown } from '@/components/app/dropdown-menu';
import { PageHeader } from '@/components/app/page-header';
import { ProgressBar, StatusBadge, dash } from '@/components/app/dashboard-ui';
import { cn } from '@/lib/utils';
import { WORK_QUEUE_ITEMS } from '@/lib/work-queue-data';
import type { WorkQueueItem, WorkQueueStatus } from '@/lib/work-queue-data';

const TABLE_GRID =
  'grid grid-cols-[minmax(150px,1.1fr)_minmax(220px,2fr)_minmax(120px,0.9fr)_minmax(140px,1fr)_minmax(96px,0.75fr)_minmax(72px,0.55fr)]';

const STATUS_TONE: Record<WorkQueueStatus, 'accent' | 'muted' | 'green' | 'danger'> = {
  in_progress: 'accent',
  pending: 'muted',
  completed: 'green',
  failed: 'danger',
};

const STATUS_LABEL: Record<WorkQueueStatus, string> = {
  in_progress: 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
};

const PROGRESS_TONE: Record<WorkQueueStatus, 'accent' | 'muted' | 'green' | 'danger'> = {
  in_progress: 'accent',
  pending: 'muted',
  completed: 'green',
  failed: 'danger',
};

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'chart', label: 'Analytics' },
  { value: 'mail', label: 'Email' },
  { value: 'code', label: 'Code' },
  { value: 'database', label: 'Data' },
];

function DeliverableIcon({ type }: { type: WorkQueueItem['icon'] }) {
  const props = { size: 14, stroke: 1.75, className: 'text-scalova-muted' };
  switch (type) {
    case 'chart':
      return <IconChartBar {...props} />;
    case 'mail':
      return <IconMail {...props} />;
    case 'code':
      return <IconCode {...props} />;
    case 'database':
      return <IconDatabase {...props} />;
    default:
      return <IconChartBar {...props} />;
  }
}

function QueueRow({ item }: { item: WorkQueueItem }) {
  const titleLines = item.deliverableLines ?? [item.deliverable];
  const descLines = item.descriptionLines ?? [item.description];
  const timeLines = item.estTimeLines ?? [item.estTime];

  return (
    <div
      className={cn(
        TABLE_GRID,
        dash.tableRow,
        'items-center pl-5',
        item.failed && 'bg-scalova-danger/[0.03]'
      )}
    >
      <div className={cn('flex items-center gap-3 pr-5', dash.tableCellY)}>
        <div
          className={cn(
            'flex h-9 min-w-[32px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-scalova-elevated',
            item.failed && 'border-scalova-danger/30'
          )}
        >
          <DeliverableIcon type={item.icon} />
        </div>
        <div className={cn('text-sm font-medium', item.failed ? 'text-scalova-danger' : 'text-scalova-text')}>
          {titleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="py-4 pl-5 pr-5 text-sm leading-relaxed text-scalova-muted">
        {descLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="px-5 py-4">
        <StatusBadge label={STATUS_LABEL[item.status]} tone={STATUS_TONE[item.status]} />
      </div>

      <div className="flex items-center gap-3 py-4 pl-5 pr-2">
        <ProgressBar value={item.progress} tone={PROGRESS_TONE[item.status]} className="min-w-0 flex-1" />
        <span className="w-9 shrink-0 text-right text-xs tabular-nums text-scalova-faint">{item.progress}%</span>
      </div>

      <div className="py-4 pl-5 pr-5 text-xs font-medium text-scalova-muted">
        {timeLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="py-4 pr-5 text-right text-sm font-medium tabular-nums">{item.cost}</div>
    </div>
  );
}

export default function WorkQueuePage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    return WORK_QUEUE_ITEMS.filter((item) => {
      const statusMatch = statusFilter === 'all' || item.status === statusFilter;
      const typeMatch = typeFilter === 'all' || item.icon === typeFilter;
      return statusMatch && typeMatch;
    });
  }, [statusFilter, typeFilter]);

  return (
    <div className={dash.pageShellWide}>
      <PageHeader
        eyebrow="Operations"
        title="Work Queue"
        description="Monitor and manage active tasks across your digital workforce."
        actions={
          <>
            <FilterDropdown label="Status" value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} />
            <FilterDropdown label="Type" value={typeFilter} options={TYPE_OPTIONS} onChange={setTypeFilter} />
          </>
        }
      />

      <div className={dash.tableWrap}>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className={cn(TABLE_GRID, dash.tableHead)}>
              <div className={dash.tableCell}>Deliverable</div>
              <div className={dash.tableCell}>Task Description</div>
              <div className={dash.tableCell}>Status</div>
              <div className={dash.tableCell}>Progress</div>
              <div className={dash.tableCell}>Est. Time</div>
              <div className={cn(dash.tableCell, 'text-right')}>Cost</div>
            </div>
            <div>
              {filtered.length === 0 ? (
                <p className="px-5 py-12 text-center text-sm text-scalova-muted">No tasks match the selected filters.</p>
              ) : (
                filtered.map((item) => <QueueRow key={item.id} item={item} />)
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="-mt-2 text-xs text-scalova-faint">
        Showing <span className="font-medium text-scalova-muted">{filtered.length}</span> of{' '}
        {WORK_QUEUE_ITEMS.length} tasks
      </p>
    </div>
  );
}
