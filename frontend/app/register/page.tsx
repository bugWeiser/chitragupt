"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { OTPVerification } from '@/components/auth/OTPVerification';
import { ShieldCheck, Scale, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [userId, setUserId] = useState<string | null>(null);

  const handleRegisterSuccess = (id: string) => {
    setUserId(id);
  };

  const handleVerifySuccess = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden bg-[#FAF6F1] font-sans">
      
      {/* Concentric Circles Background (Top-Left) */}
      <div className="absolute top-[-20vw] left-[-20vw] w-[80vw] h-[80vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />
      <div className="absolute top-[-10vw] left-[-10vw] w-[60vw] h-[60vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />
      <div className="absolute top-[0vw] left-[0vw] w-[40vw] h-[40vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />
      
      {/* Concentric Circles Background (Bottom-Right) */}
      <div className="absolute bottom-[-20vw] right-[-20vw] w-[80vw] h-[80vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[60vw] h-[60vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />
      <div className="absolute bottom-[0vw] right-[0vw] w-[40vw] h-[40vw] rounded-full border border-[#D4C4B4]/30 pointer-events-none" />

      <div className="max-w-[400px] w-full bg-white rounded-[40px] shadow-[0_8px_32px_rgba(42,26,30,0.04)] p-8 sm:p-10 relative z-10 flex flex-col">
        
        <div className="text-center mb-8">
          <h2 className="text-[2rem] font-bold text-[#561C24] tracking-tight">
            Sign up
          </h2>
        </div>
        
        {!userId ? (
          <RegisterForm onSuccess={handleRegisterSuccess} />
        ) : (
          <OTPVerification userId={userId} onSuccess={handleVerifySuccess} />
        )}

        {!userId && (
          <div className="mt-8 text-center pt-2">
            <p className="text-[0.875rem] text-[#6B5A52] font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-ink font-bold hover:underline transition-all">
                Login
              </Link>
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}
