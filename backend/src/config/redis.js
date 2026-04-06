const Redis = require('ioredis');
require('dotenv').config();

const host = (process.env.REDIS_HOST || '').trim();
const port = parseInt(process.env.REDIS_PORT) || 6379;
const username = (process.env.REDIS_USERNAME || 'default').trim();
const password = (process.env.REDIS_PASSWORD || '').trim();

// temporary hardcode to debug WRONGPASS
let redisUrl = `redis://default:A4a9b1wcvfyzy32a25plsmz69mvh6zw3yd0oypr5lq3g9lf3qmy@redis-12832.crce284.ap-neast-2-1.ec2.cloud.redislabs.com:12832`;


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
