import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Microlabel, { StatusDot } from '../components/Microlabel.jsx';
import Reveal from '../components/Reveal.jsx';
import { api } from '../lib/api.js';
import { session } from '../lib/session.js';

const statusTone = {
  online: 'online',
  attention: 'attention',
  offline: 'offline',
};

export default function PortalConsole() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => session.read());
  const [systems, setSystems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const current = session.read();
    if (!current?.token) {
      navigate('/portal', { replace: true });
      return;
    }
    setState(current);

    let cancelled = false;

    api
      .portalSystems(current.token)
      .then((payload) => {
        if (cancelled) return;
        setSystems(payload.systems ?? []);
        setStatus('ready');
      })
      .catch((loadError) => {
        if (cancelled) return;
        setError(loadError.message);
        setStatus('error');
        if (/session|expired/i.test(loadError.message)) {
          session.clear();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const signOut = () => {
    session.clear();
    navigate('/portal', { replace: true });
  };

  const sites = [...new Set(systems.map((system) => system.site))];

  return (
    <section className="relative min-h-[100svh] pt-32 pb-24 sm:pt-36">
      <div className="blueprint-fine pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8">
          <div>
            <Microlabel tone="accent">Client Console</Microlabel>
            <h1 className="mt-4 text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-tight text-white">
              {state?.client?.name ? `${state.client.name} — monitored sites` : 'Monitored sites'}
            </h1>
            <p className="mt-3 font-mono text-[12px] text-muted">
              {state?.client?.email ?? ''}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn btn-ghost !px-4 !py-2.5">
              Request service
            </Link>
            <button type="button" onClick={signOut} className="btn btn-ghost !px-4 !py-2.5">
              Sign out
            </button>
          </div>
        </div>

        {status === 'loading' ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <div key={key} className="panel h-40 animate-pulse opacity-40" />
            ))}
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="panel mt-10 p-7">
            <Microlabel tone="signal">Console unavailable</Microlabel>
            <p className="mt-3 text-sm text-muted">{error}</p>
            <Link to="/portal" className="btn btn-ghost mt-6">
              Return to sign in
            </Link>
          </div>
        ) : null}

        {status === 'ready' ? (
          <>
            <div className="mt-10 grid gap-px sm:grid-cols-3">
              {[
                { value: String(sites.length), label: 'Sites under management' },
                { value: String(systems.length), label: 'Systems reporting' },
                {
                  value: String(systems.filter((system) => system.status !== 'online').length),
                  label: 'Items needing attention',
                },
              ].map((item) => (
                <div key={item.label} className="panel p-6">
                  <p className="font-mono text-2xl text-white">{item.value}</p>
                  <Microlabel className="mt-2">{item.label}</Microlabel>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-10">
              {sites.map((site) => (
                <div key={site}>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-6 bg-accent" />
                    <Microlabel tone="accent">{site}</Microlabel>
                  </div>
                  <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {systems
                      .filter((system) => system.site === site)
                      .map((system, index) => (
                        <Reveal key={`${site}-${system.system}`} delay={index * 60} className="panel p-6">
                          <div className="flex items-start justify-between gap-4">
                            <h2 className="text-base font-semibold tracking-tight text-white">
                              {system.system}
                            </h2>
                            <StatusDot
                              tone={statusTone[system.status] ?? 'offline'}
                              label={system.status}
                            />
                          </div>
                          <p className="mt-4 text-[13px] leading-relaxed text-muted">
                            {system.detail}
                          </p>
                          <p className="mt-5 border-t border-hairline pt-4 font-mono text-[11px] text-muted">
                            Last verified{' '}
                            {new Date(system.updatedAt).toLocaleString(undefined, {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </p>
                        </Reveal>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
