# Chitragupta — Security Architecture Document

> Deep-dive reference for the 5-Layer Defense-in-Depth security system.

---

## Executive Summary

Chitragupta handles sensitive legal data — FIR reports, case files, personal identification, and lawyer-client communications. A breach doesn't just expose data; it puts vulnerable people at risk. Our security architecture reflects this responsibility.

---

## Layer 1 — Registration & Identity Verification

### Purpose
Prevent fake account creation on a legal platform where document integrity is paramount.

### Implementation

| Feature | Detail |
|---------|--------|
| **OTP Verification** | 6-digit code sent via Email + SMS on registration |
| **OTP Expiry** | 10-minute window; cryptographically random generation |
| **Password Strength** | Minimum 8 characters, mixed case, number, special character |
| **Email Verification** | Required before full account activation |
| **Phone Verification** | Required for lawyer accounts |
| **Account Locking** | Auto-locks after 5 failed login attempts |

### Code Location
```
backend/src/modules/otp/          → OTP generation & verification
backend/src/modules/auth/         → Registration with validation
backend/src/modules/auth/auth.validators.js → Input sanitization
```

---

## Layer 2 — Authentication & Token Management

### Purpose
Ensure only verified users access the platform, with elevated security for administrators.

### Implementation

| Feature | Detail |
|---------|--------|
| **JWT Access Token** | 15-minute expiry, issued on login |
| **JWT Refresh Token** | 7-day expiry with one-time rotation |
| **Token Rotation** | Old refresh token is revoked on each refresh |
| **Admin 2FA** | TOTP via Google Authenticator / Authy (Speakeasy library) |
| **Backup Codes** | 10 hashed recovery codes generated on 2FA setup |
| **Device Tracking** | `known_devices` table fingerprints browser + OS + IP |

### Token Flow
```
Login → [Access Token (15m)] + [Refresh Token (7d)]
                                         │
                    After 15m: POST /api/auth/refresh
                                         │
                    [New Access Token] + [New Refresh Token]
                    (Old refresh token revoked)
```

### Code Location
```
backend/src/modules/tokens/      → JWT issuance & rotation
backend/src/modules/totp/        → TOTP 2FA setup & verification
backend/src/middleware/auth.middleware.js → JWT verification gate
```

---

## Layer 3 — Runtime Protection

### Purpose
Block malicious requests before they reach business logic.

### Implementation

| Middleware | Protection | Package |
|-----------|------------|---------|
| **Helmet** | Security headers (CSP, HSTS, X-Frame-Options) | `helmet` |
| **WAF** | XSS payload detection, SQL injection blocking, path traversal prevention | Custom + `xss-clean` |
| **Rate Limiter** | IP-based: 100 req/15min (general), 5 req/15min (auth) | `express-rate-limit` |
| **CORS** | Locked to `FRONTEND_URL` only | `cors` |
| **HPP** | HTTP Parameter Pollution prevention | `hpp` |
| **Body Limit** | Request body capped at 10kb | Express built-in |

### Request Pipeline Order
```
Request → Helmet → CORS → Body Parser → HPP → WAF → Rate Limiter → Auth → Handler
```

### Code Location
```
backend/src/middleware/security.middleware.js  → WAF + CORS config
backend/src/middleware/rateLimit.middleware.js  → Rate limiting rules
backend/src/app.js                             → Middleware chain order
```

---

## Layer 4 — Activity Monitoring & Alerts

### Purpose
Create a tamper-evident audit trail and alert users/admins of security events in real-time.

### Audit Log System

| Feature | Detail |
|---------|--------|
| **Storage** | PostgreSQL `audit_logs` table (append-only) |
| **Tamper Protection** | `REVOKE UPDATE, DELETE, TRUNCATE ON audit_logs FROM PUBLIC` |
| **Dual Transport** | Winston writes to both rotating log files AND PostgreSQL |
| **Filterable** | By user, date, severity, event type |
| **Exportable** | CSV and PDF export endpoints |

### Events Logged

| Event | Severity | Trigger |
|-------|----------|---------|
| User Login | `info` | Successful authentication |
| Failed Login | `warning` | Wrong password |
| New Device Login | `warning` | Unknown device fingerprint |
| Document Accessed | `info` | Lawyer views case file |
| Settings Changed | `warning` | Admin modifies config |
| SQL Injection Attempt | `critical` | WAF detects malicious payload |
| Account Locked | `critical` | 5+ failed login attempts |
| TOTP Verification | `info` | Admin 2FA check |

### Push Notification Alerts

| Alert Type | Recipients | Channel |
|-----------|------------|---------|
| New Device Login | Affected User | FCM + Web Push |
| Document Accessed | Document Owner | FCM + Web Push |
| Suspicious Activity | Affected User + All Admins | FCM + Web Push |
| Case Status Change | Case Litigant | FCM + Web Push |

### Code Location
```
backend/src/utils/logger.js                           → Winston + PostgresAuditTransport
backend/src/middleware/audit.middleware.js              → Auto-logging middleware
backend/src/modules/audit/                             → Log viewer + CSV/PDF export
backend/src/modules/notifications/notification.service.js → Push alerts
```

---

## Layer 5 — Vulnerability Scanner

### Purpose
Proactively discover security weaknesses before attackers do.

### Implementation

| Feature | Detail |
|---------|--------|
| **Self-Scan** | Automated scanning of the platform's own endpoints |
| **Schedule** | Cron-based job (configurable interval) |
| **CVSS Scoring** | Critical / High / Medium / Low classification |
| **AI Report** | Generated summary with remediation suggestions |
| **Admin Dashboard** | Visual CVSS breakdown with animated progress bars |
| **Scan History** | All reports stored in `security_reports` table |

### Scan Checks
1. Open redirect detection
2. Missing security headers
3. Rate limit bypass attempts
4. Authentication bypass attempts
5. Information disclosure (error messages, stack traces)

### Code Location
```
backend/src/modules/scanner/scanner.controller.js → Scan trigger + report retrieval
backend/src/jobs/securityScan.job.js              → Scheduled scan job
frontend/components/admin/ScannerDashboard.tsx     → CVSS visualization
```

---

## Database Security

### Schema Hardening

```sql
-- Audit logs are append-only (tamper-evident)
REVOKE UPDATE, DELETE, TRUNCATE ON audit_logs FROM PUBLIC;

-- Passwords never stored in plaintext
-- password_hash column uses bcrypt with salt rounds = 12

-- Backup codes stored as bcrypt hashes
-- code_hash column in backup_codes table

-- Refresh tokens stored as SHA-256 hashes
-- token_hash column in refresh_tokens table
```

### Indexes for Performance
```sql
CREATE INDEX idx_audit_logs_user_id    ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_severity   ON audit_logs(severity);
CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX idx_refresh_tokens_user   ON refresh_tokens(user_id);
CREATE INDEX idx_known_devices_user    ON known_devices(user_id);
CREATE INDEX idx_backup_codes_user     ON backup_codes(user_id);
```

---

## Compliance Alignment

| Standard | Coverage |
|----------|----------|
| **OWASP Top 10** | XSS (A7), SQLi (A1), Broken Auth (A2), Security Headers (A5) |
| **IT Act 2000 (India)** | Section 43A — Reasonable Security Practices |
| **GDPR Principles** | Data minimization, audit trail, access logging |
| **DISHA (India)** | Digital health data protection alignment |

---

*This document should be presented alongside the FLOWCHARTS.md visual diagrams for maximum judge impact.*
