import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Gauge, 
  Activity, 
  RefreshCw, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import wellsData from './data/baghewala_heavy_oil_well_twins.json';
import cssData from './data/css_thermal_steam_cycle_parameters.json';
import srpData from './data/srp_dynamometer_rod_floating_models.json';
import statsData from './data/baghewalatwin_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [wells, setWells] = useState(wellsData);
  const [selectedWell, setSelectedWell] = useState(wellsData[0]);
  const [css, setCss] = useState(cssData);
  const [srp, setSrp] = useState(srpData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'wells' | 'css' | 'srp' | 'sor' | 'stats'>('wells');

  // Interactive Digital Twin Optimizer Simulator
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optResult, setOptResult] = useState<any>({
    steam: "1,850 MT Steam (80% Quality • 10-Day Soak)",
    srp: "4.8 SPM • 120-Inch Stroke (VFD Dynamic Downstroke)",
    floating: "0.02 Risk Index (Zero Rod Buckling / Compression)",
    sor: "2.4 MT/bbl (38.5% Energy Savings • 142 BOPD)"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setOptResult({
        steam: "1,850 MT Steam (80% Quality • 10-Day Soak)",
        srp: "4.8 SPM • 120-Inch Stroke (VFD Dynamic Downstroke)",
        floating: "0.02 Risk Index (Zero Rod Buckling / Compression)",
        sor: "2.4 MT/bbl (38.5% Energy Savings • 142 BOPD)"
      });
      setIsOptimizing(false);
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
              <span>OIL • BAGHEWALATWIN 360 HEAVY OIL CSS & SRP DIGITAL TWIN • SIH26120</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OIL BaghewalaTwin: Digital Twin for Well-to-Surface CSS & SRP Heavy Oil Optimization
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Jodhpur Sandstone Heavy Oil Thermal Recovery (17-19° API), Coupled CSS Steam Modeling & Dynamic Sucker Rod Pump (SRP) Control
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
            { id: 'wells', label: '🛢️ Well Digital Twins', count: wells.length },
            { id: 'css', label: '🔥 CSS Steam Cycles', count: css.length },
            { id: 'srp', label: '⚙️ SRP VFD Controller', count: srp.length },
            { id: 'sor', label: '📈 Steam-to-Oil Ratio (SOR)' },
            { id: 'stats', label: '📊 BaghewalaTwin Telemetry' }
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
            VIEW 1: WELLS
           ========================================================================= */}
        {activeTab === 'wells' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wells.map((w) => (
                <button
                  key={w.well_id}
                  onClick={() => setSelectedWell(w)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedWell.well_id === w.well_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{w.well_id}</span>
                    <span className="text-emerald-400">{w.oil_production_bopd} BOPD</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {w.formation}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">BHT: {w.bottom_hole_temp_c}°C • Viscosity: {w.crude_viscosity_cp} cP</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>SOR: {w.steam_oil_ratio_sor} MT/bbl</span>
                    <span className="text-emerald-400">{w.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedWell.well_id} • CSS Cycle #{selectedWell.css_cycle_number}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedWell.formation}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedWell.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">THERMAL WELLBORE & ARTIFICIAL LIFT TWIN:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Bottom-Hole Temp: <strong className="text-amber-400">{selectedWell.bottom_hole_temp_c}°C</strong></div>
                    <div>Crude Viscosity: <strong className="text-cyan-300">{selectedWell.crude_viscosity_cp} cP</strong></div>
                    <div>Optimal Steam: <strong className="text-white">{selectedWell.optimal_steam_volume_mt} MT</strong></div>
                    <div>SRP Speed: <strong className="text-emerald-400">{selectedWell.srp_vfd_spm} SPM ({selectedWell.srp_stroke_length_inch}")</strong></div>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Rod Floating Risk: <strong>{selectedWell.rod_floating_risk_index} (Safe • No Buckling)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">OIL PRODUCTION</span><span className="text-emerald-400 font-bold">{selectedWell.oil_production_bopd} BOPD</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">STEAM-OIL RATIO</span><span className="text-orange-400 font-bold">{selectedWell.steam_oil_ratio_sor} MT/bbl</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('srp')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Optimize Sucker Rod Pump (SRP) VFD Parameters ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Well-to-Surface Optimizer</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Heavy Oil Well</label>
                      <input type="text" readOnly value={`${selectedWell.well_id} (${selectedWell.formation.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Simulating Coupled Reservoir & SRP Twin...' : 'Execute Digital Twin Optimization'}</span>
                    </button>
                  </form>
                  {optResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Steam: <strong className="text-orange-400 font-mono text-xs">{optResult.steam}</strong></div>
                      <div>SRP: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{optResult.srp}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CSS */}
        {activeTab === 'css' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {css.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">{c.cycle_stage}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.steam_quality}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Pressure: <strong className="text-cyan-400">{c.injection_pressure_bar} Bar</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Duration: {c.avg_duration_days} Days</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SRP */}
        {activeTab === 'srp' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {srp.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">EFFICIENCY: {s.efficiency_pct}%</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.pump_component}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.rod_floating_mitigation}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SOR */}
        {activeTab === 'sor' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400">
              <TrendingUp className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Field-Wide Steam-to-Oil Ratio (SOR) Minimization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Dynamic heat retention scheduling reducing cumulative steam consumption from 4.2 MT/bbl to 2.4 MT/bbl across Baghewala heavy oil producers.
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
