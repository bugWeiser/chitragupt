"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import zxcvbn from 'zxcvbn';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(2, 'Name too short'),
  email:    z.string().email('Invalid email'),
  phone:    z.string().optional(),
  password: z.string().min(8, 'Min 8 characters'),
  role:     z.string(),
});

type FormData = z.infer<typeof schema>;

export function RegisterForm({ onSuccess }: { onSuccess: (userId: string) => void }) {
  const { register: authRegister, loading } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const strengthLabels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'];

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'litigant' }
  });

  const password = watch('password', '');
  React.useEffect(() => {
    if (password) setPasswordStrength(zxcvbn(password).score);
  }, [password]);

  const onSubmit = async (data: FormData) => {
    const result = await authRegister(data);
    onSuccess(result.data.userId);
  };

  return (
    <div className="space-y-6 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Full Name Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <User size={18} className="text-[#8B7B6B]" />
            </div>
            <input 
              {...register('fullName')} 
              type="text"
              className="block w-full pl-12 pr-5 py-3.5 bg-white border border-[#E8D8C4] rounded-full focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink placeholder:text-[#8B7B6B]"
              placeholder="Full Name" 
            />
          </div>
          {errors.fullName && <p className="text-[#561C24] text-xs mt-1.5 ml-4 font-medium">{errors.fullName.message}</p>}
        </div>

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

        {/* Phone Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Phone size={18} className="text-[#8B7B6B]" />
            </div>
            <input 
              {...register('phone')} 
              type="tel"
              className="block w-full pl-12 pr-5 py-3.5 bg-white border border-[#E8D8C4] rounded-full focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink placeholder:text-[#8B7B6B]"
              placeholder="Phone Number (for SMS OTP)" 
            />
          </div>
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
          {password && (
            <div className="mt-2.5 px-3">
              <div className="flex gap-1">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-[#E8D8C4]'}`} />
                ))}
              </div>
              <p className="text-[0.6875rem] mt-1 text-[#6B5A52] font-medium tracking-wide">{strengthLabels[passwordStrength]}</p>
            </div>
          )}
          {errors.password && <p className="text-[#561C24] text-xs mt-1.5 ml-4 font-medium">{errors.password.message}</p>}
        </div>

        {/* Role Select */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <ShieldCheck size={18} className="text-[#8B7B6B]" />
            </div>
            <select 
              {...register('role')} 
              className="block w-full pl-12 pr-5 py-3.5 bg-white border border-[#E8D8C4] rounded-full focus:border-[#561C24] focus:ring-1 focus:ring-[#561C24] outline-none transition-all text-[0.9375rem] text-ink appearance-none cursor-pointer"
            >
              <option value="litigant">I am seeking legal help</option>
              <option value="lawyer">I am providing legal help</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-4 h-4 text-[#8B7B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Empty space before submit button */}
        <div className="h-2"></div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#1A2518] hover:bg-black text-white font-semibold rounded-full disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 text-[1rem] shadow-sm"
        >
          {loading ? 'Creating Account...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
