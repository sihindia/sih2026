import React, { useState } from 'react';
import { 
  Mountain, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Satellite, 
  Wrench, 
  RefreshCw, 
  Layers, 
  TrendingUp, 
  Activity, 
  Globe 
} from 'lucide-react';

import minesData from './data/manganese_mines_and_production_shortfalls.json';
import indicesData from './data/satellite_spectral_exploration_indices.json';
import fleetData from './data/hemm_machinery_and_dispatch_fleet.json';
import statsData from './data/bhudhatri_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'bn'>('en');
  const [mines, setMines] = useState(minesData);
  const [selectedMine, setSelectedMine] = useState(minesData[0]);
  const [indices, setIndices] = useState(indicesData);
  const [fleet, setFleet] = useState(fleetData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'mines' | 'satellite' | 'mitigator' | 'fleet' | 'stats'>('mines');

  // Interactive AI Production Shortfall Optimizer Simulator
  const [isMitigating, setIsMitigating] = useState(false);
  const [mitResult, setMitResult] = useState<any>({
    correctiveAction: "Re-deploy 2 electric jumbo drills to Western Stope; advance sub-surface pumps by 48h",
    satelliteValidation: "Sentinel-2 SWIR Fault Zone Water Ingress successfully bypassed",
    recoveredTarget: "8,200 MT Weekly Ore Target Met (100% Full Recovery)",
    gradeCompliance: "46.5% High-Grade Metallurgical Mn preserved for Bhilai & Rourkela Steel Plants",
    machineryHealth: "HEMM Fleet Availability maintained at 96.5% uptime"
  });

  const handleMitigate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMitigating(true);
    setTimeout(() => {
      setMitResult({
        correctiveAction: "Re-deploy 2 electric jumbo drills to Western Stope; advance sub-surface pumps by 48h",
        satelliteValidation: "Sentinel-2 SWIR Fault Zone Water Ingress successfully bypassed",
        recoveredTarget: "8,200 MT Weekly Ore Target Met (100% Full Recovery)",
        gradeCompliance: "46.5% High-Grade Metallurgical Mn preserved for Bhilai & Rourkela Steel Plants",
        machineryHealth: "HEMM Fleet Availability maintained at 96.5% uptime"
      });
      setIsMitigating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Mountain className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF STEEL • MOIL BHUDHATRI 360 SPACE MINING TECH • SIH26009</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MOIL BhuDhatri: Space Tech &amp; AI for Manganese Reserves &amp; Production Shortfall
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              MOIL Limited &amp; Ministry of Steel Satellite Remote Sensing (Sentinel-2 SWIR / Landsat-9 TIRS), Subsurface Manganese Alteration Delineation, Real-Time Mine Dispatch &amp; Blasting Bottleneck Resolution
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mines', label: '⛏️ Mines & Production', count: mines.length },
            { id: 'satellite', label: '🛰️ Space Tech & SWIR Indices', count: indices.length },
            { id: 'mitigator', label: '🚨 Production Shortfall Mitigator' },
            { id: 'fleet', label: '🚜 HEMM Fleet & Machinery', count: fleet.length },
            { id: 'stats', label: '📊 BhuDhatri Telemetry' }
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
            VIEW 1: MINES
           ========================================================================= */}
        {activeTab === 'mines' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mines.map((m) => (
                <button
                  key={m.mine_id}
                  onClick={() => setSelectedMine(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMine.mine_id === m.mine_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{m.mine_id}</span>
                    <span className="text-emerald-400">{m.ore_grade_mn_pct}% Mn</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {m.mine_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{m.state} • {m.mine_type}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Target: {m.weekly_target_mt} MT</span>
                    <span className="text-cyan-400">{m.target_recovery_pct}% Met</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedMine.mine_id} • {selectedMine.state} ({selectedMine.district})</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMine.mine_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMine.shortfall_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">BOTTLENECK &amp; SATELLITE-GUIDED CORRECTIVE ACTION:</span>
                  <div className="text-white font-sans text-xs">
                    Active Bottleneck: <strong className="text-rose-400">{selectedMine.active_bottleneck}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Corrective AI Dispatch: {selectedMine.ai_corrective_action}
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Space Observation: {selectedMine.satellite_spectral_anomaly}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Grade &amp; Recovery: {selectedMine.ore_grade_mn_pct}% Mn Grade | Recovered: {selectedMine.recovered_production_mt} MT / Week
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RECOVERED WEEKLY ORE</span><span className="text-emerald-400 font-bold">{selectedMine.recovered_production_mt.toLocaleString()} MT / Week</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ORE GRADE PURITY</span><span className="text-cyan-400 font-bold">{selectedMine.ore_grade_mn_pct}% Mn Metallurgical</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('satellite')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Sentinel-2 &amp; Landsat-9 Satellite Exploration Indices ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Production Recovery Simulator</span>
                  </h4>
                  <form onSubmit={handleMitigate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">MOIL Mining Unit</label>
                      <input type="text" readOnly value={`${selectedMine.mine_name} (${selectedMine.weekly_target_mt} MT Target)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isMitigating} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isMitigating ? 'animate-spin' : ''}`} />
                      <span>{isMitigating ? 'Optimizing Shovel & Blasting Schedules...' : 'Execute AI Shortfall Mitigation'}</span>
                    </button>
                  </form>
                  {mitResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Action: <strong className="text-emerald-400 font-mono text-xs">{mitResult.correctiveAction}</strong></div>
                      <div>Space Validation: <span className="text-cyan-300 text-xs">{mitResult.satelliteValidation}</span></div>
                      <div>Output: <strong className="text-amber-300 font-mono text-xs">{mitResult.recoveredTarget}</strong></div>
                      <div>Grade Compliance: <strong className="text-emerald-300 font-mono text-xs">{mitResult.gradeCompliance}</strong></div>
                      <div>Machinery Health: <strong className="text-white font-mono text-xs block mt-0.5">{mitResult.machineryHealth}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SATELLITE */}
        {tab === 'satellite' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {indices.map((idx, i) => (
              <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{idx.sensor}</span>
                <h4 className="font-bold text-sm text-white font-sans">{idx.index_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Bands: {idx.bands_used} ({idx.spatial_resolution})</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Response: {idx.spectral_response}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: MITIGATOR */}
        {tab === 'mitigator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Satellite className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Space-Assisted Mine Production Shortfall Optimization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Synthesizing Sentinel-2 multi-spectral manganese alteration ratios and Landsat thermal inertia with pit-level telemetry to prevent steel plant supply crunches.
            </p>
          </div>
        )}

        {/* VIEW 4: FLEET */}
        {tab === 'fleet' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {fleet.map((f, i) => (
              <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">{f.operational_availability_pct}% Uptime</span>
                  <span className="text-amber-400 font-bold">{f.equipment_id}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{f.type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Location: {f.assigned_mine}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Status: {f.status}</div>
              </div>
            ))}
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
