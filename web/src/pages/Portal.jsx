import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IconArrow } from '../components/Marks.jsx';
import Microlabel from '../components/Microlabel.jsx';
import Reveal from '../components/Reveal.jsx';
import { api } from '../lib/api.js';
import { session } from '../lib/session.js';

const fieldClass =
  'w-full border border-hairline bg-ink/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-accent focus:outline-none';

export default function Portal() {
  const navigate = useNavigate();
  const existing = session.read();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      const result = await api.portalLogin({ email, password });
      session.write({ token: result.token, client: result.client });
      navigate('/portal/console');
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative min-h-[100svh] pt-32 pb-20 sm:pt-40">
      <div className="blueprint-fine pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <Microlabel tone="accent">Client Console Link</Microlabel>
          </div>
          <h1 className="mt-6 text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.05] text-white">
            Your systems, live and documented.
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
            The Raven Protect client console gives monitored sites a single place to review device
            status, retention windows, access credentials and service history.
          </p>

          <div className="panel mt-10 p-6">
            <Microlabel tone="accent">Demonstration access</Microlabel>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              This console is a framework build. Sign in with the seeded demonstration account to
              review the layout:
            </p>
            <dl className="mt-5 space-y-3 font-mono text-[12px]">
              <div className="flex items-center justify-between border-b border-hairline-soft pb-2">
                <dt className="text-muted">email</dt>
                <dd className="text-slate-200">demo@ravenprotect.com</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">password</dt>
                <dd className="text-slate-200">raven-console-2026</dd>
              </div>
            </dl>
          </div>

          {existing ? (
            <div className="mt-8">
              <Link to="/portal/console" className="btn btn-primary">
                Continue as {existing.client?.name ?? 'client'}
                <IconArrow />
              </Link>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} className="panel p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <Microlabel tone="accent">Secure sign in</Microlabel>
              <Microlabel>Session-bound · 12h</Microlabel>
            </div>

            <label className="mt-8 block">
              <span className="microlabel mb-2.5 block">Email</span>
              <input
                className={fieldClass}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                autoComplete="username"
                required
              />
            </label>

            <label className="mt-5 block">
              <span className="microlabel mb-2.5 block">Password</span>
              <input
                className={fieldClass}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? (
              <p className="mt-6 border-l-2 border-signal pl-4 text-[13px] text-signal">{error}</p>
            ) : null}

            <button type="submit" className="btn btn-primary mt-8 w-full" disabled={busy}>
              {busy ? 'Authenticating…' : 'Enter console'}
              <IconArrow />
            </button>

            <p className="mt-6 border-t border-hairline pt-5 text-[12px] leading-relaxed text-muted">
              No console account yet? Access is issued when your first system is commissioned —{' '}
              <Link to="/contact" className="text-accent-bright">
                request a survey
              </Link>{' '}
              or contact the project desk.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
