"use client";

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function OTPVerification({ userId, onSuccess }: { userId: string, onSuccess: () => void }) {
  const { verifyOTP, loading } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setError('');
    try {
      const result = await verifyOTP(userId, otp);
      if (result.success) {
        onSuccess();
      } else {
        setError('Invalid verification code. Please check your email/SMS or the backend console.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6 text-center animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-[1.75xl] font-bold text-[#561C24] tracking-tight">Verify Your Account</h3>
        <p className="text-[#6B5A52] text-[0.9375rem] leading-relaxed">We've sent a 6-digit code to your email and phone. Enter it below to secure your identity.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100/50 rounded-xl text-red-600 text-sm font-medium animate-shake">
          {error}
        </div>
      )}

      <div>
        <input 
          type="text" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
          maxLength={6}
          placeholder="000000"
          className="w-full p-5 bg-[#FAF6F1] border border-[#E8D8C4] focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] rounded-2xl text-center text-[2rem] font-black tracking-[0.5em] text-ink outline-none transition-all placeholder:text-[#D4C4B4]"
        />
      </div>

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full py-4 bg-[#1A2518] hover:bg-black text-white font-semibold rounded-full disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
      >
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </button>

      <p className="text-[0.75rem] text-[#8B7B6B] font-medium tracking-wide">
        Didn't receive the code? <button type="button" className="underline hover:text-[#561C24] transition-colors ml-1 font-bold">Resend in 60s</button>
      </p>
    </form>
  );
}
