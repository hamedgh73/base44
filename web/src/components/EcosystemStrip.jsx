import { ecosystem } from '../lib/site.js';

/** Thin marquee-free strip listing the platforms we integrate with. */
export default function EcosystemStrip() {
  return (
    <section className="border-b border-hairline bg-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-6 py-7">
        <span className="microlabel text-slate-400">Built on</span>
        {ecosystem.map((item) => (
          <span
            key={item}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
