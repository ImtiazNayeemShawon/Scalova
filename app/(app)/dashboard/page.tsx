'use client';

import Link from 'next/link';
import { IconCalendar, IconChevronRight } from '@tabler/icons-react';
import { ActivityIcon, MetricIcon, TaskOpIcon } from '@/components/app/dashboard-shell';
import {
  IconBox,
  MetricCard,
  PageTitle,
  Panel,
  ProgressBar,
  StatusBadge,
  dash,
} from '@/components/app/dashboard-ui';
import { APP_ROUTES } from '@/lib/app-routes';
import { cn } from '@/lib/utils';
import {
  ACTIVE_OPERATIONS,
  METRICS,
  MORNING_REVIEW,
  RECENT_ACTIVITY,
} from '@/lib/dashboard-data';
import type { TaskStatus } from '@/lib/dashboard-data';

const TASK_STATUS: Record<TaskStatus, { tone: 'warm' | 'accent' | 'muted'; label: string }> = {
  executing: { tone: 'warm', label: 'Executing' },
  review: { tone: 'accent', label: 'In review' },
  planning: { tone: 'muted', label: 'Planning' },
};

const SCORE_TONE = { green: 'green', amber: 'amber' } as const;

export default function DashboardPage() {
  return (
    <div className={dash.pageShell}>
      <PageTitle
        eyebrow="Overview"
        title="System Overview"
        description="Real-time pulse of your digital twin workforce — operations, reviews, and activity."
      />

      <div className={dash.grid}>
        <section className={dash.metricsGrid} aria-label="Key metrics">
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              sub={metric.sub}
              subTone={metric.subTone === 'warm' ? 'warm' : 'muted'}
              highlight={metric.glow}
              icon={<MetricIcon type={metric.icon} />}
            />
          ))}
        </section>

        <div className="col-span-12 flex xl:col-span-8">
          <Panel
            fill
            title="Active Operations"
            description="Tasks currently running across your twins"
            action={
              <Link href={APP_ROUTES.workQueue} className={dash.panelLink}>
                View all
                <IconChevronRight size={12} stroke={2} />
              </Link>
            }
            bodyClassName={dash.panelList}
          >
            {ACTIVE_OPERATIONS.map((task) => {
              const s = TASK_STATUS[task.status];
              return (
                <article
                  key={task.id}
                  className={cn(
                    dash.surfaceInset,
                    'grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <IconBox>
                      <TaskOpIcon type={task.icon} />
                    </IconBox>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug">{task.title}</h3>
                      <p className="mt-1 text-xs leading-snug text-scalova-muted">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 lg:items-end">
                    <StatusBadge label={s.label} tone={s.tone} />
                    <span className="text-[11px] text-scalova-faint">{task.statusDetail}</span>
                  </div>
                </article>
              );
            })}
          </Panel>
        </div>

        <div className="col-span-12 flex xl:col-span-4">
          <Panel
            fill
            title="Morning Review"
            description="3 deliverables need attention"
            icon={<IconCalendar size={16} stroke={1.5} />}
            action={
              <Link href={APP_ROUTES.morningReview} className={dash.panelLink}>
                Open
              </Link>
            }
            bodyClassName={cn(dash.panelList, 'justify-between')}
          >
            <ul className={cn(dash.stackSm, 'flex-1')}>
              {MORNING_REVIEW.map((item) => (
                <li key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-xs font-medium">
                    <span className="truncate">{item.label}</span>
                    <span
                      className={cn(
                        'shrink-0 font-semibold tabular-nums',
                        item.tone === 'green' ? 'text-scalova-green' : 'text-scalova-amber'
                      )}
                    >
                      {item.score}
                    </span>
                  </div>
                  <ProgressBar value={item.fill} tone={SCORE_TONE[item.tone]} />
                </li>
              ))}
            </ul>
            <Link href={APP_ROUTES.morningReview} className={cn(dash.btnSecondary, 'w-full')}>
              Start Review
            </Link>
          </Panel>
        </div>

        <section className={cn(dash.surface, 'col-span-12 overflow-hidden')}>
          <div className={dash.panelHeader}>
            <h2 className={dash.sectionTitle}>Recent Activity</h2>
          </div>
          <ul className={cn(dash.listDivide, 'px-5 sm:px-6')}>
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.id} className={dash.listItem}>
                <IconBox tone={item.iconVariant === 'accent' ? 'accent' : 'elevated'} className="!size-9 !rounded-full">
                  <ActivityIcon type={item.icon} />
                </IconBox>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-[1.55]">
                    {item.message}
                    {item.highlight ? (
                      <span className="font-semibold text-scalova-accent-light">{item.highlight}</span>
                    ) : null}
                    {item.middle}
                    {item.bold ? (
                      <strong className="font-semibold text-scalova-text">{item.bold}</strong>
                    ) : null}
                    {item.suffix}
                  </p>
                  <time className="mt-1.5 block text-[11px] text-scalova-faint">{item.time}</time>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
