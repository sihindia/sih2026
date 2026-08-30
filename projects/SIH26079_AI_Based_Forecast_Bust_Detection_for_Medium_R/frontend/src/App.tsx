import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Activity, 
  RefreshCw, 
  Sliders, 
  HelpCircle, 
  TrendingDown, 
  Globe 
} from 'lucide-react';

import casesData from './data/forecast_bust_detection_cases.json';
import confidenceData from './data/medium_range_confidence_heatmaps.json';
import causesData from './data/explainable_bust_meteorological_causes.json';
import statsData from './data/bustguard_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [confidence, setConfidence] = useState(confidenceData);
  const [causes, setCauses] = useState(causesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'confidence' | 'causes' | 'analog' | 'stats'>('cases');

  // Interactive Bust Evaluation Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [bustResult, setBustResult] = useState<any>({
    probability: "87.4% (HIGH BUST RISK)",
    confidence: "28.0% (UNRELIABLE NWP CORE)",
    analogMatch: "July 2018 Monsoon Depression Track Error (>220 km)",
    rootCause: "Dry continental air intrusion from Northwest India eroding convective moisture pocket",
    actionableFix: "SHIFT CORRIDOR: Shift heavy rain swath 180 km southwards over North Telangana & South Chhattisgarh"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setBustResult({
        probability: "87.4% (HIGH BUST RISK)",
        confidence: "28.0% (UNRELIABLE NWP CORE)",
        analogMatch: "July 2018 Monsoon Depression Track Error (>220 km)",
        rootCause: "Dry continental air intrusion from Northwest India eroding convective moisture pocket",
        actionableFix: "SHIFT CORRIDOR: Shift heavy rain swath 180 km southwards over North Telangana & South Chhattisgarh"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>NCMRWF • BUSTGUARD 360 AI MEDIUM-RANGE FORECAST BUST DETECTION • SIH26079</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF BustGuard: AI-Based Forecast Bust Detection for Medium-Range Weather Forecasts
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Predicting Large NWP Model Errors & Unpredictable Zones across Day 1 to Day 10 using Deep Historical Analog Error Memory & Explainable AI Root Cause Diagnostics
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
            { id: 'cases', label: '⚠️ Forecast Bust Cases', count: cases.length },
            { id: 'confidence', label: '🗺️ Day 1-10 Confidence', count: confidence.length },
            { id: 'causes', label: '🔍 Explainable Causes', count: causes.length },
            { id: 'analog', label: '🧠 20-Year Error Memory' },
            { id: 'stats', label: '📊 BustGuard Telemetry' }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.case_id}</span>
                    <span className="text-rose-400">Bust Prob: {c.bust_probability_pct}%</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.synoptic_system}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Lead: Day {c.forecast_lead_day} ({c.nwp_model})</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Confidence: {c.confidence_score_pct}%</span>
                    <span className="text-rose-400">BUST WARNING</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.case_id} • Day {selectedCase.forecast_lead_day} ({selectedCase.nwp_model})</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.synoptic_system}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">MODEL SCENARIO & HISTORICAL FAILURE ANALOG:</span>
                  <div className="text-slate-400 font-sans text-xs">Predicted by NWP: {selectedCase.predicted_scenario}</div>
                  <div className="text-rose-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Bust Risk: <strong>{selectedCase.bust_probability_pct}% Probability</strong> (Model Confidence: {selectedCase.confidence_score_pct}%)
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    20-Year Error Analog: {selectedCase.historical_analog_match}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    XAI Root Cause: <strong>{selectedCase.xai_root_cause}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Operational Correction: {selectedCase.forecaster_guidance}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BUST PROBABILITY</span><span className="text-rose-400 font-bold">{selectedCase.bust_probability_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MODEL CONFIDENCE</span><span className="text-amber-400 font-bold">{selectedCase.confidence_score_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('confidence')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Day 1 to Day 10 Spatial Confidence Heatmaps ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Forecast Bust Evaluator</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Synoptic Weather System</label>
                      <input type="text" readOnly value={`${selectedCase.synoptic_system.slice(0, 32)}... (Day ${selectedCase.forecast_lead_day})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Matching 20-Year Error Analogs...' : 'Diagnose Forecast Failure Risk'}</span>
                    </button>
                  </form>
                  {bustResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Risk: <strong className="text-rose-400 font-mono text-xs">{bustResult.probability}</strong></div>
                      <div>Confidence: <strong className="text-amber-400 font-mono text-xs">{bustResult.confidence}</strong></div>
                      <div>Guidance: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{bustResult.actionableFix}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CONFIDENCE */}
        {tab === 'confidence' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {confidence.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{c.reliability_tier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.day_range}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Average Confidence: <strong className="text-emerald-400">{c.average_confidence}</strong></div>
                  <div>Historical Bust Rate: <strong className="text-rose-400">{c.bust_frequency}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CAUSES */}
        {tab === 'causes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {causes.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">Frequency: {c.frequency}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.cause}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{c.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ANALOG */}
        {tab === 'analog' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">20-Year NWP Historical Error Memory & Analog Network</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Performs rapid nearest-neighbor vector search against two decades of verified NCUM and NEPS numerical forecast failure logs to pinpoint when live models are repeating known systematic blindspots.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
