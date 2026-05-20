'use client';

import { useRef, useState, useEffect } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export const Reveal = ({ children, delay = 0, as: As = 'div', className = '', style = {} }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <As ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={style}>
      {children}
    </As>
  );
};

export const SectionLabel = ({
  kicker,
  title,
  sub,
  align = 'left',
  children,
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  align?: string;
  children?: React.ReactNode;
}) => (
  <div
    className="col gap-4"
    style={{
      textAlign: align as any,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      marginBottom: 56,
    }}
  >
    {kicker && <span className="eyebrow">{kicker}</span>}
    {title && (
      <h2 className="h2" style={{ maxWidth: 880 }}>
        {title}
      </h2>
    )}
    {sub && (
      <p className="body-l" style={{ maxWidth: 640, color: 'var(--text-2)' }}>
        {sub}
      </p>
    )}
    {children}
  </div>
);
