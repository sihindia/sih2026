import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  GitMerge, 
  Sliders, 
  Train, 
  ShieldCheck, 
  Activity, 
  Globe 
} from 'lucide-react';

import corridorsData from './data/rail_corridors_and_capacities.json';
import shadowBlocksData from './data/multi_dept_shadow_blocks.json';
import trainImpactsData from './data/train_headway_punctuality_impacts.json';
import controllerLogsData from './data/section_controller_safety_logs.json';
import statsData from './data/railblock_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'mr' | 'ta'>('en');
  const [corridors, setCorridors] = useState(corridorsData);
  const [selectedCorridor, setSelectedCorridor] = useState(corridorsData[0]);
  const [shadowBlocks, setShadowBlocks] = useState(shadowBlocksData);
  const [selectedShadow, setSelectedShadow] = useState(shadowBlocksData[0]);
  const [trainImpacts, setTrainImpacts] = useState(trainImpactsData);
  const [controllerLogs, setControllerLogs] = useState(controllerLogsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'planner' | 'harmonizer' | 'impacts' | 'controller' | 'analytics'>('planner');

  // Generator State
  const [includeTMS, setIncludeTMS] = useState(true);
  const [includeTRD, setIncludeTRD] = useState(true);
  const [includeSNT, setIncludeSNT] = useState(true);
  const [targetDur, setTargetDur] = useState(2.5);
  const [genPlan, setGenPlan] = useState<any>(null);

  const runShadowGen = () => {
    const depts = [];
    if (includeTMS) depts.push('P-Way (TMS)');
    if (includeTRD) depts.push('Traction (TRD/OHE)');
    if (includeSNT) depts.push('Signaling (S&T)');
    const p = {
      block_id: `SHADOW-NCR-${Math.floor(Math.random() * 900 + 100)}`,
      scheduled_window: "02:15 AM – 04:45 AM (Night Lean Period)",
      duration_hours: targetDur,
      participating_departments: depts,
      delay_minutes_saved: Math.floor(Math.random() * 60 + 120),
      optimization_efficiency_score: "97.4%",
      cois_safety_token: `AUTH-COIS-${Math.floor(Math.random() * 90000 + 10000)}`,
      allocated_machinery: ["09-3X Tamping #104", "OHE Wagon #8812", "S&T EI Test Rig"]
    };
    setGenPlan(p);
    setSelectedShadow(p as any);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Layers className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>MINISTRY OF RAILWAYS • CRIS / COIS PLATFORM • SIH26027</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              RailBlock AI: Automatic Block Planning to Maximize Asset Availability for Train Operations
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Indian Railways Integrated Maintenance Operations: Multi-Departmental Shadow Harmonization (TMS + TDMS + SMMS), Section Controller Token Interlock &amp; Passenger Punctuality Preservation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'planner', label: '🚆 Live Corridor Gantt & Blocks', count: corridors.length },
            { id: 'harmonizer', label: '🧩 Multi-Dept Shadow Generator' },
            { id: 'impacts', label: '⚡ Train Headway & Punctuality', count: trainImpacts.length },
            { id: 'controller', label: '🛡️ Section Controller Safety Portal', count: controllerLogs.length },
            { id: 'analytics', label: '📊 RailBlock Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: PLANNER
           ========================================================================= */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {corridors.map((c) => (
                <button
                  key={c.corridor_id}
                  onClick={() => setSelectedCorridor(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCorridor.corridor_id === c.corridor_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{c.corridor_id}</span>
                    <span className="text-emerald-400">{c.punctuality_gain_pct}% Gain</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.corridor_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.railway_zone} • {c.section_length_km} Km</div>
                  <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.daily_train_density} Trains/Day</span>
                    <span className="text-cyan-400">-{c.delay_mins_saved_daily} mins</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedCorridor.corridor_id} • {selectedCorridor.railway_zone}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCorridor.corridor_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCorridor.active_shadow_blocks_count} Active Shadow Windows
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">CORRIDOR CAPACITY &amp; BOTTLENECK PROFILE:</span>
                  <div className="text-white font-sans text-xs">
                    Capacity Utilization: <strong className="text-purple-300">{selectedCorridor.line_capacity_utilization_pct}% (Over-Saturated)</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Punctuality Improvement: +{selectedCorridor.punctuality_gain_pct}% | Freight Throughput: +{selectedCorridor.freight_throughput_gain_pct}%
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Critical Bottleneck: {selectedCorridor.critical_bottleneck}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Cumulative Daily Delay Prevented: {selectedCorridor.delay_mins_saved_daily} Minutes Saved across Fleet
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SECTION LENGTH</span><span className="text-purple-400 font-bold">{selectedCorridor.section_length_km} Kilometers</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DAILY TRAIN DENSITY</span><span className="text-cyan-400 font-bold">{selectedCorridor.daily_train_density} Trains/Day</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('harmonizer')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch AI Multi-Departmental Shadow Generator ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <GitMerge className="w-4 h-4 text-purple-400" />
                    <span>Shadow Composition Detail</span>
                  </h4>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="text-purple-400 font-bold text-[10px] uppercase">COMBINED FLEET ALLOCATION:</div>
                    {selectedShadow.allocated_machinery && selectedShadow.allocated_machinery.map((m: string, i: number) => (
                      <div key={i} className="flex justify-between"><span>Unit #{i + 1}:</span><span className="text-white font-bold">{m}</span></div>
                    ))}
                  </div>
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
                    <div className="text-emerald-400 font-bold text-[10px] uppercase">COIS SAFETY TOKEN:</div>
                    <div className="text-white font-bold text-sm mt-0.5">{selectedShadow.cois_safety_token}</div>
                    <div className="text-[10px] text-slate-400">Power isolation verified &amp; interlocked on 25kV OHE feeder.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HARMONIZER */}
        {activeTab === 'harmonizer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Multi-Departmental Shadow Generator</span>
              </h4>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input type="checkbox" checked={includeTMS} onChange={(e) => setIncludeTMS(e.target.checked)} className="accent-purple-500 rounded" />
                  <span>Track Engineering (P-Way 09-3X Tamping)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input type="checkbox" checked={includeTRD} onChange={(e) => setIncludeTRD(e.target.checked)} className="accent-purple-500 rounded" />
                  <span>Electrical Traction (TRD / 25kV OHE Wire)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input type="checkbox" checked={includeSNT} onChange={(e) => setIncludeSNT(e.target.checked)} className="accent-purple-500 rounded" />
                  <span>Signal &amp; Telecom (S&amp;T / Electronic Interlocking)</span>
                </label>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Target Duration:</span><span className="font-mono text-cyan-400">{targetDur} Hours</span></div>
                <input type="range" min="1.5" max="4.5" step="0.5" value={targetDur} onChange={(e) => setTargetDur(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <button onClick={runShadowGen} className="w-full py-3.5 bg-purple-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                Generate AI Harmonized Shadow Plan
              </button>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h4 className="font-bold text-sm text-white font-sans">Optimized Shadow Plan</h4>
              {genPlan ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950"><span className="text-slate-500 block text-[9px]">EFFICIENCY</span><span className="text-xl font-bold text-purple-400">{genPlan.optimization_efficiency_score}</span></div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">SAVED DELAY</span><span className="text-xl font-bold text-emerald-400">-{genPlan.delay_minutes_saved} mins</span></div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div>Window: <span className="text-white font-bold">{genPlan.scheduled_window}</span></div>
                    <div>Combined: <span className="text-cyan-400">{genPlan.participating_departments.join(' + ')}</span></div>
                  </div>
                  <div className="p-3.5 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <span className="text-xs text-white font-bold">{genPlan.cois_safety_token}</span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold rounded text-[10px] font-sans">Verified</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-sans">Click "Generate AI Harmonized Shadow Plan" to merge requests.</div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: IMPACTS */}
        {activeTab === 'impacts' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Train className="w-4 h-4 text-purple-400" />
              <span>Real-Time Train Headway &amp; Punctuality Preservation</span>
            </h4>
            <div className="space-y-3">
              {trainImpacts.map((t) => (
                <div key={t.train_number} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-purple-400 font-bold text-[10px]">TRAIN #{t.train_number}</span>
                      <h5 className="font-bold text-white font-sans text-xs mt-0.5">{t.train_name}</h5>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{t.predicted_arrival}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-slate-900 rounded-xl text-emerald-400 font-bold">-{t.delay_prevented_mins} mins delay prevented</div>
                    <div className="p-2 bg-slate-900 rounded-xl text-cyan-400 font-bold truncate">{t.dispatch_routing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: CONTROLLER */}
        {activeTab === 'controller' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-purple-500/40 pb-3">
              <div>
                <span className="text-purple-400 font-bold text-[10px] uppercase">COIS SECTION CONTROLLER CONSOLE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Line Block Grant &amp; Track Fitness Portal</h4>
              </div>
              <ShieldCheck className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-3">
              {controllerLogs.map((l) => (
                <div key={l.log_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex justify-between"><span className="text-purple-400 font-bold">{l.log_id} • {l.station}</span><span className="text-emerald-400 font-bold">{l.action_taken}</span></div>
                  <div className="text-slate-400 text-[10px]">Controller: {l.controller_officer} • {l.log_timestamp}</div>
                  <p className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">{l.log_notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold text-[10px] uppercase">{s.metric}</span>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <p className="text-slate-400 text-[11px] font-sans">{s.trend}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
