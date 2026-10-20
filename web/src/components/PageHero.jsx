import { Link } from 'react-router-dom';

import { IconArrow } from './Marks.jsx';
import Microlabel from './Microlabel.jsx';
import Reveal from './Reveal.jsx';

export default function PageHero({ kicker, title, lede, actions = null, meta = [] }) {
  return (
    <section className="relative border-b border-hairline pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="blueprint-fine pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <Microlabel tone="accent">{kicker}</Microlabel>
          </div>
          <h1 className="mt-6 max-w-4xl text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-[1.04] text-white">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{lede}</p>
          ) : null}
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </Reveal>

        {meta.length ? (
          <Reveal delay={120} className="mt-14 grid gap-px border-t border-hairline pt-8 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label} className="pr-6">
                <p className="font-mono text-base text-white">{item.value}</p>
                <Microlabel className="mt-2">{item.label}</Microlabel>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function QuoteAction({ to = '/contact', label = 'Request an Integration Quote' }) {
  return (
    <Link to={to} className="btn btn-primary">
      {label}
      <IconArrow />
    </Link>
  );
}
