"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Download, FileText, Building2, HelpCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function RTIGenerator() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    department: "",
    details: ""
  });

  const steps = [
    t("rti.steps.details"), 
    t("rti.steps.department"), 
    t("rti.steps.questions"), 
    t("rti.steps.preview"), 
    t("rti.steps.download")
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (step === 1) return formData.fullName && formData.address && formData.city && formData.pincode;
    if (step === 2) return formData.department;
    if (step === 3) return formData.details;
    return true;
  };

  const handleDownloadPDF = async () => {
    try {
      window.print();
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to print. Try using Ctrl+P or Cmd+P.");
    }
  };

  return (
    <div className="flex flex-col bg-surface min-h-screen pt-[140px] pb-24 px-6 lg:px-16 overflow-x-hidden">
      
      {/* ── HEADER ── */}
      <div className="text-center mb-[60px] animate-fade-up">
        <h1 className="text-3xl md:text-display text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          {t("rti.pageTitle")}
        </h1>
        <p className="text-[1rem] md:text-[1.125rem] text-ink/70 max-w-lg mx-auto leading-relaxed">
          {t("rti.pageSubtitle")}
        </p>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div className="max-w-[800px] mx-auto w-full mb-12 px-4 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center justify-between relative overflow-x-auto pb-4 scrollbar-hide">
          <div className="absolute left-0 right-0 top-[16px] -translate-y-1/2 h-[1px] bg-border z-0" />
          
          {steps.map((label, i) => {
            const num = i + 1;
            const isCompleted = step > num;
            const isActive = step === num;

            return (
              <div key={num} className="relative z-10 flex flex-col items-center gap-2 bg-surface px-2 sm:px-4 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[0.75rem] transition-all duration-300 ${
                  isCompleted ? "bg-maroon text-ivory border border-maroon" :
                  isActive ? "bg-burgundy text-ivory border-2 border-burgundy scale-110 shadow-lg" :
                  "bg-surface text-ink/30 border border-border"
                }`}>
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : num}
                </div>
                <span className={`text-[0.6rem] sm:text-[0.6875rem] uppercase tracking-[0.05em] font-bold text-center ${
                  isActive ? "text-burgundy" : isCompleted ? "text-maroon/60" : "text-ink/30"
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <div className="max-w-[640px] mx-auto w-full animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="bg-white border border-border rounded-[4px] p-6 sm:p-12 shadow-resting relative z-10">
          
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-heading-3 text-ink text-center flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-serif)" }}>
                <FileText className="text-burgundy" size={24} />
                {t("rti.form.applicantDetails")}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">{t("rti.form.fullName")}</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    type="text" 
                    className="input-editorial w-full" 
                    placeholder={t("rti.form.fullNamePlaceholder")} 
                  />
                </div>
                <div>
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">{t("rti.form.address")}</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-editorial w-full resize-none h-24" 
                    placeholder={t("rti.form.addressPlaceholder")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">{t("rti.form.city")}</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text" 
                      className="input-editorial w-full" 
                      placeholder={t("rti.form.cityPlaceholder")} 
                    />
                  </div>
                  <div>
                    <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">{t("rti.form.pincode")}</label>
                    <input 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      type="text" 
                      className="input-editorial w-full" 
                      placeholder={t("rti.form.pincodePlaceholder")} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-heading-3 text-ink text-center flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-serif)" }}>
                <Building2 className="text-burgundy" size={24} />
                Select Department
              </h2>
              <div className="space-y-6">
                <p className="text-sm text-[#5C4A42] leading-relaxed text-center italic">
                  Specify the government office or department from which you want information.
                </p>
                <div>
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">Department Name</label>
                  <input 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    type="text" 
                    className="input-editorial w-full" 
                    placeholder="e.g. Municipal Corporation of Delhi, Ministry of Railways..." 
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-heading-3 text-ink text-center flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-serif)" }}>
                <HelpCircle className="text-burgundy" size={24} />
                Your Questions
              </h2>
              <div className="space-y-6">
                <p className="text-sm text-[#5C4A42] leading-relaxed text-center italic">
                  Be specific. Use clear questions or describe the specific records you need.
                </p>
                <div>
                  <label className="text-[0.75rem] font-bold uppercase tracking-widest text-maroon mb-2 block">Information Required</label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    className="input-editorial w-full resize-none h-48" 
                    placeholder="1. Provide copies of sanctioned building plans for... &#10;2. Total budget allocated for repairs of..."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-heading-3 text-ink text-center flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-serif)" }}>
                <Check className="text-burgundy" size={24} />
                Preview Application
              </h2>
              <div className="space-y-4 p-6 bg-ivory rounded-sm border border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-maroon/60">Applicant</span>
                  <span className="sm:col-span-2 text-ink font-medium">{formData.fullName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-maroon/60">Department</span>
                  <span className="sm:col-span-2 text-ink font-medium">{formData.department}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-maroon/60">Postal Address</span>
                  <span className="sm:col-span-2 text-ink text-sm">{formData.address}, {formData.city} - {formData.pincode}</span>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-maroon/60 block mb-2">Subject Matter</span>
                  <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-wrap">{formData.details}</p>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 text-center py-10">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download size={40} />
              </div>
              <h2 className="text-2xl text-ink font-serif italic">Your RTI Request is Ready!</h2>
              <p className="text-[#5C4A42] text-[0.9375rem] max-w-xs mx-auto">
                Download the generated PDF, sign it, and send it via Speed Post to the department's Public Information Officer (PIO).
              </p>
              <button 
                onClick={handleDownloadPDF}
                className="btn-primary w-full sm:w-auto px-12 py-5 shadow-xl hover:scale-105 transition-transform active:scale-95"
              >
                Download RTI PDF <ArrowRight className="ml-2 inline" size={18} />
              </button>
              <div className="pt-8 border-t border-border/30">
                <button onClick={() => setStep(1)} className="btn-ghost">
                  {t("rti.backToStart")}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="btn-ghost w-full sm:w-auto"
                >
                  {t("common.actions.goBack")}
                </button>
              )}
              <button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`btn-primary w-full sm:w-auto px-8 py-3 ${!isStepValid() ? "opacity-50 cursor-not-allowed group" : "group"}`}
              >
                {step === 4 ? "Finalize Application" : t("rti.form.continueTo")} 
                <ArrowRight size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Info Card */}
        {step < 5 && (
          <div className="mt-12 bg-burgundy/5 p-6 border border-burgundy/10 rounded-sm flex gap-4 animate-fade-in">
            <HelpCircle className="text-burgundy shrink-0" size={20} />
            <div className="space-y-1">
              <p className="text-[0.75rem] font-bold uppercase tracking-widest text-burgundy">Pro Tip</p>
              <p className="text-[0.875rem] text-ink/80 leading-relaxed">
                {step === 1 ? "Ensure your postal address is correct as you will receive the response via physical mail." : 
                 step === 2 ? "If you're unsure of the exact department, use the main Ministry or Department for that sector." :
                 "State your questions clearly. Avoid asking for opinions; only ask for specific facts or records."}
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
