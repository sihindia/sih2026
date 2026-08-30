import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Network, 
  Building2, 
  RefreshCw, 
  FileText, 
  Sliders, 
  Globe 
} from 'lucide-react';

import specsData from './data/procurement_specifications_standards.json';
import graphData from './data/normative_allied_standards_graph.json';
import qcosData from './data/mandatory_qco_notifications_catalog.json';
import statsData from './data/manakprocure_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [specs, setSpecs] = useState(specsData);
  const [selectedSpec, setSelectedSpec] = useState(specsData[0]);
  const [graph, setGraph] = useState(graphData);
  const [qcos, setQcos] = useState(qcosData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'specs' | 'graph' | 'qco' | 'clause' | 'stats'>('specs');

  // Interactive Recommender Simulator
  const [isRecommending, setIsRecommending] = useState(false);
  const [recResult, setRecResult] = useState<any>({
    primary: "IS 4923:2017 (Hollow Steel Sections - Latest Amendment 2)",
    normative: "IS 1608:2022 (Tensile Test), IS 1599:2019 (Bend Test), IS 8910:2020",
    qco: "MANDATORY: Steel & Steel Products QCO 2024 (ISI Mark Required on GeM)",
    score: "98.4% Semantic Match Precision"
  });

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecommending(true);
    setTimeout(() => {
      setRecResult({
        primary: "IS 4923:2017 (Hollow Steel Sections - Latest Amendment 2)",
        normative: "IS 1608:2022 (Tensile Test), IS 1599:2019 (Bend Test), IS 8910:2020",
        qco: "MANDATORY: Steel & Steel Products QCO 2024 (ISI Mark Required on GeM)",
        score: "98.4% Semantic Match Precision"
      });
      setIsRecommending(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <FileCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>DOCA • MANAKPROCURE 360 AI PROCUREMENT STANDARDS RECOMMENDER • SIH26108</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoCA ManakProcure: AI Indian Standards Recommendation Engine for Procurement
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Semantic BoQ Parsing, Normative Allied Standards Dependency Graph & Mandatory QCO Compliance Validator
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
            { id: 'specs', label: '📑 Procurement Specifications', count: specs.length },
            { id: 'graph', label: '🕸️ Normative Standards Graph', count: graph.length },
            { id: 'qco', label: '🏛️ Mandatory QCO Orders', count: qcos.length },
            { id: 'clause', label: '📝 Standardized Clause Generator' },
            { id: 'stats', label: '📊 ManakProcure Telemetry' }
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
            VIEW 1: SPECS
           ========================================================================= */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specs.map((s) => (
                <button
                  key={s.spec_id}
                  onClick={() => setSelectedSpec(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSpec.spec_id === s.spec_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{s.spec_id}</span>
                    <span className="text-emerald-400">Match: {s.semantic_score}%</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.procurement_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.tender_authority}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{s.primary_standard.split(' ')[0]} {s.primary_standard.split(' ')[1]}</span>
                    <span className="text-cyan-400">{s.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedSpec.spec_id} • {selectedSpec.tender_authority}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSpec.procurement_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedSpec.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">PRIMARY & NORMATIVE STANDARDS MAPPING:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedSpec.latest_version}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Normative Standards: <strong>{selectedSpec.normative_allied_standards}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">QUALITY CONTROL ORDER</span><span className="text-rose-400 font-bold">ISI Mandatory</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SEMANTIC ACCURACY</span><span className="text-emerald-400 font-bold">{selectedSpec.semantic_score}% Match</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('graph')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Normative Allied Standards Dependency Graph ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>BoQ Standards Matcher</span>
                  </h4>
                  <form onSubmit={handleRecommend} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Tender Technical Specification</label>
                      <input type="text" readOnly value={selectedSpec.raw_input_spec} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isRecommending} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isRecommending ? 'animate-spin' : ''}`} />
                      <span>{isRecommending ? 'Matching Primary & Normative Standards...' : 'Generate Standards Recommendation'}</span>
                    </button>
                  </form>
                  {recResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Primary: <strong className="text-cyan-400 font-mono text-xs">{recResult.primary}</strong></div>
                      <div>QCO: <strong className="text-rose-300 font-mono text-xs block mt-0.5">{recResult.qco}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GRAPH */}
        {activeTab === 'graph' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {graph.map((g, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{g.relation_type}</span>
                <h4 className="font-bold text-sm text-white font-sans">{g.primary_code} ➔ {g.normative_code}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{g.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: QCO */}
        {activeTab === 'qco' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {qcos.map((q, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{q.ministry}</span>
                <h4 className="font-bold text-sm text-white font-sans">{q.qco_title}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Enforcement: <strong className="text-emerald-400">{q.enforcement_date}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{q.penalty}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: CLAUSE */}
        {activeTab === 'clause' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Tender Technical Specification Clause Generator</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Embeds normative test methods, mandatory ISI certification mandates, and latest amendment clauses directly into GeM and CPPP tender documentation.
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
