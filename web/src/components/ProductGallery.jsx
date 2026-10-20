import { useEffect, useState } from 'react';

import { api } from '../lib/api.js';
import { cn } from '../lib/cn.js';
import Microlabel from './Microlabel.jsx';
import Reveal from './Reveal.jsx';

const FILTERS = [
  { id: 'all', label: 'All hardware' },
  { id: 'cameras', label: 'Cameras' },
  { id: 'access', label: 'Access' },
];

function humanise(key) {
  return key.replace(/_/g, ' ');
}

function ProductCard({ product, index }) {
  const specs = Object.entries(product.specs ?? {});

  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="group panel relative flex h-full min-h-[290px] flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-accent/70">
        {/* Accent rail intensifies on hover */}
        <span
          className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }}
        />

        <div className="flex items-center justify-between gap-4">
          <Microlabel tone="accent">
            {product.category === 'access' ? 'Access control' : 'Video surveillance'}
          </Microlabel>
          <span className="font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{product.name}</h3>
        <p className="mt-2 text-[13px] text-accent-bright">{product.tagline}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-muted">{product.summary}</p>

        <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Hover for specifications
        </p>

        {/* Specification panel — revealed on hover / keyboard focus */}
        <div className="pointer-events-none absolute inset-0 flex translate-y-3 flex-col justify-end bg-gradient-to-t from-ink via-ink/95 to-ink/70 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <Microlabel className="mb-4">Technical specification</Microlabel>
          <dl className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
            {specs.map(([key, value]) => (
              <div key={key} className="border-b border-hairline-soft pb-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {humanise(key)}
                </dt>
                <dd className="mt-1 text-[12px] text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;

    api
      .products()
      .then((payload) => {
        if (cancelled) return;
        setProducts(payload.products ?? []);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = filter === 'all' ? products : products.filter((item) => item.category === filter);

  return (
    <div>
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFilter(option.id)}
            className={cn(
              'border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200',
              filter === option.id
                ? 'border-accent bg-accent/12 text-white'
                : 'border-hairline text-muted hover:border-accent/50 hover:text-white',
            )}
          >
            {option.label}
          </button>
        ))}
        {status === 'ready' ? (
          <span className="ml-auto font-mono text-[11px] text-muted">
            {visible.length} models · catalogue synced
          </span>
        ) : null}
      </div>

      {status === 'loading' ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <div key={key} className="panel h-[290px] animate-pulse opacity-40" />
          ))}
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="panel mt-8 p-7">
          <Microlabel tone="signal">Catalogue unavailable</Microlabel>
          <p className="mt-3 text-sm text-muted">
            The hardware catalogue could not be loaded. Refresh in a moment, or call{' '}
            <span className="font-mono text-slate-200">(555) 014-2280</span> for current models.
          </p>
        </div>
      ) : null}

      {status === 'ready' ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
