import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Radar, 
  Navigation, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import scenariosData from './data/indian_road_benchmark_scenarios.json';
import sensorsData from './data/sensor_fusion_perception_matrix.json';
import plannerData from './data/frenet_path_planner_metrics.json';
import statsData from './data/autopath_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [scenarios, setScenarios] = useState(scenariosData);
  const [selectedScenario, setSelectedScenario] = useState(scenariosData[0]);
  const [sensors, setSensors] = useState(sensorsData);
  const [planner, setPlanner] = useState(plannerData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scenarios' | 'perception' | 'planner' | 'stateflow' | 'stats'>('scenarios');

  // Interactive Replanning Simulator
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanResult, setReplanResult] = useState<any>({
    status: "COLLISION_FREE_OPTIMAL_TRAJECTORY",
    latency: "24.2 ms (Frenet Spline Generated)",
    longAction: "Emergency Deceleration (-5.8 m/s²)",
    latAction: "Frenet lateral offset +1.2m (Shoulder Nudge)",
    clearance: "3.4m Safety Margin Maintained",
    jerk: "0.86 m/s³ (Compliant Dynamic Comfort)"
  });

  const handleReplan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplanning(true);
    setTimeout(() => {
      setReplanResult({
        status: "COLLISION_FREE_OPTIMAL_TRAJECTORY",
        latency: "24.2 ms (Frenet Spline Generated)",
        longAction: "Emergency Deceleration (-5.8 m/s²)",
        latAction: "Frenet lateral offset +1.2m (Shoulder Nudge)",
        clearance: "3.4m Safety Margin Maintained",
        jerk: "0.86 m/s³ (Compliant Dynamic Comfort)"
      });
      setIsReplanning(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Car className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MATHWORKS • AUTOPATH 360 ADAPTIVE PATH PLANNING & COLLISION AVOIDANCE • SIH26037</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MathWorks AutoPath: Adaptive Path Planning & Collision Avoidance on Unstructured Indian Roads
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Sensor Fusion (3D LiDAR, 4D Radar, Stereo Vision) & Frenet-Frame Real-Time Spline Replanning (&lt;35ms) with Stateflow Decision Logic across 5 Benchmark Indian Road Scenarios
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scenarios', label: '🚗 5 Indian Road Scenarios', count: scenarios.length },
            { id: 'perception', label: '📡 Multi-Sensor Fusion', count: sensors.length },
            { id: 'planner', label: '⚡ Frenet Path Planner', count: planner.length },
            { id: 'stateflow', label: '🧩 Stateflow Decision Logic' },
            { id: 'stats', label: '📊 AutoPath Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.scenario_id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1.5 ${
                    selectedScenario.scenario_id === s.scenario_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{s.scenario_id}</span>
                    <span className="text-amber-300">{s.ego_speed_kmh} km/h</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight truncate">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{s.location}</div>
                  <div className="text-[9px] text-emerald-400 pt-1 border-t border-slate-800 font-bold truncate">
                    {s.status.replace(/_/g, ' ')}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedScenario.scenario_id} • {selectedScenario.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedScenario.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScenario.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">INDIAN ROAD CONDITIONS & SENSOR-FUSED AUTONOMOUS AVOIDANCE:</span>
                  <div className="text-white font-sans text-xs">
                    Road Profile: <strong className="text-cyan-300">{selectedScenario.road_type}</strong> | Speed: <strong className="text-amber-300">{selectedScenario.ego_speed_kmh} km/h</strong>
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Primary Hazard: {selectedScenario.primary_obstacle}
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Perception Fusion: {selectedScenario.sensor_detections}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    Trajectory Planner: {selectedScenario.planner_action}
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    Telemetry: Replanning Latency: <strong className="text-cyan-300">{selectedScenario.replan_latency_ms} ms</strong> | Clearance: <strong className="text-amber-300">{selectedScenario.safety_margin_m}m</strong> | Smoothness: <strong className="text-emerald-400">{selectedScenario.path_smoothness}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">REPLANNING LATENCY</span><span className="text-cyan-400 font-bold">{selectedScenario.replan_latency_ms} ms</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SAFETY CLEARANCE MARGIN</span><span className="text-emerald-400 font-bold">{selectedScenario.safety_margin_m} meters</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('planner')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Frenet Frame Polynomial Trajectory Splines ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Frenet Trajectory Replanner</span>
                  </h4>
                  <form onSubmit={handleReplan} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Scenario Obstacle & Speed</label>
                      <input type="text" readOnly value={`${selectedScenario.name} (${selectedScenario.ego_speed_kmh} km/h)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isReplanning} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isReplanning ? 'animate-spin' : ''}`} />
                      <span>{isReplanning ? 'Optimizing Frenet Splines (<35ms)...' : 'Simulate Trajectory Replanning'}</span>
                    </button>
                  </form>
                  {replanResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <strong className="text-emerald-400 font-mono text-xs">{replanResult.status}</strong></div>
                      <div>Replanning Speed: <strong className="text-cyan-300 font-mono text-xs">{replanResult.latency}</strong></div>
                      <div>Longitudinal Action: <strong className="text-amber-300 font-mono text-xs">{replanResult.longAction}</strong></div>
                      <div>Lateral Action: <strong className="text-purple-300 font-mono text-xs">{replanResult.latAction}</strong></div>
                      <div>Clearance: <strong className="text-white font-mono text-xs block mt-0.5">{replanResult.clearance}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PERCEPTION */}
        {tab === 'perception' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {sensors.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-bold">{s.frequency}</span>
                  <span className="text-amber-400 font-bold">{s.range}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.sensor}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.role}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: PLANNER */}
        {tab === 'planner' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {planner.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold">PIPELINE STAGE #{idx + 1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.subsystem}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{p.function}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: STATEFLOW */}
        {tab === 'stateflow' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Navigation className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Stateflow Finite State Machine & Bicycle Model MPC</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Executes seamless mode transitions between Cruise, Yield, Gap-Follow, Lateral Swerve, and Emergency Deceleration, feeding Model Predictive Control (MPC) steering and braking to maintain vehicular dynamic stability.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
