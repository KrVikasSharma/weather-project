import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configure pool with SSL in production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

// Handle unexpected errors
pool.on('error', (err) => {
  console.error('❌ Unexpected PG client error', err);
  process.exit(-1); // In Docker/PM2, container/service will restart
});

// Export a helper for queries
export default {
  query: (text, params) => pool.query(text, params),
  pool,
};