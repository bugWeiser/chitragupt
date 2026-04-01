"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, ShoppingCart, Briefcase, FileBadge, MapPin, Heart, Shield, HeartPulse, Landmark, Building, GraduationCap, Car } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const ALL_CATEGORIES = [
  { slug: "consumer", title: "Consumer Rights", icon: <ShoppingCart size={24} />, desc: "Protect yourself against defective products and fraud.", issues: ["Defective product", "Refund denied", "Misleading ads", "Service complaint"] },
  { slug: "workplace", title: "Workplace & Employment", icon: <Briefcase size={24} />, desc: "Rights related to salary, termination, and workplace environment.", issues: ["Salary unpaid", "Wrongful termination", "Harassment at work", "PF/ESI not deposited"] },
  { slug: "police", title: "Police & FIR", icon: <FileBadge size={24} />, desc: "Guidelines on police procedures, FIRs, and bail.", issues: ["Refusal to file FIR", "False FIR against you", "Custody rights", "Bail information"] },
  { slug: "property", title: "Property & Real Estate", icon: <MapPin size={24} />, desc: "Disputes involving property ownership, builders, and RERA.", issues: ["Builder delay", "Possession not given", "Property fraud", "Encroachment"] },
  { slug: "family", title: "Family & Matrimonial", icon: <Heart size={24} />, desc: "Laws regarding marriage, divorce, and domestic issues.", issues: ["Divorce process", "Domestic violence", "Child custody", "Alimony / Maintenance"] },
  { slug: "cyber", title: "Cyber Crime & Online Fraud", icon: <Shield size={24} />, desc: "Recourse for online scams, hacking, and digital harassment.", issues: ["Online scam", "Identity theft", "Social media harassment", "Data privacy"] },
  { slug: "medical", title: "Medical Negligence", icon: <HeartPulse size={24} />, desc: "Rights against improper medical treatment and hospital disputes.", issues: ["Wrong treatment", "Surgery gone wrong", "Overcharging by hospital", "Denied treatment"] },
  { slug: "financial", title: "Banking & Financial Fraud", icon: <Landmark size={24} />, desc: "Issues with loans, credit cards, and banking institutions.", issues: ["Loan harassment", "Unauthorized transactions", "Credit card fraud", "Recovery agent threats"] },
  { slug: "government", title: "Government & Public Services", icon: <Building size={24} />, desc: "Dealing with government offices, RTI, and public schemes.", issues: ["Passport delays", "Pension not received", "Corruption complaint", "RTI follow-up"] },
  { slug: "education", title: "Education & Student Rights", icon: <GraduationCap size={24} />, desc: "Protection for students against unfair institutional practices.", issues: ["Fee refund", "Ragging", "Unfair grading", "Admission fraud"] },
  { slug: "traffic", title: "Traffic & Motor Vehicle", icon: <Car size={24} />, desc: "Handling challans, accidents, and insurance claims.", issues: ["Challan disputes", "Accident claim", "Insurance not paid", "Towing complaints"] },
];

export default function IssuesDirectory() {
  const { t } = useLang();

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-20 pb-24 px-6 lg:px-16">
      <div className="max-w-[1120px] mx-auto w-full">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-14 animate-fade-up max-w-[640px] mx-auto">
          <h1 className="text-display text-ink mb-4 text-balance" style={{ fontFamily: "var(--font-serif)" }}>
            {t("issues.pageTitle")}
          </h1>
          <p className="text-[1rem] text-[#5C4A42] mx-auto leading-[1.7]">
            {t("issues.pageSubtitle")}
          </p>
        </div>

        {/* ── CATEGORY GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {ALL_CATEGORIES.map(category => (
            <Link
              key={category.slug}
              href={`/issues/${category.slug}`}
              className="group flex flex-col h-full relative bg-white border border-[#D4C4B4] rounded-[6px] p-8 shadow-[0_1px_4px_rgba(42,26,30,0.04)] hover:shadow-[0_4px_16px_rgba(42,26,30,0.08)] hover:-translate-y-[2px] hover:border-[#C7B7A3] transition-all duration-300"
            >
              <div className="text-[#561C24] mb-4">
                {category.icon}
              </div>
              
              <h2 className="text-[1.25rem] text-[#2A1A1E] mb-3 group-hover:text-[#561C24] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                {category.title}
              </h2>
              
              <p className="text-[0.9375rem] text-[#5C4A42] mb-5 leading-[1.6]">
                {category.desc}
              </p>
              
              <div className="mt-auto">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#6D2932] mb-3">{t("issues.commonIssues")}</p>
                <ul className="space-y-2 mb-6">
                  {category.issues.map((issue, idx) => (
                    <li key={idx} className="text-[0.875rem] text-[#5C4A42] flex items-start leading-snug">
                      <span className="text-[#A69485] mr-2">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E8D8C4] flex justify-end text-[#A69485] group-hover:text-[#561C24] transition-colors">
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="max-w-[640px] mx-auto text-center border-t border-border pt-16 flex flex-col items-center">
          <h3 className="text-heading-3 text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            {t("issues.notSure")}
          </h3>
          <p className="text-[#5C4A42] mb-8 max-w-md mx-auto leading-relaxed text-[0.9375rem]">
            Describe your problem in your own words. Our AI will analyze your situation and point you strictly to the right laws and next steps.
          </p>
          <Link href="/analyze" className="btn-primary w-full sm:w-auto gap-2">
            <Sparkles size={16} /> {t("issues.describeToAi")}
          </Link>
        </div>

      </div>
    </div>
  );
}
