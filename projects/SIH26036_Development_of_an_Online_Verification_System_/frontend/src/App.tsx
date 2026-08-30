import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  RefreshCw, 
  FileCheck, 
  Building2, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/instrument_verification_cases.json';
import classesData from './data/legal_metrology_instrument_classes_matrix.json';
import standardsData from './data/field_inspection_test_weights_standards.json';
import statsData from './data/doca_maaptol_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [classes, setClasses] = useState(classesData);
  const [standards, setStandards] = useState(standardsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'inspection' | 'certificate' | 'classes' | 'stats'>('cases');

  // Interactive Verification Simulator
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>({
    certNumber: "CERT-DOCA-2026-PB8812",
    result: "PASSED_AND_VERIFIED",
    mpeCheck: "Within Permissible Tolerance (Observed +5 kg vs ±20 kg Limit)",
    sealDie: "Lead Wire Seal Die #PB-LDH-2026-9081",
    validTill: "28 August 2027 (12 Months Stamped Validity)"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setVerifyResult({
        certNumber: "CERT-DOCA-2026-PB8812",
        result: "PASSED_AND_VERIFIED",
        mpeCheck: "Within Permissible Tolerance (Observed +5 kg vs ±20 kg Limit)",
        sealDie: "Lead Wire Seal Die #PB-LDH-2026-9081",
        validTill: "28 August 2027 (12 Months Stamped Validity)"
      });
      setIsVerifying(false);
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
              <span>DOCA • LEGAL METROLOGY • E-MAAPTOL 360 ONLINE VERIFICATION • SIH26036</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoCA e-MaapTol: Online Verification & Digital Stamping System for Weighing & Measuring Instruments
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Compliance under Legal Metrology Act 2009 & General Rules 2011 with Field LMO Mobile Stamping, Dynamic QR Digital Certificates & Automated Re-Verification Renewal Tracking
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⚖️ Verified Instruments', count: cases.length },
            { id: 'inspection', label: '🔍 LMO Field Inspection' },
            { id: 'certificate', label: '📱 QR Digital Certificate' },
            { id: 'classes', label: '📐 Classes & Tolerances', count: classes.length },
            { id: 'stats', label: '📊 e-MaapTol Telemetry' }
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
                  key={c.app_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.app_id === c.app_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.app_id}</span>
                    <span className="text-emerald-400">STAMPED</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.instrument_type}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.trader_name}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.location.split(',')[0]}</span>
                    <span className="text-cyan-300">{c.certificate_number}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.app_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.instrument_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">LEGAL METROLOGY INSPECTION & STAMPING AUDIT RECORD:</span>
                  <div className="text-white font-sans text-xs">
                    Trader: <strong className="text-amber-300">{selectedCase.trader_name}</strong> | Model: {selectedCase.make_and_model}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Inspecting LMO: {selectedCase.inspecting_officer}
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Standard Test: {selectedCase.calibration_test}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Accuracy: Max Allowed Error: {selectedCase.max_permissible_error} ➔ Observed: <strong className="text-white">{selectedCase.observed_error}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Security Seal Die: {selectedCase.security_seal_die}
                  </div>
                  <div className="text-white font-sans text-[11px]">
                    Digital Certificate: <strong className="text-cyan-300">{selectedCase.certificate_number}</strong> (Valid Till: {selectedCase.valid_till})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DIGITAL CERTIFICATE NUMBER</span><span className="text-cyan-300 font-bold">{selectedCase.certificate_number}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXPIRATION VALIDITY</span><span className="text-emerald-400 font-bold">{selectedCase.valid_till.split(' ')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('certificate')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Dynamic QR-Code Digital Stamping Certificate ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Stamping Verification Engine</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Instrument Specification</label>
                      <input type="text" readOnly value={`${selectedCase.instrument_type} (Error: ${selectedCase.observed_error})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Validating MPE & Generating QR Hash...' : 'Audit MPE & Generate QR Certificate'}</span>
                    </button>
                  </form>
                  {verifyResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <strong className="text-emerald-400 font-mono text-xs">{verifyResult.result}</strong></div>
                      <div>MPE Check: <strong className="text-cyan-300 font-mono text-xs">{verifyResult.mpeCheck}</strong></div>
                      <div>Digital Seal: <strong className="text-amber-300 font-mono text-xs">{verifyResult.sealDie}</strong></div>
                      <div>Valid Till: <strong className="text-white font-mono text-xs block mt-0.5">{verifyResult.validTill}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INSPECTION */}
        {tab === 'inspection' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {standards.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{s.range}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.inspection_use}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CERTIFICATE */}
        {tab === 'certificate' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <QrCode className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Dynamic QR Digital Verification Certificate</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Every instrument receives a tamper-proof digital certificate embedded with cryptographic hash, inspector die, and QR code that consumers can scan with any smartphone to confirm verification authenticity.
            </p>
          </div>
        )}

        {/* VIEW 4: CLASSES */}
        {tab === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {classes.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{c.class_code}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.application}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{c.tolerance}</p>
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
