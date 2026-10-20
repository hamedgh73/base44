import crypto from 'node:crypto';
import { pool } from '../server/db.js';

// Demo console account so the "Client Console" framework can be exercised.
// Development seed data only — replace with real client provisioning in production.
const DEMO_CLIENT = {
  name: 'Demo Client',
  email: 'demo@ravenprotect.com',
  password: 'raven-console-2026',
};

const SCHEMA = `
CREATE TABLE IF NOT EXISTS products (
  slug        text PRIMARY KEY,
  name        text NOT NULL,
  category    text NOT NULL,
  tagline     text NOT NULL,
  summary     text NOT NULL,
  specs       jsonb NOT NULL DEFAULT '{}'::jsonb,
  accent      text NOT NULL DEFAULT '#006fff',
  sort_order  integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS consultations (
  id            bigserial PRIMARY KEY,
  reference     text NOT NULL UNIQUE,
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  property_type text NOT NULL,
  services      text[] NOT NULL DEFAULT '{}',
  message       text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portal_clients (
  id            bigserial PRIMARY KEY,
  name          text NOT NULL,
  email         text NOT NULL UNIQUE,
  password_salt text NOT NULL,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portal_sessions (
  token      text PRIMARY KEY,
  client_id  bigint NOT NULL REFERENCES portal_clients(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS client_systems (
  id         bigserial PRIMARY KEY,
  client_id  bigint NOT NULL REFERENCES portal_clients(id) ON DELETE CASCADE,
  site       text NOT NULL,
  system     text NOT NULL,
  detail     text NOT NULL,
  status     text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, site, system)
);
`;

const PRODUCTS = [
  {
    slug: 'unifi-protect-g5-pro',
    name: 'UniFi Protect G5 Pro',
    category: 'cameras',
    tagline: 'Flagship 4K turret with on-board AI',
    summary:
      'Our default specification for primary entrances and driveways: true 4K optics, colour-at-night imaging and local processing with no recurring subscription.',
    accent: '#006fff',
    sortOrder: 1,
    specs: {
      Resolution: '4K (8MP) @ 30 fps',
      Sensor: '1/2" CMOS, 102.4° HFOV',
      'Night vision': 'Colour at night, IR + flood LED',
      'AI detection': 'Person / vehicle / package',
      Storage: 'Local NVR — no subscription',
      Power: 'PoE+ (802.3at)',
      Rating: 'IP66 · IK10 vandal resistant',
      Audio: 'Two-way with built-in speaker',
    },
  },
  {
    slug: 'unifi-protect-ai-bullet',
    name: 'UniFi Protect AI Bullet',
    category: 'cameras',
    tagline: 'Long-range analytics for perimeter coverage',
    summary:
      'Purpose-built for fence lines, gates and parking areas where licence-plate capture and vehicle classification matter more than wide-angle coverage.',
    accent: '#006fff',
    sortOrder: 2,
    specs: {
      Resolution: '4K (8MP) @ 30 fps',
      Sensor: '1/1.8" CMOS, 4–12 mm varifocal',
      'Night vision': 'IR up to 40 m, colour at night',
      'AI detection': 'Vehicle, plate, person, line-cross',
      Storage: 'Local NVR — no subscription',
      Power: 'PoE+ (802.3at)',
      Rating: 'IP67 · IK10',
      Audio: 'Two-way audio ready',
    },
  },
  {
    slug: 'unifi-protect-ai-theta',
    name: 'UniFi Protect AI Theta',
    category: 'cameras',
    tagline: 'Discreet multi-lens, flush-mount design',
    summary:
      'The architectural choice for interior sightlines: lens, sensor and processor separate from the housing so nothing visible disrupts a finished space.',
    accent: '#00d4ff',
    sortOrder: 3,
    specs: {
      Resolution: '4K (8MP) per lens',
      Sensor: 'Split sensor + lens modules',
      'Night vision': 'IR, low-lux colour',
      'AI detection': 'Person / occupancy / loiter',
      Storage: 'Local NVR — no subscription',
      Power: 'PoE (802.3af)',
      Rating: 'Discreet in-ceiling installation',
      Audio: 'Optional flush microphone',
    },
  },
  {
    slug: 'unifi-protect-g5-dome',
    name: 'UniFi Protect G5 Dome',
    category: 'cameras',
    tagline: 'Vandal-resistant indoor / outdoor dome',
    summary:
      'Compact, tamper-hardened coverage for lobbies, corridors and service entrances where discretion and durability both matter.',
    accent: '#006fff',
    sortOrder: 4,
    specs: {
      Resolution: '2K (4MP) @ 30 fps',
      Sensor: '1/2.5" CMOS, 100.4° HFOV',
      'Night vision': 'IR up to 15 m',
      'AI detection': 'Person / vehicle',
      Storage: 'Local NVR — no subscription',
      Power: 'PoE (802.3af)',
      Rating: 'IP65 · IK08',
      Audio: 'Built-in microphone',
    },
  },
  {
    slug: 'unifi-access-hub',
    name: 'UniFi Access Hub',
    category: 'access',
    tagline: 'PoE controller for up to four doors',
    summary:
      'The head-end for every UniFi Access deployment we build: locks, readers and exits land here, with power, fail-safe logic and audit trail handled locally.',
    accent: '#00d4ff',
    sortOrder: 1,
    specs: {
      Doors: 'Up to 4 doors per hub',
      Credentials: 'NFC, mobile, PIN, fob',
      Unlock: 'Relay-driven fail-safe / fail-secure',
      Interface: 'PoE, optional 12V output',
      Integration: 'UniFi Protect event tie-in',
      Management: 'UniFi Access application',
      'Audit trail': 'Local, exportable',
      Rating: 'DIN / rack mountable',
    },
  },
  {
    slug: 'unifi-access-reader-pro',
    name: 'UniFi Access Reader Pro',
    category: 'access',
    tagline: 'Touchscreen reader with mobile unlock',
    summary:
      'A readable, high-contrast entry point that supports card, fob, PIN and mobile credentials — with on-device feedback so staff never guess whether they are through.',
    accent: '#006fff',
    sortOrder: 2,
    specs: {
      Credentials: 'NFC / MIFARE, BLE mobile, PIN',
      Display: 'Colour touchscreen, status ring',
      Unlock: 'Card, PIN, app, remote operator',
      Interface: 'PoE (802.3af)',
      Integration: 'Intercom + door relay',
      Management: 'UniFi Access application',
      'Audit trail': 'Every read logged',
      Rating: 'Indoor rated, flush mount',
    },
  },
  {
    slug: 'unifi-access-intercom',
    name: 'UniFi Access Intercom',
    category: 'access',
    tagline: 'Video intercom with remote door release',
    summary:
      'Connects the front door to a desk, a phone or a mobile device anywhere — with two-way video, so a decision never depends on a buzzer.',
    accent: '#006fff',
    sortOrder: 3,
    specs: {
      Video: 'HD camera with wide-angle lens',
      Audio: 'Two-way, echo cancelling',
      Unlock: 'Remote release from any client',
      Interface: 'PoE (802.3af)',
      Integration: 'UniFi Access + Protect events',
      Management: 'UniFi Access application',
      'Audit trail': 'Call and release history',
      Rating: 'IP55 exterior rated',
    },
  },
];

const DEMO_SYSTEMS = [
  {
    site: 'Raven Ridge Residence',
    system: 'UniFi Protect',
    detail: '8 × G5 Pro · UNVR · 14-day retention',
    status: 'online',
  },
  {
    site: 'Raven Ridge Residence',
    system: 'UniFi Access',
    detail: 'Main entry + garage · 6 credentials active',
    status: 'online',
  },
  {
    site: 'Raven Ridge Residence',
    system: 'Structured Cabling',
    detail: 'Cat6A · 24-port patch panel · 6 APs',
    status: 'online',
  },
  {
    site: 'Harbour Works HQ',
    system: 'UniFi Protect',
    detail: '22 × AI Bullet · dual UNVR · 30-day retention',
    status: 'online',
  },
  {
    site: 'Harbour Works HQ',
    system: 'UniFi Access',
    detail: '11 doors · Access Hub ×3 · fob + mobile',
    status: 'attention',
  },
  {
    site: 'Harbour Works HQ',
    system: 'Smart Automation',
    detail: 'Control4 · 6 zones · lighting + AV',
    status: 'online',
  },
];

async function waitForDatabase() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (error) {
      if (attempt === 30) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function seedProducts() {
  for (const product of PRODUCTS) {
    await pool.query(
      `INSERT INTO products (slug, name, category, tagline, summary, specs, accent, sort_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (slug) DO UPDATE
               SET name = EXCLUDED.name,
                   category = EXCLUDED.category,
                   tagline = EXCLUDED.tagline,
                   summary = EXCLUDED.summary,
                   specs = EXCLUDED.specs,
                   accent = EXCLUDED.accent,
                   sort_order = EXCLUDED.sort_order`,
      [
        product.slug,
        product.name,
        product.category,
        product.tagline,
        product.summary,
        JSON.stringify(product.specs),
        product.accent,
        product.sortOrder,
      ],
    );
  }
}

async function seedDemoClient() {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(DEMO_CLIENT.password, salt, 64).toString('hex');

  await pool.query(
    `INSERT INTO portal_clients (name, email, password_salt, password_hash)
          VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    [DEMO_CLIENT.name, DEMO_CLIENT.email, salt, hash],
  );

  const { rows } = await pool.query('SELECT id FROM portal_clients WHERE email = $1', [
    DEMO_CLIENT.email,
  ]);
  const clientId = rows[0].id;

  for (const system of DEMO_SYSTEMS) {
    await pool.query(
      `INSERT INTO client_systems (client_id, site, system, detail, status)
            VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (client_id, site, system) DO UPDATE
               SET detail = EXCLUDED.detail,
                   status = EXCLUDED.status`,
      [clientId, system.site, system.system, system.detail, system.status],
    );
  }
}

async function main() {
  await waitForDatabase();
  console.log('[migrate] database reachable, applying schema');
  await pool.query(SCHEMA);
  await seedProducts();
  await seedDemoClient();
  console.log(`[migrate] ready — ${PRODUCTS.length} products, demo console account ${DEMO_CLIENT.email}`);
}

main()
  .then(() => pool.end())
  .catch(async (error) => {
    console.error('[migrate] failed', error);
    await pool.end();
    process.exit(1);
  });
