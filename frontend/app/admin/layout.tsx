'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Activity, Users, FileText, Settings, LogOut, Code, AlertTriangle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Security Overview', href: '/admin', icon: Shield },
    { name: 'Audit Logs', href: '/admin/logs', icon: Activity },
    { name: 'User Access', href: '/admin/users', icon: Users },
    { name: 'Scan Reports', href: '/admin/scans', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-[#05070a] min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 fixed h-screen bg-white/60 dark:bg-navy/60 backdrop-blur-2xl border-r border-gray-200 dark:border-gray-800 flex flex-col pt-4">
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-saffron to-red-500 flex items-center justify-center text-white">
            <AlertTriangle size={18} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-navy dark:text-white">AdminSecure</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 block">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-navy dark:bg-saffron text-white dark:text-navy shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-navy dark:hover:text-white'
                  }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 mx-4 flex flex-col gap-2">
           <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:text-navy dark:hover:text-saffron transition-colors rounded-xl">
            <Code size={18} /> 
            Main Website
           </Link>
           <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full rounded-xl text-left">
             <LogOut size={18} />
             Force Session Swap
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
