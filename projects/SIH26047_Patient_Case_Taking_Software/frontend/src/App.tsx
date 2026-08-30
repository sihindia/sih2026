import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Mic, 
  Scan, 
  RefreshCw, 
  Clock, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import casesData from './data/clinical_kiosk_intake_cases.json';
import parikshaData from './data/dashavidha_pariksha_framework.json';
import ocrData from './data/ocr_document_intelligence_samples.json';
import statsData from './data/medikiosk_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sa' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [pariksha, setPariksha] = useState(parikshaData);
  const [ocr, setOcr] = useState(ocrData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'triage' | 'pariksha' | 'ocr' | 'stats'>('cases');

  // Interactive Clinical Intake Simulator
  const [isProcessing, setIsProcessing] = useState(false);
  const [intakeResult, setIntakeResult] = useState<any>({
    triage: "ROUTINE OPD - GREEN (No Acute Red Flags)",
    timeSaved: "8.5 Minutes of Doctor Consultation Time Saved",
    ayurvedicDiag: "Pitta-Vata Prakriti with Mandagni (Amlapitta Presentation)",
    ocrExtraction: "Rx Pantoprazole 40mg, Metformin 500mg | HbA1c: 7.8% (Flagged)",
    fhirStatus: "HL7 FHIR R4 Bundle Created & Synced to ABHA 91-4829-1029-4810"
  });

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIntakeResult({
        triage: "ROUTINE OPD - GREEN (No Acute Red Flags)",
        timeSaved: "8.5 Minutes of Doctor Consultation Time Saved",
        ayurvedicDiag: "Pitta-Vata Prakriti with Mandagni (Amlapitta Presentation)",
        ocrExtraction: "Rx Pantoprazole 40mg, Metformin 500mg | HbA1c: 7.8% (Flagged)",
        fhirStatus: "HL7 FHIR R4 Bundle Created & Synced to ABHA 91-4829-1029-4810"
      });
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Stethoscope className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>MINISTRY OF AYUSH • MEDIKIOSK 360 AI CLINICAL CASE-TAKING • SIH26047</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AIIA MediKiosk: AI-Powered Multimodal Patient Clinical History & Intake Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              All India Institute of Ayurveda Self-Service OPD History Kiosk with Dual Allopathic (SOCRATES) & Ayurvedic (Dashavidha Pariksha) Frameworks, Multilingual Voice, Document OCR & ABDM FHIR R4 Sync
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sa' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>संस्कृतम्</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🩺 Patient Kiosk Intakes', count: cases.length },
            { id: 'triage', label: '🚨 Red-Flag Triage Engine' },
            { id: 'pariksha', label: '🌿 Dashavidha Pariksha', count: pariksha.length },
            { id: 'ocr', label: '📄 Document OCR & Extraction', count: ocr.length },
            { id: 'stats', label: '📊 MediKiosk Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
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
                  key={c.intake_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.intake_id === c.intake_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{c.intake_id}</span>
                    <span className="text-emerald-400">+{c.time_saved_minutes}m Saved</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.patient_demographics.split(',')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.chief_complaint}</div>
                  <div className="text-[10px] text-teal-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.opd_clinic.split('-')[0]}</span>
                    <span className={c.red_flag_alert.includes('NEGATIVE') ? 'text-emerald-400' : 'text-rose-400'}>
                      {c.red_flag_alert.includes('NEGATIVE') ? 'ROUTINE' : 'RED-FLAG'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedCase.intake_id} • ABHA: {selectedCase.abha_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.patient_demographics}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedCase.red_flag_alert.includes('NEGATIVE')
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                  }`}>
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">MULTIMODAL CLINICAL HISTORY & DIGITIZED RECORDS:</span>
                  <div className="text-amber-300 font-sans text-xs">
                    Chief Complaint: "{selectedCase.chief_complaint}"
                  </div>
                  <div className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Allopathic HPI (SOCRATES): {selectedCase.socrates_hpi}
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Ayurvedic Assessment: {selectedCase.ayurvedic_pariksha}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    OCR Document Ingestion: {selectedCase.ocr_documents_scanned}
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Triage Alert: {selectedCase.red_flag_alert}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CONSULTATION TIME SAVED</span><span className="text-emerald-400 font-bold">{selectedCase.time_saved_minutes} Minutes</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">INTERACTION MODE</span><span className="text-teal-400 font-bold">{selectedCase.interaction_mode.split(':')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('triage')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Emergency Red-Flag Triage & Prioritization Engine ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Instant Kiosk Intake Engine</span>
                  </h4>
                  <form onSubmit={handleProcess} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Patient ABHA ID</label>
                      <input type="text" readOnly value={`${selectedCase.abha_id} (${selectedCase.patient_demographics.split(',')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>{isProcessing ? 'Extracting OCR & Generating FHIR Bundle...' : 'Generate Structured Summary'}</span>
                    </button>
                  </form>
                  {intakeResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Triage: <strong className="text-emerald-400 font-mono text-xs">{intakeResult.triage}</strong></div>
                      <div>Doctor Time: <strong className="text-amber-300 font-mono text-xs">{intakeResult.timeSaved}</strong></div>
                      <div>Ayurvedic: <strong className="text-teal-400 font-mono text-xs">{intakeResult.ayurvedicDiag}</strong></div>
                      <div>OCR: <strong className="text-cyan-300 font-mono text-xs">{intakeResult.ocrExtraction}</strong></div>
                      <div>ABDM Sync: <strong className="text-white font-mono text-xs block mt-0.5">{intakeResult.fhirStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TRIAGE */}
        {tab === 'triage' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Emergency Red-Flag Priority Triage Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Scans all incoming voice and touch inputs for high-acuity red flags (acute crushing chest pain radiating to left arm/jaw, stroke symptoms, acute dyspnea). Instantly triggers audiovisual kiosk strobes and nursing escort to casualty bay.
            </p>
          </div>
        )}

        {/* VIEW 3: PARIKSHA */}
        {tab === 'pariksha' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {pariksha.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{p.dimension}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.clinical_utility}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{p.kiosk_assessment}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: OCR */}
        {tab === 'ocr' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {ocr.map((o, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-bold">{o.doc_type}</span>
                  <span className="text-emerald-400 font-bold">{o.accuracy_score}% OCR</span>
                </div>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{o.extracted_entities}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-400 font-mono text-[10px]">Classification: {o.flag}</div>
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
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
