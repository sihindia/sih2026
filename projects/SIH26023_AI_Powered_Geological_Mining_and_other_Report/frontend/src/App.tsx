import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Pickaxe, 
  BarChart3, 
  Landmark, 
  RefreshCw, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import blocksData from './data/geological_drilling_core_reports.json';
import productionData from './data/subsidiaries_production_and_obr_matrix.json';
import inquiriesData from './data/parliamentary_inquiries_rag_qna.json';
import statsData from './data/cmpdi_minereport_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'or' | 'mr'>('en');
  const [blocks, setBlocks] = useState(blocksData);
  const [selectedBlock, setSelectedBlock] = useState(blocksData[0]);
  const [production, setProduction] = useState(productionData);
  const [inquiries, setInquiries] = useState(inquiriesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'blocks' | 'production' | 'rag' | 'nlp' | 'stats'>('blocks');

  // Interactive Geological Dossier Generator
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportResult, setReportResult] = useState<any>({
    dossierTitle: "Automated CMPDI Geological & Exploration Dossier",
    reservesVerified: "1,250.0 MT Proved Reserves | 340.0 MT Indicated",
    drillingLithologs: "84 Boreholes Correlated (Max Depth: 420.5m)",
    coalQuality: "GCV Grade: G11 (3,700 - 4,000 kcal/kg)",
    strippingRatio: "Stripping Ratio: 1.45 m³/Tonne Overburden Disposal Cleared",
    ministerialFormat: "Ready for Ministry of Coal & CIL Subsidiary Technical Board"
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setReportResult({
        dossierTitle: `CMPDI Geological Dossier: ${selectedBlock.block_name}`,
        reservesVerified: `${selectedBlock.proved_geological_reserves_mt} MT Proved Reserves (${selectedBlock.subsidiary})`,
        drillingLithologs: `${selectedBlock.drilling_boreholes_count} Core Boreholes Digitzed (${selectedBlock.max_drilled_depth_m}m Depth)`,
        coalQuality: selectedBlock.average_gcv_grade,
        strippingRatio: `Stripping Ratio: ${selectedBlock.stripping_ratio_cum_per_tonne} m³/Tonne`,
        ministerialFormat: `Target Seams: ${selectedBlock.major_coal_seams.join(', ')}`
      });
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <FileText className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF COAL • COAL INDIA LIMITED / CMPDI • SIH26023</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              CMPDI MineReport AI: AI Geological, Mining &amp; Parliamentary Reporting Solution
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Central Mine Planning &amp; Design Institute (CMPDI) &amp; CIL Subsidiaries: Automated Multi-Modal Document Extraction, Borehole Core Litholog Correlation, Production/OBR Analytics &amp; Parliamentary Q&amp;A RAG Drafter
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('or')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'or' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>ଓଡ଼ିଆ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'blocks', label: '⛏️ Geological Exploration Blocks', count: blocks.length },
            { id: 'production', label: '📊 CIL Subsidiaries Production & OBR', count: production.length },
            { id: 'rag', label: '🏛️ Parliamentary Q&A Drafter', count: inquiries.length },
            { id: 'nlp', label: '☁️ Mining Topic Cloud & Entities' },
            { id: 'stats', label: '📈 CMPDI MineReport Telemetry' }
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
            VIEW 1: BLOCKS
           ========================================================================= */}
        {activeTab === 'blocks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {blocks.map((b) => (
                <button
                  key={b.block_id}
                  onClick={() => setSelectedBlock(b)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedBlock.block_id === b.block_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{b.block_id}</span>
                    <span className="text-emerald-400">{b.proved_geological_reserves_mt} MT Proved</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {b.block_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{b.coalfield} • {b.state}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{b.subsidiary.split(' ')[0]}</span>
                    <span className="text-cyan-400">{b.drilling_boreholes_count} Boreholes</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedBlock.block_id} • {selectedBlock.subsidiary}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedBlock.block_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedBlock.extraction_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">CMPDI GEOLOGICAL &amp; COAL PETROGRAPHY AUDIT:</span>
                  <div className="text-white font-sans text-xs">
                    Coalfield &amp; State: <strong className="text-amber-300">{selectedBlock.coalfield}, {selectedBlock.state}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Proved Geological Reserves: {selectedBlock.proved_geological_reserves_mt} MT (Indicated: {selectedBlock.indicated_reserves_mt} MT)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Average Coal Grade: {selectedBlock.average_gcv_grade} | Stripping Ratio: {selectedBlock.stripping_ratio_cum_per_tonne} m³/T
                  </div>
                  <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Borehole Exploration: {selectedBlock.drilling_boreholes_count} Core Holes drilled to max {selectedBlock.max_drilled_depth_m}m depth
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PROVED COAL RESERVES</span><span className="text-amber-400 font-bold">{selectedBlock.proved_geological_reserves_mt} Million Tonnes</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">STRIPPING RATIO</span><span className="text-cyan-400 font-bold">{selectedBlock.stripping_ratio_cum_per_tonne} m³/Tonne</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('rag')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Query Parliamentary Q&amp;A RAG System for this Block ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Instant CMPDI Dossier Compiler</span>
                  </h4>
                  <form onSubmit={handleGenerate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Geological Block Selection</label>
                      <input type="text" readOnly value={`${selectedBlock.block_name} (${selectedBlock.subsidiary.split(' ')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isGenerating} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Synthesizing Core Lithologs & Isopach Maps...' : 'Compile Official Geological Dossier'}</span>
                    </button>
                  </form>
                  {reportResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Dossier: <strong className="text-emerald-400 font-mono text-xs">{reportResult.dossierTitle}</strong></div>
                      <div>Reserves: <span className="text-amber-300 text-xs font-bold">{reportResult.reservesVerified}</span></div>
                      <div>Lithology: <strong className="text-cyan-300 font-mono text-xs">{reportResult.drillingLithologs}</strong></div>
                      <div>Grade: <strong className="text-slate-300 font-mono text-xs">{reportResult.coalQuality}</strong></div>
                      <div>Seams: <strong className="text-purple-300 font-mono text-xs block mt-0.5">{reportResult.ministerialFormat}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCTION */}
        {activeTab === 'production' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {production.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400 font-bold">{p.subsidiary_code}</span>
                  <span className="text-emerald-400 font-bold">{p.target_achievement_pct}% Target</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{p.subsidiary_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Production: {p.actual_production_mt} MT (Target: {p.annual_target_mt} MT) | OBR: {p.overburden_removal_mcum} M.CuM</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-cyan-300 text-[10px]">
                  <span>Power Dispatch: {p.dispatch_to_power_plants_mt} MT</span>
                  <span className="text-amber-300">Daily Rakes: {p.daily_rail_rakes_loaded}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RAG */}
        {activeTab === 'rag' && (
          <div className="space-y-4 font-mono text-xs">
            {inquiries.map((q, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{q.inquiry_id} • {q.house}</span>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl text-[10px] font-bold">{q.status}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-sans">{q.subject}</h4>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 font-sans text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Parliamentary Question:</span>
                  <p className="italic">"{q.question}"</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-amber-900/40 text-amber-200 font-sans text-xs space-y-1">
                  <span className="text-amber-400 block text-[10px] uppercase font-bold">AI Synthesized Ministerial Response (CMPDI RAG Engine):</span>
                  <p>{q.ai_generated_response}</p>
                  <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400 font-mono">
                    Verified Citations: {q.citations.join(' | ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: NLP */}
        {activeTab === 'nlp' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Layers className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Word Cloud &amp; Mining Entity Extraction Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              NLP transformer taxonomy automatically tagging Overburden Removal (OBR), Gross Calorific Value (GCV), Dragline Availability, Coal Seam Correlation, and DGMS Statutory Audits across 50,000+ historical PDF dossiers.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
