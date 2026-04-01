const router = require('express').Router();
const { authenticate, requireRole } = require('../../middleware/auth.middleware');
const { getDashboardStats } = require('./admin.controller');

router.get('/stats', authenticate, requireRole('admin'), getDashboardStats);

module.exports = router;
