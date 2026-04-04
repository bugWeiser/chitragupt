const logger = require('../utils/logger');

function trafficLogger(req, res, next) {
  const start = Date.now();

  // Hook into response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Only log operational paths, ignore static/health checks if needed
    // But user asked for "ALL the logs", so we log everything.
    
    logger.info({
      type:      'traffic',
      ip:        req.ip || req.connection.remoteAddress,
      method:    req.method,
      path:      req.originalUrl || req.url,
      status:    res.statusCode,
      duration:  duration,
      userAgent: req.headers['user-agent'],
      userId:    req.user ? req.user.id : null,
    });
  });

  next();
}

module.exports = trafficLogger;
