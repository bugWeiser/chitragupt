// In-Memory Mock Redis for Hackathon/Demo environment
// Replaces ioredis due to broken Redis Cloud credentials (WRONGPASS)

const store = new Map();
const expiryTimeouts = new Map();

const redisMock = {
  async setex(key, ttlSeconds, value) {
    store.set(key, String(value));
    if (expiryTimeouts.has(key)) clearTimeout(expiryTimeouts.get(key));
    expiryTimeouts.set(key, setTimeout(() => {
      store.delete(key);
      expiryTimeouts.delete(key);
    }, ttlSeconds * 1000));
    return 'OK';
  },

  async get(key) {
    return store.has(key) ? store.get(key) : null;
  },

  async del(key) {
    const existed = store.has(key);
    store.delete(key);
    if (expiryTimeouts.has(key)) {
      clearTimeout(expiryTimeouts.get(key));
      expiryTimeouts.delete(key);
    }
    return existed ? 1 : 0;
  },

  async incr(key) {
    const current = store.has(key) ? parseInt(store.get(key), 10) : 0;
    const next = current + 1;
    store.set(key, String(next));
    return next;
  },

  async expire(key, ttlSeconds) {
    if (!store.has(key)) return 0;
    if (expiryTimeouts.has(key)) clearTimeout(expiryTimeouts.get(key));
    expiryTimeouts.set(key, setTimeout(() => {
      store.delete(key);
      expiryTimeouts.delete(key);
    }, ttlSeconds * 1000));
    return 1;
  },

  on(event, cb) {
    if (event === 'connect') {
      setTimeout(() => cb(), 10);
      console.log('[Redis] Mock In-Memory Cache Connected (Bypass WRONGPASS)');
    }
  }
};

module.exports = redisMock;
