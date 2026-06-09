import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Unavailable · ${SITE.name}`,
  description: 'This service is not available in your region at this moment.',
  robots: { index: false, follow: false },
};

export default function UnavailablePage() {
  return (
    <main
      id="main"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--pad-x)',
        position: 'relative',
      }}
    >
      <div className="aurora" aria-hidden />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 560,
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Image src="/icon.png" alt="Scalova" width={64} height={64} priority />
        </div>

        <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: 20 }}>
          Region unavailable
        </p>

        <h1 className="h2" style={{ marginBottom: 16 }}>
          This service is not available in your region at this moment.
        </h1>

        <p className="body-l" style={{ marginBottom: 32 }}>
          {SITE.name} is not offered in certain regions due to regulatory requirements. If you
          believe this is an error, please contact support.
        </p>

        <p className="mono tiny" style={{ color: 'var(--text-4)' }}>
          Scalova is a product of Two Hands Corporation.
        </p>
      </div>
    </main>
  );
}
