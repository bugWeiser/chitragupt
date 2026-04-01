export interface NewsItem {
  slug: string;
  category: "Scam Alert" | "Court Decision" | "Policy Change" | 
            "Consumer Warning" | "Awareness" | "Crime & Safety";
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  isAlert: boolean;
  body: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "upi-fraud-warning-2024",
    category: "Scam Alert",
    title: "New UPI Fraud Wave: Scammers Posing as Bank Officials Across 12 States",
    summary: "A coordinated UPI fraud ring has been targeting bank customers through fake customer care numbers. Victims report losing between Rs. 10,000 to Rs. 5,00,000. RBI has issued an advisory.",
    source: "The Hindu",
    sourceUrl: "#",
    date: "2024-12-15",
    isAlert: true,
    body: `A new wave of UPI fraud has been reported across 12 Indian states, with scammers posing as bank officials and customer care representatives.
    
## How the Scam Works

Victims receive calls from numbers appearing to be their bank's official helpline. The callers claim there is a "suspicious transaction" on the victim's account and ask them to "verify" by sharing their UPI PIN or OTP.

In some cases, scammers send a UPI collect request while on the call, asking the victim to "approve the verification."

## States Most Affected

Maharashtra, Karnataka, Delhi NCR, Tamil Nadu, Uttar Pradesh, Madhya Pradesh, Rajasthan, Gujarat, Telangana, West Bengal, Kerala, and Punjab.

## What RBI Says

The Reserve Bank of India has reiterated that no bank official will ever ask for your UPI PIN, OTP, or CVV over the phone. Any such call is a scam.

## What You Should Do

1. Never share OTP, UPI PIN, or CVV with anyone on a call
2. Hang up and call your bank's official number directly
3. Report fraud immediately at cybercrime.gov.in or call 1930
4. If money has already been transferred, report within 24 hours for the best chance of recovery`
  },
  {
    slug: "supreme-court-tenant-rights-2024",
    category: "Court Decision",
    title: "Supreme Court Strengthens Tenant Rights: Landlords Cannot Disconnect Utilities to Force Eviction",
    summary: "In a landmark ruling, the Supreme Court held that disconnecting water, electricity, or other essential services to force a tenant out constitutes criminal intimidation.",
    source: "LiveLaw",
    sourceUrl: "#",
    date: "2024-12-12",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by LiveLaw. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "consumer-protection-ecommerce-rules",
    category: "Policy Change",
    title: "New E-Commerce Rules 2024: Platforms Must Process Refunds Within 7 Days",
    summary: "The Ministry of Consumer Affairs has mandated that all e-commerce platforms must process refund requests within 7 working days or face penalties up to Rs. 50 lakh.",
    source: "Economic Times",
    sourceUrl: "#",
    date: "2024-12-10",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Economic Times. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "loan-app-harassment-crackdown",
    category: "Crime & Safety",
    title: "RBI Cracks Down on 300+ Illegal Loan Apps After Harassment Complaints Surge",
    summary: "Following a 400% increase in complaints about abusive recovery practices, RBI has blacklisted over 300 lending apps and directed Google and Apple to remove them.",
    source: "NDTV",
    sourceUrl: "#",
    date: "2024-12-08",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by NDTV. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "deepfake-sextortion-warning",
    category: "Scam Alert",
    title: "Deepfake Sextortion Cases Rise 300% in India: How to Protect Yourself",
    summary: "Cyber criminals are using AI-generated deepfake images to extort victims. Delhi Police reports a 300% increase in sextortion cases involving AI-manipulated photos.",
    source: "India Today",
    sourceUrl: "#",
    date: "2024-12-05",
    isAlert: true,
    body: "Full article coming soon. This story was originally reported by India Today. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "rera-builder-penalties",
    category: "Consumer Warning",
    title: "RERA Orders Builder to Pay Rs. 15 Lakh Compensation for 3-Year Possession Delay",
    summary: "In a precedent-setting order, Maharashtra RERA directed a prominent builder to compensate each buyer Rs. 15 lakh for delayed possession, plus interest on the deposited amount.",
    source: "Hindustan Times",
    sourceUrl: "#",
    date: "2024-12-02",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Hindustan Times. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "digital-arrest-scam",
    category: "Scam Alert",
    title: "'Digital Arrest' Scam: Fraudsters Impersonating CBI and Police Over Video Calls",
    summary: "A new scam involves callers claiming to be CBI or police officers, conducting fake 'digital arrests' over video calls and demanding money to 'clear your name.' Multiple victims have lost lakhs.",
    source: "The Indian Express",
    sourceUrl: "#",
    date: "2024-11-28",
    isAlert: true,
    body: "Full article coming soon. This story was originally reported by The Indian Express. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "women-workplace-harassment-guidelines",
    category: "Policy Change",
    title: "Government Mandates Internal Complaints Committee in All Offices with 10+ Employees",
    summary: "The Ministry of Labour has issued a strict directive requiring every establishment with 10 or more employees to constitute an Internal Complaints Committee under the POSH Act.",
    source: "Business Standard",
    sourceUrl: "#",
    date: "2024-11-25",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Business Standard. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "consumer-forum-amazon-penalty",
    category: "Court Decision",
    title: "Consumer Forum Orders Amazon to Pay Rs. 35,000 for Delivering Fake Product",
    summary: "A district consumer forum ruled in favor of a buyer who received a counterfeit product, ordering Amazon and the seller to jointly pay Rs. 35,000 in compensation.",
    source: "Bar and Bench",
    sourceUrl: "#",
    date: "2024-11-22",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Bar and Bench. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "property-registration-fraud-alert",
    category: "Consumer Warning",
    title: "Property Registration Fraud: Fake Registrars Operating in 5 States",
    summary: "Police have busted a gang operating fake sub-registrar offices that issued fraudulent property registration documents. Buyers are advised to verify registration online.",
    source: "Times of India",
    sourceUrl: "#",
    date: "2024-11-18",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Times of India. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "right-to-disconnect",
    category: "Awareness",
    title: "Should India Have a 'Right to Disconnect' Law? The Debate Intensifies",
    summary: "After a young employee's death linked to overwork, calls for a Right to Disconnect law — protecting employees from after-hours work communications — are growing louder.",
    source: "Scroll.in",
    sourceUrl: "#",
    date: "2024-11-15",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Scroll.in. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "insurance-claim-rejection",
    category: "Awareness",
    title: "5 Reasons Your Health Insurance Claim Gets Rejected (And How to Fight It)",
    summary: "Insurance companies reject nearly 15% of health claims. Most rejections are due to technicalities that can be challenged. Here is what IRDAI says about your rights.",
    source: "Moneycontrol",
    sourceUrl: "#",
    date: "2024-11-12",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Moneycontrol. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "motor-accident-tribunal-award",
    category: "Court Decision",
    title: "Motor Accident Tribunal Awards Rs. 48 Lakh to Family of Hit-and-Run Victim",
    summary: "The tribunal held the vehicle owner, driver, and insurance company jointly liable, setting a precedent for hit-and-run compensation in cases where the vehicle is identified.",
    source: "LiveLaw",
    sourceUrl: "#",
    date: "2024-11-08",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by LiveLaw. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "fake-job-offer-scam",
    category: "Scam Alert",
    title: "Fake Job Offer Scam on WhatsApp and Telegram: 50,000+ Indians Targeted",
    summary: "Scammers are sending fake job offers via WhatsApp and Telegram, asking victims to pay 'registration fees' or 'training charges.' The CBI has issued a national alert.",
    source: "Deccan Herald",
    sourceUrl: "#",
    date: "2024-11-05",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by Deccan Herald. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  },
  {
    slug: "senior-citizen-property-rights",
    category: "Awareness",
    title: "Senior Citizens Can Now Reclaim Property Transferred to Children Under New Amendment",
    summary: "The Maintenance and Welfare of Parents and Senior Citizens (Amendment) Act now allows senior citizens to revoke property transfers made to children who fail to provide care.",
    source: "The Hindu",
    sourceUrl: "#",
    date: "2024-11-01",
    isAlert: false,
    body: "Full article coming soon. This story was originally reported by The Hindu. We are preparing a detailed analysis with legal context and actionable steps for affected citizens."
  }
];
