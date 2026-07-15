'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Link } from 'react-scroll';
import { Logo } from './primitives/logo';
import { SectionIcon } from './primitives/section-icon';
import { APP_ROUTES } from '@/lib/app-routes';
import { CALENDLY_URL } from '@/lib/site';

const SCROLL_OFFSET = -80;

const NAV_ITEMS = [
  { label: 'Platform', to: 'platform' },
  { label: 'Twins', to: 'twins' },
  { label: 'Governance', to: 'governance' },
  { label: 'Trust', to: 'customers' },
  { label: 'Pricing', to: 'pricing' },
  { label: 'Integrations', to: 'integrations' },
] as const;

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.classList.toggle('nav-open', menuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-chrome${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-chrome-bar">
        <nav className="nav" aria-label="Main">
          <Link
            to="platform"
            smooth
            offset={SCROLL_OFFSET}
            duration={500}
            href="#platform"
            aria-label="Scalova home"
            className="nav-brand"
            onClick={closeMenu}
          >
            <Logo variant="nav" />
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </nav>
      </div>

      <div id="nav-menu" className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          {NAV_ITEMS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              spy
              smooth
              offset={SCROLL_OFFSET}
              duration={500}
              activeClass="active"
              href={`#${to}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="row center gap-3 nav-actions">
          <NextLink
            href={CALENDLY_URL}
            className="btn btn-ghost"
            style={{ padding: '8px 16px', fontSize: 13 }}
            onClick={closeMenu}
          >
            Log in
          </NextLink>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: 13 }}
            onClick={closeMenu}
          >
            Signup
            <SectionIcon name="arrow-right" size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
