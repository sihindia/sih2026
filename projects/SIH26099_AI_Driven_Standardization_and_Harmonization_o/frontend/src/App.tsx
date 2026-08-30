import React, { useState } from 'react';
import { 
  Boxes, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GitMerge, 
  Building2, 
  RefreshCw, 
  TrendingDown, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import matsData from './data/cpse_harmonized_materials.json';
import clustersData from './data/cpse_enterprise_clusters.json';
import modelsData from './data/nlp_matching_models.json';
import statsData from './data/onematerial_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [materials, setMaterials] = useState(matsData);
  const [selectedMat, setSelectedMat] = useState(matsData[0]);
  const [clusters, setClusters] = useState(clustersData);
  const [models, setModels] = useState(modelsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'mats' | 'nlp' | 'clusters' | 'sourcing' | 'stats'>('mats');

  // Interactive Material Matching Simulator
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>({
    cnmc: "CNMC-ENG-VLV-50-150-SS316 (Common National Code)",
    confidence: "99.4% Match with CPCL, IOCL & ONGC Masters",
    demand: "1,450 Units Aggregated Across 3 Hydrocarbon CPSEs",
    savings: "₹1.84 Crores (22.4% Strategic Volume Discount)"
  });

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      setMatchResult({
        cnmc: "CNMC-ENG-VLV-50-150-SS316 (Common National Code)",
        confidence: "99.4% Match with CPCL, IOCL & ONGC Masters",
        demand: "1,450 Units Aggregated Across 3 Hydrocarbon CPSEs",
        savings: "₹1.84 Crores (22.4% Strategic Volume Discount)"
      });
      setIsMatching(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Boxes className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>CPCL / MOPNG • ONEMATERIAL 360 AI MATERIAL MASTER HARMONIZATION • SIH26099</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              CPCL OneMaterial: AI-Driven Standardization & Harmonization of Material Codes
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Transformer NLP Deduplication, 'One Nation One Material Code' (CNMC) & Inter-CPSE Joint Strategic Sourcing
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
            { id: 'mats', label: '📦 Harmonized Material Master', count: materials.length },
            { id: 'nlp', label: '🧠 AI Fuzzy NLP Deduplication', count: models.length },
            { id: 'clusters', label: '🏢 Participating CPSE Network', count: clusters.length },
            { id: 'sourcing', label: '💰 Demand Aggregation & Sourcing' },
            { id: 'stats', label: '📊 OneMaterial Telemetry' }
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
            VIEW 1: MATS
           ========================================================================= */}
        {activeTab === 'mats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materials.map((m) => (
                <button
                  key={m.material_id}
                  onClick={() => setSelectedMat(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMat.material_id === m.material_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{m.common_national_code}</span>
                    <span className="text-emerald-400">{m.nlp_similarity_score_pct}% Match</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {m.standardized_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{m.category}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Demand: {m.aggregated_annual_demand} Units</span>
                    <span className="text-emerald-400 font-bold">{m.collective_savings_inr.split(' ')[0]} {m.collective_savings_inr.split(' ')[1]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedMat.material_id} • {selectedMat.category}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMat.standardized_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMat.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">BI-DIRECTIONAL CPSE CODE MAPPINGS:</span>
                  <div className="grid grid-cols-1 gap-1 text-[11px] font-mono">
                    <div className="text-cyan-300">CPCL Master: <strong>{selectedMat.cpcl_code}</strong></div>
                    <div className="text-amber-300">IOCL Master: <strong>{selectedMat.iocl_code}</strong></div>
                    <div className="text-purple-300">ONGC Master: <strong>{selectedMat.ongc_code}</strong></div>
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Joint Demand: <strong>{selectedMat.aggregated_annual_demand} Units</strong> • Savings: <strong>{selectedMat.collective_savings_inr}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COMMON NATIONAL CODE</span><span className="text-orange-400 font-bold font-mono text-[10px]">{selectedMat.common_national_code}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NLP SIMILARITY SCORE</span><span className="text-emerald-400 font-bold">{selectedMat.nlp_similarity_score_pct}% Match</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('sourcing')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Joint Strategic Sourcing & Demand Aggregation ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>AI Material Master Matcher</span>
                  </h4>
                  <form onSubmit={handleMatch} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Input Material Description & CPSE</label>
                      <input type="text" readOnly value={`${selectedMat.standardized_name.slice(0, 45)}...`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isMatching} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isMatching ? 'animate-spin' : ''}`} />
                      <span>{isMatching ? 'Extracting Technical Tokens & Matching CNMC...' : 'Run Transformer NLP Matching'}</span>
                    </button>
                  </form>
                  {matchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Code: <strong className="text-orange-400 font-mono text-xs">{matchResult.cnmc}</strong></div>
                      <div>Savings: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{matchResult.savings}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: NLP */}
        {activeTab === 'nlp' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">F1-SCORE: {m.f1_score}%</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.model}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.task}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CLUSTERS */}
        {activeTab === 'clusters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {clusters.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">{c.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.cpse}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>ERP System: <strong className="text-white">{c.sap_version}</strong></div>
                  <div>Codes Mapped: <strong className="text-emerald-400">{c.codes_mapped} Items</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SOURCING */}
        {activeTab === 'sourcing' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400">
              <TrendingDown className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Inter-CPSE Joint Strategic Sourcing & Demand Aggregation</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Aggregates procurement volume across CPCL, IOCL, ONGC, and GAIL, generating over ₹42.6 Crores in volume discounts.
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
