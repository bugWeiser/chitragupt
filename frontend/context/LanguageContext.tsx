'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.get_help': 'Get Help',
    'nav.lawyers': 'Lawyers',
    'nav.my_case': 'My Case',
    'nav.login': 'Sign In',
    'nav.register': 'Join Free',
    'nav.admin': 'Shield',
    'hero.title': 'India\'s Legal First-Response System',
    'hero.subtitle': 'Get instant clarity. Know your rights. Take action.',
    'hero.placeholder': 'Describe your legal situation (e.g., "My landlord is not returning my deposit")',
    'hero.analyze': 'Analyze with AI',
    'hero.recording': 'Listening to your case...',
    'chat.greeting': 'Hello! I am NyayaMitra AI, your legal first-responder. How can I help you today?',
    'chat.placeholder': 'Ask a legal question...',
  },
  hi: {
    'nav.get_help': 'सहायता लें',
    'nav.lawyers': 'वकील खोजें',
    'nav.my_case': 'मेरा केस',
    'nav.login': 'लॉग इन',
    'nav.register': 'मुफ्त जुड़ें',
    'nav.admin': 'सुरक्षा',
    'hero.title': 'भारत का कानूनी प्रथम-प्रतिक्रिया तंत्र',
    'hero.subtitle': 'तुरंत स्पष्टता प्राप्त करें। अपने अधिकारों को जानें। कार्रवाई करें।',
    'hero.placeholder': 'अपनी कानूनी स्थिति बताएं (जैसे, "मेरा मकान मालिक मेरी जमा राशि नहीं लौटा रहा है")',
    'hero.analyze': 'AI से विश्लेषण करें',
    'hero.recording': 'आपकी बात सुन रहे हैं...',
    'chat.greeting': 'नमस्ते! मैं न्यायमित्र AI हूँ, आपका कानूनी सहायक। मैं आज आपकी क्या मदद कर सकता हूँ?',
    'chat.placeholder': 'कानूनी सवाल पूछें...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
