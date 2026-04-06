const Redis = require('ioredis');
require('dotenv').config();

const host = (process.env.REDIS_HOST || '').trim();
const port = parseInt(process.env.REDIS_PORT) || 6379;
const username = (process.env.REDIS_USERNAME || 'default').trim();
const password = (process.env.REDIS_PASSWORD || '').trim();

// Construct standard Redis URI to ensure ioredis parses the credentials correctly
let redisUrl = process.env.REDIS_URL;
if (!redisUrl && host && password) {
  redisUrl = `redis://${username}:${password}@${host}:${port}`;
} else if (!redisUrl && host) {
  redisUrl = `redis://${host}:${port}`;
}

const config = {
  retryStrategy: (times) => Math.min(times * 50, 2000),
  // TLS can sometimes be required by Redis Cloud depending on the region/configuration
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
};

let redis;
if (redisUrl) {
  redis = new Redis(redisUrl, config);
} else {
  redis = new Redis(config);
}

redis.on('connect', () => console.log('[Redis] Connected'));
redis.on('error', (err) => console.error('[Redis] Error:', err.message));

module.exports = redis;
