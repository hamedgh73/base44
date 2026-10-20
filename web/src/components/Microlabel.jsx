import { cn } from '../lib/cn.js';

export default function Microlabel({ children, className = '', tone = 'default' }) {
  const tones = {
    default: 'text-muted',
    accent: 'text-accent-bright',
    signal: 'text-signal',
  };

  return <p className={cn('microlabel', tones[tone], className)}>{children}</p>;
}

/** Small "live" indicator used beside anything the system reports on. */
export function StatusDot({ tone = 'online', label }) {
  const tones = {
    online: 'text-accent-bright bg-accent-bright',
    attention: 'text-signal bg-signal',
    offline: 'text-muted bg-muted',
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn('status-dot h-1.5 w-1.5 rounded-full', tones[tone])} />
      {label ? <Microlabel>{label}</Microlabel> : null}
    </span>
  );
}
