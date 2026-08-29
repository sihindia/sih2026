import React, { useState } from 'react';
import { 
  Satellite, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Eye, 
  Clock, 
  RefreshCw, 
  Terminal, 
  MessageSquare, 
  Cpu, 
  Globe 
} from 'lucide-react';

import queriesData from './data/remote_sensing_queries_catalog.json';
import pairsData from './data/multimodal_image_pairs.json';
import toolsData from './data/agentic_tool_registry.json';
import statsData from './data/sat_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [queries, setQueries] = useState(queriesData);
  const [selectedQuery, setSelectedQuery] = useState(queriesData[0]);
  const [pairs, setPairs] = useState(pairsData);
  const [tools, setTools] = useState(toolsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'query' | 'optsar' | 'change' | 'agent' | 'stats'>('query');

  // Interactive Query Terminal
  const [nlQuery, setNlQuery] = useState(selectedQuery.user_query);
  const [isInferring, setIsInferring] = useState(false);
  const [queryResponse, setQueryResponse] = useState<any>({
    answer: selectedQuery.grounded_response,
    tool: selectedQuery.orchestrated_specialist_tools.join(" ➔ "),
    conf: "96.8%",
    trace: [
      "1. Checked Cartosat-2S & RISAT SAR GeoTIFF input compatibility",
      "2. Dispatched to OptSAR-Fusion-Net for cloud-penetrating water detection",
      "3. Localized flooded crop boundary polygon [26.58°N, 93.17°E]"
    ]
  });

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInferring(true);
    setTimeout(() => {
      setQueryResponse({
        answer: selectedQuery.grounded_response,
        tool: selectedQuery.orchestrated_specialist_tools.join(" ➔ "),
        conf: "96.8%",
        trace: [
          "1. Checked Cartosat-2S & RISAT SAR GeoTIFF input compatibility",
          "2. Dispatched to OptSAR-Fusion-Net for cloud-penetrating water detection",
          "3. Localized flooded crop boundary polygon [26.58°N, 93.17°E]"
        ]
      });
      setIsInferring(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Satellite className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>ISRO • SATQUERY AI VISION-LANGUAGE REMOTE SENSING ASSISTANT • SIH26167</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SatQuery AI: Agentic Vision-Language Remote Sensing Assistant
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Natural Language Geospatial Queries, Optical + SAR Cross-Modal Fusion & Multitemporal Change-VQA (CDVQA)
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'query', label: '💬 Natural Language Query Assistant', count: queries.length },
            { id: 'optsar', label: '🛰️ Cross-Modal Optical + SAR Fusion' },
            { id: 'change', label: '⏳ Bi-Temporal Multitemporal Change-VQA' },
            { id: 'agent', label: '🤖 Agentic Specialist Tool Registry', count: tools.length },
            { id: 'stats', label: '📊 ISRO Remote Sensing Benchmark' }
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
            VIEW 1: QUERY
           ========================================================================= */}
        {activeTab === 'query' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {queries.map((q) => (
                <button
                  key={q.query_id}
                  onClick={() => { setSelectedQuery(q); setNlQuery(q.user_query); }}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedQuery.query_id === q.query_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{q.query_id}</span>
                    <span className="text-cyan-300">{q.task_type.split('_')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? q.user_query_hi : q.user_query}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{q.input_modalities.join(' + ')}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{q.orchestrated_specialist_tools[0]}</span>
                    <span>{q.ai_confidence_pct}% AI Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedQuery.query_id} • {selectedQuery.task_type}</span>
                    <h3 className="font-bold text-sm text-white font-sans mt-0.5">"{selectedQuery.user_query}"</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedQuery.status}
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-900/60 space-y-2">
                  <span className="text-emerald-400 font-mono text-[10px] font-bold block uppercase">EVIDENCE-GROUNDED AI RESPONSE:</span>
                  <p className="text-slate-200 text-xs font-sans leading-relaxed">
                    {selectedQuery.grounded_response}
                  </p>
                  <div className="text-cyan-300 font-mono text-[10px] pt-1">
                    Spatial Grounding BBox: [{selectedQuery.spatial_bounding_box.join('°, ')}°]
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <div><strong>Specialist Pipeline:</strong> <span className="font-mono text-amber-300">{selectedQuery.orchestrated_specialist_tools.join(" ➔ ")}</span></div>
                  <div><strong>Input Sensors:</strong> <span className="font-mono text-white">{selectedQuery.input_modalities.join(" & ")}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('optsar')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Co-Registered Optical & SAR Feature Layers ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>SatQuery Agentic Dispatcher</span>
                  </h4>
                  <form onSubmit={handleQuery} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Natural Language Query</label>
                      <textarea rows={3} value={nlQuery} onChange={(e) => setNlQuery(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-sans font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isInferring} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isInferring ? 'animate-spin' : ''}`} />
                      <span>{isInferring ? 'Orchestrating Remote Sensing Specialists...' : 'Execute Vision-Language Query'}</span>
                    </button>
                  </form>
                  {queryResponse && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Confidence: <strong className="text-emerald-400 font-mono text-xs">{queryResponse.conf}</strong></div>
                      <div className="text-amber-300 font-mono text-[10px]">Tool: {queryResponse.tool}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: OPTSAR */}
        {activeTab === 'optsar' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">CROSS-MODAL OPTICAL + SAR FUSION</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Cartosat-2S (0.65m) + RISAT-1A (C-Band SAR)</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">100% Cloud Penetration</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Optical Modality: <strong>High Contextual RGB/NIR Bands (Cloud-Cover: 45%)</strong></div>
              <div>SAR Modality: <strong>All-Weather C-Band Dual-Pol Radar (-18.4 dB Surface Water Backscatter)</strong></div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-900">
                OptSAR-Fusion-Net automatically decouples cloud reflection artifacts and accurately delineates flood extent.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CHANGE */}
        {activeTab === 'change' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">BI-TEMPORAL CHANGE-VQA (CDVQA)</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Bengaluru Peripheral Ring Road (2023 vs 2026)</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Built-Up Area Change: <strong className="text-emerald-400">+28.4% (+340 hectares)</strong></div>
              <div>Vegetation Cover Delta: <strong className="text-rose-400">-14.2% (-170 hectares)</strong></div>
              <div className="text-cyan-300 pt-1 border-t border-slate-900">
                Spatial change map generated from bi-temporal paired Cartosat GeoTIFF observations.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: AGENT */}
        {activeTab === 'agent' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {tools.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-[10px]">{t.tool_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.name}</h4>
                <p className="text-slate-300 text-xs font-sans">{t.description}</p>
                <div className="text-cyan-300 text-[10px] pt-1">Specialty: {t.specialty}</div>
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
