"use client";

import React, { useState } from "react";
import { FileText, ArrowRight, ShieldCheck, MessageSquare, History } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function AnalyzePage() {
  const { t } = useLang();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed]   = useState(false);
  const [scenario, setScenario]       = useState("");

  const handleAnalyze = () => {
    if (!scenario.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2500);
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-[120px] pb-24 px-6 lg:px-16 overflow-x-hidden">
      <div className="max-w-[800px] mx-auto w-full">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-[60px] animate-fade-up">
          <h1 className="text-3xl md:text-display text-ink mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            AI Case Analysis
          </h1>
          <p className="text-[1rem] md:text-[1.125rem] text-[#5C4A42] max-w-lg mx-auto leading-relaxed">
            Tell NyayaMitra about your situation. We'll find your legal leverage and provide a step-by-step action plan.
          </p>
        </div>

        {!isAnalyzed ? (
          /* ── INPUT AREA ── */
          <div className="max-w-[640px] mx-auto animate-fade-up" style={{ animationDelay: "50ms" }}>
            <div className="bg-white border border-border rounded-[4px] p-6 md:p-10 shadow-resting">
              <div className="flex items-center gap-3 mb-6 text-burgundy">
                <MessageSquare size={20} />
                <span className="text-[0.75rem] font-bold uppercase tracking-widest">Describe Your Situation</span>
              </div>
              
              <textarea 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="E.g., My landlord is refusing to return my security deposit of ₹40,000 even though I vacated the flat on time and there are no damages..."
                className="input-editorial w-full min-h-[240px] resize-none mb-8 text-[1.0625rem] leading-relaxed"
                disabled={isAnalyzing}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-[#8B7B6B]">
                  <ShieldCheck size={18} />
                  <span className="text-[0.8125rem] font-medium">Confidential & Secure</span>
                </div>
                
                <button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !scenario.trim()}
                  className={`btn-primary w-full sm:w-auto px-10 py-4 shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 ${
                    isAnalyzing || !scenario.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-ivory animate-bounce" style={{ animationDelay: "0s" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-ivory animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-ivory animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                      {t("common.actions.analyzing")}
                    </>
                  ) : (
                    <>
                      Start AI Analysis <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4 justify-center text-center opacity-70 px-4">
              <History size={16} className="text-ink mt-1" />
              <p className="text-[0.875rem] text-ink/70 leading-relaxed max-w-[450px]">
                Referenced from IPC, CrPC, Consumer Protection Act, and current Indian Case Laws.
              </p>
            </div>
          </div>
        ) : (
          /* ── ANALYSIS RESULTS ── */
          <div className="animate-fade-in space-y-16">
            <section>
              <div className="mb-10 border-b border-[#D4C4B4] pb-6">
                <p className="text-[0.75rem] font-bold text-burgundy uppercase tracking-[0.2em] mb-2">Analysis Complete</p>
                <h2 className="text-2xl md:text-heading-2 text-ink" style={{ fontFamily: "var(--font-serif)" }}>
                  Your Legal Leverage
                </h2>
              </div>

              <div className="bg-white border border-border p-8 rounded-sm shadow-sm space-y-8">
                <div className="flex items-start gap-5">
                  <div className="mt-1 bg-burgundy/5 text-burgundy p-1.5 rounded-sm flex-shrink-0">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[1.125rem] font-serif italic text-ink mb-2">Notice Period Violation</h4>
                    <p className="text-[1.0625rem] text-ink/80 leading-[1.8] max-w-prose">
                      Under the Model Tenancy Act and most State laws, the landlord must return the security deposit at the time of handing over possession, or within 30 days if explicitly stated.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 bg-burgundy/5 text-burgundy p-1.5 rounded-sm flex-shrink-0">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[1.125rem] font-serif italic text-ink mb-2">Unfair Deduction Protection</h4>
                    <p className="text-[1.0625rem] text-ink/80 leading-[1.8] max-w-prose">
                      Landlords cannot deduct for "ordinary wear and tear" (e.g., standard painting, minor flooring scratches). This is a protected right under Consumer Protection norms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-heading-2 text-ink mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                Execution Strategy
              </h2>
              
              <div className="space-y-6">
                <div className="bg-ivory border border-border/60 p-6 rounded-sm hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-burgundy text-ivory text-[0.625rem] px-2 py-0.5 font-bold tracking-widest uppercase">Step 01 — Immediate</span>
                    <ArrowRight className="text-burgundy opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                  </div>
                  <h4 className="text-[1.25rem] text-ink mb-2" style={{ fontFamily: "var(--font-serif)" }}>Draft a formal Legal Notice</h4>
                  <p className="text-[0.9375rem] text-ink/70">Clearly state the demand for ₹40,000 return within 15 days or you will initiate BNS (formerly IPC) proceedings for Criminal Breach of Trust.</p>
                </div>

                <div className="bg-burgundy text-ivory p-6 rounded-sm shadow-lg hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-ivory/20 text-ivory text-[0.625rem] px-2 py-0.5 font-bold tracking-widest uppercase">Step 02 — Secondary</span>
                    <ArrowRight className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                  </div>
                  <h4 className="text-[1.25rem] text-ivory mb-2" style={{ fontFamily: "var(--font-serif)" }}>Apply for RTI in Housing Department</h4>
                  <p className="text-[0.9375rem] text-ivory/80">If the landlord owns multiple unregistered flats, a simple RTI about his tax status or registration details often forces a settlement.</p>
                </div>
              </div>
            </section>

            <div className="text-center pt-10">
              <button 
                onClick={() => { setIsAnalyzed(false); setScenario(""); }} 
                className="btn-ghost text-burgundy hover:bg-burgundy/5"
              >
                Start a New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
