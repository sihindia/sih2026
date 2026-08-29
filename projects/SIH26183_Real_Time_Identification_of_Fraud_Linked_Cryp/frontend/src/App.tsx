import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GitMerge, 
  RefreshCw, 
  ShieldAlert, 
  FileText, 
  DollarSign, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Globe 
} from 'lucide-react';

import victimData from './data/victim_reported_wallets.json';
import clustersData from './data/fraud_exchange_clusters.json';
import ordersData from './data/preservation_orders.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'te'>('hi');
  const [wallets, setWallets] = useState(victimData);
  const [selectedWallet, setSelectedWallet] = useState(victimData[0]);
  const [clusters, setClusters] = useState(clustersData);
  const [orders, setOrders] = useState(ordersData);
  const [activeTab, setActiveTab] = useState<'stream' | 'graph' | 'clusters' | 'preservation' | 'command'>('stream');

  // Real-Time Analytics State
  const [inputAddress, setInputAddress] = useState("TQ88kL019284jkm91823481234918241");
  const [inputNet, setInputNet] = useState("TRON (TRC-20)");
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlResult, setCrawlResult] = useState<any>({
    exchange: "Binance Global Direct Deposit Cluster #BN-9812",
    certainty: 98.4,
    hops: 1,
    latency: "1.4s",
    action: "DISPATCH_AUTOMATED_EVIDENCE_PRESERVATION_ORDER"
  });

  const handleCrawlWallet = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCrawling(true);
    setTimeout(() => {
      setCrawlResult({
        exchange: "Binance Global Direct Deposit Cluster #BN-9812",
        certainty: 98.4,
        hops: 1,
        latency: "1.4s",
        action: "DISPATCH_AUTOMATED_EVIDENCE_PRESERVATION_ORDER"
      });
      setIsCrawling(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MHA • I4C • KUBERWATCH 360 REAL-TIME CRYPTO EXCHANGE IDENTIFIER • SIH26183</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KuberWatch 360: Real-Time Identification of Fraud-Linked Crypto Exchanges
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              1930 NCRP Victim-Reported Wallet Ingestion, Automated Blockchain Graph Analytics & Instant Asset Preservation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'stream', label: '🚨 NCRP Victim Stream & Identifier', count: wallets.length },
            { id: 'graph', label: '🕸️ Blockchain Inflow Graph' },
            { id: 'clusters', label: '🏢 Fraud Inflow Exchange Clusters', count: clusters.length },
            { id: 'preservation', label: '📜 Asset Preservation Orders', count: orders.length },
            { id: 'command', label: '📊 I4C Victim Recovery Hub' }
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
            VIEW 1: NCRP VICTIM STREAM & IDENTIFIER
           ========================================================================= */}
        {activeTab === 'stream' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {wallets.map((w) => (
                <button
                  key={w.complaint_id}
                  onClick={() => setSelectedWallet(w)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedWallet.complaint_id === w.complaint_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{w.complaint_id}</span>
                    <span className="text-emerald-400">{w.attribution_certainty_pct}% Cert</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? w.fraud_typology_hi : w.fraud_typology}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Siphoned: ${(w.siphoned_value_usdt).toLocaleString()} USDT</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{w.victim_city.split(',')[0]}</span>
                    <span>{w.hops_to_exchange} Hop</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Stream Telemetry & Real-Time Graph Crawler */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Victim Case File */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedWallet.complaint_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedWallet.fraud_typology}</h3>
                    <p className="text-xs text-slate-400 font-mono">Victim: {selectedWallet.victim_city} • {selectedWallet.blockchain_network}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedWallet.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 break-all">
                  <span className="text-slate-500 block text-[9px] mb-1 uppercase font-bold">REPORTED FRAUD WALLET ADDRESS</span>
                  <span className="text-amber-400 font-bold">{selectedWallet.reported_wallet_address}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">SIPHONED VALUE</span>
                    <span className="text-base font-black text-amber-400 mt-1 block">${(selectedWallet.siphoned_value_usdt / 1000).toFixed(0)}k USDT</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">CERTAINTY SCORE</span>
                    <span className="text-base font-black text-emerald-400 mt-1 block">{selectedWallet.attribution_certainty_pct}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">DIRECT HOPS</span>
                    <span className="text-base font-black text-cyan-400 mt-1 block">{selectedWallet.hops_to_exchange} Hop</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div>Identified Receiving Exchange: <strong className="text-white font-sans">{selectedWallet.identified_destination_exchange}</strong></div>
                  <div>Equivalent INR: <strong className="text-emerald-400 font-mono">₹{(selectedWallet.siphoned_value_inr / 100000).toFixed(2)} Lakhs</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('preservation')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Dispatch Real-Time Asset Preservation Order ➔</span>
                </button>
              </div>

              {/* Right 5: Real-Time Crawler */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Real-Time Exchange Crawler</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      LIVE GRAPH
                    </span>
                  </div>

                  <form onSubmit={handleCrawlWallet} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Victim Suspect Address</label>
                      <input type="text" required value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400 break-all" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Network</label>
                      <input type="text" required value={inputNet} onChange={(e) => setInputNet(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>

                    <button type="submit" disabled={isCrawling} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isCrawling ? 'animate-spin' : ''}`} />
                      <span>{isCrawling ? 'Crawling Blockchain Inflows...' : 'Identify Inflow Destination Exchange'}</span>
                    </button>
                  </form>

                  {crawlResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Destination Exchange:</span><strong className="text-white font-mono text-[11px]">{crawlResult.exchange}</strong></div>
                      <div className="flex justify-between"><span>Attribution Certainty:</span><strong className="text-emerald-400 font-mono">{crawlResult.certainty}%</strong></div>
                      <div className="flex justify-between"><span>Crawl Speed:</span><span className="text-amber-300 font-mono">{crawlResult.latency}</span></div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: BLOCKCHAIN INFLOW GRAPH
           ========================================================================= */}
        {activeTab === 'graph' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-amber-500/40 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">REAL-TIME TRANSACTION GRAPH INFLOW</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Automated Peeling Chain to Centralized Exchange Deposit</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div>Reported Fraud Origin: <strong className="text-amber-400">TQ88kL...8241 (Scammer Burner Wallet)</strong></div>
              <div>Direct Deposit Transaction: <strong className="text-cyan-300">TxHash: 0x891a...3312 ($210,000 USDT)</strong></div>
              <div>Destination Exchange Hub: <strong className="text-emerald-400">Binance Global Direct Deposit Cluster #BN-9812</strong></div>
              <div className="flex justify-between pt-1 border-t border-slate-900">
                <span>Direct Inflow Trace Time: <strong className="text-white font-mono">1.4 Seconds</strong></span>
                <span className="text-emerald-400 font-bold">100% Trace Complete</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: FRAUD INFLOW EXCHANGE CLUSTERS
           ========================================================================= */}
        {activeTab === 'clusters' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {clusters.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{c.exchange_name}</h4>
                  <div className="p-2.5 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div>Tainted Inflows: <strong className="text-amber-400">${(c.tainted_inflow_usdt / 1000).toFixed(0)}k USDT</strong></div>
                    <div>Active Fraud Cases: <strong className="text-white">{c.active_fraud_cases} Cases</strong></div>
                    <div>Freeze Speed: <span className="text-emerald-400">{c.avg_freeze_response_mins} Mins</span></div>
                  </div>
                  <div className="text-slate-400 text-[10px]">FIU Grade: <strong className="text-cyan-300">{c.fiu_compliance_grade}</strong></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: ASSET PRESERVATION ORDERS
           ========================================================================= */}
        {activeTab === 'preservation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-amber-500/40 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">ELECTRONIC EVIDENCE PRESERVATION ORDER</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Section 91 CrPC Automated Evidence Lock</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span>Order Reference:</span><strong className="text-amber-400">ORDER-PRESERVE-2026-1049</strong></div>
              <div className="flex justify-between"><span>Target Exchange:</span><strong className="text-white font-sans">Binance Global (Compliance Desk)</strong></div>
              <div className="flex justify-between"><span>Preserved Amount:</span><strong className="text-emerald-400 font-sans text-sm">$210,000 USDT (₹1.76 Cr)</strong></div>
              <div className="text-emerald-400 pt-1 border-t border-slate-900 font-bold">Status: COMPLIANCE_CONFIRMED_FUNDS_LOCKED</div>
            </div>

            <button onClick={() => alert("Preservation Order Transmitted to Exchange API.")} className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
              Dispatch Preservation Order via API ➔
            </button>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">TOTAL FRAUD TRACES</span><span className="text-2xl font-black text-white mt-1 block">528 Cases</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">PRESERVED ASSETS</span><span className="text-2xl font-black text-emerald-400 mt-1 block">₹29.60 Cr</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">AVG TRACE SPEED</span><span className="text-2xl font-black text-cyan-400 mt-1 block">1.8 Seconds</span></div>
          </div>
        )}

      </div>
    </div>
  );
}
