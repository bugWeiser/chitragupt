const winston = require('winston');
const Transport = require('winston-transport');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

class TrafficLogTransport extends Transport {
  constructor(opts) {
    super(opts);
  }
  async log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    if (info.type !== 'traffic') return callback();

    let db;
    try {
      db = require('../config/database');
    } catch(e) { return callback(); }

    try {
      const query = `
        INSERT INTO traffic_logs (ip_address, method, path, status, duration_ms, user_agent, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const values = [
        info.ip || '0.0.0.0',
        info.method || 'GET',
        info.path || '/',
        info.status || 200,
        info.duration || 0,
        info.userAgent || 'unknown',
        info.userId || null
      ];
      await db.query(query, values);
    } catch (err) {
      // Silent fail for performance
    }
    callback();
  }
}

class SystemLogTransport extends Transport {
  constructor(opts) {
    super(opts);
  }
  async log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    
    // We log everything that isn't a raw traffic log to the main audit/system table
    if (info.type === 'traffic') return callback();

    let db;
    try {
      db = require('../config/database');
    } catch(e) { return callback(); }

    try {
      const query = `
        INSERT INTO audit_logs (event_type, severity, error_message, metadata)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [
        info.event_type || info.type || 'system_event',
        info.level || 'info',
        info.level === 'error' ? info.message : null,
        JSON.stringify(info)
      ];
      await db.query(query, values);
    } catch (err) {
      // Silent fail
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
    new TrafficLogTransport({ level: 'info' }),
    new SystemLogTransport({ level: 'info' }),
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
