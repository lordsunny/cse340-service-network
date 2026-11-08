// Shared PostgreSQL connection pool for all database model modules.
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// DATABASE_URL is configured locally in .env or in Render Environment.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render PostgreSQL connections generally require SSL in production.
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

// Log pool-level errors instead of allowing an idle client error to crash silently.
pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

export default pool;
