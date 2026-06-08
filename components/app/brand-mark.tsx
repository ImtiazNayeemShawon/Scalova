import Link from 'next/link';
import { cn } from '@/lib/utils';
import { APP_ROUTES } from '@/lib/app-routes';

type BrandMarkProps = {
  size?: 'sm' | 'md' | 'auth';
  showName?: boolean;
  name?: string;
  href?: string;
};

const markSizes = {
  sm: 'size-8 rounded-lg bg-scalova-accent-light shadow-[0_0_7.5px_rgba(86,197,254,0.35)]',
  md: 'size-12 rounded-xl border border-scalova-border-strong bg-scalova-elevated shadow-[0_0_10px_rgba(0,0,0,0.5)]',
  auth: 'size-12 rounded-lg border border-scalova-border bg-scalova-input',
};

export const BrandMark = ({
  size = 'sm',
  showName = true,
  name = 'Scalova',
  href = APP_ROUTES.dashboard,
}: BrandMarkProps) => {
  const inner = (
    <>
      <div className={cn('flex shrink-0 items-center justify-center', markSizes[size])}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/onboarding/logo-mark.svg" alt="" width={28} height={28} className="w-[56%] h-auto object-contain" />
      </div>
      {showName && <span className="text-xl font-medium tracking-[-0.5px] text-scalova-text">{name}</span>}
    </>
  );

  if (href && href.length > 0) {
    return (
      <Link href={href} className="flex items-center gap-3 no-underline">
        {inner}
      </Link>
    );
  }

  return <div className="flex items-center gap-3">{inner}</div>;
};
