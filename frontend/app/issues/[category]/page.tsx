"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Check, ShieldCheck, HelpCircle, BookOpen, AlertTriangle, ArrowRight, Home, Users, Briefcase, FileBadge, Building2, Heart, Shield, HeartPulse, Landmark, Landmark as Government, GraduationCap, Car, Scale } from "lucide-react";
import { CATEGORIES } from "@/lib/categoryData";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const ICONS: Record<string, React.ReactNode> = {
  landlord: <Home size={20} />,
  consumer: <Users size={20} />,
  workplace: <Briefcase size={20} />,
  police: <FileBadge size={20} />,
  property: <Building2 size={20} />,
  family: <Heart size={20} />,
  cyber: <Shield size={20} />,
  medical: <HeartPulse size={20} />,
  financial: <Landmark size={20} />,
  government: <Government size={20} />,
  education: <GraduationCap size={20} />,
  traffic: <Car size={20} />
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params?.category as string;
  const activeCategory = CATEGORIES.find(c => c.slug === categorySlug) || CATEGORIES[0];

  const issuesConfig = activeCategory.data as Record<string, any>;
  const availableIssueKeys = Object.keys(issuesConfig);
  const [activeIssue, setActiveIssue] = useState<string | null>(availableIssueKeys.length > 0 ? availableIssueKeys[0] : null);
  const [showOriginalLaw, setShowOriginalLaw] = useState(false);

  const issueData = activeIssue ? issuesConfig[activeIssue] : null;

  return (
    <>
      <a href="#main-content" className="absolute top-2 left-2 z-[1000] bg-burgundy text-ivory px-6 py-3 -translate-y-[150%] focus-visible:translate-y-0 transition-transform rounded-sharp font-bold uppercase tracking-widest text-[0.8125rem]">
        Skip to main content
      </a>
      
      <div className="min-h-screen bg-surface flex flex-col pt-[80px]">
        <div className="flex flex-1 max-w-[1400px] mx-auto w-full px-5 md:px-16">
          
          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-full lg:w-[300px] flex-shrink-0 lg:border-r border-border bg-white hidden lg:flex flex-col pb-10" aria-label="Issue Categories">
            <div className="p-6 border-b border-border">
              <h2 className="text-[1.125rem] font-bold text-ink flex items-center gap-2" style={{ fontFamily: "var(--font-serif)" }}>
                <HelpCircle size={18} className="text-burgundy" aria-hidden="true" /> Your Situation
              </h2>
            </div>
            <nav className="flex-1 overflow-y-auto w-full no-scrollbar space-y-1 p-2" aria-label="Legal Categories">
              <ul className="space-y-1">
                {CATEGORIES.map(category => {
                  const isActive = category.slug === activeCategory.slug;
                  return (
                    <li key={category.slug}>
                      <Link
                        href={`/issues/${category.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-start gap-4 p-4 rounded-[4px] border-b border-border/40 transition-[background,border,transform] duration-200 group ${
                          isActive 
                            ? "bg-[#E8D8C4] border-l-[3px] border-l-[#561C24] pl-[13px] shadow-level-1" 
                            : "bg-transparent border-l-[3px] border-l-transparent hover:bg-[#F5EDE3]"
                        }`}
                      >
                        <div className={`mt-0.5 transition-colors ${isActive ? "text-[#561C24]" : "text-[#2A1A1E]/40"}`} aria-hidden="true">
                          {ICONS[category.slug] || <Scale size={20} />}
                        </div>
                        <div>
                          <h3 className={`text-[0.9375rem] font-bold ${isActive ? "text-ink" : "text-ink/70"}`} style={{ fontFamily: "var(--font-serif)" }}>
                            {category.title}
                          </h3>
                          <p className={`text-[0.6875rem] uppercase tracking-widest font-semibold mt-1 ${isActive ? "text-ink/50" : "text-ink/30"}`}>
                            {category.snippet}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 mx-4 mt-4 bg-burgundy rounded-[4px] text-ivory">
              <p className="text-label text-cream mb-2 flex items-center gap-2">
                <Shield size={14} aria-hidden="true" /> Need deep analysis?
              </p>
              <p className="text-[0.8125rem] text-ivory/80 leading-relaxed mb-4">
                Our AI can read your documents and find hidden legal leverage.
              </p>
              <Link href="/analyze" className="btn-secondary w-full bg-ivory text-burgundy hover:bg-white text-[0.8125rem] py-2 whitespace-nowrap px-4 border-none">
                ANALYZE MY CASE
              </Link>
            </div>
          </aside>

          {/* ── MAIN CONTENT AREA ── */}
          <main id="main-content" className="flex-1 py-8 lg:py-12 lg:px-12 overflow-y-auto">
            
            <div className="max-w-[900px]">
              {/* Category Header */}
              <div className="mb-8">
                <h1 className="text-display mb-4">
                  {activeCategory.title}
                </h1>
                <p className="text-[1.125rem] text-ink/70 leading-relaxed max-w-[680px]">
                  {activeCategory.description}
                </p>
              </div>

              {/* Issue Selection Cards */}
              <section aria-labelledby="common-issues-heading" className="mb-[48px] lg:mb-[72px]">
                <h2 id="common-issues-heading" className="text-label text-ink/40 mb-4 outline-none" tabIndex={-1}>COMMON ISSUES IN THIS CATEGORY</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeCategory.commonIssues.map((issueLabel, idx) => {
                    const isSelectable = activeCategory.slug === "landlord" && idx === 0 || activeCategory.slug === "consumer" && idx === 0;
                    const issueKey = activeCategory.slug === "landlord" && idx === 0 ? "deposit-not-returned" : activeCategory.slug === "consumer" && idx === 0 ? "defective-product" : null;
                    const isActive = activeIssue === issueKey;

                    return (
                      <li key={idx} className="h-full">
                        <button
                          onClick={() => issueKey ? setActiveIssue(issueKey) : setActiveIssue(null)}
                          disabled={!isSelectable}
                          aria-pressed={isActive}
                          className={`text-left p-6 w-full rounded-[4px] border transition-all h-full flex flex-col justify-between min-h-[120px] ${
                            isActive 
                              ? "bg-burgundy border-burgundy shadow-level-2 -translate-y-1" 
                              : isSelectable 
                                ? "bg-white border-border hover:border-taupe hover:-translate-y-1 shadow-level-1" 
                                : "bg-surface border-transparent opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <span className={`card-title block mb-4 ${isActive ? "text-ivory" : "text-ink"}`}>
                            {issueLabel}
                          </span>
                          <span className={`text-[0.6875rem] font-semibold tracking-widest uppercase ${isActive ? "text-cream" : "text-burgundy"}`}>
                            {isSelectable ? "View Details →" : "Coming Soon"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {issueData && <div className="divider-editorial hidden lg:block" />}

              {issueData ? (
                <div role="region" aria-live="polite" aria-atomic="true" className="animate-fade-in pt-8 pb-24 space-y-[48px] lg:space-y-[72px]">
                  <span className="sr-only">Rights and action plan loaded for {issueData.originalLaw.substring(0, 20)}</span>
                  
                  {/* Status Banner */}
                  <div className="bg-[#F0F5ED] border border-[#CBDAC4] p-[24px] rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4A6741] rounded-[4px] flex items-center justify-center flex-shrink-0 text-white shadow-level-1">
                        <ShieldCheck size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-heading-3 text-[#283823] font-bold mb-1">Solid Legal Grounding</h2>
                        <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#4A6741]">
                          You have strong legal rights in this situation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-[#CBDAC4] text-[#4A6741] px-4 py-2 rounded-full text-label shadow-level-1 whitespace-nowrap">
                      <div className="w-2 h-2 bg-[#4A6741] rounded-full" aria-hidden="true" />
                      Verified by AI Lawyer
                    </div>
                  </div>

                  {/* What the law says (Simple First) */}
                  <section aria-labelledby="law-simple-heading">
                    <h2 id="law-simple-heading" className="text-heading-2 mb-6 flex items-center gap-3">
                      <BookOpen size={28} className="text-taupe" aria-hidden="true" /> What the Law Says <span className="text-[1.125rem] text-ink/40 font-sans tracking-widest mt-1">— In Simple Words</span>
                    </h2>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-[16px] lg:gap-[24px] mb-6">
                      {issueData.simpleLaw.map((point: string, idx: number) => (
                        <li key={idx} className="card-editorial py-6 px-6 sm:px-8 flex items-start gap-4 h-full !transform-none !shadow-level-1">
                          <Check size={20} className="text-burgundy mt-1 flex-shrink-0" aria-hidden="true" />
                          <p className="text-[1rem] text-ink leading-relaxed m-0 font-medium">{point}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Original Law Toggle */}
                    <div>
                      <button 
                        onClick={() => setShowOriginalLaw(!showOriginalLaw)}
                        aria-expanded={showOriginalLaw}
                        aria-controls="original-law-panel"
                        className="btn-view-law group"
                      >
                        <Scale size={16} className="text-burgundy group-hover:text-maroon transition-colors" aria-hidden="true" />
                        {showOriginalLaw ? "HIDE ORIGINAL LAW TEXT" : "SHOW ORIGINAL LAW TEXT"}
                      </button>
                      
                      <div 
                        id="original-law-panel" 
                        role="region" 
                        aria-labelledby="law-simple-heading"
                        className={`transition-all duration-300 overflow-hidden ${showOriginalLaw ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                      >
                        <div className="p-[24px] bg-[#FAF6F1] border-l-[3px] border-l-[#561C24] rounded-r-[4px] text-[0.9375rem] text-[#5C4A42] leading-relaxed font-serif italic max-w-[680px]">
                          {issueData.originalLaw}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Action Plan Component */}
                  <section aria-labelledby="action-plan-heading" className="bg-[#561C24] text-white rounded-[8px] p-[24px] lg:p-[48px] shadow-level-2 relative overflow-hidden">
                    <h2 id="action-plan-heading" className="text-heading-2 text-ivory mb-8 flex items-center gap-3 relative z-10 w-full">
                      <ShieldCheck size={28} className="text-maroon hidden sm:block" aria-hidden="true" /> Your Action Plan
                    </h2>

                    <ol className="relative pl-[40px] md:pl-[60px] mb-[48px] z-10 space-y-[24px] md:space-y-[32px]" aria-label="Action Steps">
                      <div className="absolute top-2 bottom-0 left-[14px] md:left-[24px] w-[1px] bg-ivory/20" aria-hidden="true" />
                      {issueData.actionPlan.map((step: any, idx: number) => (
                        <li key={idx} className="relative group">
                          <div className="absolute top-1 -left-[40px] md:-left-[60px] w-[28px] h-[28px] rounded-full bg-[#3D1219] border border-ivory/30 flex items-center justify-center z-10 group-hover:border-ivory transition-colors">
                            <span className="text-[0.8125rem] font-bold text-ivory font-sans">{idx + 1}</span>
                          </div>
                          <div className="pl-4 md:pl-[20px] max-w-[600px]">
                            <h3 className="text-[1.125rem] text-ivory font-medium leading-[1.35] max-w-[680px]">
                              {step.title} 
                              <span className="text-ivory/70 block mt-2 text-[0.9375rem] leading-[1.5] font-normal">{step.desc}</span>
                            </h3>
                          </div>
                        </li>
                      ))}
                    </ol>

                    {/* Stat Card */}
                    <div className="bg-ivory/10 border border-ivory/20 rounded-[4px] p-6 mb-[48px] relative z-10 flex items-start gap-4 w-full lg:max-w-[80%]">
                      <AlertTriangle size={24} className="text-cream flex-shrink-0 mt-1" aria-hidden="true" />
                      <p className="text-[1.125rem] italic text-ivory font-serif leading-relaxed m-0">
                        "{issueData.stat}"
                      </p>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-[48px] relative z-10 border-t border-ivory/20 pt-[32px]">
                      <div className="col-span-2">
                        <p className="text-[0.6875rem] uppercase tracking-widest font-bold text-ivory/60 mb-2">Success Odds</p>
                        <div className="flex items-end gap-3">
                          <p className="text-[2.5rem] text-ivory font-serif font-bold leading-none">{issueData.successOdds}</p>
                          <p className="text-label text-[#C7B7A3] mb-1.5">High Potential</p>
                        </div>
                        <p className="text-[0.8125rem] text-ivory/70 mt-2 m-0 max-w-[400px]">{issueData.successContext}</p>
                      </div>
                      <div>
                        <p className="text-[0.6875rem] uppercase tracking-widest font-bold text-ivory/60 mb-2">Timeline</p>
                        <p className="text-[1.25rem] text-ivory font-serif font-medium mt-1">{issueData.timeline}</p>
                      </div>
                      <div>
                        <p className="text-[0.6875rem] uppercase tracking-widest font-bold text-ivory/60 mb-2">Est. Cost</p>
                        <p className="text-[1.25rem] text-ivory font-serif font-medium mt-1">{issueData.cost}</p>
                      </div>
                    </div>

                    <div className="mb-10 text-left md:text-center border border-ivory/20 p-[24px] rounded-[4px] relative z-10 bg-ivory/10 flex flex-col sm:flex-row items-start md:items-center justify-between gap-6">
                      <div className="text-left">
                        <p className="text-[1rem] font-bold text-ivory m-0 mb-1">Got a specific question?</p>
                        <p className="text-[0.9375rem] text-ivory/80 m-0 max-w-[400px]">Our AI Lawyer can analyze your specific documents and situation instantly.</p>
                      </div>
                      <Link href="/analyze" className="text-label text-[#E8D8C4] hover:text-white transition-colors flex items-center gap-2 group whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ivory rounded-sm p-2">
                        ASK OUR AI LAWYER <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-[16px] relative z-10 w-full">
                      <Link href="/documents" className="w-full sm:w-auto outline-none">
                        <InteractiveHoverButton variant="sand" className="border-ivory text-[#2A1A1E] bg-ivory hover:text-[#561C24] w-full min-h-[48px]">Generate Legal Notice</InteractiveHoverButton>
                      </Link>
                      <Link href="/get-help" className="w-full sm:w-auto outline-none">
                        <InteractiveHoverButton variant="crimson" className="border-ivory/30 bg-transparent text-ivory hover:border-ivory w-full min-h-[48px]">Consumer Complaint</InteractiveHoverButton>
                      </Link>
                      <Link href="/find-lawyer" className="text-label text-ivory/70 hover:text-white transition-colors ml-0 sm:ml-4 text-center w-full sm:w-auto block py-3 sm:py-0 border border-ivory/20 sm:border-none rounded-[4px] sm:rounded-none">
                        Find Local Lawyer →
                      </Link>
                    </div>
                  </section>

                  {/* Evidence Checklist */}
                  <section aria-labelledby="evidence-heading">
                    <h2 id="evidence-heading" className="text-heading-2 mb-6">
                      Evidence Checklist
                    </h2>
                    <div className="bg-white border border-border rounded-[4px] p-[24px] lg:p-[48px] shadow-level-1">
                      <ul className="flex flex-col gap-[16px] mb-[32px]">
                        {issueData.evidence.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-4 group">
                            <div className="mt-1">
                              <input 
                                type="checkbox" 
                                id={`evidence-${idx}`}
                                aria-label={`Mark "${item}" as completed`}
                                className="w-[20px] h-[20px] rounded-[2px] border-[#C7B7A3] text-burgundy focus:ring-burgundy focus:ring-offset-2 cursor-pointer" 
                              />
                            </div>
                            <label htmlFor={`evidence-${idx}`} className="text-[1rem] leading-[1.75] text-ink cursor-pointer flex-1">
                              {item}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-border pt-[32px]">
                        <button className="btn-ghost pl-0 hover:bg-transparent text-burgundy gap-2 group text-left w-full sm:w-auto flex items-center">
                          UPLOAD EVIDENCE FOR ANALYSIS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </section>

                  <div className="text-center pt-[48px] border-t border-border mt-[72px]">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#A67B3D] flex flex-col sm:flex-row items-center justify-center gap-[8px] m-0 leading-relaxed">
                      <AlertTriangle size={16} aria-hidden="true" /> 
                      <span>This information is for general guidance only. Laws may vary by state. Consult a lawyer for advice specific to your case.</span>
                    </p>
                  </div>

                </div>
              ) : (
                <div role="status" className="py-[48px] text-center w-full max-w-[480px] mx-auto opacity-80">
                  <p className="text-[0.9375rem] text-[#6B5A52] font-sans m-0">
                    Select a situation above to see your rights and next steps
                  </p>
                </div>
              )}
              
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
