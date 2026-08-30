import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Compass, 
  RefreshCw, 
  FileText, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/email_threat_forensic_cases.json';
import relaysData from './data/smtp_relay_trace_nodes.json';
import clustersData from './data/threat_actor_attribution_clusters.json';
import statsData from './data/mailforensics_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [relays, setRelays] = useState(relaysData);
  const [clusters, setClusters] = useState(clustersData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'relays' | 'clusters' | 'dossier' | 'stats'>('cases');

  // Interactive Email Header Forensics Simulator
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [forensicResult, setForensicResult] = useState<any>({
    threat: "97.8 / 100 (Critical BEC Phishing / Executive Spoof)",
    origin: "185.220.101.42 (TOR Exit Node, Frankfurt, Germany - AS200651)",
    auth: "SPF: FAIL • DKIM: NONE • DMARC: REJECT_VIOLATION",
    action: "Email Quarantined • Section 65B Forensic Evidence Dossier Generated"
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setForensicResult({
        threat: "97.8 / 100 (Critical BEC Phishing / Executive Spoof)",
        origin: "185.220.101.42 (TOR Exit Node, Frankfurt, Germany - AS200651)",
        auth: "SPF: FAIL • DKIM: NONE • DMARC: REJECT_VIOLATION",
        action: "Email Quarantined • Section 65B Forensic Evidence Dossier Generated"
      });
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Mail className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>AICTE • MAILFORENSICS 360 AI EMAIL THREAT DETECTION & FORENSICS • SIH26106</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AICTE MailForensics: AI-Powered Email Threat Detection & GeoLocation Intelligence
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              RFC 5322 Deep Header Forensics, Origin IP Geolocation Tracing & Section 65B Indian Evidence Act Dossiers
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '📧 Email Threat Cases', count: cases.length },
            { id: 'relays', label: '🛰️ SMTP Relay Trace Nodes', count: relays.length },
            { id: 'clusters', label: '🕸️ Threat Actor Clusters', count: clusters.length },
            { id: 'dossier', label: '📜 Section 65B Evidence Dossier' },
            { id: 'stats', label: '📊 MailForensics Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{c.case_id}</span>
                    <span className="text-rose-400">Score: {c.threat_score}/100</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.subject}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">From: {c.sender}</div>
                  <div className="text-[10px] text-orange-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>IP: {c.originating_ip.split(' ')[0]}</span>
                    <span className="text-emerald-400">{c.status}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedCase.case_id} • {selectedCase.sender}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.subject}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.risk_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">ORIGIN GEOLOCATION & HEADER FORENSICS:</span>
                  <div className="text-white font-sans text-xs font-bold">Origin Node: {selectedCase.originating_ip} ({selectedCase.geolocation})</div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Authentication: <strong>{selectedCase.auth_status}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">THREAT ACTOR IP</span><span className="text-orange-400 font-bold">{selectedCase.originating_ip.split(' ')[0]}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI THREAT SCORE</span><span className="text-rose-400 font-bold">{selectedCase.threat_score} / 100</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('relays')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Reconstruct Multi-Hop SMTP Relay Chains ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Raw RFC 5322 Header Inspector</span>
                  </h4>
                  <form onSubmit={handleAnalyze} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Sender Address & Subject</label>
                      <input type="text" readOnly value={`${selectedCase.sender.slice(0, 45)}...`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isAnalyzing} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span>{isAnalyzing ? 'Tracing BGP ASN & Validating DKIM/SPF...' : 'Execute Deep Header Forensic Audit'}</span>
                    </button>
                  </form>
                  {forensicResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-rose-400 font-mono text-xs">{forensicResult.threat}</strong></div>
                      <div>Origin: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{forensicResult.origin}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RELAYS */}
        {activeTab === 'relays' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {relays.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">HOP #{r.hop_no}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.mta_host}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>IP Address: <strong className="text-cyan-400">{r.ip}</strong></div>
                  <div>Location: <strong className="text-white">{r.location}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Delay: {r.delay_ms} ms</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CLUSTERS */}
        {activeTab === 'clusters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {clusters.map((cl, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{cl.cluster_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{cl.threat_actor}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Target Sectors: <strong className="text-white">{cl.target_sectors}</strong></div>
                  <div className="text-amber-400 text-[11px] pt-1 border-t border-slate-900">{cl.linked_domains} Linked Phishing Domains</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Section 65B Indian Evidence Act Forensic Dossier</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Generates cryptographic SHA-256 evidence bags, mail routing trees, and WHOIS attribution certificates ready for immediate submission to I4C / LEA cybercrime cells.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-orange-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
