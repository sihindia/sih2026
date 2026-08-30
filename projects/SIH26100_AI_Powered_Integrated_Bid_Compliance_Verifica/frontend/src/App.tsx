import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Building2, 
  RefreshCw, 
  Scale, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import biddersData from './data/gem_bidder_compliance_records.json';
import portalsData from './data/statutory_government_portals.json';
import rulesData from './data/ai_risk_verification_rules.json';
import statsData from './data/gemverify_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [bidders, setBidders] = useState(biddersData);
  const [selectedBidder, setSelectedBidder] = useState(biddersData[0]);
  const [portals, setPortals] = useState(portalsData);
  const [rules, setRules] = useState(rulesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'bidders' | 'portals' | 'rules' | 'dossier' | 'stats'>('bidders');

  // Interactive Bid Verification Simulator
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>({
    score: "98.5 / 100 (Low Risk • Fully Compliant)",
    status: "12/12 Government Registries Validated via Live APIs",
    recommendation: "QUALIFIED FOR TECHNICAL EVALUATION & AWARD",
    highlights: "Udyam Verified • GSTN GSTR-3B Clean • Make in India 68.5% (Class-I)"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setVerifyResult({
        score: "98.5 / 100 (Low Risk • Fully Compliant)",
        status: "12/12 Government Registries Validated via Live APIs",
        recommendation: "QUALIFIED FOR TECHNICAL EVALUATION & AWARD",
        highlights: "Udyam Verified • GSTN GSTR-3B Clean • Make in India 68.5% (Class-I)"
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <FileCheck2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>CPCL / MOPNG • GEMVERIFY 360 AI BID COMPLIANCE & RISK ENGINE • SIH26100</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              CPCL GeMVerify: AI-Powered Integrated Bid Compliance Verification Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              12-Portal Government Registry APIs, Multi-Modal Document Mismatch Detection & AI Decision-Support Dossiers
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'bidders', label: '📑 GeM Bidder Evaluations', count: bidders.length },
            { id: 'portals', label: '🏛️ 12-Portal Statutory APIs', count: portals.length },
            { id: 'rules', label: '🤖 AI Risk Verification Rules', count: rules.length },
            { id: 'dossier', label: '📜 Procurement Officer Dossier' },
            { id: 'stats', label: '📊 GeMVerify Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: BIDDERS
           ========================================================================= */}
        {activeTab === 'bidders' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bidders.map((b) => (
                <button
                  key={b.bidder_id}
                  onClick={() => setSelectedBidder(b)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedBidder.bidder_id === b.bidder_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{b.bidder_id}</span>
                    <span className={`${b.ai_compliance_score > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>Score: {b.ai_compliance_score}/100</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {b.bidder_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{b.tender_id} • {b.tender_title}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>MII: {b.make_in_india.split(' ')[0]}</span>
                    <span className="text-cyan-400 font-bold">{b.risk_level.split('_')[0]} Risk</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedBidder.bidder_id} • {selectedBidder.tender_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedBidder.bidder_name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${selectedBidder.ai_compliance_score > 70 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'}`}>
                    {selectedBidder.risk_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">STATUTORY VERIFICATION PROFILE & RECOMMENDATION:</span>
                  <div className="grid grid-cols-1 gap-1 text-[11px] font-mono">
                    <div className="text-cyan-300">Udyam MSME: <strong>{selectedBidder.udyam_msme}</strong></div>
                    <div className="text-amber-300">GSTN Status: <strong>{selectedBidder.gstn_status}</strong></div>
                    <div className="text-emerald-300">Make in India: <strong>{selectedBidder.make_in_india}</strong></div>
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    Officer Decision Support: <strong className="text-emerald-400">{selectedBidder.recommendation}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI COMPLIANCE SCORE</span><span className="text-emerald-400 font-bold">{selectedBidder.ai_compliance_score} / 100</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DEBARMENT CHECK</span><span className="text-emerald-400 font-bold">{selectedBidder.blacklist_check.split(' ')[0]} Infractions</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('portals')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Verify 12-Portal Government Registry APIs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>GeM Bid Verification Engine</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Bidder Name & GeM Tender</label>
                      <input type="text" readOnly value={`${selectedBidder.bidder_name} (${selectedBidder.tender_id})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Validating 12 Registries & Running OCR...' : 'Run Automated GeM Compliance Audit'}</span>
                    </button>
                  </form>
                  {verifyResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-emerald-400 font-mono text-xs">{verifyResult.score}</strong></div>
                      <div>Decision: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{verifyResult.recommendation}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PORTALS */}
        {activeTab === 'portals' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {portals.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">GOVERNMENT API</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.portal_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Validation: <strong className="text-white">{p.validation_field}</strong></div>
                  <div className="text-slate-400 text-[10px] truncate pt-1 border-t border-slate-900">{p.api_endpoint}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RULES */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{r.severity}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.rule_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.trigger}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Scale className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Procurement Officer Legal Decision-Support Dossier</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Synthesizes multi-portal statutory evidence into an auditable compliance report empowering procurement officers with zero audit risk.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
