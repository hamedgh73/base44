import { Link } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import ProcessSteps from '../components/ProcessSteps.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const zones = [
  {
    title: 'Whole-home smart lighting',
    body: 'Scene keypads, occupancy logic, daylight harvesting and dimming curves tuned per room — including the rooms nobody thinks about until evening.',
    detail: 'Keypads · Motion · Astro schedules',
  },
  {
    title: 'Climate control',
    body: 'Zoned HVAC, underfloor and radiant integration with room-level sensing, so temperature follows occupancy instead of a single hallway thermostat.',
    detail: 'Zoned HVAC · Radiant · Humidity',
  },
  {
    title: 'Audio / video distribution',
    body: 'Matrixed sources to every display, distributed audio with independent zones, and control that survives a source change without a call to us.',
    detail: 'Matrix switching · Multi-zone audio',
  },
  {
    title: 'Unified ecosystem control',
    body: 'Security, lighting, climate and AV behind one interface — Control4, Josh.ai, Apple HomeKit — with scenes that span all of them.',
    detail: 'Control4 · Josh.ai · HomeKit',
  },
];

const scenes = [
  { name: 'Arrival', body: 'Driveway lighting, entry unlock, hallway scene, climate to occupied.' },
  { name: 'Cinema', body: 'Shading closed, AV source routed, lighting to 12%, do-not-disturb on the door.' },
  { name: 'Away', body: 'All locks secured, cameras armed, HVAC setback, random occupancy lighting.' },
  { name: 'Alarm', body: 'Full lighting to 100%, cameras to NVR bookmark, audio notice, mobile push to the household.' },
];

export default function SmartHome() {
  return (
    <>
      <PageHero
        kicker="Smart Home Automation"
        title="Automation you stop noticing, because it simply works."
        lede="We program around how you actually live: lighting that anticipates the room, climate that follows occupancy, media that routes itself, and a single interface that also covers your security system."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Book an automation consult
              <IconArrow />
            </Link>
            <Link to="/cabling" className="btn btn-ghost">
              See the network backbone
            </Link>
          </>
        }
        meta={[
          { value: '4 in 1', label: 'Lighting, climate, AV and security unified' },
          { value: 'Local', label: 'Control processor on your network' },
          { value: 'Guest-proof', label: 'Interfaces anyone can operate' },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Systems"
            title="Four layers, one behaviour model."
            lede="Each layer is specified and commissioned separately — then bound together so a single scene can move all four at once."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {zones.map((zone, index) => (
              <Reveal key={zone.title} delay={index * 80} className="panel p-7">
                <Microlabel tone="accent">{zone.detail}</Microlabel>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{zone.title}</h3>
                <p className="mt-3.5 text-[14px] leading-relaxed text-muted">{zone.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-deep/50 py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Scenes"
            title="Behaviour, not buttons."
            lede="Scenes are programmed with you during commissioning, then adjusted for the first season of real use — at no extra charge."
          />

          <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {scenes.map((scene, index) => (
              <Reveal
                key={scene.name}
                delay={index * 70}
                className="border-l border-hairline pl-6"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] text-accent-bright">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                  {scene.name}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{scene.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Delivery"
            title="Programmed, then walked through with you."
            lede="No handover until every scene has been demonstrated on your own devices."
          />
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
