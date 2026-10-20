import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { site } from '../lib/site.js';
import { IconArrow } from './Marks.jsx';
import { StatusDot } from './Microlabel.jsx';

/**
 * Hero with a scroll-driven media layer.
 *
 * The media (3D render, or a looping video once `site.heroVideo` is set) is
 * transformed directly on scroll — no React state per frame — so panning stays
 * smooth: as the page scrolls, the render scales up, drifts upward and dims,
 * producing the parallax depth shift the design calls for.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const scrimRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const scrim = scrimRef.current;
    if (!section || !media) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height || 1;
      const progress = Math.min(1, Math.max(0, -rect.top / span));

      media.style.transform = `scale(${(1.06 + progress * 0.16).toFixed(4)}) translate3d(0, ${(
        progress * -7
      ).toFixed(3)}%, 0)`;
      media.style.opacity = String((1 - progress * 0.45).toFixed(3));

      if (scrim) scrim.style.opacity = String((0.62 + progress * 0.3).toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Scroll-driven media layer */}
      <div className="absolute inset-0 -z-10">
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          {site.heroVideo ? (
            <video
              className="h-full w-full object-cover"
              src={site.heroVideo}
              poster={site.heroPoster}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={site.heroPoster}
              alt="Isometric 3D visualisation of a smart, fully monitored residence"
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {/* Legibility scrim — keeps the headline crisp over the render. */}
        <div
          ref={scrimRef}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,8,11,0.92) 0%, rgba(6,8,11,0.55) 34%, rgba(6,8,11,0.86) 78%, #06080b 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 22% 55%, rgba(6,8,11,0.9) 0%, rgba(6,8,11,0.35) 52%, transparent 78%)',
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-[1240px] flex-col justify-center px-6 pt-28 pb-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <StatusDot tone="online" label="Systems nominal" />
            <span className="hidden h-3 w-px bg-hairline sm:block" />
            <span className="microlabel">UniFi Protect · Access · Network · Automation</span>
          </div>

          <h1 className="mt-7 text-[clamp(2.4rem,6.2vw,4.4rem)] font-semibold leading-[0.98] text-white">
            Enterprise-Grade Security.
            <span className="mt-2 block text-accent-bright">Intelligent Automation.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Raven Protect engineers the full stack of a modern property — UniFi Protect surveillance,
            UniFi Access door control, whole-home automation and the structured cabling that carries
            all of it. Designed to blueprint, installed clean, monitored for life.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn btn-primary accent-shadow">
              Request an Integration Quote
              <IconArrow />
            </Link>
            <Link to="/unifi-protect" className="btn btn-ghost">
              Explore the Ecosystem
            </Link>
          </div>

          <p className="mt-7 font-mono text-[11px] tracking-wide text-muted">
            Scroll to pan the deployment — local NVR storage · no recurring camera fees
          </p>
        </div>
      </div>

      {/* Technical readout strip pinned to the base of the hero */}
      <div className="absolute inset-x-0 bottom-0 border-t border-hairline bg-ink/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-6 sm:grid-cols-4">
          {[
            { value: '640+', label: 'Cameras deployed' },
            { value: '180', label: 'Sites monitored' },
            { value: '99.98%', label: 'Recording uptime' },
            { value: '< 24h', label: 'Service response' },
          ].map((stat) => (
            <div key={stat.label} className="py-4 sm:py-5">
              <p className="font-mono text-lg text-white">{stat.value}</p>
              <p className="microlabel mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
