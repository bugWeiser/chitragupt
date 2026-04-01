"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

/* ── Translations ── */
const TRANSLATIONS: Record<string, Record<string, unknown>> = { en, hi };

export type Lang = "en" | "hi";

/* ── Deep key access helper ── */
function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // fallback: return the key itself
    }
  }
  return typeof current === "string" ? current : path;
}

/* ── Context interface ── */
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chitragupta-lang") as Lang | null;
    if (saved && (saved === "en" || saved === "hi")) {
      setLangState(saved);
      document.documentElement.lang = saved;
    } else {
      // Browser detection
      const browserLang = navigator.language;
      if (browserLang.startsWith("hi")) {
        setLangState("hi");
        document.documentElement.lang = "hi";
      }
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("chitragupta-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string): string => {
    return getNestedValue(TRANSLATIONS[lang], key);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
