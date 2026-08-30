import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  RefreshCw, 
  FlaskConical, 
  Sliders, 
  Globe 
} from 'lucide-react';

import queriesData from './data/indian_standards_bis_guidance_queries.json';
import schemesData from './data/bis_certification_schemes_catalog.json';
import labsData from './data/nabl_accredited_testing_labs.json';
import statsData from './data/manaksathi_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [queries, setQueries] = useState(queriesData);
  const [selectedQuery, setSelectedQuery] = useState(queriesData[0]);
  const [schemes, setSchemes] = useState(schemesData);
  const [labs, setLabs] = useState(labsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'queries' | 'standards' | 'schemes' | 'labs' | 'stats'>('queries');

  // Interactive Assistant Query Simulator
  const [isQuerying, setIsQuerying] = useState(false);
  const [answerResult, setAnswerResult] = useState<any>({
    standards: "IS 13428:2024 (Mineral Water) & IS 14543:2024 (Packaged Water)",
    scheme: "Scheme-I (ISI Mark is MANDATORY under QCO)",
    clauses: "Clause 4.2 Microbiological limits & Table 2 Pesticide Residues (<0.0001 mg/L)",
    labs: "BIS Central Lab Sahibabad + 14 NABL-Accredited Labs in TN & UP"
  });

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuerying(true);
    setTimeout(() => {
      setAnswerResult({
        standards: "IS 13428:2024 (Mineral Water) & IS 14543:2024 (Packaged Water)",
        scheme: "Scheme-I (ISI Mark is MANDATORY under QCO)",
        clauses: "Clause 4.2 Microbiological limits & Table 2 Pesticide Residues (<0.0001 mg/L)",
        labs: "BIS Central Lab Sahibabad + 14 NABL-Accredited Labs in TN & UP"
      });
      setIsQuerying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Award className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>DOCA • MANAKSATHI 360 AI INDIAN STANDARDS & BIS ASSISTANT • SIH26107</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoCA ManakSathi: AI Intelligent Assistant for Indian Standards & BIS Services
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Semantic RAG over 22,000+ Indian Standards (IS), BIS Certification Schemes, Hallmarking & NABL Labs
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
            { id: 'queries', label: '🤖 BIS Standards Assistant', count: queries.length },
            { id: 'standards', label: '📜 Indian Standards (IS) Catalog' },
            { id: 'schemes', label: '🏛️ BIS Certification Schemes', count: schemes.length },
            { id: 'labs', label: '🧪 NABL Accredited Labs', count: labs.length },
            { id: 'stats', label: '📊 ManakSathi Telemetry' }
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
            VIEW 1: QUERIES
           ========================================================================= */}
        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {queries.map((q) => (
                <button
                  key={q.query_id}
                  onClick={() => setSelectedQuery(q)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedQuery.query_id === q.query_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{q.query_id}</span>
                    <span className="text-emerald-400">Precision: {q.confidence_score}%</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {q.user_type}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{q.product_description.slice(0, 50)}...</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{q.applicable_standards.split(' ')[0]} {q.applicable_standards.split(' ')[1]}</span>
                    <span className="text-emerald-400">{q.status}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedQuery.query_id} • {selectedQuery.user_type}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedQuery.product_description}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedQuery.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">APPLICABLE INDIAN STANDARDS & CLAUSES:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedQuery.applicable_standards}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Key Clauses: <strong>{selectedQuery.key_clauses}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MANDATORY SCHEME</span><span className="text-amber-400 font-bold">{selectedQuery.mandatory_scheme.split(' ')[0]}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RETRIEVAL ACCURACY</span><span className="text-emerald-400 font-bold">{selectedQuery.confidence_score}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('schemes')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore BIS Certification Schemes & Steps ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ask BIS ManakSathi Assistant</span>
                  </h4>
                  <form onSubmit={handleQuery} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Product Query or Hallmarking Query</label>
                      <input type="text" readOnly value={selectedQuery.product_description} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isQuerying} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isQuerying ? 'animate-spin' : ''}`} />
                      <span>{isQuerying ? 'Retrieving Indian Standards & Clauses...' : 'Ask AI Standards Assistant'}</span>
                    </button>
                  </form>
                  {answerResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Standard: <strong className="text-amber-400 font-mono text-xs">{answerResult.standards}</strong></div>
                      <div>Mandate: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{answerResult.scheme}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STANDARDS */}
        {activeTab === 'standards' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <BookOpen className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">22,000+ Indian Standards (IS) Knowledge Repository</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Semantic vector indexing covering all 15 technical divisions: Chemical, Civil, Electrotechnical, Food & Agriculture, Mechanical, Medical Equipment, Petroleum, and Textiles.
            </p>
          </div>
        )}

        {/* VIEW 3: SCHEMES */}
        {activeTab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {schemes.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{s.scheme_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Type: <strong className="text-white">{s.type}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{s.target}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LABS */}
        {activeTab === 'labs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {labs.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{l.accreditation}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.lab_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Location: <strong className="text-white">{l.location}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Scopes: {l.testing_scopes}</div>
                </div>
              </div>
            ))}
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
