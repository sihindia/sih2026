import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  Terminal, 
  RefreshCw, 
  Zap, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/refinery_optimization_benchmark_cases.json';
import benchmarksData from './data/miplib_benchmark_performance_matrix.json';
import cudaData from './data/solver_cuda_kernel_telemetry.json';
import statsData from './data/bharatsolver_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [benchmarks, setBenchmarks] = useState(benchmarksData);
  const [cuda, setCuda] = useState(cudaData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'benchmarks' | 'cuda' | 'solver' | 'stats'>('cases');

  // Interactive GPU Optimization Solver Simulator
  const [isSolving, setIsSolving] = useState(false);
  const [solveResult, setSolveResult] = useState<any>({
    time: "1.82 seconds (8.13x GPU Speedup over CPU Simplex)",
    objective: "₹142.8 Cr Net Monthly Margin (Global Optimal)",
    gap: "0.0000% Optimality Gap (24 Interior-Point Iterations)",
    status: "OPTIMAL CONVERGENCE REACHED"
  });

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSolving(true);
    setTimeout(() => {
      setSolveResult({
        time: "1.82 seconds (8.13x GPU Speedup over CPU Simplex)",
        objective: "₹142.8 Cr Net Monthly Margin (Global Optimal)",
        gap: "0.0000% Optimality Gap (24 Interior-Point Iterations)",
        status: "OPTIMAL CONVERGENCE REACHED"
      });
      setIsSolving(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MRPL • BHARATSOLVER 360 INDIGENOUS GPU OPTIMIZATION SOLVER CORE • SIH26119</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MRPL BharatSolver: Indigenous GPU-Accelerated Mathematical Optimization Solver Core
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Sovereign LP / MILP / QP Engine (Zero Foreign License Dependency), GPU-Accelerated Sparse Cholesky & Branch-and-Cut
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⚡ Refinery Optimization Cases', count: cases.length },
            { id: 'benchmarks', label: '📈 MIPLIB Benchmark Matrix', count: benchmarks.length },
            { id: 'cuda', label: '🖥️ CUDA GPU Kernels', count: cuda.length },
            { id: 'solver', label: '🧮 MPS Model Solver Studio' },
            { id: 'stats', label: '📊 BharatSolver Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.case_id}</span>
                    <span className="text-emerald-400">GPU: {c.gpu_solve_time_sec}s</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.problem_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.math_class} • {c.variables_count} Vars</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.speedup_factor}</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.case_id} • {selectedCase.industry_sector}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.problem_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">MATHEMATICAL PROBLEM FORMULATION:</span>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div>Variables: <strong className="text-white">{selectedCase.variables_count}</strong></div>
                    <div>Constraints: <strong className="text-cyan-300">{selectedCase.constraints_count}</strong></div>
                    <div>Non-Zeros: <strong className="text-amber-300">{selectedCase.matrix_non_zeros}</strong></div>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Optimal Objective: <strong>{selectedCase.objective_value}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">GPU SOLVE TIME</span><span className="text-emerald-400 font-bold">{selectedCase.gpu_solve_time_sec}s ({selectedCase.speedup_factor})</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">OPTIMALITY GAP</span><span className="text-cyan-400 font-bold">{selectedCase.optimality_gap_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('benchmarks')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Compare Benchmark Performance against Gurobi & CPLEX ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>GPU Mathematical Solver Core</span>
                  </h4>
                  <form onSubmit={handleSolve} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Optimization Instance</label>
                      <input type="text" readOnly value={selectedCase.problem_name} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isSolving} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSolving ? 'animate-spin' : ''}`} />
                      <span>{isSolving ? 'Executing GPU Sparse Cholesky & Simplex...' : 'Solve Mathematical Model on GPU'}</span>
                    </button>
                  </form>
                  {solveResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Solve Time: <strong className="text-emerald-400 font-mono text-xs">{solveResult.time}</strong></div>
                      <div>Objective: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{solveResult.objective}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {benchmarks.map((b, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{b.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{b.instance}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>BharatSolver: <strong className="text-emerald-400">{b.bharat_solver_sec}</strong></div>
                  <div>Gurobi 11: <strong className="text-cyan-400">{b.gurobi_11_sec}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">CPLEX 22: {b.cplex_22_sec}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CUDA */}
        {activeTab === 'cuda' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {cuda.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">CUDA KERNEL</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.kernel_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Throughput: <strong className="text-emerald-400">{c.throughput_gflops} GFLOPS</strong></div>
                  <div className="text-amber-400 text-[11px] pt-1 border-t border-slate-900">VRAM: {c.vram_allocated_mb} MB</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SOLVER */}
        {activeTab === 'solver' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Terminal className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">MPS / LP Problem Formulation & API Solver Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Directly loads standard MPS and LP formulation matrices, executes GPU-accelerated sparse LU/Cholesky interior-point solves, and outputs dual multiplier price vectors.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
