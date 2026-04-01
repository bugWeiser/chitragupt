import Parser from "rss-parser";
import { NewsItem, NewsCategory } from "@/types/content";
import { newsItemsDemo } from "@/data/demo/newsItems.demo";

const parser = new Parser();

const RSS_FEEDS = [
  { url: "https://news.google.com/rss/search?q=UPI+fraud+India&hl=en-IN&gl=IN&ceid=IN:en", category: "Scam Alert" as NewsCategory },
  { url: "https://news.google.com/rss/search?q=digital+arrest+scam+India&hl=en-IN&gl=IN&ceid=IN:en", category: "Scam Alert" as NewsCategory },
  { url: "https://news.google.com/rss/search?q=loan+app+harassment+India+RBI&hl=en-IN&gl=IN&ceid=IN:en", category: "Scam Alert" as NewsCategory },
  { url: "https://news.google.com/rss/search?q=Supreme+Court+judgment+India&hl=en-IN&gl=IN&ceid=IN:en", category: "Court Decision" as NewsCategory },
  { url: "https://news.google.com/rss/search?q=consumer+forum+refund+India&hl=en-IN&gl=IN&ceid=IN:en", category: "Consumer Warning" as NewsCategory },
];

const ALLOWLIST = ["The Hindu", "The Indian Express", "Hindustan Times", "LiveLaw", "Bar and Bench", "NDTV", "Business Standard", "Economic Times", "India Today", "Scroll.in", "Moneycontrol", "PIB", "RBI"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function categorize(title: string, content: string, defaultCat: NewsCategory): NewsCategory {
  const text = (title + " " + content).toLowerCase();
  if (/scam|fraud|otp|upi|phishing|digital arrest|loan app|telegram|whatsapp|investment scam|ponzi|task scam|sextortion/.test(text)) return "Scam Alert";
  if (/supreme court|high court|bench|judgment|order|verdict/.test(text)) return "Court Decision";
  if (/ministry|guidelines|rules|amendment|notified|gazette|rbi issued/.test(text)) return "Policy Change";
  if (/refund|defective|misleading|warranty|consumer forum|e-commerce rules/.test(text)) return "Consumer Warning";
  if (/arrest|custody|cyber cell|fir|police|crime|extortion/.test(text)) return "Crime & Safety";
  return defaultCat;
}

function getTrendScore(item: any, category: NewsCategory): number {
  let score = 0;
  const now = new Date().getTime();
  const pubDate = new Date(item.pubDate || "").getTime();
  const hoursOld = (now - pubDate) / (1000 * 60 * 60);

  if (hoursOld < 24) score += 10;
  else if (hoursOld < 48) score += 5;

  if (category === "Scam Alert") score += 5;
  if (/upi|otp|digital arrest/.test(item.title.toLowerCase())) score += 3;

  if (ALLOWLIST.some(s => item.source?.name?.includes(s) || item.creator?.includes(s))) score += 5;

  return score;
}

let memoryCache: { data: NewsItem[], timestamp: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 mins

export async function fetchLiveNews(): Promise<NewsItem[]> {
  const now = new Date().getTime();
  if (memoryCache && (now - memoryCache.timestamp < CACHE_TTL)) {
    return memoryCache.data;
  }

  try {
    const feedPromises = RSS_FEEDS.map(async (f) => {
      try {
        const feed = await parser.parseURL(f.url);
        return feed.items.map(item => ({ ...item, defaultCategory: f.category }));
      } catch (e) {
        console.error(`Failed to fetch feed: ${f.url}`, e);
        return [];
      }
    });

    const allItems = (await Promise.all(feedPromises)).flat();
    
    const normalized: NewsItem[] = allItems.map(item => {
      const category = categorize(item.title || "", item.contentSnippet || "", item.defaultCategory);
      const isAlert = category === "Scam Alert" && /upi|otp|digital arrest|loan app|sextortion|phishing|task scam/.test((item.title || "").toLowerCase());
      
      return {
        id: Buffer.from((item.title || "") + (item.pubDate || "")).toString('base64').substring(0, 16),
        slug: slugify(item.title || "") + "-" + new Date(item.pubDate || "").getTime(),
        category,
        title: item.title || "",
        summary: item.contentSnippet || "",
        source: (item as any).source?.name || (item as any).creator || "News Source",
        sourceUrl: item.link || "#",
        publishedAt: new Date(item.pubDate || "").toISOString(),
        isAlert,
        tags: [],
        isDemo: false
      };
    });

    // Deduplicate
    const unique = Array.from(new Map(normalized.map(item => [item.title, item])).values());

    // Rank
    const ranked = unique.sort((a, b) => {
      const scoreA = getTrendScore(a, a.category);
      const scoreB = getTrendScore(b, b.category);
      return scoreB - scoreA;
    });

    const result = ranked.slice(0, 60);
    memoryCache = { data: result, timestamp: now };
    return result;

  } catch (error) {
    console.error("Hybrid news fetch failed, returning demo data", error);
    return [];
  }
}

export async function getHybridNews(): Promise<{ items: NewsItem[], lastUpdated: string }> {
  const live = await fetchLiveNews();
  const merged = [...live, ...newsItemsDemo];
  
  // Final Sort: Active Alerts first, then by date
  const sorted = merged.sort((a, b) => {
    if (a.isAlert && !b.isAlert) return -1;
    if (!a.isAlert && b.isAlert) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return {
    items: sorted,
    lastUpdated: new Date(memoryCache?.timestamp || Date.now()).toISOString()
  };
}
