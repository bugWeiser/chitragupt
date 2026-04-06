"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react';

const schema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
  smsOtp:   z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function LoginForm({ onMfaRequired }: { onMfaRequired?: (userId: string) => void }) {
  const { login, loginWithGoogle, loading } = useAuth();
  const [showSmsOtp, setShowSmsOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result: any = await login(data);
      if (result.data?.mfaRequired) {
        setShowSmsOtp(true);
        if (onMfaRequired) onMfaRequired(result.data.userId);
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {}
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      window.location.href = '/';
    } catch (error) {}
  };

  return (
    <div className="space-y-6 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail size={18} className="text-[#8B7B6B]" />
            </div>
            <input 
              {...register('email')} 
              type="email"
              className="block w-full pl-12 pr-5 py-3.5 bg-white border border-[#E8D8C4] rounded-full focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink placeholder:text-[#8B7B6B]"
              placeholder="Email" 
            />
          </div>
          {errors.email && <p className="text-[#561C24] text-xs mt-1.5 ml-4 font-medium">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Lock size={18} className="text-[#8B7B6B]" />
            </div>
            <input 
              {...register('password')} 
              type={showPassword ? "text" : "password"}
              className="block w-full pl-12 pr-12 py-3.5 bg-white border border-[#E8D8C4] rounded-full focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink placeholder:text-[#8B7B6B]"
              placeholder="Password" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#8B7B6B] hover:text-[#561C24] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-[#561C24] text-xs mt-1.5 ml-4 font-medium">{errors.password.message}</p>}
        </div>

        {/* SMS OTP (if needed) */}
        {showSmsOtp && (
          <div className="animate-fade-up">
            <div className="relative">
              <input 
                {...register('smsOtp')} 
                type="text"
                className="block w-full px-5 py-3.5 bg-[#FAF6F1] border border-[#E8D8C4] rounded-full font-mono text-center tracking-[1em] focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink placeholder:text-[#8B7B6B]"
                placeholder="000000" 
                maxLength={6} 
              />
            </div>
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="text-center pt-1 pb-3">
          <a href="#" className="text-[0.8125rem] font-medium text-[#6B5A52] hover:text-[#561C24] underline underline-offset-2 transition-colors">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#1A2518] hover:bg-black text-white font-semibold rounded-full disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 text-[1rem] shadow-sm"
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
      </form>

      {/* Separator */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E8D8C4]"></div>
        </div>
        <div className="relative flex justify-center text-[0.8125rem]">
          <span className="px-4 bg-white text-[#8B7B6B] font-medium">or</span>
        </div>
      </div>

      {/* Third Party Login Buttons */}
      <div className="space-y-3">
        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-[#F5EDE3] hover:bg-[#E8D8C4] text-ink border border-transparent rounded-full font-semibold transition-all hover:scale-[1.01] active:scale-95 text-[0.9375rem]"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        {/* Apple Button */}
        <button
          type="button"
          disabled={loading}
          className="w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-[#A8E6A3] hover:bg-[#97D192] text-ink border border-transparent rounded-full font-semibold transition-all hover:scale-[1.01] active:scale-95 text-[0.9375rem]"
        >
          <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 opacity-90" />
          <span>Continue with Apple</span>
        </button>

        {/* Guest Button */}
        <button
          type="button"
          disabled={loading}
          className="w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-[#F5EDE3] hover:bg-[#E8D8C4] text-ink border border-transparent rounded-full font-semibold transition-all hover:scale-[1.01] active:scale-95 text-[0.9375rem]"
        >
          <UserCircle size={20} className="text-[#3B5441]" />
          <span>Continue As Guest</span>
        </button>
      </div>

    </div>
  );
}
