import { Situation, Lawyer } from '../types';

export const SITUATIONS: Situation[] = [
  {
    id: 'deposit-return',
    emoji: '🏠',
    title: 'Landlord Problems',
    description: 'Deposit not returned? Illegal eviction?',
    category: 'tenant',
    rights: [
      'Your landlord is LEGALLY required to return your security deposit',
      'They can only deduct for actual proven damages (not normal wear & tear)',
      'You have the right to demand an itemized list of any deductions',
      'If they refuse, you can file a complaint in Consumer Forum or Civil Court'
    ],
    lawText: 'Transfer of Property Act, 1882 — Section 108(q):\nThe lessor is bound to put the lessee into possession of the property...\n\nRent Control Acts (state-specific): Security deposit must be returned within [30-60] days of vacating, failing which tenant can claim interest.',
    steps: [
      { text: 'Send a formal legal notice (deadline: 15 days to respond)', status: 'done' },
      { text: 'If no response → File complaint in Rent Authority / Consumer Forum', status: 'pending' },
      { text: 'If still no response → File civil suit for recovery', status: 'info' }
    ],
    successRate: 78,
    timeline: '30-90 days',
    cost: '₹0 - ₹500',
    tip: '68% of landlords return deposit after receiving a formal legal notice. You may not need to go to court.',
    documents: ['legal-notice', 'consumer-complaint'],
    checklist: [
      'Rent agreement / lease copy',
      'Deposit payment receipt',
      'Bank transfer proof of deposit',
      'WhatsApp messages / emails with landlord',
      'Photos of the property when you left'
    ]
  },
  {
    id: 'consumer-fraud',
    emoji: '🛒',
    title: 'Consumer Rights',
    description: 'Defective product? Refund denied?',
    category: 'consumer',
    rights: [
      'You have the right to be protected against marketing of defective goods',
      'Sellers cannot refuse returns for clearly defective items',
      'E-commerce platforms are liable for sellers on their platform'
    ],
    lawText: 'Consumer Protection Act, 2019:\nProtects consumers from unfair trade practices, defective goods, and deficient services.',
    steps: [
      { text: 'Send written complaint to the company\'s grievance officer', status: 'done' },
      { text: 'File complaint on National Consumer Helpline (NCH)', status: 'pending' },
      { text: 'File case in District Consumer Disputes Redressal Commission', status: 'info' }
    ],
    successRate: 85,
    timeline: '60-120 days',
    cost: '₹0 - ₹1000',
    tip: 'Keep all receipts and screenshots of the product page as it was when you bought it.',
    documents: ['legal-notice', 'consumer-complaint'],
    checklist: ['Invoice/Bill', 'Warranty card', 'Photos/videos of defect', 'Communication with customer care']
  },
  {
    id: 'unpaid-salary',
    emoji: '💼',
    title: 'Workplace Issues',
    description: 'Salary unpaid? Wrongful termination?',
    category: 'workplace',
    rights: [
      'Employees are legally entitled to receive their wages on time',
      'Employers cannot withhold salary without a valid, legally sanctioned reason',
      'Terminal dues MUST be cleared as per the employment contract'
    ],
    lawText: 'Payment of Wages Act, 1936:\nEnsures timely payment of wages to employees... employers cannot make unauthorized deductions.',
    steps: [
      { text: 'Send a formal email/notice demanding unpaid salary', status: 'done' },
      { text: 'File a complaint with the Labour Commissioner', status: 'pending' },
      { text: 'Approach the Labour Court if unresolved', status: 'info' }
    ],
    successRate: 72,
    timeline: '3-6 months',
    cost: '₹500+',
    tip: 'Do not resign if you are planning to claim unpaid dues; let them terminate you or follow proper grievance channels.',
    documents: ['legal-notice', 'workplace-complaint'],
    checklist: ['Offer letter / Contract', 'Payslips', 'Relieving letter (if any)', 'Email correspondence regarding unpaid salary']
  },
  {
    id: 'fir-police',
    emoji: '🚓',
    title: 'Police & FIR',
    description: 'Police refusing to help? Need to file FIR?',
    category: 'police',
    rights: [
      'Police MUST register an FIR for any cognizable offense',
      'You can file a Zero FIR at ANY police station, regardless of jurisdiction',
      'If police refuse, you can approach the Superintendent of Police (SP)'
    ],
    lawText: 'Code of Criminal Procedure (CrPC), Section 154:\nInformation in cognizable cases... officer in charge of a police station shall reduce it to writing.',
    steps: [
      { text: 'Draft a written complaint and submit to Police Station', status: 'done' },
      { text: 'If refused, send complaint to SP via registered post', status: 'pending' },
      { text: 'If still no action, file application before Magistrate under Sec 156(3) CrPC', status: 'info' }
    ],
    successRate: 90,
    timeline: 'Immediate to 15 days',
    cost: '₹0',
    tip: 'Always get a stamped receipt (receiving) on the copy of your written complaint from the police station.',
    documents: ['fir'],
    checklist: ['Written complaint detailing the incident', 'ID Proof', 'Any evidence (medical report, photos, etc.)'],
    isHighRisk: true
  },
  {
    id: 'property-fraud',
    emoji: '🏗️',
    title: 'Property & Real Estate',
    description: 'Builder delay? Fraud?',
    category: 'property',
    rights: [
      'Builders must deliver possession on the date mentioned in the agreement',
      'RERA protects buyers from unauthorized changes to building plans',
      'You have the right to a full refund with interest if the project is delayed'
    ],
    lawText: 'RERA Act, 2016:\nMandates transparency and accountability in real estate... developers must deposit 70% funds in escrow.',
    steps: [
      { text: 'Verify RERA registration of the project', status: 'done' },
      { text: 'File a complaint in RERA Authority (e.g., MahaRERA, UP-RERA)', status: 'pending' },
      { text: 'File for compensation in RERA Adjudicating Officer', status: 'info' }
    ],
    successRate: 75,
    timeline: '6-12 months',
    cost: '₹1000 - ₹5000',
    tip: 'Check the "Quarterly Progress Report" on the RERA website for your project.',
    documents: ['rera-complaint'],
    checklist: ['Agreement for Sale', 'Payment Receipts', 'Allotment Letter', 'Project Brochure']
  },
  {
    id: 'family-dispute',
    emoji: '👪',
    title: 'Family & Matrimonial',
    description: 'Divorce? Domestic Violence?',
    category: 'family',
    rights: [
      'Women have a right to reside in the matrimonial home under PWDVA',
      'Maintenance (Alimony) can be claimed even during a pending divorce',
      'Custody is decided based on the "Welfare of the Child" principle'
    ],
    lawText: 'Protection of Women from Domestic Violence Act (2005):\nProvides for protection, residence, and monetary relief for victims.',
    steps: [
      { text: 'Seek immediate protection order (if violence involved)', status: 'done' },
      { text: 'Attempt court-mandated mediation', status: 'pending' },
      { text: 'File for Maintenance / Custody / Divorce in Family Court', status: 'info' }
    ],
    successRate: 65,
    timeline: '1-3 years',
    cost: '₹Varies',
    tip: 'Always try mediation first; it is faster and less traumatic for children.',
    documents: ['dv-complaint', 'maintenance-petition'],
    checklist: ['Marriage Certificate', 'Income Proofs', 'Photos/Evidence of abuse', 'Birth certificates of children']
  },
  {
    id: 'cyber-crime',
    emoji: '💻',
    title: 'Cyber Crime',
    description: 'Online scam? Identity theft?',
    category: 'cyber',
    rights: [
      'You have the right to block your accounts/cards immediately after fraud',
      'Banks are liable for losses if reported within 3 days of unauthorized transaction',
      'Cyber-stalking and bullying are criminal offenses under IT Act'
    ],
    lawText: 'Information Technology (IT) Act, 2000:\nDefines cyber crimes like phishing, identity theft, and data breach.',
    steps: [
      { text: 'Report on cybercrime.gov.in and call 1930 immediately', status: 'done' },
      { text: 'File a formal FIR at your local Cyber Cell', status: 'pending' },
      { text: 'Apply for compensation before Adjudicating Officer (IT Dept)', status: 'info' }
    ],
    successRate: 60,
    timeline: '15-60 days (for 1930 recovery)',
    cost: '₹0',
    tip: 'The first 2 hours (Golden Hour) are critical for blocking transferred funds.',
    documents: ['cyber-fir'],
    checklist: ['Bank Statement', 'Screenshots of fraud', 'URL of fake site', 'Phone numbers involved']
  },
  {
    id: 'medical-negligence',
    emoji: '🏥',
    title: 'Medical Negligence',
    description: 'Wrong treatment? Overcharging?',
    category: 'medical',
    rights: [
      'Patients have a right to see their complete medical records',
      'Hospitals cannot refuse treatment in emergency cases (Golden Hour)',
      'Consent must be taken before any major surgical procedure'
    ],
    lawText: 'Consumer Protection Act & Medical Council Regulations:\nDoctors are liable for "deficiency in service" if standard of care is not met.',
    steps: [
      { text: 'Obtain certified copies of all medical records/bills', status: 'done' },
      { text: 'File complaint with State Medical Council', status: 'pending' },
      { text: 'File for compensation in Consumer Forum', status: 'info' }
    ],
    successRate: 55,
    timeline: '1-2 years',
    cost: '₹2000+',
    tip: 'Get an independent opinion from another expert doctor to prove negligence.',
    documents: ['medical-complaint'],
    checklist: ['Discharge Summary', 'Prescriptions', 'Lab reports', 'Invoices for all medicines']
  },
  {
    id: 'banking-fraud',
    emoji: '🏦',
    title: 'Banking & Financial Fraud',
    description: 'Loan harassment? Unauthorized TC?',
    category: 'banking',
    rights: [
      'Recovery agents cannot harass you or call at odd hours (7 AM - 7 PM only)',
      'Zero liability if bank is at fault for a security breach',
      'Right to approach Banking Ombudsman if bank doesn\'t resolve issue in 30 days'
    ],
    lawText: 'RBI Fair Practices Code:\nProhibits forceful recovery and mandates transparent interest calculations.',
    steps: [
      { text: 'File a written grievance with the Bank Manager', status: 'done' },
      { text: 'Escalate to the Bank\'s Nodal Officer', status: 'pending' },
      { text: 'File a complaint on RBI CMS portal (Ombudsman)', status: 'info' }
    ],
    successRate: 80,
    timeline: '30-45 days',
    cost: '₹0',
    tip: 'Avoid clicking on any links in SMS or giving OTPs; banks never ask for them.',
    documents: ['banking-ombudsman'],
    checklist: ['Bank Statement', 'Grievance email copy', 'Loan Agreement', 'Harassment recordings']
  },
  {
    id: 'government-services',
    emoji: '🏛️',
    title: 'Gov & Public Services',
    description: 'Passport delay? Pension not received?',
    category: 'government',
    rights: [
      'Right to Information (RTI) allows you to ask for status of your application',
      'Citizen Charters define fixed timelines for every govt service',
      'Bribery is a criminal offense under Prevention of Corruption Act'
    ],
    lawText: 'Right to Information (RTI) Act, 2005:\nEmpowers citizens to secure access to information under the control of public authorities.',
    steps: [
      { text: 'Submit query/grievance on CPGRAMS portal', status: 'done' },
      { text: 'File an RTI Application to know status of file', status: 'pending' },
      { text: 'File First Appeal if RTI is rejected / not answered', status: 'info' }
    ],
    successRate: 95,
    timeline: '30 days (RTI limit)',
    cost: '₹10 (RTI fee)',
    tip: 'Always mention specific file numbers and dates in your RTI query.',
    documents: ['rti-application'],
    checklist: ['Application receipt', 'Acknowledgment slip', 'Previous correspondence', 'Identity proof']
  },
  {
    id: 'education-rights',
    emoji: '🎓',
    title: 'Education & Students',
    description: 'Fee refund? Admission fraud?',
    category: 'education',
    rights: [
      'Institutions must refund fees if a student withdraws before the session starts',
      'UGC/AICTE mandates internal grievance committees for harassment',
      'Educational certificates cannot be withheld by colleges for unpaid fees'
    ],
    lawText: 'UGC Fee Refund Policy & AICTE Regulations:\nMandates percentage-based refund based on when withdrawal notice is given.',
    steps: [
      { text: 'Submit formal withdrawal/refund request to Principal', status: 'done' },
      { text: 'File complaint on UGC e-Samadhaan portal', status: 'pending' },
      { text: 'Approach Consumer Forum for refund of caution money/fees', status: 'info' }
    ],
    successRate: 82,
    timeline: '30-90 days',
    cost: '₹0 - ₹500',
    tip: 'Record all dates of submission of your refund request.',
    documents: ['education-complaint'],
    checklist: ['Admission letter', 'Fee receipts', 'Prospectus copy', 'Withdrawal request email']
  },
  {
    id: 'traffic-vehicle',
    emoji: '🚗',
    title: 'Traffic & Motor Vehicle',
    description: 'Challan disputes? Accident claims?',
    category: 'traffic',
    rights: [
      'MACT (Tribunal) offers compensation for accident victims or families',
      'Virtual Courts allow you to contest/pay e-challans online',
      'Traffic police cannot seize your keys without a valid legal reason'
    ],
    lawText: 'Motor Vehicles (Amendment) Act, 2019:\nComprehensive laws for road safety, insurance, and accident compensation.',
    steps: [
      { text: 'Submit "Contest" on the Virtual Court portal for challans', status: 'done' },
      { text: 'File claim in Motor Accident Claims Tribunal (MACT)', status: 'pending' },
      { text: 'Approach Insurance Ombudsman for claim rejection', status: 'info' }
    ],
    successRate: 70,
    timeline: '6 months - 2 years (for MACT)',
    cost: '₹Varies',
    tip: 'Ensure your dashcam or nearby CCTV footage is secured within 24 hours of an accident.',
    documents: ['mact-petition'],
    checklist: ['FIR Copy in case of accident', 'Insurance Policy', 'Medical reports', 'Driving License']
  }
];

export const LAWYERS: Lawyer[] = [
  {
    id: 'l1',
    initials: 'PS',
    name: 'Adv. Priya Sharma',
    verified: true,
    location: '📍 Indore, Madhya Pradesh',
    city: 'Indore',
    state: 'Madhya Pradesh',
    specializations: ['Tenant Law', 'Consumer Rights', 'Family Law'],
    languages: ['Hindi', 'English'],
    rating: 4.8,
    consultations: 23,
    fee: '💰 Pro Bono available | ₹500 first consultation',
    experience: '8 years experience',
    proBonoOnly: false,
    gradientFrom: '#3b82f6',
    gradientTo: '#2563eb',
    category: 'tenant',
    whyMatch: 'Best match for tenant disputes in Indore. Speaks Hindi & English.'
  },
  {
    id: 'l2',
    initials: 'RK',
    name: 'Adv. Ramesh Kumar',
    verified: true,
    location: '📍 Bhopal, Madhya Pradesh',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    specializations: ['Workplace Issues', 'RTI Expert', 'Banking'],
    languages: ['Hindi'],
    rating: 4.6,
    consultations: 41,
    fee: '💰 100% Pro Bono (Legal Aid)',
    experience: '12 years experience',
    proBonoOnly: true,
    badge: '🏛️ District Legal Aid Authority',
    gradientFrom: '#10b981',
    gradientTo: '#059669',
    category: 'workplace',
    whyMatch: 'Perfect match for workplace issues. Available for free Legal Aid in Bhopal.'
  },
  {
    id: 'l3',
    initials: 'SP',
    name: 'Adv. Sunita Patel',
    verified: true,
    location: '📍 Gwalior, Madhya Pradesh',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    specializations: ['Domestic Violence', 'Family Law', "Women's Rights"],
    languages: ['Hindi', 'English', 'Marathi'],
    rating: 4.9,
    consultations: 67,
    fee: '💰 Pro Bono for domestic violence cases',
    experience: '15 years experience',
    proBonoOnly: false,
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
    category: 'family',
    whyMatch: 'Top-rated female advocate for domestic rights in Gwalior. Fluent in 3 languages.'
  },
  {
    id: 'l4',
    initials: 'VD',
    name: 'Adv. Vikram Desai',
    verified: true,
    location: '📍 Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    specializations: ['Cyber Crime', 'Banking Fraud', 'Corporate Law'],
    languages: ['English', 'Marathi', 'Hindi'],
    rating: 4.7,
    consultations: 89,
    fee: '💰 ₹1500 first consultation',
    experience: '10 years experience',
    proBonoOnly: false,
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    category: 'cyber',
    whyMatch: 'Cyber Crime expert located in Mumbai. Crucial for handling severe digital frauds.'
  },
  {
    id: 'l5',
    initials: 'AK',
    name: 'Adv. Anjali Krishnan',
    verified: true,
    location: '📍 Bangalore, Karnataka',
    city: 'Bangalore',
    state: 'Karnataka',
    specializations: ['Consumer Rights', 'Tenant Law'],
    languages: ['English', 'Kannada', 'Hindi'],
    rating: 4.5,
    consultations: 15,
    fee: '💰 100% Pro Bono (Legal Aid)',
    experience: '5 years experience',
    proBonoOnly: true,
    badge: '🏛️ High Court Legal Services',
    gradientFrom: '#ec4899',
    gradientTo: '#db2777',
    category: 'consumer',
    whyMatch: 'Direct access to Bangalore High Court Legal Services for Consumer cases.'
  },
  {
    id: 'l6',
    initials: 'MD',
    name: 'Adv. Manish Dubey',
    verified: true,
    location: '📍 Delhi, NCR',
    city: 'Delhi',
    state: 'Delhi',
    specializations: ['Police & FIR', 'Criminal Law', 'RTI'],
    languages: ['Hindi', 'English', 'Punjabi'],
    rating: 4.8,
    consultations: 112,
    fee: '💰 ₹1000 first consultation',
    experience: '20 years experience',
    proBonoOnly: false,
    gradientFrom: '#ef4444',
    gradientTo: '#dc2626',
    category: 'police',
    whyMatch: '20 veteran in Criminal Law. Specifically recommended for cases where police refuse FIR.'
  }
];
