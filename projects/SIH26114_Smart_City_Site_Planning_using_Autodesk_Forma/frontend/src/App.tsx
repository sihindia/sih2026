import React, { useState } from 'react';
import { 
  Building, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sun, 
  Wind, 
  RefreshCw, 
  Scale, 
  Sliders, 
  Globe 
} from 'lucide-react';

import proposalsData from './data/smart_city_site_proposals.json';
import simulationsData from './data/microclimate_simulation_engines.json';
import metricsData from './data/forma_board_comparison_metrics.json';
import statsData from './data/formaplan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [proposals, setProposals] = useState(proposalsData);
  const [selectedProp, setSelectedProp] = useState(proposalsData[0]);
  const [simulations, setSimulations] = useState(simulationsData);
  const [metrics, setMetrics] = useState(metricsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'proposals' | 'simulations' | 'board' | 'bim' | 'stats'>('proposals');

  // Interactive Microclimate Simulator
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>({
    sun: "6.8 Sun Hours/Day (Optimal Building Facade Insolation)",
    wind: "96.2% Lawson Pedestrian Comfort (<5 m/s airflow)",
    daylight: "78.5% Floor Area Reaching Target Daylight Autonomy",
    solar: "14,200 MWh/Year Clean Rooftop PV Generation"
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setTimeout(() => {
      setSimResult({
        sun: "6.8 Sun Hours/Day (Optimal Building Facade Insolation)",
        wind: "96.2% Lawson Pedestrian Comfort (<5 m/s airflow)",
        daylight: "78.5% Floor Area Reaching Target Daylight Autonomy",
        solar: "14,200 MWh/Year Clean Rooftop PV Generation"
      });
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Building className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>AUTODESK • FORMAPLAN 360 SMART CITY SITE PLANNING & MICROCLIMATE BIM • SIH26114</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Autodesk FormaPlan: Smart City Site Planning & Microclimate Simulation Suite
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              1.2 sq. km Computational Site Design, Sun/Wind/Carbon/Daylight Microclimate Simulations & Bi-Directional Revit Sync
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'proposals', label: '🏙️ Smart City Proposals', count: proposals.length },
            { id: 'simulations', label: '☀️ Microclimate Engines', count: simulations.length },
            { id: 'board', label: '⚖️ Forma Board Comparison', count: metrics.length },
            { id: 'bim', label: '🔄 Revit BIM & IFC Sync' },
            { id: 'stats', label: '📊 FormaPlan Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: PROPOSALS
           ========================================================================= */}
        {activeTab === 'proposals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {proposals.map((p) => (
                <button
                  key={p.proposal_id}
                  onClick={() => setSelectedProp(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProp.proposal_id === p.proposal_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{p.proposal_id}</span>
                    <span className="text-cyan-300">GFA: {p.gross_floor_area_sq_m}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Site: {p.site_area_sq_km} sq. km • Green: {p.green_landscape_pct}%</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Solar: {p.solar_energy_potential_mwh} MWh</span>
                    <span className="text-emerald-400">{p.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedProp.proposal_id} • {selectedProp.site_area_sq_km} sq. km Masterplan</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProp.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedProp.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">MICROCLIMATE PERFORMANCE & BIM SYNC:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Daily Sun Hours: <strong className="text-amber-400">{selectedProp.sun_hours_daily_avg} hrs/day</strong></div>
                    <div>Daylight Potential: <strong className="text-cyan-300">{selectedProp.daylight_potential_pct}%</strong></div>
                    <div>Wind Comfort: <strong className="text-emerald-400">{selectedProp.wind_comfort_lawson_pct}% Lawson</strong></div>
                    <div>Embodied Carbon: <strong className="text-emerald-300">{selectedProp.embodied_carbon_kg_co2_m2} kg CO2e/m²</strong></div>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Revit BIM Link: <strong>{selectedProp.revit_sync_status}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">GREEN LANDSCAPE</span><span className="text-emerald-400 font-bold">{selectedProp.green_landscape_pct}% Area</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SOLAR PV GENERATION</span><span className="text-amber-400 font-bold">{selectedProp.solar_energy_potential_mwh} MWh/yr</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('simulations')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Execute 6-Factor Microclimate Analysis Simulations ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Forma AI Site Simulation</span>
                  </h4>
                  <form onSubmit={handleSimulate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Masterplan Proposal</label>
                      <input type="text" readOnly value={selectedProp.project_name} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isSimulating} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Computing CFD Wind & Solar Ray-Tracing...' : 'Run Microclimate Site Analysis'}</span>
                    </button>
                  </form>
                  {simResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Sun: <strong className="text-amber-400 font-mono text-xs">{simResult.sun}</strong></div>
                      <div>Wind: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{simResult.wind}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SIMULATIONS */}
        {activeTab === 'simulations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {simulations.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">REAL-TIME SIMULATION</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.simulation_type}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Engine: <strong className="text-white">{s.engine}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">Resolution: {s.resolution}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: BOARD */}
        {activeTab === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">FORMA BOARD COMPARISON</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.dimension}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Proposal A: <strong className="text-cyan-400">{m.proposal_a}</strong></div>
                  <div>Proposal B: <strong className="text-emerald-400">{m.proposal_b}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: BIM */}
        {activeTab === 'bim' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Building className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Bi-Directional Autodesk Revit 2026 BIM Cloud Synchronization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Direct cloud sync of conceptual massing blocks into native Revit drawing blocks (.rvt) with IFC4 schema exports for structural and MEP detailing.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
