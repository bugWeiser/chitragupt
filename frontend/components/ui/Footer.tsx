"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Phone, ExternalLink } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#2A1A1E] text-[#D4C4B4] py-16 px-6 lg:px-16 border-t border-[#C7B7A3]/10" role="contentinfo">
      <div className="max-w-[1120px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* ── Brand ── */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt={t("common.appName")} 
                width={44} 
                height={44} 
                className="object-contain"
              />
            </Link>
            <p className="text-[0.8125rem] leading-relaxed text-[#A69485]">
              {t("common.footer.tagline")}
            </p>
            <a href="tel:15100" className="flex items-center gap-3 p-3 bg-[rgba(245,237,227,0.05)] rounded-[2px] border border-[rgba(245,237,227,0.1)] hover:bg-[rgba(245,237,227,0.08)] transition-colors">
              <Phone size={15} className="text-[#E8D8C4] flex-shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#8B7B6B]">{t("common.footer.legalAidHelpline")}</span>
                <span className="text-[1rem] font-bold text-[#F5EDE3] tracking-widest">15100</span>
              </div>
            </a>
          </div>

          {/* ── Get Help ── */}
          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#8B7B6B] mb-6">
              {t("common.footer.getHelp")}
            </h4>
            <ul className="space-y-3 text-[0.875rem]">
              <li><Link href="/issues/consumer" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.consumerRights")}</Link></li>
              <li><Link href="/issues/workplace" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.workplaceProblems")}</Link></li>
              <li><Link href="/issues/police" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.policeFirHelp")}</Link></li>
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#8B7B6B] mb-6">
              {t("common.footer.resources")}
            </h4>
            <ul className="space-y-3 text-[0.875rem]">
              <li><Link href="/rti" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.rtiGenerator")}</Link></li>
              <li><Link href="/lawyers" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.findLawyer")}</Link></li>
              <li><Link href="/issues" className="text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">{t("common.footer.knowYourRights")}</Link></li>
              <li>
                <a href="https://nalsa.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#A69485] hover:text-[#E8D8C4] transition-colors duration-200">
                  NALSA Website <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* ── About ── */}
          <div>
            <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#8B7B6B] mb-6">
              {t("common.footer.about")}
            </h4>
            <p className="text-[0.875rem] text-[#A69485] mb-4 leading-relaxed">
              {t("common.footer.builtAt")}
            </p>
            <div className="text-[0.6875rem] text-[#6B5A52] space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
              <p>{t("common.footer.poweredBy")}</p>
              <p>{t("common.footer.copyright")}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-[rgba(245,237,227,0.08)] mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[0.6875rem] text-[#6B5A52] tracking-wide font-medium uppercase">
          <p>{t("common.footer.disclaimer")}</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#E8D8C4] transition-colors">{t("common.footer.privacyPolicy")}</Link>
            <Link href="/" className="hover:text-[#E8D8C4] transition-colors">{t("common.footer.termsOfUse")}</Link>
            <Link href="/" className="hover:text-[#E8D8C4] transition-colors">{t("common.footer.disclaimerLink")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
