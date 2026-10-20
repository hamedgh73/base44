import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { navLinks, site } from '../lib/site.js';
import { cn } from '../lib/cn.js';
import { RavenMark } from './Marks.jsx';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-hairline bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="text-accent-bright">
            <RavenMark className="h-7 w-7" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">Raven Protect</span>
            <span className="microlabel mt-1 hidden sm:block">Security · Automation · Network</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-[13px] transition-colors duration-200',
                  isActive ? 'text-white' : 'text-muted hover:text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/portal" className="btn btn-ghost hidden md:inline-flex !px-4 !py-2.5">
            Client Console
          </Link>
          <Link to="/contact" className="btn btn-primary hidden sm:inline-flex !px-4 !py-2.5">
            Request a Quote
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 8h16M4 16h16'}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-hairline bg-ink/95 px-6 py-6 lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="border-b border-hairline-soft py-3.5 text-sm text-muted last:border-0"
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/portal" className="border-b border-hairline-soft py-3.5 text-sm text-muted">
              Client Console
            </NavLink>
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Link to="/contact" className="btn btn-primary w-full">
              Request an Integration Quote
            </Link>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="btn btn-ghost w-full">
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
