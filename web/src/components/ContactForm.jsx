import { useState } from 'react';

import { api } from '../lib/api.js';
import { cn } from '../lib/cn.js';
import { propertyTypes, serviceOptions } from '../lib/site.js';
import { IconArrow, IconCheck } from './Marks.jsx';
import Microlabel from './Microlabel.jsx';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  services: [],
  message: '',
};

const fieldClass =
  'w-full border border-hairline bg-ink/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-accent focus:outline-none';

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const toggleService = (service) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const result = await api.submitConsultation(form);
      setReference(result.reference);
      setStatus('done');
      setForm(EMPTY);
    } catch (submitError) {
      setError(submitError.message);
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="panel p-8 sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center border border-accent/60 text-accent-bright">
          <IconCheck className="h-5 w-5" />
        </span>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
          Request logged and assigned
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Your consultation request is in our queue. A systems engineer will contact you within one
          business day to schedule the site survey.
        </p>
        <div className="mt-7 border-t border-hairline pt-6">
          <Microlabel>Reference</Microlabel>
          <p className="mt-2 font-mono text-lg text-accent-bright">{reference}</p>
        </div>
        <button
          type="button"
          className="btn btn-ghost mt-7"
          onClick={() => {
            setStatus('idle');
            setReference('');
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel p-7 sm:p-9" noValidate>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Microlabel tone="accent">Book a site survey &amp; tech consultation</Microlabel>
        <Microlabel>Encrypted · logged to our project desk</Microlabel>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="microlabel mb-2.5 block">Full name *</span>
          <input
            className={fieldClass}
            name="name"
            value={form.name}
            onChange={update('name')}
            placeholder="Jordan Reyes"
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="microlabel mb-2.5 block">Email *</span>
          <input
            className={fieldClass}
            name="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="block">
          <span className="microlabel mb-2.5 block">Phone</span>
          <input
            className={fieldClass}
            name="phone"
            value={form.phone}
            onChange={update('phone')}
            placeholder="(555) 000-0000"
            autoComplete="tel"
          />
        </label>

        <label className="block">
          <span className="microlabel mb-2.5 block">Property type *</span>
          <select
            className={cn(fieldClass, 'appearance-none')}
            name="propertyType"
            value={form.propertyType}
            onChange={update('propertyType')}
            required
          >
            <option value="">Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-8">
        <legend className="microlabel mb-4">Services required *</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => {
            const checked = form.services.includes(service);

            return (
              <label
                key={service}
                className={cn(
                  'flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-sm transition-colors duration-200',
                  checked
                    ? 'border-accent/70 bg-accent/10 text-white'
                    : 'border-hairline text-muted hover:border-accent/40 hover:text-slate-200',
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  name="services"
                  value={service}
                  checked={checked}
                  onChange={() => toggleService(service)}
                />
                <span
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center border',
                    checked ? 'border-accent-bright bg-accent text-white' : 'border-hairline',
                  )}
                >
                  {checked ? <IconCheck className="h-3 w-3" /> : null}
                </span>
                {service}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-8 block">
        <span className="microlabel mb-2.5 block">Project notes</span>
        <textarea
          className={cn(fieldClass, 'min-h-[120px] resize-y')}
          name="message"
          value={form.message}
          onChange={update('message')}
          placeholder="Site size, existing infrastructure, timeline…"
        />
      </label>

      {error ? (
        <p className="mt-6 border-l-2 border-signal pl-4 text-[13px] text-signal">{error}</p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[12px] leading-relaxed text-muted">
          We use your details only to scope this project. No marketing lists, ever.
        </p>
        <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Request Consultation'}
          <IconArrow />
        </button>
      </div>
    </form>
  );
}
