const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend/.env') });

console.log('--- DB DIAGNOSTICS ---');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('DB:', process.env.DB_NAME);

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function run() {
  try {
    const res = await pool.query('SELECT current_user, current_database()');
    console.log('Connection Success!');
    console.log('Current User:', res.rows[0].current_user);
    console.log('Current DB:', res.rows[0].current_database);
    
    const roles = await pool.query('SELECT rolname FROM pg_roles');
    console.log('Available Roles:', roles.rows.map(r => r.rolname).join(', '));
  } catch (err) {
    console.error('DIAGNOSTIC ERROR:', err.message);
    console.error('Full Error:', err);
  } finally {
    await pool.end();
  }
}

run();
