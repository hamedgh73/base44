import crypto from 'node:crypto';
import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);

const ALLOWED_SERVICES = [
  'Video Surveillance',
  'Access Control',
  'Smart Home Automation',
  'Network Cabling',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SESSION_HOURS = 12;

app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

/** Keeps async handler rejections inside Express' error pipeline. */
const wrap = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

function newReference() {
  return `RP-${Date.now().toString(36).toUpperCase()}${crypto.randomInt(100, 999)}`;
}

function verifyPassword(password, salt, hash) {
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

/* ------------------------------------------------------------------ *
 * Product catalogue — powers the interactive gallery on the website.
 * ------------------------------------------------------------------ */

app.get(
  '/api/products',
  wrap(async (_req, res) => {
    const { rows } = await pool.query(
      `SELECT slug, name, category, tagline, summary, specs, accent
         FROM products
        ORDER BY category, sort_order, name`,
    );
    res.json({ products: rows });
  }),
);

/* ------------------------------------------------------------------ *
 * Lead capture — every consultation request is logged in Postgres.
 * ------------------------------------------------------------------ */

app.post(
  '/api/consultations',
  wrap(async (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim().slice(0, 160);
    const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200);
    const phone = String(body.phone ?? '').trim().slice(0, 60);
    const propertyType = String(body.propertyType ?? '').trim().slice(0, 80);
    const message = String(body.message ?? '').trim().slice(0, 2000);
    const services = Array.isArray(body.services)
      ? body.services.filter((service) => ALLOWED_SERVICES.includes(service))
      : [];

    if (name.length < 2) return res.status(400).json({ error: 'Please enter your full name.' });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (!propertyType) return res.status(400).json({ error: 'Please select a property type.' });
    if (services.length === 0) return res.status(400).json({ error: 'Select at least one service.' });

    const reference = newReference();
    const { rows } = await pool.query(
      `INSERT INTO consultations (reference, name, email, phone, property_type, services, message)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING reference, created_at`,
      [reference, name, email, phone, propertyType, services, message],
    );

    res.status(201).json({ reference: rows[0].reference, receivedAt: rows[0].created_at });
  }),
);

/* ------------------------------------------------------------------ *
 * Client console — session-token framework for monitored sites.
 * ------------------------------------------------------------------ */

app.post(
  '/api/portal/login',
  wrap(async (req, res) => {
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const password = String(req.body?.password ?? '');
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { rows } = await pool.query(
      `SELECT id, name, email, password_salt, password_hash
         FROM portal_clients
        WHERE email = $1`,
      [email],
    );

    const client = rows[0];
    if (!client || !verifyPassword(password, client.password_salt, client.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    await pool.query(
      `INSERT INTO portal_sessions (token, client_id, expires_at)
            VALUES ($1, $2, now() + interval '${SESSION_HOURS} hours')`,
      [token, client.id],
    );

    res.json({ token, client: { name: client.name, email: client.email } });
  }),
);

app.get(
  '/api/portal/systems',
  wrap(async (req, res) => {
    const header = req.get('authorization') ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) return res.status(401).json({ error: 'Missing session token.' });

    const { rows } = await pool.query(
      `SELECT c.name AS client_name,
              c.email AS client_email,
              s.site,
              s.system,
              s.detail,
              s.status,
              s.updated_at
         FROM portal_sessions ps
         JOIN portal_clients c ON c.id = ps.client_id
         LEFT JOIN client_systems s ON s.client_id = c.id
        WHERE ps.token = $1
          AND ps.expires_at > now()`,
      [token],
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' });
    }

    res.json({
      client: { name: rows[0].client_name, email: rows[0].client_email },
      systems: rows
        .filter((row) => row.system)
        .map(({ site, system, detail, status, updated_at }) => ({
          site,
          system,
          detail,
          status,
          updatedAt: updated_at,
        })),
    });
  }),
);

app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));

// eslint-disable-next-line no-unused-vars -- Express identifies error middleware by arity.
app.use((err, _req, res, _next) => {
  console.error('[api] unhandled error', err);
  res.status(500).json({ error: 'Unexpected server error. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`Raven Protect API listening on :${PORT}`);
});
