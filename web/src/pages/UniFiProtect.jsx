import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import ProcessSteps, { FeatureList } from '../components/ProcessSteps.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { CameraMatrix } from '../components/Visuals.jsx';
import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'High-definition smart cameras',
    body: '4K turret, bullet and dome optics specified per sightline — entrances get varifocal reach, interiors get discreet flush mounts.',
    meta: 'G5 Pro · AI Bullet · AI Theta',
  },
  {
    title: 'AI event tracking',
    body: 'On-camera detection classifies people, vehicles and packages, so alerts are about events rather than motion noise.',
    meta: 'Person · Vehicle · Package · Line cross',
  },
  {
    title: 'Local NVR storage',
    body: 'Your footage is written to a UNVR on your premises. No cloud tier, no per-camera licence, no footage leaving the building.',
    meta: 'Redundant bays · 14–30 day retention',
  },
  {
    title: 'Intelligent search',
    body: 'Filter the timeline by what happened and who was involved, instead of scrubbing hours of continuous video.',
    meta: 'Event-first timeline review',
  },
  {
    title: 'Mobile & remote review',
    body: 'Live and recorded access from the UniFi Protect app for authorised staff, with per-user permissions.',
    meta: 'Role-based viewer access',
  },
  {
    title: 'Integrity you can audit',
    body: 'Health monitoring on every camera, retention reporting and storage alerts before a disk fills.',
    meta: 'Continuous device health',
  },
];

export default function UniFiProtect() {
  return (
    <>
      <PageHero
        kicker="UniFi Protect"
        title="Surveillance that analyses events, not just records them."
        lede="A complete UniFi Protect deployment: 4K optics, on-device AI detection, and an NVR on your premises that keeps recording whether or not the internet is up."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Scope a Protect deployment
              <IconArrow />
            </Link>
            <Link to="/hardware" className="btn btn-ghost">
              View camera models
            </Link>
          </>
        }
        meta={[
          { value: '4K', label: 'Standard resolution across primary coverage' },
          { value: 'Local', label: 'NVR retention — zero subscription cameras' },
          { value: 'AI', label: 'Person, vehicle and package classification' },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="What you get"
            title="Built around how incidents are actually investigated."
            lede="Every design decision serves one question: when something happens, how fast can you find it?"
            action={<CameraMatrix />}
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
                kicker="Design discipline"
                title="Placement before hardware."
                lede="Cameras are only as good as their sightlines. We survey the property, map coverage against your risk points, and size storage to the retention window your insurer or policy requires."
              />
            </Reveal>
            <Reveal delay={120}>
              <FeatureList
                items={[
                  {
                    title: 'Coverage & heat-map design',
                    body: 'Every camera position is justified against a documented field of view — no filler hardware.',
                  },
                  {
                    title: 'Lens selection per sightline',
                    body: 'Wide for interiors, varifocal for gates, plate-ready optics where vehicles arrive.',
                  },
                  {
                    title: 'Bandwidth & PoE budgeting',
                    body: 'Switch capacity, cable runs and power headroom confirmed before installation day.',
                  },
                  {
                    title: 'Privacy & compliance',
                    body: 'Retention schedules, permission scopes and masking configured to your policy.',
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
            title="From survey to monitored system."
            lede="The same engineering process on every Protect project, whether it is four cameras or two hundred."
          />
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
