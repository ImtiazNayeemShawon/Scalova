import Image from 'next/image';
import { cn } from '@/lib/utils';

const BRAND_SLUGS = [
  'slack',
  'github',
  'linear',
  'looker',
  'salesforce',
  'notion',
  'figma',
  'airtable',
  'asana',
] as const;

export type BrandSlug = (typeof BRAND_SLUGS)[number];

interface BrandLogoProps {
  name: BrandSlug | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const BrandLogo = ({ name, size = 20, className, style }: BrandLogoProps) => {
  const slug = name === 'chart' ? 'looker' : name;

  if (!BRAND_SLUGS.includes(slug as BrandSlug)) {
    return null;
  }

  return (
    <Image
      src={`/icons/brands/${slug}.svg`}
      alt=""
      width={size}
      height={size}
      className={cn('brand-logo', className)}
      style={style}
      aria-hidden
    />
  );
};
