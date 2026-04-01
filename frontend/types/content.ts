export type NewsCategory =
  | "Scam Alert"
  | "Court Decision"
  | "Policy Change"
  | "Consumer Warning"
  | "Awareness"
  | "Crime & Safety";

export interface NewsItem {
  id: string;              // stable hash of (title + source + date)
  slug: string;            // slugified title + date
  category: NewsCategory;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;     // ISO
  isAlert: boolean;
  tags: string[];
  locationHint?: string;
  imageUrl?: string;       // Added per user request
  isDemo?: boolean;
}

export interface GuideArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  bodyMarkdown: string;
  isFeatured?: boolean;
  isDemo?: boolean;
  imageUrl?: string;       // Added per user request
}

export type DirectoryType =
  | "District Court"
  | "Legal Aid"
  | "Consumer Forum"
  | "Police / Cyber Cell"
  | "Government Office"
  | "Women's Commission"
  | "Law Firm"
  | "NGO"
  | "RTI Office"
  | "Notary / Stamp";

export interface DirectoryListing {
  id: string;
  type: DirectoryType;
  name: string;
  address: string;
  state: string;
  city: string;
  phone?: string;
  hours?: string;
  website?: string;
  mapsUrl?: string;
  services: string[];
  verified?: boolean;
  isDemo?: boolean;
}
