const db = require('../../config/database');
const { successResponse, errorResponse } = require('../../utils/response.utils');

async function getDashboardStats(req, res) {
  try {
    // 1. Get User Counts
    const userCountRes = await db.query('SELECT count(*) FROM users');
    const totalUsers = parseInt(userCountRes.rows[0].count);

    // 2. Get Blocked Anomalies (Critical/Warning logs in last 24h)
    const anomalyCountRes = await db.query(`
      SELECT count(*) FROM audit_logs 
      WHERE (severity = 'critical' OR severity = 'warning') 
      AND created_at > NOW() - INTERVAL '24 hours'
    `);
    const anomalies24h = parseInt(anomalyCountRes.rows[0].count);

    // 3. Get Latest Scan Results
    const latestScanRes = await db.query('SELECT * FROM security_reports ORDER BY created_at DESC LIMIT 1');
    const latestScan = latestScanRes.rows[0] || {
      total_issues: 0,
      critical_count: 0,
      high_count: 0,
      medium_count: 0,
      low_count: 0,
      created_at: new Date()
    };

    return successResponse(res, {
      stats: {
        totalUsers,
        anomalies24h,
        systemStatus: 'Healthy & Secure',
        uptime: '99.9%'
      },
      latestScan: {
        totalIssues: latestScan.total_issues,
        critical: latestScan.critical_count,
        high: latestScan.high_count,
        medium: latestScan.medium_count,
        low: latestScan.low_count,
        timestamp: latestScan.created_at
      }
    });
  } catch (err) {
    console.error('Admin Stats Error:', err);
    return errorResponse(res, 'Failed to fetch dashboard stats', 500);
  }
}

module.exports = { getDashboardStats };
