import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Clock, 
  Eye, 
  RefreshCw, 
  ShieldAlert, 
  FileText, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import entitiesData from './data/critical_sector_entities.json';
import gapsData from './data/execution_gap_findings.json';
import negData from './data/negative_space_blindspots.json';
import benchData from './data/peer_benchmarks.json';
import statsData from './data/nciipc_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [entities, setEntities] = useState(entitiesData);
  const [selectedEntity, setSelectedEntity] = useState(entitiesData[0]);
  const [gaps, setGaps] = useState(gapsData);
  const [negativeSpace, setNegativeSpace] = useState(negData);
  const [benchmarks, setBenchmarks] = useState(benchData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'entities' | 'gaps' | 'negative' | 'benchmarks' | 'directives'>('entities');

  // Interactive Sample Evaluator
  const [sampleSize, setSampleSize] = useState(500);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>({
    riskScore: 88.4,
    gapsCount: 14,
    negCount: 6,
    verdict: "HIGH_SUPERVISORY_ATTENTION_REQUIRED",
    action: "ISSUE_NCIIPC_SECTION_70A_DIRECTIVE"
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        riskScore: 88.4,
        gapsCount: 14,
        negCount: 6,
        verdict: "HIGH_SUPERVISORY_ATTENTION_REQUIRED",
        action: "ISSUE_NCIIPC_SECTION_70A_DIRECTIVE"
      });
      setIsAuditing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>NCIIPC • DRISHTISOC 360 SUPERVISORY ANALYTICS TOOL FOR SOC ASSESSMENT • SIH26157</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SAT-SA: Supervisory Analytics Tool for SOC Assessment & Cyber Resilience
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Execution Gaps Detection, Negative Space Telemetry Blindspots & Cross-Entity Peer Benchmarking for Critical Sector Entities
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'entities', label: '🏛️ Critical Sector Entities (CSE)', count: entities.length },
            { id: 'gaps', label: '⚠️ Execution Gaps & Metric Gaming', count: gaps.length },
            { id: 'negative', label: '🕳️ Negative Space & Blindspots', count: negativeSpace.length },
            { id: 'benchmarks', label: '📊 Sectoral Peer Benchmarks', count: benchmarks.length },
            { id: 'directives', label: '📜 NCIIPC Supervisory Directives' }
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
            VIEW 1: ENTITIES
           ========================================================================= */}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {entities.map((e) => (
                <button
                  key={e.cse_id}
                  onClick={() => setSelectedEntity(e)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedEntity.cse_id === e.cse_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{e.cse_id}</span>
                    <span className={e.supervisory_risk_score >= 70 ? 'text-rose-400' : 'text-emerald-400'}>
                      Risk: {e.supervisory_risk_score}/100
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? e.entity_name_hi : e.entity_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{e.sector}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{e.median_closure_time_seconds}s Closure</span>
                    <span>{e.supervisory_status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Entity Breakdown & Supervisory Auditor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Entity Findings */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedEntity.cse_id} • {selectedEntity.sector}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedEntity.entity_name}</h3>
                    <p className="text-slate-400 text-[10px]">Sample Analyzed: {selectedEntity.total_alerts_analyzed} Alert Records</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedEntity.supervisory_risk_score >= 70 ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedEntity.supervisory_status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-500 block text-[8px]">MEDIAN CLOSURE</span><span className="text-amber-400 font-bold text-sm">{selectedEntity.median_closure_time_seconds}s</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-rose-950"><span className="text-slate-500 block text-[8px]">EXECUTION GAPS</span><span className="text-rose-400 font-bold text-sm">{selectedEntity.execution_gap_flags} Flags</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-purple-950"><span className="text-slate-500 block text-[8px]">BLINDSPOTS</span><span className="text-purple-400 font-bold text-sm">{selectedEntity.negative_space_blindspots} Voids</span></div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/60 space-y-2 font-sans">
                  <span className="text-rose-400 text-xs font-mono font-bold block uppercase">KEY SUPERVISORY AUDIT FINDING:</span>
                  <div className="text-slate-200 text-xs leading-relaxed">
                    {selectedEntity.key_supervisory_finding}
                  </div>
                  <div className="text-amber-300 font-mono text-[11px] pt-1">Peer Deviation: {selectedEntity.peer_deviation_pct}</div>
                </div>

                <button
                  onClick={() => setActiveTab('gaps')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Execution Gaps & Metric Gaming Evidence ➔</span>
                </button>
              </div>

              {/* Right 5: Supervisory Sampling Engine */}
              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>SAT-SA Sampling Engine</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      AIR-GAPPED OFFLINE
                    </span>
                  </div>

                  <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Alert Batch Sample Size</label>
                      <input type="number" min="100" max="5000" required value={sampleSize} onChange={(e) => setSampleSize(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>

                    <button type="submit" disabled={isAuditing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                      <span>{isAuditing ? 'Auditing Case Management Records...' : 'Execute Supervisory Assessment'}</span>
                    </button>
                  </form>

                  {auditResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Risk Index:</span><strong className="text-rose-400 font-mono text-sm">{auditResult.riskScore}/100</strong></div>
                      <div className="flex justify-between"><span>Execution Gaps:</span><strong className="text-amber-400 font-mono">{auditResult.gapsCount} Found</strong></div>
                      <div className="text-rose-300 pt-1 border-t border-slate-900 font-mono text-[10px]">{auditResult.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: EXECUTION GAPS
           ========================================================================= */}
        {activeTab === 'gaps' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gaps.map((g, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white font-sans">{g.alert_title}</h4>
                      <p className="text-rose-400 text-[11px] font-bold">{g.gap_type}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">Closed in {g.time_to_close_seconds}s</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>SOC Note:</strong> <span className="font-mono text-slate-400">"{g.investigation_note}"</span></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono"><strong>Verdict:</strong> {g.supervisory_verdict}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: NEGATIVE SPACE
           ========================================================================= */}
        {activeTab === 'negative' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">NEGATIVE SPACE & TELEMETRY VOID DETECTOR</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Identification of Missing Expected Security Evidence</h4>
            </div>

            {negativeSpace.map((n, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                <div>Impacted Subsystem: <strong className="text-rose-400 font-mono">{n.impacted_subsystem}</strong></div>
                <div>Expected Telemetry: <strong className="text-white">{n.expected_telemetry}</strong></div>
                <div>Observed Reality: <strong className="text-amber-400 font-mono">{n.observed_telemetry}</strong></div>
                <div className="text-rose-300 pt-1 border-t border-slate-900 font-mono">{n.supervisory_risk}</div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 4: BENCHMARKS
           ========================================================================= */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benchmarks.map((b, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{b.sector}</h4>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>Peer Avg MTTR: <strong className="text-white">{b.peer_avg_mttr_mins} mins</strong></div>
                    <div>Escalation Ratio: <strong className="text-emerald-400">{b.peer_escalation_ratio_pct}%</strong></div>
                    <div>Investigation Depth: <strong className="text-cyan-300">{b.peer_investigation_depth_score}/10</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: DIRECTIVES
           ========================================================================= */}
        {activeTab === 'directives' && (
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
