"use client";

import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const LAWYERS = [
  {
    id: 1,
    initials: "PS",
    name: "Adv. Priya Sharma",
    rating: "4.8",
    location: "Indore, Madhya Pradesh",
    lang: "Hindi, English",
    exp: "8 years experience",
    tags: ["TENANT LAW", "CONSUMER RIGHTS", "FAMILY LAW"],
    cost: "💰 Pro Bono available | ₹500 first consultation",
    isLegalAid: false
  },
  {
    id: 2,
    initials: "RK",
    name: "Adv. Ramesh Kumar",
    rating: "4.6",
    location: "Bhopalkan, Madhya Pradesh",
    lang: "Hindi",
    exp: "12 years experience",
    tags: ["WORKPLACE ISSUES", "RTI EXPERT", "BANKING"],
    cost: "💰 100% Pro Bono (Legal Aid)",
    isLegalAid: true,
    aidTitle: "DISTRICT LEGAL AID AUTHORITY"
  },
  {
    id: 3,
    initials: "SP",
    name: "Adv. Sunita Patel",
    rating: "4.9",
    location: "Gwalior, Madhya Pradesh",
    lang: "Hindi, English, Marathi",
    exp: "15 years experience",
    tags: ["DOMESTIC VIOLENCE", "FAMILY LAW", "WOMEN'S RIGHTS"],
    cost: "💰 Pro Bono for domestic violence cases",
    isLegalAid: false
  },
  {
    id: 4,
    initials: "VD",
    name: "Adv. Vikram Desai",
    rating: "4.7",
    location: "Mumbai, Maharashtra",
    lang: "English, Marathi, Hindi",
    exp: "10 years experience",
    tags: ["CYBER CRIME", "BANKING FRAUD", "CORPORATE LAW"],
    cost: "💰 ₹1500 first consultation",
    isLegalAid: false
  },
  {
    id: 5,
    initials: "AK",
    name: "Adv. Anjali Krishnan",
    rating: "4.5",
    location: "Bangalore, Karnataka",
    lang: "English, Kannada, Hindi",
    exp: "5 years experience",
    tags: ["CONSUMER RIGHTS", "TENANT LAW"],
    cost: "💰 100% Pro Bono (Legal Aid)",
    isLegalAid: true,
    aidTitle: "HIGH COURT LEGAL SERVICES"
  },
  {
    id: 6,
    initials: "MD",
    name: "Adv. Manish Dubey",
    rating: "4.8",
    location: "Delhi, NCR",
    lang: "Hindi, English, Punjabi",
    exp: "20 years experience",
    tags: ["POLICE & FIR", "CRIMINAL LAW", "RTI"],
    cost: "💰 ₹1000 first consultation",
    isLegalAid: false
  }
];

export default function FindLawyerPage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-[120px] pb-24 px-6 lg:px-16">
      
      {/* ── HEADER ── */}
      <div className="text-center mb-[60px] animate-fade-up">
        <h1 className="text-display text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          {t("lawyers.pageTitle")}
        </h1>
        <p className="text-[1.125rem] text-[#5C4A42] max-w-lg mx-auto leading-relaxed">
          {t("lawyers.pageSubtitle")}
        </p>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="max-w-[900px] mx-auto w-full mb-12 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-[#D4C4B4] pb-4">
          <p className="text-[0.8125rem] font-bold tracking-widest uppercase text-ink/40">Filters</p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
             <button className="text-[0.8125rem] font-bold tracking-widest uppercase text-burgundy hover:text-maroon border border-border px-4 py-2 rounded-[2px] bg-white">Location: Madhya Pradesh</button>
             <button className="text-[0.8125rem] font-bold tracking-widest uppercase text-burgundy hover:text-maroon border border-border px-4 py-2 rounded-[2px] bg-white">Practice Area: All</button>
          </div>
        </div>
      </div>

      {/* ── LAWYER LIST ── */}
      <div className="max-w-[900px] mx-auto w-full flex flex-col space-y-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
        {LAWYERS.map((lawyer) => (
          <div key={lawyer.id} className="card-editorial flex flex-col sm:flex-row justify-between w-full relative group shadow-sm bg-white hover:border-[#C7B7A3] transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex-1 flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                 <div className="w-[64px] h-[64px] rounded-full bg-ivory flex items-center justify-center border-2 border-surface mb-2">
                    <span className="text-burgundy font-serif text-[1.5rem] italic">{lawyer.initials}</span>
                 </div>
                 <div className="text-center sm:text-left">
                   <p className="text-[0.6875rem] font-bold tracking-widest uppercase text-ink/40">RATING</p>
                   <p className="text-[1.25rem] font-bold text-ink" style={{ fontFamily: "var(--font-serif)" }}>{lawyer.rating}</p>
                 </div>
              </div>

              <div className="flex-1">
                <h3 className="text-heading-3 text-ink mb-1 group-hover:text-burgundy transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {lawyer.name}
                </h3>
                {lawyer.isLegalAid && (
                  <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#4A6741] flex items-center gap-1 mb-2">
                    🏛️ {lawyer.aidTitle}
                  </p>
                )}
                <p className="text-[0.9375rem] text-[#5C4A42] flex items-center gap-2 mb-1">
                  📍 {lawyer.location}
                </p>
                <p className="text-[0.875rem] text-[#6B5A52] mb-3">
                  <span className="font-semibold text-ink/60">Langs:</span> {lawyer.lang} • <span className="font-semibold text-ink/60">Exp:</span> {lawyer.exp}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lawyer.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-surface border border-border rounded-[2px] text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-ink/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-ivory rounded-[2px] border-l-2 border-burgundy inline-block w-full sm:w-auto">
                   <p className="text-[0.875rem] font-medium text-ink/80">{lawyer.cost}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end mt-6 sm:mt-0 sm:ml-6 flex-shrink-0">
               <button className="bg-[#561C24] text-[#F5EDE3] hover:bg-[#6D2932] px-6 py-3 rounded-[2px] font-semibold text-[0.8125rem] uppercase tracking-[0.1em] transition-colors w-full sm:w-auto">
                 {t("common.actions.book")} {t("lawyers.consultation")}
               </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
