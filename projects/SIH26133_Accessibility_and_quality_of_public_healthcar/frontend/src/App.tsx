import React, { useState } from 'react';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Pill, 
  Ambulance, 
  RefreshCw, 
  Video, 
  ThermometerSnowflake, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/rural_teleconsultation_cases.json';
import medicinesData from './data/phc_medicine_stock_coldchain.json';
import referralsData from './data/public_health_referral_mesh.json';
import statsData from './data/mahaarogya_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [medicines, setMedicines] = useState(medicinesData);
  const [referrals, setReferrals] = useState(referralsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'telemed' | 'medicines' | 'referrals' | 'stats'>('cases');

  // Interactive ASHA Telemedicine Simulator
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<any>({
    specialist: "Dr. Vaishali Patil (MD Obs/Gyn, District Hospital)",
    rx: "Inj. Iron Sucrose + Tab. Labetalol 100mg",
    ambulance: "108 Ambulance Dispatched (ETA: 22 Mins)",
    status: "HIGH_RISK_MATERNAL_CARE_ACTIVATED"
  });

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConsulting(true);
    setTimeout(() => {
      setConsultResult({
        specialist: "Dr. Vaishali Patil (MD Obs/Gyn, District Hospital)",
        rx: "Inj. Iron Sucrose + Tab. Labetalol 100mg",
        ambulance: "108 Ambulance Dispatched (ETA: 22 Mins)",
        status: "HIGH_RISK_MATERNAL_CARE_ACTIVATED"
      });
      setIsConsulting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHAAROGYA 360 RURAL HEALTH • SIH26133</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaArogya: Rural Public Healthcare Access, Telemedicine & Referral Mesh
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              ASHA-Assisted Specialist Tele-Consultation, Longitudinal ABHA Health Records & 108 Emergency Ambulance Continuum
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🩺 Tele-Consultation Cases', count: cases.length },
            { id: 'telemed', label: '📹 Live ASHA Specialist Tele-Suite' },
            { id: 'medicines', label: '💊 PHC Medicines & Cold Chain', count: medicines.length },
            { id: 'referrals', label: '🚑 108 Hospital Referral Mesh', count: referrals.length },
            { id: 'stats', label: '📊 Maharashtra Public Health Telemetry' }
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
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.case_id}</span>
                    <span className="text-amber-400">{c.ambulance_108_status}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? c.clinical_condition_mr : c.clinical_condition}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.patient_name} ({c.age_gender}) • {c.village}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>ASHA: {c.asha_worker}</span>
                    <span className="text-emerald-400">BP: {c.vitals.bp}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.case_id} • {selectedCase.patient_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.clinical_condition}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">LIVE PATIENT VITALS & SPECIALIST PRESCRIPTION:</span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-slate-900 rounded-xl"><span className="text-slate-500 block text-[8px]">BLOOD PRESSURE</span><span className="text-rose-400 font-bold">{selectedCase.vitals.bp}</span></div>
                    <div className="p-2 bg-slate-900 rounded-xl"><span className="text-slate-500 block text-[8px]">HEMOGLOBIN</span><span className="text-amber-400 font-bold">{selectedCase.vitals.hb_g_dl || 'N/A'} g/dL</span></div>
                    <div className="p-2 bg-slate-900 rounded-xl"><span className="text-slate-500 block text-[8px]">SPO2 LEVEL</span><span className="text-emerald-400 font-bold">{selectedCase.vitals.spo2_pct}%</span></div>
                  </div>
                  <div className="text-white font-sans text-xs font-bold pt-1 border-t border-slate-900">Rx: {selectedCase.prescription}</div>
                  <div className="text-cyan-300 font-sans text-[11px]">Consultant: {selectedCase.specialist_consultant}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Referral Route:</strong> <span className="text-amber-400 font-mono">{selectedCase.referral_route}</span></div>
                  <div><strong>108 Ambulance Status:</strong> <span className="text-emerald-400 font-mono">{selectedCase.ambulance_108_status}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('telemed')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch ASHA Assisted Tele-Consultation Room ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Specialist Tele-Triage Engine</span>
                  </h4>
                  <form onSubmit={handleConsult} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Patient & Facility</label>
                      <input type="text" readOnly value={`${selectedCase.patient_name} (${selectedCase.village})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isConsulting} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isConsulting ? 'animate-spin' : ''}`} />
                      <span>{isConsulting ? 'Connecting Specialist & 108 Dispatch...' : 'Initiate Tele-Consultation'}</span>
                    </button>
                  </form>
                  {consultResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Consultant: <strong className="text-emerald-400 font-mono text-xs">{consultResult.specialist}</strong></div>
                      <div>Ambulance: <strong className="text-rose-400 font-mono text-xs block mt-0.5">{consultResult.ambulance}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TELEMED */}
        {activeTab === 'telemed' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-rose-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-rose-400 font-bold text-[10px] uppercase">RURAL LOW-BANDWIDTH TELEMEDICINE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Assisted Specialist Consultation Suite</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">WebRTC Encrypted</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Allows ASHA workers to capture digital stethoscope audio, SpO2 readings, and blood glucose in real time.</div>
              <div className="text-rose-400 font-bold pt-1 border-t border-slate-900">
                Operates seamlessly on 2G/3G networks with offline store-and-forward capability in tribal forest clusters.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MEDICINES */}
        {activeTab === 'medicines' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {medicines.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{m.medicine_code}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Facility: <strong className="text-white">{m.phc}</strong></div>
                  <div>Status: <strong className="text-emerald-400">{m.status}</strong></div>
                  {m.temp_c !== undefined && <div className="text-cyan-300">Temp: {m.temp_c}°C (Target: {m.target})</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: REFERRALS */}
        {activeTab === 'referrals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {referrals.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-rose-400 font-bold">{r.referral_id}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{r.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{r.patient}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Route: <strong className="text-white">{r.from_facility} ➔ {r.to_facility}</strong></div>
                  <div>Transport: <strong className="text-amber-400">{r.transport}</strong></div>
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
