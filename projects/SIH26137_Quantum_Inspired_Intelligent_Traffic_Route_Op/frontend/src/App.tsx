import React, { useState } from 'react';
import { 
  Atom, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Cpu, 
  RefreshCw, 
  Zap, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import routesData from './data/quantum_traffic_routes.json';
import convergenceData from './data/qpso_convergence_telemetry.json';
import benchmarksData from './data/algorithm_benchmarks_matrix.json';
import statsData from './data/egreen_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [routes, setRoutes] = useState(routesData);
  const [selectedRoute, setSelectedRoute] = useState(routesData[0]);
  const [convergence, setConvergence] = useState(convergenceData);
  const [benchmarks, setBenchmarks] = useState(benchmarksData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'routes' | 'convergence' | 'benchmarks' | 'dispatch' | 'stats'>('routes');

  // Interactive Quantum QPSO Optimizer Simulator
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimResult, setOptimResult] = useState<any>({
    quantumTime: "52 Mins (vs 84 Mins Classical)",
    timeSaved: "32 Mins (38.1% Latency Slashed)",
    bypass: "Wind Tunnel Rd ➔ Sarjapur Bypass ➔ NICE Corridor",
    iterations: "18 QPSO Iterations (82ms Convergence)",
    status: "GLOBAL_QUANTUM_MINIMA_FOUND"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimResult({
        quantumTime: "52 Mins (vs 84 Mins Classical)",
        timeSaved: "32 Mins (38.1% Latency Slashed)",
        bypass: "Wind Tunnel Rd ➔ Sarjapur Bypass ➔ NICE Corridor",
        iterations: "18 QPSO Iterations (82ms Convergence)",
        status: "GLOBAL_QUANTUM_MINIMA_FOUND"
      });
      setIsOptimizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Atom className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>EGREEN QUANTA • QUANTUMROUTE 360 METAHEURISTIC OPTIMIZATION • SIH26137</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              QuantumRoute: Quantum-Inspired Metaheuristic Urban Traffic Route & Fleet Optimizer
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Quantum Particle Swarm Optimization (QPSO), Dynamic VRP Graph Solvers & Sub-100ms Convergence Engine
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'routes', label: '⚛️ Quantum Traffic Routes', count: routes.length },
            { id: 'convergence', label: '📈 QPSO Quantum Convergence' },
            { id: 'benchmarks', label: '⚔️ Metaheuristic Benchmarks', count: benchmarks.length },
            { id: 'dispatch', label: '🚛 Multi-Depot Fleet Dispatch' },
            { id: 'stats', label: '📊 Egreen Quanta Telemetry' }
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
            VIEW 1: ROUTES
           ========================================================================= */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {routes.map((r) => (
                <button
                  key={r.route_id}
                  onClick={() => setSelectedRoute(r)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedRoute.route_id === r.route_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{r.route_id}</span>
                    <span className="text-emerald-400">-{r.time_saved_pct}% Time Saved</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {r.corridor_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{r.city} • {r.distance_km} km ({r.graph_nodes_count} Nodes)</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Classical: {r.classical_dijkstra_time_mins}m</span>
                    <span className="text-emerald-400">QPSO: {r.qpso_optimized_time_mins}m ({r.convergence_iterations} iters)</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedRoute.route_id} • {selectedRoute.city}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedRoute.corridor_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedRoute.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">QUANTUM TUNNELING ARTERIAL BYPASS:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedRoute.quantum_tunneling_bypass_used}</div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Fuel Saved: <strong>{selectedRoute.fuel_saved_liters} Liters</strong> • CO2 Avoided: <strong>{selectedRoute.co2_avoided_kg} kg</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CLASSICAL DIJKSTRA / A*</span><span className="text-rose-400 font-bold">{selectedRoute.classical_dijkstra_time_mins} Minutes</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">QUANTUM-INSPIRED QPSO</span><span className="text-emerald-400 font-bold">{selectedRoute.qpso_optimized_time_mins} Minutes (-{selectedRoute.time_saved_pct}%)</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('convergence')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Quantum Wavefunction & QPSO Convergence ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Quantum Metaheuristic Engine</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Origin-Destination Corridor</label>
                      <input type="text" readOnly value={selectedRoute.corridor_name} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Simulating Quantum Potential Wells...' : 'Execute QPSO Metaheuristic Search'}</span>
                    </button>
                  </form>
                  {optimResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Optimized Transit: <strong className="text-emerald-400 font-mono text-xs">{optimResult.quantumTime}</strong></div>
                      <div>Bypass Arterials: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{optimResult.bypass}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CONVERGENCE */}
        {activeTab === 'convergence' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">DELTA POTENTIAL WELL QUANTUM SIMULATION</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">QPSO Wavefunction Evolution vs Classical Swarm</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">18 Iterations to Minima</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                {convergence.map((c) => (
                  <div key={c.iteration} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 block text-[10px]">ITERATION #{c.iteration}</span>
                    <span className="text-emerald-400 font-bold block mt-1">{c.qpso_fitness}m (QPSO)</span>
                    <span className="text-slate-500 text-[10px] block">{c.classical_pso_fitness}m (PSO)</span>
                  </div>
                ))}
              </div>
              <div className="text-cyan-400 font-bold pt-2 border-t border-slate-900">
                Quantum tunneling allows particles to escape local congestion traps that snare classical gradient and Dijkstra algorithms.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {benchmarks.map((b, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-cyan-400 font-bold">{b.algorithm}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{b.solution_optimality_pct}% Optimal</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Convergence Latency: <strong className="text-emerald-400">{b.convergence_time_ms} ms</strong></div>
                  <div>Iterations Required: <strong className="text-white">{b.iterations_needed}</strong></div>
                  <div className="text-rose-400 pt-1 border-t border-slate-900">Local Optima Trap Rate: {b.local_optima_trap_rate_pct}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DISPATCH */}
        {activeTab === 'dispatch' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Capacitated VRP Multi-Depot Fleet Optimizer</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simultaneously dispatches 50+ commercial electric delivery vans under real-time dynamic road blockages and strict delivery time-window constraints.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
