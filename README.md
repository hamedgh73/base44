# Raven Protect

Premium marketing site and client console framework for **Raven Protect** — an enterprise and
residential security/integration company specialising in the Ubiquiti UniFi ecosystem, smart home
automation and structured network cabling.

## Stack

| Layer    | Technology                                  | Local URL |
| -------- | ------------------------------------------- | --------- |
| `web`    | Vite + React + Tailwind CSS v4              | :3000     |
| `api`    | Node + Express + `pg`                       | :8000     |
| `db`     | PostgreSQL 16                               | internal  |

The browser only ever talks to port **3000**; the Vite dev server proxies `/api` to the API over the
compose network, so there is no CORS layer and no public API port to secure.

## Running it (Base44 sandbox / local Docker)

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

That single command installs dependencies, applies the schema, seeds the catalogue and starts both
dev servers with live reload. See `AGENTS.md` for operational detail.

## Features

- **Scroll-driven hero** — a 3D render that pans and scales as the page scrolls (swap in a looping
  video by setting `heroVideo` in `web/src/lib/site.js`).
- **Capability pages** — UniFi Protect, UniFi Access, Smart Automation and Cabling & Network, each
  with an overview, capability grid, design discipline and delivery process.
- **Interactive product gallery** — hardware served from Postgres via `GET /api/products`, with
  hover-revealed technical specifications and category filters.
- **Lead capture** — `POST /api/consultations` validates and logs every "Book a Site Survey & Tech
  Consultation" submission to the `consultations` table and returns a reference number.
- **Client console framework** — "Client Console Link" sign-in with scrypt-hashed credentials and
  database-backed session tokens, showing monitored sites from `GET /api/portal/systems`.

## Client console demo access

```
email:    demo@ravenprotect.com
password: raven-console-2026
```

Demo seed data only — replace with real client provisioning before production use.
