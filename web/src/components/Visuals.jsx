import Microlabel from './Microlabel.jsx';

/**
 * Abstract blueprint-style visuals built from primitives — they read as system
 * readouts rather than stock photography, which is the point of the design.
 */

export function CameraMatrix() {
  const tiles = [
    { id: 'CAM-01', zone: 'Driveway approach', tag: 'AI · Vehicle' },
    { id: 'CAM-04', zone: 'Main entry', tag: 'AI · Person' },
    { id: 'CAM-07', zone: 'Perimeter — north', tag: 'Line cross' },
    { id: 'CAM-11', zone: 'Garage interior', tag: 'Package' },
  ];

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <Microlabel tone="accent">UNVR · Live matrix</Microlabel>
        <span className="font-mono text-[10px] text-muted">14-day retention</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="relative overflow-hidden border border-hairline bg-ink/80 p-3"
          >
            <div className="blueprint-fine absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent-bright">{tile.id}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
              </div>
              <p className="mt-6 text-[11px] text-slate-300">{tile.zone}</p>
              <p className="mt-1 font-mono text-[10px] text-muted">{tile.tag}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
        <span className="microlabel">Storage: local NVR · 0 cloud fees</span>
        <span className="font-mono text-[10px] text-accent-bright">REC ●</span>
      </div>
    </div>
  );
}

export function DoorMatrix() {
  const doors = [
    { name: 'Main entry', mode: 'NFC + mobile', state: 'Unlocked 08:12' },
    { name: 'Loading bay', mode: 'Fob', state: 'Locked' },
    { name: 'Executive floor', mode: 'Mobile + PIN', state: 'Scheduled' },
    { name: 'Server room', mode: 'PIN + badge', state: 'Locked' },
  ];

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <Microlabel tone="accent">Access Hub · Door state</Microlabel>
        <span className="font-mono text-[10px] text-muted">Audit trail: local</span>
      </div>

      <ul className="mt-2">
        {doors.map((door) => (
          <li
            key={door.name}
            className="flex items-center justify-between gap-4 border-b border-hairline-soft py-3.5 last:border-0"
          >
            <div>
              <p className="text-[13px] text-slate-200">{door.name}</p>
              <p className="mt-1 font-mono text-[10px] text-muted">{door.mode}</p>
            </div>
            <span className="font-mono text-[10px] text-accent-bright">{door.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RackDiagram() {
  const units = [
    { label: 'Patch panel — 24 port Cat6A', tone: 'idle' },
    { label: 'UniFi Switch Pro — 48 PoE', tone: 'live' },
    { label: 'UNVR — 4 bay', tone: 'live' },
    { label: 'Access Hub ×2', tone: 'live' },
    { label: 'UPS — 1500VA', tone: 'idle' },
  ];

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <Microlabel tone="accent">Rack elevation · 12U</Microlabel>
        <span className="font-mono text-[10px] text-muted">Dressed &amp; labelled</span>
      </div>

      <div className="mt-4 space-y-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex items-center justify-between gap-4 border border-hairline bg-ink/70 px-3.5 py-2.5"
          >
            <span className="text-[12px] text-slate-300">{unit.label}</span>
            <span className="flex items-center gap-2">
              <span
                className={
                  unit.tone === 'live'
                    ? 'h-1.5 w-1.5 rounded-full bg-accent-bright'
                    : 'h-1.5 w-1.5 rounded-full bg-muted/60'
                }
              />
              <span className="font-mono text-[10px] text-muted">
                {unit.tone === 'live' ? 'ACTIVE' : 'STANDBY'}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={
              index % 7 === 3
                ? 'h-2 w-full rounded-sm bg-muted/35'
                : 'h-2 w-full rounded-sm bg-accent/70'
            }
          />
        ))}
      </div>
    </div>
  );
}
