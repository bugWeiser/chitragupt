"use client";

import React from "react";
import { Phone, ShieldAlert, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function EmergencyPage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col bg-[#561C24] min-h-screen text-[#F5EDE3]">
      <div className="max-w-[800px] mx-auto w-full px-6 pt-[120px] pb-24">
        
        {/* ── HEADER ── */}
        <div className="mb-16">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] mb-6 animate-fade-up" style={{ fontFamily: "var(--font-serif)" }}>
            {t("emergency.pageTitle")}
          </h1>
          <p className="text-[1.125rem] text-[#D4C4B4] max-w-[500px] animate-fade-up" style={{ animationDelay: "50ms" }}>
            {t("emergency.pageSubtitle")}
          </p>
        </div>

        {/* ── IMMEDIATE OPTIONS ── */}
        <div className="flex flex-col gap-4 mb-20 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <a href="tel:15100" className="flex items-center justify-between bg-[#F5EDE3] text-[#2A1A1E] p-6 rounded-[4px] hover:bg-white transition-colors group">
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-[#561C24]" />
              <div>
                <span className="block text-[1.25rem] font-bold tracking-wide">{t("emergency.call15100")}</span>
                <span className="text-[0.875rem] text-[#5C4A42] font-medium">{t("emergency.nwh")}</span>
              </div>
            </div>
            <ArrowRight size={24} className="text-[#A69485] group-hover:text-[#561C24] group-hover:translate-x-1 transition-all" />
          </a>

          <a href="tel:100" className="flex items-center justify-between border-2 border-[rgba(245,237,227,0.25)] p-6 rounded-[4px] hover:bg-[rgba(245,237,227,0.05)] transition-colors group">
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-[#E8D8C4]" />
              <div>
                <span className="block text-[1.25rem] font-bold tracking-wide">{t("emergency.call100")}</span>
                <span className="text-[0.875rem] text-[#C0AFA3] font-medium">{t("emergency.policeGeneral")}</span>
              </div>
            </div>
            <ArrowRight size={24} className="text-[rgba(245,237,227,0.5)] group-hover:text-[#F5EDE3] group-hover:translate-x-1 transition-all" />
          </a>
          
          <a href="tel:1098" className="flex items-center justify-between border-2 border-[rgba(245,237,227,0.25)] p-6 rounded-[4px] hover:bg-[rgba(245,237,227,0.05)] transition-colors group">
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-[#E8D8C4]" />
              <div>
                <span className="block text-[1.25rem] font-bold tracking-wide">{t("emergency.call1098")}</span>
                <span className="text-[0.875rem] text-[#C0AFA3] font-medium">{t("emergency.childHelpline")}</span>
              </div>
            </div>
            <ArrowRight size={24} className="text-[rgba(245,237,227,0.5)] group-hover:text-[#F5EDE3] group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* ── ARREST / DETENTION GUIDE ── */}
        <div className="border-t border-[rgba(245,237,227,0.15)] pt-16 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <ShieldAlert size={28} className="text-[#E8D8C4]" />
            <h2 className="text-[2rem] text-[#F5EDE3]" style={{ fontFamily: "var(--font-serif)" }}>{t("emergency.rightsTitle")}</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-[1.125rem] leading-relaxed">
              <strong className="text-white bg-[rgba(245,237,227,0.1)] px-2 py-0.5 rounded">{t("emergency.dkBasu")}</strong> {t("emergency.dkBasuText")}
            </p>
            <p className="text-[1.125rem] leading-relaxed">
              <strong className="text-white bg-[rgba(245,237,227,0.1)] px-2 py-0.5 rounded">{t("emergency.rightToInform")}</strong> {t("emergency.rightToInformText")}
            </p>
            <p className="text-[1.125rem] leading-relaxed">
              <strong className="text-white bg-[rgba(245,237,227,0.1)] px-2 py-0.5 rounded">{t("emergency.twentyFourHour")}</strong> {t("emergency.twentyFourHourText")}
            </p>
            <p className="text-[1.125rem] leading-relaxed">
              <strong className="text-white bg-[rgba(245,237,227,0.1)] px-2 py-0.5 rounded">{t("emergency.womensRights")}</strong> {t("emergency.womensRightsText")}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
