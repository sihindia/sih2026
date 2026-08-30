import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Calendar, 
  Mic, 
  RefreshCw, 
  GitBranch, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/infrastructure_actual_progress_cases.json';
import wbsData from './data/primavera_p6_wbs_baseline_hierarchy.json';
import memoryData from './data/institutional_execution_memory_delays.json';
import statsData from './data/nirmanlink_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [wbs, setWbs] = useState(wbsData);
  const [memory, setMemory] = useState(memoryData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'wbs' | 'agent' | 'memory' | 'stats'>('cases');

  // Interactive AI Schedule Linker Simulator
  const [isLinking, setIsLinking] = useState(false);
  const [linkResult, setLinkResult] = useState<any>({
    wbs: "SGGS3-PIP-L5-0482 (Erect & Weld 8\" Condensate Header Line 12)",
    confidence: "98.4% Semantic Match (Fuzzy Jargon Aligned)",
    p6: "Primavera P6 Actual Dates Updated (Start: 2026-08-15, Finish: 2026-08-29)",
    variance: "-2 Days Variance (Ahead of Baseline Plan)"
  });

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLinking(true);
    setTimeout(() => {
      setLinkResult({
        wbs: "SGGS3-PIP-L5-0482 (Erect & Weld 8\" Condensate Header Line 12)",
        confidence: "98.4% Semantic Match (Fuzzy Jargon Aligned)",
        p6: "Primavera P6 Actual Dates Updated (Start: 2026-08-15, Finish: 2026-08-29)",
        variance: "-2 Days Variance (Ahead of Baseline Plan)"
      });
      setIsLinking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <Network className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>OIL • NIRMANLINK 360 AI SCHEDULE-LINKING & ACTUAL PROGRESS BRIDGE • SIH26122</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OIL NirmanLink: Intelligent Schedule-Linking & Real-Time Progress Tracking Bridge
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Fuzzy Semantic Mapping of Site Diaries, Voice Logs & Discipline Excel Spreadsheets to Primavera P6 / MS Project L5/L6 Work Breakdown Nodes
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🏗️ Progress Cases', count: cases.length },
            { id: 'wbs', label: '🗓️ Primavera P6 WBS Hierarchy', count: wbs.length },
            { id: 'agent', label: '🎙️ LLM Time Agent (Voice/Text)' },
            { id: 'memory', label: '🏛️ Institutional Delay Memory', count: memory.length },
            { id: 'stats', label: '📊 NirmanLink Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-blue-400' : 'bg-slate-800 text-slate-300'
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
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{c.case_id}</span>
                    <span className="text-emerald-400">{c.matched_wbs_activity_id}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Discipline: {c.discipline}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Confidence: {c.semantic_matching_confidence}%</span>
                    <span className="text-emerald-400">{c.p6_update_status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedCase.case_id} • {selectedCase.discipline}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.p6_update_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">INGESTED SITE LOG & SEMANTIC WBS BRIDGE:</span>
                  <div className="text-slate-300 font-sans text-xs italic">"{selectedCase.raw_field_log}"</div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Matched P6 WBS: <strong>{selectedCase.matched_wbs_activity_id} ({selectedCase.matched_wbs_activity_name})</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Sign-Off: {selectedCase.supervisor_signoff}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SCHEDULE VARIANCE</span><span className="text-emerald-400 font-bold">{selectedCase.schedule_variance_days} Days (Ahead)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MATCH CONFIDENCE</span><span className="text-blue-400 font-bold">{selectedCase.semantic_matching_confidence}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('wbs')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore Full Primavera P6 WBS Tree Hierarchy ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>LLM Time Agent & Matcher</span>
                  </h4>
                  <form onSubmit={handleLink} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Supervisor Field Input</label>
                      <input type="text" readOnly value={selectedCase.raw_field_log} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isLinking} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isLinking ? 'animate-spin' : ''}`} />
                      <span>{isLinking ? 'Linking Field Input to P6 Baseline...' : 'Auto-Sync to Primavera P6 Schedule'}</span>
                    </button>
                  </form>
                  {linkResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>WBS: <strong className="text-emerald-400 font-mono text-xs">{linkResult.wbs}</strong></div>
                      <div>P6 Status: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{linkResult.p6}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WBS */}
        {tab === 'wbs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {wbs.map((w, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold">{w.wbs_level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{w.wbs_code}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Discipline: <strong className="text-cyan-400">{w.discipline}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Duration: {w.planned_duration_days} Days ({w.status})</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: AGENT */}
        {tab === 'agent' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <Mic className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">LLM Conversational & Voice 'Time Agent'</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Allows site supervisors in refinery and pipeline construction to speak or type natural language activity updates in English/Hindi/Assamese, auto-converting to ISO timestamps and P6 activity updates.
            </p>
          </div>
        )}

        {/* VIEW 4: MEMORY */}
        {tab === 'memory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {memory.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">HISTORICAL DRIFT: {m.avg_duration_drift_pct}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.discipline}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Bottleneck: <strong className="text-amber-300">{m.historical_delay_cause}</strong></div>
                  <p className="text-slate-400 text-xs font-sans pt-1 border-t border-slate-900">AI Plan Strategy: {m.recommendation}</p>
                </div>
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
                <span className="text-2xl font-black text-blue-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
