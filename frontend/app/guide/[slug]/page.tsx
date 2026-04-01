"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Twitter, Link as LinkIcon, ArrowLeft } from "lucide-react";
import { guideArticles, GuideArticle } from "@/data/guide-articles";
import { useLang } from "@/context/LanguageContext";
import { formatDate } from "@/lib/formatDate";

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang();
  const [article, setArticle] = useState<GuideArticle | null>(null);

  useEffect(() => {
    const found = guideArticles.find((a) => a.slug === params.slug);
    if (found) setArticle(found);
  }, [params.slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface w-full p-4">
        <h1 className="text-ink text-2xl font-serif mb-4 text-center">Article not found</h1>
        <Link href="/guide" className="text-burgundy flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Back to Guide
        </Link>
      </div>
    );
  }

  // Related articles (just pick 3 random/other articles)
  const relatedArticles = guideArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  // Determine translations loosely since we don't have all translations defined in hi.json explicitly for dynamic categories
  const categoryLabel = article.category; // If needed, map to translation

  return (
    <div className="min-h-screen bg-surface w-full pt-10 pb-20 px-5 md:px-10 lg:px-20 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="text-[0.75rem] font-sans text-[#8B7B6B] flex items-center gap-2 mb-10 max-w-[720px] mx-auto">
        <Link href="/guide" className="text-burgundy hover:underline">Guide</Link>
        <ChevronRight size={14} className="opacity-50" />
        <span className="text-burgundy">{article.category}</span>
        <ChevronRight size={14} className="opacity-50" />
        <span className="truncate max-w-[200px] sm:max-w-md">{article.title}</span>
      </div>

      {/* Header */}
      <div className="max-w-[720px] mx-auto text-center mb-14">
        <span className="inline-block text-burgundy text-[0.6875rem] font-bold uppercase tracking-[0.1em] mb-4 font-sans">
          {categoryLabel}
        </span>
        <h1 
          className="text-ink text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.2] font-normal mb-5"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-[#8B7B6B] text-[0.8125rem] font-sans">
          <span>{formatDate(article.date, lang)}</span>
          <span className="text-[#C7B7A3]">·</span>
          <span>{article.readTime} read</span>
          <span className="text-[#C7B7A3]">·</span>
          <span>Updated recently</span>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-[680px] mx-auto font-sans text-ink leading-[1.8] text-[1rem]">
        {article.body.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-ink text-[1.5rem] mt-14 mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-ink text-[1.25rem] mt-10 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
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
          if (paragraph.includes('**IMPORTANT NOTE**') || paragraph.startsWith('**')) {
            // Rough callout formatting if it starts with **
             return (
              <div key={index} className="bg-cream p-6 rounded-[4px] border-l-[3px] border-burgundy my-8">
                {paragraph.split('**').map((part, i) => (
                   i % 2 !== 0 ? <strong key={i} className="text-burgundy uppercase text-[0.875rem] tracking-[0.06em] block mb-2">{part}</strong> : <span key={i} className="text-ink text-[0.9375rem]">{part}</span>
                ))}
              </div>
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

      {/* Footer Tags & Share */}
      <div className="max-w-[680px] mx-auto mt-12 mb-16 border-t border-[#D4C4B4]/50 pt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags?.map((tag) => (
            <span key={tag} className="bg-cream text-burgundy text-[0.6875rem] font-semibold px-3 py-1 rounded-sm font-sans block">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between border-t border-[#D4C4B4]/50 pt-8">
          <span className="text-[#8B7B6B] text-[0.75rem] font-semibold uppercase font-sans">Share this article</span>
          <div className="flex items-center gap-3 text-[#5C4A42]">
            <button className="w-9 h-9 border border-[#B5A899] rounded-full flex items-center justify-center hover:bg-cream hover:border-burgundy hover:text-burgundy transition-all">
              <LinkIcon size={16} />
            </button>
            <button className="w-9 h-9 border border-[#B5A899] rounded-full flex items-center justify-center hover:bg-cream hover:border-burgundy hover:text-burgundy transition-all">
              <Twitter size={16} />
            </button>
            <button className="w-9 h-9 border border-[#B5A899] rounded-full flex items-center justify-center hover:bg-cream hover:border-burgundy hover:text-burgundy transition-all">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="border-t border-[#D4C4B4]/50 pt-16 max-w-7xl mx-auto">
        <h3 className="text-center text-ink text-[1.375rem] mb-10" style={{ fontFamily: 'var(--font-serif)' }}>
          {t("guide.relatedArticles")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link key={rel.slug} href={`/guide/${rel.slug}`} className="block group">
              <div className="bg-white border border-[#D4C4B4] rounded-lg p-7 shadow-card group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(42,26,30,0.08)] transition-all h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3 font-sans">
                  <span className="text-burgundy text-[0.6875rem] font-bold uppercase tracking-[0.1em]" title={rel.category}>
                    {rel.category}
                  </span>
                  <span className="text-[#8B7B6B] text-[0.6875rem]">·</span>
                  <span className="text-[#8B7B6B] text-[0.6875rem]">
                    {rel.readTime}
                  </span>
                </div>
                <h4 className="text-ink text-[1.125rem] mb-3 group-hover:text-burgundy transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-serif)' }}>
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
