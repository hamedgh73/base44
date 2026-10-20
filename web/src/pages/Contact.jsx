import ContactForm from '../components/ContactForm.jsx';
import Microlabel from '../components/Microlabel.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { serviceOptions, site } from '../lib/site.js';

const expectations = [
  {
    step: '01',
    title: 'We confirm the request',
    body: 'Your submission lands on our project desk with a reference number, and we reply within one business day.',
  },
  {
    step: '02',
    title: 'Site survey scheduled',
    body: 'A systems engineer walks the property with you — typically 45–90 minutes depending on size.',
  },
  {
    step: '03',
    title: 'Written scope returned',
    body: 'Hardware bill of materials, cable routes, installation window and a fixed price.',
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact & Lead Capture"
        title="Book a site survey & technical consultation."
        lede="Tell us what you need protected, automated or wired. Select the services that apply and we will scope it properly — no sales script, no obligation."
        meta={[
          { value: '< 1 day', label: 'Response time on new requests' },
          { value: '45–90 min', label: 'Typical on-site survey duration' },
          { value: 'Fixed', label: 'Written scope and pricing after survey' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <ContactForm />

          <div className="space-y-10">
            <Reveal>
              <div className="panel p-7">
                <Microlabel tone="accent">Direct contact</Microlabel>
                <div className="mt-6 space-y-5">
                  <div>
                    <Microlabel>Project desk</Microlabel>
                    <p className="mt-2 font-mono text-sm text-slate-200">{site.phone}</p>
                  </div>
                  <div>
                    <Microlabel>Email</Microlabel>
                    <p className="mt-2 font-mono text-sm text-slate-200">{site.email}</p>
                  </div>
                  <div>
                    <Microlabel>Response window</Microlabel>
                    <p className="mt-2 text-[13px] text-muted">
                      Mon–Fri, 08:00–18:00. Emergency monitoring support runs 24/7 for existing
                      clients.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="panel p-7">
                <Microlabel tone="accent">Engagement types</Microlabel>
                <ul className="mt-5 space-y-3">
                  {serviceOptions.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <span className="h-1 w-1 rounded-full bg-accent-bright" />
                      <span className="text-[13px] text-slate-300">{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-hairline pt-5 text-[12px] leading-relaxed text-muted">
                  Multi-site portfolios and new-build developments are scoped with a phased
                  installation plan and per-site documentation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="panel p-7">
                <Microlabel tone="accent">What happens next</Microlabel>
                <ol className="mt-6 space-y-6">
                  {expectations.map((item) => (
                    <li key={item.step} className="border-l border-hairline pl-5">
                      <span className="font-mono text-[11px] tracking-[0.22em] text-accent-bright">
                        {item.step}
                      </span>
                      <p className="mt-3 text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
