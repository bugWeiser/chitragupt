"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, ShieldCheck, Loader2, ArrowLeft, Bot, User, Scale } from 'lucide-react';
import Link from 'next/link';
import { useCase } from '@/context/CaseContext';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function ChatPage() {
  const { currentIssue } = useCase();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', role: 'assistant', content: 'Hello! I am Chitragupt AI, your First-Response Legal Assistant. I am restricted to answering questions regarding Indian law, consumer rights, tenant issues, and FIR processes. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-fill context if coming from the landing page
  useEffect(() => {
    if (currentIssue && messages.length === 1) {
      setInput(`My situation: ${currentIssue}`);
    }
  }, [currentIssue, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        body: JSON.stringify({ messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: userMessage.content }] })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.content }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "An error occurred. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-black pt-20 pb-12 flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-navy-50/50 dark:bg-navy-900/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-saffron-50/50 dark:bg-saffron-900/10 blur-[100px] -z-10 rounded-full" />
      
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col h-[80vh]">
         {/* Head Area */}
         <div className="flex items-center justify-between mb-8 animate-fadeInDown">
            <div>
               <Link href="/" className="inline-flex items-center gap-2 group mb-4">
                 <ArrowLeft size={16} className="text-gray-400 group-hover:text-navy dark:group-hover:text-saffron transition-colors" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-navy">Back to Home</span>
               </Link>
               <h1 className="text-3xl sm:text-4xl font-black font-poppins text-navy dark:text-white flex items-center gap-3">
                 <ShieldCheck className="text-saffron" size={32} />
                 AI Legal Helper
               </h1>
            </div>
            <div className="px-4 py-2 bg-saffron/10 border border-saffron/20 text-saffron-dark dark:text-saffron rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hidden sm:flex">
               <Scale size={14} /> Topic Restricted
            </div>
         </div>

         {/* Chat Box Container */}
         <div className="flex-1 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp relative">
            
            {/* Disclaimer Bar */}
            <div className="bg-navy text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center py-2 shrink-0">
               ⚠️ Responses are AI-generated and not substitute for formal legal advice.
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 flex flex-col no-scrollbar">
               {messages.map((m) => (
                 <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                      m.role === 'user' ? 'bg-saffron text-navy' : 'bg-navy text-white'
                    }`}>
                      {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`max-w-[75%] p-5 rounded-3xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-tr-sm border border-gray-200 dark:border-gray-800' 
                        : 'bg-white dark:bg-gray-950 text-navy dark:text-gray-200 rounded-tl-sm border border-gray-200 dark:border-gray-800 shadow-xl'
                    }`}>
                       {m.content.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('*Disclaimer') ? 'text-[10px] sm:text-xs opacity-50 italic mt-4 pt-4 border-t border-black/10 dark:border-white/10' : ''}>
                            {line}
                          </p>
                       ))}
                    </div>
                 </div>
               ))}
               {loading && (
                 <div className="flex gap-4 flex-row">
                    <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Loader2 size={18} className="animate-spin" />
                    </div>
                    <div className="max-w-[75%] p-5 bg-white dark:bg-gray-950 rounded-3xl rounded-tl-sm border border-gray-200 dark:border-gray-800 shadow-xl flex items-center">
                       <span className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-navy/30 dark:bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-navy/30 dark:bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-navy/30 dark:bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                       </span>
                    </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
               <form onSubmit={handleSubmit} className="relative flex items-center max-w-3xl mx-auto">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask a legal priority question (e.g. Can my landlord withhold deposit without proof?)"
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-sm sm:text-base p-5 pr-16 rounded-2xl outline-none focus:ring-2 focus:ring-saffron text-navy dark:text-white transition-all shadow-inner placeholder:text-gray-400 font-medium"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || loading}
                    className="absolute right-3 p-3 sm:px-6 bg-navy text-white dark:bg-saffron dark:text-navy-dark rounded-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 group shadow-xl"
                  >
                     <span className="font-black text-sm hidden sm:inline">Ask AI</span>
                     <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </form>
            </div>

         </div>
      </div>
    </div>
  );
}
