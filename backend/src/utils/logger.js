const winston = require('winston');
const Transport = require('winston-transport');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

class PostgresAuditTransport extends Transport {
  constructor(opts) {
    super(opts);
  }
  async log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    
    // Dynamically require db to avoid circular dependency
    let db;
    try {
      db = require('../config/database');
    } catch(e) { return callback(); }

    if (info.type === 'audit' || info.message.includes('[Audit]') || info.event_type) {
      try {
        const query = `
          INSERT INTO audit_logs (event_type, severity, error_message, metadata)
          VALUES ($1, $2, $3, $4)
        `;
        const values = [
          info.event_type || 'system_event',
          info.level === 'error' ? 'critical' : 'info',
          info.level === 'error' ? info.message : null,
          JSON.stringify(info)
        ];
        await db.query(query, values);
      } catch (err) {
        // Ignore DB connection failures to ensure app stays alive
      }
    }
    callback();
  }
}

const logDir = path.join(__dirname, '../../logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'legal-aid-platform' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new PostgresAuditTransport({ level: 'info' }),
    new DailyRotateFile({
      dirname:        logDir,
      filename:       'audit-%DATE%.log',
      datePattern:    'YYYY-MM-DD',
      zippedArchive:  true,
      maxSize:        '20m',
      maxFiles:       '30d',
      level:          'info',
    }),
    new DailyRotateFile({
      dirname:        logDir,
      filename:       'error-%DATE%.log',
      datePattern:    'YYYY-MM-DD',
      zippedArchive:  true,
      maxSize:        '20m',
      maxFiles:       '30d',
      level:          'error',
    }),
  ],
});

module.exports = logger;
