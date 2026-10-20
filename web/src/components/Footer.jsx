import { Link } from 'react-router-dom';

import { ecosystem, navLinks, serviceOptions, site } from '../lib/site.js';
import { RavenMark } from './Marks.jsx';
import Microlabel from './Microlabel.jsx';

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-deep">
      <div className="blueprint-fine pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-white">
              <span className="text-accent-bright">
                <RavenMark className="h-7 w-7" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">Raven Protect</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Design, installation and lifetime monitoring of UniFi-native security, access control
              and structured network infrastructure.
            </p>
            <div className="mt-6">
              <Microlabel>Licensed &amp; insured</Microlabel>
              <p className="mt-2 font-mono text-xs text-muted">LIC #RVP-4471-C7 · EST. 2014</p>
            </div>
          </div>

          <div>
            <Microlabel className="mb-4">Capabilities</Microlabel>
            <ul className="space-y-3 text-sm text-muted">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Microlabel className="mb-4">Engagements</Microlabel>
            <ul className="space-y-3 text-sm text-muted">
              {serviceOptions.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <Microlabel className="mb-4">Contact</Microlabel>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                  className="font-mono text-xs transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <Link
                  to="/portal"
                  className="inline-flex items-center gap-2 text-accent-bright transition-colors hover:text-white"
                >
                  Client Console Link
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-7">
          {ecosystem.map((item) => (
            <span key={item} className="microlabel">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-7">
          <p className="font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} Raven Protect LLC — All rights reserved.
          </p>
          <Microlabel>Systems monitored 24/7 · Local storage, zero-subscription architecture</Microlabel>
        </div>
      </div>
    </footer>
  );
}
