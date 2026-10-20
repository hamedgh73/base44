import { Link } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import ProcessSteps, { FeatureList } from '../components/ProcessSteps.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { DoorMatrix } from '../components/Visuals.jsx';

const pillars = [
  {
    title: 'Modern electronic locks',
    body: 'Fail-safe or fail-secure hardware specified to the door — maglocks, strikes and electric bolts with proper egress.',
    meta: 'Door-by-door specification',
  },
  {
    title: 'Readers & credentials',
    body: 'NFC cards, fobs, mobile unlock and PIN codes on the same system, issued and revoked in seconds.',
    meta: 'NFC · Mobile · PIN · Fob',
  },
  {
    title: 'Building access control',
    body: 'Multi-door buildings on a single hub architecture, with time-based rules per group and per door.',
    meta: 'Schedules · Groups · Zones',
  },
  {
    title: 'Video intercom release',
    body: 'See, speak and release entry from a desk station or a phone — no walking to the door to verify.',
    meta: 'Two-way video at the door',
  },
  {
    title: 'Local audit trail',
    body: 'Every read, unlock and override logged locally and exportable for HR, security or compliance review.',
    meta: 'Exportable event history',
  },
  {
    title: 'Protect integration',
    body: 'Door events tie into the same timeline as your cameras, so an access event and its footage sit together.',
    meta: 'Shared UniFi dashboard',
  },
];

export default function UniFiAccess() {
  return (
    <>
      <PageHero
        kicker="UniFi Access"
        title="Stop handing out keys. Start issuing credentials."
        lede="UniFi Access replaces mechanical keys and shared codes with revocable credentials, scheduled permissions and a complete local record of who went where, and when."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Scope an Access deployment
              <IconArrow />
            </Link>
            <Link to="/hardware" className="btn btn-ghost">
              View readers &amp; hubs
            </Link>
          </>
        }
        meta={[
          { value: 'Seconds', label: 'To revoke a credential or re-issue one' },
          { value: 'Per-door', label: 'Schedules, groups and access rules' },
          { value: 'Local', label: 'Audit history stored on your controller' },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Capabilities"
            title="Access control engineered for real buildings."
            lede="Hardware is chosen for the door it protects — and every credential decision is logged."
            action={<DoorMatrix />}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 70} className="panel p-6">
                <Microlabel tone="accent">{pillar.meta}</Microlabel>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{pillar.body}</p>
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
                kicker="Credential management"
                title="Onboarding and offboarding in one console."
                lede="Staff, contractors and cleaners get exactly the doors they need, for exactly as long as they need them — and nothing lingers after they leave."
              />
            </Reveal>
            <Reveal delay={120}>
              <FeatureList
                items={[
                  {
                    title: 'Issue in seconds',
                    body: 'Add a fob, a mobile credential or a PIN to the right group without re-keying anything.',
                  },
                  {
                    title: 'Schedule by exception',
                    body: 'Contractors get a Tuesday window at the loading bay; managers get the executive floor all week.',
                  },
                  {
                    title: 'Lifecycle discipline',
                    body: 'Departing staff are disabled in one action, with the audit trail proving the change.',
                  },
                  {
                    title: 'Fail-safe by design',
                    body: 'Power loss, egress and fire-alarm release behaviour is designed and tested, not assumed.',
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
            title="Survey, specify, install, monitor."
            lede="Door hardware is unforgiving — we specify it once, correctly."
          />
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
