/* Shared line-icon set. Stroke-based, inherits currentColor. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function RavenMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 2.5 28 7v9.5c0 6.2-4.6 10.9-12 13.5C8.6 27.4 4 22.7 4 16.5V7Z" {...base} strokeWidth={1.3} />
      <path d="M11 21V11h4.6a3.2 3.2 0 0 1 0 6.4H11l6.2 3.6" {...base} strokeWidth={1.6} />
      <circle cx="20.6" cy="11.2" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCamera({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3 8.5h7l5-2.5v12l-5-2.5H3z" {...base} />
      <circle cx="7.5" cy="12" r="2.6" {...base} />
      <path d="M18.5 9.5a3.5 3.5 0 0 1 0 5" {...base} />
      <path d="M20.8 7a6.5 6.5 0 0 1 0 10" {...base} />
    </svg>
  );
}

export function IconAccess({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="10.5" width="16" height="10" rx="1.5" {...base} />
      <path d="M8 10.5V7.6A4 4 0 0 1 16 7.6v2.9" {...base} />
      <path d="M12 14.4v2.6" {...base} />
    </svg>
  );
}

export function IconAutomation({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" {...base} />
      <circle cx="12" cy="12" r="4" {...base} />
    </svg>
  );
}

export function IconCable({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="5" rx="1" {...base} />
      <rect x="3" y="15" width="18" height="5" rx="1" {...base} />
      <path d="M7 9v6M12 9v6M17 9v6" {...base} />
    </svg>
  );
}

export function IconArrow({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" {...base} />
    </svg>
  );
}

export function IconCheck({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M3 8.4 6.4 12 13 4.6" {...base} strokeWidth={1.8} />
    </svg>
  );
}
