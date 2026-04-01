"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { user, logout }        = useAuth();
  const { lang, setLang, t }    = useLang();
  const [isOpen, setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-[1000] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF6F1]/95 backdrop-blur-md shadow-[0_1px_4px_rgba(42,26,30,0.05)] border-b border-[rgba(199,183,163,0.3)]"
            : "bg-transparent border-b border-[rgba(199,183,163,0.3)]"
        }`}
      >
        <div className="w-full px-5 lg:px-16">
          <div className="flex justify-between items-center h-[88px] md:h-[110px]">

            {/* ── Logo ─────────────────────────────────────── */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Chitragupt Logo" 
                width={100} 
                height={100} 
                className="object-contain w-[72px] h-[72px] md:w-[100px] md:h-[100px]"
              />
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 ml-6">
              <NavLink href="/issues" current={pathname}>{t("common.nav.exploreIssues")}</NavLink>
              <NavLink href="/guide" current={pathname}>{t("nav.guide")}</NavLink>
              <NavLink href="/directory" current={pathname}>{t("nav.directory")}</NavLink>
              <NavLink href="/news" current={pathname}>{t("nav.news")}</NavLink>
              <NavLink href="/rti" current={pathname}>{t("common.nav.rtiGenerator")}</NavLink>
              <NavLink href="/analyze" current={pathname}>{t("common.nav.aiAnalysis")}</NavLink>
            </div>

            <div className="flex-1" />

            {/* ── Right controls ───────────────────────────── */}
            <div className="hidden lg:flex items-center gap-6">

              {/* ── Language Toggle ───────────────────────── */}
              <div className="inline-flex border border-[#A69485] rounded-[2px] overflow-hidden" role="radiogroup" aria-label="Select language">
                <button
                  onClick={() => setLang("en")}
                  role="radio"
                  aria-checked={lang === "en"}
                  className={`px-3 py-1.5 text-[0.75rem] font-semibold transition-all duration-200 ${
                    lang === "en" ? "bg-[#561C24] text-[#F5EDE3]" : "bg-transparent text-[#5C4A42] hover:bg-[rgba(86,28,36,0.05)] cursor-pointer"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("hi")}
                  role="radio"
                  aria-checked={lang === "hi"}
                  className={`px-3 py-1.5 text-[0.75rem] font-semibold transition-all duration-200 ${
                    lang === "hi" ? "bg-[#561C24] text-[#F5EDE3]" : "bg-transparent text-[#5C4A42] hover:bg-[rgba(86,28,36,0.05)] cursor-pointer"
                  }`}
                >
                  हिं
                </button>
              </div>

              {/* ── User / Auth ───────────────────────────── */}
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/my-case" className="text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-burgundy dark:text-cream hover:text-maroon transition-colors">
                    {user.fullName?.split(" ")[0] || "User"}
                  </Link>
                  <button onClick={logout} className="text-burgundy/40 dark:text-cream/40 hover:text-burgundy dark:hover:text-cream transition-colors">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-burgundy hover:text-maroon transition-colors">
                  {t("common.nav.signIn")}
                </Link>
              )}

              {/* ── Emergency ─────────────────────────────── */}
              <Link
                href="/emergency"
                className="flex items-center gap-2 bg-burgundy text-ivory px-4 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] rounded-sm hover:bg-maroon transition-colors"
              >
                <Phone size={14} /> {t("common.nav.emergency")}
              </Link>
            </div>

            {/* ── Global Hamburger & Mobile Call ────────────────── */}
            <div className="flex items-center gap-3">
              <Link
                href="tel:15100"
                className="text-[#561C24] p-2 flex items-center justify-center hover:bg-[#561C24]/5 rounded-sm transition-colors lg:hidden"
                aria-label="Call emergency number 15100"
              >
                <Phone size={20} />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-ink hover:bg-burgundy/5 rounded-sm transition-colors flex items-center gap-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                <span className="hidden lg:block text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-ink">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay Menu ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[2000] bg-[#561C24] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#E8D8C4]/10">
          <span className="text-[#E8D8C4] text-[1.125rem] italic" style={{ fontFamily: "var(--font-serif)" }}>{t("common.appName")}</span>
          <button onClick={() => setIsOpen(false)} className="p-4 text-[#E8D8C4]" aria-label={t("common.nav.closeMenu")}>
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6 overflow-y-auto py-8">
          <MobileLink href="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
          <MobileLink href="/issues" onClick={() => setIsOpen(false)}>{t("common.nav.exploreIssues")}</MobileLink>
          <MobileLink href="/guide" onClick={() => setIsOpen(false)}>{t("nav.guide")}</MobileLink>
          <MobileLink href="/directory" onClick={() => setIsOpen(false)}>{t("nav.directory")}</MobileLink>
          <MobileLink href="/news" onClick={() => setIsOpen(false)}>{t("nav.news")}</MobileLink>
          <MobileLink href="/rti" onClick={() => setIsOpen(false)}>{t("common.nav.rtiGenerator")}</MobileLink>
          <MobileLink href="/analyze" onClick={() => setIsOpen(false)}>{t("common.nav.aiAnalysis")}</MobileLink>
          <MobileLink href="/my-case" onClick={() => setIsOpen(false)}>My Case</MobileLink>
          
          <div className="w-12 h-px bg-cream/20 my-2" />
          
          {user ? (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="text-[1.5rem] text-cream/70" style={{ fontFamily: "var(--font-serif)" }}
            >
              Sign Out
            </button>
          ) : (
            <MobileLink href="/login" onClick={() => setIsOpen(false)}>Sign In</MobileLink>
          )}

          <div className="flex gap-4 mt-4">
            <button onClick={() => setLang("en")} className={`text-cream ${lang === "en" ? "font-bold" : "opacity-50"}`}>EN</button>
            <span className="text-cream/20">|</span>
            <button onClick={() => setLang("hi")} className={`text-cream ${lang === "hi" ? "font-bold" : "opacity-50"}`}>हिं</button>
          </div>
        </nav>

        <div className="p-6">
          <Link
            href="/emergency"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-error text-ivory rounded-sm font-semibold tracking-widest uppercase text-sm"
          >
            <Phone size={18} /> 15100 Emergency Help
          </Link>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children, current }: { href: string; children: React.ReactNode; current: string }) {
  const isActive = current === href || current.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`relative py-2 text-[0.875rem] font-medium tracking-[0.06em] uppercase transition-colors group ${
        isActive ? "text-burgundy" : "text-[#5C4A42] hover:text-burgundy"
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-[2px] bg-burgundy transition-all duration-250 ease-out ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`} />
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-[#E8D8C4] text-[1.75rem] text-center w-full hover:underline transition-colors block py-2"
      style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
    >
      {children}
    </Link>
  );
}
