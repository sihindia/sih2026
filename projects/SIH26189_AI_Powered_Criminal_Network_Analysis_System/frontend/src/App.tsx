import React, { useState } from 'react';
import { 
  GitMerge, 
  Phone, 
  DollarSign, 
  MapPin, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Sliders, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import entitiesData from './data/criminal_entities.json';
import linksData from './data/network_links.json';
import cdrData from './data/cdr_records.json';
import hawalaData from './data/hawala_trails.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'pa'>('hi');
  const [entities, setEntities] = useState(entitiesData);
  const [selectedEntity, setSelectedEntity] = useState(entitiesData[0]);
  const [links, setLinks] = useState(linksData);
  const [cdrs, setCdrs] = useState(cdrData);
  const [hawala, setHawala] = useState(hawalaData);
  const [activeTab, setActiveTab] = useState<'graph' | 'cdr' | 'hawala' | 'colocation' | 'dossier'>('graph');

  // Centrality Analyzer State
  const [minWeight, setMinWeight] = useState(0.1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [centralityResult, setCentralityResult] = useState<any>({
    kingpin: "Vikramaditya 'Vikky' Singhania",
    betweenness: 0.942,
    pagerank: 0.885,
    recommendation: "ISSUE INTERPOL RED NOTICE & ATTACH PROCEEDS UNDER PMLA SECTION 5"
  });

  const handleAnalyzeGraph = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setCentralityResult({
        kingpin: "Vikramaditya 'Vikky' Singhania",
        betweenness: 0.942,
        pagerank: 0.885,
        recommendation: "ISSUE INTERPOL RED NOTICE & ATTACH PROCEEDS UNDER PMLA SECTION 5"
      });
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <GitMerge className="w-4 h-4 text-purple-400 animate-spin" />
              <span>MHA • NCRB • CHANAKYAGRAPH 360 AI CRIMINAL NETWORK ANALYZER • SIH26189</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ChanakyaGraph 360: AI Criminal Network & Hawala Flow Analyzer
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Knowledge Graph Centrality Analytics, Call Detail Records (CDR) Matrix, Hawala Money Layering & Section 65B Dossiers
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'graph', label: '🕸️ Knowledge Graph & Centrality', count: entities.length },
            { id: 'cdr', label: '📞 CDR Communication Matrix', count: cdrs.length },
            { id: 'hawala', label: '💸 Hawala Money Trail', count: hawala.length },
            { id: 'colocation', label: '📍 Cell Tower Co-Location' },
            { id: 'dossier', label: '📑 Section 65B Court Dossier' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: KNOWLEDGE GRAPH & CENTRALITY
           ========================================================================= */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {entities.map((ent) => (
                <button
                  key={ent.entity_id}
                  onClick={() => setSelectedEntity(ent)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedEntity.entity_id === ent.entity_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{ent.entity_id}</span>
                    <span className="text-rose-400">BC: {ent.betweenness_centrality}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {ent.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{lang === 'hi' ? ent.role_hi : ent.role}</div>
                  <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{ent.degree_connections} Links</span>
                    <span>{ent.location.split('/')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Node Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Entity Deep-Dive */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-purple-400">{selectedEntity.entity_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedEntity.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedEntity.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedEntity.threat_level}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                    <span className="text-slate-500 block text-[9px]">BETWEENNESS CENTRALITY</span>
                    <span className="text-xl font-black text-purple-400 mt-1 block">{selectedEntity.betweenness_centrality}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">PAGERANK SCORE</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedEntity.pagerank_score}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">DIRECT GRAPH DEGREE</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">{selectedEntity.degree_connections} Links</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <span className="text-purple-400 font-bold text-[10px] uppercase block">Linked FIRs & Investigation Records:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntity.linked_firs.map((f: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-purple-950/80 border border-purple-800 rounded-xl text-purple-300 text-xs font-bold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('hawala')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Trace Hawala Money Trails ➔</span>
                </button>
              </div>

              {/* Right 5: AI Kingpin Identification Verdict */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>AI Kingpin Centrality Engine</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      LOUVAIN OPTIMIZED
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                    <div>Identified Cartel Kingpin: <strong className="text-purple-400 font-mono">{centralityResult.kingpin}</strong></div>
                    <div>Betweenness Centrality: <strong className="text-white font-mono">{centralityResult.betweenness}</strong></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900">
                      <strong>Directive:</strong> {centralityResult.recommendation}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: CDR COMMUNICATION MATRIX
           ========================================================================= */}
        {activeTab === 'cdr' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {cdrs.map((c) => (
                <div key={c.call_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-purple-400 font-bold text-[10px]">{c.call_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{c.caller_name} ➔ {c.receiver_name}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-950 text-purple-300 rounded font-bold text-[10px]">
                      {c.duration_seconds}s Call
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div className="p-2.5 bg-slate-950 rounded-xl">Caller IMEI: <strong className="text-cyan-300">{c.caller_imei}</strong></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">Receiver IMEI: <strong className="text-rose-300">{c.receiver_imei}</strong></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-slate-300 text-[11px]">
                    Cell Tower BTS: <strong className="text-emerald-400">{c.cell_tower_bts}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: HAWALA MONEY TRAIL
           ========================================================================= */}
        {activeTab === 'hawala' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {hawala.map((h) => (
                <div key={h.trail_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-purple-400 font-bold text-[10px]">{h.trail_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{h.origin_account} ➔ {h.destination}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                      {h.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">INTERCEPTED AMOUNT</span><span className="text-emerald-400 font-bold text-base">₹{(h.amount_inr / 10000000).toFixed(1)} Cr</span></div>
                    <div className="p-3 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LAYERING HOPS</span><span className="text-cyan-400 font-bold text-base">{h.layering_hops} Accounts</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-slate-300 text-[11px]">
                    Flagged by: <strong className="text-amber-300">{h.flagged_by}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: BTS CO-LOCATION
           ========================================================================= */}
        {activeTab === 'colocation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-purple-500/40 pb-3">
              <span className="text-purple-400 font-bold text-[10px] uppercase">CELL TOWER SPATIAL-TEMPORAL PROXIMITY ANALYZER</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Crime Scene BTS Tower Co-Location Evidence</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div>Target Location: <strong>Mumbai International Airport T2 (BTS Lat: 19.0896, Long: 72.8656)</strong></div>
              <div>Co-Located Suspects: <strong className="text-purple-400">Vikramaditya Singhania & Sameer Qureshi</strong></div>
              <div>Simultaneous Tower Latch Window: <strong>2026-08-28 22:10:00 to 22:35:00 (25 Mins Concurrence)</strong></div>
              <div className="text-emerald-400 pt-1 border-t border-slate-900 font-bold">Forensic Proof: 100% Physical In-Person Meeting Established</div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COURT DOSSIER
           ========================================================================= */}
        {activeTab === 'dossier' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-purple-500/40 pb-3">
              <span className="text-purple-400 font-bold text-[10px] uppercase">INDIAN EVIDENCE ACT SECTION 65B CERTIFIED INTELLIGENCE DOSSIER</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">NCRB Cartel Syndicate Charge-Sheet Summary</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span>Dossier Hash:</span><strong className="text-cyan-300">SHA-256: 0x9f182c48192a01...8819</strong></div>
              <div className="flex justify-between"><span>Primary Accused:</span><strong className="text-white font-sans">Vikramaditya Singhania (Kingpin)</strong></div>
              <div className="flex justify-between"><span>Seized Hawala Assets:</span><span className="text-emerald-400 font-bold">₹14.80 Crores</span></div>
              <div className="flex justify-between"><span>Statutory Acts Invoked:</span><span>PMLA 2002, IT Act Section 66D, IPC Section 420 & 120B</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
