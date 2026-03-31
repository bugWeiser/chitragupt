"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Github } from 'lucide-react';

const schema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
  smsOtp:   z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function LoginForm({ onMfaRequired }: { onMfaRequired?: (userId: string) => void }) {
  const { login, loginWithGithub, loading } = useAuth();
  const [showSmsOtp, setShowSmsOtp] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data);
      if (result.data?.mfaRequired) {
        setShowSmsOtp(true);
        if (onMfaRequired) onMfaRequired(result.data.userId);
      } else {
        window.location.href = '/';
      }
    } catch (err) {}
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      window.location.href = '/';
    } catch (error) {}
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1">Email</label>
          <input {...register('email')} type="email"
            className="mt-1 block w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-navy dark:focus:ring-saffron outline-none transition-all"
            placeholder="you@example.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1">Password</label>
          <input {...register('password')} type="password"
            className="mt-1 block w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-navy dark:focus:ring-saffron outline-none transition-all" />
          {errors.password && <p className="text-red-500 text-xs mt-1 font-bold">{errors.password.message}</p>}
        </div>

        {showSmsOtp && (
          <div className="animate-fadeInDown mt-4">
            <label className="block text-sm font-bold text-navy dark:text-saffron uppercase tracking-widest mb-1">Enter SMS OTP</label>
            <input {...register('smsOtp')} type="text"
              className="mt-1 block w-full p-3 bg-blue-50 dark:bg-navy-900/30 border border-navy-200 dark:border-navy-800 rounded-xl font-mono text-center tracking-[1em]"
              placeholder="000000" maxLength={6} />
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-4 px-4 bg-navy dark:bg-saffron text-white dark:text-navy font-black rounded-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest">
          {loading ? 'Processing...' : 'Secure Sign In'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
          <span className="px-2 bg-white dark:bg-black text-gray-400">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGithubLogin}
        disabled={loading}
        className="w-full py-4 px-4 flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 hover:border-gray-200 dark:hover:border-gray-700 shadow-sm"
      >
        <Github size={20} />
        <span>Continue with GitHub</span>
      </button>

      <div className="text-center">
        <a href="#" className="text-xs text-gray-400 hover:text-navy dark:hover:text-saffron underline uppercase tracking-widest font-bold">Forgot Password?</a>
      </div>
    </div>
  );
}
