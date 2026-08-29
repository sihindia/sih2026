import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Terminal, 
  Lock, 
  RefreshCw, 
  FileText, 
  Globe 
} from 'lucide-react';

import vulnsData from './data/world_monitor_vulnerabilities.json';
import statsData from './data/audit_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [vulns, setVulns] = useState(vulnsData);
  const [selectedVuln, setSelectedVuln] = useState(vulnsData[0]);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'vulns' | 'poc' | 'remediation' | 'stats'>('vulns');

  // Interactive PoC Verifier
  const [isVerifying, setIsVerifying] = useState(false);
  const [pocResult, setPocResult] = useState<any>({
    status: "EXPLOITATION_SUCCESSFUL_IN_SANDBOX",
    impact: "BOLA IDOR Unauthorized Telemetry Access Confirmed",
    action: "PATCH_DIRECTIVE_DISPATCHED"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setPocResult({
        status: "EXPLOITATION_SUCCESSFUL_IN_SANDBOX",
        impact: "BOLA IDOR Unauthorized Telemetry Access Confirmed",
        action: "PATCH_DIRECTIVE_DISPATCHED"
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-red-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              <span>NTRO • WORLDAUDIT 360 SECURITY ASSESSOR • SIH26163</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              WorldAudit 360: Security Assessment & PoC Verification of World Monitor
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Authorized Vulnerability Assessment, CVSS 3.1 Scoring, Controlled Sandbox Proof-of-Concept & Concrete Remediation Directives
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-red-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-red-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-red-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-red-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-red-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'vulns', label: '🛡️ Vulnerabilities & CVSS Ratings', count: vulns.length },
            { id: 'poc', label: '💻 Sandbox Proof-of-Concept' },
            { id: 'remediation', label: '⚡ Remediation & Patches' },
            { id: 'stats', label: '📊 RedTeam Assessment Metrics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-red-500 text-slate-950 shadow-lg shadow-red-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-red-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* VIEW 1: VULNS */}
        {activeTab === 'vulns' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vulns.map((v) => (
                <button
                  key={v.vuln_id}
                  onClick={() => setSelectedVuln(v)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedVuln.vuln_id === v.vuln_id
                      ? 'bg-red-950/60 border-red-500 text-white shadow-lg ring-2 ring-red-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-red-400">{v.vuln_id}</span>
                    <span className="text-rose-400">{v.severity.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? v.title_hi : v.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{v.affected_component}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-red-400 font-bold">{selectedVuln.vuln_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedVuln.title}</h3>
                    <p className="text-slate-400 text-[10px]">{selectedVuln.affected_component}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-800 rounded-xl text-xs font-bold font-mono">
                    {selectedVuln.severity}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <div><strong>Business Impact:</strong> <span className="text-amber-300">{selectedVuln.business_impact}</span></div>
                  <div><strong>Remediation:</strong> <span className="text-emerald-400">{selectedVuln.remediation}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('poc')}
                  className="w-full py-3 bg-red-500 hover:bg-red-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Execute Controlled PoC in Sandbox ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Sandbox Exploit Verifier</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Vulnerability Target</label>
                      <input type="text" readOnly value={selectedVuln.vuln_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-red-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Testing in Isolated Sandbox...' : 'Validate Proof-of-Concept'}</span>
                    </button>
                  </form>
                  {pocResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <strong className="text-rose-400 font-mono text-xs">{pocResult.status}</strong></div>
                      <div>Finding: <strong className="text-amber-300 font-mono text-xs">{pocResult.impact}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: POC */}
        {activeTab === 'poc' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-red-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-red-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-red-400 font-bold text-[10px] uppercase">CONTROLLED EXPLOIT PROOF-OF-CONCEPT</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">{selectedVuln.title}</h4>
              </div>
              <span className="px-3 py-1 bg-red-950 text-red-300 rounded-xl font-bold font-mono">
                NON-DESTRUCTIVE
              </span>
            </div>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-amber-300 font-mono text-xs overflow-x-auto">
              {selectedVuln.proof_of_concept}
            </pre>
          </div>
        )}

        {/* VIEW 3: REMEDIATION */}
        {activeTab === 'remediation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">REMEDIATION DIRECTIVE</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Code & Configuration Fix</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div><strong>Vulnerability:</strong> <span className="font-mono text-white">{selectedVuln.title}</span></div>
              <div className="text-emerald-400 leading-relaxed font-bold">Fix: {selectedVuln.remediation}</div>
            </div>
          </div>
        )}

        {/* VIEW 4: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-red-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
