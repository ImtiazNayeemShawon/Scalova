import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations · Scalova',
  description: 'Connect Scalova to your external tools and data sources via MCP.',
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
