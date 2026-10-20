# AGENTS.md — Raven Protect

Notes for anyone (human or agent) working on this repository. Only non-obvious operational
knowledge lives here — see `README.md` for the product overview.

## What this repo is

The repository started as an empty `README.md`, so the whole application was authored here: a
**Vite + React + Tailwind v4** frontend (`web/`) and a **Node + Express + Postgres** API (`api/`).

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d
```

Services: `db` (Postgres 16) → `migrate` (one-shot schema + seed) → `api` (:8000) → `web` (:3000).
`api` and `web` both run live-reload dev servers from the bind-mounted source, so edits appear
without a rebuild.

To confirm it is actually up:

```bash
docker compose -f docker-compose.base44.yml ps          # all three healthy
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000  # 200
curl -s localhost:3000/api/products | head -c 200        # catalogue JSON via the proxy
```

Port 3000 must serve **unhashed source** (`curl -s localhost:3000/src/main.jsx` returns JSX
modules). If it ever returns a hashed production bundle, the compose wiring is wrong and the edit
loop is broken.

## Things that are easy to get wrong

- **Migrations do not re-run on a plain `up`.** `migrate` is a one-shot service; once its container
  has exited, `up -d` leaves it alone. After editing `api/scripts/migrate.mjs` or the seed data,
  re-run it explicitly:
  ```bash
  docker compose -f docker-compose.base44.yml run --rm migrate
  ```
  The script is idempotent (`CREATE TABLE IF NOT EXISTS`, `ON CONFLICT`), so re-running is safe.
  Product rows are upserted, so catalogue edits propagate; the demo client's password is
  `DO NOTHING`-guarded so it is never silently reset.

- **Healthchecks probe real endpoints.** There is deliberately no `/health` route. The `api`
  healthcheck fetches `GET /api/products` and the `web` healthcheck fetches the dev server root.
  Do not add a health-only endpoint; configure checks in compose only.

- **File watching needs polling.** Bind mounts do not reliably emit inotify events in this sandbox.
  Vite runs with `server.watch.usePolling` and nodemon with `--legacy-watch`. Removing either will
  make hot reload silently stop working.

- **No CORS layer, by design.** The browser only ever reaches port 3000; Vite proxies `/api` to
  `http://api:8000` over the compose network (`VITE_API_PROXY_TARGET`). Keep frontend requests
  relative (`/api/...`) — switching to an absolute API URL would reintroduce cross-origin problems.

- **Preview host allowlist is gated on the sandbox flag.** `web/vite.config.js` appends
  `.<BASE44_SANDBOX_HOST_DOMAIN>` to `server.allowedHosts` **only** when
  `BASE44_PREVIEW_MODE === '1'`, and compose passes `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  through. With the flag unset the dev server keeps its default localhost-only behaviour. Do not
  hardcode a sandbox hostname or a `*` wildcard.

- **No external credentials are required.** Postgres credentials are local-only and inlined in
  compose; nothing needs to be supplied by a human. `secrets` is empty in
  `.base44/environment.json`. Do not route local database credentials through `set_secrets`.

## Stateful data

The `db_data` volume persists across restarts and branches. Never delete it to "reset" — re-run
`migrate` instead. The seeded demo console account is `demo@ravenprotect.com` /
`raven-console-2026` (development seed only; replace with real provisioning before production).

## Verifying a change

1. Frontend edits hot-reload; backend edits trigger a nodemon restart — check
   `docker compose -f docker-compose.base44.yml logs api` after a restart.
2. Lead capture: submit the form at `/contact`, then confirm the row and its reference:
   ```bash
   docker compose -f docker-compose.base44.yml exec -T db \
     psql -U raven -d ravenprotect -c "SELECT reference, name, services FROM consultations;"
   ```
3. Client console: sign in at `/portal` with the demo account. Signed out, `/portal/console` must
   redirect back to `/portal` — if console data renders without a session, the gate is broken.
4. There is no unit-test suite; verification is by exercising the running app.
