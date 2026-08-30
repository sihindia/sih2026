import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Scale, 
  Landmark, 
  RefreshCw, 
  TrendingUp, 
  Activity, 
  Globe 
} from 'lucide-react';

import papersData from './data/applied_research_papers_repository.json';
import statesData from './data/state_land_governance_benchmark_index.json';
import scenariosData from './data/policy_reform_simulation_scenarios.json';
import statsData from './data/neetimanthan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [papers, setPapers] = useState(papersData);
  const [selectedPaper, setSelectedPaper] = useState(papersData[0]);
  const [states, setStates] = useState(statesData);
  const [scenarios, setScenarios] = useState(scenariosData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'papers' | 'simulator' | 'ranking' | 'sandbox' | 'stats'>('papers');

  // Policy Simulator State
  const [coverage, setCoverage] = useState(95);
  const [duty, setDuty] = useState(4.0);

  const disputeDrop = ((coverage / 100) * 72).toFixed(1);
  const unlockCr = Math.round((6 - duty) * 18500 + (coverage * 420)).toLocaleString();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR NEETIMANTHAN 360 • SIH26019</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR NeetiManthan: National Digital Platform for Research and Policy Innovation
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) Evidence-Based Decision Support: Conclusive Titling Legal Reform Simulator, NITI Aayog State Land Governance Rankings &amp; Academic Research Repository
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'papers', label: '📚 Applied Research Papers', count: papers.length },
            { id: 'simulator', label: '⚖️ Policy Reform Simulator' },
            { id: 'ranking', label: '🏛️ State Land Governance Index', count: states.length },
            { id: 'sandbox', label: '🧪 Innovation Sandbox', count: scenarios.length },
            { id: 'stats', label: '📊 NeetiManthan Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: PAPERS
           ========================================================================= */}
        {activeTab === 'papers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {papers.map((p) => (
                <button
                  key={p.paper_id}
                  onClick={() => setSelectedPaper(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedPaper.paper_id === p.paper_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{p.paper_id}</span>
                    <span className="text-amber-400">{p.citations_count} Citations</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.lead_author}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.category}</span>
                    <span className="text-cyan-400">{p.publication_year}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedPaper.paper_id} • {selectedPaper.category}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedPaper.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedPaper.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">EMPIRICAL FINDINGS &amp; EVIDENCE-BASED RECOMMENDATION:</span>
                  <div className="text-white font-sans text-xs">
                    Empirical Finding: <strong className="text-cyan-300">{selectedPaper.empirical_finding}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Policy Action: {selectedPaper.policy_recommendation}
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Lead Research Body: {selectedPaper.lead_author} ({selectedPaper.publication_year})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ACADEMIC CITATIONS</span><span className="text-emerald-400 font-bold">{selectedPaper.citations_count} References</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">REFORM STATUS</span><span className="text-cyan-400 font-bold">Evidence Validated</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Simulate Policy Reform Outcomes (Litigation &amp; Capital Unlock) ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    <span>Instant Policy Reform Simulator</span>
                  </h4>
                  <div className="space-y-3 font-sans">
                    <div>
                      <div className="flex justify-between font-bold text-xs mb-1">
                        <span className="text-slate-300">🗺️ Cadastral Digitization Coverage</span>
                        <span className="font-mono text-emerald-400">{coverage}%</span>
                      </div>
                      <input type="range" min="50" max="100" value={coverage} onChange={(e) => setCoverage(Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-xs mb-1">
                        <span className="text-slate-300">📉 State Stamp Duty Rate</span>
                        <span className="font-mono text-amber-400">{duty.toFixed(1)}%</span>
                      </div>
                      <input type="range" min="2" max="8" step="0.5" value={duty} onChange={(e) => setDuty(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3 text-center font-mono">
                      <div className="p-2 bg-slate-900 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase">Litigation Drop</span>
                        <span className="text-xl font-black text-emerald-400 block mt-1">-{disputeDrop}%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase">Capital Unlocked</span>
                        <span className="text-lg font-black text-cyan-400 block mt-1">₹{unlockCr} Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SIMULATOR */}
        {tab === 'simulator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Scale className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">National Land Policy Reform Impact Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simulating macroeconomic and judicial impacts of moving from presumptive land title deeds to conclusive titling with state title indemnity guarantees.
            </p>
          </div>
        )}

        {/* VIEW 3: RANKING */}
        {tab === 'ranking' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {states.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">National Rank #{s.rank}</span>
                  <span className="text-cyan-400 font-bold">{s.score} / 100 Score</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.state}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Cadastre Digitized: {s.cadastre_digitized_pct}% | Bhu-Aadhaar: {s.bhu_aadhaar_seeding_pct}%</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Dispute Resolution Speed: {s.dispute_resolution_speed}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SANDBOX */}
        {tab === 'sandbox' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {scenarios.map((sc, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{sc.scenario_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{sc.reform}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Litigation Reduction: -{sc.litigation_reduction} | Unlocked: {sc.capital_unlocked}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Timeframe: {sc.timeframe}</div>
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
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
