import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  BookOpen, 
  RefreshCw, 
  FileText, 
  Layers, 
  Globe 
} from 'lucide-react';

import casesData from './data/ayurvedic_ip_guidance_cases.json';
import corpusData from './data/statutory_legal_corpus_citations.json';
import taxonomyData from './data/formulation_classification_taxonomy.json';
import statsData from './data/ipsakti_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sa' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [corpus, setCorpus] = useState(corpusData);
  const [taxonomy, setTaxonomy] = useState(taxonomyData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'jurisdiction' | 'taxonomy' | 'corpus' | 'stats'>('cases');

  // Interactive RAG Legal Query Simulator
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<any>({
    tier: "Patent & Proprietary (P&P) Formulation",
    patentability: "Patentable under Sec 2(1)(j) & 3(d) proviso for novel carrier matrix",
    tkdlCheck: "Sec 3(p) Traditional Knowledge Bar cleared (novel synthetic liposome carrier)",
    absRequirement: "Mandatory Form I Approval from National Biodiversity Authority (NBA)",
    citations: "Patents Act 1970 Sec 3(p); BD Act 2023 Sec 6; WIPO GRATK Treaty 2024 Art 3",
    confidence: "98.4% Source-Cited RAG Confidence"
  });

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConsulting(true);
    setTimeout(() => {
      setConsultResult({
        tier: "Patent & Proprietary (P&P) Formulation",
        patentability: "Patentable under Sec 2(1)(j) & 3(d) proviso for novel carrier matrix",
        tkdlCheck: "Sec 3(p) Traditional Knowledge Bar cleared (novel synthetic liposome carrier)",
        absRequirement: "Mandatory Form I Approval from National Biodiversity Authority (NBA)",
        citations: "Patents Act 1970 Sec 3(p); BD Act 2023 Sec 6; WIPO GRATK Treaty 2024 Art 3",
        confidence: "98.4% Source-Cited RAG Confidence"
      });
      setIsConsulting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Scale className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF AYUSH • IP-SAKTI SAHAYAK 360 SOURCE-CITED AYURVEDA RAG • SIH26045</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IP-SAKTI Sahayak: Multilingual RAG AI Assistant for Ayurveda Intellectual Property & Regulations
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              All India Institute of Ayurveda (AIIA) Dual-Jurisdiction Switch (India vs International Regimes) Grounded in Patents Act 1970 Sec 3(p), Biological Diversity Act 2023, TKDL, WIPO GRATK Treaty 2024 & Bhashini
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sa' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>संस्कृतम्</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⚖️ Legal Consultations', count: cases.length },
            { id: 'jurisdiction', label: '🏛️ Dual-Jurisdiction Switch' },
            { id: 'taxonomy', label: '🌿 6-Tier Classifier', count: taxonomy.length },
            { id: 'corpus', label: '📜 Statutory Legal Corpus', count: corpus.length },
            { id: 'stats', label: '📊 IP-SAKTI Telemetry' }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.consultation_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.consultation_id === c.consultation_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.consultation_id}</span>
                    <span className="text-emerald-400">{c.rag_confidence_score}% Confidence</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.formulation_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.applicant_entity.split('(')[0]}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.formulation_tier.split(' ')[0]}</span>
                    <span className="text-cyan-300">{c.jurisdiction.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.consultation_id} • {selectedCase.formulation_tier}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.formulation_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">SOURCE-CITED STATUTORY GUIDANCE:</span>
                  <div className="text-white font-sans text-xs">
                    Applicant: <strong className="text-amber-300">{selectedCase.applicant_entity}</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Query: "{selectedCase.primary_query}"
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Domestic Verdict: {selectedCase.national_patent_verdict}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Access & Benefit Sharing: {selectedCase.abs_compliance_obligation}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px]">
                    International Export: {selectedCase.international_guidance}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900 font-mono">
                    Statutory Citations: <strong className="text-white">{selectedCase.statutory_citations}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RAG CONFIDENCE SCORE</span><span className="text-emerald-400 font-bold">{selectedCase.rag_confidence_score}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LEGAL ADVICE GUARDRAIL</span><span className="text-amber-400 font-bold">INFORMATIONAL ONLY</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('jurisdiction')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Switch Jurisdiction Engine: India Domestic vs WIPO / International ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Ayurvedic IP/ABS RAG Query</span>
                  </h4>
                  <form onSubmit={handleConsult} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Formulation Name</label>
                      <input type="text" readOnly value={`${selectedCase.formulation_name}`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isConsulting} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isConsulting ? 'animate-spin' : ''}`} />
                      <span>{isConsulting ? 'Retrieving Statutory Corpus & Citations...' : 'Execute Source-Cited RAG Retrieval'}</span>
                    </button>
                  </form>
                  {consultResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Tier: <strong className="text-amber-400 font-mono text-xs">{consultResult.tier}</strong></div>
                      <div>Patent Status: <strong className="text-emerald-400 font-mono text-xs">{consultResult.patentability}</strong></div>
                      <div>TK Bar Check: <strong className="text-cyan-300 font-mono text-xs">{consultResult.tkdlCheck}</strong></div>
                      <div>ABS Rule: <strong className="text-purple-300 font-mono text-xs">{consultResult.absRequirement}</strong></div>
                      <div>Statute: <strong className="text-white font-mono text-xs block mt-0.5">{consultResult.citations}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: JURISDICTION */}
        {tab === 'jurisdiction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold">DOMESTIC REGIME (INDIA)</span>
              <h4 className="font-bold text-sm text-white font-sans">Patents Act 1970 & Biological Diversity Act 2023</h4>
              <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                <div>Section 3(p): <strong className="text-rose-400">Strict Bar on Traditional Knowledge</strong></div>
                <div>NBA Approval: <strong className="text-amber-300">Section 6 Prior Form I Application</strong></div>
                <div>SBB Intimation: <strong className="text-emerald-400">Fair and Equitable Benefit Sharing</strong></div>
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold">INTERNATIONAL REGIME (GLOBAL EXPORT)</span>
              <h4 className="font-bold text-sm text-white font-sans">WIPO GRATK Treaty 2024 & Nagoya Protocol</h4>
              <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                <div>WIPO Article 3: <strong className="text-purple-400">Mandatory Country of Origin Disclosure</strong></div>
                <div>Nagoya Protocol: <strong className="text-cyan-300">Sovereign Rights over Genetic Resources</strong></div>
                <div>US FDA / EU: <strong className="text-white">Botanical Drug Guidance & THMPD 2004/24/EC</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TAXONOMY */}
        {tab === 'taxonomy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {taxonomy.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{t.tier}</span>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Classification Basis: {t.basis}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-400 font-sans font-bold text-[11px]">Patent Status: {t.patent_status}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: CORPUS */}
        {tab === 'corpus' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {corpus.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{c.statute}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.rule}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{c.tkdl_link}</p>
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
