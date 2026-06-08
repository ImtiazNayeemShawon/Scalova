import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in · Scalova',
  description: 'Sign in to manage your digital workforce.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
