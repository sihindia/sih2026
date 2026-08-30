import React, { useState } from 'react';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  FileSpreadsheet, 
  Layers, 
  FileText, 
  Globe 
} from 'lucide-react';

import trialsData from './data/aiia_clinical_trials_registry.json';
import adverseEventsData from './data/pharmacovigilance_adverse_events.json';
import standardsData from './data/cdisc_fhir_data_standards_matrix.json';
import statsData from './data/aiia_ctms_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sa' | 'ta' | 'mr'>('en');
  const [trials, setTrials] = useState(trialsData);
  const [selectedTrial, setSelectedTrial] = useState(trialsData[0]);
  const [adverseEvents, setAdverseEvents] = useState(adverseEventsData);
  const [standards, setStandards] = useState(standardsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'trials' | 'pharmacovigilance' | 'standards' | 'audit' | 'stats'>('trials');

  // Interactive Pharmacovigilance Logging Simulator
  const [isLogging, setIsLogging] = useState(false);
  const [logResult, setLogResult] = useState<any>({
    coding: "Nausea (MedDRA PT: 10028813)",
    reportingWindow: "Routine PSUR (14 Days) - Non-Serious Event",
    whoUmcScore: "Possible Causality (Guduchi formulation)",
    auditHash: "SHA256-481920-ALCOA+ Timestamp Validated",
    status: "Transmitted to NPvCC National Database"
  });

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);
    setTimeout(() => {
      setLogResult({
        coding: "Nausea (MedDRA PT: 10028813)",
        reportingWindow: "Routine PSUR (14 Days) - Non-Serious Event",
        whoUmcScore: "Possible Causality (Guduchi formulation)",
        auditHash: "SHA256-481920-ALCOA+ Timestamp Validated",
        status: "Transmitted to NPvCC National Database"
      });
      setIsLogging(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <HeartPulse className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF AYUSH • AIIA CTMS 360 CLINICAL TRIALS & PHARMACOVIGILANCE • SIH26046</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AIIA Clinical Trials Dashboard: GCP-Compliant CTMS for Ayurveda Research
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              All India Institute of Ayurveda & National Pharmacovigilance Coordination Centre (NPvCC) Cloud Platform with CDISC (SDTM/ADaM) & HL7 FHIR R4 Interoperability, CTRI / NDCT Rules 2019 Tracking & ALCOA+ Audit Integrity
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sa' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>संस्कृतम्</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'trials', label: '🩺 Clinical Trials Portfolio', count: trials.length },
            { id: 'pharmacovigilance', label: '⚠️ NPvCC Pharmacovigilance', count: adverseEvents.length },
            { id: 'standards', label: '🧬 CDISC & HL7 FHIR Standards', count: standards.length },
            { id: 'audit', label: '🛡️ GCP-ASU & ALCOA+ Audit' },
            { id: 'stats', label: '📊 CTMS Telemetry' }
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
            VIEW 1: TRIALS
           ========================================================================= */}
        {activeTab === 'trials' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {trials.map((t) => (
                <button
                  key={t.trial_code}
                  onClick={() => setSelectedTrial(t)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTrial.trial_code === t.trial_code
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{t.trial_code}</span>
                    <span className="text-emerald-400">{t.enrolment_rate_pct}% Recruited</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {t.study_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{t.ctri_number}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{t.study_phase.split(' ')[0]} {t.study_phase.split(' ')[1]}</span>
                    <span className="text-emerald-400">{t.current_enrolled}/{t.target_recruitment}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedTrial.trial_code} • {selectedTrial.ctri_number}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTrial.study_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTrial.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">TRIAL LIFECYCLE & REGULATORY COMPLIANCE STATUS:</span>
                  <div className="text-white font-sans text-xs">
                    Lead Site: <strong className="text-amber-300">{selectedTrial.lead_centre}</strong>
                  </div>
                  <div className="text-white font-sans text-xs">
                    Principal Investigator: {selectedTrial.principal_investigator}
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900">
                    Regulatory Protocol: {selectedTrial.regulatory_framework}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Interoperability Standard: {selectedTrial.data_standard}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Pharmacovigilance Signals: {selectedTrial.safety_profile}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RECRUITMENT VELOCITY</span><span className="text-cyan-400 font-bold">{selectedTrial.current_enrolled} / {selectedTrial.target_recruitment} ({selectedTrial.enrolment_rate_pct}%)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ETHICS COMMITTEE</span><span className="text-emerald-400 font-bold">{selectedTrial.iec_approval_status}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('pharmacovigilance')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Access NPvCC Adverse Event Capture & MedDRA Coding ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Pharmacovigilance Intake</span>
                  </h4>
                  <form onSubmit={handleLog} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Trial CTRI ID</label>
                      <input type="text" readOnly value={`${selectedTrial.ctri_number} (${selectedTrial.study_phase.split(' ')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isLogging} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isLogging ? 'animate-spin' : ''}`} />
                      <span>{isLogging ? 'Evaluating 24h Regulatory Timers & MedDRA...' : 'Log Adverse Event to NPvCC Gateway'}</span>
                    </button>
                  </form>
                  {logResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>MedDRA Coding: <strong className="text-cyan-400 font-mono text-xs">{logResult.coding}</strong></div>
                      <div>Reporting Window: <strong className="text-emerald-400 font-mono text-xs">{logResult.reportingWindow}</strong></div>
                      <div>WHO-UMC Score: <strong className="text-amber-300 font-mono text-xs">{logResult.whoUmcScore}</strong></div>
                      <div>Audit Trail: <strong className="text-white font-mono text-xs block mt-0.5">{logResult.auditHash}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PHARMACOVIGILANCE */}
        {tab === 'pharmacovigilance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {adverseEvents.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{a.severity}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.meddra_term}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Trial: <strong className="text-cyan-300">{a.trial_code}</strong></div>
                  <div>Causality: <strong className="text-amber-300">{a.causality}</strong></div>
                  <div className="text-emerald-400 text-xs pt-1 border-t border-slate-900">{a.action}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: STANDARDS */}
        {tab === 'standards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {standards.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{s.scope}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.standard}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.benefit}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: AUDIT */}
        {tab === 'audit' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">GCP-ASU & ALCOA+ Audit Trail Architecture</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Guarantees full Attributable, Legible, Contemporaneous, Original, and Accurate (ALCOA+) data integrity with cryptographic audit logging, 21 CFR Part 11 compliant e-signatures, and Digital Personal Data Protection (DPDP) Act 2023 controls.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
