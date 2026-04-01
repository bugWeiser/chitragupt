'use client';

import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, Search, ChevronDown, ChevronUp } from 'lucide-react';

const MOCK_LOGS = [
  { id: 1042, user: 'Admin User', event: 'vulnerability_scan', severity: 'critical', ip: '127.0.0.1', message: 'SQL Injection payload blocked by WAF middleware', time: '10 mins ago', details: '{"path":"/api/auth/login","payload":"\' OR 1=1--"}' },
  { id: 1041, user: 'John Doe', event: 'suspicious_access', severity: 'critical', ip: '45.33.12.89', message: 'Login attempt from previously unseen foreign IP blocked', time: '1 hour ago', details: '{"location":"Russia","browser":"Tor"}' },
  { id: 1040, user: 'Jane Smith', event: 'document_accessed', severity: 'info', ip: '192.168.1.100', message: 'Read confidential case file "FIR_Report_2026.pdf"', time: '2 hours ago', details: '{"docId":"DOC-772","role":"lawyer"}' },
  { id: 1039, user: 'Admin User', event: 'settings_changed', severity: 'warning', ip: '10.0.0.4', message: 'Disabled global Rate Limiting momentarily', time: '5 hours ago', details: '{"previous":true,"new":false}' },
  { id: 1038, user: 'System', event: 'new_device_login', severity: 'warning', ip: '172.16.0.4', message: 'User logged in via new iPhone 15 Pro device', time: '1 day ago', details: '{"os":"iOS 17","agent":"Safari"}' },
  { id: 1037, user: 'System', event: 'jwt_refresh', severity: 'info', ip: '10.0.0.2', message: 'Rotated JWT for active session', time: '1 day ago', details: '{"token_age":"7d"}' },
];

export default function AuditLogTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filteredLogs = MOCK_LOGS.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20';
      case 'warning': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'critical': return <AlertCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white/40 dark:bg-navy/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy dark:text-white">Immutable Audit Logs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tamper-evident system tracking (Layer 4)</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-navy/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-navy/80 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200/50 dark:border-gray-700/50">
              <th className="p-4 font-semibold">Event / Severity</th>
              <th className="p-4 font-semibold">Message</th>
              <th className="p-4 font-semibold">User / IP</th>
              <th className="p-4 font-semibold">Time</th>
              <th className="p-4 font-semibold">Raw</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredLogs.map((log) => (
              <React.Fragment key={log.id}>
                <tr className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 pt-5 align-top">
                    <div className="flex flex-col gap-2">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityStyles(log.severity)} w-max`}>
                        {getSeverityIcon(log.severity)}
                        {log.severity.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">#{log.id} • {log.event}</span>
                    </div>
                  </td>
                  <td className="p-4 align-top">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.message}</p>
                  </td>
                  <td className="p-4 align-top">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-navy dark:text-saffron">{log.user}</span>
                      <span className="text-xs text-gray-500 font-mono mt-1">{log.ip}</span>
                    </div>
                  </td>
                  <td className="p-4 align-top whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{log.time}</td>
                  <td className="p-4 align-top">
                    <button 
                      onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                      className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-navy dark:hover:text-white transition-colors"
                    >
                      {expandedRow === log.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </td>
                </tr>
                {expandedRow === log.id && (
                  <tr className="bg-gray-50/30 dark:bg-black/20">
                    <td colSpan={5} className="p-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="bg-gray-900 dark:bg-[#0a0f1c] rounded-xl p-4 shadow-inner border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">JSON Metadata Payload</span>
                        </div>
                        <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                          {JSON.stringify(JSON.parse(log.details), null, 2)}
                        </pre>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No immutable logs found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
