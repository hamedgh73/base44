import { cn } from '../lib/cn.js';
import Microlabel from './Microlabel.jsx';
import Reveal from './Reveal.jsx';

export default function SectionHeading({
  kicker,
  title,
  lede,
  align = 'left',
  className = '',
  action = null,
}) {
  const centered = align === 'center';

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-5',
        centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {kicker ? (
          <div className={cn('flex items-center gap-3', centered && 'justify-center')}>
            <span className="h-px w-8 bg-accent" />
            <Microlabel tone="accent">{kicker}</Microlabel>
          </div>
        ) : null}
        <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-tight text-white">
          {title}
        </h2>
        {lede ? <p className="mt-4 text-[15px] leading-relaxed text-muted">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
