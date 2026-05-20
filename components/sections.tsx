'use client';

import { useState, type ReactNode } from 'react';
import { Link } from 'react-scroll';
import { IntegrationsOrbit } from './integrations-orbit';
import { SectionIcon } from './primitives/section-icon';
import { StatusDot, Logo } from './primitives/logo';
import { Reveal, SectionLabel } from './primitives/reveal';
import { CALENDLY_URL } from '@/lib/site';

const SCROLL_OFFSET = -80;

// Logo Cloud
export const LogoCloud = () => {
  const partners = [
    { name: 'ATLAS·CO' },
    { name: 'NORTHWIND' },
    { name: 'Halcyon', style: { fontStyle: 'italic', fontFamily: 'serif' } },
    { name: 'MERIDIAN' },
    { name: '▲ Vector Labs' },
    { name: 'PARALLAX' },
    { name: 'CALYX' },
    { name: 'Brightway', style: { fontFamily: 'serif' } },
  ];

  return (
    <section id="customers" style={{ paddingTop: 32, paddingBottom: 48 }}>
      <div className="container">
        <div className="col gap-6 center" style={{ alignItems: 'center' }}>
          <span className="mono tiny" style={{ color: 'var(--text-4)' }}>
            DESIGN PARTNERS · 14 ENTERPRISES · 4 FORTUNE 500
          </span>
          <div
            className="row wrap center"
            style={{
              gap: 'clamp(28px, 5vw, 64px)',
              justifyContent: 'center',
              opacity: 0.55,
            }}
          >
            {partners.map((p, i) => (
              <span
                key={i}
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: 'var(--text-2)',
                  ...((p as any).style || {}),
                }}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Comparison
export const Comparison = () => {
  const rows = [
    { axis: 'Trigger', copilot: 'Waits for a prompt.', twin: 'Runs against an outcome.' },
    {
      axis: 'Synchronicity',
      copilot: 'Synchronous · you in the loop.',
      twin: 'Asynchronous · executes overnight.',
    },
    {
      axis: 'Memory',
      copilot: 'Forgets between sessions.',
      twin: 'Persistent model of how you work.',
    },
    {
      axis: 'Output',
      copilot: 'Suggests text and snippets.',
      twin: 'Ships full deliverables for review.',
    },
    {
      axis: 'Ownership',
      copilot: 'You own the work.',
      twin: 'Twin drafts · you approve · audit logs everything.',
    },
    {
      axis: 'Scope',
      copilot: 'One conversation at a time.',
      twin: 'A full queue, coordinated by an orchestrator.',
    },
  ];

  return (
    <section id="twins">
      <div className="container">
        <SectionLabel
          kicker="THE COPILOT CEILING"
          title={
            <>
              Copilots assist.{' '}
              <span style={{ color: 'var(--text-3)' }}>Twins </span>
              <span style={{ color: 'var(--text)' }}>execute</span>
              <span style={{ color: 'var(--text-3)' }}>.</span>
            </>
          }
          sub="Most teams hit a wall the same way: copilots are great for the next sentence, useless for next week. Your work doesn't shrink to a chat window."
        />

        <Reveal className="card-glass" style={{ overflow: 'hidden' }}>
          <div className="row" style={{ borderBottom: '1px solid var(--line)' }}>
            <div style={{ flex: '0 0 200px', padding: '20px 22px' }} className="mono tiny">
              VECTOR
            </div>
            <div style={{ flex: 1, padding: '20px 22px', borderLeft: '1px solid var(--line)' }}>
              <div className="row center gap-2">
                <SectionIcon name="command" size={14} style={{ color: 'var(--text-3)' }} />
                <span style={{ fontSize: 14, color: 'var(--text-3)' }}>Copilot · reactive</span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: '20px 22px',
                borderLeft: '1px solid var(--line)',
                background: 'linear-gradient(180deg, var(--accent-bg), transparent)',
              }}
            >
              <div className="row center gap-2">
                <SectionIcon name="fingerprint" size={14} className="accent" />
                <span style={{ fontSize: 14, color: 'var(--text)' }}>Scalova twin · autonomous</span>
              </div>
            </div>
          </div>

          {rows.map((r, i) => (
            <div
              key={i}
              className="row"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none' }}
            >
              <div style={{ flex: '0 0 200px', padding: '18px 22px' }} className="mono tiny">
                <span style={{ color: 'var(--text-4)' }}>0{i + 1}</span>
                <span style={{ marginLeft: 12, color: 'var(--text-2)' }}>{r.axis.toUpperCase()}</span>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '18px 22px',
                  borderLeft: '1px solid var(--line)',
                  color: 'var(--text-3)',
                  fontSize: 15,
                }}
              >
                <SectionIcon name="x" size={12} style={{ color: 'var(--text-4)', marginRight: 8, verticalAlign: '-1px' }} />
                {r.copilot}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '18px 22px',
                  borderLeft: '1px solid var(--line)',
                  color: 'var(--text)',
                  fontSize: 15,
                }}
              >
                <SectionIcon name="check" size={12} className="accent" style={{ marginRight: 8, verticalAlign: '-1px' }} />
                {r.twin}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className="row between wrap" style={{ marginTop: 28, gap: 16 }}>
          <p className="small" style={{ maxWidth: 560 }}>
            The shift is structural. When work is owned by an autonomous agent with persistent context,
            the team's capacity stops being indexed to attention.
          </p>
          <Link
            to="governance"
            smooth
            offset={SCROLL_OFFSET}
            duration={500}
            href="#governance"
            className="btn btn-ghost"
          >
            Read the architecture brief
            <SectionIcon name="arrow-up-right" size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

// Timeline
export const Timeline = () => {
  const beats = [
    {
      time: '6:00 PM',
      local: 'Mon',
      title: 'Maya delegates the Q3 board deck.',
      body: 'Selects sources · attaches last quarter\'s deck · sets review window for Tuesday 9 AM. Twin acknowledges in 4 seconds.',
      actors: ['Maya'],
    },
    {
      time: '8:42 PM',
      local: 'Mon',
      title: 'Twin builds the working set.',
      body: 'Pulls Looker, Salesforce, Notion, last 6 board minutes, finance close. 218 sources indexed into the run.',
      actors: ['Strategy twin', 'Researcher agent'],
    },
    {
      time: '11:14 PM',
      local: 'Mon',
      title: 'Coordinator splits the brief into 7 lanes.',
      body: 'Narrative · numbers · risk · roadmap · competitive · appendix · talking points. Each lane gets a sub-agent and a budget.',
      actors: ['Orchestrator'],
    },
    {
      time: '2:07 AM',
      local: 'Tue',
      title: 'Cohort dashboard regenerates.',
      body: 'Daniel\'s finance twin rebuilds the cohort waterfall after detecting a schema change in the upstream model. Logged.',
      actors: ['Finance twin'],
    },
    {
      time: '4:31 AM',
      local: 'Tue',
      title: 'Deliverables roll up to review.',
      body: '32-slide deck · 14-page narrative · 3 dashboards · 1 risk register. Each with provenance and diff.',
      actors: ['Reviewer agent'],
    },
    {
      time: '6:55 AM',
      local: 'Tue',
      title: 'Inbox is staged.',
      body: 'Twin writes a 90-second briefing audio. Highlights three places where Maya\'s voice is needed. Nothing ships without her.',
      actors: ['Strategy twin'],
    },
    {
      time: '9:08 AM',
      local: 'Tue',
      title: 'Maya approves, edits 11 slides, ships.',
      body: 'She rejects two slides and accepts one with a verbal note. Twin learns. Audit log captures every diff.',
      actors: ['Maya'],
    },
  ];

  return (
    <section>
      <div className="container">
        <SectionLabel
          kicker="OVERNIGHT EXECUTION"
          title={
            <>
              While the office is dark,
              <br />
              the work doesn't stop<span className="accent">.</span>
            </>
          }
          sub="A single overnight run, end-to-end. Real timestamps from a design partner's Tuesday morning. Names and metrics changed."
        />

        <div className="timeline">
          <div className="timeline-band">
            <div className="timeline-band-track">
              {['6PM', '8PM', '10PM', '12AM', '2AM', '4AM', '6AM', '8AM', '10AM'].map((t, i) => (
                <div key={i} className="timeline-tick">
                  <div className="timeline-tick-line"></div>
                  <span className="mono tiny" style={{ color: 'var(--text-4)' }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <div className="timeline-sun"></div>
          </div>

          <Reveal>
            <div className="timeline-rail">
              <div className="timeline-line"></div>
              {beats.map((b, i) => (
                <div key={i} className="timeline-beat" style={{ ['--beat-i' as string]: i }}>
                  <div className="timeline-beat-mark"></div>
                  <div className="timeline-beat-content">
                    <div className="timeline-beat-time">
                      {b.time} · {b.local}
                    </div>
                    <div className="timeline-beat-title">{b.title}</div>
                    <div className="timeline-beat-body">{b.body}</div>
                    <div className="timeline-beat-actors">
                      {b.actors.map((a, j) => (
                        <span key={j} className="timeline-actor-badge">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Morning Inbox
export const MorningInbox = () => {
  const [selected, setSelected] = useState(0);

  const items = [
    {
      id: 0,
      from: 'Strategy Twin',
      title: 'Q3 board deck',
      subtitle: '32 slides · +3847 words',
      status: 'ready',
      timestamp: '2:47 AM',
      diff: '+218 / −34',
      checkpoints: ['Narrative', 'Numbers', 'Risk', 'Appendix'],
    },
    {
      id: 1,
      from: 'Finance Twin',
      title: 'Revenue cohort dashboard',
      subtitle: '3 dashboards · 14 charts',
      status: 'ready',
      timestamp: '2:31 AM',
      diff: '+92 / −8',
      checkpoints: ['Data freshness', 'Formulas', 'Viz calibration'],
    },
    {
      id: 2,
      from: 'Design Twin',
      title: 'Brand site redesign',
      subtitle: 'Figma file · 24 components',
      status: 'ready',
      timestamp: '1:14 AM',
      diff: '+1204 / −567',
      checkpoints: ['Desktop', 'Mobile', 'Transitions'],
    },
  ];

  const selected_item = items[selected];

  return (
    <section>
      <div className="container">
        <SectionLabel
          kicker="MORNING REVIEW"
          title={
            <>
              The signature feature:
              <br />
              PR-style approval<span className="accent">.</span>
            </>
          }
          sub="Every overnight deliverable flows through a unified review inbox. Diff, approve, edit, or reject — with full provenance and audit trails."
        />

        <Reveal>
          <div className="inbox-container">
            <div className="inbox-queue">
              <div className="mono tiny" style={{ color: 'var(--text-3)', marginBottom: 16 }}>
                READY FOR REVIEW
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`inbox-item ${selected === item.id ? 'active' : ''}`}
                  onClick={() => setSelected(item.id)}
                >
                  <div className="row between center" style={{ marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>
                        {item.title}
                      </div>
                      <div className="mono tiny" style={{ color: 'var(--text-4)' }}>
                        {item.from}
                      </div>
                    </div>
                    <StatusDot tone="green" />
                  </div>
                  <div className="row between" style={{ fontSize: 11, color: 'var(--text-3)' }}>
                    <span>{item.subtitle}</span>
                    <span className="mono">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="inbox-detail">
              <div className="mono tiny" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
                {selected_item.from.toUpperCase()} · {selected_item.timestamp}
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 className="h3" style={{ marginBottom: 8 }}>
                  {selected_item.title}
                </h3>
                <div className="row gap-3 wrap">
                  <span className="chip">
                    <SectionIcon name="check" size={11} style={{ color: 'var(--green)' }} />
                    <span>All checkpoints passed</span>
                  </span>
                  <span className="chip">
                    <span className="mono tiny" style={{ color: 'var(--text-3)' }}>
                      diff {selected_item.diff}
                    </span>
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                  border: '1px solid var(--line)',
                }}
              >
                <div className="mono tiny" style={{ color: 'var(--text-4)', marginBottom: 12 }}>
                  AUTOMATED CHECKS
                </div>
                <div className="col gap-2">
                  {selected_item.checkpoints.map((c, i) => (
                    <div key={i} className="row center gap-2" style={{ fontSize: 13 }}>
                      <SectionIcon name="check" size={12} className="accent" />
                      <span style={{ color: 'var(--text-2)' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row gap-2 wrap">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book a demo
                  <SectionIcon name="arrow-right" size={12} />
                </a>
                <span className="btn btn-ghost demo-pill" aria-hidden>
                  Approve · Edit · Reject
                </span>
              </div>
              <p className="mono tiny" style={{ color: 'var(--text-4)', marginTop: 12 }}>
                Interactive preview — approval workflow ships in private preview.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// Deliverables
export const Deliverables = () => {
  const items = [
    {
      type: 'Decks',
      icon: 'deck',
      count: 'Avg 28 slides',
      desc: 'Board, sales, internal. With diagrams, charts, and speaker notes.',
      featured: true,
    },
    {
      type: 'Dashboards',
      icon: 'chart',
      count: 'Live · refreshed',
      desc: 'Built from your warehouse. Twin maintains them as schemas drift.',
    },
    {
      type: 'Reports',
      icon: 'logs',
      count: '20–60 pages',
      desc: 'Narrative + appendix. Inline citations to every claim.',
    },
    {
      type: 'Legal docs',
      icon: 'scale',
      count: 'MSAs · NDAs · DPAs',
      desc: 'Redlines, fallback positions, risk-flagged clauses.',
    },
    {
      type: 'Websites',
      icon: 'globe',
      count: 'Landing · pricing',
      desc: 'From brand brief to staged URL. Reviewable in browser.',
    },
    {
      type: 'Designs',
      icon: 'image',
      count: 'Figma-native',
      desc: 'Components, screens, mocks. Respects your design system.',
    },
    {
      type: 'Spreadsheets',
      icon: 'table',
      count: 'Models · trackers',
      desc: 'Multi-tab models with formulas and notes.',
    },
    {
      type: 'Marketing',
      icon: 'spark',
      count: 'Briefs · drafts',
      desc: 'On-brand. Voice-of-customer pulled from CRM transcripts.',
    },
    {
      type: 'Videos',
      icon: 'video',
      count: 'Up to 6 min',
      desc: 'Talking-head + b-roll. Twin can use your voice clone, gated.',
    },
  ];

  return (
    <section>
      <div className="container">
        <SectionLabel
          kicker="DELIVERABLE TYPES"
          title={
            <>
              The output isn't text.
              <br />
              It's the thing<span className="accent">.</span>
            </>
          }
          sub="Scalova twins ship the artefact your team would have built — not a summary of one."
        />

        <Reveal>
          <div className="del-grid">
            {items.map((it, i) => (
              <DeliverableCard key={i} item={it} idx={i} delay={i * 0.06} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const DeliverableCard = ({ item, idx, delay = 0 }: { item: any; idx: number; delay?: number }) => {
  return (
    <div
      className={`del-card ${item.featured ? 'featured' : ''} scale-in`}
      style={{ ['--stagger' as string]: delay }}
    >
      <div className="row between center" style={{ width: '100%' }}>
        <div className="row center gap-3">
          <span
            className="row center"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--line)',
            }}
          >
            <SectionIcon name={item.icon} size={15} />
          </span>
          <div className="col" style={{ gap: 2 }}>
            <div style={{ fontSize: 16, color: 'var(--text)' }}>{item.type}</div>
            <div className="mono tiny">{item.count}</div>
          </div>
        </div>
        <span className="mono tiny" style={{ color: 'var(--text-4)' }}>
          0{idx + 1}
        </span>
      </div>

      {item.featured && <DeckPreview />}
      {!item.featured && (
        <div className="del-preview" style={{ minHeight: 90 }}>
          <DeliverableMini type={item.icon} />
        </div>
      )}

      <div className="small" style={{ color: 'var(--text-2)', maxWidth: item.featured ? 420 : '100%' }}>
        {item.desc}
      </div>
    </div>
  );
};

const DeckPreview = () => (
  <div className="del-preview" style={{ display: 'flex', padding: 16, gap: 10, alignItems: 'stretch' }}>
    {[
      { title: 'Q3 results', text: 'Strong renewals, soft expansion.' },
      { title: 'Cohort detail', chart: true },
      { title: 'Risk register' },
    ].map((s, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          background: 'rgba(15,16,20,0.85)',
          border: '1px solid var(--line)',
          borderRadius: 6,
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minWidth: 0,
        }}
      >
        <div className="mono tiny" style={{ color: 'var(--text-4)' }}>
          SLIDE 0{i + 7}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text)', letterSpacing: '-0.01em' }}>{s.title}</div>
        {s.text && (
          <div className="tiny" style={{ color: 'var(--text-3)' }}>
            {s.text}
          </div>
        )}
        {s.chart && (
          <svg viewBox="0 0 80 30" style={{ width: '100%', height: 30 }}>
            <polyline fill="none" stroke="var(--accent)" strokeWidth="1.2" points="2,24 14,18 26,20 38,12 50,14 62,7 78,9" />
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              points="2,26 14,22 26,24 38,18 50,20 62,15 78,18"
            />
          </svg>
        )}
        <div style={{ flex: 1 }}></div>
        <div style={{ height: 1, background: 'var(--line)' }}></div>
        <div className="row between mono tiny">
          <span style={{ color: 'var(--text-4)' }}>scalova</span>
          <span style={{ color: 'var(--text-4)' }}>{i + 7}/32</span>
        </div>
      </div>
    ))}
  </div>
);

const DeliverableMini = ({ type }: { type: string }) => {
  switch (type) {
    case 'chart':
      return (
        <div style={{ padding: 12, height: '100%', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          {[42, 28, 56, 38, 64, 30, 70, 48, 80, 52, 88, 60].map((h, i) => (
            <div
              key={i}
              className="del-bar"
              style={{
                flex: 1,
                height: `${h}%`,
                background: i === 11 ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
                borderRadius: 1,
                ['--bar-i' as string]: i,
              }}
            />
          ))}
        </div>
      );
    case 'logs':
      return (
        <div style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[100, 70, 86, 60, 92, 76, 84].map((w, i) => (
            <div
              key={i}
              className="del-line"
              style={{
                height: 4,
                width: `${w}%`,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
                ['--line-i' as string]: i,
              }}
            />
          ))}
        </div>
      );
    case 'scale':
      return (
        <div style={{ padding: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', lineHeight: 1.6 }}>
          <div style={{ color: 'var(--text-2)' }}>§ 4.2 Termination</div>
          <div>
            <span style={{ color: 'var(--green)' }}>+ either party may terminate with 60 days notice</span>
          </div>
          <div>
            <span style={{ color: 'var(--red)', textDecoration: 'line-through' }}>− 30 days</span>
          </div>
          <div style={{ color: 'var(--warm)', marginTop: 4 }}>⚑ risk · auto-renewal clause</div>
        </div>
      );
    case 'globe':
      return (
        <div style={{ height: '100%', display: 'flex', padding: 10, gap: 6 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: 8 }}>
            <div style={{ height: 4, width: '60%', background: 'var(--text-3)', borderRadius: 2 }}></div>
            <div style={{ height: 3, width: '90%', background: 'var(--line-2)', borderRadius: 2, marginTop: 6 }}></div>
            <div style={{ height: 3, width: '80%', background: 'var(--line-2)', borderRadius: 2, marginTop: 4 }}></div>
            <div
              style={{
                marginTop: 10,
                padding: '3px 7px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                borderRadius: 999,
                fontSize: 8,
                display: 'inline-block',
              }}
            >
              Start
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 4,
              padding: 8,
              fontSize: 8,
              color: 'var(--text-3)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {['$29', '$79', '$149'].map((p, i) => (
                <div key={i} style={{ padding: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 3 }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'video':
      return (
        <div style={{ padding: 12, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SectionIcon name="play" size={18} />
          </div>
          <div className="tiny" style={{ color: 'var(--text-3)' }}>
            6 min
          </div>
        </div>
      );
    default:
      return <div style={{ padding: 12, height: '100%', background: 'rgba(255,255,255,0.02)' }}></div>;
  }
};

// Governance
export const Governance = () => {
  const pillars = [
    { icon: 'shield', title: 'Human approval gates', desc: 'Nothing ships without explicit sign-off by the owner.' },
    { icon: 'logs', title: 'Complete audit trails', desc: 'Every change, approval, rejection, and edit is logged immutably.' },
    { icon: 'lock', title: 'Granular permissions', desc: 'Control who can delegate to twins, who can approve, who can override.' },
    { icon: 'scale', title: 'Compliance-ready', desc: 'SOC 2 Type II, GDPR, HIPAA-ready, and self-hosted for total data control.' },
    { icon: 'fingerprint', title: 'Provenance tracking', desc: 'See the exact sources, reasoning, and agent chain for every deliverable.' },
    { icon: 'doc', title: 'Version control for work', desc: 'Full diff visibility, rollback capability, and change commentary.' },
  ];

  return (
    <section id="governance">
      <div className="container">
        <SectionLabel
          kicker="ENTERPRISE GOVERNANCE"
          title={
            <>
              Safer than autonomous agents<span className="accent">.</span>
            </>
          }
          sub="Human-in-the-loop architecture. Full auditability. Compliance frameworks. The enterprise gets autonomy without the risk."
        />

        <Reveal>
          <div className="gov-grid">
            {pillars.map((p, i) => (
              <div key={i} className="gov-card scale-in" style={{ ['--stagger' as string]: i * 0.08 }}>
                <div
                  className="row center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <SectionIcon name={p.icon} size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4, fontWeight: 500 }}>
                    {p.title}
                  </h4>
                  <p className="small" style={{ color: 'var(--text-3)' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="row wrap center gap-4" style={{ marginTop: 48 }}>
          <span className="chip">SOC 2 TYPE II</span>
          <span className="chip">GDPR</span>
          <span className="chip">HIPAA-READY</span>
          <span className="chip">SELF-HOSTED</span>
        </Reveal>
      </div>
    </section>
  );
};

// Integrations
export const Integrations = () => {
  return (
    <section id="integrations">
      <div className="container">
        <SectionLabel
          kicker="INTEGRATIONS"
          title={
            <>
              Every tool your team
              <br />
              already uses<span className="accent">.</span>
            </>
          }
          sub="Twins read from and write to your entire stack. Looker, Salesforce, Notion, Slack, Figma, GitHub, Jira, Linear, Stripe, and 60+ more."
          align="center"
        />

        <Reveal>
          <IntegrationsOrbit />
        </Reveal>
      </div>
    </section>
  );
};

// ROI
export const ROI = () => {
  const metrics = [
    { number: '4.2x', label: 'Productivity multiplier', sub: 'per employee, year one' },
    { number: '18M', label: 'Hours reclaimed', sub: 'per 500-person org annually' },
    { number: '$2.8M', label: 'Annual impact', sub: '500-person org, knowledge workers' },
    { number: '8 weeks', label: 'Payback period', sub: 'average deployment' },
  ];

  return (
    <section id="pricing">
      <div className="container">
        <SectionLabel
          kicker="UNIT ECONOMICS"
          title={
            <>
              Massive operational leverage<span className="accent">.</span>
            </>
          }
          sub="Not incremental. Every employee becomes a 2-person team."
          align="center"
        />

        <Reveal className="row wrap center gap-8" style={{ marginTop: 48, justifyContent: 'center' }}>
          {metrics.map((m, i) => (
            <div
              key={i}
              className="col center scale-in"
              style={{
                textAlign: 'center',
                maxWidth: 200,
                padding: 24,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                border: '1px solid var(--line)',
                borderRadius: 18,
                ['--stagger' as string]: i * 0.1,
              }}
            >
              <div
                className="h2"
                style={{
                  color: 'var(--accent)',
                  marginBottom: 12,
                  fontSize: 'clamp(32px, 6vw, 48px)',
                }}
              >
                {m.number}
              </div>
              <h4 style={{ fontSize: 14, color: 'var(--text)', marginBottom: 8, fontWeight: 600 }}>
                {m.label}
              </h4>
              <p className="small" style={{ color: 'var(--text-3)', fontSize: 12 }}>
                {m.sub}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

// Vision
export const Vision = () => {
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--bg), var(--bg-1))' }}>
      <div className="container col center" style={{ alignItems: 'center' }}>
        <Reveal
          className="col center gap-4"
          style={{ textAlign: 'center', alignItems: 'center', maxWidth: 800, width: '100%', margin: '0 auto' }}
        >
          <p className="body-l" style={{ fontSize: 22, lineHeight: 1.4, margin: 0 }}>
            "In 5 years, every knowledge worker will have an AI twin. The bottleneck won't be capability — it will be trust,
            governance, and the ability to integrate with enterprise workflows. Scalova is building that layer."
          </p>
          <span className="mono tiny" style={{ color: 'var(--text-4)', textAlign: 'center' }}>
            — Founders Fund thesis
          </span>
        </Reveal>
      </div>
    </section>
  );
};

// Final CTA
export const FinalCTA = () => {
  return (
    <section>
      <div className="container">
        <Reveal className="col center gap-6" style={{ textAlign: 'center', alignItems: 'center' }}>
          <h2 className="h2">Join the private preview</h2>
          <p className="body-l" style={{ maxWidth: 500, marginBottom: 12 }}>
            14 design partners are already building with Scalova. Help us shape the future of autonomous work.
          </p>
          <div className="row gap-3 wrap center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a demo
              <SectionIcon name="arrow-right" size={14} />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Talk to the team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const FooterScrollLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    smooth
    offset={SCROLL_OFFSET}
    duration={500}
    href={`#${to}`}
    className="footer-link"
  >
    {children}
  </Link>
);

// Footer
export const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Product</h4>
          <FooterScrollLink to="platform">Platform</FooterScrollLink>
          <FooterScrollLink to="twins">AI twins</FooterScrollLink>
          <FooterScrollLink to="integrations">Integrations</FooterScrollLink>
          <FooterScrollLink to="pricing">Pricing</FooterScrollLink>
        </div>
        <div className="footer-col">
          <h4>Enterprise</h4>
          <FooterScrollLink to="governance">Security & governance</FooterScrollLink>
          <FooterScrollLink to="customers">Design partners</FooterScrollLink>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
            Contact sales
          </a>
        </div>
        <div className="footer-col">
          <h4>Get started</h4>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
            Book a demo
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
            Private preview
          </a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <span className="footer-link muted">Terms (coming soon)</span>
          <span className="footer-link muted">Privacy (coming soon)</span>
          <span className="footer-link muted">DPA (coming soon)</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="row center gap-2">
          <Logo variant="footer" />
          <span className="mono tiny" style={{ color: 'var(--text-4)' }}>
            © {new Date().getFullYear()} Scalova. All rights reserved.
          </span>
        </div>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '6px 12px' }}
        >
          Book demo
        </a>
      </div>
    </footer>
  );
};
