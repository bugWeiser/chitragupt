"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guideArticles } from "@/data/guide-articles";
import { useLang } from "@/context/LanguageContext";

export default function GuidePage() {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Tenant Rights",
    "Consumer",
    "Workplace",
    "Police & FIR",
    "Cyber Crime",
    "Property",
    "Family Law",
    "RTI & Government",
    "Financial Fraud",
    "Know Your Rights",
  ];

  const filteredArticles =
    activeCategory === "All"
      ? guideArticles
      : guideArticles.filter((a) => a.category === activeCategory);

  const featuredArticle = filteredArticles.find((a) => a.isFeatured) || filteredArticles[0];
  const remainingArticles = filteredArticles.filter((a) => a.slug !== featuredArticle?.slug);

  return (
    <div className="min-h-screen bg-surface w-full">
      <div className="py-12 md:py-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-[700px] mx-auto text-center mb-8 md:mb-12">
          <h1
            className="text-ink mb-4 font-normal tracking-tight"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 6vw, 3rem)' }}
          >
            {t("guide.pageTitle")}
          </h1>
          <p className="text-[#5C4A42] text-[0.9375rem] md:text-base leading-[1.7] max-w-lg mx-auto px-2" style={{ fontFamily: 'var(--font-sans)' }}>
            {t("guide.pageSubtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-3 mb-10 pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            // Simplified translation mapping
            const catKey = cat === "All" ? "all" :
                           cat === "Tenant Rights" ? "tenantRights" :
                           cat === "Consumer" ? "consumer" :
                           cat === "Workplace" ? "workplace" :
                           cat === "Police & FIR" ? "policeFir" :
                           cat === "Cyber Crime" ? "cyberCrime" :
                           cat === "Property" ? "property" :
                           cat === "Family Law" ? "familyLaw" :
                           cat === "RTI & Government" ? "rtiGovt" :
                           cat === "Financial Fraud" ? "financialFraud" :
                           cat === "Know Your Rights" ? "knowYourRights" : cat;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive
                    ? "bg-burgundy text-ivory border border-transparent"
                    : "bg-transparent text-[#5C4A42] border border-[#B5A899] hover:border-burgundy hover:text-burgundy"
                }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {t(`guide.categories.${catKey}`) || cat}
              </button>
            );
          })}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Link href={`/guide/${featuredArticle.slug}`} className="block group mb-8 md:mb-10 mx-[-4px] md:mx-0">
            <div className="bg-white border border-[#D4C4B4] rounded-lg p-6 md:p-12 shadow-[0_1px_4px_rgba(42,26,30,0.04)] group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(42,26,30,0.08)] transition-all duration-300">
              <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
                <span className="text-burgundy text-[0.6rem] md:text-[0.6875rem] font-bold uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {featuredArticle.category}
                </span>
                <span className="text-[#8B7B6B] text-xs">·</span>
                <span className="text-[#8B7B6B] text-[0.65rem] md:text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
                  {featuredArticle.readTime} read
                </span>
              </div>
              <h2 className="text-ink text-[1.4rem] md:text-[1.75rem] mb-3 md:mb-4 group-hover:text-burgundy transition-colors line-clamp-2 md:line-clamp-none font-serif leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-[#5C4A42] text-[0.875rem] md:text-base leading-[1.7] line-clamp-2 mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                {featuredArticle.excerpt}
              </p>
              <div className="flex justify-between items-center border-t border-[#D4C4B4]/50 pt-5 md:pt-6">
                <span className="text-[#8B7B6B] text-[0.75rem] md:text-[0.8125rem]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {new Date(featuredArticle.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="text-burgundy font-semibold text-xs md:text-sm flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                  {t("guide.readArticle")} <ArrowRight size={14} className="md:size-16" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {remainingArticles.map((article) => (
            <Link key={article.slug} href={`/guide/${article.slug}`} className="block group h-full">
              <div className="bg-white border border-[#D4C4B4] rounded-lg p-7 shadow-[0_1px_4px_rgba(42,26,30,0.04)] group-hover:-translate-y-1 group-hover:shadow-[0_4px_20px_rgba(42,26,30,0.08)] transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-burgundy text-[0.6875rem] font-bold uppercase tracking-[0.1em] truncate max-w-[120px]" title={article.category}>
                    {article.category}
                  </span>
                  <span className="text-[#8B7B6B] text-[0.6875rem]">·</span>
                  <span className="text-[#8B7B6B] text-[0.6875rem] whitespace-nowrap">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-ink text-[1.125rem] leading-snug line-clamp-2 mb-3 group-hover:text-burgundy transition-colors flex-none" style={{ fontFamily: 'var(--font-serif)' }}>
                  {article.title}
                </h3>
                <p className="text-[#5C4A42] text-[0.875rem] line-clamp-3 leading-relaxed mb-6 flex-1">
                  {article.excerpt}
                </p>
                <div className="border-t border-[#D4C4B4]/50 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-[#8B7B6B] text-[0.8125rem]">
                    {new Date(article.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <ArrowRight size={16} className="text-[#C7B7A3] group-hover:text-burgundy group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {remainingArticles.length > 0 && (
          <div className="text-center">
            <button className="px-6 py-3 border border-burgundy text-burgundy rounded-[4px] font-medium text-sm hover:bg-burgundy hover:text-ivory transition-colors">
              {t("guide.loadMore")}
            </button>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="w-full bg-burgundy py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-ivory text-[1.5rem] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            {t("guide.newsletter.title")}
          </h2>
          <p className="text-taupe mb-8 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
            {t("guide.newsletter.subtitle")}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t("guide.newsletter.emailPlaceholder")}
              className="flex-1 bg-white border-0 px-4 py-3 rounded-[4px] text-ink text-sm outline-none focus:ring-2 focus:ring-ivory/50"
              required
            />
            <button className="bg-cream text-ink px-6 py-3 rounded-[4px] font-semibold text-sm hover:bg-white transition-colors whitespace-nowrap">
              {t("guide.newsletter.subscribe")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
