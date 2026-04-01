"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Phone, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { directoryListings, DirectoryListing } from "@/data/directory-listings";
import { useLang } from "@/context/LanguageContext";

export default function DirectoryPage() {
  const { lang, t } = useLang();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const types = ["All", "District Court", "Legal Aid", "Consumer Forum", "Police / Cyber Cell", "Government Office", "Law Firm", "Women's Commission", "NGO", "RTI Office", "Notary / Stamp"];
  
  const states = useMemo(() => {
    const allStates = directoryListings.map(l => l.state);
    return Array.from(new Set(allStates)).sort();
  }, []);

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const stateCities = directoryListings.filter(l => l.state === selectedState).map(l => l.city);
    return Array.from(new Set(stateCities)).sort();
  }, [selectedState]);

  const filteredListings = useMemo(() => {
    return directoryListings.filter((listing) => {
      const matchSearch = 
        listing.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchState = selectedState === "" || listing.state === selectedState;
      const matchCity = selectedCity === "" || listing.city === selectedCity;
      const matchType = selectedType === "All" || listing.type === selectedType;

      return matchSearch && matchState && matchCity && matchType;
    });
  }, [searchQuery, selectedState, selectedCity, selectedType]);

  // Translate Type helper
  const translateType = (type: string) => {
    if (type === "All") return t("directory.types.all") || "All";
    const keyMap: Record<string, string> = {
      "District Court": "districtCourt",
      "Legal Aid": "legalAid",
      "Consumer Forum": "consumerForum",
      "Police / Cyber Cell": "policeCyber",
      "Government Office": "govtOffice",
      "Law Firm": "lawFirm",
      "Women's Commission": "womensCommission",
      "NGO": "ngo",
      "RTI Office": "rtiOffice",
      "Notary / Stamp": "notaryStamp"
    };
    return t(`directory.types.${keyMap[type]}`) || type;
  };

  return (
    <div className="min-h-screen bg-surface w-full">
      <div className="py-12 md:py-20 px-4 md:px-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-[700px] mx-auto text-center mb-8 md:mb-12">
          <h1
            className="text-ink mb-4 font-normal tracking-tight"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 6vw, 3rem)' }}
          >
            {t("directory.pageTitle")}
          </h1>
          <p className="text-[#5C4A42] text-[0.9375rem] md:text-base leading-[1.7] max-w-lg mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            {t("directory.pageSubtitle")}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="max-w-[800px] mx-auto mb-10 md:mb-16">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7B6B]" size={18} />
            <input 
              type="text" 
              placeholder={t("directory.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] md:h-[52px] pl-11 pr-4 bg-white border border-[#A69485] rounded-[4px] text-sm md:text-base focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy text-[#2A1A1E]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <select 
                value={selectedState} 
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity(""); // Reset city when state changes
                }}
                className="w-full h-[44px] appearance-none bg-white border border-[#A69485] rounded-[4px] px-4 text-[0.875rem] text-ink focus:outline-none focus:border-burgundy"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <option value="">{t("directory.allStates") || "All States"}</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7B6B] pointer-events-none" />
            </div>

            <div className="relative flex-1">
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full h-[44px] appearance-none bg-white border border-[#A69485] rounded-[4px] px-4 text-[0.875rem] text-ink focus:outline-none focus:border-burgundy disabled:opacity-50 disabled:bg-gray-50"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <option value="">{t("directory.allCities") || "All Cities"}</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7B6B] pointer-events-none" />
            </div>

            <div className="relative flex-1">
              <select 
                value={selectedType === "All" ? "" : selectedType} 
                onChange={(e) => setSelectedType(e.target.value || "All")}
                className="w-full h-[44px] appearance-none bg-white border border-[#A69485] rounded-[4px] px-4 text-[0.875rem] text-ink focus:outline-none focus:border-burgundy"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <option value="">{t("directory.allTypes") || "All Types"}</option>
                {types.filter(t => t !== "All").map(t => <option key={t} value={t}>{translateType(t)}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7B6B] pointer-events-none" />
            </div>
          </div>

          <div className="flex overflow-x-auto gap-3 pb-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex-none px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  selectedType === type
                    ? "bg-burgundy text-ivory border border-transparent"
                    : "bg-transparent text-[#5C4A42] border border-[#B5A899] hover:border-burgundy hover:text-burgundy"
                }`}
              >
                {translateType(type)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="max-w-[800px] mx-auto mb-6">
          <p className="text-[0.8125rem] font-semibold uppercase text-[#6B5A52] tracking-[0.08em]" style={{ fontFamily: 'var(--font-sans)' }}>
            {t("directory.resultsFound")?.replace('{{count}}', filteredListings.length.toString()).replace('{{state}}', selectedState || "India") || `${filteredListings.length} resources found`}
          </p>
        </div>

        {/* Listings List */}
        <div className="max-w-[800px] mx-auto space-y-4 mb-16">
          {filteredListings.length === 0 ? (
            <div className="bg-white border border-[#A69485] rounded-lg p-10 text-center shadow-card">
              <Search className="mx-auto text-[#C7B7A3] mb-4" size={32} />
              <h3 className="text-ink text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{t("directory.noResults")}</h3>
              <p className="text-[#8B7B6B]">{t("directory.noResultsDesc")}</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white border border-[#D4C4B4] rounded-[6px] p-7 shadow-card hover:shadow-[0_4px_12px_rgba(42,26,30,0.06)] transition-all">
                <div className="inline-block bg-cream text-burgundy text-[0.6875rem] font-bold uppercase tracking-[0.05em] px-2.5 py-[3px] rounded-sm mb-3">
                  {translateType(listing.type)}
                </div>
                <h3 className="text-ink text-[1.25rem] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{listing.name}</h3>
                <p className="text-[#5C4A42] text-[0.875rem] leading-[1.5] mb-4">
                  {listing.address}
                </p>
                
                <div className="flex flex-wrap gap-5 mb-6">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#8B7B6B]" />
                    <span className="text-[#5C4A42] text-[0.8125rem]" style={{ fontFamily: 'var(--font-sans)' }}>{listing.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B7B6B]" />
                    <span className="text-[#5C4A42] text-[0.8125rem]" style={{ fontFamily: 'var(--font-sans)' }}>{listing.hours}</span>
                  </div>
                  {/* Mock distance/location if needed */}
                  {listing.coordinates && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#8B7B6B]" />
                      <span className="text-[#5C4A42] text-[0.8125rem]" style={{ fontFamily: 'var(--font-sans)' }}>Varies</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-[#D4C4B4]/50 my-4" />
                
                <div className="flex gap-6">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(listing.name + " " + listing.address)}`} 
                    target="_blank" rel="noreferrer"
                    className="text-burgundy font-semibold text-[0.875rem] hover:underline"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {t("directory.getDirections")}
                  </a>
                  <a 
                    href={`tel:${listing.phone.replace(/[^0-9]/g, '')}`} 
                    className="text-burgundy font-semibold text-[0.875rem] hover:underline"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {t("directory.call")}
                  </a>
                </div>
              </div>
            ))
          )}
          
          {filteredListings.length > 5 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="p-2 text-[#8B7B6B] hover:text-burgundy transition-colors"><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 rounded-full bg-burgundy text-ivory flex items-center justify-center text-[0.875rem] font-medium">1</button>
              <button className="w-8 h-8 rounded-full text-[#5C4A42] hover:bg-cream/50 flex items-center justify-center text-[0.875rem] font-medium transition-colors">2</button>
              <button className="w-8 h-8 rounded-full text-[#5C4A42] hover:bg-cream/50 flex items-center justify-center text-[0.875rem] font-medium transition-colors">3</button>
              <span className="text-[#8B7B6B]">...</span>
              <button className="p-2 text-[#8B7B6B] hover:text-burgundy transition-colors"><ChevronRight size={16} /></button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12 max-w-sm mx-auto">
          <h2 className="text-ink text-[1.375rem] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>{t("directory.cantFind")}</h2>
          <button className="w-full py-3 px-6 border border-burgundy text-burgundy rounded-[4px] font-medium text-sm hover:bg-burgundy hover:text-ivory transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
            {t("directory.suggestListing")}
          </button>
        </div>

      </div>
    </div>
  );
}
