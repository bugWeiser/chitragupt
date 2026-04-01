"use client";

import React, { useState } from 'react';
import { LAWYERS } from '@/lib/mockData';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  ShieldCheck,
  Building2,
  UserX,
} from 'lucide-react';
import Link from 'next/link';

export default function LawyersPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLawyers = LAWYERS.filter(lawyer => {
    const matchesSpec = selectedSpecialization === 'All' || lawyer.specializations.includes(selectedSpecialization);
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lawyer.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  const specializations = ['All', 'Consumer Rights', 'Workplace Issues', 'Police & FIR', 'Family Law', 'Criminal Law', 'Cyber Crime'];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* HEADER */}
      <section className="pt-[120px] pb-16 px-6 lg:px-16 text-center">
        <div className="max-w-[800px] mx-auto animate-fade-up">
          <h1 className="text-display text-[#2A1A1E] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Find Legal Help Near You
          </h1>
          <p className="text-[1.125rem] text-[#5C4A42] max-w-lg mx-auto leading-relaxed">
            Connect with pro-bono lawyers and legal aid organizations across India. Every citizen has a right to justice.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-[56px] md:top-[64px] z-[100] bg-[#FAF6F1]/90 backdrop-blur-md border-b border-[rgba(199,183,163,0.35)]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-16 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7B6B]" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-editorial pl-12"
              />
            </div>

            {/* Specialization Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:flex-1">
              {specializations.map(spec => (
                <button 
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition-all border ${
                    selectedSpecialization === spec 
                      ? 'bg-[#561C24] text-[#F5EDE3] border-[#561C24]' 
                      : 'bg-white text-[#5C4A42] border-[#D4C4B4] hover:border-[#C7B7A3]'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1120px] mx-auto px-6 lg:px-16 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-label text-[#6B5A52]">
            {filteredLawyers.length} Lawyers Found
          </h2>
        </div>

        {/* RESULTS or EMPTY STATE */}
        {filteredLawyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {filteredLawyers.map(lawyer => (
              <div key={lawyer.id} className="card-editorial flex flex-col h-full group">
                <div className="flex items-start gap-4 mb-6">
                  {/* Avatar */}
                  <div 
                    className="w-14 h-14 rounded-[4px] flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${lawyer.gradientFrom}, ${lawyer.gradientTo})`, fontFamily: "var(--font-serif)" }}
                  >
                    {lawyer.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[1.125rem] text-[#2A1A1E] truncate" style={{ fontFamily: "var(--font-serif)" }}>
                        {lawyer.name}
                      </h3>
                      {lawyer.verified && <CheckCircle2 size={14} className="text-[#4A6741] flex-shrink-0" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-[#6B5A52]">
                      <span className="flex items-center gap-1"><MapPin size={12} />{lawyer.location}</span>
                      <span className="flex items-center gap-1"><Globe size={12} />{lawyer.languages.join(', ')}</span>
                      <span className="flex items-center gap-1"><Star size={12} fill="#A67B3D" className="text-[#A67B3D]" />{lawyer.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {lawyer.specializations.map(s => (
                    <span key={s} className="px-3 py-1 bg-[#F5EDE3] text-[#561C24] rounded-[2px] text-[0.6875rem] font-semibold uppercase tracking-[0.06em]">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[0.75rem] text-[#6B5A52] mb-6">
                  <CheckCircle2 size={12} /> {lawyer.experience}
                  {lawyer.badge && (
                    <span className="ml-auto text-[0.6875rem] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 bg-[#E8D8C4] text-[#561C24] rounded-[2px]">
                      {lawyer.badge}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-[rgba(199,183,163,0.35)] flex items-center justify-between">
                  <div>
                    <span className="text-label text-[#8B7B6B] block mb-0.5">Consultation</span>
                    <span className="text-[1rem] font-medium text-[#2A1A1E]">{lawyer.fee}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="tel:15100" className="w-10 h-10 rounded-[4px] border border-[#D4C4B4] flex items-center justify-center text-[#5C4A42] hover:border-[#561C24] hover:text-[#561C24] transition-all" aria-label={`Call ${lawyer.name}`}>
                      <Phone size={16} />
                    </a>
                    <button className="btn-primary text-[0.75rem] px-5 py-2.5 min-h-[40px] flex items-center gap-2">
                      Book <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-24 max-w-[480px] mx-auto text-center">
            <UserX size={48} className="text-[#C7B7A3] mb-8" />
            <h3 className="text-[1.5rem] text-[#2A1A1E] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              No lawyers match your filters
            </h3>
            <p className="text-[0.9375rem] text-[#5C4A42] mb-8 leading-relaxed">
              Try expanding your search by changing the practice area or city.
            </p>
            <button
              onClick={() => { setSelectedSpecialization('All'); setSearchQuery(''); }}
              className="text-[0.9375rem] text-[#561C24] font-medium hover:underline underline-offset-4 decoration-[#561C24]/40 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* LEGAL AID INFO */}
        <section className="bg-[#561C24] text-[#F5EDE3] p-10 lg:p-16 rounded-[4px]">
          <div className="max-w-[800px] mx-auto space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={24} className="text-[#E8D8C4]" />
                <h2 className="text-heading-2" style={{ fontFamily: "var(--font-serif)" }}>Government Legal Aid</h2>
              </div>
              <p className="text-[0.9375rem] text-[#D4C4B4] leading-relaxed max-w-[680px]">
                Every Indian citizen has the right to free legal aid under the Legal Services Authorities Act, 1987. If you cannot afford a lawyer, the government will provide one for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[rgba(245,237,227,0.08)] border border-[rgba(245,237,227,0.15)] rounded-[4px]">
                <h4 className="text-label text-[#E8D8C4] mb-3">DLSA / SLSA</h4>
                <p className="text-[0.8125rem] text-[#D4C4B4] leading-relaxed">District/State Level Legal Services for SC/ST, women, children, and victims of disaster.</p>
              </div>
              <div className="p-6 bg-[rgba(245,237,227,0.08)] border border-[rgba(245,237,227,0.15)] rounded-[4px]">
                <h4 className="text-label text-[#E8D8C4] mb-3">NALSA Helpline</h4>
                <p className="text-[0.8125rem] text-[#D4C4B4] leading-relaxed">24/7 National hotline for free legal advice and representation. Call 15100 now.</p>
              </div>
              <div className="p-6 bg-[rgba(245,237,227,0.08)] border border-[rgba(245,237,227,0.15)] rounded-[4px]">
                <h4 className="text-label text-[#E8D8C4] mb-3">HC Legal Committee</h4>
                <p className="text-[0.8125rem] text-[#D4C4B4] leading-relaxed">For cases pending in High Courts. Available at every state High Court.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HELPLINES */}
        <section className="mt-16 p-8 bg-white border border-[#D4C4B4] rounded-[4px] shadow-level-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#561C24]" />
              <h3 className="text-label text-[#2A1A1E]">Emergency Legal Helplines</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[#2A1A1E]">
              <a href="tel:100" className="flex flex-col items-center hover:text-[#561C24] transition-colors">
                <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#6B5A52] font-semibold mb-0.5">Police</span>
                <span className="text-[1.25rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>100</span>
              </a>
              <a href="tel:1091" className="flex flex-col items-center hover:text-[#561C24] transition-colors">
                <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#6B5A52] font-semibold mb-0.5">Women</span>
                <span className="text-[1.25rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>1091</span>
              </a>
              <a href="tel:1098" className="flex flex-col items-center hover:text-[#561C24] transition-colors">
                <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#6B5A52] font-semibold mb-0.5">Child</span>
                <span className="text-[1.25rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>1098</span>
              </a>
              <a href="tel:1930" className="flex flex-col items-center hover:text-[#561C24] transition-colors">
                <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#6B5A52] font-semibold mb-0.5">Cyber</span>
                <span className="text-[1.25rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>1930</span>
              </a>
              <a href="tel:15100" className="flex flex-col items-center px-4 py-2 bg-[#561C24] text-[#F5EDE3] rounded-[4px] hover:bg-[#6D2932] transition-colors">
                <span className="text-[0.6875rem] uppercase tracking-[0.1em] font-semibold mb-0.5">Legal Aid</span>
                <span className="text-[1.25rem] font-bold" style={{ fontFamily: "var(--font-serif)" }}>15100</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
