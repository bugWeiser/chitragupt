export interface DirectoryListing {
  id: string;
  type: "District Court" | "Legal Aid" | "Consumer Forum" | 
        "Police / Cyber Cell" | "Government Office" | 
        "Women's Commission" | "Law Firm" | "NGO" | 
        "RTI Office" | "Notary / Stamp";
  name: string;
  address: string;
  phone: string;
  hours: string;
  state: string;
  city: string;
  coordinates?: { lat: number; lng: number };
  services: string[];
}

export const directoryListings: DirectoryListing[] = [
  {
    id: "l1",
    type: "District Court",
    name: "District & Sessions Court, Indore",
    address: "Court Road, Naya Mohalla, Indore, Madhya Pradesh - 452001",
    phone: "0731-2432100",
    hours: "Mon-Sat, 10:00 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    coordinates: { lat: 22.7196, lng: 75.8577 },
    services: ["Civil Cases", "Criminal Cases", "Family Court"]
  },
  {
    id: "l2",
    type: "Legal Aid",
    name: "District Legal Services Authority, Indore",
    address: "Court Campus, District Court, Indore, MP - 452001",
    phone: "0731-2529100",
    hours: "Mon-Fri, 10:30 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Free Legal Advice", "Lok Adalat", "Legal Awareness"]
  },
  {
    id: "l3",
    type: "Consumer Forum",
    name: "District Consumer Disputes Redressal Forum, Indore",
    address: "Collectorate Campus, Indore, MP - 452001",
    phone: "0731-2528200",
    hours: "Mon-Sat, 10:30 AM - 4:30 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Consumer Complaints", "Product Disputes", "Service Complaints"]
  },
  {
    id: "l4",
    type: "Police / Cyber Cell",
    name: "Cyber Crime Cell, Indore",
    address: "DIG Office, Race Course Road, Indore, MP - 452003",
    phone: "0731-2765100",
    hours: "24/7",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Online Fraud", "Social Media Crime", "Identity Theft"]
  },
  {
    id: "l5",
    type: "Government Office",
    name: "Office of the District Collector, Indore",
    address: "Collectorate, AB Road, Indore, MP - 452001",
    phone: "0731-2528800",
    hours: "Mon-Sat, 10:00 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["RTI", "Revenue", "Land Records", "Certificates"]
  },
  {
    id: "l6",
    type: "Women's Commission",
    name: "Women's Helpline & One Stop Centre, Indore",
    address: "MY Hospital Campus, Indore, MP - 452001",
    phone: "15100",
    hours: "24/7",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Domestic Violence", "Harassment", "Legal Aid for Women"]
  },
  {
    id: "l7",
    type: "Law Firm",
    name: "Sharma & Associates, Advocates",
    address: "302, Sapna Sangeeta Road, Indore, MP - 452001",
    phone: "0731-4088000",
    hours: "Mon-Sat, 10:00 AM - 7:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Civil Law", "Criminal Law", "Consumer Cases", "Property"]
  },
  {
    id: "l8",
    type: "Notary / Stamp",
    name: "Sub-Registrar Office, Indore",
    address: "Nagar Nigam, AB Road, Indore, MP - 452001",
    phone: "0731-2433000",
    hours: "Mon-Sat, 10:00 AM - 4:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Property Registration", "Stamp Duty", "Notarization"]
  },
  {
    id: "l9",
    type: "NGO",
    name: "Jan Sunwai Kendra (Public Grievance Center)",
    address: "Collectorate Campus, Indore, MP - 452001",
    phone: "0731-2528100",
    hours: "Mon-Fri, 11:00 AM - 3:00 PM",
    state: "Madhya Pradesh",
    city: "Indore",
    services: ["Public Grievances", "RTI Assistance", "Corruption Complaints"]
  },
  {
    id: "l10",
    type: "RTI Office",
    name: "State Information Commission, Madhya Pradesh",
    address: "Paryavas Bhawan, Arera Hills, Bhopal, MP - 462011",
    phone: "0755-2551000",
    hours: "Mon-Fri, 10:30 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Bhopal",
    services: ["RTI Appeals", "RTI Complaints", "Information Requests"]
  },
  {
    id: "l11",
    type: "District Court",
    name: "District & Sessions Court, Bhopal",
    address: "Court Campus, Jail Road, Bhopal, MP - 462001",
    phone: "0755-2740000",
    hours: "Mon-Sat, 10:00 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Bhopal",
    services: ["Civil Cases", "Criminal Cases", "Family Court"]
  },
  {
    id: "l12",
    type: "Legal Aid",
    name: "State Legal Services Authority, MP",
    address: "High Court Campus, Jabalpur, MP - 482002",
    phone: "0761-2624000",
    hours: "Mon-Fri, 10:30 AM - 5:00 PM",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    services: ["Free Legal Aid", "Lok Adalat", "Victim Compensation"]
  },
  {
    id: "l13",
    type: "Consumer Forum",
    name: "State Consumer Disputes Redressal Commission, MP",
    address: "Paryavas Bhawan, Bhopal, MP - 462011",
    phone: "0755-2556000",
    hours: "Mon-Sat, 10:30 AM - 4:30 PM",
    state: "Madhya Pradesh",
    city: "Bhopal",
    services: ["Consumer Appeals", "Product Disputes", "High Value Cases"]
  },
  {
    id: "l14",
    type: "Police / Cyber Cell",
    name: "State Cyber Police Station, MP",
    address: "PHQ Campus, Bhopal, MP - 462003",
    phone: "0755-2770000",
    hours: "24/7",
    state: "Madhya Pradesh",
    city: "Bhopal",
    services: ["Cyber Crime FIR", "Online Fraud", "Digital Evidence"]
  },
  {
    id: "l15",
    type: "District Court",
    name: "Tis Hazari Courts Complex",
    address: "Tis Hazari, Delhi - 110054",
    phone: "011-23968000",
    hours: "Mon-Sat, 10:00 AM - 5:00 PM",
    state: "Delhi",
    city: "New Delhi",
    services: ["Civil Cases", "Criminal Cases", "District Courts"]
  },
  {
    id: "l16",
    type: "Legal Aid",
    name: "Delhi State Legal Services Authority",
    address: "Patiala House Courts, New Delhi - 110001",
    phone: "011-23388000",
    hours: "Mon-Fri, 10:00 AM - 5:00 PM",
    state: "Delhi",
    city: "New Delhi",
    services: ["Free Legal Aid", "Mediation", "Lok Adalat"]
  },
  {
    id: "l17",
    type: "Consumer Forum",
    name: "District Consumer Forum, South Delhi",
    address: "Saket Court Complex, New Delhi - 110017",
    phone: "011-26523000",
    hours: "Mon-Sat, 10:30 AM - 4:30 PM",
    state: "Delhi",
    city: "New Delhi",
    services: ["Consumer Complaints", "E-Commerce Disputes"]
  },
  {
    id: "l18",
    type: "Police / Cyber Cell",
    name: "Cyber Crime Unit, Delhi Police",
    address: "Mandir Marg, New Delhi - 110001",
    phone: "011-23490000",
    hours: "24/7",
    state: "Delhi",
    city: "New Delhi",
    services: ["Cyber Crime", "Online Fraud", "Social Media Crime"]
  },
  {
    id: "l19",
    type: "Government Office",
    name: "Office of the Divisional Commissioner, Delhi",
    address: "Old Secretariat, Delhi - 110054",
    phone: "011-23970000",
    hours: "Mon-Fri, 10:00 AM - 5:00 PM",
    state: "Delhi",
    city: "New Delhi",
    services: ["Revenue", "RTI", "Public Grievances"]
  },
  {
    id: "l20",
    type: "Law Firm",
    name: "Advocate Meera Singh & Partners",
    address: "C-45, Connaught Place, New Delhi - 110001",
    phone: "011-43500000",
    hours: "Mon-Sat, 10:00 AM - 7:00 PM",
    state: "Delhi",
    city: "New Delhi",
    services: ["Family Law", "Property", "Consumer Rights", "Criminal"]
  }
];
