'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { dash } from '@/lib/dashboard-ui';
import { cn } from '@/lib/utils';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
  menuClassName?: string;
};

export function DropdownMenu({
  trigger,
  children,
  align = 'right',
  className,
  menuClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cn(
            'absolute top-[calc(100%+8px)] z-50 min-w-[200px] overflow-hidden rounded-2xl border border-white/[0.08] bg-scalova-card/95 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName
          )}
        >
          <div onClick={close}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  children,
  onSelect,
  active,
  destructive,
  className,
}: {
  children: ReactNode;
  onSelect?: () => void;
  active?: boolean;
  destructive?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={cn(
        'mx-1.5 flex w-[calc(100%-12px)] items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition',
        active
          ? 'bg-scalova-accent/15 text-scalova-accent-light'
          : destructive
            ? 'text-scalova-danger hover:bg-scalova-danger/10'
            : 'text-scalova-text hover:bg-white/[0.05]',
        className
      )}
    >
      {children}
    </button>
  );
}

type FilterDropdownProps = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
};

export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className,
}: FilterDropdownProps) {
  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? label;

  return (
    <DropdownMenu
      align="left"
      trigger={
        <button type="button" className={cn(dash.filterTrigger, className)}>
          <span className="text-scalova-faint">{label}</span>
          <span className="text-scalova-text">{displayLabel}</span>
          <IconChevronDown size={12} stroke={2} className="text-scalova-muted" />
        </button>
      }
    >
      {options.map((opt) => (
        <DropdownItem
          key={opt.value}
          active={opt.value === value}
          onSelect={() => onChange(opt.value)}
        >
          {opt.label}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
}
