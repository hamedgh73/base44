import { Link } from 'react-router-dom';

import CapabilityBand from '../components/CapabilityBand.jsx';
import EcosystemStrip from '../components/EcosystemStrip.jsx';
import Hero from '../components/Hero.jsx';
import { IconArrow, IconAccess, IconAutomation, IconCable, IconCamera } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import ProductGallery from '../components/ProductGallery.jsx';
import ProcessSteps, { FeatureList } from '../components/ProcessSteps.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceGrid from '../components/ServiceGrid.jsx';
import { CameraMatrix, DoorMatrix, RackDiagram } from '../components/Visuals.jsx';

const smartRooms = [
  {
    icon: IconAutomation,
    title: 'Whole-home lighting',
    body: 'Scene-based keypads, daylight harvesting and occupancy logic across every circuit.',
  },
  {
    icon: IconAutomation,
    title: 'Climate control',
    body: 'Zoned HVAC and radiant integration with room-level temperature sensing.',
  },
  {
    icon: IconCable,
    title: 'Audio / video distribution',
    body: 'Matrixed sources to every display, plus distributed audio with independent zones.',
  },
  {
    icon: IconCamera,
    title: 'Unified ecosystem control',
    body: 'One interface across Control4, Josh.ai and Apple HomeKit — automation and security in the same scene.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <EcosystemStrip />

      {/* ---------------------------------------------------------- *
       * Services overview
       * ---------------------------------------------------------- */}
      <section id="capabilities" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Capabilities"
            title="Four disciplines, engineered as one system."
            lede="Surveillance, access, automation and the network they all run on. We design and install the whole stack, so accountability never gets split between vendors."
            action={
              <Link to="/contact" className="btn btn-ghost">
                Scope my project
                <IconArrow />
              </Link>
            }
          />
          <ServiceGrid />
        </div>
      </section>

      <CapabilityBand />

      {/* ---------------------------------------------------------- *
       * UniFi Protect deep dive
       * ---------------------------------------------------------- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <Microlabel tone="accent">UniFi Protect</Microlabel>
              </div>
              <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-tight text-white">
                High-definition surveillance that thinks on-site.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Recording, motion analysis and event intelligence all happen on your own NVR — not in
                somebody else's cloud. That means instant scrubbing, no per-camera subscription and
                footage that keeps working when the internet does not.
              </p>
              <FeatureList
                className="mt-9"
                items={[
                  {
                    title: 'AI event tracking',
                    body: 'Person, vehicle, package and line-cross detection with intelligent search — jump straight to the event, not the hour.',
                  },
                  {
                    title: 'Local NVR storage',
                    body: 'UNVR with redundant bays sized to your retention window, encrypted and on your premises.',
                  },
                  {
                    title: 'One pane of glass',
                    body: 'Cameras, door events, network health and Wi-Fi clients in a single UniFi dashboard.',
                  },
                ]}
              />
              <Link to="/unifi-protect" className="btn btn-ghost mt-10">
                UniFi Protect capability
                <IconArrow />
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <CameraMatrix />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * UniFi Access deep dive
       * ---------------------------------------------------------- */}
      <section className="border-y border-hairline bg-deep/50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="lg:order-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <Microlabel tone="accent">UniFi Access</Microlabel>
              </div>
              <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-tight text-white">
                Door control with a complete, local audit trail.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Replace keys and shared codes with credentials you can revoke in seconds. Every door,
                every reader and every unlock is recorded on-site, with scheduled access for staff
                and contractors.
              </p>
              <FeatureList
                className="mt-9"
                items={[
                  {
                    title: 'Electronic locks & readers',
                    body: 'Fail-safe or fail-secure hardware specified to the door, with PoE run back to the hub.',
                  },
                  {
                    title: 'Smart credential management',
                    body: 'NFC cards, fobs, mobile unlock and PIN — issued, suspended and audited from one console.',
                  },
                  {
                    title: 'Video intercom release',
                    body: 'See and speak to the door from a desk or phone, then release it without walking over.',
                  },
                ]}
              />
              <Link to="/unifi-access" className="btn btn-ghost mt-10">
                UniFi Access capability
                <IconArrow />
              </Link>
            </Reveal>
            <Reveal delay={120} className="lg:order-1">
              <DoorMatrix />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * Smart automation
       * ---------------------------------------------------------- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Smart Home Automation"
            title="One control surface for the entire property."
            lede="Automation is only impressive when it is invisible. We program scenes around how you actually live and work — then leave you an interface a guest can operate."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {smartRooms.map((room, index) => {
              const Icon = room.icon;

              return (
                <Reveal
                  key={room.title}
                  delay={index * 80}
                  className="group panel p-6 transition-colors duration-300 hover:border-accent/70"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-hairline text-accent-bright transition-colors duration-300 group-hover:border-accent/70">
                    <Icon />
                  </span>
                  <h3 className="mt-6 text-base font-semibold tracking-tight text-white">
                    {room.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{room.body}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-8">
            <Microlabel>Programmed for</Microlabel>
            {['Control4', 'Josh.ai', 'Apple HomeKit', 'Matter', 'Lutron'].map((platform) => (
              <span key={platform} className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {platform}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * Structured cabling
       * ---------------------------------------------------------- */}
      <section className="border-y border-hairline bg-deep/50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <Microlabel tone="accent">Structured Cabling &amp; Network</Microlabel>
              </div>
              <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-tight text-white">
                The layer nobody sees, and everything depends on.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Wireless problems are usually cabling problems wearing a disguise. We build the
                backbone properly — certified Cat6A and fibre, enterprise access points, and racks
                organised so the next engineer can service them in minutes.
              </p>
              <FeatureList
                className="mt-9"
                items={[
                  {
                    title: 'Cat6A & fibre infrastructure',
                    body: 'Certified horizontal runs and fibre uplinks, tested and documented per outlet.',
                  },
                  {
                    title: 'Enterprise Wi-Fi',
                    body: 'Predictive heat maps, then Wi-Fi 6/7 access points with clean roaming and PoE budgeting.',
                  },
                  {
                    title: 'Rack organisation',
                    body: 'Labelled patch panels, dressed cable, documented elevations — handover you can actually read.',
                  },
                ]}
              />
              <Link to="/cabling" className="btn btn-ghost mt-10">
                Cabling capability
                <IconArrow />
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <RackDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * Hardware gallery
       * ---------------------------------------------------------- */}
      <section id="hardware" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Interactive Product Gallery"
            title="Specified hardware, with the numbers attached."
            lede="The models we deploy most, straight from our project catalogue. Hover any card for full technical specifications."
            action={
              <Link to="/hardware" className="btn btn-ghost">
                Open full gallery
                <IconArrow />
              </Link>
            }
          />
          <ProductGallery />
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * Process
       * ---------------------------------------------------------- */}
      <section className="border-t border-hairline py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="How we work"
            title="From walkthrough to monitored system."
            lede="A repeatable delivery process, so enterprise projects and single residences get the same engineering discipline."
          />
          <ProcessSteps />
        </div>
      </section>

      {/* ---------------------------------------------------------- *
       * Closing CTA
       * ---------------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-6 py-24 text-center sm:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <Microlabel tone="accent" className="justify-center">
              Book a site survey
            </Microlabel>
            <h2 className="mt-6 text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-tight text-white">
              Tell us about the property. We will return a real scope.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
              Choose the services you need — video surveillance, access control, smart automation or
              network cabling — and a systems engineer will walk the site with you.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn btn-primary accent-shadow">
                Request an Integration Quote
                <IconArrow />
              </Link>
              <Link to="/portal" className="btn btn-ghost">
                Client Console Link
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
