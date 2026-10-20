import { Link } from 'react-router-dom';

import { IconAccess, IconArrow, IconAutomation, IconCable, IconCamera } from './Marks.jsx';
import Microlabel from './Microlabel.jsx';
import Reveal from './Reveal.jsx';

const services = [
  {
    to: '/unifi-protect',
    icon: IconCamera,
    title: 'UniFi Protect',
    summary:
      '4K smart surveillance with AI event detection, intelligent search and local NVR retention — no subscription cameras.',
    points: ['AI person & vehicle events', 'Local NVR / UNVR storage', 'Colour-at-night optics'],
  },
  {
    to: '/unifi-access',
    icon: IconAccess,
    title: 'UniFi Access',
    summary:
      'Electronic door control, keycard and mobile credentials, video intercom and a full local audit trail for every entry.',
    points: ['NFC, mobile & PIN unlock', 'Video intercom release', 'Time-based access rules'],
  },
  {
    to: '/smart-home',
    icon: IconAutomation,
    title: 'Smart Automation',
    summary:
      'Whole-home lighting, climate, shading and AV distribution unified behind one control surface — Control4, Josh.ai or Apple HomeKit.',
    points: ['Lighting, climate & shading', 'Distributed audio / video', 'Voice + app + panel control'],
  },
  {
    to: '/cabling',
    icon: IconCable,
    title: 'Cabling & Network',
    summary:
      'The physical layer everything else depends on: Cat6A and fibre runs, enterprise Wi-Fi and racks organised to be serviced.',
    points: ['Cat6A & fibre backbone', 'Enterprise Wi-Fi 6/7 APs', 'Labelled, documented racks'],
  },
];

export default function ServiceGrid() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {services.map((service, index) => {
        const Icon = service.icon;

        return (
          <Reveal key={service.to} delay={index * 80}>
            <Link
              to={service.to}
              className="group panel relative flex h-full flex-col p-7 transition-colors duration-300 hover:border-accent/70 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center border border-hairline text-accent-bright transition-colors duration-300 group-hover:border-accent/70">
                  <Icon />
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-semibold tracking-tight text-white">{service.title}</h3>
              <p className="mt-3.5 text-[14px] leading-relaxed text-muted">{service.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-accent-bright" />
                    <span className="text-[13px] text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>

              <span className="mt-8 flex items-center gap-2 text-[13px] font-medium text-accent-bright">
                View capability
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <IconArrow />
                </span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export { services as serviceCatalog };
