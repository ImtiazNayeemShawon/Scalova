'use client';

import { useState, useEffect } from 'react';
import { Icon } from './primitives/icon';
import { StatusDot } from './primitives/logo';
import { Reveal } from './primitives/reveal';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const HeroOrchestration = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const lanes = [
    {
      name: 'Maya · Strategy',
      role: 'Twin',
      task: 'Q3 board deck',
      state: 'running',
      progress: 0.78,
      asset: 'deck',
    },
    {
      name: 'Daniel · Finance',
      role: 'Twin',
      task: 'Revenue cohort dashboard',
      state: 'running',
      progress: 0.41,
      asset: 'chart',
    },
    { name: 'Priya · Legal', role: 'Twin', task: 'MSA redlines · 14 clauses', state: 'queued', progress: 0.0, asset: 'doc' },
    { name: 'Owen · Design', role: 'Twin', task: 'Brand site / pricing', state: 'review', progress: 1.0, asset: 'globe' },
    { name: 'Jules · Ops', role: 'Twin', task: 'SOC2 evidence run', state: 'running', progress: 0.62, asset: 'shield' },
    { name: 'Jules · Ops', role: 'Twin', task: 'SOC2 evidence run', state: 'running', progress: 0.62, asset: 'shield' },
    { name: 'Jules · Ops', role: 'Twin', task: 'SOC2 evidence run', state: 'running', progress: 0.62, asset: 'shield' },
    { name: 'Jules · Ops', role: 'Twin', task: 'SOC2 evidence run', state: 'running', progress: 0.62, asset: 'shield' },

  ];

  return (
    <div className="hero-orch card-glass" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="row between center" style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <div className="row center gap-3">
          <span className="mono tiny" style={{ color: 'var(--text-3)' }}>
            scalova.os
          </span>
          <span style={{ width: 1, height: 12, background: 'var(--line-2)' }}></span>
          <span className="mono tiny">orchestrator / overnight-run #2841</span>
        </div>
        <div className="row center gap-3">
          <span className="chip">
            <span className="dot pulse"></span>
            <span>5 twins active</span>
          </span>
          <span className="chip" style={{ color: 'var(--text-3)' }}>
            <Icon name="clock" size={11} />
            <span style={{ marginLeft: 4 }}>02:47 AM · local</span>
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 18px 6px' }}>
        <div className="row" style={{ gap: 12, color: 'var(--text-4)' }}>
          <div className="mono tiny" style={{ width: 200 }}>
            EMPLOYEE
          </div>
          <div className="mono tiny" style={{ width: 80 }}>
            STATE
          </div>
          <div className="mono tiny" style={{ flex: 1 }}>
            CURRENT DELIVERABLE
          </div>
          <div className="mono tiny" style={{ width: 110, textAlign: 'right' }}>
            PROGRESS
          </div>
        </div>
      </div>

      <div className="col" style={{ padding: '0 18px 14px', gap: 6 }}>
        {lanes.map((l, i) => (
          <HeroLane key={i} lane={l} idx={i} tick={tick} animationDelay={i * 50} />
        ))}
      </div>

      <div className="row between center" style={{ padding: '12px 18px', borderTop: '1px solid var(--line)', background: 'rgba(255,255,255,0.015)' }}>
        <div className="row center gap-6 mono tiny">
          <span>
            <span style={{ color: 'var(--text-3)' }}>queue</span>{' '}
            <span style={{ color: 'var(--text)' }}>13</span>
          </span>
          <span>
            <span style={{ color: 'var(--text-3)' }}>complete</span>{' '}
            <span style={{ color: 'var(--green)' }}>27</span>
          </span>
          <span>
            <span style={{ color: 'var(--text-3)' }}>waiting on review</span>{' '}
            <span style={{ color: 'var(--warm)' }}>4</span>
          </span>
          <span>
            <span style={{ color: 'var(--text-3)' }}>est. ready</span>{' '}
            <span style={{ color: 'var(--text)' }}>07:48 AM</span>
          </span>
        </div>
        <div className="row center gap-2">
          <span className="shimmer-line" style={{ width: 60, height: 1, opacity: 0.6 }}></span>
          <span className="mono tiny accent">orchestrating</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: -80,
          top: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, oklch(0.7 0.18 240 / 0.35), transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
};

const HeroLane = ({
  lane,
  idx,
  tick,
  animationDelay = 0,
}: {
  lane: (typeof lanes)[0];
  idx: number;
  tick: number;
  animationDelay?: number;
}) => {
  const drift = (Math.sin((tick + idx) * 0.7) + 1) / 2;
  let prog = lane.progress;
  if (lane.state === 'running') prog = Math.min(1, lane.progress + drift * 0.04);

  const stateMetaMap: Record<string, { color: string; label: string; dot: string }> = {
    running: { color: 'var(--accent)', label: 'running', dot: 'accent' },
    queued: { color: 'var(--text-3)', label: 'queued', dot: 'muted' },
    review: { color: 'var(--warm)', label: 'review', dot: 'warm' },
    done: { color: 'var(--green)', label: 'done', dot: 'green' },
  };
  const stateMeta = stateMetaMap[lane.state] || stateMetaMap['done'];

  const Avatar = ({ name }: { name: string }) => {
    const initials = name
      .split(' · ')[0]
      .split(' ')
      .map((s) => s[0])
      .slice(0, 2)
      .join('');
    const hueMap: Record<string, number> = {
      M: 220,
      D: 200,
      P: 260,
      O: 180,
      J: 240,
      A: 280,
      K: 160,
    };
    const h = hueMap[initials[0]] || 230;

    return (
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `linear-gradient(135deg, oklch(0.45 0.12 ${h}), oklch(0.25 0.06 ${h - 30}))`,
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: 0,
        }}
      >
        {initials}
      </span>
    );
  };

  return (
    <div
      className="row center"
      style={{
        gap: 12,
        padding: '10px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid var(--line)',
        animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'backwards',
      }}
    >
      <div className="row center gap-3" style={{ width: 200 }}>
        <Avatar name={lane.name} />
        <div className="col" style={{ gap: 2 }}>
          <div style={{ fontSize: 13, color: 'var(--text)' }}>{lane.name.split(' · ')[0]}</div>
          <div className="mono tiny">{lane.name.split(' · ')[1]} twin</div>
        </div>
      </div>

      <div style={{ width: 80 }}>
        <span className="row center gap-2" style={{ fontSize: 12, color: stateMeta.color }}>
          <StatusDot tone={stateMeta.dot} pulse={lane.state === 'running'} />
          <span>{stateMeta.label}</span>
        </span>
      </div>

      <div className="col" style={{ flex: 1, gap: 2 }}>
        <div className="row center gap-2" style={{ fontSize: 13 }}>
          <Icon name={lane.asset as any} size={13} style={{ color: 'var(--text-3)' }} />
          <span style={{ color: 'var(--text)' }}>{lane.task}</span>
        </div>
        <div className="mono tiny">
          {lane.state === 'queued' && 'awaiting → context build'}
          {lane.state === 'running' && 'agents · researcher · writer · reviewer'}
          {lane.state === 'review' && 'ready for morning review · diff +218 / −34'}
        </div>
      </div>

      <div className="col" style={{ width: 110, alignItems: 'flex-end', gap: 4 }}>
        <span className="mono tiny" style={{ color: stateMeta.color }}>
          {Math.round(prog * 100)}%
        </span>
        <div style={{ width: 100, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              width: `${prog * 100}%`,
              height: '100%',
              background: stateMeta.color,
              transition: 'width 1.3s linear',
              boxShadow: lane.state === 'running' ? `0 0 10px ${stateMeta.color}` : 'none',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const lanes: any[] = [];

export const Hero = () => {
  return (
    <section style={{ paddingTop: 'clamp(120px, 14vw, 180px)', paddingBottom: 'clamp(60px, 7vw, 100px)' }}>
      <div className="aurora" aria-hidden></div>
      <div className="container">
        <div className="col gap-6" style={{ alignItems: 'flex-start', maxWidth: 1100 }}>
          {/* <Reveal className="row center gap-2" style={{ display: 'inline-flex' }}>
            <span className="chip">
              <span className="dot pulse"></span>
              <span>Now in private preview · 14 design partners</span>
            </span>
            <span className="chip" style={{ color: 'var(--text-3)' }}>
              Series A · led by Founders Fund
            </span>
          </Reveal> */}

          <Reveal delay={80}>
            <h1 className="display">
              Your second
              <br />
              workforce<span className="accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="body-l" style={{ maxWidth: 620, fontSize: 19 }}>
              Scalova gives every employee a persistent AI twin that learns how they work — and keeps
              producing deliverables overnight while they sleep, focus, or take Friday off.
            </p>
          </Reveal>

          <Reveal delay={240} className="row gap-3 wrap" style={{ marginTop: 8 }}>
            <a className="btn btn-primary">
              Become a design partner
              <Icon name="arrow-right" size={14} />
            </a>
            {/* <a className="btn btn-ghost">
              <Icon name="play" size={11} />
              Watch overnight run · 2 min
            </a> */}
          </Reveal>

          <Reveal
            delay={320}
            className="row center gap-4 wrap"
            style={{ marginTop: 28, color: 'var(--text-4)' }}
          >
            <span className="mono tiny">SOC 2 TYPE II</span>
            <span className="mono tiny">·</span>
            <span className="mono tiny">GDPR · HIPAA-READY</span>
            <span className="mono tiny">·</span>
            <span className="mono tiny">SELF-HOSTED OPTION</span>
            <span className="mono tiny">·</span>
            <span className="mono tiny">HUMAN APPROVAL GATES BY DEFAULT</span>
          </Reveal>

        </div>
      </div>

      <div className="hero-scroll-wrap">
        <ContainerScroll>
          <HeroOrchestration />
        </ContainerScroll>
      </div>
    </section>
  );
};
