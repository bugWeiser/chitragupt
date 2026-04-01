'use client';

import React from 'react';
import { Settings, Shield, Globe, Lock, Save, Database, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-navy dark:text-white">Platform Settings</h1>
          <p className="text-gray-500">Configure Chitragupt's security thresholds and global preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-saffron text-navy font-bold rounded-xl hover:bg-yellow-500 transition-all shadow-lg text-sm">
          <Save size={18} /> Save Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Shield size={24} /></div>
            <h2 className="text-xl font-bold text-navy dark:text-white">Zero-Trust Boundaries</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-gray-700 dark:text-gray-200">Force Hardware MFA</p>
              <p className="text-xs text-gray-500 mt-1">Require Yubikey / Passkeys for Admin Actions</p>
            </div>
            <div className="w-12 h-6 bg-saffron rounded-full relative cursor-pointer border-2 border-saffron"><div className="w-5 h-5 bg-white rounded-full absolute right-0 top-0 shadow-sm"></div></div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-gray-700 dark:text-gray-200">Session Max TTL</p>
              <p className="text-xs text-gray-500 mt-1">Kill sessions across all devices globally (hours)</p>
            </div>
            <select className="bg-gray-100 dark:bg-gray-800 outline-none p-2 rounded-lg text-sm font-mono border border-gray-200"><option>4 Hours</option><option>8 Hours</option><option>24 Hours</option></select>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Globe size={24} /></div>
            <h2 className="text-xl font-bold text-navy dark:text-white">Network Defense</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-gray-700 dark:text-gray-200">Rate Limiter Threshold</p>
              <p className="text-xs text-gray-500 mt-1">Requests per IPs before temporary block</p>
            </div>
            <input type="text" defaultValue="150" className="w-20 p-2 text-center bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono outline-none border border-gray-200" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-gray-700 dark:text-gray-200">Geo-IP Fencing</p>
              <p className="text-xs text-gray-500 mt-1">Block traffic originating outside Indian borders</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
