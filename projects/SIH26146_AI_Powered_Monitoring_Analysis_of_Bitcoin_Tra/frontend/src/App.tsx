import React, { useState } from 'react';
import { 
  Coins, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Network, 
  Share2, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/bitcoin_illicit_entity_clusters.json';
import nodesData from './data/p2p_network_relay_nodes.json';
import featuresData from './data/blockchain_graph_features.json';
import statsData from './data/chaintrace_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [nodes, setNodes] = useState(nodesData);
  const [features, setFeatures] = useState(featuresData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'nodes' | 'graph' | 'shap' | 'stats'>('cases');

  // Interactive Bitcoin Transaction Tracing Simulator
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<any>({
    entity: "ALPHV / BlackCat Ransomware Syndicate",
    confidence: "98.7% GNN Entity Match",
    p2pIngress: "194.26.29.112 (Sofia, Bulgaria AS48712)",
    peeling: "14 Hops De-Anonymized ➔ Wasabi CoinJoin Mixer",
    fiuAction: "FIU-IND Red Notice & Exchange Freeze Warrant Dispatched"
  });

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracing(true);
    setTimeout(() => {
      setTraceResult({
        entity: "ALPHV / BlackCat Ransomware Syndicate",
        confidence: "98.7% GNN Entity Match",
        p2pIngress: "194.26.29.112 (Sofia, Bulgaria AS48712)",
        peeling: "14 Hops De-Anonymized ➔ Wasabi CoinJoin Mixer",
        fiuAction: "FIU-IND Red Notice & Exchange Freeze Warrant Dispatched"
      });
      setIsTracing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Coins className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>NTRO • CHAINTRACE 360 BITCOIN P2P & BLOCKCHAIN INTELLIGENCE • SIH26146</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO ChainTrace: AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              P2P Network Ingress Timestamps, GNN Multi-Input Entity Clustering & Explainable FIU Forfeiture Dossiers
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
            { id: 'cases', label: '🪙 Bitcoin Illicit Entity Cases', count: cases.length },
            { id: 'nodes', label: '🌐 P2P Relay Broadcasters', count: nodes.length },
            { id: 'graph', label: '🕸️ GNN Entity Clustering' },
            { id: 'shap', label: '🔍 Explainable SHAP Attribution', count: features.length },
            { id: 'stats', label: '📊 NTRO ChainTrace Telemetry' }
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
                    <span className="text-rose-400">{c.amount_btc} BTC ({c.fiat_value_inr})</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.threat_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.entity_cluster}</div>
                  <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Hops: {c.peeling_chain_hops}</span>
                    <span>GNN: {c.gnn_confidence_pct}% Match</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedCase.case_id} • TXID {selectedCase.txid.slice(0, 16)}...</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.threat_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">ATTRIBUTED ENTITY CLUSTER & LAUNDERING PATH:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedCase.entity_cluster} ({selectedCase.amount_btc} BTC / {selectedCase.fiat_value_inr})</div>
                  <div className="text-amber-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    P2P Ingress IP: <strong>{selectedCase.p2p_ingress_ip}</strong> • Mixer: <strong>{selectedCase.mixer_used}</strong> • Exit: <strong>{selectedCase.exit_vasp}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PEELING CHAIN HOPS</span><span className="text-orange-400 font-bold">{selectedCase.peeling_chain_hops} Hops De-Anonymized</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">GNN CLUSTER CONFIDENCE</span><span className="text-emerald-400 font-bold">{selectedCase.gnn_confidence_pct}% Verified</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('graph')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View Multi-Input UTXO Entity Graph ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Blockchain Graph Trace</span>
                  </h4>
                  <form onSubmit={handleTrace} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Bitcoin TXID / Wallet</label>
                      <input type="text" readOnly value={`${selectedCase.txid.slice(0, 24)}... (${selectedCase.amount_btc} BTC)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isTracing} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTracing ? 'animate-spin' : ''}`} />
                      <span>{isTracing ? 'Clustering UTXO Co-Spends...' : 'Trace Laundering Entity'}</span>
                    </button>
                  </form>
                  {traceResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Entity: <strong className="text-rose-400 font-mono text-xs">{traceResult.entity}</strong></div>
                      <div>Confidence: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{traceResult.confidence}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: NODES */}
        {activeTab === 'nodes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {nodes.map((n, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">{n.node_ip}</span>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>ASN: <strong className="text-white">{n.asn}</strong></div>
                  <div>Peers Connected: <strong className="text-emerald-400">{n.peer_count}</strong></div>
                  <div>Broadcast Offset: <strong className="text-cyan-400">{n.first_tx_broadcast_ms}</strong></div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900 font-bold">{n.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: GRAPH */}
        {activeTab === 'graph' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-orange-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-orange-400 font-bold text-[10px] uppercase">GRAPH NEURAL NETWORK MULTI-INPUT ENTITY CLUSTERING</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">UTXO Common Spending & Peeling Chain De-Anonymization</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">14 Hops Resolved</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div>Fuses Bitcoin P2P message broadcast timestamps with on-chain common-spending heuristics to de-anonymize Wasabi CoinJoin mixers and trace stolen funds to KYC exit VASPs.</div>
              <div className="text-orange-400 font-bold pt-2 border-t border-slate-900">
                Generates court-admissible asset forfeiture dossiers for FIU-IND and national cybercrime agencies.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SHAP */}
        {activeTab === 'shap' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {features.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">SHAP WEIGHT: {f.importance_score}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.feature_name}</h4>
                <p className="text-slate-300 text-xs font-sans">{f.description}</p>
              </div>
            ))}
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
