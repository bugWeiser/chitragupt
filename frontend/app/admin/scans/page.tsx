'use client';

import React from 'react';
import ScannerDashboard from '@/components/admin/ScannerDashboard';

export default function ScansPage() { 
  return (
    <div className="w-full max-w-7xl mx-auto py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-navy dark:text-white">Malware & Scan Reports</h1>
        <p className="text-gray-500">Deep-inspection reports of all user-uploaded legal documents and evidences.</p>
      </div>
      <div className="mb-10">
        <ScannerDashboard />
      </div>
    </div>
  ); 
}
