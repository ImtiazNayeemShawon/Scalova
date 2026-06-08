import { cn } from '@/lib/utils';

export const AmbientBackground = ({ variant = 'auth' }: { variant?: 'auth' | 'onboarding' | 'grid' }) => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
    {variant === 'grid' && (
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.03) 2.5%, transparent 2.5%), linear-gradient(180deg, rgba(255,255,255,0.03) 2.5%, transparent 2.5%)',
          backgroundSize: '40px 40px',
        }}
      />
    )}
    <div
      className={cn(
        'absolute rounded-full blur-[60px] mix-blend-screen',
        variant === 'onboarding' ? 'size-[500px] opacity-70' : 'size-[600px] opacity-70',
        variant === 'onboarding' ? '-top-[10%] -left-[10%] bg-scalova-accent/10' : 'top-[212px] left-[340px] bg-scalova-accent/10'
      )}
    />
    <div
      className={cn(
        'absolute rounded-full blur-[60px] mix-blend-screen bg-[rgba(86,197,254,0.12)]',
        variant === 'onboarding'
          ? '-bottom-[10%] -right-[10%] size-[500px] opacity-70 blur-[75px]'
          : 'top-0 right-0 size-[400px] opacity-50'
      )}
    />
  </div>
);
