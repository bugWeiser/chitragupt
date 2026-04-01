"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function AiChatWidget() {
  const { lang: language, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on mount or language change
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 'initial', role: 'assistant', content: t('chat.greeting') }]);
    }
  }, [language, t, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: userMessage.content }],
          language: language
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.content }]);
      } else {
        const errorContent = data.content?.includes('GEMINI_API_KEY') 
          ? (language === 'en' ? "⚠️ AI Engine Offline: GEMINI_API_KEY not found in environment. Please contact administrator." : "⚠️ AI इंजन ऑफ़लाइन: GEMINI_API_KEY नहीं मिला।")
          : (language === 'en' ? "I'm having trouble connecting right now." : "मैं अभी कनेक्ट नहीं कर पा रहा हूँ।");
        
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: errorContent }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "An error occurred connecting to Chitragupt AI. Please check your internet or server status." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-navy dark:bg-saffron text-white dark:text-navy rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100'}`}
      >
        <MessageSquare size={28} />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-saffron dark:bg-white rounded-full border-2 border-white dark:border-navy animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col z-50 transform origin-bottom-right transition-all duration-300 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 bg-navy text-white rounded-t-3xl flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                 <ShieldCheck size={20} className="text-saffron" />
              </div>
              <div className="leading-tight">
                 <h3 className="font-bold font-poppins text-lg">Chitragupt AI</h3>
                 <p className="text-[10px] text-saffron uppercase font-bold tracking-widest flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" /> {language === 'en' ? 'Legal Expert' : 'कानूनी विशेषज्ञ'}
                 </p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
                 <X size={18} />
              </button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
           {messages.map((m) => (
             <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-navy text-white rounded-tr-sm' 
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-200 dark:border-gray-800'
                }`}>
                   {m.content.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('*Disclaimer') ? 'text-[10px] opacity-70 italic mt-3 pt-3 border-t border-black/10 dark:border-white/10' : ''}>
                        {line}
                      </p>
                   ))}
                </div>
             </div>
           ))}
           {loading && (
             <div className="flex justify-start">
                <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-800 text-gray-500">
                   <Loader2 size={16} className="animate-spin" />
                </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 rounded-b-3xl shrink-0">
           <form onSubmit={handleSubmit} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm p-4 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-saffron text-navy dark:text-white transition-all shadow-inner"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2.5 bg-navy dark:bg-saffron text-white dark:text-navy-dark rounded-xl disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                 <Send size={16} />
              </button>
           </form>
        </div>
      </div>
    </>
  );
}

