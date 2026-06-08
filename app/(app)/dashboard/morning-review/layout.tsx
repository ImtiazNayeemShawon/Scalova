import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morning Review · Scalova',
  description: 'Review and approve overnight deliverables from your digital twins.',
};

export default function MorningReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
