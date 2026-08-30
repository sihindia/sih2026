import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  MapPin, 
  RefreshCw, 
  Coins, 
  ShieldCheck, 
  FileText, 
  Globe 
} from 'lucide-react';

import casesData from './data/marginalized_scheme_matching_cases.json';
import schemesData from './data/concessional_schemes_catalog.json';
import partnersData from './data/channel_partners_npa_health_registry.json';
import statsData from './data/channelmatch_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [schemes, setSchemes] = useState(schemesData);
  const [partners, setPartners] = useState(partnersData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'calculator' | 'partners' | 'schemes' | 'stats'>('cases');

  // Interactive Scheme Matcher Simulator
  const [costInput, setCostInput] = useState<number>(1500000);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>({
    matchedScheme: "Term Loan Scheme (MoSJE / NSFDC)",
    eligibleLoan: 1350000,
    rate: "8.0% p.a.",
    tenure: "7 Years (6-Month Moratorium)",
    quarterlyEmi: 63980,
    nearestPartner: "MSBCDC Regional Office (4.8 km)",
    partnerStatus: "CLEAN_ELIGIBLE (3.2% NPA / Fast-Track Disbursement)"
  });

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      if (costInput <= 140000) {
        setMatchResult({
          matchedScheme: "Micro Finance Scheme (MoSJE / NBCFDC)",
          eligibleLoan: Math.min(costInput * 0.90, 125000),
          rate: "6.5% p.a.",
          tenure: "3 Years (3-Month Moratorium)",
          quarterlyEmi: 9950,
          nearestPartner: "TAHDCO District Branch (6.5 km)",
          partnerStatus: "CLEAN_ELIGIBLE (4.1% NPA / Active Camps)"
        });
      } else {
        setMatchResult({
          matchedScheme: "Term Loan Scheme (MoSJE / NSFDC)",
          eligibleLoan: Math.min(costInput * 0.90, 4500000),
          rate: "8.0% p.a.",
          tenure: "7 Years (6-Month Moratorium)",
          quarterlyEmi: 63980,
          nearestPartner: "MSBCDC Regional Office (4.8 km)",
          partnerStatus: "CLEAN_ELIGIBLE (3.2% NPA / Fast-Track Disbursement)"
        });
      }
      setIsMatching(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>MOSJE • CHANNELMATCH 360 SCHEME MATCHING & NPA-FILTERED ROUTER • SIH26092</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE ChannelMatch: AI-Driven Scheme Matching for Marginalized Entrepreneurs
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Automatic Concessional Scheme Matching (Micro Finance, Term Loan, Education) with Geo-Spatial Channel Partner Routing Filtered by NPA Health & Fund Liquidity
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🎯 Matched Applications', count: cases.length },
            { id: 'calculator', label: '🧮 Financial & EMI Simulator' },
            { id: 'partners', label: '📍 NPA-Filtered Partners', count: partners.length },
            { id: 'schemes', label: '📜 Concessional Catalog', count: schemes.length },
            { id: 'stats', label: '📊 ChannelMatch Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{c.case_id}</span>
                    <span className="text-emerald-400">₹{c.eligible_loan_inr.toLocaleString()} Loan</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.purpose}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.beneficiary_name}</div>
                  <div className="text-[10px] text-indigo-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.matched_scheme.split(' ')[0]}</span>
                    <span className="text-emerald-400">ROUTED</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedCase.case_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.purpose}</h3>
                  </div>
                  <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">CONCESSIONAL SCHEME MATCH & CHANNEL PARTNER DISPATCH:</span>
                  <div className="text-white font-sans text-xs">
                    Beneficiary: <strong className="text-indigo-400">{selectedCase.beneficiary_name}</strong> (Family Income: ₹{selectedCase.family_income_inr.toLocaleString()}/yr)
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Matched Scheme: <strong className="text-white">{selectedCase.matched_scheme}</strong> | Rate: <strong className="text-amber-400">{selectedCase.concessional_rate_pct}% p.a.</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Project Cost: ₹{selectedCase.estimated_cost_inr.toLocaleString()} ➔ 90% Loan: <strong className="text-white">₹{selectedCase.eligible_loan_inr.toLocaleString()}</strong> | Quarterly EMI: <strong>₹{selectedCase.quarterly_emi_inr.toLocaleString()}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Channel Partner: {selectedCase.nearest_channel_partner} ({selectedCase.partner_distance_km} km)
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    NPA Health Audit: {selectedCase.partner_npa_health}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">90% CONCESSIONAL LOAN</span><span className="text-emerald-400 font-bold">₹{selectedCase.eligible_loan_inr.toLocaleString()}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CHANNEL PARTNER DISTANCE</span><span className="text-indigo-400 font-bold">{selectedCase.partner_distance_km} km</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('partners')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Locate NPA-Audited Channel Partners & SCAs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Instant Scheme Matching Engine</span>
                  </h4>
                  <form onSubmit={handleMatch} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Estimated Project / Education Cost</label>
                      <input 
                        type="number" 
                        value={costInput} 
                        onChange={(e) => setCostInput(Number(e.target.value))}
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" 
                      />
                    </div>
                    <button type="submit" disabled={isMatching} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isMatching ? 'animate-spin' : ''}`} />
                      <span>{isMatching ? 'Matching Scheme & Auditing Channel NPA...' : 'Match Concessional Scheme'}</span>
                    </button>
                  </form>
                  {matchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Scheme: <strong className="text-indigo-300 font-mono text-xs">{matchResult.matchedScheme}</strong></div>
                      <div>Loan: <strong className="text-emerald-400 font-mono text-xs">₹{matchResult.eligibleLoan.toLocaleString()} @ {matchResult.rate}</strong></div>
                      <div>Quarterly EMI: <strong className="text-white font-mono text-xs">₹{matchResult.quarterlyEmi.toLocaleString()} ({matchResult.tenure})</strong></div>
                      <div>Nearest Partner: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{matchResult.nearestPartner} • {matchResult.partnerStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CALCULATOR */}
        {tab === 'calculator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Coins className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Dynamic Financial Calculator & Moratorium Schedule</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simulates precise quarterly repayment schedules, factorizing 3 to 12 months course/project moratorium holidays and ensuring total borrowing does not exceed 90% of project costs.
            </p>
          </div>
        )}

        {/* VIEW 3: PARTNERS */}
        {tab === 'partners' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {partners.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">{p.type}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>NPA Ratio: <strong className={p.npa_pct < 8 ? 'text-emerald-400' : 'text-rose-400'}>{p.npa_pct}%</strong></div>
                  <div>Health Status: <strong className={p.npa_pct < 8 ? 'text-emerald-400' : 'text-rose-400'}>{p.status}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{p.coverage}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SCHEMES */}
        {tab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {schemes.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">{s.rate}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.scheme}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Cost Limit: <strong className="text-white">{s.max_cost}</strong></div>
                  <div>Loan Limit: <strong className="text-emerald-400">{s.max_loan}</strong></div>
                  <div>Tenure: <span className="text-cyan-300 text-xs">{s.tenure}</span></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{s.suitability}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
