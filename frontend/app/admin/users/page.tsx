'use client';

import React from 'react';
import { Users, ShieldCheck, Mail, ShieldAlert } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 101, name: 'Ankita Sharma', email: 'ankita.s@example.com', role: 'Litigant', verified: true, date: '2026-04-01' },
    { id: 102, name: 'Adv. Ramesh Kumar', email: 'r.kumar.law@gmail.com', role: 'Lawyer', verified: true, date: '2026-04-01' },
    { id: 103, name: 'Vikram Singh', email: 'vikram.singh99@outlook.com', role: 'Litigant', verified: false, date: '2026-03-31' },
    { id: 104, name: 'Pooja Reddy', email: 'pooja.reddy.blr@yahoo.in', role: 'Lawyer', verified: true, date: '2026-03-30' },
    { id: 105, name: 'System Admin', email: 'admin@chitragupt.in', role: 'Admin', verified: true, date: '2026-03-25' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-navy dark:text-white">Verified Platform Users</h1>
          <p className="text-gray-500">Citizen and Legal Practitioner access management system.</p>
        </div>
      </div>
      
      <div className="bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-navy/80 text-xs uppercase text-gray-500 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Secure Status</th>
              <th className="p-4">Date Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-navy dark:text-white">{u.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/> {u.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${u.role === 'Admin' ? 'bg-red-500/10 text-red-500' : u.role === 'Lawyer' ? 'bg-saffron/10 text-saffron' : 'bg-blue-500/10 text-blue-500'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  {u.verified ? 
                    <span className="flex items-center gap-2 text-xs font-bold text-green-500"><ShieldCheck size={16}/> OTP VERIFIED</span> :
                    <span className="flex items-center gap-2 text-xs font-bold text-amber-500"><ShieldAlert size={16}/> PENDING KYC</span>
                  }
                </td>
                <td className="p-4 text-sm text-gray-500 font-mono">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
