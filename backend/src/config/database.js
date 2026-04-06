const { Pool } = require('pg');
const dns = require('dns');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Force IPv4 DNS resolution to avoid ENETUNREACH on platforms without IPv6
dns.setDefaultResultOrder('ipv4first');

// Build connection config
// If DB_POOLER_HOST is set, use it directly (Supabase Connection Pooler, IPv4-compatible)
// Otherwise fall back to DB_HOST (direct connection, may be IPv6-only)
const dbHost = process.env.DB_POOLER_HOST || process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_POOLER_PORT || process.env.DB_PORT) || 5432;
const dbUser = process.env.DB_POOLER_USER || process.env.DB_USER;

console.log(`[DB] Connecting to ${dbHost}:${dbPort} as ${dbUser}`);

const pool = new Pool({
  host:     dbHost,
  port:     dbPort,
  database: process.env.DB_NAME,
  user:     dbUser,
  password: process.env.DB_PASSWORD,
  max:      20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
  console.log('[DB] Supabase PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};
