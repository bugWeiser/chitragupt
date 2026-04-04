const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const fs = require('fs');
const db = require('../config/database');
const logger = require('../utils/logger');

async function runMigrations() {
  const migrationsPath = path.join(__dirname, 'migrations');
  
  try {
    const files = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.sql')).sort();
    
    if (files.length === 0) {
      logger.info('[Migrations] No SQL files found to execute.');
      return;
    }

    const client = await db.pool.connect();
    logger.info('[Migrations] Connection established. Starting migrations...');

    try {
      await client.query('BEGIN');
      
      for (const file of files) {
        logger.info(`[Migrations] Executing: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsPath, file), 'utf8');
        await client.query(sql);
      }
      
      await client.query('COMMIT');
      logger.info('[Migrations] All migrations completed successfully.');
    } catch (e) {
      await client.query('ROLLBACK');
      logger.error('[Migrations] Transaction rolled back due to error.', { error: e.message });
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error('[Migrations] Fatal error running migrations', { error: err.message });
  } finally {
    process.exit(0);
  }
}

runMigrations();
