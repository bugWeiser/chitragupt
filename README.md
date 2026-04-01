<p align="center">
  <img src="https://img.shields.io/badge/⚖️_Chitragupta-India's_Legal_First--Response_System-FF9933?style=for-the-badge&labelColor=000080" alt="Chitragupta Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel" />
</p>

<p align="center">
  <b>🇮🇳 AI-powered legal aid for every Indian citizen.</b><br/>
  <i>Get instant clarity. Know your rights. Take action — in Hindi or English.</i>
</p>

<p align="center">
  <a href="https://chitragupt-topaz.vercel.app/">🌐 Live Demo</a> •
  <a href="https://chitragupt-topaz.vercel.app/admin">🛡️ Admin Panel</a> •
  <a href="#-architecture">📐 Architecture</a> •
  <a href="#-security-layers">🔒 Security</a> •
  <a href="#-getting-started">🚀 Setup</a>
</p>

---

## 🧠 The Problem

> **80% of Indians** cannot afford legal representation. Most don't even know their basic constitutional rights when facing police, landlords, employers, or domestic abuse.

Filing an FIR, claiming unpaid wages, or getting a consumer refund shouldn't require a ₹50,000 lawyer retainer. **Chitragupta** bridges this gap using AI to democratize access to justice.

---

## 💡 Our Solution

**Chitragupta** is a full-stack, AI-powered Legal First-Response Platform that:

1. **Listens** — A citizen describes their problem in plain Hindi or English
2. **Analyzes** — AI categorizes the legal issue (FIR, consumer fraud, family dispute, etc.)
3. **Guides** — Delivers step-by-step legal roadmaps with relevant IPC sections, templates, and jurisdiction-specific advice
4. **Connects** — Matches users with verified lawyers and enables real-time encrypted chat
5. **Protects** — Enterprise-grade 5-layer security ensures all legal documents and personal data remain tamper-proof

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Legal Triage** | NLP-based issue categorization across 6+ legal domains |
| 📝 **RTI Document Generator** | Auto-generate Right to Information applications |
| 👨‍⚖️ **Lawyer Matching** | Connect with verified lawyers by specialization & location |
| 💬 **Encrypted Legal Chat** | Real-time chat with end-to-end encryption |
| 🚨 **Emergency Mode** | One-tap emergency helpline access (15100, 112, 181) |
| 🌐 **Bilingual (EN/हिं)** | Full Hindi + English language support |
| 🔐 **5-Layer Security** | WAF, TOTP 2FA, JWT rotation, immutable audit logs |
| 📊 **Admin Command Center** | Glassmorphic security dashboard with CVSS vulnerability scanning |
| 🔔 **Push Notifications** | Real-time alerts for suspicious activity & case updates |
| 📱 **Fully Responsive** | Mobile-first design with dark mode support |

---

## 📐 Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Next.js 14   │  │   Tailwind   │  │  React Components    │   │
│  │  (App Router) │  │   CSS v3     │  │  (Glassmorphism UI)  │   │
│  └──────┬───────┘  └──────────────┘  └──────────────────────┘   │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    API GATEWAY                            │   │
│  │  Next.js API Routes  ──►  Express.js Backend (Port 5000) │   │
│  └──────────────────────────┬───────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                    SECURITY LAYER                                │
│         ┌───────────────────┼───────────────────────┐           │
│         │    Helmet │ WAF │ CORS │ HPP │ Rate Limit  │           │
│         └───────────────────┼───────────────────────┘           │
│                             │                                    │
│  ┌──────────────┐  ┌───────┴──────┐  ┌──────────────────────┐  │
│  │  JWT Engine   │  │  TOTP/2FA    │  │   OTP Verification   │  │
│  │  (15m + 7d)   │  │  (Speakeasy) │  │   (Email + SMS)      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                     DATA LAYER                                   │
│  ┌──────────────┐  ┌───────┴──────┐  ┌──────────────────────┐  │
│  │  PostgreSQL   │  │    Redis     │  │   Winston Logger     │  │
│  │  (15-Alpine)  │  │  (7-Alpine)  │  │   + DB Transport     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         │                                      │                 │
│         ▼                                      ▼                 │
│  ┌──────────────┐                    ┌──────────────────────┐   │
│  │  8 SQL Tables │                    │  Immutable Audit Log │   │
│  │  (Schema v1)  │                    │  (Append-Only)       │   │
│  └──────────────┘                    └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | SSR, Routing, SEO |
| **Styling** | Tailwind CSS v3 | Utility-first responsive design |
| **Auth** | Firebase Auth + Custom JWT | OAuth (GitHub), token management |
| **Backend** | Express.js 5.x | REST API server |
| **Database** | PostgreSQL 15 | Relational data, audit logs |
| **Cache** | Redis 7 | Rate limiting, session store |
| **Security** | Helmet, HPP, XSS-Clean | Request hardening |
| **2FA** | Speakeasy (TOTP) | Google Authenticator support |
| **Logging** | Winston + Daily Rotate | Structured audit trail |
| **Deployment** | Vercel + Docker Compose | CI/CD + local orchestration |

---

## 🔒 Security Layers

Chitragupta implements a **5-layer defense-in-depth** security architecture:

```
╔═══════════════════════════════════════════════════════════════╗
║                   LAYER 5 — VULNERABILITY SCANNER             ║
║   Automated endpoint self-scanning · CVSS scoring · AI       ║
║   reports delivered to Admin dashboard                        ║
╠═══════════════════════════════════════════════════════════════╣
║                   LAYER 4 — ACTIVITY MONITORING               ║
║   Immutable audit logs (append-only SQL) · Push alerts for   ║
║   new device login, document access, suspicious activity      ║
╠═══════════════════════════════════════════════════════════════╣
║                   LAYER 3 — RUNTIME PROTECTION                ║
║   WAF middleware (XSS/SQLi/Path Traversal) · IP & user       ║
║   rate limiting · CORS lockdown · Helmet headers              ║
╠═══════════════════════════════════════════════════════════════╣
║                   LAYER 2 — AUTHENTICATION                    ║
║   Admin TOTP 2FA (Google Authenticator) · JWT access (15m)   ║
║   + refresh (7d) with rotation · Hashed backup codes          ║
╠═══════════════════════════════════════════════════════════════╣
║                   LAYER 1 — REGISTRATION & IDENTITY           ║
║   6-digit OTP on signup (email + SMS) · 10-min expiry ·      ║
║   Password strength enforcement · Email/phone verification    ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🗄️ Database Schema

**8 production tables** designed for legal-platform compliance:

```
┌─────────────┐     ┌───────────────┐     ┌────────────────┐
│   users      │────▶│ refresh_tokens │     │  audit_logs    │
│              │     │               │     │  (APPEND-ONLY) │
│  • id (UUID) │     │ • token_hash  │     │  • event_type  │
│  • email     │     │ • device_info │     │  • severity    │
│  • totp_sec  │     │ • expires_at  │     │  • metadata    │
│  • fcm_token │     │ • revoked     │     │  • ip_address  │
└──────┬───────┘     └───────────────┘     └────────────────┘
       │
       ├──────────────┐──────────────┐──────────────────┐
       ▼              ▼              ▼                  ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────────────┐
│ backup_codes │ │  known   │ │ notification │ │ security_reports │
│              │ │ devices  │ │    _log      │ │                  │
│ • code_hash  │ │ • hash   │ │ • title      │ │ • raw_findings   │
│ • used       │ │ • browser│ │ • delivered  │ │ • ai_summary     │
│ • used_at    │ │ • os     │ │ • channel    │ │ • cvss scores    │
└──────────────┘ └──────────┘ └──────────────┘ └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Docker Desktop** (for PostgreSQL + Redis)
- **Git**

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/bugWeiser/chitragupt.git
cd chitragupt

# 2. Spin up PostgreSQL & Redis (via Docker)
docker compose up -d

# 3. Start the Backend
cd backend
npm install
npm run migrate    # Creates all 8 security tables
npm run dev        # → http://localhost:5000

# 4. Start the Frontend (new terminal)
cd ../frontend
npm install
npm run dev        # → http://localhost:3000
```

### Environment Variables

Create `backend/.env` using this template:

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=legalaid_db
DB_USER=postgres
DB_PASSWORD=postgres123

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT (change in production!)
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

---

## 📂 Project Structure

```
Chitragupt/
├── frontend/                    # Next.js 14 Application
│   ├── app/
│   │   ├── admin/               # 🛡️ Security Admin Dashboard
│   │   ├── chat/                # 💬 Encrypted Legal Chat
│   │   ├── dashboard/           # 📊 User Dashboard
│   │   ├── documents/           # 📝 RTI Generator
│   │   ├── get-help/            # 🤖 AI Legal Triage
│   │   ├── lawyers/             # 👨‍⚖️ Lawyer Directory
│   │   ├── login/               # 🔐 Authentication
│   │   ├── my-case/             # 📋 Case Management
│   │   └── register/            # ✍️ Registration
│   ├── components/
│   │   ├── admin/               # Admin Panel Components
│   │   │   ├── AuditLogTable    # Immutable Log Viewer
│   │   │   └── ScannerDashboard # CVSS Vulnerability Display
│   │   ├── auth/                # Auth Components
│   │   └── ui/                  # Shared UI (Navbar, Footer, FAB)
│   ├── hooks/                   # Custom Hooks (useAuth)
│   ├── context/                 # React Context (CaseContext)
│   └── lib/                     # Firebase, Auth Service
│
├── backend/                     # Express.js 5.x API
│   └── src/
│       ├── config/              # DB, Redis, Firebase, Email, Twilio
│       ├── database/
│       │   ├── migrations/      # SQL Schema (001_initial_schema.sql)
│       │   └── run-migrations.js # Node.js Migration Runner
│       ├── middleware/
│       │   ├── auth.middleware   # JWT Verification + Role Gates
│       │   ├── audit.middleware  # Auto Audit Logging
│       │   ├── rateLimit         # IP + User Rate Limiting
│       │   └── security          # WAF (XSS, SQLi, Path Traversal)
│       ├── modules/
│       │   ├── auth/            # Register, Login, Logout, Refresh
│       │   ├── otp/             # 6-digit OTP (Email + SMS)
│       │   ├── totp/            # TOTP 2FA (Google Authenticator)
│       │   ├── tokens/          # JWT Access + Refresh Rotation
│       │   ├── audit/           # Log Viewer + CSV/PDF Export
│       │   ├── notifications/   # FCM + Web Push Alerts
│       │   └── scanner/         # Vulnerability Self-Scanner
│       ├── jobs/                # Scheduled Security Scan Job
│       └── utils/               # Logger (Winston + DB Transport)
│
└── docker-compose.yml           # PostgreSQL 15 + Redis 7
```

---

## 🔗 API Endpoints

### Authentication (Layer 1 & 2)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register with OTP verification |
| `POST` | `/api/auth/verify-otp` | Verify 6-digit OTP code |
| `POST` | `/api/auth/login` | Login (returns JWT pair) |
| `POST` | `/api/auth/refresh` | Rotate JWT tokens |
| `POST` | `/api/auth/logout` | Revoke refresh token |
| `POST` | `/api/auth/totp/setup` | Generate TOTP QR for 2FA |
| `POST` | `/api/auth/totp/verify` | Verify TOTP code |

### Admin Security (Layer 4 & 5)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/logs` | Fetch immutable audit logs |
| `GET` | `/api/admin/logs/export/csv` | Export logs as CSV |
| `GET` | `/api/admin/logs/export/pdf` | Export logs as PDF |
| `POST` | `/api/admin/scanner/run` | Trigger vulnerability scan |
| `GET` | `/api/admin/scanner/reports` | Fetch scan reports |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/notifications/subscribe` | Register push subscription |
| `GET` | `/api/notifications/history` | Notification history |

---

## 🏆 Why Chitragupta Wins

| Criteria | Our Approach |
|----------|-------------|
| **Innovation** | First AI-powered legal triage system designed specifically for Indian law |
| **Impact** | Directly addresses access-to-justice gap affecting 1B+ citizens |
| **Security** | 5-layer defense-in-depth — beyond typical hackathon prototypes |
| **Completeness** | Full-stack: Frontend + Backend + DB + Auth + Admin + Deployment |
| **Scalability** | Containerized with Docker, deployed on Vercel edge network |
| **Bilingual** | Native Hindi + English support for true inclusivity |

---

## 👥 Team — BugWeisers

Built with ❤️ for justice, at the hackathon.

---

<p align="center">
  <img src="https://img.shields.io/badge/Made_in-🇮🇳_India-FF9933?style=for-the-badge&labelColor=138808" />
</p>
