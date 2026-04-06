const { Pool } = require('pg');
const dns = require('dns');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Force IPv4 DNS resolution to avoid ENETUNREACH on Render (IPv6 not supported on free tier)
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max:      20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false }, // Required for Supabase cloud connections
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
