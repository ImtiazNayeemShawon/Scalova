'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconBolt,
  IconBell,
  IconBrain,
  IconCalendar,
  IconCheck,
  IconClock,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconList,
  IconMenu2,
  IconPlayerPlay,
  IconPlug,
  IconRefresh,
  IconRobot,
  IconSearch,
  IconSettings,
  IconTarget,
  IconThumbUp,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { DropdownItem, DropdownMenu } from '@/components/app/dropdown-menu';
import { dash } from '@/lib/dashboard-ui';
import { cn } from '@/lib/utils';
import { APP_ROUTES } from '@/lib/app-routes';
import { DASHBOARD_NAV } from '@/lib/dashboard-data';

const NAV_ICON_CLASS = 'shrink-0 opacity-90';

const NAV_ICONS: Record<string, ReactNode> = {
  dashboard: <IconLayoutDashboard size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  queue: <IconList size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  review: <IconCalendar size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  twin: <IconRobot size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  integrations: <IconPlug size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  team: <IconUsers size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
  settings: <IconSettings size={18} stroke={1.5} className={NAV_ICON_CLASS} />,
};

const NOTIFICATIONS = [
  { id: '1', title: 'Morning Review ready', body: '4 deliverables need your approval.', href: APP_ROUTES.morningReview },
  { id: '2', title: 'Work Queue update', body: 'API Documentation task failed.', href: APP_ROUTES.workQueue },
  { id: '3', title: 'Integration sync', body: 'Snowflake connection restored.', href: APP_ROUTES.integrations },
] as const;

const DELEGATE_ACTIONS = [
  { label: 'Draft presentation deck', href: APP_ROUTES.workQueue },
  { label: 'Summarize inbox threads', href: APP_ROUTES.workQueue },
  { label: 'Generate API documentation', href: APP_ROUTES.workQueue },
  { label: 'Run data extraction', href: APP_ROUTES.workQueue },
] as const;

function isDashboardNavActive(pathname: string, item: (typeof DASHBOARD_NAV)[number]) {
  if (item.id === 'dashboard') return pathname === '/dashboard';
  if (item.id === 'queue') return pathname.startsWith('/dashboard/work-queue');
  if (item.id === 'review') return pathname.startsWith('/dashboard/morning-review');
  if (item.id === 'twin') return pathname.startsWith('/dashboard/twin-profile');
  if (item.id === 'team') return pathname.startsWith('/dashboard/team');
  if (item.id === 'integrations') return pathname.startsWith('/dashboard/integrations');
  if (item.id === 'settings') return pathname.startsWith('/dashboard/settings');
  return false;
}

function searchPlaceholder(pathname: string) {
  if (pathname.startsWith('/dashboard/work-queue')) return 'Search tasks, agents, or endpoints...';
  if (pathname.startsWith('/dashboard/integrations')) return 'Search connections, logs...';
  if (pathname.startsWith('/dashboard/team')) return 'Search team, twins...';
  if (pathname.startsWith('/dashboard/morning-review')) return 'Search deliverables to review...';
  if (pathname.startsWith('/dashboard/twin-profile')) return 'Search outputs, parameters...';
  if (pathname.startsWith('/dashboard/settings')) return 'Search settings, billing...';
  return 'Search tasks, twins...';
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className={dash.navWrap}>
      {DASHBOARD_NAV.map((item) => {
        const isActive = isDashboardNavActive(pathname, item);
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            className={cn(dash.navItem, isActive && dash.navItemActive)}
            aria-current={isActive ? 'page' : undefined}
          >
            {NAV_ICONS[item.id]}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <Link href={APP_ROUTES.dashboard} className="group flex items-center gap-3">
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-scalova-accent-light to-scalova-accent text-sm font-bold text-scalova-accent-deep shadow-[0_0_24px_rgba(86,197,254,0.35)]">
        S
      </div>
      {!compact ? (
        <div className="min-w-0">
          <div className="text-base font-bold tracking-[-0.02em]">Scalova</div>
          <div className="text-[11px] font-medium text-scalova-faint">AI Workforce</div>
        </div>
      ) : null}
    </Link>
  );
}

export const DashboardShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [delegateOpen, setDelegateOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
    setDelegateOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <div className="relative flex min-h-screen min-h-dvh w-full overflow-hidden bg-scalova-bg text-scalova-text">
      <AmbientBackground variant="grid" />
      <aside
        className={cn(
          'relative z-[2] hidden shrink-0 flex-col border-r border-white/[0.06] bg-scalova-card/80 py-6 backdrop-blur-2xl lg:flex',
          dash.sidebarW
        )}
        aria-label="Main navigation"
      >
        <div className="px-5 pb-5">
          <BrandMark />
        </div>

        <SidebarNav pathname={pathname} />

        <div className="mt-2 px-3 pt-3">
          <button
            type="button"
            onClick={() => setDelegateOpen(true)}
            className={cn(dash.btnPrimary, 'w-full')}
          >
            <IconBolt size={14} stroke={2} className="shrink-0" />
            Quick Delegate
          </button>
        </div>
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative flex h-full w-[min(288px,88vw)] flex-col border-r border-white/[0.06] bg-scalova-card/95 py-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between px-4 pb-5">
              <BrandMark compact />
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="flex size-9 items-center justify-center rounded-xl text-scalova-muted transition hover:bg-white/[0.05] hover:text-scalova-text"
                aria-label="Close navigation"
              >
                <IconX size={18} stroke={1.75} />
              </button>
            </div>
            <SidebarNav pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
            <div className="px-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  setDelegateOpen(true);
                }}
                className={cn(dash.btnPrimary, 'w-full')}
              >
                <IconBolt size={14} stroke={2} />
                Quick Delegate
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {delegateOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delegate-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close delegate dialog"
            onClick={() => setDelegateOpen(false)}
          />
          <div className={cn(dash.surface, 'relative w-full max-w-md overflow-hidden')}>
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div>
                <p className={dash.eyebrow}>Delegate</p>
                <h2 id="delegate-title" className="mt-1 text-base font-semibold">
                  Quick Delegate
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDelegateOpen(false)}
                className="flex size-9 items-center justify-center rounded-xl text-scalova-muted hover:bg-white/[0.05] hover:text-scalova-text"
                aria-label="Close"
              >
                <IconX size={16} stroke={1.75} />
              </button>
            </div>
            <p className="px-6 pt-4 text-xs leading-relaxed text-scalova-muted">
              Choose a task template to add to your work queue.
            </p>
            <ul className="flex flex-col gap-1 p-3">
              {DELEGATE_ACTIONS.map((action) => (
                <li key={action.label}>
                  <button
                    type="button"
                    className="w-full rounded-xl px-4 py-3 text-left text-xs font-medium text-scalova-text transition hover:bg-white/[0.05]"
                    onClick={() => {
                      setDelegateOpen(false);
                      router.push(action.href);
                    }}
                  >
                    {action.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/[0.06] p-4">
              <button
                type="button"
                onClick={() => {
                  setDelegateOpen(false);
                  router.push(APP_ROUTES.workQueue);
                }}
                className={cn(dash.btnPrimary, 'w-full')}
              >
                Open Work Queue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header
          className={cn(
            'z-[2] flex items-center justify-between gap-3 border-b border-white/[0.06] bg-scalova-bg/60 px-5 backdrop-blur-xl sm:gap-4 sm:px-6',
            dash.headerH
          )}
        >
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-scalova-muted transition hover:text-scalova-text lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <IconMenu2 size={18} stroke={1.75} />
            </button>
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
          </div>

          <label className="hidden min-w-0 max-w-md flex-1 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-scalova-deep/60 px-4 py-2.5 backdrop-blur-sm sm:flex">
            <IconSearch size={15} stroke={1.75} className="shrink-0 text-scalova-faint" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder(pathname)}
              aria-label="Search dashboard"
              className={dash.search}
            />
          </label>

          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => setDelegateOpen(true)} className={cn(dash.btnPrimary, 'hidden sm:inline-flex')}>
              <IconBolt size={14} stroke={2} />
              Delegate
            </button>

            <DropdownMenu
              align="right"
              menuClassName="w-80"
              trigger={
                <button
                  type="button"
                  className="relative flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-scalova-muted transition hover:text-scalova-text"
                  aria-label="Notifications"
                >
                  <IconBell size={17} stroke={1.75} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-scalova-accent-light ring-2 ring-scalova-bg" />
                </button>
              }
            >
              <div className="px-4 py-2.5">
                <p className={dash.eyebrow}>Inbox</p>
              </div>
              {NOTIFICATIONS.map((n) => (
                <DropdownItem key={n.id} onSelect={() => router.push(n.href)}>
                  <div>
                    <p className="font-semibold text-scalova-text">{n.title}</p>
                    <p className="mt-0.5 text-[11px] font-normal leading-relaxed text-scalova-muted">
                      {n.body}
                    </p>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>

            <DropdownMenu
              align="right"
              menuClassName="w-56"
              trigger={
                <button
                  type="button"
                  className="size-10 overflow-hidden rounded-xl border border-white/[0.1] bg-scalova-elevated p-0.5 ring-2 ring-transparent transition hover:ring-scalova-accent-light/30"
                  aria-label="Account menu"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/onboarding/ai-core.png"
                    alt=""
                    width={40}
                    height={40}
                    className="size-full rounded-[10px] object-cover"
                  />
                </button>
              }
            >
              <DropdownItem onSelect={() => router.push(APP_ROUTES.twinProfile)}>Twin Profile</DropdownItem>
              <DropdownItem onSelect={() => router.push(APP_ROUTES.settings)}>Settings</DropdownItem>
              <DropdownItem onSelect={() => router.push(APP_ROUTES.team)}>Team</DropdownItem>
              <div className="my-1.5 mx-3 h-px bg-white/[0.06]" />
              <DropdownItem onSelect={() => router.push(APP_ROUTES.login)} destructive>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </header>

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className={dash.contentPad}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const TaskOpIcon = ({ type }: { type: string }) => {
  const cls = 'text-scalova-accent-light';
  switch (type) {
    case 'refresh':
      return <IconRefresh size={16} stroke={1.75} className={cls} />;
    case 'deck':
      return <IconPlayerPlay size={18} stroke={1.75} className={cls} />;
    case 'brain':
      return <IconBrain size={18} stroke={1.75} className={cls} />;
    default:
      return <IconRefresh size={16} stroke={1.75} className={cls} />;
  }
};

export const MetricIcon = ({ type }: { type: string }) => {
  const props = { size: 17, stroke: 1.5, className: 'text-scalova-accent-light' };
  switch (type) {
    case 'check':
      return <IconCheck {...props} />;
    case 'thumb':
      return <IconThumbUp {...props} />;
    case 'clock':
      return <IconClock {...props} />;
    case 'grid':
      return <IconLayoutGrid {...props} />;
    default:
      return <IconCheck {...props} />;
  }
};

export const ActivityIcon = ({ type }: { type: string }) => {
  const props = { size: 11, stroke: 2, className: 'text-scalova-accent-light' };
  switch (type) {
    case 'check':
      return <IconCheck {...props} />;
    case 'target':
      return <IconTarget {...props} />;
    case 'plus':
      return <span className="text-sm font-semibold text-scalova-accent-light">+</span>;
    default:
      return <IconCheck {...props} />;
  }
};
