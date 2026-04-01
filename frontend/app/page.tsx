"use client";

import React, { useState } from "react";
import { MoveRight, ShieldCheck, Scale, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCase } from "@/context/CaseContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const router = useRouter();
  const { updateCase } = useCase();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Step 2 questions
  const [qCity, setQCity] = useState("");
  const [qAmount, setQAmount] = useState("");
  const [qAction, setQAction] = useState("");

  const handleNext = () => {
    if (!description.trim()) return;
    setStep(2);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    updateCase({
      currentIssue: description,
      stateLocation: qCity || 'Unknown',
      amount: qAmount || '0',
    });

    // Real AI categorization logic (simulated delay for UX)
    setTimeout(() => {
      let routedId = 'deposit-return'; // Fallback
      const descLower = description.toLowerCase();
      
      if (descLower.includes('police') || descLower.includes('fir') || descLower.includes('threat') || descLower.includes('beat') || descLower.includes('harass') || descLower.includes('arrest')) routedId = 'fir-police';
      else if (descLower.includes('salary') || descLower.includes('job') || descLower.includes('boss') || descLower.includes('fire') || descLower.includes('wage') || descLower.includes('workplace') || descLower.includes('employment')) routedId = 'unpaid-salary';
      else if (descLower.includes('product') || descLower.includes('refund') || descLower.includes('scam') || descLower.includes('fake') || descLower.includes('fraud') || descLower.includes('consumer') || descLower.includes('shop')) routedId = 'consumer-fraud';
      else if (descLower.includes('divorce') || descLower.includes('wife') || descLower.includes('husband') || descLower.includes('marriage') || descLower.includes('domestic') || descLower.includes('violence') || descLower.includes('family')) routedId = 'family-dispute';
      else if (descLower.includes('land') || descLower.includes('property') || descLower.includes('tenant') || descLower.includes('rent') || descLower.includes('evict') || descLower.includes('landlord')) routedId = 'deposit-return';
      else if (descLower.includes('accident') || descLower.includes('crash') || descLower.includes('injury') || descLower.includes('traffic') || descLower.includes('challan') || descLower.includes('vehicle')) routedId = 'traffic-vehicle';
      else if (descLower.includes('builder') || descLower.includes('rera') || descLower.includes('possession') || descLower.includes('flat') || descLower.includes('real estate')) routedId = 'property-fraud';
      else if (descLower.includes('cyber') || descLower.includes('online') || descLower.includes('scam') || descLower.includes('phishing') || descLower.includes('hacked') || descLower.includes('account')) routedId = 'cyber-crime';
      else if (descLower.includes('medical') || descLower.includes('hospital') || descLower.includes('doctor') || descLower.includes('surgery') || descLower.includes('wrong treatment')) routedId = 'medical-negligence';
      else if (descLower.includes('bank') || descLower.includes('loan') || descLower.includes('credit card') || descLower.includes('harassment') || descLower.includes('emi')) routedId = 'banking-fraud';
      else if (descLower.includes('passport') || descLower.includes('pension') || descLower.includes('government') || descLower.includes('rti') || descLower.includes('service')) routedId = 'government-services';
      else if (descLower.includes('college') || descLower.includes('school') || descLower.includes('fee') || descLower.includes('admission') || descLower.includes('student')) routedId = 'education-rights';

      router.push(`/get-help?id=${routedId}`);
    }, 1500);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center min-h-[calc(100vh-80px)] bg-white dark:bg-black relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-navy-50/50 dark:bg-navy-900/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-saffron-50/50 dark:bg-saffron-900/10 blur-[100px] -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {step === 1 ? (
          <div className="space-y-10 text-center animate-fadeInUp">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="text-navy dark:text-saffron" size={32} />
              <span className="text-xl font-poppins font-black tracking-widest text-navy dark:text-white uppercase px-3 py-1 bg-navy/5 dark:bg-white/5 rounded-full backdrop-blur-sm">Chitragupta AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold font-poppins text-navy dark:text-white leading-[1.1] tracking-tight">
              {t('hero.title').split('.')[0]}. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-blue-500 to-saffron dark:from-saffron dark:to-saffron-light">
                {t('hero.subtitle')}
              </span>
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-4">
               <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('hero.placeholder')}
                  className="w-full min-h-[160px] p-6 text-lg sm:text-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent focus:border-navy dark:focus:border-saffron rounded-[32px] shadow-inner outline-none text-navy dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none transition-all focus:bg-white dark:focus:bg-gray-900"
               />
               <button 
                  onClick={handleNext}
                  disabled={!description.trim()}
                  className="w-full sm:w-auto mx-auto flex items-center justify-center gap-3 px-10 py-5 bg-navy dark:bg-saffron text-white dark:text-navy-dark rounded-2xl font-black text-lg disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-navy/20 dark:shadow-saffron/20 group"
               >
                  <span>{t('hero.analyze')}</span>
                  <MoveRight size={24} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6">
                 Answer 3 quick questions. Get a 60-second action plan.
               </p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-12 animate-fadeInRight">
             <div className="flex items-center gap-4 text-gray-400 font-bold text-sm uppercase tracking-widest cursor-pointer hover:text-navy dark:hover:text-white transition-colors group" onClick={() => setStep(1)}>
               <MoveRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
               <span>Back to Start</span>
             </div>

             <div className="space-y-4">
                <h2 className="text-3xl font-black text-navy dark:text-white font-poppins">Just a few clarifying questions.</h2>
                <p className="text-gray-500 font-medium">To give you accurate legal rights, we need some context.</p>
             </div>

             <div className="space-y-8 bg-white dark:bg-gray-950 p-8 sm:p-12 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-900 relative">
                
                <div className="space-y-3">
                   <label className="text-sm font-black text-navy dark:text-white">Which city did this happen in?</label>
                   <input type="text" value={qCity} onChange={e => setQCity(e.target.value)} placeholder="e.g. Indore, Madhya Pradesh" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-medium outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
                </div>

                <div className="space-y-3">
                   <label className="text-sm font-black text-navy dark:text-white">Is there any money involved? If yes, how much?</label>
                   <input type="text" value={qAmount} onChange={e => setQAmount(e.target.value)} placeholder="e.g. ₹50,000" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-medium outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
                </div>

                <div className="space-y-3">
                   <label className="text-sm font-black text-navy dark:text-white">Have you already taken any action?</label>
                   <div className="flex flex-wrap gap-2">
                      {['None', 'Filed Police Complaint', 'Sent Email/Message', 'Talked to Lawyer'].map(act => (
                        <button 
                          key={act} 
                          onClick={() => setQAction(act)}
                          className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border transition-all ${
                            qAction === act ? 'bg-navy dark:bg-saffron text-white dark:text-navy-dark border-navy dark:border-saffron' : 'bg-transparent text-gray-500 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        >
                          {act}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="pt-6">
                   <button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing}
                      className="w-full p-5 bg-navy dark:bg-saffron text-white dark:text-navy-dark rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-xl"
                   >
                     {isAnalyzing ? (
                       <>
                         <Loader2 className="animate-spin" size={24} />
                         <span>{t('hero.recording')}</span>
                       </>
                     ) : (
                       <>
                         <span>Find My Rights</span>
                         <ArrowRight size={20} />
                       </>
                     )}
                   </button>
                </div>

             </div>
          </div>
        )}

      </div>
    </div>
  );
}

