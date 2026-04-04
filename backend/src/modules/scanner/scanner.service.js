const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const axios = require('axios');
const db    = require('../../config/database');
const logger = require('../../utils/logger');
const path = require('path');

/**
 * TRIGGER CLOUD-NATIVE SECURITY SCAN (Zero-Footprint)
 * Replaces ZAP with NPM Audit + Gemini Synthesis
 */
async function triggerScan() {
  const startTime = Date.now();
  logger.info('[Scanner] Initiating zero-footprint cloud security scan...');

  try {
    // 1. Run Internal Code Security Audit (npm audit)
    let auditData = { vulnerabilities: {} };
    try {
      // Navigate to project root for npm audit
      const projectRoot = path.resolve(__dirname, '../../../');
      const { stdout } = await execPromise('npm audit --json', { cwd: projectRoot });
      auditData = JSON.parse(stdout);
    } catch (auditErr) {
      // npm audit exits with non-zero if vulnerabilities are found
      if (auditErr.stdout) {
        try {
          auditData = JSON.parse(auditErr.stdout);
        } catch (e) {
          logger.error('[Scanner] Failed to parse audit JSON:', e.message);
        }
      }
    }

    const findings = formatAuditFindings(auditData);

    // 2. AI Security Synthesis (Gemini 1.5 Flash)
    const aiSummary = await generateAIReport(findings);

    // 3. Save Production Report to Supabase
    const duration = Date.now() - startTime;
    
    const criticalCount = findings.filter(f => f.severity === 'critical').length;
    const highCount     = findings.filter(f => f.severity === 'high').length;
    const mediumCount   = findings.filter(f => f.severity === 'moderate' || f.severity === 'medium').length;
    const lowCount      = findings.filter(f => f.severity === 'low').length;

    const { rows } = await db.query(`
      INSERT INTO security_reports (
        report_type, raw_findings, ai_summary, 
        total_issues, critical_count, high_count, medium_count, low_count,
        scan_duration_ms, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      'cloud_orchestrated_scan',
      JSON.stringify(findings),
      aiSummary,
      findings.length,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      duration,
      'completed'
    ]);

    logger.info(`[Scanner] Cloud scan complete. ID: ${rows[0].id}`);
    return { 
      success: true, 
      reportId: rows[0].id, 
      findings, 
      aiSummary,
      counts: { critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount }
    };
  } catch (err) {
    logger.error('[Scanner] Cloud scan failed:', err.message);
    throw err;
  }
}

function formatAuditFindings(auditData) {
  const findings = [];
  const vulns = auditData.vulnerabilities || {};
  
  Object.keys(vulns).forEach(name => {
    const v = vulns[name];
    findings.push({
      id:       v.via?.[0]?.source?.toString() || `npm-${name}`,
      name:     `Vulnerability in ${name}`,
      severity: v.severity,
      description: `Package ${name} (${v.range}) has a ${v.severity} vulnerability. Fix: ${v.fixAvailable ? 'Update package' : 'Manual review needed'}.`,
      tags:     ['code_security', 'dependency']
    });
  });

  return findings;
}

async function generateAIReport(findings) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY missing');

    const prompt = `You are a cloud security orchestrator for the Chitragupta Platform.
Analyze these code security audit findings (NPM Audit) and provide a professional Security Health Report.
Include:
1. Executive Summary (Professional tone)
2. Priority Remediation Plan (Fix these packages first)
3. Cloud Armor/WAF recommendations to mitigate library risks.

Findings: ${JSON.stringify(findings.slice(0, 15), null, 2)}

Format: Markdown, clear headings, actionable advice.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "AI Security Synthesis completed.";
  } catch (err) {
    logger.error('[Scanner] Gemini synthesis failed:', err.message);
    return `AI Synthesis unavailable. Detailed review of ${findings.length} dependency issues recommended.`;
  }
}

async function getLatestReports(limit = 10) {
  const { rows } = await db.query(
    'SELECT * FROM security_reports ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return rows;
}

module.exports = { triggerScan, getLatestReports };
