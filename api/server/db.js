import pg from 'pg';

const { Pool } = pg;

// Local development Postgres, provided by docker-compose.base44.yml.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});
