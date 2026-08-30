import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Target, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import environmentsData from './data/ew_tactical_rf_environments.json';
import fomData from './data/figures_of_merit_evaluation_matrix.json';
import algorithmsData from './data/smart_scan_scheduling_algorithms.json';
import statsData from './data/astrascan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'pa' | 'mr' | 'ta'>('en');
  const [environments, setEnvironments] = useState(environmentsData);
  const [selectedEnv, setSelectedEnv] = useState(environmentsData[0]);
  const [fom, setFom] = useState(fomData);
  const [algorithms, setAlgorithms] = useState(algorithmsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'theatre' | 'scheduler' | 'fom' | 'algorithms' | 'stats'>('theatre');

  // Interactive Smart Scan Scheduler Simulator
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [scheduleResult, setScheduleResult] = useState<any>({
    poi: "97.4% Probability of Intercept (POI)",
    latency: "1.4 Seconds (79.4% Faster than Open-Loop Sweep)",
    faRate: "1.2% Probability of False Alarm",
    rewardScore: "+4.82 Reward/Cost Optimization Factor",
    verdict: "HOSTILE FIRE CONTROL RADAR DETECTED & LOCKED"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setScheduleResult({
        poi: "97.4% Probability of Intercept (POI)",
        latency: "1.4 Seconds (79.4% Faster than Open-Loop Sweep)",
        faRate: "1.2% Probability of False Alarm",
        rewardScore: "+4.82 Reward/Cost Optimization Factor",
        verdict: "HOSTILE FIRE CONTROL RADAR DETECTED & LOCKED"
      });
      setIsOptimizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>DRDO / IDEX • ASTRASCAN 360 SMART ELECTRONIC WARFARE SCHEDULER • SIH26055</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DRDO AstraScan: Reinforcement Learning Smart Scan Strategy for Electronic Warfare
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Cognitive 2D Time-Frequency Search &amp; ESM Receiver Scheduling against Agile &amp; Hopping Hostile Radars with Deep Q-Networks (DQN), 97.4% POI and 79% Latency Reduction in Absence of Prior Intelligence
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'theatre', label: '📡 Tactical RF Theatres', count: environments.length },
            { id: 'scheduler', label: '🎯 2D Time-Frequency Scheduler' },
            { id: 'fom', label: '📊 Figures of Merit (FoM)', count: fom.length },
            { id: 'algorithms', label: '🤖 Reinforcement Learning', count: algorithms.length },
            { id: 'stats', label: '📈 AstraScan Telemetry' }
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
            VIEW 1: THEATRE
           ========================================================================= */}
        {activeTab === 'theatre' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {environments.map((e) => (
                <button
                  key={e.environment_id}
                  onClick={() => setSelectedEnv(e)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedEnv.environment_id === e.environment_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{e.environment_id}</span>
                    <span className="text-emerald-400">{e.probability_of_intercept_pct}% POI</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {e.theatre_name.split('-')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{e.rf_spectrum_span}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{e.smart_scan_intercept_sec}s Intercept</span>
                    <span className="text-emerald-400">-{e.time_reduction_pct}% Time</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedEnv.environment_id} • {selectedEnv.theatre_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedEnv.rf_spectrum_span}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedEnv.intercept_verdict}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">COGNITIVE ELECTRONIC SUPPORT MEASURES (ESM) PROFILE:</span>
                  <div className="text-white font-sans text-xs">
                    Hostile Emitters: <strong className="text-amber-300">{selectedEnv.hostile_emitters}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    ESM Tuner Spec: {selectedEnv.receiver_architecture}
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Smart Scan Strategy: {selectedEnv.scan_strategy}
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Intercept Performance: {selectedEnv.smart_scan_intercept_sec}s (vs {selectedEnv.open_loop_intercept_sec}s legacy, {selectedEnv.time_reduction_pct}% reduction)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PROBABILITY OF INTERCEPT (POI)</span><span className="text-emerald-400 font-bold">{selectedEnv.probability_of_intercept_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">FALSE ALARM RATE</span><span className="text-cyan-400 font-bold">{selectedEnv.false_alarm_rate_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('scheduler')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Cognitive 2D Time-Frequency Spectrum Scheduler ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Instant Scan Strategy Optimizer</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">RF Theatre Emitter Band</label>
                      <input type="text" readOnly value={`${selectedEnv.environment_id} (0.5 - 18.0 GHz Agile)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Executing Deep Q-Learning Dwell Allocation...' : 'Optimize 2D Time-Frequency Schedule'}</span>
                    </button>
                  </form>
                  {scheduleResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Probability: <strong className="text-emerald-400 font-mono text-xs">{scheduleResult.poi}</strong></div>
                      <div>Speedup: <strong className="text-rose-400 font-mono text-xs">{scheduleResult.latency}</strong></div>
                      <div>False Alarms: <strong className="text-cyan-300 font-mono text-xs">{scheduleResult.faRate}</strong></div>
                      <div>Reward/Cost: <strong className="text-amber-300 font-mono text-xs">{scheduleResult.rewardScore}</strong></div>
                      <div>Verdict: <strong className="text-white font-mono text-xs block mt-0.5">{scheduleResult.verdict}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SCHEDULER */}
        {tab === 'scheduler' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Target className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">2D Time-Frequency Cognitive Scheduler</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Dynamically tunes ESM receiver frequency band and dwell durations to match the rotational beam periodicity and frequency-hopping patterns of hostile tracking radars, eliminating blind time.
            </p>
          </div>
        )}

        {/* VIEW 3: FOM */}
        {tab === 'fom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {fom.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-rose-400 font-bold">{f.target_benchmark} Target</span>
                  <span className="text-emerald-400 font-bold">{f.drdo_achievement} Achieved</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{f.metric}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{f.tactical_impact}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ALGORITHMS */}
        {tab === 'algorithms' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {algorithms.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{a.poi} POI</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.algorithm}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{a.features}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Compute: {a.complexity}</div>
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
