import { Link } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import { navLinks } from '../lib/site.js';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center pt-32 pb-24">
      <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="mx-auto max-w-[1240px] px-6">
        <Microlabel tone="accent">404 · Signal lost</Microlabel>
        <h1 className="mt-6 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-tight text-white">
          That page is not on the network.
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          The route you requested does not exist. Use the capability links below, or head back to the
          entrance.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            Return home
            <IconArrow />
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Request an Integration Quote
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
