"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function RTIGenerator() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const steps = [t("rti.steps.details"), t("rti.steps.department"), t("rti.steps.questions"), t("rti.steps.preview"), t("rti.steps.download")];

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-[120px] pb-24 px-6 lg:px-16">
      
      {/* ── HEADER ── */}
      <div className="text-center mb-[80px] animate-fade-up">
        <h1 className="text-display text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          RTI Application Generator
        </h1>
        <p className="text-[1.125rem] text-ink/70 max-w-lg mx-auto leading-relaxed">
          File a Right to Information request in under 5 minutes
        </p>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div className="max-w-[800px] mx-auto w-full mb-16 px-4 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-border z-0" />
          
          {steps.map((label, i) => {
            const num = i + 1;
            const isCompleted = step > num;
            const isActive = step === num;
            const isUpcoming = step < num;

            return (
              <div key={num} className="relative z-10 flex flex-col items-center gap-3 bg-surface px-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[0.8125rem] transition-all duration-300 ${
                  isCompleted ? "bg-maroon text-ivory border border-maroon" :
                  isActive ? "bg-burgundy text-ivory border-2 border-burgundy scale-110" :
                  "bg-surface text-ink/30 border border-border"
                }`}>
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : num}
                </div>
                <span className={`text-[0.6875rem] uppercase tracking-[0.1em] font-bold ${
                  isActive ? "text-burgundy" : isCompleted ? "text-maroon/60" : "text-ink/30"
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <div className="max-w-[640px] mx-auto w-full animate-fade-up" style={{ animationDelay: "100ms" }}>
        {step === 1 && (
          <div className="bg-white border border-border rounded-[4px] p-10 sm:p-12 shadow-resting">
            <h2 className="text-heading-3 text-ink mb-10 text-center" style={{ fontFamily: "var(--font-serif)" }}>{t("rti.form.applicantDetails")}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-label text-maroon mb-2 block">{t("rti.form.fullName")}</label>
                <input type="text" className="input-editorial" placeholder={t("rti.form.fullNamePlaceholder")} />
              </div>
              <div>
                <label className="text-label text-maroon mb-2 block">{t("rti.form.address")}</label>
                <textarea className="input-editorial resize-none h-24" placeholder={t("rti.form.addressPlaceholder")}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-label text-maroon mb-2 block">{t("rti.form.city")}</label>
                  <input type="text" className="input-editorial" placeholder={t("rti.form.cityPlaceholder")} />
                </div>
                <div>
                  <label className="text-label text-maroon mb-2 block">{t("rti.form.pincode")}</label>
                  <input type="text" className="input-editorial" placeholder={t("rti.form.pincodePlaceholder")} />
                </div>
              </div>
            </div>

            <div className="mt-12 text-center md:block hidden">
              <button onClick={() => setStep(2)} className="btn-primary w-full sm:w-auto">
                {t("rti.form.continueTo")} <ArrowRight size={16} className="ml-2 inline" />
              </button>
            </div>

            {/* Mobile sticky submit */}
            <div className="md:hidden fixed bottom-[48px] left-0 right-0 z-[200] p-4 bg-white/95 backdrop-blur-md border-t border-[#D4C4B4]">
              <button onClick={() => setStep(2)} className="btn-primary w-full">
                {t("common.actions.continue")} <ArrowRight size={16} className="ml-2 inline" />
              </button>
            </div>
          </div>
        )}

        {step > 1 && (
          <div className="bg-white border border-border rounded-[4px] p-10 sm:p-12 shadow-resting text-center py-20">
            <p className="text-[1.125rem] text-ink/60 mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              {t("rti.placeholderStep")}
            </p>
            <button onClick={() => setStep(1)} className="btn-ghost">
              {t("rti.backToStart")}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
