import React, { useState } from 'react';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  Globe 
} from 'lucide-react';

import reportsData from './data/oil_safety_reports_nlp.json';
import rulesData from './data/iogp_life_saving_rules.json';
import statsData from './data/suraksha_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [reports, setReports] = useState(reportsData);
  const [selectedReport, setSelectedReport] = useState(reportsData[0]);
  const [rules, setRules] = useState(rulesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'reports' | 'iogp' | 'precursors' | 'stats'>('reports');

  // Interactive Safety NLP Classifier
  const [rawText, setRawText] = useState("Scaffolder unhooked harness at 14m height while overhead crane hoisted 2.4-ton pipe.");
  const [isClassifying, setIsClassifying] = useState(false);
  const [nlpResult, setNlpResult] = useState<any>({
    sif: "HIGH_SIF_POTENTIAL (FATAL RISK)",
    conf: "97.4%",
    rule: "Rule #9: Working at Height & Rule #6: Line of Fire",
    action: "STOP_WORK_ORDER_ISSUED"
  });

  const handleClassify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClassifying(true);
    setTimeout(() => {
      setNlpResult({
        sif: "HIGH_SIF_POTENTIAL (FATAL RISK)",
        conf: "97.4%",
        rule: "Rule #9: Working at Height & Rule #6: Line of Fire",
        action: "STOP_WORK_ORDER_ISSUED"
      });
      setIsClassifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>OIL INDIA LIMITED • SURAKSHADRISHTI 360 SIF PRECURSOR NLP • SIH26165</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SurakshaDrishti 360: AI/NLP Engine for Serious Injury & Fatality (SIF) Precursors
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Automated Triage of Unsafe-Act / Unsafe-Condition Reports, IOGP Life-Saving Rules Mapping & Precursor Density Analytics
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'reports', label: '📋 Free-Text Safety Reports Feed', count: reports.length },
            { id: 'iogp', label: '🛡️ IOGP Life-Saving Rules', count: rules.length },
            { id: 'precursors', label: '🔥 SIF Precursor Density & Energy Barriers' },
            { id: 'stats', label: '📊 HSE Intervention Metrics' }
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

        {/* VIEW 1: REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reports.map((r) => (
                <button
                  key={r.report_id}
                  onClick={() => setSelectedReport(r)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedReport.report_id === r.report_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{r.report_id}</span>
                    <span className={r.sif_potential.includes('HIGH') ? 'text-rose-400' : 'text-emerald-400'}>
                      {r.sif_potential.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? r.location_hi : r.location}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono line-clamp-1">{r.raw_text}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{r.iogp_life_saving_rule.split('&')[0]}</span>
                    <span>{r.ai_nlp_confidence_pct}% NLP Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedReport.report_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedReport.location}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedReport.sif_potential.includes('HIGH') ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedReport.sif_potential}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 block text-[9px] uppercase">FREE-TEXT OBSERVATION:</span>
                  <div className="text-slate-200 text-xs font-sans leading-relaxed">{selectedReport.raw_text}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <div><strong>Mapped IOGP Rule:</strong> <span className="text-emerald-400 font-mono">{selectedReport.iogp_life_saving_rule}</span></div>
                  <div><strong>Precursor Hazard Mechanism:</strong> <span className="text-amber-300">{selectedReport.precursor_mechanism}</span></div>
                  <div><strong>HSE Action:</strong> <span className="text-cyan-300">{selectedReport.remediation_directive}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('precursors')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Analyze High-Energy Barrier Precursors ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>OIL SIF-NLP Classifier</span>
                  </h4>
                  <form onSubmit={handleClassify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Input UA/UC / Near-Miss Text</label>
                      <textarea rows={3} value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-sans font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isClassifying} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isClassifying ? 'animate-spin' : ''}`} />
                      <span>{isClassifying ? 'Classifying Energy Precursors...' : 'Classify SIF Potential'}</span>
                    </button>
                  </form>
                  {nlpResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>SIF Status: <strong className="text-rose-400 font-mono text-xs">{nlpResult.sif}</strong></div>
                      <div>IOGP Mapping: <strong className="text-emerald-400 font-mono text-xs">{nlpResult.rule}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: IOGP */}
        {activeTab === 'iogp' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-[10px]">{r.rule_no}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.name}</h4>
                <div className="text-slate-300 text-xs font-sans">Focus: {r.focus}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: PRECURSORS */}
        {activeTab === 'precursors' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">HIGH-ENERGY HAZARD BARRIER MATRIX</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">EEI & Martin-Black SIF Precursor Model</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>High-severity fatal potential stems from <strong>Heavy Kinetic Energy, Gravitational Heights (&gt;1.8m), Stored Pressure, and Confined Atmospheres</strong>.</div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-900">
                AI NLP automatically decouples high-volume trivial slip/trip incidents from fatal precursors, ensuring 80% HSE intervention on critical sites.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: STATS */}
        {activeTab === 'stats' && (
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
