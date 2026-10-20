import { Link } from 'react-router-dom';

import { IconArrow, IconCheck } from './Marks.jsx';
import Microlabel from './Microlabel.jsx';

const steps = [
  {
    step: '01',
    title: 'Site survey & risk assessment',
    body: 'We walk the property, map sightlines, door hardware, existing cabling and Wi-Fi coverage — then tell you what actually needs to change.',
  },
  {
    step: '02',
    title: 'System design & blueprint',
    body: 'Camera placement, lens selection, NVR sizing, access hardware and cable routes are documented before a single hole is drilled.',
  },
  {
    step: '03',
    title: 'Clean installation',
    body: 'Certified Cat6A/fibre runs, labelled patch panels, PoE budgets verified, racks dressed and photographed as-built.',
  },
  {
    step: '04',
    title: 'Commission & monitor',
    body: 'AI detection zones tuned, credentials issued, staff trained — then continuous device health monitoring from our end.',
  },
];

export default function ProcessSteps() {
  return (
    <div>
      <ol className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <li key={item.step} className="border-l border-hairline pl-6 lg:pl-7">
            <span className="font-mono text-[11px] tracking-[0.24em] text-accent-bright">
              {item.step}
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>

      <div className="panel mt-14 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <Microlabel tone="accent">Next step</Microlabel>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-200">
            Book a site survey and technical consultation. We will return a written scope, hardware
            bill of materials and a fixed installation window.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link to="/contact" className="btn btn-primary">
            Book a Site Survey
            <IconArrow />
          </Link>
          <a href="tel:+15550142280" className="btn btn-ghost">
            Talk to an engineer
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeatureList({ items, className = '' }) {
  return (
    <ul className={`space-y-4 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <span className="mt-0.5 text-accent-bright">
            <IconCheck />
          </span>
          <span>
            <span className="block text-sm font-medium text-white">{item.title}</span>
            <span className="mt-1 block text-[13px] leading-relaxed text-muted">{item.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
