import type { ReactNode } from 'react';
import { PageTitle } from '@/components/app/dashboard-ui';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, eyebrow, actions, className }: PageHeaderProps) {
  return (
    <PageTitle
      eyebrow={eyebrow ?? 'Workspace'}
      title={title}
      description={description}
      actions={actions}
      className={cn(className)}
    />
  );
}
