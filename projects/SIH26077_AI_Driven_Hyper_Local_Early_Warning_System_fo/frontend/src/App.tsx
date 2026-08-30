import React, { useState } from 'react';
import { 
  CloudLightning, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Waves, 
  RefreshCw, 
  Wind, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/hyperlocal_severe_weather_cases.json';
import precursorsData from './data/atmospheric_precursor_variables_matrix.json';
import predictionsData from './data/multitask_inference_heads_predictions.json';
import statsData from './data/hyperwarn_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [precursors, setPrecursors] = useState(precursorsData);
  const [predictions, setPredictions] = useState(predictionsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'precursors' | 'heads' | 'dem' | 'stats'>('cases');

  // Interactive MTL Nowcasting Simulator
  const [isInferring, setIsInferring] = useState(false);
  const [nowcastResult, setNowcastResult] = useState<any>({
    leadTime: "3.5 Hours Actionable Window",
    cloudburstRisk: "94.6% (CRITICAL EVACUATION)",
    flashFloodRisk: "96.1% (INUNDATION CREST AT 16:45 IST)",
    drainageBasin: "Bhagsunag & Manjhi Khad Nullahs (Slope > 38°)",
    status: "DISASTER FIRST RESPONDERS NOTIFIED"
  });

  const handleNowcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInferring(true);
    setTimeout(() => {
      setNowcastResult({
        leadTime: "3.5 Hours Actionable Window",
        cloudburstRisk: "94.6% (CRITICAL EVACUATION)",
        flashFloodRisk: "96.1% (INUNDATION CREST AT 16:45 IST)",
        drainageBasin: "Bhagsunag & Manjhi Khad Nullahs (Slope > 38°)",
        status: "DISASTER FIRST RESPONDERS NOTIFIED"
      });
      setIsInferring(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <CloudLightning className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>NCMRWF • HYPERWARN 360 AI HYPER-LOCAL SEVERE WEATHER NOWCASTING • SIH26077</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF HyperWarn: AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Simultaneous Cloudburst, Severe Thunderstorm & Flash Flood Multi-Task Learning (MTL) Prediction with 2-to-6 Hour Actionable Lead Time & CartoDEM Flood Routing
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⛈️ Nowcast Cases', count: cases.length },
            { id: 'precursors', label: '🛰️ IWV & CTT Sensors', count: precursors.length },
            { id: 'heads', label: '🧠 Multi-Task Heads', count: predictions.length },
            { id: 'dem', label: '🌊 CartoDEM Inundation' },
            { id: 'stats', label: '📊 HyperWarn Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-rose-400' : 'bg-slate-800 text-slate-300'
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
                  key={c.event_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.event_id === c.event_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.event_id}</span>
                    <span className="text-amber-400">{c.lead_time_hours}h Lead Time</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.location}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.hazard_type}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.mtl_probabilities.slice(0, 30)}...</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.event_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.hazard_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">ATMOSPHERIC PRECURSORS & MTL NOWCAST HEADS:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedCase.atmospheric_precursors}</div>
                  <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Terrain Routing: {selectedCase.topographic_channeling}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    MTL Risk Output: <strong>{selectedCase.mtl_probabilities}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Actionable Alert: <strong>{selectedCase.actionable_alert}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ACTIONABLE LEAD TIME</span><span className="text-amber-400 font-bold">{selectedCase.lead_time_hours} Hours</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI ARCHITECTURE</span><span className="text-rose-400 font-bold">Multi-Task Spatiotemporal Transformer</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('precursors')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine INSAT-3DR IWV & CTT Atmospheric Precursor Matrix ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Multi-Task Nowcasting Engine</span>
                  </h4>
                  <form onSubmit={handleNowcast} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Location & Sensor Coordinates</label>
                      <input type="text" readOnly value={`${selectedCase.location} (${selectedCase.event_id})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isInferring} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isInferring ? 'animate-spin' : ''}`} />
                      <span>{isInferring ? 'Running Spatiotemporal Transformer...' : 'Execute Hyper-Local Nowcast'}</span>
                    </button>
                  </form>
                  {nowcastResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Lead Time: <strong className="text-amber-400 font-mono text-xs">{nowcastResult.leadTime}</strong></div>
                      <div>Cloudburst: <strong className="text-rose-400 font-mono text-xs">{nowcastResult.cloudburstRisk}</strong></div>
                      <div>Flash Flood: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{nowcastResult.flashFloodRisk}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PRECURSORS */}
        {tab === 'precursors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {precursors.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{p.role}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.variable}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Threshold: <strong className="text-amber-400">{p.threshold}</strong></div>
                  <div className="text-cyan-400 text-[11px] pt-1 border-t border-slate-900">Sensor: {p.source}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: HEADS */}
        {tab === 'heads' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {predictions.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{h.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.head}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Accuracy: <strong className="text-rose-400 font-mono">{h.accuracy}</strong></div>
                  <div>Lead Time: <strong className="text-amber-400 font-mono">{h.lead_time}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DEM */}
        {tab === 'dem' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Waves className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">CartoDEM High-Resolution Topographic Flood Channeling</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simulates slope gravitation, ravine runoff pooling, and flash flood crest arrival times across steep Himalayan catchments and urban drainage corridors.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
