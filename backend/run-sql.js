const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function run() {
  const targetFile = process.argv[2] || 'src/database/migrations/001_initial_schema.sql';
  const sqlFile = path.resolve(__dirname, targetFile);
  console.log(`[SQL] Reading from ${sqlFile}`);
  const sql = fs.readFileSync(sqlFile, 'utf8').trim();

  // If the file contains a trigger or function, run the whole thing as one block
  if (sql.includes('CREATE OR REPLACE FUNCTION') || sql.includes('CREATE TRIGGER')) {
    console.log('[SQL] Executing entire block (Trigger/Function detected)...');
    try {
      await pool.query(sql);
      console.log('[SQL] Execution complete.');
    } catch (err) {
      console.error('[SQL Error]', err.message);
    }
  } else {
    // Current splitting logic for simple scripts
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
          console.log(`[SQL] Executing stmt ${i+1}/${statements.length}...`);
          await pool.query(stmt);
        } catch (err) {
          console.error(`[SQL ERROR] Statement ${i+1} failed!`);
          console.error(`Statement: ${stmt.substring(0, 100)}...`);
          console.error(`Error:`, err.message);
          if (err.message.includes('already exists')) {
            console.log('--- Continuing anyway ---');
            continue;
          }
          break; 
        }
      }
  }
  await pool.end();
}

run();
