"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Search, Clock, RefreshCw } from "lucide-react";
import { useNews } from "@/hooks/useNews";
import { useLang } from "@/context/LanguageContext";
import { formatTimeRelativeOrAbsolute } from "@/lib/formatDate";
import { NewsCategory } from "@/types/content";
import Image from "next/image";

export default function NewsPage() {
  const { lang, t } = useLang();
  const { items, loading, lastUpdated, error } = useNews();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Scam Alert", "Court Decision", "Policy Change", "Consumer Warning", "Awareness", "Crime & Safety"];

  const filteredNews = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter(n => n.category === activeCategory);
  }, [items, activeCategory]);

  const urgentAlerts = useMemo(() => items.filter(n => n.isAlert).slice(0, 3), [items]);

  const translateCategory = (cat: string) => {
    if (cat === "All") return t("news.categories.all") || "All";
    const keyMap: Record<string, string> = {
      "Scam Alert": "scamAlert",
      "Court Decision": "courtDecision",
      "Policy Change": "policyChange",
      "Consumer Warning": "consumerWarning",
      "Awareness": "awareness",
      "Crime & Safety": "crimeSafety"
    };
    return t(`news.categories.${keyMap[cat]}`) || cat;
  };

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <RefreshCw className="animate-spin text-burgundy" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface w-full">
      <div className="py-12 md:py-20 px-4 md:px-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="max-w-[700px] mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-ink mb-4 font-normal tracking-tight font-serif text-[clamp(2.25rem,6vw,3.5rem)]">
            {t("news.pageTitle")}
          </h1>
          <p className="text-[#5C4A42] text-[0.9375rem] md:text-lg font-sans max-w-lg mx-auto leading-relaxed">
            {t("news.pageSubtitle")}
          </p>
          {lastUpdated && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[#8B7B6B] text-xs uppercase tracking-widest font-bold">
              <Clock size={12} /> Last Updated: {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Trending Now / Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {items.slice(0, 3).map((item) => (
            <Link key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="group bg-white border border-border p-6 rounded-sm shadow-resting hover:shadow-hover transition-all">
               <span className="text-burgundy text-[10px] font-bold uppercase tracking-widest block mb-2">{translateCategory(item.category)}</span>
               <h3 className="text-ink font-serif text-xl mb-4 group-hover:text-burgundy transition-colors line-clamp-3">{item.title}</h3>
               <span className="text-[#8B7B6B] text-[11px] uppercase tracking-tighter flex items-center gap-1">
                 {item.source} · {formatTimeRelativeOrAbsolute(item.publishedAt, lang)}
               </span>
            </Link>
          ))}
        </div>

        {/* Scam Alerts Section */}
        {urgentAlerts.length > 0 && (
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
               <AlertTriangle className="text-burgundy" size={18} />
               <h2 className="text-burgundy font-bold uppercase tracking-widest text-[0.65rem] md:text-sm">Active Scam Alerts</h2>
            </div>
            <div className="space-y-4">
              {urgentAlerts.map(alert => (
                <div key={alert.id} className="bg-burgundy text-ivory p-5 md:p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif mb-2 leading-tight">{alert.title}</h3>
                    <p className="text-taupe text-[0.8125rem] md:text-sm line-clamp-2">{alert.summary}</p>
                  </div>
                  <Link href={alert.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 bg-cream text-burgundy px-5 py-2 rounded-sm font-bold text-[0.65rem] md:text-xs uppercase tracking-widest hover:bg-white transition-colors w-full md:w-auto text-center">
                    Read advisory
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-10 pb-2 justify-center border-b border-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                activeCategory === cat ? "border-burgundy text-burgundy" : "border-transparent text-[#8B7B6B] hover:text-burgundy"
              }`}
            >
              {translateCategory(cat)}
            </button>
          ))}
        </div>

        {/* List Feed */}
        <div className="max-w-3xl mx-auto divide-y divide-border px-[-4px]">
          {filteredNews.map((news) => (
            <div key={news.id} className="py-8 md:py-10 group">
              <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                {news.imageUrl && (
                  <div className="w-full md:w-[240px] h-[180px] md:h-[160px] bg-cream rounded-sm overflow-hidden shrink-0 relative order-2 md:order-1">
                     <Image src={news.imageUrl} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="flex-1 order-1 md:order-2">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <span className="text-burgundy text-[0.55rem] md:text-[10px] font-bold uppercase tracking-widest">{translateCategory(news.category)}</span>
                    <span className="text-[#8B7B6B] text-[0.6rem] md:text-[11px] uppercase tracking-widest font-bold">
                       {formatTimeRelativeOrAbsolute(news.publishedAt, lang)}
                    </span>
                  </div>
                  <Link href={news.sourceUrl} target="_blank" rel="noreferrer">
                    <h2 className="text-ink font-serif text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-burgundy transition-colors leading-[1.3]">{news.title}</h2>
                  </Link>
                  <p className="text-[#5C4A42] text-[0.875rem] md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 font-sans">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B7B6B] text-[10px] md:text-[12px] font-sans">Source: <span className="text-burgundy font-bold">{news.source}</span></span>
                    <Link href={news.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-burgundy text-[0.65rem] md:text-xs font-bold uppercase tracking-widest hover:underline">
                      Original Article <ArrowUpRight size={12} className="md:size-14" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-12 border-t border-border text-center">
            <p className="text-[#8B7B6B] text-[11px] uppercase tracking-widest font-bold">
              News is for informational purposes only. Always verify critical safety information with official government handles at PIB, RBI, or CyberCrime.gov.in.
            </p>
        </div>
      </div>
    </div>
  );
}
