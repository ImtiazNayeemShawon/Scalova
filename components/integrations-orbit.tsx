'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Airtable,
  Figma,
  Github,
  Google,
  Hubspot,
  Jira,
  Linear,
  Looker,
  Notion,
  Salesforce,
  Slack,
  Snowflake,
  Stripe,
  Supabase,
  Vercel,
  Zendesk,
  type Icon,
} from '@dev.icons/react';

type OrbitItem = { name: string; Icon: Icon };
type OrbitRing = {
  id: string;
  radius: number;
  duration: number;
  direction: 'cw' | 'ccw';
  phaseOffset: number;
  iconSize: number;
  badgeSize: number;
  zIndex: number;
  icons: OrbitItem[];
};

const ORBIT_RINGS: OrbitRing[] = [
  {
    id: 'inner',
    radius: 96,
    duration: 26,
    direction: 'cw',
    phaseOffset: 0,
    iconSize: 28,
    badgeSize: 52,
    zIndex: 1,
    icons: [
      { name: 'Slack', Icon: Slack },
      { name: 'Linear', Icon: Linear },
      { name: 'Notion', Icon: Notion },
      { name: 'GitHub', Icon: Github },
    ],
  },
  {
    id: 'middle',
    radius: 172,
    duration: 42,
    direction: 'ccw',
    phaseOffset: 36,
    iconSize: 32,
    badgeSize: 58,
    zIndex: 2,
    icons: [
      { name: 'Salesforce', Icon: Salesforce },
      { name: 'Figma', Icon: Figma },
      { name: 'Jira', Icon: Jira },
      { name: 'Stripe', Icon: Stripe },
      { name: 'Airtable', Icon: Airtable },
    ],
  },
  {
    id: 'outer',
    radius: 248,
    duration: 64,
    direction: 'cw',
    phaseOffset: 18,
    iconSize: 36,
    badgeSize: 64,
    zIndex: 3,
    icons: [
      { name: 'Looker', Icon: Looker },
      { name: 'Google', Icon: Google },
      { name: 'Snowflake', Icon: Snowflake },
      { name: 'HubSpot', Icon: Hubspot },
      { name: 'Zendesk', Icon: Zendesk },
      { name: 'Vercel', Icon: Vercel },
      { name: 'Supabase', Icon: Supabase },
    ],
  },
];

function useOrbitScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 380) setScale(0.48);
      else if (w < 480) setScale(0.55);
      else if (w < 640) setScale(0.65);
      else if (w < 900) setScale(0.82);
      else setScale(1);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return scale;
}

const OrbitIcon = ({
  name,
  Icon,
  angle,
  radius,
  iconSize,
  badgeSize,
}: OrbitItem & { angle: number; radius: number; iconSize: number; badgeSize: number }) => (
  <div
    className="orbit-icon-slot"
    style={{
      ['--orbit-angle' as string]: `${angle}deg`,
      ['--orbit-radius' as string]: `${radius}px`,
      ['--badge-size' as string]: `${badgeSize}px`,
    }}
    title={name}
  >
    <div className="orbit-icon-inner">
      <div className="logo-point">
        <Icon size={iconSize} aria-label={name} />
      </div>
    </div>
  </div>
);

export const IntegrationsOrbit = () => {
  const scale = useOrbitScale();

  return (
    <div className="integrations-stage">
      <div className="integrations-stage-bg" aria-hidden />

      {ORBIT_RINGS.map((ring) => {
        const count = ring.icons.length;
        const radius = Math.round(ring.radius * scale);
        const ringDiameter = radius * 2;
        const iconSize = Math.round(ring.iconSize * scale);
        const badgeSize = Math.round(ring.badgeSize * scale);

        return (
          <div
            key={ring.id}
            className={`orbit-layer orbit-layer--${ring.id}`}
            style={{ zIndex: ring.zIndex }}
          >
            <div
              className="orbit-ring"
              style={{ width: ringDiameter, height: ringDiameter }}
              aria-hidden
            />
            <div
              className={`orbit-track orbit-track--${ring.direction}`}
              style={{ ['--orbit-duration' as string]: `${ring.duration}s` }}
            >
              {ring.icons.map((item, i) => (
                <OrbitIcon
                  key={item.name}
                  {...item}
                  angle={ring.phaseOffset + (360 / count) * i}
                  radius={radius}
                  iconSize={iconSize}
                  badgeSize={badgeSize}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="center-node glow-pulse">
        <Image src="/icon.png" alt="Scalova" width={44} height={44} priority />
      </div>
    </div>
  );
};
