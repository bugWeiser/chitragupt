"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITUATIONS, LAWYERS } from '@/lib/mockData';
import { Situation, Lawyer } from '@/types';
import { useCase } from '@/context/CaseContext';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  FileText,
  BookOpen,
  Gavel,
  ChevronRight,
  Clock,
  IndianRupee,
  Zap,
  Eye,
  EyeOff,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import Link from 'next/link';

function GetHelpContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');
  const { guidance } = useCase();

  const [selectedId, setSelectedId]   = useState<string>(initialId || SITUATIONS[0].id);
  const [showLawText, setShowLawText] = useState(false);

  const mockCurrent = SITUATIONS.find(s => s.id === selectedId) || SITUATIONS[0];

  const current = (guidance && guidance.action_plan) ? {
    ...mockCurrent,
    title:   guidance.situation_summary || mockCurrent.title,
    rights:  guidance.your_rights       || mockCurrent.rights,
    steps:   guidance.action_plan.map((s: any) => ({ text: s.action, status: s.step === 1 ? 'pending' : 'info' })),
    lawText: guidance.relevant_laws?.map((l: any) => `${l.act} — Sec ${l.section}:\n${l.what_it_says}`).join('\n\n') || mockCurrent.lawText,
  } : mockCurrent;

  useEffect(() => {
    if (initialId) setSelectedId(initialId);
  }, [initialId]);

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-[calc(100vh-80px)] bg-parchment dark:bg-ink">

      {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
      <aside className="w-full lg:w-[320px] flex-shrink-0 bg-white dark:bg-[#0F0A3C] border-r border-gold/15 p-5 lg:overflow-y-auto no-scrollbar">

        <div className="flex items-center gap-2 mb-6 pt-2">
          <HelpCircle size={18} className="text-gold" />
          <h2
            className="text-base font-bold text-navy dark:text-gold"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Your Situation
          </h2>
        </div>

        <div className="space-y-1.5">
          {SITUATIONS.map(sit => (
            <button
              key={sit.id}
              onClick={() => { setSelectedId(sit.id); setShowLawText(false); }}
              className={`w-full text-left p-4 rounded-md border transition-all duration-200 group relative overflow-hidden ${
                selectedId === sit.id
                  ? 'bg-navy/5 dark:bg-gold/6 border-gold/40 shadow-sm'
                  : 'bg-transparent border-transparent hover:border-gold/20 hover:bg-navy/3 dark:hover:bg-gold/4'
              }`}
            >
              {selectedId === sit.id && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold rounded-r-full" />
              )}
              <div className="flex items-start gap-3 pl-1">
                <span className="text-2xl leading-none mt-0.5">{sit.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold leading-tight mb-0.5 transition-colors ${
                    selectedId === sit.id ? 'text-navy dark:text-gold' : 'text-ink/70 dark:text-parchment/60'
                  }`}>
                    {sit.title}
                  </h4>
                  <p className="text-[10px] text-sage/70 dark:text-parchment/35 uppercase tracking-widest font-medium leading-tight">
                    {sit.description}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className={`flex-shrink-0 mt-1 transition-all ${
                    selectedId === sit.id ? 'text-gold' : 'text-ink/20 dark:text-parchment/20 opacity-0 group-hover:opacity-100'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* AI Analysis CTA */}
        <div className="mt-8 p-5 bg-hero rounded-md border border-gold/20 space-y-3">
          <div className="w-9 h-9 bg-gold/15 rounded-md flex items-center justify-center">
            <Zap size={17} className="text-gold" />
          </div>
          <h4 className="text-sm font-bold text-parchment" style={{ fontFamily: 'var(--font-serif)' }}>
            Need deep analysis?
          </h4>
          <p className="text-[11px] text-parchment/50 leading-relaxed">
            Our AI can read your documents and find hidden legal leverage.
          </p>
          <button className="btn-gold w-full justify-center text-[12px] py-2.5">
            ANALYZE MY CASE
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <main className="flex-1 bg-parchment dark:bg-ink lg:overflow-y-auto p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* ── Status Banner ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-md animate-fade-up">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-500 rounded-md flex items-center justify-center text-white flex-shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-emerald-800 dark:text-emerald-400 font-bold text-base" style={{ fontFamily: 'var(--font-serif)' }}>
                  Solid Legal Grounding
                </h3>
                <p className="text-emerald-600 dark:text-emerald-500 text-[11px] font-semibold uppercase tracking-widest">
                  You have strong legal rights in this situation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy rounded-full border border-emerald-200 dark:border-emerald-900/40 self-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                Verified by AI Lawyer
              </span>
            </div>
          </div>

          {/* ── Gold Divider ──────────────────────────────────── */}
          <hr className="gold-divider opacity-30" />

          {/* ── SECTION 1: Rights ─────────────────────────────── */}
          <section className="space-y-6" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 border border-gold/25 rounded-md flex items-center justify-center">
                <BookOpen size={16} className="text-gold" />
              </div>
              <h2
                className="text-headline text-navy dark:text-parchment"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                What the Law Says — In Simple Words
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.rights.map((right: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 bg-white dark:bg-[#1A1A2E] rounded-md border border-gold/12 transition-all duration-200 hover:border-gold/30 hover:shadow-card group"
                >
                  <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-ink/80 dark:text-parchment/70 leading-relaxed">{right}</p>
                </div>
              ))}
            </div>

            {/* Toggle Legal Text */}
            <div>
              <button
                onClick={() => setShowLawText(!showLawText)}
                className="flex items-center gap-2 text-label text-sage hover:text-gold dark:text-parchment/40 dark:hover:text-gold transition-colors"
              >
                {showLawText ? <EyeOff size={13} /> : <Eye size={13} />}
                {showLawText ? 'Hide Original Law Text' : 'Show Original Law Text'}
              </button>
              {showLawText && (
                <div className="mt-4 p-5 bg-white dark:bg-[#0F0A3C] rounded-md border border-dashed border-gold/30 font-mono text-[12px] leading-relaxed text-sage/80 dark:text-parchment/50 whitespace-pre-wrap animate-fade-up">
                  {current.lawText}
                </div>
              )}
            </div>
          </section>

          <hr className="gold-divider opacity-20" />

          {/* ── SECTION 2: Action Plan ────────────────────────── */}
          <section
            className="relative p-7 lg:p-9 rounded-md overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F0A3C 0%, #1B1464 60%, #2D1B69 100%)' }}
          >
            {/* Glow orb */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/6 blur-2xl -mr-10 -mt-10" />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/15 border border-gold/30 rounded-md flex items-center justify-center">
                  <Gavel size={20} className="text-gold" />
                </div>
                <h3
                  className="text-parchment font-bold text-xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Your Action Plan
                </h3>
              </div>

              {/* Steps */}
              <div className="space-y-5">
                {current.steps.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    {step.status === 'done' ? (
                      <div className="step-number flex-shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                    ) : step.status === 'pending' ? (
                      <div className="step-number flex-shrink-0">{i + 1}</div>
                    ) : (
                      <div className="step-number-muted flex-shrink-0">{i + 1}</div>
                    )}
                    <div className="flex-1 pt-1 space-y-1">
                      <p className={`text-sm leading-relaxed font-medium ${step.status === 'info' ? 'text-parchment/40' : 'text-parchment'}`}>
                        {step.text}
                      </p>
                      {step.status === 'pending' && (
                        <p className="text-label text-gold animate-pulse">
                          NEXT MOVE: START NOW
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip box */}
              <div className="p-4 bg-white/5 rounded-md border border-gold/20 flex gap-3 items-start">
                <AlertTriangle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed italic text-parchment/70">
                  "{current.tip}"
                </p>
              </div>
            </div>
          </section>

          {/* ── SECTION 3: Stats & Escalation ─────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {current.isHighRisk ? (
              <div className="col-span-2 p-7 bg-white dark:bg-[#1A1A2E] border-2 border-vermillion/40 rounded-md space-y-6">
                <div className="flex items-center gap-4 text-vermillion">
                  <AlertTriangle size={32} className="animate-pulse" />
                  <div>
                    <h4 className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                      This looks serious.
                    </h4>
                    <p className="text-sm font-semibold uppercase tracking-widest opacity-70 mt-0.5">
                      Self-help is not recommended. Legal representation required.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {LAWYERS.filter(l => l.category === current.category).slice(0, 3).map((lawyer: Lawyer) => (
                    <div key={lawyer.id} className="p-5 bg-parchment dark:bg-[#0F0A3C] border border-gold/15 rounded-md space-y-4 flex flex-col justify-between card">
                      <div className="space-y-3">
                        <h5 className="font-bold text-sm text-navy dark:text-parchment flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                          {lawyer.name}
                          {lawyer.verified && <CheckCircle2 size={13} className="text-gold" />}
                        </h5>
                        <div className="p-3 bg-vermillion/6 rounded-md text-[11px] font-semibold text-vermillion leading-relaxed">
                          <span className="block text-label text-vermillion/50 mb-1">Why recommended:</span>
                          {lawyer.whyMatch}
                        </div>
                      </div>
                      <button className="btn-gold w-full justify-center text-[12px] py-2.5 mt-2">
                        <Gavel size={13} /> Talk to Lawyer Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-navy dark:text-parchment" style={{ fontFamily: 'var(--font-serif)' }}>
                    Success Odds
                  </h4>
                  <span className="badge badge-green">High Potential</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-bold text-navy dark:text-gold" style={{ fontFamily: 'var(--font-serif)' }}>
                      {current.successRate}%
                    </span>
                    <span className="text-label text-sage dark:text-parchment/40 pb-1">Chance of Success</span>
                  </div>
                  <div className="h-2.5 bg-gold/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${current.successRate}%`,
                        background: 'linear-gradient(90deg, #C8A951, #E8D48B)',
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-sage/70 dark:text-parchment/35 font-medium">
                    Based on 340+ Consumer Forum judgments (2020–2024)
                  </p>
                </div>
              </div>
            )}

            <div className="card p-7 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sage dark:text-parchment/40">
                    <Clock size={13} />
                    <span className="text-label">Timeline</span>
                  </div>
                  <p className="text-base font-bold text-navy dark:text-parchment" style={{ fontFamily: 'var(--font-serif)' }}>
                    {current.timeline}
                  </p>
                </div>
                <div className="space-y-1.5 text-right">
                  <div className="flex items-center gap-1.5 text-sage dark:text-parchment/40 justify-end">
                    <IndianRupee size={13} />
                    <span className="text-label">Est. Cost</span>
                  </div>
                  <p className="text-base font-bold text-navy dark:text-parchment" style={{ fontFamily: 'var(--font-serif)' }}>
                    {current.cost}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-gold/15 flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-gold/10 border border-gold/25 rounded-md flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-200">
                  <MessageCircle size={16} className="text-gold group-hover:text-ink transition-colors" />
                </div>
                <p className="text-sm font-medium text-sage/80 dark:text-parchment/50 group-hover:text-navy dark:group-hover:text-gold transition-colors leading-snug">
                  Got a specific question? <br />
                  <span className="text-label underline underline-offset-2">
                    Ask our AI Lawyer →
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ── SECTION 4: Action Buttons ─────────────────────── */}
          {!current.isHighRisk && (
            <section className="space-y-3">
              <Link
                href="/documents"
                className="flex items-center justify-between gap-4 w-full p-5 bg-emerald-600 text-white rounded-md font-bold text-base shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <FileText size={24} />
                  <div className="text-left">
                    <span className="block leading-none mb-1">Generate Legal Notice</span>
                    <span className="text-[10px] opacity-70 uppercase tracking-widest font-semibold">
                      Resolves 68% of cases immediately
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 bg-white/15 rounded-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/documents"
                  className="flex items-center justify-center gap-2 p-3.5 bg-navy text-parchment dark:bg-[#0F0A3C] rounded-md font-semibold text-sm hover:bg-navy-light transition-colors duration-200"
                >
                  <FileText size={17} />
                  <span>Consumer Complaint</span>
                </Link>
                <Link
                  href="/lawyers"
                  className="flex items-center justify-center gap-2 p-3.5 border-2 border-navy text-navy dark:border-gold dark:text-gold rounded-md font-semibold text-sm hover:bg-navy hover:text-parchment dark:hover:bg-gold dark:hover:text-ink transition-all duration-200"
                >
                  <Gavel size={17} />
                  <span>Find Local Lawyer</span>
                </Link>
              </div>
            </section>
          )}

          {/* ── SECTION 5: Evidence Checklist ─────────────────── */}
          <section className="card p-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 border border-gold/25 rounded-md flex items-center justify-center">
                <FileText size={15} className="text-gold" />
              </div>
              <h4
                className="text-base font-bold text-navy dark:text-parchment"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Evidence Checklist
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.checklist.map((item: string, i: number) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className="w-5 h-5 rounded border-2 border-gold/30 bg-white dark:bg-[#1A1A2E] flex-shrink-0 group-hover:border-gold transition-colors" />
                  <span className="text-sm text-ink/75 dark:text-parchment/60 group-hover:text-navy dark:group-hover:text-gold transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* ── Disclaimer ────────────────────────────────────── */}
          <div className="pt-4">
            <hr className="gold-divider opacity-20 mb-4" />
            <p className="text-center text-[10px] font-semibold text-sage/60 dark:text-parchment/30 uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
              ⚠️ This information is for general guidance only. Laws may vary by state. Consult a lawyer for advice specific to your case.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function GetHelpPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
          <p className="text-label text-gold animate-pulse">Initializing Chitragupt...</p>
        </div>
      </div>
    }>
      <GetHelpContent />
    </Suspense>
  );
}
