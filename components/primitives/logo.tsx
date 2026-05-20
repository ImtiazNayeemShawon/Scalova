import { cn } from '@/lib/utils';

type LogoVariant = 'nav' | 'footer' | 'default';

const SIZES: Record<LogoVariant, { width: number; height: number }> = {
  nav: { width: 108, height: 28 },
  footer: { width: 96, height: 26 },
  default: { width: 108, height: 28 },
};

export const Logo = ({ variant = 'default', className }: { variant?: LogoVariant; className?: string }) => {
  const { width, height } = SIZES[variant];
  return (
    <img
      src="/scalova.png"
      alt="Scalova"
      width={width}
      height={height}
      className={cn('logo-img', className)}
      style={{ width, height: 'auto', maxHeight: height, objectFit: 'contain' }}
    />
  );
};

export const StatusDot = ({ tone = 'accent', pulse = false }: { tone?: string; pulse?: boolean }) => {
  const colors: Record<string, string> = {
    accent: 'var(--accent)',
    green: 'var(--green)',
    warm: 'var(--warm)',
    red: 'var(--red)',
    muted: 'var(--text-4)',
  };

  return (
    <span
      className={pulse ? 'pulse' : ''}
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: colors[tone] ?? colors.accent,
        boxShadow: pulse ? `0 0 10px ${colors[tone] ?? colors.accent}` : 'none',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
};
