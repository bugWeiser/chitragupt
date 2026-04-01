"use client";

import React, { useState, useRef } from "react";
import { Copy, Check, UploadCloud, FileText, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function AnalyzePage() {
  const { t } = useLang();
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed]   = useState(false);
  const [dragActive, setDragActive]   = useState(false);

  // Simulated upload and processing
  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzed(true);
    }, 2500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleSimulatedUpload();
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-[120px] pb-24 px-6 lg:px-16">
      <div className="max-w-[800px] mx-auto w-full">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-[80px] animate-fade-up">
          <h1 className="text-display text-ink mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            {t("analyze.pageTitle")}
          </h1>
          <p className="text-[1.125rem] text-[#5C4A42] max-w-lg mx-auto leading-relaxed">
            {t("analyze.pageSubtitle")}
          </p>
        </div>

        {!isAnalyzed ? (
          /* ── UPLOAD AREA ── */
          <div className="max-w-[560px] mx-auto animate-fade-up" style={{ animationDelay: "50ms" }}>
            <div
              className={`relative bg-white border-2 border-dashed rounded-[4px] p-12 text-center transition-all duration-300 ${
                dragActive ? "border-[#561C24] bg-[#F5EDE3]" : "border-[#C7B7A3] hover:border-[#561C24]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-[1.375rem] text-[#2A1A1E] italic mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                    {t("analyze.analyzing")}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#561C24] animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#561C24] animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#561C24] animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <p className="text-[0.875rem] text-[#6B5A52]">{t("analyze.analyzeTime")}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#F5EDE3] text-[#561C24] flex items-center justify-center mb-6">
                    <UploadCloud size={28} />
                  </div>
                  <h3 className="text-heading-3 text-ink mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    {t("analyze.dragDocuments")}
                  </h3>
                  <p className="text-[#5C4A42] text-[0.9375rem] mb-6">{t("analyze.orBrowse")}</p>
                  <button onClick={handleSimulatedUpload} className="btn-secondary w-full sm:w-auto">
                    {t("common.actions.browseFiles")}
                  </button>
                  <p className="text-[0.8125rem] text-[#8B7B6B] mt-8 uppercase tracking-widest font-semibold">
                    {t("analyze.acceptedFormats")}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-start gap-3 justify-center text-center opacity-60 px-4">
              <ShieldCheck size={16} className="text-[#2A1A1E] flex-shrink-0 mt-0.5" />
              <p className="text-[0.8125rem] text-[#2A1A1E] leading-relaxed max-w-[400px]">
                {t("analyze.privacyNote")}
              </p>
            </div>
          </div>
        ) : (
          /* ── ANALYSIS RESULTS ── */
          <div className="animate-fade-in space-y-20">
            {/* ── SECTION A: YOUR RIGHTS ── */}
            <section className="mb-20">
              <div className="mb-10 flex items-center justify-between border-b border-[#D4C4B4] pb-6">
                <div>
                  <p className="text-label text-[#561C24] mb-2">{t("analyze.analysisComplete")}</p>
                  <h2 className="text-heading-2 text-ink" style={{ fontFamily: "var(--font-serif)" }}>
                    {t("analyze.yourLeverage")}
                  </h2>
                </div>
                <div className="flex bg-[#F5EDE3] p-3 rounded-[4px] gap-3 items-center">
                  <FileText size={20} className="text-[#561C24]" />
                  <div className="text-left hidden sm:block">
                    <p className="text-[0.8125rem] font-bold text-[#2A1A1E]">termination_letter.pdf</p>
                    <p className="text-[0.6875rem] text-[#6B5A52]">320 KB • Scanned 2 mins ago</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 px-2 sm:px-6">
                <div className="flex items-start gap-5 group">
                  <div className="mt-1 bg-[#F5EDE3] text-[#561C24] p-1 rounded-sm flex-shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <p className="text-[1.0625rem] text-ink leading-[1.8] max-w-prose">
                    Based on your termination letter, the company did not provide the mandatory 30-day notice period stipulated in your appended employment contract.
                  </p>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="mt-1 bg-[#F5EDE3] text-[#561C24] p-1 rounded-sm flex-shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <p className="text-[1.0625rem] text-ink leading-[1.8] max-w-prose">
                    Withholding your final settlement beyond 45 days is a direct violation of the Payment of Wages Act, 1936.
                  </p>
                </div>
              </div>
            </section>

            <div className="divider-editorial" />

            {/* ── SECTION B: YOUR ACTION PLAN ── */}
            <section>
              <h2 className="text-heading-2 text-ink mb-12" style={{ fontFamily: "var(--font-serif)" }}>
                {t("analyze.whatToDo")}
              </h2>
              
              <div className="relative pl-6 sm:pl-10 pb-8">
                <div className="absolute top-2 bottom-0 left-[11px] sm:left-[19px] w-[1px] bg-[#D4C4B4]" />
                
                <div className="flex flex-col gap-[3rem]">
                  <div className="relative">
                    <div className="absolute top-1 -left-[1.875rem] sm:-left-[2.875rem] w-6 h-6 rounded-full bg-[#561C24] flex items-center justify-center z-10 transition-transform">
                      <span className="text-[0.6875rem] font-bold text-[#F5EDE3] font-sans">1</span>
                    </div>
                    <div className="pl-6">
                      <h3 className="text-[1.25rem] text-[#561C24] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                        Send a Legal Notice
                      </h3>
                      <p className="text-[0.9375rem] text-[#5C4A42] mb-4 max-w-md leading-relaxed">
                        Demand the 1-month salary in lieu of notice period plus your 45-day pending settlement. Give them 15 days to comply.
                      </p>
                      <button className="text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-[#6D2932] hover:text-[#561C24] flex items-center gap-2 group w-fit transition-colors">
                        Auto-Draft Notice <ArrowRight size={14} className="group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1 -left-[1.875rem] sm:-left-[2.875rem] w-6 h-6 rounded-full bg-[#561C24] flex items-center justify-center z-10">
                      <span className="text-[0.6875rem] font-bold text-[#F5EDE3] font-sans">2</span>
                    </div>
                    <div className="pl-6">
                      <h3 className="text-[1.25rem] text-[#561C24] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                        File a complaint with the Labour Commissioner
                      </h3>
                      <p className="text-[0.9375rem] text-[#5C4A42] mb-4 max-w-md leading-relaxed">
                        If the 15 days expire without resolution, approach the local Assistant Labour Commissioner. This process costs ₹0.
                      </p>
                      <button className="text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-[#6D2932] hover:text-[#561C24] flex items-center gap-2 group w-fit transition-colors">
                        Find Commissioner Office <ArrowRight size={14} className="group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider-editorial" />

            {/* ── SECTION C: LEGAL GROUNDING ── */}
            <section className="mb-24">
              <div className="flex items-start gap-3 bg-[#F5EDE3] p-6 rounded-[8px]">
                <ShieldCheck size={20} className="text-[#A69485] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-label text-[#561C24] mb-2">{t("analyze.verifiedLegalGrounding")}</p>
                  <p className="text-[0.9375rem] text-[#5C4A42] font-medium leading-relaxed">
                    Payment of Wages Act, 1936; Industrial Disputes Act, 1947 Section 2(A).
                  </p>
                </div>
              </div>
            </section>

            <div className="text-center">
              <button 
                onClick={() => { setIsAnalyzed(false); setDragActive(false); }} 
                className="btn-ghost"
              >
                {t("common.actions.uploadAnother")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
