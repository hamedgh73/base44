import { Link } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import ProductGallery from '../components/ProductGallery.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Hardware() {
  return (
    <>
      <PageHero
        kicker="Interactive Product Gallery"
        title="The hardware we deploy, with the specifications attached."
        lede="Our standard catalogue of UniFi Protect cameras, Access readers and controllers — the models that survive real installations, not the ones with the best marketing."
        actions={
          <>
            <Link to="/contact" className="btn btn-primary">
              Request an Integration Quote
              <IconArrow />
            </Link>
          </>
        }
        meta={[
          { value: 'Hover', label: 'Any card to reveal full technical specs' },
          { value: 'Local NVR', label: 'Zero-subscription recording architecture' },
          { value: 'Specified', label: 'Every model installed and monitored by us' },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading
            kicker="Catalogue"
            title="Cameras, readers and the controllers behind them."
            lede="Filter by discipline, then hover a card for sensors, detection classes, power requirements and ratings."
          />
          <ProductGallery />
        </div>
      </section>

      <section className="border-t border-hairline py-16">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="panel flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <Microlabel tone="accent">Not sure which model fits?</Microlabel>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-200">
                Send us the sightline or door and we will specify the right hardware — including lens
                choice, mounting and PoE budget — before you commit to anything.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary shrink-0">
              Talk to an engineer
              <IconArrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
