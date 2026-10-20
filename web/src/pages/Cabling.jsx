import { Link } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import ProcessSteps, { FeatureList } from '../components/ProcessSteps.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { RackDiagram } from '../components/Visuals.jsx';

const layers = [
  {
    title: 'Cat6A data cabling',
    body: 'Certified horizontal runs to every outlet, tested and reported — headroom for 10GbE where it will eventually be needed.',
    detail: 'Certified · Tested per outlet',
  },
  {
    title: 'Fibre backbone',
    body: 'Single-mode or OM4 uplinks between buildings, floors and the core, with proper termination and loss budgets documented.',
    detail: 'OM4 / SMF · Documented loss budget',
  },
  {
    title: 'Enterprise Wi-Fi',
    body: 'Predictive heat mapping, then Wi-Fi 6/7 access points with clean roaming and PoE budgeting across the whole property.',
    detail: 'Heat maps · PoE budgeted',
  },
  {
    title: 'Rack organization',
    body: 'Patch panels, switching, NVR and UPS arranged as a readable elevation — not a zip-tie spiral of shame.',
    detail: 'Labelled · Photographed as-built',
  },
  {
    title: 'Wire management',
    body: 'Dressed, combed and labelled cable with service loops, so a port change takes minutes rather than an afternoon.',
    detail: 'Comb-dressed · Colour-coded',
  },
  {
    title: 'Documentation & handover',
    body: 'You receive port maps, elevations and test results — so the next engineer is never guessing.',
    detail: 'Port maps · Test reports',
  },
];

export default function Cabling() {
  return (
    <>
      <PageHero
        kicker="Structured Cabling & Networking Infrastructure"
        title="Everything above the ceiling is only as good as the copper behind it."
        lede="Certified Cat6A and fibre, enterprise Wi-Fi with real heat-map design, and racks organised to be serviced. This is the discipline that makes every other system on this site reliable."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Request a cabling survey
              <IconArrow />
            </Link>
            <Link to="/hardware" className="btn btn-ghost">
              Network &amp; access hardware
            </Link>
          </>
        }
        meta={[
          { value: '10GbE', label: 'Certified Cat6A capable of future upgrades' },
          { value: 'Wi-Fi 6/7', label: 'Heat-map designed access point placement' },
          { value: 'As-built', label: 'Port maps and test reports at handover' },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Infrastructure layers"
            title="Six things that decide whether a system feels premium."
            lede="Wireless complaints, camera dropouts and automation lag almost always trace back to this layer."
            action={<RackDiagram />}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {layers.map((layer, index) => (
              <Reveal key={layer.title} delay={index * 70} className="panel p-6">
                <Microlabel tone="accent">{layer.detail}</Microlabel>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                  {layer.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{layer.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-deep/50 py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                kicker="Remediation"
                title="Inherited a network someone else installed?"
                lede="We start with an honest audit — what is certified, what is degraded, what is simply mislabelled — then prioritise the fixes that actually change performance."
              />
            </Reveal>
            <Reveal delay={120}>
              <FeatureList
                items={[
                  {
                    title: 'Cable & link testing',
                    body: 'Certification testing on suspect runs, so replacement decisions are based on measured results.',
                  },
                  {
                    title: 'Wireless survey',
                    body: 'On-site RF survey identifying interference, dead zones and oversubscribed channels.',
                  },
                  {
                    title: 'Rack rebuild',
                    body: 'A staged rebuild that keeps the business running while the cabinet gets brought back to standard.',
                  },
                  {
                    title: 'Documentation recovery',
                    body: 'Port maps, VLANs and elevations rebuilt from scratch and handed back to you in full.',
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Delivery"
            title="Survey, design, install, document."
            lede="Installed during hours that suit the property — including out-of-hours works where required."
          />
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
