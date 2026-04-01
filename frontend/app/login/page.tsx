"use client";

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { Scale, ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { BorderBeam } from '@/components/ui/BorderBeam';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden bg-[#FAF6F1] font-sans">
      <Toaster position="top-right" />
      
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
            Login
          </h2>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center pt-2">
          <p className="text-[0.875rem] text-[#6B5A52] font-medium">
            Need an account?{' '}
            <Link href="/register" className="text-ink font-bold hover:underline transition-all">
              Sign up
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}
