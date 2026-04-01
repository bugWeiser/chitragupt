export interface GuideArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  body: string;
  isFeatured?: boolean;
}

export const guideArticles: GuideArticle[] = [
  {
    slug: "security-deposit-guide",
    category: "Tenant Rights",
    title: "Your Complete Guide to Getting Your Security Deposit Back",
    excerpt: "Every year, thousands of tenants lose their deposits unfairly. Here is exactly what the law says and what you should do, step by step.",
    readTime: "8 min",
    date: "2024-12-15",
    tags: ["Tenant Rights", "Deposit", "Legal Notice"],
    isFeatured: true,
    body: `## Why Landlords Get Away With It

Most tenants don't know their rights. Landlords count on this. The truth is, Indian law strongly protects your deposit — you just need to know how to use it.

## What the Law Actually Says

Under the Model Tenancy Act, 2021 and various state Rent Control Acts, your landlord is legally obligated to return your security deposit within a specified period after you vacate the premises.

> "The landlord shall refund the security deposit within one month of the tenant vacating the property, after deducting only documented and proven damages beyond normal wear and tear." — Model Tenancy Act, 2021

### Key Rights You Have

- Your landlord must return the deposit within 1-3 months (varies by state)
- They can only deduct for actual, proven damages — not normal wear and tear
- You have the right to an itemized deduction list
- Verbal agreements also count — you don't need a written contract
- Even without receipts, bank transfer records serve as proof

## Step-by-Step: What to Do

1. **Send a written demand** via WhatsApp or email. Keep screenshots. Be polite but clear. State the amount, the date you vacated, and give them 15 days.
2. **Send a formal legal notice** if they don't respond. This costs Rs. 500-2000 through a lawyer, or you can draft one yourself using our RTI generator adapted for legal notices.
3. **File a complaint** at your local Consumer Forum or Rent Authority. Filing fees are minimal (Rs. 100-500) and you don't need a lawyer.
4. **File a civil suit** as a last resort. This is rarely needed — most landlords pay up after a legal notice.

**IMPORTANT NOTE**
68% of landlords return the deposit after receiving a formal legal notice. You likely won't need to go to court.

## Common Excuses Landlords Use (And Why They're Wrong)

- "The walls are dirty" — Normal wear. Not deductible.
- "You didn't give notice" — Check your agreement. Most require 1 month, not more.
- "I already spent it" — Not your problem. Legal obligation remains.
- "Take me to court" — Call their bluff. Consumer Forum is fast and cheap.

## Documents You Should Keep

- Rent agreement (even photos of it)
- Bank transfer records of deposit payment
- Photos of the property when you moved in and out
- Any WhatsApp/email communication with landlord
- Your legal notice (if sent)`
  },
  {
    slug: "fir-refusal-what-to-do",
    category: "Police & FIR",
    title: "Police Refusing to File Your FIR? Here Are 5 Things You Can Do Right Now",
    excerpt: "It is illegal for police to refuse an FIR. If they do, you have powerful legal remedies — most people just don't know about them.",
    readTime: "6 min",
    date: "2024-12-10",
    tags: ["Police", "FIR", "Criminal Law", "Rights"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "consumer-complaint-online",
    category: "Consumer Rights",
    title: "How to File a Consumer Complaint Online in 2024 (Complete Process)",
    excerpt: "You can now file consumer complaints from your phone in under 10 minutes. No lawyer needed. Here is the exact process with screenshots.",
    readTime: "10 min",
    date: "2024-12-08",
    tags: ["Consumer Rights", "E-Filing", "Complaint"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "wrongful-termination-rights",
    category: "Workplace",
    title: "Fired Without Notice? Your Rights as an Employee in India",
    excerpt: "Indian labor law requires employers to follow specific procedures before termination. If they didn't, you may be entitled to compensation.",
    readTime: "7 min",
    date: "2024-12-05",
    tags: ["Employment", "Termination", "Labor Law"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "cyber-fraud-recovery",
    category: "Cyber Crime",
    title: "Lost Money to an Online Scam? Act Within 24 Hours for Best Recovery Chances",
    excerpt: "The golden window for recovering money lost to cyber fraud is the first 24 hours. Here is the exact sequence of calls and complaints to file.",
    readTime: "5 min",
    date: "2024-12-01",
    tags: ["Cyber Crime", "Online Fraud", "Recovery"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "rera-complaint-builder",
    category: "Property",
    title: "Builder Not Giving Possession? How to File a RERA Complaint",
    excerpt: "RERA gives homebuyers powerful rights against builder delays. Filing a complaint is free in most states and doesn't require a lawyer.",
    readTime: "9 min",
    date: "2024-11-28",
    tags: ["Property", "RERA", "Builder", "Real Estate"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "domestic-violence-protection",
    category: "Family Law",
    title: "Understanding the Protection of Women from Domestic Violence Act",
    excerpt: "Domestic violence isn't just physical. The law recognizes emotional, verbal, economic, and sexual abuse. Know what protection is available.",
    readTime: "11 min",
    date: "2024-11-25",
    tags: ["Family Law", "Domestic Violence", "Women's Rights"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "rti-filing-guide",
    category: "RTI & Government",
    title: "RTI for Beginners: How to Get Information from Any Government Office",
    excerpt: "The Right to Information Act is one of the most powerful tools citizens have. Filing one costs Rs. 10 and can expose corruption, delays, and negligence.",
    readTime: "7 min",
    date: "2024-11-20",
    tags: ["RTI", "Government", "Transparency"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "loan-harassment-rbi-rules",
    category: "Financial Fraud",
    title: "Recovery Agents Threatening You? Know the RBI Rules They Are Breaking",
    excerpt: "RBI has strict guidelines on loan recovery. Agents cannot call before 8 AM, threaten you, visit your workplace, or contact your family. Here is how to fight back.",
    readTime: "6 min",
    date: "2024-11-15",
    tags: ["Banking", "Loan Recovery", "RBI", "Harassment"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "bail-basics",
    category: "Police & FIR",
    title: "Bail in India: Types, Process, and Your Constitutional Right",
    excerpt: "Bail is the rule, jail is the exception. Understanding bail can mean the difference between freedom and unnecessary detention.",
    readTime: "8 min",
    date: "2024-11-10",
    tags: ["Bail", "Criminal Law", "Arrest", "Rights"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "medical-negligence-claim",
    category: "Know Your Rights",
    title: "How to File a Medical Negligence Complaint Against a Hospital or Doctor",
    excerpt: "If a hospital's carelessness caused harm, you have the right to compensation. The process starts with the State Medical Council.",
    readTime: "9 min",
    date: "2024-11-05",
    tags: ["Medical", "Negligence", "Compensation", "Hospital"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  },
  {
    slug: "tenant-eviction-rights",
    category: "Tenant Rights",
    title: "Can Your Landlord Evict You? Understanding Legal vs Illegal Eviction",
    excerpt: "No landlord can throw you out, change locks, or cut utilities without a court order. If they do, it is a criminal offense.",
    readTime: "6 min",
    date: "2024-10-30",
    tags: ["Tenant Rights", "Eviction", "Court Order"],
    body: "This article is being prepared by our legal research team and will be published soon. Check back shortly for the complete guide."
  }
];
