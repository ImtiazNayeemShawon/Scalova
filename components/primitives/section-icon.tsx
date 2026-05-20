import {
  IconArrowRight,
  IconArrowUpRight,
  IconChartBar,
  IconCheck,
  IconCommand,
  IconFileText,
  IconFingerprint,
  IconLock,
  IconPhoto,
  IconPlayerPlay,
  IconPresentation,
  IconScale,
  IconShield,
  IconSparkles,
  IconTable,
  IconVersions,
  IconVideo,
  IconWorld,
  IconX,
  type IconProps as TablerIconProps,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type SectionIconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'x'
  | 'play'
  | 'command'
  | 'fingerprint'
  | 'deck'
  | 'chart'
  | 'logs'
  | 'scale'
  | 'globe'
  | 'image'
  | 'table'
  | 'spark'
  | 'video'
  | 'shield'
  | 'lock'
  | 'doc';

const ICON_MAP: Record<SectionIconName, React.ComponentType<TablerIconProps>> = {
  'arrow-right': IconArrowRight,
  'arrow-up-right': IconArrowUpRight,
  check: IconCheck,
  x: IconX,
  play: IconPlayerPlay,
  command: IconCommand,
  fingerprint: IconFingerprint,
  deck: IconPresentation,
  chart: IconChartBar,
  logs: IconFileText,
  scale: IconScale,
  globe: IconWorld,
  image: IconPhoto,
  table: IconTable,
  spark: IconSparkles,
  video: IconVideo,
  shield: IconShield,
  lock: IconLock,
  doc: IconVersions,
};

interface SectionIconProps {
  name: SectionIconName | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  stroke?: number;
}

export const SectionIcon = ({
  name,
  size = 16,
  className,
  style,
  stroke = 1.5,
}: SectionIconProps) => {
  const IconComponent = ICON_MAP[name as SectionIconName];
  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      stroke={stroke}
      className={cn('section-icon shrink-0', className)}
      style={style}
    />
  );
};
