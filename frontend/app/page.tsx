"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Scale, Search, ShieldCheck } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { Marquee } from "@/components/ui/Marquee";
import { Highlighter } from "@/components/ui/Highlighter";
import { useLang } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useNews";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

const FEATURED_CATEGORIES = [
  { slug: "consumer", title: "Consumer Rights", desc: "Defective products, refunds, e-commerce issues.", tags: ["Refunds", "Fake Ads", "Warranty"] },
  { slug: "workplace", title: "Workplace & Employment", desc: "Unpaid salary, harassment, termination.", tags: ["Salary", "PF/ESI", "Notice Period"] },
  { slug: "police", title: "Police & FIR", desc: "FIR refusal, false cases, bail procedures.", tags: ["Refused FIR", "Bail", "Online Complaint"] },
  { slug: "property", title: "Property & Real Estate", desc: "Builder delays, fraud, title disputes.", tags: ["RERA", "Fraud", "Encroachment"] },
  { slug: "family", title: "Family & Matrimonial", desc: "Divorce, domestic violence, maintenance.", tags: ["Divorce", "Maintenance", "Custody"] },
];

export default function Home() {
  const router = useRouter();
  const { t } = useLang();
  const { items } = useNews();
  const [query, setQuery] = useState("");

  const latestAlert = items.find(n => n.isAlert);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ai-assist?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/ai-assist");
    }
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen">
      
      {/* ── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative pt-[120px] pb-[80px] px-6 lg:px-16 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 pointer-events-none flex justify-center opacity-[0.03]">
          <div className="w-[1px] h-full bg-burgundy mx-auto absolute left-1/4" />
          <div className="w-[1px] h-full bg-burgundy mx-auto absolute right-1/4" />
          <div className="w-full h-[1px] bg-burgundy mx-auto absolute top-1/3" />
        </div>

        {/* Extra Large Watermark Logo - 5% Opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.05]">
          <div className="relative w-[800px] h-[800px] md:w-[1600px] md:h-[1600px] animate-fade-in">
            <Image
              src="/logo.png"
              alt="Background Logo"
              fill
              className="object-contain grayscale"
              priority
            />
          </div>
        </div>

        <div className="max-w-[800px] z-10 animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-display text-ink mb-6 text-balance" style={{ fontFamily: "var(--font-serif)" }}>
            {t("home.hero.title1")} <br />
            <span className="italic text-maroon">{t("home.hero.title2")}</span>
          </h1>
          
          <p className="text-[1.0625rem] text-[#5C4A42] mx-auto mb-10 leading-[1.7] max-w-[540px]">
            {t("home.hero.subtitle")}
          </p>

          <div className="max-w-2xl mx-auto mb-6 relative px-4 md:px-0">
            <form 
              onSubmit={handleSearch}
              className="relative bg-white rounded-full shadow-sm border border-border flex items-center p-1.5 md:p-2 pl-6 md:pl-8 overflow-hidden transition-all hover:shadow-md focus-within:border-burgundy focus-within:ring-4 focus-within:ring-burgundy/10"
            >
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("home.hero.inputPlaceholder")} 
                className="flex-1 bg-transparent text-ink outline-none placeholder:text-[#8B7B6B] text-[1rem] md:text-[1.125rem] w-full"
              />
              <button 
                type="submit"
                className="w-[44px] h-[44px] md:w-[52px] md:h-[52px] rounded-full bg-burgundy text-white flex items-center justify-center hover:bg-maroon transition-colors flex-shrink-0 ml-2"
              >
                <ArrowRight size={18} className="md:size-20" />
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-xl mx-auto px-2">
            {[
              { key: "salaryNotPaid", label: t("home.quickTags.salaryNotPaid") },
              { key: "defectiveProduct", label: t("home.quickTags.defectiveProduct") },
              { key: "firRefusal", label: t("home.quickTags.firRefusal") },
              { key: "builderDelay", label: t("home.quickTags.builderDelay") },
              { key: "socialMediaHarassment", label: t("home.quickTags.socialMediaHarassment") },
              { key: "domesticViolence", label: t("home.quickTags.domesticViolence") },
            ].map((situation) => (
              <button
                key={situation.key}
                onClick={() => {
                  setQuery(situation.label);
                  router.push(`/ai-assist?q=${encodeURIComponent(situation.label)}`);
                }}
                className="px-3 py-1.5 md:px-4 md:py-1.5 bg-white border border-[#B5A899] rounded-full text-[0.75rem] md:text-[0.8125rem] font-medium text-[#5C4A42] hover:border-[#A69485] hover:bg-[#F5EDE3] hover:text-[#561C24] transition-all"
              >
                {situation.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/issues" className="w-full sm:w-auto">
              <button className="bg-[#561C24] text-[#F5EDE3] px-8 py-3.5 text-[0.875rem] font-semibold uppercase tracking-[0.1em] rounded-[2px] whitespace-nowrap hover:bg-[#6D2932] transition-colors w-full sm:w-auto">
                {t("home.hero.exploreRights")}
              </button>
            </Link>
            <Link href="/analyze" className="w-full sm:w-auto">
              <button className="bg-transparent border-[1.5px] border-[#561C24] text-[#561C24] px-8 py-3.5 text-[0.875rem] font-semibold uppercase tracking-[0.1em] rounded-[2px] whitespace-nowrap hover:bg-[#561C24] hover:text-[#F5EDE3] transition-colors w-full sm:w-auto">
                {t("home.hero.analyzeCase")}
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-10 bg-[#C7B7A3] opacity-60" />
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#6B5A52] flex items-center gap-2">
              {t("home.hero.trustedBy")}
            </p>
            <div className="h-[1px] w-10 bg-[#C7B7A3] opacity-60" />
          </div>

          {/* ── LATEST ALERT STRIP ── */}
          {latestAlert && (
            <div className="mt-12 w-full max-w-4xl animate-fade-in group cursor-pointer border-t border-border/50 pt-8">
              <Link href="/news" className="flex flex-col md:flex-row items-center gap-4 bg-burgundy/5 border border-burgundy/10 p-4 rounded-sm hover:bg-burgundy/10 transition-all">
                <div className="flex items-center gap-2 text-burgundy shrink-0">
                  <AlertTriangle size={18} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Urgent Alert</span>
                </div>
                <div className="hidden md:block h-4 w-px bg-burgundy/20" />
                <p className="text-ink font-sans text-sm md:text-base font-medium flex-1 text-center md:text-left group-hover:text-burgundy transition-colors">
                  {latestAlert.title}
                </p>
                <div className="flex items-center gap-1 text-burgundy text-xs font-bold uppercase tracking-widest shrink-0 group-hover:translate-x-1 transition-transform">
                  Read more <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── TEXT REVEAL SECTION ── */}
      <section className="py-32 bg-white border-y border-border flex items-center justify-center overflow-hidden">
        <div className="max-w-4xl px-6">
          <TextReveal className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#561C24] text-center leading-[1.1] tracking-tight">
            {t("home.textReveal")}
          </TextReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-[100px] px-6 lg:px-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
            
            <div className="flex flex-col items-start">
              <span className="text-maroon font-serif text-3xl italic mb-4">01</span>
              <h3 className="text-heading-3 text-ink mb-3" style={{ fontFamily: "var(--font-serif)" }}>{t("home.howItWorks.step1Title")}</h3>
              <p className="text-[#5C4A42] leading-relaxed text-[0.9375rem]">
                {t("home.howItWorks.step1Desc")}
              </p>
            </div>

            <div className="flex flex-col items-start relative">
              <span className="hidden md:block absolute top-4 -left-12 w-8 h-[1px] bg-border" />
              <span className="text-maroon font-serif text-3xl italic mb-4">02</span>
              <h3 className="text-heading-3 text-ink mb-3" style={{ fontFamily: "var(--font-serif)" }}>{t("home.howItWorks.step2Title")}</h3>
              <p className="text-[#5C4A42] leading-relaxed text-[0.9375rem]">
                {t("home.howItWorks.step2Desc")}
              </p>
            </div>

            <div className="flex flex-col items-start relative">
              <span className="hidden md:block absolute top-4 -left-12 w-8 h-[1px] bg-border" />
              <span className="text-maroon font-serif text-3xl italic mb-4">03</span>
              <h3 className="text-heading-3 text-ink mb-3" style={{ fontFamily: "var(--font-serif)" }}>{t("home.howItWorks.step3Title")}</h3>
              <p className="text-[#5C4A42] leading-relaxed text-[0.9375rem]">
                {t("home.howItWorks.step3Desc")}
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ──────────────────────────────── */}
      <section className="py-[120px] px-6 lg:px-16 bg-ivory">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-label text-burgundy mb-4">{t("home.featured.label")}</p>
              <h2 className="text-heading-2 text-ink text-balance" style={{ fontFamily: "var(--font-serif)" }}>
                {t("home.featured.title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {FEATURED_CATEGORIES.map(category => (
              <Link
                key={category.slug}
                href={`/issues/${category.slug}`}
                className="group card-editorial flex flex-col relative w-full p-6 md:p-8"
              >
                <h3 className="text-xl md:text-heading-3 text-ink mb-3 group-hover:text-burgundy transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {category.title}
                </h3>
                <p className="text-[0.875rem] md:text-[0.9375rem] text-[#5C4A42] mb-6 md:mb-8 flex-1 leading-relaxed">
                  {category.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {category.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-ivory text-burgundy text-[0.6rem] md:text-[0.6875rem] font-semibold uppercase tracking-[0.08em] rounded-[2px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-maroon text-sm font-medium tracking-wide mt-auto">
                  {t("home.featured.exploreRights")} <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/issues" className="btn-ghost text-[0.875rem]">
              {t("home.featured.viewAll")} <ArrowRight size={14} className="ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS MARQUEE ───────────────────────────────────── */}
      <section className="py-[100px] bg-white border-t border-border overflow-hidden">
        <div className="mb-12 text-center">
          <h2 className="text-heading-2 text-ink" style={{ fontFamily: "var(--font-serif)" }}>
            What our citizens <Highlighter action="highlight" color="#C7B7A3">say about us</Highlighter>
          </h2>
        </div>
        <Marquee className="[--duration:40s]" pauseOnHover>
          {[
            { name: "Rahul D.", user: "@rahul_d", text: "I've never seen anything like this before. It's amazing. I love it." },
            { name: "Sneha P.", user: "@sneha_p", text: "I don't know what to say. I'm speechless. This is amazing." },
            { name: "Vikram S.", user: "@vikram_s", text: "I'm at a loss for words. This is amazing. I love it." },
            { name: "Priya M.", user: "@priya_m", text: "Got my deposit back in 15 days thanks to the legal notice drafted here." },
            { name: "Ananya K.", user: "@ananya_k", text: "The emergency mode saved me when police refused to register my FIR." },
          ].map((review, i) => (
            <div key={i} className="card-editorial mx-3 w-[300px] flex-shrink-0 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8D8C4] flex items-center justify-center text-[#561C24] font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-bold text-[#2A1A1E] text-sm">{review.name}</p>
                  <p className="text-[#6B5A52] text-xs">{review.user}</p>
                </div>
              </div>
              <p className="text-[#5C4A42] text-sm leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── AI CASE ANALYSIS MOMENT ───────────────────────────── */}
      <section className="bg-burgundy py-[120px] px-6 lg:px-16 text-center text-cream relative">
        <div className="max-w-[800px] mx-auto z-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[4px] bg-ivory/10 border border-ivory/20 mb-8 backdrop-blur-sm">
            <FileText size={28} className="text-ivory" />
          </div>
          
          <h2 className="text-heading-2 mb-6 text-balance !text-[#F5EDE3]" style={{ fontFamily: "var(--font-serif)" }}>
            {t("home.aiSection.title1")} <br/>
            <span className="italic opacity-80">{t("home.aiSection.title2")}</span>
          </h2>
          
          <p className="text-[1.125rem] text-[#E8D8C4] mb-10 max-w-[600px] mx-auto font-sans leading-relaxed">
            {t("home.aiSection.desc")}
          </p>
          
          <Link href="/analyze" className="inline-flex items-center justify-center bg-ivory text-burgundy font-semibold text-[0.875rem] uppercase tracking-[0.1em] px-8 py-4 rounded-[2px] hover:bg-white transition-colors">
            {t("home.aiSection.cta")}
          </Link>
        </div>
      </section>

      {/* ── CREDIBILITY FOOTER ───────────────────────────────── */}
      <section className="py-[60px] px-6 text-center">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <ShieldCheck size={24} className="text-burgundy" />
          <p className="text-[0.8125rem] uppercase tracking-[0.08em] font-medium text-ink">
            Legal mapping referenced from:
          </p>
          <p className="text-[0.875rem] text-ink/80 max-w-2xl text-balance">
            Constitution of India • Bharatiya Nyaya Sanhita (BNS) • Transfer of Property Act, 1882 • Consumer Protection Act, 2019 • Information Technology Act, 2000
          </p>
        </div>
      </section>

    </div>
  );
}
