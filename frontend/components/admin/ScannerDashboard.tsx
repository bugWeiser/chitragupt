'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Activity, Target, Zap } from 'lucide-react';

export default function ScannerDashboard() {
  const latestScan = {
    status: 'Completed',
    duration: '1m 12s',
    totalIssues: 4,
    critical: 0,
    high: 1,
    medium: 1,
    low: 2,
    timestamp: new Date().toLocaleTimeString(),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overview Card */}
      <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-navy via-navy/90 to-saffron/20 p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <ShieldAlert size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-saffron animate-pulse" />
            <span className="text-saffron font-bold tracking-widest uppercase text-xs">Layer 5 Security</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Vulnerability Scan</h2>
          <p className="text-gray-300 text-sm mb-6">Last automated self-scan: {latestScan.timestamp}</p>
          
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-white">{latestScan.totalIssues}</span>
            <span className="text-gray-300 font-medium mb-1 tracking-wide">Issues Found</span>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-gray-300 font-mono">
            <span>Duration: {latestScan.duration}</span>
            <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
              <ShieldCheck size={14} /> {latestScan.status}
            </span>
          </div>
        </div>
      </div>

      {/* CVSS Breakdown */}
      <div className="lg:col-span-2 rounded-2xl bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-navy dark:text-saffron" size={20} />
          <h3 className="text-lg font-bold text-navy dark:text-white">CVSS Risk Distribution</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-red-500/50 transition-colors cursor-default">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Critical</span>
            <span className="text-3xl font-black text-navy dark:text-white">{latestScan.critical}</span>
          </div>
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-orange-500/50 transition-colors cursor-default">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">High</span>
            <span className="text-3xl font-black text-navy dark:text-white">{latestScan.high}</span>
          </div>
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-amber-500/50 transition-colors cursor-default">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Medium</span>
            <span className="text-3xl font-black text-navy dark:text-white">{latestScan.medium}</span>
          </div>
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-blue-500/50 transition-colors cursor-default">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Low</span>
            <span className="text-3xl font-black text-navy dark:text-white">{latestScan.low}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex">
             {/* Progress bars simulating distribution */}
             <div className="h-full bg-red-500" style={{ width: `${(latestScan.critical / latestScan.totalIssues) * 100}%` }}></div>
             <div className="h-full bg-orange-500" style={{ width: `${(latestScan.high / latestScan.totalIssues) * 100}%` }}></div>
             <div className="h-full bg-amber-500" style={{ width: `${(latestScan.medium / latestScan.totalIssues) * 100}%` }}></div>
             <div className="h-full bg-blue-500" style={{ width: `${(latestScan.low / latestScan.totalIssues) * 100}%` }}></div>
          </div>
          <div className="flex items-center justify-between mt-3 px-1">
             <span className="text-xs text-gray-500 dark:text-gray-400">Risk Severity Spectrum</span>
             <button className="text-xs font-bold text-saffron hover:text-navy dark:hover:text-white transition-colors flex items-center gap-1">
               <Zap size={14} /> Run Full Scan Now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
