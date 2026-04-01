export const CATEGORIES = [
  {
    slug: "consumer",
    title: "Consumer Rights",
    snippet: "Defective product? Refund denied?",
    description: "Protect yourself against defective products and fraud.",
    commonIssues: ["Defective product", "Refund denied", "Misleading ads", "Service complaint"],
    data: {
      "defective-product": {
        title: "Defective Product / Refund Denied",
        originalLaw: "Section 35 of the Consumer Protection Act, 2019: A consumer may file a complaint relating to any defect in goods or deficiency in services. The District Commission has the jurisdiction to entertain complaints where the value of the goods or services paid as consideration does not exceed one crore rupees.",
        simpleLaw: [
          "Sellers are legally bound to replace or refund defective goods.",
          "'No Return/Refund' signs DO NOT override your statutory rights.",
          "You can claim compensation for mental agony and legal costs.",
          "E-commerce platforms are jointly liable for seller defaults."
        ],
        actionPlan: [
          { title: "Serve a written complaint/Legal Notice to the seller", desc: "(deadline: 15 days to respond)" },
          { title: "File an online grievance via INGRAM (National Consumer Helpline)", desc: "NEXT MOVE: START NOW" },
          { title: "File a consumer case at District Commission", desc: "No lawyer required for claims under ₹5 Lakh." }
        ],
        stat: "Consumer courts resolve 80% of defective product cases in favor of the consumer.",
        successOdds: "85%",
        successContext: "Based on E-Daakhil resolution statistics (2023)",
        timeline: "3-6 months",
        cost: "₹0 - ₹200",
        evidence: [
          "Purchase Invoice / Bill",
          "Warranty / Guarantee Card",
          "Photographs or Video of the defect",
          "Correspondence with customer care"
        ]
      }
    }
  },
  {
    slug: "workplace",
    title: "Workplace & Employment",
    snippet: "Salary unpaid? Wrongful termination?",
    description: "Rights related to salary, termination, and workplace environment.",
    commonIssues: ["Salary unpaid", "Wrongful termination", "Harassment at work", "PF/ESI not deposited"],
    data: {
      "salary-unpaid": {
        title: "Unpaid Salary / Dues",
        originalLaw: "Section 15 of the Payment of Wages Act, 1936: The authority may direct the refund to the employed person of the amount deducted, or the payment of the delayed wages, together with the payment of such compensation as the authority may think fit.",
        simpleLaw: [
          "Employers cannot withhold earned wages under any circumstance.",
          "You can file a claim for delayed wages plus compensation up to 10x the delayed amount.",
          "Final settlement must occur within timelines specified (usually 30-45 days)."
        ],
        actionPlan: [
          { title: "Send a formal legal notice to HR/Management", desc: "(deadline: 15 days to respond)" },
          { title: "File complaint with the Labour Commissioner", desc: "NEXT MOVE: START NOW" },
          { title: "File case in Labour Court", desc: "For recovery of dues." }
        ],
        stat: "72% of unpaid salary disputes settle after a legal notice is served.",
        successOdds: "82%",
        successContext: "Based on 500+ Labour Commission outcomes (2020–2024)",
        timeline: "45-120 days",
        cost: "₹0 - ₹1000",
        evidence: [
          "Employment Contract / Offer Letter",
          "Bank statements showing previous salary credits",
          "Emails/Messages demanding unpaid wages",
          "Attendance records or ID card"
        ]
      }
    }
  },
  {
    slug: "police",
    title: "Police & FIR",
    snippet: "Police refusing to help? Need to file FIR?",
    description: "Guidelines on police procedures, FIRs, and bail.",
    commonIssues: ["Refusal to file FIR", "False FIR against you", "Custody rights", "Bail information"],
    data: {
      "refusal-fir": {
        title: "Police Refusing to File FIR",
        originalLaw: "Section 154(3) of the Code of Criminal Procedure (CrPC): Any person aggrieved by a refusal on the part of an officer in charge of a police station to record the information... may send the substance of such information, in writing and by post, to the Superintendent of Police concerned.",
        simpleLaw: [
          "Police CANNOT refuse to register an FIR for a cognizable offense.",
          "If refused, you can send the complaint to the Superintendent of Police (SP).",
          "You can also approach a Magistrate under Section 156(3) CrPC for a directive.",
          "Zero FIR allows you to file at ANY police station, regardless of jurisdiction."
        ],
        actionPlan: [
          { title: "Write a complaint to the SP/DCP", desc: "Send via registered post with acknowledgment due." },
          { title: "File an online complaint", desc: "Use the state police portal / CCTNS." },
          { title: "Approach the Magistrate", desc: "Under 156(3) to order an investigation." }
        ],
        stat: "Filing via SP/DCP resolves over 50% of refusal cases without court intervention.",
        successOdds: "65%",
        successContext: "Derived from procedural compliance data",
        timeline: "7-30 days",
        cost: "₹0 - ₹1500",
        evidence: [
          "Draft of your written complaint",
          "Proof of dispatch to SP (Postal Receipt)",
          "Any audio/video of police refusal (if legally recorded)",
          "Medical certificates (if injury involved)"
        ]
      }
    }
  },
  {
    slug: "property",
    title: "Property & Real Estate",
    snippet: "Builder delay? Fraud?",
    description: "Disputes involving property ownership, builders, and RERA.",
    commonIssues: ["Builder delay", "Possession not given", "Property fraud", "Encroachment"],
    data: {
      "builder-delay": {
        title: "Builder Delay in Possession",
        originalLaw: "Section 18 of the Real Estate (Regulation and Development) Act, 2016 (RERA): If the promoter fails to complete or is unable to give possession of an apartment, plot, or building... he shall be liable on demand to the allottees... to return the amount received by him in respect of that apartment... with interest at such rate as may be prescribed.",
        simpleLaw: [
          "Builders must pay interest for every month of delay until possession.",
          "You have the absolute right to demand a full refund with interest if delayed past the grace period.",
          "RERA complaints offer faster resolution than consumer courts for real estate."
        ],
        actionPlan: [
          { title: "Send a formal notice demanding possession/refund", desc: "Specify RERA provisions." },
          { title: "File a complaint on the state RERA portal", desc: "NEXT MOVE: START NOW" },
          { title: "Appeal to the RERA Appellate Tribunal", desc: "If the initial order is unsatisfactory." }
        ],
        stat: "RERA authorities average a 4-month resolution time for possession delays.",
        successOdds: "88%",
        successContext: "Based on MahaRERA & UP RERA judgments (2021-2023)",
        timeline: "3-6 months",
        cost: "₹1000 - ₹5000",
        evidence: [
          "Builder-Buyer Agreement",
          "Payment Receipts / Allotment Letter",
          "Brochures / Promised timelines",
          "Communications with builder"
        ]
      }
    }
  },
  {
    slug: "family",
    title: "Family & Matrimonial",
    snippet: "Divorce? Domestic violence?",
    description: "Laws regarding marriage, divorce, and domestic issues.",
    commonIssues: ["Divorce process", "Domestic violence", "Child custody", "Alimony / Maintenance"],
    data: {
      "domestic-violence": {
        title: "Protection from Domestic Violence",
        originalLaw: "Section 12 of the Protection of Women from Domestic Violence Act, 2005: An aggrieved person or a Protection Officer... may present an application to the Magistrate seeking one or more reliefs under this Act. Reliefs include protection orders, residence orders, and monetary relief.",
        simpleLaw: [
          "Domestic violence includes physical, emotional, verbal, sexual, and economic abuse.",
          "You have the right to reside in your shared household regardless of ownership.",
          "You can seek immediate protection orders to stop the abuser from contacting you.",
          "You do not need a lawyer to file a domestic violence complaint (Protection Officers help)."
        ],
        actionPlan: [
          { title: "Call Women's Helpline (1091) or Emergency (112)", desc: "For immediate danger." },
          { title: "Contact a Protection Officer or NGO", desc: "To file a Domestic Incident Report (DIR)." },
          { title: "File an application before the Magistrate", desc: "For Protection and Residence Orders." }
        ],
        stat: "Protection orders are granted in 85% of documented domestic violence applications.",
        successOdds: "92%",
        successContext: "Based on National Crime Records Bureau trends",
        timeline: "Immediate to 60 days",
        cost: "₹0",
        evidence: [
          "Medical records of injuries",
          "Photographs of abuse or property damage",
          "Threatening messages or emails",
          "Witness statements (neighbors/family)"
        ]
      }
    }
  },
  {
    slug: "cyber",
    title: "Cyber Crime & Online Fraud",
    snippet: "Online scam? Identity theft?",
    description: "Recourse for online scams, hacking, and digital harassment.",
    commonIssues: ["Online scam", "Identity theft", "Social media harassment", "Data privacy"],
    data: {
      "online-scam": {
        title: "Online Financial Scam",
        originalLaw: "Section 66D of the Information Technology Act, 2000: Whoever, by means of any communication device or computer resource cheats by personation, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.",
        simpleLaw: [
          "Report financial fraud within the 'Golden Hour' (first 1-2 hours) to block funds.",
          "Banks are liable if the fraud occurred due to their security failure.",
          "You must report unauthorized transactions within 3 days to assure zero liability."
        ],
        actionPlan: [
          { title: "Call Cyber Crime Helpline (1930)", desc: "To immediately freeze transferred funds." },
          { title: "Register on cybercrime.gov.in", desc: "NEXT MOVE: START NOW" },
          { title: "File a dispute with your bank", desc: "Submit the cybercrime acknowledgment number." }
        ],
        stat: "Reporting within 2 hours increases fund recovery chances by over 60%.",
        successOdds: "55%",
        successContext: "Based on CyberSafe portal recovery rates",
        timeline: "7-45 days",
        cost: "₹0",
        evidence: [
          "Transaction IDs and Bank Statements",
          "Screenshots of fraudulent websites/messages",
          "Phone numbers/UPI IDs of scammers",
          "Call recordings (if available)"
        ]
      }
    }
  },
  {
    slug: "medical",
    title: "Medical Negligence",
    snippet: "Wrong treatment? Overcharging?",
    description: "Rights against improper medical treatment and hospital disputes.",
    commonIssues: ["Wrong treatment", "Surgery gone wrong", "Overcharging by hospital", "Denied treatment"],
    data: {
      "wrong-treatment": {
        title: "Medical Negligence / Wrong Treatment",
        originalLaw: "Section 35 of the Consumer Protection Act, 2019 (interpreting medical services): A medical practitioner can be held liable for deficiency in service if they fail to exercise reasonable care, leading to injury or death. (Also Section 106 BNS for criminal rashness).",
        simpleLaw: [
          "Doctors and hospitals are liable for negligence under both civil and criminal law.",
          "You have the fundamental right to access your complete medical records within 72 hours.",
          "Hospitals cannot detain patients or bodies for unpaid bills."
        ],
        actionPlan: [
          { title: "Demand complete medical records in writing", desc: "Hospitals must comply under MCI regulations." },
          { title: "File complaint with State Medical Council", desc: "For professional misconduct." },
          { title: "File case in Consumer Forum", desc: "For compensation against deficiency of service." }
        ],
        stat: "Consumer forums frequently award damages covering full medical costs plus agony.",
        successOdds: "60%",
        successContext: "Complex cases depend heavily on expert medical opinions.",
        timeline: "1-3 years",
        cost: "₹2000+",
        evidence: [
          "Prescriptions and treatment notes",
          "Diagnostic reports (before and after)",
          "Hospital bills and receipts",
          "Expert second opinion"
        ]
      }
    }
  },
  {
    slug: "financial",
    title: "Banking & Financial Fraud",
    snippet: "Loan harassment? Unauthorized tx?",
    description: "Issues with loans, credit cards, and banking institutions.",
    commonIssues: ["Loan harassment", "Unauthorized transactions", "Credit card fraud", "Recovery agent threats"],
    data: {
      "loan-harassment": {
        title: "Harassment by Recovery Agents",
        originalLaw: "RBI Guidelines on Fair Practices Code for NBFCs & Banks: Lenders must not resort to undue harassment viz. persistently bothering the borrowers at odd hours, use of muscle power for recovery of loans, etc.",
        simpleLaw: [
          "Recovery agents cannot call you before 8 AM or after 7 PM.",
          "They cannot use abusive language, physical force, or threaten your family/friends.",
          "Banks are fully responsible for the actions of their third-party recovery agents.",
          "You can file a criminal case for extortion or criminal intimidation."
        ],
        actionPlan: [
          { title: "File a grievance with the Bank's Nodal Officer", desc: "Document the abusive calls." },
          { title: "File complaint with RBI Ombudsman", desc: "NEXT MOVE: START NOW (If bank ignores you for 30 days)" },
          { title: "File a police complaint", desc: "For criminal intimidation and harassment." }
        ],
        stat: "RBI Ombudsman resolves over 75% of fair practice complaints rapidly.",
        successOdds: "85%",
        successContext: "Based on RBI Ombudsman Annual Report data",
        timeline: "30-60 days",
        cost: "₹0",
        evidence: [
          "Call recordings of abusive agents",
          "Screenshots of WhatsApp/SMS threats",
          "Call logs showing odd-hour calls",
          "Previous written complaints to the bank"
        ]
      }
    }
  },
  {
    slug: "government",
    title: "Government & Public Services",
    snippet: "Passport delay? Pension not received?",
    description: "Dealing with government offices, RTI, and public schemes.",
    commonIssues: ["Passport delays", "Pension not received", "Corruption complaint", "RTI follow-up"],
    data: {
      "passport-delays": {
        title: "Unreasonable Passport Delays",
        originalLaw: "Right to Information Act, 2005: Mandates timely response from public authorities. Furthermore, the Citizens' Charter of the Passport Seva stipulates issuance timelines (e.g., 30 days for normal, 1-3 days for Tatkaal).",
        simpleLaw: [
          "You have the right to know exactly why your application is pending.",
          "Police verification must be completed within 21 days.",
          "RTI applications force officers to put the reason for delay on paper, which usually speeds up processing."
        ],
        actionPlan: [
          { title: "File Grievance on CPGRAMS", desc: "The central government grievance portal." },
          { title: "File an RTI Application", desc: "NEXT MOVE: START NOW (Ask for daily progress report)." },
          { title: "Visit RPO with an appointment", desc: "Escalate to the Regional Passport Officer." }
        ],
        stat: "90% of delayed government services are expedited within 15 days of receiving an RTI.",
        successOdds: "95%",
        successContext: "RTI is highly effective for administrative delays.",
        timeline: "15-30 days",
        cost: "₹10 (RTI Fee)",
        evidence: [
          "Application ARN / File Number",
          "Screenshots of passport status portal",
          "Copies of previously submitted documents"
        ]
      }
    }
  },
  {
    slug: "education",
    title: "Education & Student Rights",
    snippet: "Fee refund? Admission fraud?",
    description: "Protection for students against unfair institutional practices.",
    commonIssues: ["Fee refund", "Ragging", "Unfair grading", "Admission fraud"],
    data: {
      "fee-refund": {
        title: "College Denying Fee Refund",
        originalLaw: "UGC Notification on Refund of Fees: Institutions must refund a specific percentage of fees depending on the date of withdrawal. A 100% refund (minus max ₹1000 processing fee) is mandated if withdrawal is 15 days or more before the formally-notified last date of admission.",
        simpleLaw: [
          "Colleges CANNOT retain your entire fee if you withdraw before or shortly after admission.",
          "Withholding original certificates to force fee payment is completely illegal.",
          "UGC mandates strict refund timelines (usually within 15 days of request)."
        ],
        actionPlan: [
          { title: "Submit a formal written withdrawal and refund request", desc: "Keep an acknowledged copy." },
          { title: "Grievance to UGC (e-Samadhan portal)", desc: "NEXT MOVE: START NOW" },
          { title: "Send a Legal Notice / Consumer Forum", desc: "For deficiency in service." }
        ],
        stat: "UGC interventions lead to successful refunds in the vast majority of valid claims.",
        successOdds: "80%",
        successContext: "Based on UGC grievance resolving metrics",
        timeline: "30-60 days",
        cost: "₹0 - ₹500",
        evidence: [
          "Fee payment receipts",
          "Formal withdrawal letter with date of submission",
          "UGC Refund Guidelines circular",
          "College's refusal response (if any)"
        ]
      }
    }
  },
  {
    slug: "traffic",
    title: "Traffic & Motor Vehicle",
    snippet: "Challan disputes? Accident claims?",
    description: "Handling challans, accidents, and insurance claims.",
    commonIssues: ["Challan disputes", "Accident claim", "Insurance not paid", "Towing complaints"],
    data: {
      "challan-disputes": {
        title: "Wrongful Traffic Challan",
        originalLaw: "Section 133 of the Motor Vehicles Act, 1988: Allows a vehicle owner to contest traffic violations. You have the right to challenge an e-challan in the Virtual Traffic Court or regular traffic court if you were not at fault.",
        simpleLaw: [
          "You are not obligated to pay a wrongful e-challan immediately.",
          "You can challenge the challan using the grievance portal of the state traffic police.",
          "If unresolved, you can contest it before a Magistrate in Traffic Lok Adalat."
        ],
        actionPlan: [
          { title: "Raise a Grievance Online", desc: "Use the Parivahan portal or State Traffic Police website." },
          { title: "Contest in Virtual Traffic Court", desc: "NEXT MOVE: START NOW" },
          { title: "Attend Lok Adalat", desc: "Traffic Lok Adalats often waive or reduce disputed fines." }
        ],
        stat: "Over 40% of contested e-challans (wrong number plates, faulty cameras) are dropped.",
        successOdds: "70%",
        successContext: "If photographic evidence clearly exonerates you.",
        timeline: "15-45 days",
        cost: "₹0",
        evidence: [
          "E-Challan copy (with faulty photo)",
          "Dashcam footage (if available)",
          "GPS data or toll receipts showing you were elsewhere",
          "Vehicle registration certificate (RC)"
        ]
      }
    }
  }
];
