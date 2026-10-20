import Microlabel from './Microlabel.jsx';
import Reveal from './Reveal.jsx';

const readouts = [
  { value: 'Design-first', label: 'Blueprint & heat map before install' },
  { value: 'UniFi-native', label: 'Single pane of glass, no bolt-ons' },
  { value: 'Local-first', label: 'Your footage stays on your NVR' },
  { value: 'Monitored', label: 'Health checks on every device' },
];

/** Credibility band between the services grid and the deep-dive sections. */
export default function CapabilityBand() {
  return (
    <section className="border-y border-hairline bg-deep/60">
      <div className="mx-auto grid max-w-[1240px] gap-px px-6 sm:grid-cols-2 lg:grid-cols-4">
        {readouts.map((item, index) => (
          <Reveal
            key={item.value}
            delay={index * 70}
            className="border-hairline py-8 sm:border-r sm:pr-8 sm:last:border-r-0"
          >
            <p className="text-sm font-semibold tracking-tight text-white">{item.value}</p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{item.label}</p>
          </Reveal>
        ))}
      </div>
      <div className="mx-auto max-w-[1240px] px-6 pb-6">
        <Microlabel>Every deployment documented · as-built schematics handed over</Microlabel>
      </div>
    </section>
  );
}
