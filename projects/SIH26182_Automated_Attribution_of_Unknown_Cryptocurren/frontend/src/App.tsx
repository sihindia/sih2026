import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GitMerge, 
  RefreshCw, 
  Building2, 
  FileText, 
  ShieldAlert, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Globe 
} from 'lucide-react';

import walletsData from './data/suspect_crypto_wallets.json';
import trailsData from './data/multi_chain_hop_trails.json';
import vaspData from './data/vasp_exchange_clusters.json';
import noticesData from './data/sahyog_notices.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta'>('hi');
  const [wallets, setWallets] = useState(walletsData);
  const [selectedWallet, setSelectedWallet] = useState(walletsData[0]);
  const [trails, setTrails] = useState(trailsData);
  const [vasps, setVasps] = useState(vaspData);
  const [notices, setNotices] = useState(noticesData);
  const [activeTab, setActiveTab] = useState<'attribution' | 'graph' | 'vasp' | 'sahyog' | 'command'>('attribution');

  // Forensic Scanner State
  const [inputWallet, setInputWallet] = useState("TX91aZ8kL019284jkm918234812349182");
  const [inputChain, setInputChain] = useState("TRON (TRC-20)");
  const [isTracing, setIsTracing] = useState(false);
  const [attributionResult, setAttributionResult] = useState<any>({
    nearestVasp: "Binance Central Deposit Hot Wallet #BN-4091",
    confidence: 97.8,
    hops: 2,
    risk: 98.4,
    action: "ISSUE_SAHYOG_SECTION_91_FREEZE_NOTICE"
  });

  const handleTraceWallet = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracing(true);
    setTimeout(() => {
      setAttributionResult({
        nearestVasp: "Binance Central Deposit Hot Wallet #BN-4091",
        confidence: 97.8,
        hops: 2,
        risk: 98.4,
        action: "ISSUE_SAHYOG_SECTION_91_FREEZE_NOTICE"
      });
      setIsTracing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Lock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MHA • I4C • CRYPTOATTRIBUTOR 360 BLOCKCHAIN VASP ATTRIBUTION • SIH26182</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              CryptoAttributor 360: Automated VASP Attribution & Multi-Chain Forensic Engine
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Multi-Chain Transaction Graph Tracing (BTC, ETH, TRON, SOL), Nearest VASP Identification & SAHYOG Section 91 CrPC Freeze Notices
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'attribution', label: '🔍 Suspect Wallet Forensics', count: wallets.length },
            { id: 'graph', label: '🕸️ Multi-Chain Hop Graph', count: trails.length },
            { id: 'vasp', label: '🏢 Registered VASP Directory', count: vasps.length },
            { id: 'sahyog', label: '📜 SAHYOG Digital Freeze Notices', count: notices.length },
            { id: 'command', label: '📊 I4C National Crypto Hub' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: SUSPECT WALLET FORENSICS & VASP ATTRIBUTOR
           ========================================================================= */}
        {activeTab === 'attribution' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {wallets.map((w) => (
                <button
                  key={w.wallet_id}
                  onClick={() => setSelectedWallet(w)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedWallet.wallet_id === w.wallet_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{w.wallet_id}</span>
                    <span className="text-emerald-400">{w.attribution_confidence_pct}% Match</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? w.crime_category_hi : w.crime_category}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Siphoned: ${(w.siphoned_value_usd).toLocaleString()} USD</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{w.blockchain_network.split(' ')[0]}</span>
                    <span>{w.hops_to_vasp} Hops</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Forensic Scan & AI VASP Attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Suspect Wallet Dossier */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedWallet.wallet_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedWallet.crime_category}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedWallet.blockchain_network}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    Risk: {selectedWallet.risk_score}/100
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 break-all">
                  <span className="text-slate-500 block text-[9px] mb-1 uppercase font-bold">SUSPECT UNHOSTED WALLET ADDRESS</span>
                  <span className="text-amber-400 font-bold">{selectedWallet.suspect_wallet_address}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">SIPHONED VALUE</span>
                    <span className="text-base font-black text-amber-400 mt-1 block">${(selectedWallet.siphoned_value_usd / 1000).toFixed(0)}k USD</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">VASP CONFIDENCE</span>
                    <span className="text-base font-black text-emerald-400 mt-1 block">{selectedWallet.attribution_confidence_pct}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">GRAPH HOPS</span>
                    <span className="text-base font-black text-cyan-400 mt-1 block">{selectedWallet.hops_to_vasp} Hops</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div>Attributed Nearest VASP: <strong className="text-white font-sans">{selectedWallet.attributed_nearest_vasp}</strong></div>
                  <div className="text-emerald-400 pt-1 border-t border-slate-900">
                    SAHYOG Status: <strong>{selectedWallet.sahyog_freeze_status}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('sahyog')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Dispatch Section 91 CrPC Freeze Notice via SAHYOG ➔</span>
                </button>
              </div>

              {/* Right 5: Multi-Chain Forensic Tracing Engine */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Automated VASP Attribution Engine</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      GRAPH AI API
                    </span>
                  </div>

                  <form onSubmit={handleTraceWallet} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Suspect Wallet Address</label>
                      <input type="text" required value={inputWallet} onChange={(e) => setInputWallet(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400 break-all" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Blockchain Network</label>
                      <input type="text" required value={inputChain} onChange={(e) => setInputChain(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>

                    <button type="submit" disabled={isTracing} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTracing ? 'animate-spin' : ''}`} />
                      <span>{isTracing ? 'Searching Multi-Hop Graph...' : 'Trace & Attribute Nearest VASP'}</span>
                    </button>
                  </form>

                  {attributionResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Nearest VASP:</span><strong className="text-white font-mono text-[11px]">{attributionResult.nearestVasp}</strong></div>
                      <div className="flex justify-between"><span>Confidence:</span><strong className="text-emerald-400 font-mono">{attributionResult.confidence}%</strong></div>
                      <div className="flex justify-between"><span>Hops Traversed:</span><strong className="text-cyan-300 font-mono">{attributionResult.hops} Hops</strong></div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: MULTI-CHAIN HOP GRAPH
           ========================================================================= */}
        {activeTab === 'graph' && (
          <div className="space-y-6 font-mono text-xs">
            {trails.map((t) => (
              <div key={t.trail_id} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 shadow-2xl">
                <div className="border-b border-amber-500/40 pb-3">
                  <span className="text-amber-400 font-bold text-[10px] uppercase">MULTI-CHAIN TRANSACTION PATH DISCOVERY</span>
                  <h4 className="text-lg font-black text-white font-sans mt-0.5">Automated Multi-Hop Peeling Trail</h4>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                  <div>Suspect Origin: <strong className="text-amber-400">{t.suspect_origin}</strong></div>
                  <div>Hop 1 Intermediary: <strong className="text-cyan-300">{t.hop_1}</strong></div>
                  <div>Terminal VASP Kiosk: <strong className="text-emerald-400">{t.hop_2_terminal_vasp}</strong></div>
                  <div className="text-slate-300 pt-1 border-t border-slate-900 font-sans">
                    <strong>Beneficial Identity:</strong> {t.terminal_kyc_holder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 3: REGISTERED VASP DIRECTORY
           ========================================================================= */}
        {activeTab === 'vasp' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vasps.map((v, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{v.vasp_name}</h4>
                  <div className="p-2.5 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div>Nodal Email: <span className="text-cyan-300">{v.designated_nodal_officer}</span></div>
                    <div>Freeze Turnaround: <strong className="text-emerald-400">{v.avg_freeze_turnaround_hours} Hours</strong></div>
                  </div>
                  <div className="text-slate-400 text-[10px]">Chains: {v.supported_chains}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SAHYOG DIGITAL FREEZE NOTICES
           ========================================================================= */}
        {activeTab === 'sahyog' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-amber-500/40 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">SAHYOG PORTAL STATUTORY DISCLOSURE NOTICE</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Section 91 CrPC / Section 94 BNSS Legal Freeze Directive</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span>Notice Reference:</span><strong className="text-amber-400">SAHYOG-SEC91-2026-891</strong></div>
              <div className="flex justify-between"><span>Target VASP:</span><strong className="text-white font-sans">Binance Global (Compliance Desk)</strong></div>
              <div className="flex justify-between"><span>Frozen Value:</span><strong className="text-emerald-400 font-sans text-sm">$185,000 USDT (₹1.55 Cr)</strong></div>
              <div className="text-emerald-400 pt-1 border-t border-slate-900 font-bold">Mandate: Section 91 CrPC / Section 94 Bharatiya Nagarik Suraksha Sanhita 2023</div>
            </div>

            <button onClick={() => alert("Digital Section 91 Notice Dispatched to Binance VASP Compliance Desk.")} className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
              Dispatch Digital Notice via SAHYOG API ➔
            </button>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">ATTRIBUTED WALLETS</span><span className="text-2xl font-black text-white mt-1 block">412 Addresses</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">FROZEN CRYPTO VALUE</span><span className="text-2xl font-black text-emerald-400 mt-1 block">₹34.80 Cr</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">AVG ATTRIBUTION SPEED</span><span className="text-2xl font-black text-cyan-400 mt-1 block">4.2 Seconds</span></div>
          </div>
        )}

      </div>
    </div>
  );
}
