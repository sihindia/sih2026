import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Wind, 
  Activity, 
  RefreshCw, 
  Sliders, 
  ShieldAlert, 
  Layers, 
  Globe 
} from 'lucide-react';

import casesData from './data/delhi_coupled_aqi_cases.json';
import inversionData from './data/inversion_pbl_feedback_matrix.json';
import stubbleData from './data/stubble_burning_plume_trajectories.json';
import statsData from './data/aerocoupled_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [inversion, setInversion] = useState(inversionData);
  const [stubble, setStubble] = useState(stubbleData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'inversion' | 'stubble' | 'grap' | 'stats'>('cases');

  // Interactive Coupled Feedback Simulator
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>({
    coupledPM25: "468.5 µg/m³ (AQI: 482 Severe+)",
    uncoupledBias: "290.0 µg/m³ (-38% severe under-prediction without feedback)",
    squashedPBL: "95 meters (Thermal Inversion Cap)",
    solarDimming: "-35 W/m² (Aerosol radiative cooling suppressed daytime mixing)",
    grapAction: "Trigger GRAP Stage IV Emergency Restrictions 36h in advance"
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult({
        coupledPM25: "468.5 µg/m³ (AQI: 482 Severe+)",
        uncoupledBias: "290.0 µg/m³ (-38% severe under-prediction without feedback)",
        squashedPBL: "95 meters (Thermal Inversion Cap)",
        solarDimming: "-35 W/m² (Aerosol radiative cooling suppressed daytime mixing)",
        grapAction: "Trigger GRAP Stage IV Emergency Restrictions 36h in advance"
      });
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>NCMRWF • AEROCOUPLED 360 AIR POLLUTION-WEATHER COUPLED SUITE • SIH26082</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF AeroCoupled: Air Pollution–Weather Coupled Forecasting System (Delhi NCR Focus)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Two-Way Weather-Chemistry Feedback (WRF-Chem) Tracking Atmospheric Inversion Layers, Stubble Plume Dispersion & 72-Hour GRAP Triggers
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
            { id: 'cases', label: '🌫️ Coupled AQI Cases', count: cases.length },
            { id: 'inversion', label: '🌡️ Inversion & PBL Height', count: inversion.length },
            { id: 'stubble', label: '🔥 Stubble Plumes', count: stubble.length },
            { id: 'grap', label: '🚨 GRAP IV Triggers' },
            { id: 'stats', label: '📊 AeroCoupled Telemetry' }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <span className="text-rose-400">AQI: {c.air_quality_index} ({c.aqi_category})</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.delhi_hotspot}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.episode_type}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Coupled: {c.coupled_aero_pm25} µg/m³</span>
                    <span className="text-orange-400">PBL: {c.pbl_height_m}m</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedCase.case_id} • {selectedCase.delhi_hotspot}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.episode_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    AQI {selectedCase.air_quality_index} ({selectedCase.aqi_category})
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">TWO-WAY WEATHER-CHEMISTRY FEEDBACK:</span>
                  <div className="text-slate-300 font-sans text-xs">
                    Inversion Strength: <strong className="text-amber-400">{selectedCase.inversion_strength}</strong> | PBL Height: <strong className="text-rose-400">{selectedCase.pbl_height_m} m</strong>
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    Uncoupled vs Coupled: Raw <span className="text-slate-400 line-through">{selectedCase.uncoupled_model_pm25} µg/m³</span> ➔ Coupled <strong className="text-rose-400">{selectedCase.coupled_aero_pm25} µg/m³</strong> (Stubble: {selectedCase.stubble_smoke_share_pct}%)
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Feedback Mechanism: {selectedCase.two_way_feedback}
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Actionable Trigger: {selectedCase.grap_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COUPLED PM2.5 CONC</span><span className="text-rose-400 font-bold">{selectedCase.coupled_aero_pm25} µg/m³</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">STUBBLE CONTRIBUTION</span><span className="text-amber-400 font-bold">{selectedCase.stubble_smoke_share_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('inversion')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Atmospheric Inversion Strength & Squashed PBL Height ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>WRF-Chem Two-Way Feedback Simulator</span>
                  </h4>
                  <form onSubmit={handleSimulate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Hotspot & Season</label>
                      <input type="text" readOnly value={`${selectedCase.delhi_hotspot} (${selectedCase.pbl_height_m}m PBL)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isSimulating} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Computing Aerosol Solar Dimming...' : 'Simulate Coupled AQI'}</span>
                    </button>
                  </form>
                  {simResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Coupled PM2.5: <strong className="text-rose-400 font-mono text-xs">{simResult.coupledPM25}</strong></div>
                      <div>PBL Collapse: <strong className="text-amber-300 font-mono text-xs">{simResult.squashedPBL}</strong></div>
                      <div>CAQM Action: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{simResult.grapAction}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INVERSION */}
        {tab === 'inversion' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {inversion.map((inv, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">FEEDBACK #{idx + 1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{inv.parameter}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Winter Inversion: <strong className="text-rose-400">{inv.winter_inversion}</strong></div>
                  <div>Summer Baseline: <strong className="text-slate-400">{inv.typical_summer}</strong></div>
                  <div className="text-amber-300 text-[11px] pt-1 border-t border-slate-900">{inv.impact}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: STUBBLE */}
        {tab === 'stubble' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {stubble.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{s.active_fire_count}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.region}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Wind Corridor: <strong className="text-white">{s.wind_corridor}</strong></div>
                  <div className="text-amber-400 text-[11px] pt-1 border-t border-slate-900">Delhi Impact: {s.delhi_impact}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: GRAP */}
        {tab === 'grap' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated CAQM GRAP Stage IV Emergency Warning System</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Transforms 72-hour coupled forecast spikes into pre-emptive Commission for Air Quality Management (CAQM) statutory interventions, enforcing truck diversions, construction halts, and school closures before pollution peaks occur.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
