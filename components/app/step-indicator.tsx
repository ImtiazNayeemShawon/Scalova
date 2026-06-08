import { cn } from '@/lib/utils';

export const OnboardingStepHeader = ({
  step,
  total,
  section,
  title,
  description,
  centered = false,
}: {
  step: number;
  total: number;
  section: string;
  title: string;
  description: string;
  centered?: boolean;
}) => (
  <header className={cn('mb-10 w-full max-w-2xl', centered ? 'mx-auto text-center' : 'max-w-none')}>
    <div className={cn('mb-4 flex flex-wrap items-center gap-3', centered && 'justify-center')}>
      <span className="rounded-full border border-scalova-accent-light/20 bg-scalova-accent-light/10 px-[13px] py-1 text-xs font-medium uppercase tracking-[1.2px] text-scalova-accent-light">
        Step {step} of {total}
      </span>
      <span className="h-px w-12 bg-scalova-border-strong" />
      <span className="text-xs font-medium uppercase tracking-[0.6px] text-scalova-muted">{section}</span>
    </div>
    <h1 className="text-[32px] font-semibold tracking-[-0.64px] leading-[38.4px]">{title}</h1>
    <p className={cn('mt-2 max-w-2xl text-sm leading-[22.4px] text-scalova-muted', centered && 'mx-auto')}>
      {description}
    </p>
  </header>
);
