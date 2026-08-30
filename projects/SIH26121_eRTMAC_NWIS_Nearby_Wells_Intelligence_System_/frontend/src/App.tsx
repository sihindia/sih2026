import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  MapPin, 
  BookOpen, 
  RefreshCw, 
  ShieldAlert, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/active_drilling_wells_offset_cases.json';
import geologyData from './data/geological_formation_hazard_correlations.json';
import lessonsData from './data/wcr_ddr_knowledge_lessons_learned.json';
import statsData from './data/ertmac_nwis_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [geology, setGeology] = useState(geologyData);
  const [lessons, setLessons] = useState(lessonsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'geology' | 'lessons' | 'advisory' | 'stats'>('cases');

  // Interactive Risk Prediction Simulator
  const [isPredicting, setIsPredicting] = useState(false);
  const [predResult, setPredResult] = useState<any>({
    offset: "NHK-#512 (1.2 km away • Stuck Pipe at 3,285m)",
    risk: "HIGH RISK: Stuck Pipe & 14.2 ppg Pore Pressure Ramp in next 45m",
    action: "Increase Mud Weight from 11.4 to 12.8 ppg; Spot 15 bbl Lubricant Pill; Reduce WOB to 12 klbs",
    savings: "96 Hours NPT Prevented (₹48.0 Lakhs Saved)"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPredResult({
        offset: "NHK-#512 (1.2 km away • Stuck Pipe at 3,285m)",
        risk: "HIGH RISK: Stuck Pipe & 14.2 ppg Pore Pressure Ramp in next 45m",
        action: "Increase Mud Weight from 11.4 to 12.8 ppg; Spot 15 bbl Lubricant Pill; Reduce WOB to 12 klbs",
        savings: "96 Hours NPT Prevented (₹48.0 Lakhs Saved)"
      });
      setIsPredicting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Compass className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>OIL • ERTMAC-NWIS 360 NEARBY OFFSET WELLS INTELLIGENCE SYSTEM • SIH26121</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OIL eRTMAC-NWIS: AI-Powered Offset Well Knowledge & Drilling Decision Support
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Geospatial Offset Well Radar, Stratigraphic Hazard Correlation (Stuck Pipe, Losses, Kicks) & Scanned WCR/DDR Knowledge Extraction
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🎯 Offset Well Cases', count: cases.length },
            { id: 'geology', label: '🌋 Formation Hazards', count: geology.length },
            { id: 'lessons', label: '📚 WCR/DDR Lessons Learned', count: lessons.length },
            { id: 'advisory', label: '⚠️ Proactive Drilling Advisory' },
            { id: 'stats', label: '📊 eRTMAC-NWIS Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.well_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.well_id === c.well_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.well_id}</span>
                    <span className="text-cyan-300">Depth: {c.current_depth_m}m</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.field_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Target: {c.target_formation}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Offsets: {c.offset_wells_count} Wells</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.well_id} • {selectedCase.field_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.target_formation}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">OFFSET WELL SPATIAL CORRELATION & PROACTIVE ALERT:</span>
                  <div className="text-white font-sans text-xs font-bold">Closest Offset: {selectedCase.closest_offset_well}</div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Historical Incident: <strong>{selectedCase.historical_offset_incident}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Proactive Advisory: <strong>{selectedCase.recommended_mitigation}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NPT PREVENTED</span><span className="text-emerald-400 font-bold">{selectedCase.npt_hours_prevented} Hours ({selectedCase.cost_savings_inr})</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PREDICTION PRECISION</span><span className="text-cyan-400 font-bold">{selectedCase.confidence_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('geology')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Geological Formation Hazard Matrix ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Nearby Wells AI Risk Engine</span>
                  </h4>
                  <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Active Well & Target Depth</label>
                      <input type="text" readOnly value={`${selectedCase.well_id} (${selectedCase.current_depth_m}m Depth)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Correlating Offset Well Trajectories...' : 'Scan Nearby Wells for Hazards'}</span>
                    </button>
                  </form>
                  {predResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Offset: <strong className="text-amber-400 font-mono text-xs">{predResult.offset}</strong></div>
                      <div>Alert: <strong className="text-rose-300 font-mono text-xs block mt-0.5">{predResult.risk}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GEOLOGY */}
        {activeTab === 'geology' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {geology.map((g, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{g.depth_interval}</span>
                <h4 className="font-bold text-sm text-white font-sans">{g.formation}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Primary Risk: <strong className="text-rose-400">{g.primary_hazard}</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Historical NPT: {g.historical_npt_days} Days</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: LESSONS */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {lessons.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{l.category}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.doc_source}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{l.insight}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ADVISORY */}
        {activeTab === 'advisory' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Real-Time Depth-Synchronized Drilling Advisory</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Integrated with eRTMAC WITSML/OPC telemetry feeds delivering proactive mud weight, WOB, and drill bit warnings directly to the company man and rig console.
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
