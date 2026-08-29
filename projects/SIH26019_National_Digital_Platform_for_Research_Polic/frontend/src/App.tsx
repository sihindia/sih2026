import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Sliders, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Building2, 
  Scale, 
  Activity,
  FileText,
  ArrowRight
} from 'lucide-react';
import papersData from './data/policy_papers.json';
import simulationsData from './data/policy_simulations.json';
import indicesData from './data/state_indices.json';

export default function App() {
  const [papers, setPapers] = useState(papersData);
  const [selectedPaper, setSelectedPaper] = useState(papersData[0]);
  const [indices, setIndices] = useState(indicesData);

  // Policy Simulation Inputs
  const [coveragePct, setCoveragePct] = useState(95);
  const [stampDuty, setStampDuty] = useState(4.0);

  const disputeDrop = ((coveragePct / 100) * 72).toFixed(1);
  const economicUnlock = Math.round((6 - stampDuty) * 18500 + (coveragePct * 420)).toLocaleString();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>DEPARTMENT OF LAND RESOURCES (DoLR) • POLICY INNOVATION • SIH26019</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              National Digital Platform for Research, Policy Innovation & Evidence-Based Land Governance
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Centralized Land Policy Repository, Reform Impact Simulator & State Governance Benchmarking
            </p>
          </div>

          <span className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>National Policy Hub: Live</span>
          </span>
        </header>

        {/* Papers Selection Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>📚 FEATURED POLICY & RESEARCH PUBLICATIONS ({papers.length} WORKING PAPERS)</span>
            <span>Click paper to view findings</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {papers.map((p) => (
              <button
                key={p.paper_id}
                onClick={() => setSelectedPaper(p)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedPaper.paper_id === p.paper_id
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md ring-1 ring-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{p.paper_id}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5 line-clamp-2">{p.title}</h3>
                    <div className="text-[11px] text-slate-400 mt-1">{p.authors[0]}</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    {p.published_year}
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>{p.category}</span>
                  <span className="text-emerald-400 font-bold">{p.citations} Citations</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Selected Paper Summary & Policy Simulator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Paper Details */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white">{selectedPaper.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Authors: {selectedPaper.authors.join(', ')}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Key Policy Evidence & Empirical Finding:</span>
                <p className="leading-relaxed font-medium">{selectedPaper.key_finding}</p>
              </div>
            </div>

            {/* AI Policy Simulator */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>AI Land Policy Reform Outcome Simulator</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">🗺️ Cadastral Digitization & 3D ULPIN Coverage</span>
                    <span className="font-mono text-emerald-400">{coveragePct}%</span>
                  </div>
                  <input
                    type="range" min="50" max="100" value={coveragePct}
                    onChange={(e) => setCoveragePct(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">💸 State Property Stamp Duty Rate</span>
                    <span className="font-mono text-cyan-400">{stampDuty}%</span>
                  </div>
                  <input
                    type="range" min="2" max="8" step="0.5" value={stampDuty}
                    onChange={(e) => setStampDuty(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right 5: Simulation Results & State Indices */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Simulation Results Output */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
                <span>🤖 DoLR REFORM OUTCOME PROJECTION</span>
                <span className="text-emerald-400">Simulated AI Result</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Litigation Drop</div>
                  <div className="text-2xl font-black mt-1 text-emerald-400">-{disputeDrop}%</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Capital Unlocked</div>
                  <div className="text-lg font-black mt-1 text-cyan-400">₹{economicUnlock} Cr</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl text-slate-300 text-[11px] font-sans">
                <span className="font-bold text-emerald-400 block mb-0.5">Policy Recommendation:</span>
                Enact Conclusive Titling Bill with State Title Indemnity Guarantee Fund.
              </div>
            </div>

            {/* State Governance Index */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                <span>State Land Governance Benchmarks</span>
              </h4>

              <div className="space-y-2">
                {indices.map((s) => (
                  <div key={s.state} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">#{s.rank} {s.state}</span>
                      <div className="text-[10px] text-slate-500">{s.cadastral_digitized} Digitized • {s.dispute_density}</div>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400">{s.index} / 100</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
