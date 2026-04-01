'use client';

import React, { useState, useEffect } from 'react';
import AuditLogTable from '@/components/admin/AuditLogTable';
import ScannerDashboard from '@/components/admin/ScannerDashboard';
import { ShieldCheck, Activity, Users, AlertOctagon, Loader2 } from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>({ totalUsers: 0, anomalies24h: 0, systemStatus: 'Initializing...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const result = await response.json();
      if (response.ok) {
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-navy via-navy/90 to-saffron shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">Platform Security Command Center</h1>
          <p className="text-gray-200">Real-time visualization of Chitragupt's 5-Layer Security Architecture.</p>
        </div>
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
          <ShieldCheck size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-green-500/10 text-green-500 rounded-xl">
             {loading ? <Loader2 size={24} className="animate-spin" /> : <Activity size={24} />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">System Status</p>
            <p className="text-2xl font-black text-navy dark:text-white uppercase text-xs tracking-widest">{stats.systemStatus}</p>
          </div>
        </div>
        
        <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl">
             {loading ? <Loader2 size={24} className="animate-spin" /> : <Users size={24} />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Verified Platform Users</p>
            <p className="text-2xl font-black text-navy dark:text-white">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-xl">
             {loading ? <Loader2 size={24} className="animate-spin" /> : <AlertOctagon size={24} />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Threat Alerts (24h)</p>
            <p className="text-2xl font-black text-navy dark:text-white">{stats.anomalies24h}</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <ScannerDashboard />
      </div>
      
      <div>
        <AuditLogTable />
      </div>
    </div>
  );
}

