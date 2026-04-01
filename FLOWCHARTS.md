# Chitragupta — Technical Flowcharts & Architecture Diagrams

> Hackathon reference document — visual breakdown of every user flow and security layer.

---

## 1. User Journey Flow (End-to-End)

```mermaid
flowchart TD
    A["🏠 User Lands on Homepage"] --> B{"Describe your\nlegal problem"}
    B --> C["AI Categorization Engine"]
    C --> D{"Category Identified"}
    
    D -->|"FIR/Police"| E1["📋 FIR Filing Guide"]
    D -->|"Unpaid Salary"| E2["💰 Labor Law Steps"]
    D -->|"Consumer Fraud"| E3["🛒 Consumer Court Path"]
    D -->|"Family Dispute"| E4["👨‍👩‍👧 Family Law Advice"]
    D -->|"Property/Rent"| E5["🏠 Tenant Rights"]
    D -->|"Personal Injury"| E6["🚑 Accident Claims"]
    
    E1 & E2 & E3 & E4 & E5 & E6 --> F["Step-by-Step Legal Roadmap"]
    F --> G{"Need More Help?"}
    
    G -->|"Yes"| H["👨‍⚖️ Connect with Lawyer"]
    G -->|"Generate RTI"| I["📝 RTI Document Generator"]
    G -->|"Emergency"| J["🚨 Emergency Helpline\n15100 / 112 / 181"]
    
    H --> K["💬 Encrypted Chat with Lawyer"]
    K --> L["📋 Case Tracked in My Case"]
    
    style A fill:#FF9933,color:#000
    style C fill:#000080,color:#fff
    style J fill:#dc2626,color:#fff
```

---

## 2. Authentication & Security Flow

```mermaid
flowchart TD
    A["User clicks Sign Up"] --> B["Registration Form\n(Name, Email, Phone, Password)"]
    B --> C{"Password Strength\nValidation"}
    C -->|"Weak"| B
    C -->|"Strong ✓"| D["Generate 6-digit OTP"]
    
    D --> E["Send OTP via Email + SMS"]
    E --> F{"User enters OTP\n(10 min expiry)"}
    F -->|"Wrong/Expired"| G["❌ Retry or Resend"]
    F -->|"Correct ✓"| H["✅ Account Created"]
    
    H --> I["User logs in"]
    I --> J{"Role Check"}
    
    J -->|"Admin"| K["TOTP 2FA Required\n(Google Authenticator)"]
    K --> L{"TOTP Code Valid?"}
    L -->|"No"| M["Try Backup Code"]
    L -->|"Yes ✓"| N["Issue JWT Pair"]
    
    J -->|"Litigant/Lawyer"| O["Optional SMS OTP"]
    O --> N
    
    N --> P["Access Token (15 min)\nRefresh Token (7 days)"]
    P --> Q["Token Rotation\non Refresh"]
    
    style D fill:#FF9933,color:#000
    style K fill:#dc2626,color:#fff
    style N fill:#16a34a,color:#fff
```

---

## 3. 5-Layer Security Architecture

```mermaid
flowchart TB
    subgraph L5["🔍 LAYER 5 — Vulnerability Scanner"]
        S1["Scheduled Self-Scan\n(Cron Job)"]
        S2["Scan All Endpoints"]
        S3["Generate CVSS Report"]
        S4["Deliver to Admin Dashboard"]
        S1 --> S2 --> S3 --> S4
    end
    
    subgraph L4["📊 LAYER 4 — Activity Monitoring"]
        M1["Winston Logger\n+ DB Transport"]
        M2["Immutable audit_logs\n(Append-Only SQL)"]
        M3["Push Notifications\n(FCM / Web Push)"]
        M4["Anomaly Detection\n(New Device, Geo)"]
        M1 --> M2
        M4 --> M3
    end
    
    subgraph L3["🛡️ LAYER 3 — Runtime Protection"]
        R1["WAF Middleware\n(XSS/SQLi/Path Traversal)"]
        R2["Rate Limiting\n(IP + User)"]
        R3["CORS Lockdown"]
        R4["Helmet Security Headers"]
        R5["HPP (Parameter Pollution)"]
    end
    
    subgraph L2["🔐 LAYER 2 — Authentication"]
        A1["JWT Access Token\n(15 min expiry)"]
        A2["Refresh Token\n(7 day + rotation)"]
        A3["TOTP 2FA\n(Admin Only)"]
        A4["Hashed Backup Codes"]
    end
    
    subgraph L1["👤 LAYER 1 — Registration"]
        I1["6-digit OTP\n(Email + SMS)"]
        I2["10-min Expiry"]
        I3["Password Strength\nEnforcement"]
        I4["Email/Phone\nVerification"]
    end
    
    L5 ~~~ L4 ~~~ L3 ~~~ L2 ~~~ L1
    
    style L5 fill:#1e1b4b,color:#fff
    style L4 fill:#172554,color:#fff
    style L3 fill:#1e3a5f,color:#fff
    style L2 fill:#0c4a6e,color:#fff
    style L1 fill:#164e63,color:#fff
```

---

## 4. Request Processing Pipeline

```mermaid
flowchart LR
    A["🌐 Incoming\nHTTP Request"] --> B["Helmet\n(Security Headers)"]
    B --> C["CORS\nValidation"]
    C --> D["Body Parser\n(10kb limit)"]
    D --> E["HPP\n(Anti-Pollution)"]
    E --> F["WAF Middleware\n(XSS/SQLi Scan)"]
    
    F -->|"🚫 Malicious"| G["403 Blocked\n+ Audit Log"]
    F -->|"✅ Clean"| H["Rate Limiter\n(IP + User)"]
    
    H -->|"🚫 Over Limit"| I["429 Too Many\nRequests"]
    H -->|"✅ Allowed"| J["Auth Middleware\n(JWT Verify)"]
    
    J -->|"🚫 Invalid"| K["401 Unauthorized"]
    J -->|"✅ Valid"| L["Route Handler\n(Controller)"]
    
    L --> M["Audit Middleware\n(Log to DB)"]
    M --> N["📤 JSON Response"]
    
    style A fill:#FF9933,color:#000
    style F fill:#dc2626,color:#fff
    style L fill:#16a34a,color:#fff
    style N fill:#000080,color:#fff
```

---

## 5. Database Entity Relationship

```mermaid
erDiagram
    USERS ||--o{ REFRESH_TOKENS : "has many"
    USERS ||--o{ BACKUP_CODES : "has many"
    USERS ||--o{ KNOWN_DEVICES : "has many"
    USERS ||--o{ AUDIT_LOGS : "generates"
    USERS ||--o{ NOTIFICATION_LOG : "receives"
    
    USERS {
        UUID id PK
        VARCHAR full_name
        VARCHAR email UK
        VARCHAR phone_number
        VARCHAR password_hash
        VARCHAR role
        BOOLEAN is_email_verified
        TEXT totp_secret
        BOOLEAN totp_enabled
        TEXT fcm_token
        INET last_login_ip
        INTEGER failed_login_attempts
        TIMESTAMPTZ locked_until
    }
    
    REFRESH_TOKENS {
        UUID id PK
        UUID user_id FK
        VARCHAR token_hash UK
        JSONB device_info
        INET ip_address
        TIMESTAMPTZ expires_at
        BOOLEAN revoked
    }
    
    BACKUP_CODES {
        UUID id PK
        UUID user_id FK
        VARCHAR code_hash
        BOOLEAN used
        TIMESTAMPTZ used_at
    }
    
    AUDIT_LOGS {
        BIGSERIAL id PK
        UUID user_id FK
        UUID admin_id FK
        VARCHAR event_type
        VARCHAR severity
        INET ip_address
        JSONB metadata
        TIMESTAMPTZ created_at
    }
    
    KNOWN_DEVICES {
        UUID id PK
        UUID user_id FK
        VARCHAR device_hash
        VARCHAR browser
        VARCHAR os
        BOOLEAN is_trusted
    }
    
    SECURITY_REPORTS {
        UUID id PK
        JSONB raw_findings
        TEXT ai_summary
        INTEGER critical_count
        INTEGER high_count
        INTEGER medium_count
        INTEGER low_count
    }
    
    NOTIFICATION_LOG {
        UUID id PK
        UUID user_id FK
        VARCHAR title
        TEXT body
        VARCHAR type
        BOOLEAN delivered
    }
```

---

## 6. Deployment Architecture

```mermaid
flowchart TB
    subgraph GH["GitHub Repository"]
        G1["main branch\n(auto-deploy trigger)"]
    end
    
    subgraph VC["Vercel Edge Network"]
        V1["Next.js 14\nSSR + Static"]
        V2["Serverless Functions\n(API Routes)"]
        V3["CDN\n(Global Edge)"]
    end
    
    subgraph DC["Docker Compose (Local/Staging)"]
        D1["PostgreSQL 15\n(Port 5432)"]
        D2["Redis 7\n(Port 6379)"]
    end
    
    subgraph BE["Express.js Backend"]
        B1["REST API\n(Port 5000)"]
        B2["Security Middleware\n(All 5 Layers)"]
        B3["Winston Logger\n(File + DB Transport)"]
    end
    
    GH -->|"git push"| VC
    V1 --> V3
    V2 --> B1
    B1 --> D1
    B1 --> D2
    B2 --> B3
    B3 --> D1
    
    style GH fill:#24292e,color:#fff
    style VC fill:#000,color:#fff
    style DC fill:#2496ED,color:#fff
    style BE fill:#000080,color:#fff
```

---

## 7. Notification Alert Flow

```mermaid
flowchart TD
    A["Security Event Triggered"] --> B{"Event Type"}
    
    B -->|"New Device Login"| C["🖥️ Detect Unknown\nDevice Hash"]
    B -->|"Document Accessed"| D["📄 Lawyer Views\nCase File"]
    B -->|"Suspicious Access"| E["🚨 Foreign IP /\nMultiple Failed Logins"]
    B -->|"Case Status Change"| F["📋 Case Moved\nto Next Stage"]
    
    C & D & E & F --> G["Notification Service"]
    
    G --> H{"User Has\nFCM Token?"}
    H -->|"Yes"| I["📱 FCM Push\nNotification"]
    H -->|"No"| J{"Web Push\nSubscription?"}
    J -->|"Yes"| K["🌐 Browser\nPush Alert"]
    J -->|"No"| L["📧 Email\nFallback"]
    
    I & K & L --> M["Log to\nnotification_log\ntable"]
    
    E --> N["🚨 Also Alert\nAll Admins"]
    
    style A fill:#FF9933,color:#000
    style E fill:#dc2626,color:#fff
    style N fill:#dc2626,color:#fff
    style M fill:#000080,color:#fff
```

---

*These diagrams render automatically on GitHub, in VS Code (with Mermaid extension), and in most markdown viewers.*
