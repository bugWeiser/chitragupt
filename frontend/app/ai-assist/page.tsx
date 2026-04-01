"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Sparkles, Scale, BookOpen, FileText, Gavel,
  PlusCircle, ChevronRight, Loader2, Copy, ThumbsUp,
  ThumbsDown, RefreshCw, Scroll, MessageSquare, History,
  X, Menu, Trash2, Check
} from "lucide-react";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import Link from "next/link";

/* ── Types ─────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messages: Message[];
}

/* ── Suggested prompts ─────────────────────────────────────── */
const SUGGESTED = [
  { icon: "", text: "My landlord won't return my deposit of ₹40,000." },
  { icon: "", text: "My employer hasn't paid my salary for 2 months." },
  { icon: "", text: "The police refused to file my FIR. What are my rights?" },
  { icon: "", text: "I received a defective product and the company is ignoring me." },
  { icon: "", text: "How do I file an RTI application for government information?" },
  { icon: "", text: "Explain Section 498A of IPC and when it applies." },
];

/* ── AI response generator (calls real API if available) ─────── */
async function getAIResponse(messages: Message[], newMessage: string): Promise<string> {
  try {
    const res = await fetch("/api/legal-guidance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "general",
        description: newMessage,
        city: "India",
        amount: "0",
        previousActions: "None",
        conversationHistory: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await res.json();
    if (data.situation_summary) {
      let response = `**${data.situation_summary}**\n\n`;
      if (data.your_rights?.length) {
        response += `**Your Legal Rights:**\n${data.your_rights.map((r: string) => `• ${r}`).join("\n")}\n\n`;
      }
      if (data.action_plan?.length) {
        response += `**Recommended Action Plan:**\n${data.action_plan.map((s: any, i: number) => `${i + 1}. ${s.action}`).join("\n")}\n\n`;
      }
      if (data.relevant_laws?.length) {
        response += `**Relevant Laws:**\n${data.relevant_laws.map((l: any) => `• ${l.act} — Section ${l.section}: ${l.what_it_says}`).join("\n")}`;
      }
      return response;
    }
    return "I understand your situation. Could you provide more specific details so I can give you precise legal guidance under Indian law?";
  } catch {
    // Fallback responses
    const lower = newMessage.toLowerCase();
    if (lower.includes("deposit") || lower.includes("landlord")) {
      return "**Regarding your landlord / deposit issue:**\n\n**Your Rights:**\n• Under the Transfer of Property Act, 1882, a landlord must return the security deposit within a reasonable time after vacating\n• Withholding deposit without valid reason is actionable under Consumer Protection Act, 2019\n• You can file a case in Consumer Forum for disputes up to ₹1 crore at no cost\n\n**Action Plan:**\n1. Send a formal legal notice via registered post (15-day deadline)\n2. If no response, file complaint in District Consumer Forum\n3. Attach rent agreement, payment receipts, and vacating proof\n\n**Laws:** Transfer of Property Act 1882, Consumer Protection Act 2019, Specific Relief Act 1963";
    }
    if (lower.includes("salary") || lower.includes("wage")) {
      return "**Regarding unpaid salary:**\n\n**Your Rights:**\n• Payment of Wages Act, 1936 mandates salary payment by the 7th of each month\n• Non-payment is a criminal offense under BNS Section 406 (Criminal Breach of Trust)\n• You can file a complaint with the Labour Commissioner at zero cost\n\n**Action Plan:**\n1. Send a written demand notice via email + registered post\n2. File complaint with Assistant Labour Commissioner\n3. If no resolution in 30 days, approach Labour Court\n\n**Laws:** Payment of Wages Act 1936, Minimum Wages Act 1948, BNS Section 406";
    }
    return "I'm here to help you understand your legal rights under Indian law. Please describe your specific situation in detail — include what happened, who is involved, and what outcome you're seeking. The more context you provide, the more precise my guidance will be.\n\n*Note: This is general legal information, not a substitute for advice from a qualified lawyer.*";
  }
}

/* ── Message Bubble ────────────────────────────────────────── */
function MessageBubble({ msg, isLast }: { msg: Message; isLast: boolean }) {
  const [copied, setCopied] = useState(false);
  const isBot = msg.role === "assistant";

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render markdown-ish formatting
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-bold text-crimson dark:text-amber mt-4 mb-1 first:mt-0" style={{ fontFamily: "var(--font-serif)" }}>{line.slice(2, -2)}</p>;
      }
      if (line.startsWith("• ") || line.startsWith("* ")) {
        return <li key={i} className="ml-4 list-disc text-[14px] leading-relaxed mb-1">{line.slice(2)}</li>;
      }
      if (/^\d+\./.test(line)) {
        return <li key={i} className="ml-4 list-decimal text-[14px] leading-relaxed mb-1">{line.replace(/^\d+\. /, "")}</li>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-[14px] leading-relaxed">{line}</p>;
    });
  };

  if (!isBot) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[75%] bg-crimson text-sand rounded-md rounded-tr-sm px-5 py-3.5 shadow-crimson">
          <p className="text-[14px] leading-relaxed">{msg.content}</p>
          <p className="text-[10px] text-[#F5EDE3] mt-1.5 text-right opacity-80">
            {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-6 group">
      {/* Bot avatar */}
      <div className="w-9 h-9 rounded-md bg-amber/15 border border-amber/25 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Scale size={17} className="text-amber" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-label text-amber">Chitragupt AI</span>
          <span className="text-[10px] text-[#6B5A52] dark:text-[#C0AFA3]">
            {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-[#2A1A1E] dark:text-[#E8D8C4]">
          {isLast && msg.content.length < 80
            ? <p className="text-[14px] leading-relaxed">{msg.content}</p>
            : <div className="space-y-0.5">{renderContent(msg.content)}</div>
          }
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-[#6B5A52] dark:text-[#C0AFA3] hover:text-[#561C24] dark:hover:text-[#F5EDE3] transition-colors rounded">
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button className="p-1 text-[#6B5A52] dark:text-[#C0AFA3] hover:text-[#561C24] dark:hover:text-[#F5EDE3] transition-colors rounded">
            <ThumbsUp size={12} />
          </button>
          <button className="p-1 text-[#6B5A52] dark:text-[#C0AFA3] hover:text-[#561C24] dark:hover:text-[#F5EDE3] transition-colors rounded">
            <ThumbsDown size={12} />
          </button>
          <Link href="/documents" className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-crimson/60 hover:text-crimson dark:text-amber/40 dark:hover:text-amber transition-colors rounded border border-crimson/15 hover:border-crimson/30">
            <FileText size={11} /> Generate Notice
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function AIAssistPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Landlord deposit dispute", preview: "My landlord won't return...", timestamp: new Date(Date.now() - 86400000), messages: [] },
    { id: "2", title: "Salary complaint guidance", preview: "My employer hasn't paid...", timestamp: new Date(Date.now() - 172800000), messages: [] },
  ]);
  const [activeConvId, setActiveConvId]   = useState<string | null>(null);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startNewConversation = () => {
    setActiveConvId(null);
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleSend = useCallback(async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await getAIResponse(messages, content);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: reply, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);

      // Save to conversation history
      if (!activeConvId) {
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
          preview: content.slice(0, 60),
          timestamp: new Date(),
          messages: [...newMessages, botMsg],
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveConvId(newConv.id);
      }
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading, activeConvId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmptyState = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-sand-light dark:bg-darkbrown overflow-hidden">

      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <aside className={`
        ${sidebarOpen ? "w-[260px]" : "w-0"} 
        flex-shrink-0 transition-all duration-300 overflow-hidden
        bg-white dark:bg-[#1A0A0D] border-r border-crimson/8 flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-crimson/8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber/15 border border-amber/25 flex items-center justify-center">
              <Scale size={14} className="text-amber" />
            </div>
            <span className="text-sm font-bold text-crimson dark:text-amber" style={{ fontFamily: "var(--font-serif)" }}>
              Chitragupt AI
            </span>
          </div>
        </div>

        {/* New Chat */}
        <div className="p-3 flex-shrink-0">
          <button
            onClick={startNewConversation}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-crimson text-sand text-[13px] font-semibold hover:bg-crimson-light transition-colors"
          >
            <PlusCircle size={15} />
            New Conversation
          </button>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
          <p className="text-label text-[#6B5A52] dark:text-[#C0AFA3] px-2 mb-3">Recent</p>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setActiveConvId(conv.id); setMessages(conv.messages); }}
              className={`w-full text-left p-3 rounded-md transition-all duration-150 group relative ${
                activeConvId === conv.id
                  ? "bg-crimson/8 border border-crimson/15"
                  : "hover:bg-sand/40 dark:hover:bg-sand/5 border border-transparent"
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare size={13} className="text-amber/60 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#2A1A1E] dark:text-[#F5EDE3] truncate">{conv.title}</p>
                  <p className="text-[10px] text-[#6B5A52] dark:text-[#C0AFA3] truncate mt-0.5">{conv.preview}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-crimson/8 flex-shrink-0">
          <Link href="/get-help" className="flex items-center gap-2 text-[11px] font-semibold text-[#2A1A1E] dark:text-[#F5EDE3] hover:text-crimson dark:hover:text-[#FFF] transition-colors">
            <Scale size={13} />
            <span>Full Legal Guidance →</span>
          </Link>
        </div>
      </aside>

      {/* ══ MAIN CHAT AREA ═══════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-crimson/8 bg-white/70 dark:bg-[#1A0A0D]/70 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="p-1.5 rounded-md text-[#2A1A1E] dark:text-[#F5EDE3] hover:text-[#561C24] dark:hover:text-white transition-all"
            >
              <Menu size={17} />
            </button>
            <div className="h-4 w-px bg-crimson/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[13px] font-semibold text-[#2A1A1E] dark:text-[#F5EDE3]">
                Chitragupt AI — Legal First-Response
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={startNewConversation}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#2A1A1E] dark:text-[#F5EDE3] border border-[#2A1A1E]/20 dark:border-[#F5EDE3]/20 hover:border-[#561C24] rounded-md transition-all"
            >
              <PlusCircle size={12} /> New Chat
            </button>
          </div>
        </div>

        {/* Messages / Empty State */}
        <div className="flex-1 overflow-y-auto">
          {isEmptyState ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mb-6">
                <Scale size={30} className="text-amber" />
              </div>
              <h2 className="text-2xl font-bold text-crimson dark:text-sand mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                Chitragupt AI
              </h2>
              <p className="text-sm text-[#5C4A42] dark:text-[#D4C4B4] max-w-sm leading-relaxed mb-10">
                Your AI legal first-responder. Describe your situation and get instant guidance on your rights under Indian law.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl w-full">
                {SUGGESTED.map(s => (
                  <button
                    key={s.text}
                    onClick={() => handleSend(s.text)}
                    className="text-left p-4 bg-white dark:bg-[#2D1215] border border-crimson/10 rounded-[4px] hover:border-amber/35 hover:shadow-card transition-all duration-200 group flex items-start gap-3"
                  >
                    <span className="text-[12px] font-medium text-[#2A1A1E] dark:text-[#F5EDE3] transition-colors leading-relaxed">
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Messages ── */
            <div className="max-w-[800px] mx-auto px-6 py-8">
              {messages.map((msg, i) => (
                <MessageBubble key={msg.id} msg={msg} isLast={i === messages.length - 1} />
              ))}
              {isLoading && (
                <div className="flex gap-4 mb-6">
                  <div className="w-9 h-9 rounded-md bg-amber/15 border border-amber/25 flex items-center justify-center flex-shrink-0">
                    <Scale size={17} className="text-amber" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-label text-amber">Chitragupt AI</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6B5A52] dark:text-[#C0AFA3]">
                      <Loader2 size={14} className="animate-spin text-[#561C24] dark:text-[#F5EDE3]" />
                      <TypingAnimation speed={80}>
                        Consulting the records...
                      </TypingAnimation>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Input Area ── */}
        <div className="flex-shrink-0 px-6 py-4 bg-white/80 dark:bg-[#1A0A0D]/80 backdrop-blur-sm border-t border-crimson/8">
          <div className="max-w-[800px] mx-auto">
            <div className="relative rounded-md overflow-hidden bg-white dark:bg-[#2D1215] border border-crimson/12 shadow-card hover:border-amber/30 transition-colors focus-within:border-amber/50 focus-within:shadow-amber/10">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your legal situation... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="w-full px-5 py-4 pr-14 bg-transparent text-[14px] text-[#2A1A1E] dark:text-[#F5EDE3] resize-none outline-none placeholder:text-[#6B5A52] dark:placeholder:text-[#C0AFA3] font-sans leading-relaxed max-h-32"
                style={{ fieldSizing: "content" } as any}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 bottom-3 w-9 h-9 rounded-md bg-crimson disabled:bg-crimson/25 text-sand flex items-center justify-center hover:bg-crimson-light transition-colors disabled:cursor-not-allowed"
              >
                {isLoading
                  ? <Loader2 size={16} className="animate-spin" />
                  : <Send size={15} />
                }
              </button>
              {/* BorderBeam on focus */}
              <div className="border-beam-glow pointer-events-none" style={{ "--beam-duration": "4s" } as React.CSSProperties} />
            </div>
            <p className="text-center text-[10px] font-semibold text-[#6B5A52] dark:text-[#C0AFA3] mt-3 uppercase tracking-widest">
              General information only. Not a substitute for legal advice from a qualified advocate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
