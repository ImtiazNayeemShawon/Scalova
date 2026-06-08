'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconCpu, IconLock, IconTerminal2 } from '@tabler/icons-react';
import { AmbientBackground } from '@/components/app/ambient-background';
import { cn } from '@/lib/utils';
import { tw } from '@/lib/app-tw';
import { APP_ROUTES } from '@/lib/app-routes';

const LOG_LINES = [
  { time: '19:45:14.602', msg: '> System initialized. Awaiting data stream...', active: false },
  { time: '19:45:15.225', msg: '> Establishing secure connection to data vault...', active: false },
  { time: '19:45:16.076', msg: '> Fetching user communication archives...', active: true },
  { time: '19:45:17.412', msg: '> Synthesizing style profile from historical data...', active: false },
  { time: '19:45:18.891', msg: '> Calibrating approval thresholds...', active: false },
  { time: '19:45:20.104', msg: '> Digital twin profile ready.', active: false },
];

export default function BootstrapPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(20);
  const [visibleLogs, setVisibleLogs] = useState(3);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return p + 4;
      });
    }, 400);

    const logTimer = setInterval(() => {
      setVisibleLogs((n) => Math.min(n + 1, LOG_LINES.length));
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => router.push(APP_ROUTES.onboarding.ready), 800);
    return () => clearTimeout(t);
  }, [progress, router]);

  return (
    <div className={tw.pageCenter}>
      <AmbientBackground />
      <div className="relative z-[1] w-full max-w-[672px] px-6">
        <div className="flex flex-col gap-8 rounded-xl border border-scalova-border-strong bg-scalova-bg/90 p-[33px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px]">
          <header className="flex flex-col items-center gap-2 text-center">
            <div className="relative mb-4 flex size-16 items-center justify-center rounded-full border border-scalova-border-strong bg-scalova-elevated">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-scalova-accent-light animate-spin" />
              <IconCpu size={22} stroke={1.5} className="relative z-[1] text-scalova-accent-light" />
            </div>
            <h1 className="text-[32px] font-semibold tracking-[-0.64px]">Bootstrapping Your Twin</h1>
            <p className="text-sm leading-[22.4px] text-scalova-muted">
              Scalova AI is ingesting your historical data and synthesizing your unique digital workforce profile.
              This may take a moment.
            </p>
          </header>

          <div className="flex flex-col gap-2 pt-4">
            <div className="flex items-end justify-between">
              <span className="text-xs font-medium uppercase tracking-[1.2px] text-scalova-accent-light">Data retrieval</span>
              <span className="text-xl font-medium">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-scalova-muted-bar">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0a4a7a] via-scalova-accent to-scalova-accent-light shadow-[0_0_5px_rgba(86,197,254,0.5)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-scalova-border-strong bg-scalova-input">
            <div className="flex items-center gap-2 border-b border-scalova-border-strong bg-scalova-elevated px-4 py-2 font-mono text-xs text-scalova-muted">
              <IconTerminal2 size={13} stroke={1.75} />
              System Log output // v2.4.1
            </div>
            <div className="h-[200px] overflow-y-auto p-4 font-mono text-xs">
              {LOG_LINES.slice(0, visibleLogs).map((line) => (
                <div key={line.time} className="mb-1 flex gap-3">
                  <span className="shrink-0 text-scalova-faint/50">[{line.time}]</span>
                  <span className={cn(line.active ? 'text-scalova-accent-light' : 'text-scalova-muted')}>{line.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs font-medium tracking-[0.24px] text-scalova-faint">
          <IconLock size={12} stroke={1.75} />
          End-to-end encrypted synthesis
        </p>
      </div>
    </div>
  );
}
