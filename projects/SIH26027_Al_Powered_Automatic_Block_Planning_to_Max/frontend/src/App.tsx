import React, { useState } from 'react';
import { 
  Train, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  QrCode, 
  Sliders, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  Play, 
  Radio, 
  Gavel,
  ChevronRight,
  Printer,
  Calendar,
  Lock,
  GitMerge
} from 'lucide-react';

import corridorsData from './data/rail_corridors.json';
import requestsData from './data/departmental_requests.json';
import shadowBlocksData from './data/shadow_blocks.json';
import impactsData from './data/train_impacts.json';
import logsData from './data/controller_logs.json';

export default function App() {
  const [corridors, setCorridors] = useState(corridorsData);
  const [selectedCorridor, setSelectedCorridor] = useState(corridorsData[0]);
  const [requests, setRequests] = useState(requestsData);
  const [shadowBlocks, setShadowBlocks] = useState(shadowBlocksData);
  const [selectedShadow, setSelectedShadow] = useState(shadowBlocksData[0]);
  const [activeTab, setActiveTab] = useState<'planner' | 'harmonizer' | 'impacts' | 'controller' | 'analytics'>('planner');

  // Generator State
  const [includeTMS, setIncludeTMS] = useState(true);
  const [includeTRD, setIncludeTRD] = useState(true);
  const [includeSNT, setIncludeSNT] = useState(true);
  const [targetDuration, setTargetDuration] = useState(2.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleGenerateShadow = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const depts = [];
      if (includeTMS) depts.push('P-Way (TMS)');
      if (includeTRD) depts.push('Traction (TRD/OHE)');
      if (includeSNT) depts.push('Signaling (S&T)');

      const newPlan = {
        shadow_id: `SHADOW-NCR-2026-${Math.floor(Math.random() * 900 + 100)}`,
        corridor_id: selectedCorridor.corridor_id,
        corridor_name: selectedCorridor.name,
        scheduled_window: "02:15 AM – 04:45 AM (Night Lean Window)",
        duration_hours: targetDuration,
        departments_combined: depts,
        machines_deployed: ["09-3X Tamping Unit #104", "OHE Tower Wagon #8812", "S&T EI Test Rig"],
        section: "Aligarh – Hathras (Km 922 to 934 Down Line)",
        detention_saving_minutes: Math.floor(Math.random() * 80 + 120),
        passenger_punctuality_impact: "ZERO_DETENTION (Routed via Middle Loop)",
        freight_trains_diverted: 3,
        power_isolation_cleared: true,
        ai_harmonization_score: Number((Math.random() * 3 + 96).toFixed(1)),
        controller_approval_token: `AUTH-NCR-COIS-${Math.floor(Math.random() * 90000 + 10000)}`
      };

      setGeneratedPlan(newPlan);
      setSelectedShadow(newPlan);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Layers className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>MINISTRY OF RAILWAYS (INDIAN RAILWAYS) • CRIS / COIS PLATFORM • SIH26027</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AI-Powered Automatic Block Planning & Corridor Harmonization System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Multi-Departmental Maintenance Harmonization (TMS + TDMS + SMMS), Shadow Block Optimization & Punctuality Protection
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-purple-950/80 text-purple-300 border border-purple-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>COIS Block Engine Active</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'planner', label: '🚆 Live Corridor Gantt & Blocks', count: corridors.length },
            { id: 'harmonizer', label: '🧩 Multi-Dept Shadow Generator', count: requests.length },
            { id: 'impacts', label: '⚡ Train Detention & Punctuality Gain', count: impactsData.length },
            { id: 'controller', label: '🛡️ Section Controller Safety Portal' },
            { id: 'analytics', label: '📊 Throughput & Capacity Analytics' }
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
            VIEW 1: LIVE CORRIDOR GANTT & BLOCKS
           ========================================================================= */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            {/* Corridor Selector Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🛤️ HIGH DENSITY NETWORK (HDN) RAIL CORRIDORS</span>
                <span className="text-purple-400 font-mono">Select corridor to inspect shadow blocks</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {corridors.map((c) => (
                  <button
                    key={c.corridor_id}
                    onClick={() => setSelectedCorridor(c)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedCorridor.corridor_id === c.corridor_id
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-1 ring-purple-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-purple-400 font-bold">{c.corridor_id.split('-')[1]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{c.name.split('(')[0]}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{c.zone} • {c.section_length_km} Km</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">+{c.punctuality_gain_pct}% Punctuality</span>
                      <span className="text-cyan-300">-{c.train_detention_saved_mins}m Delay</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Active Shadow Blocks on Corridor */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-purple-400">{selectedCorridor.corridor_id}</span>
                      <h3 className="font-bold text-base text-white mt-0.5">{selectedCorridor.name}</h3>
                      <p className="text-xs text-slate-400">Line Capacity Utilization: {selectedCorridor.line_capacity_utilization_pct}% (Over-Saturated)</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      {selectedCorridor.active_shadow_blocks} Active Shadow Windows
                    </span>
                  </div>

                  {/* Active Shadow Blocks Cards */}
                  <div className="space-y-3">
                    {shadowBlocks.map((sb) => {
                      const isSelected = selectedShadow?.shadow_id === sb.shadow_id;
                      return (
                        <button
                          key={sb.shadow_id}
                          onClick={() => setSelectedShadow(sb)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all space-y-2 ${
                            isSelected
                              ? 'bg-slate-950 border-purple-500 shadow-lg ring-1 ring-purple-400'
                              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-purple-400">{sb.shadow_id}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono">
                                  {sb.ai_harmonization_score}% Efficiency
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-white mt-1">{sb.scheduled_window}</h4>
                              <div className="text-[11px] text-slate-400 mt-0.5">{sb.section}</div>
                            </div>
                            <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                              {sb.duration_hours} Hours
                            </span>
                          </div>

                          <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] flex justify-between text-slate-300">
                            <span>Depts: <strong className="text-white">{sb.departments_combined.join(' + ')}</strong></span>
                            <span className="text-emerald-400 font-bold">-{sb.detention_saving_minutes} mins Saved</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5: Live Departmental Machines & Track Allocation Detail */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <GitMerge className="w-4 h-4 text-purple-400" />
                      <span>Shadow Window Composition</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      {selectedShadow.shadow_id}
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                      <span className="text-purple-400 font-bold text-[10px] uppercase block">COMBINED MACHINE FLEET:</span>
                      {selectedShadow.machines_deployed.map((m: string, idx: number) => (
                        <div key={idx} className="flex justify-between text-slate-300">
                          <span>Machine #{idx + 1}:</span>
                          <span className="text-white font-bold">{m}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                      <span className="text-cyan-400 font-bold text-[10px] uppercase block">SECTIONAL OPERATIONAL IMPACT:</span>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Passenger Trains:</span>
                        <span className="text-emerald-400 font-bold">{selectedShadow.passenger_punctuality_impact}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-500">Freight Routing:</span>
                        <span className="text-amber-400">{selectedShadow.freight_trains_diverted} Diverted via Loops</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-slate-300">
                      <div className="text-emerald-400 font-bold uppercase text-[10px]">DIGITAL SAFETY TOKEN:</div>
                      <div className="text-white font-bold mt-0.5">{selectedShadow.controller_approval_token}</div>
                      <div className="text-[10px] text-slate-400">Power isolation verified & interlocked.</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('controller')}
                      className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 transition-all shadow-md font-sans"
                    >
                      <span>Authorize Block in Controller Console</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: MULTI-DEPT SHADOW GENERATOR
           ========================================================================= */}
        {activeTab === 'harmonizer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Multi-Departmental Shadow Block Harmonizer</span>
              </h3>
              <p className="text-slate-400">Select pending departmental requisitions to generate an AI-optimized synchronized shadow block.</p>

              <div className="space-y-4 pt-2">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 font-bold text-[10px] uppercase block font-mono">INCLUDE DEPARTMENTS IN SHADOW WINDOW:</span>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={includeTMS} onChange={(e) => setIncludeTMS(e.target.checked)} className="accent-purple-500 rounded" />
                    <span>Track Engineering (P-Way / TMS 09-3X Tamping)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={includeTRD} onChange={(e) => setIncludeTRD(e.target.checked)} className="accent-purple-500 rounded" />
                    <span>Electrical Traction (TRD / 25kV OHE Catenary Wire)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={includeSNT} onChange={(e) => setIncludeSNT(e.target.checked)} className="accent-purple-500 rounded" />
                    <span>Signal & Telecom (S&T / Electronic Interlocking)</span>
                  </label>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Target Block Duration (Hours)</span>
                    <span className="font-mono text-cyan-400">{targetDuration} Hours</span>
                  </div>
                  <input
                    type="range" min="1.5" max="4.5" step="0.5" value={targetDuration}
                    onChange={(e) => setTargetDuration(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <button
                  onClick={handleGenerateShadow}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Running AI Shadow Optimization Engine...' : 'Generate AI Harmonized Shadow Plan'}</span>
                </button>
              </div>
            </div>

            {/* Generated Plan Output */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Harmonized Shadow Block Result</span>
              </h4>

              {generatedPlan ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                      <span className="text-slate-500 block text-[9px]">EFFICIENCY SCORE</span>
                      <span className="text-xl font-black text-purple-400">{generatedPlan.ai_harmonization_score}%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px]">DETENTION SAVED</span>
                      <span className="text-xl font-black text-emerald-400">-{generatedPlan.detention_saving_minutes} mins</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span>Optimized Window:</span><span className="text-white font-bold">{generatedPlan.scheduled_window}</span></div>
                    <div className="flex justify-between"><span>Combined Work:</span><span className="text-cyan-400">{generatedPlan.departments_combined.join(' + ')}</span></div>
                    <div className="flex justify-between"><span>Safety Interlocking:</span><span className="text-emerald-400 font-bold">Automatic Token Issued</span></div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">COIS Approval Token</span>
                      <span className="text-lg font-black text-white font-mono">{generatedPlan.controller_approval_token}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Verified
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Layers className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Generate AI Harmonized Shadow Plan" to merge maintenance requests.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: TRAIN DETENTION & PUNCTUALITY IMPACTS
           ========================================================================= */}
        {activeTab === 'impacts' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
            <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Train className="w-4 h-4 text-purple-400" />
              <span>Real-Time Train Headway & Punctuality Preservation</span>
            </h3>

            <div className="space-y-3">
              {impactsData.map((t) => (
                <div key={t.train_no} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-purple-400 font-bold text-[10px]">TRAIN #{t.train_no}</span>
                      <h4 className="font-bold text-white font-sans text-xs mt-0.5">{t.train_name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {t.shadow_block_eta}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 bg-slate-900 rounded-xl text-slate-300">
                      <span className="text-slate-500 block text-[9px]">DELAY PREVENTED</span>
                      <span className="text-emerald-400 font-bold">-{t.delay_prevented_mins} minutes</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl text-slate-300">
                      <span className="text-slate-500 block text-[9px]">DISPATCH ROUTING</span>
                      <span className="text-cyan-400 font-bold truncate block">{t.routing_action}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SECTION CONTROLLER SAFETY PORTAL
           ========================================================================= */}
        {activeTab === 'controller' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-purple-500/40 pb-4">
              <div>
                <span className="text-purple-400 font-bold text-[10px] uppercase">INDIAN RAILWAYS • CONTROL OFFICE INFORMATION SYSTEM (COIS)</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Section Controller Line Block Grant Console</h3>
                <p className="text-slate-400 text-[11px]">Digital Token Exchange & Interlocking Verification</p>
              </div>
              <Lock className="w-10 h-10 text-purple-400" />
            </div>

            <div className="space-y-3">
              {logsData.map((l) => (
                <div key={l.log_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-bold">{l.log_id} • {l.station}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{l.action}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Controller: {l.controller} • {l.timestamp}</div>
                  <p className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">{l.note}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-purple-950/40 border border-purple-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-purple-400 font-bold text-[10px] uppercase block">CURRENT BLOCK STATUS:</span>
                <span className="text-lg font-black text-white font-sans">INTERLOCKED & GRANTED (AUTH-NCR-COIS-2026-08194)</span>
              </div>
              <button onClick={() => alert("Block safety certificate validated.")} className="px-4 py-2 bg-purple-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Print Fit Certificate
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: CORRIDOR THROUGHPUT ANALYTICS
           ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-purple-400 font-bold text-[10px] uppercase">CAPACITY GAIN</span>
              <div className="text-3xl font-black text-white">+22.4%</div>
              <p className="text-slate-400 text-[11px] font-sans">Increase in freight path availability during night slots.</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">PUNCTUALITY RETENTION</span>
              <div className="text-3xl font-black text-emerald-400">+18.5%</div>
              <p className="text-slate-400 text-[11px] font-sans">Premier mail/express trains punctuality preserved.</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">MACHINE UTILIZATION</span>
              <div className="text-3xl font-black text-cyan-400">88.4%</div>
              <p className="text-slate-400 text-[11px] font-sans">09-3X Tamping and BCM machine productive hours.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
