const Redis = require('ioredis');
require('dotenv').config();

const config = {
  host:     (process.env.REDIS_HOST || '').trim(),
  port:     parseInt(process.env.REDIS_PORT) || 6379,
  username: (process.env.REDIS_USERNAME || 'default').trim(),
  password: (process.env.REDIS_PASSWORD || '').trim(),
  retryStrategy: (times) => Math.min(times * 50, 2000),
};

const redis = new Redis(config);

redis.on('connect', () => console.log('[Redis] Connected'));
redis.on('error', (err) => console.error('[Redis] Error:', err.message));

module.exports = redis;
