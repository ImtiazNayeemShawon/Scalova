import type { Metadata } from 'next';
import { DashboardShell } from '@/components/app/dashboard-shell';

export const metadata: Metadata = {
  title: 'Dashboard · Scalova',
  description: 'Manage your digital twin workforce.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
