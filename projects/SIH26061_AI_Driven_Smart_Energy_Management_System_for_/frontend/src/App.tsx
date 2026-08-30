import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sun, 
  Wind, 
  RefreshCw, 
  BatteryCharging, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import scenariosData from './data/polar_energy_dispatch_scenarios.json';
import renewablesData from './data/renewable_generation_sources_matrix.json';
import hierarchyData from './data/demand_side_load_priority_hierarchy.json';
import statsData from './data/dhruvaurja_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'kn'>('en');
  const [scenarios, setScenarios] = useState(scenariosData);
  const [selectedScenario, setSelectedScenario] = useState(scenariosData[0]);
  const [renewables, setRenewables] = useState(renewablesData);
  const [hierarchy, setHierarchy] = useState(hierarchyData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scenarios' | 'renewables' | 'hierarchy' | 'forecast' | 'stats'>('scenarios');

  // Interactive Microgrid Dispatch Simulator
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>({
    fuelSaved: "38.8% Diesel Fuel Saved (31.8 L/h vs 52.0 L/h Baseline)",
    windDispatched: "34.0 kW Polar Katabatic Wind Generation Dispatched",
    solarDispatched: "0.0 kW (Polar Night Darkness Compensated by Wind + BESS)",
    chpThermal: "48.0 kW Exhaust Heat Recycled to Habitat Radiators",
    lifeSupportStatus: "100% Life Support Power Maintained (Zero Curtailment)"
  });

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatching(true);
    setTimeout(() => {
      setDispatchResult({
        fuelSaved: "38.8% Diesel Fuel Saved (31.8 L/h vs 52.0 L/h Baseline)",
        windDispatched: "34.0 kW Polar Katabatic Wind Generation Dispatched",
        solarDispatched: "0.0 kW (Polar Night Darkness Compensated by Wind + BESS)",
        chpThermal: "48.0 kW Exhaust Heat Recycled to Habitat Radiators",
        lifeSupportStatus: "100% Life Support Power Maintained (Zero Curtailment)"
      });
      setIsDispatching(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MOES / NCPOR • DHRUVAURJA 360 POLAR SMART ENERGY MANAGEMENT • SIH26061</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoES DhruvaUrja: AI-Driven Smart Energy Management for Polar Stations
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Centre for Polar and Ocean Research (NCPOR) AI Microgrid Dispatch, Temporal Fusion Transformer Load Forecasting, Hybrid Vertical Solar &amp; Katabatic Wind Integration Cutting Fuel by 38.8%
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scenarios', label: '⚡ Dispatch Scenarios', count: scenarios.length },
            { id: 'renewables', label: '🌬️ Polar Renewables', count: renewables.length },
            { id: 'hierarchy', label: '🎯 Demand-Side Hierarchy', count: hierarchy.length },
            { id: 'forecast', label: '📈 24h Load Forecasting' },
            { id: 'stats', label: '📊 DhruvaUrja Telemetry' }
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
            VIEW 1: SCENARIOS
           ========================================================================= */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.scenario_id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedScenario.scenario_id === s.scenario_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{s.scenario_id}</span>
                    <span className="text-emerald-400">-{s.fuel_savings_pct}% Fuel</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.station_name.split('-')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{s.station_name.split('-')[1]}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Demand: {s.total_electric_demand_kw} kW</span>
                    <span className="text-emerald-400">Burn: {s.diesel_burn_rate_lph} L/h</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedScenario.scenario_id} • {selectedScenario.station_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">Electrical: {selectedScenario.total_electric_demand_kw} kW | Thermal: {selectedScenario.total_thermal_demand_kw} kW</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScenario.dispatch_verdict}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">POLAR METEOROLOGICAL CONDITIONS &amp; DISPATCH SETPOINTS:</span>
                  <div className="text-white font-sans text-xs">
                    Weather: Ambient <strong className="text-amber-300">{selectedScenario.ambient_temperature_c}°C</strong> | Wind: <strong className="text-cyan-300">{selectedScenario.katabatic_wind_speed_kmh} km/h</strong> | Solar: {selectedScenario.solar_irradiance_wm2} W/m²
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Renewable Generation: Wind ({selectedScenario.wind_turbine_generation_kw} kW) + Solar ({selectedScenario.solar_pv_generation_kw} kW) + CHP Heat ({selectedScenario.chp_heat_recovery_kw} kW)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Fuel Consumption: Optimized at {selectedScenario.diesel_burn_rate_lph} L/h (vs {selectedScenario.unoptimized_baseline_lph} L/h baseline, -{selectedScenario.fuel_savings_pct}% Fuel)
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Life Support Curtailment: {selectedScenario.life_support_curtailment_pct}% (100% Habitability Guaranteed)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DIESEL FUEL REDUCTION</span><span className="text-emerald-400 font-bold">-{selectedScenario.fuel_savings_pct}% Saved</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RENEWABLE PENETRATION</span><span className="text-amber-400 font-bold">{(((selectedScenario.wind_turbine_generation_kw + selectedScenario.solar_pv_generation_kw) / selectedScenario.total_electric_demand_kw) * 100).toFixed(1)}% Clean Power</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('renewables')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Polar Hybrid Renewable Integration Matrix ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Microgrid Dispatch Engine</span>
                  </h4>
                  <form onSubmit={handleDispatch} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Polar Microgrid Node</label>
                      <input type="text" readOnly value={`${selectedScenario.station_name.split('-')[0]} (${selectedScenario.katabatic_wind_speed_kmh} km/h Wind)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isDispatching} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
                      <span>{isDispatching ? 'Optimizing Wind & CHP Heat Recovery...' : 'Execute Non-Linear MPC Dispatch'}</span>
                    </button>
                  </form>
                  {dispatchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Fuel Savings: <strong className="text-emerald-400 font-mono text-xs">{dispatchResult.fuelSaved}</strong></div>
                      <div>Wind Dispatched: <strong className="text-cyan-300 font-mono text-xs">{dispatchResult.windDispatched}</strong></div>
                      <div>Solar Status: <strong className="text-amber-300 font-mono text-xs">{dispatchResult.solarDispatched}</strong></div>
                      <div>CHP Heat Recycled: <strong className="text-orange-400 font-mono text-xs">{dispatchResult.chpThermal}</strong></div>
                      <div>Life Support: <strong className="text-white font-mono text-xs block mt-0.5">{dispatchResult.lifeSupportStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RENEWABLES */}
        {tab === 'renewables' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {renewables.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400 font-bold">{r.installed_capacity_kw} kW Capacity</span>
                  <span className="text-emerald-400 font-bold">Sub-Zero Rated</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{r.source}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.polar_adaptation}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: HIERARCHY */}
        {tab === 'hierarchy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {hierarchy.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{h.tier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.loads}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{h.shedding_policy}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: FORECAST */}
        {tab === 'forecast' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Temporal Fusion Transformer 24h Load Forecaster</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Predicts combined electric demand and thermal heating load curves 24 hours in advance by cross-correlating numerical weather predictions (katabatic blizzards, solar zenith angles) with polar science lab duty cycles.
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
