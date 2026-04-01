"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { newsItems, NewsItem } from "@/data/news-items";
import { useLang } from "@/context/LanguageContext";
import { formatDate } from "@/lib/formatDate";

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang();
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const found = newsItems.find((n) => n.slug === params.slug);
    if (found) setNews(found);
  }, [params.slug]);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface w-full p-4">
        <h1 className="text-ink text-2xl font-serif mb-4 text-center">News not found</h1>
        <Link href="/news" className="text-burgundy flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Back to News
        </Link>
      </div>
    );
  }

  // Related news based on same category or falling back to recent ones
  const relatedNews = newsItems
    .filter((n) => n.slug !== news.slug && n.category === news.category)
    .slice(0, 3);
  
  if (relatedNews.length < 3) {
    const backup = newsItems.filter((n) => n.slug !== news.slug && !relatedNews.includes(n));
    relatedNews.push(...backup.slice(0, 3 - relatedNews.length));
  }

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

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Scam Alert":
      case "Consumer Warning":
      case "Crime & Safety":
        return "bg-burgundy text-ivory";
      case "Court Decision":
      case "Policy Change":
      case "Awareness":
      default:
        return "bg-cream text-burgundy";
    }
  };

  return (
    <div className="min-h-screen bg-surface w-full pt-10 pb-20 px-5 md:px-10 lg:px-20 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="text-[0.75rem] font-sans text-[#8B7B6B] flex items-center gap-2 mb-10 max-w-[720px] mx-auto">
        <Link href="/news" className="text-burgundy hover:underline">News</Link>
        <ChevronRight size={14} className="opacity-50" />
        <span className="text-burgundy">{translateCategory(news.category)}</span>
        <ChevronRight size={14} className="opacity-50" />
        <span className="truncate max-w-[200px] sm:max-w-md">{news.title}</span>
      </div>

      {/* Header */}
      <div className="max-w-[720px] mx-auto text-center mb-10">
        <span className={`inline-block ${getBadgeStyle(news.category)} text-[0.6875rem] font-bold uppercase tracking-[0.1em] px-3 py-1 mb-5 font-sans rounded-sm`}>
          {translateCategory(news.category)}
        </span>
        <h1 
          className="text-ink text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.2] font-normal mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {news.title}
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 text-[#8B7B6B] text-[0.8125rem] font-sans uppercase tracking-widest">
          <span className="font-semibold text-burgundy">{formatDate(news.date, lang)}</span>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto border-t border-b border-[#D4C4B4]/50 py-4 mb-14 text-center">
         <span className="text-[#8B7B6B] text-[0.875rem] font-sans">
            Originally reported by <a href={news.sourceUrl} target="_blank" rel="noreferrer" className="text-burgundy font-semibold hover:underline inline-flex items-center gap-1">{news.source} <ArrowUpRight size={14} className="opacity-70" /></a>
         </span>
      </div>

      {/* Article Body */}
      <article className="max-w-[680px] mx-auto font-sans text-ink leading-[1.8] text-[1rem] mb-20">
        {news.body.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-ink text-[1.5rem] mt-10 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-ink text-[1.25rem] mt-8 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote key={index} className="border-l-4 border-burgundy pl-5 my-8 italic text-[#5C4A42] text-[1.0625rem]" style={{ fontFamily: 'var(--font-serif)' }}>
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={index} className="list-disc pl-6 my-6 text-[#2A1A1E] space-y-3 marker:text-[#C7B7A3]">
                {paragraph.split('\n').map((item, i) => (
                  item.startsWith('- ') ? <li key={i}>{item.replace('- ', '')}</li> : null
                ))}
              </ul>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.match(/^\d+\./)) {
             return (
              <ol key={index} className="list-decimal pl-6 my-6 text-[#2A1A1E] space-y-4 marker:text-burgundy marker:font-semibold">
                {paragraph.split('\n').map((item, i) => {
                   const cleanItem = item.replace(/^\d+\.\s/, '');
                   return cleanItem ? <li key={i}>{cleanItem}</li> : null;
                })}
              </ol>
             );
          }
          
          return (
            <p key={index} className="mb-6 text-[#2A1A1E]">
              {paragraph.split('**').map((part, i) => (
                i % 2 !== 0 ? <strong key={i} className="font-semibold">{part}</strong> : part
              ))}
            </p>
          );
        })}
      </article>

      {/* Related News */}
      <div className="border-t border-[#D4C4B4]/50 pt-16 max-w-7xl mx-auto">
        <h3 className="text-center text-ink text-[1.375rem] mb-10" style={{ fontFamily: 'var(--font-serif)' }}>
          {t("news.relatedNews") || "Related News"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedNews.map((rel) => (
            <Link key={rel.slug} href={`/news/${rel.slug}`} className="block group">
              <div className="bg-white border border-[#D4C4B4] rounded-lg p-7 shadow-card group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(42,26,30,0.08)] transition-all h-full flex flex-col">
                <div className="flex items-center justify-between mb-3 font-sans">
                  <span className={`text-[0.6875rem] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-sm ${getBadgeStyle(rel.category)}`} title={translateCategory(rel.category)}>
                    {translateCategory(rel.category)}
                  </span>
                  <span className="text-[#8B7B6B] text-[0.6875rem] uppercase tracking-widest font-bold">
                     {new Date(rel.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric'})}
                  </span>
                </div>
                <h4 className="text-ink text-[1.125rem] mb-3 group-hover:text-burgundy transition-colors line-clamp-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {rel.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
