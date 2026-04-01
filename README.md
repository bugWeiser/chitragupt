# Chitragupt — Your Legal Backup ⚖️
**India’s first AI-powered legal first-response system.** Built for citizens, verified by logic.

---

## 📚 1. Legal Content Sourcing
Our AI logic and fallback protocols strictly source from active Indian Legislation and recent Bharatiya Nyaya Sanhita (BNS) updates. The primary laws referenced in our modules include:

| Domain | Sourced Act / Legislation | Key Sections / Context |
| :--- | :--- | :--- |
| **Domestic Violence** | *Protection of Women from Domestic Violence Act, 2005 (PWDVA)* | Right to reside in a shared household, protection orders. |
| **Cruelty & Abuse** | *Bharatiya Nyaya Sanhita (BNS) & CrPC* | Section 498A (Cruelty by husband or relatives) & National Helpline 1091. |
| **Tenant Rights** | *Model Tenancy Act & State Rent Control Acts* | Security deposit recovery timelines and unlawful deductions. |
| **Employment** | *Payment of Wages Act & Industrial Disputes Act* | Unlawful withholding of wages and worker rights. |
| **Cyber Fraud** | *Information Technology Act, 2000 & RBI Frameworks* | Zero Liability Framework (reporting within 3 days) & 1930 Helpline. |
| **Information** | *Right to Information Act, 2005* | Section 6(1) for filing basic civic inquiries to government bodies. |

---

## 🤖 2. LLM Prompt Templates
Chitragupt utilizes a highly constrained, specialized system prompt to process incoming user scenarios into structured JSON outputs, ensuring predictable, non-hallucinated legal formatting.

**Core System Prompt (`frontend/app/api/analyze/route.ts`):**
```text
You are Chitragupt AI, a specialized Legal Analysis engine for Indian citizens.
The user will provide a "scenario".
You MUST output your response EXACTLY as a valid JSON object with NO markdown formatting, NO backticks, and NO extra text.
The JSON must follow this exact schema:
{
  "leverage": [
    { "title": "Legal Right/Act name", "desc": "Explanation of how it applies" },
    { "title": "Another Right", "desc": "Explanation" }
  ],
  "steps": [
    { "title": "Step 01 - Immediate: Action", "desc": "What to do right now" },
    { "title": "Step 02 - Secondary: Action", "desc": "Next step" }
  ]
}
Do NOT wrap the response in \`\`\`json \`\`\`. Just return the raw JSON string.
```
*Temperature Setting: 0.3 (to ensure deterministic outputs)*

---

## 📝 3. Sample RTI & Complaint Templates

### A. Right to Information (RTI) Template
*Used inside `/rti` for browser-native PDF extraction.*
```text
APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF THE RTI ACT, 2005

To,
The Public Information Officer (PIO)
[Department Name]

1. Name of the Applicant: [User's Full Name]
2. Complete Address: [User's Address], [City] - [Pincode]

3. Details of information required:
[User's Custom Query Injected Here]

4. Application Fee: I have enclosed the fee of Rs. 10/- via Postal Order/Demand Draft.
Date  : ___________
Place : ___________
Signature of Applicant: _______________
```

### B. Legal Notice (Complaint Letter) Template
*Used inside `/documents` for legal demands.*
```text
LEGAL NOTICE BY REGISTERED POST (RPAD)
From: [User Name]
To: [Opponent Name]
Date: [Current Date]

Subject: Legal Notice for [Demand]

Under specific instructions from my client, I am serving you with the following:
1. That an agreement was established, and a sum of ₹[Amount] was deposited.
2. That despite vacating/completing timelines on [Date of Incident], you failed to [Target Demand].
3. This withholding is equivalent to 'Criminal Breach of Trust' under BNS.
4. I therefore demand you fulfill this within [Deadline] days. failing which legal action will proceed.
```

---

## 📂 4. Legal Aid Directory Data Format
Our Directory dynamically routes citizens to localized help using a standardized JSON locale schema (`frontend/locales/...`). 

**Data Structure Example:**
```json
"directory": {
  "types": {
    "districtCourt": "Courts",
    "legalAid": "Free Legal Aid (NALSA/SLSA)",
    "consumerForum": "Consumer Forum",
    "policeCyber": "Police & Cyber Cell",
    "womensCommission": "Women's Commission"
  }
}
```

---

## 🌍 5. Bilingual UI Context
The entire platform is fully localized between **English** and **Hindi**, utilizing tightly scoped i18n JSON files.
*(For presentation: Show live screenshots of the Navbar and Hero Section seamlessly transitioning between the `EN` and `HI` states.)*
- Nav Links: Explore Issues -> समस्याएँ देखें
- AI Engine: Analyze Case -> मेरा केस जाँचें
- Action: Guide -> मार्गदर्शिका

---

## ⚠️ 6. Disclaimer Text Presence
As required, **Legal Disclaimers** are permanently affixed, visible, and uninterruptible across the platform.
1. **Chatbot Fallbacks (`/ai-assist`)**: Every response strictly ends with:
   > `*Disclaimer: This is AI-generated guidance, not formal legal advice.*`
2. **Global Footer (`Navbar.tsx` layer)**: Every single page displays:
   > `General Info Only. Not legal advice.`
3. **Legal Generators (`/documents` & `/rti`)**:
   > `⚠️ Professional legal documents drafted based on Indian Law. Ensure accuracy. Cannot replace physical lawyer verification.`

---

## 🖨️ 7. Browser-Native Generated Document Sample
To ensure 100% fail-safe reliability during deployment without cross-server blocking, Chitragupt utilizes `window.print()` wrappers for our PDFs, securely triggering native, client-side printing algorithms that instantly flatten CSS components into perfectly formatted A4 outputs.

**Sample Outputs available live at:**
- `/rti` : Click "Download RTI PDF"
- `/my-case` : Click "Case Summary PDF"
- `/documents` : Legal Notice Generator

---
*Built for the 2026 Hack-A-Sprint.*
