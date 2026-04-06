const { Pool } = require('pg');
const dns = require('dns');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Force IPv4 DNS resolution to avoid ENETUNREACH on Render free tier
dns.setDefaultResultOrder('ipv4first');

// Use Supabase Connection Pooler if DB_HOST uses direct connection (IPv6 only)
// The pooler endpoint supports IPv4 which works on all hosting platforms
let dbHost = process.env.DB_HOST;
let dbPort = parseInt(process.env.DB_PORT) || 5432;

if (dbHost && dbHost.startsWith('db.') && dbHost.includes('.supabase.co')) {
  // Convert direct connection to pooler: db.XXXX.supabase.co → XXXX.pooler.supabase.com
  const projectRef = dbHost.replace('db.', '').replace('.supabase.co', '');
  dbHost = `${projectRef}.pooler.supabase.com`;
  dbPort = 6543; // Supabase pooler port (session mode)
  console.log(`[DB] Using Supabase Connection Pooler: ${dbHost}:${dbPort}`);
}

const pool = new Pool({
  host:     dbHost,
  port:     dbPort,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
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
