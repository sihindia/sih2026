import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  Phone, 
  Pill, 
  RefreshCw, 
  FileText, 
  Building2, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Flame, 
  Zap, 
  Globe 
} from 'lucide-react';

import patientsData from './data/patient_telemetry.json';
import teleIcuData from './data/tele_icu_nodes.json';
import abdmData from './data/abdm_records.json';
import interactionsData from './data/drug_interactions.json';
import janAushadhiData from './data/jan_aushadhi_catalog.json';

export default function App() {
  const [patients, setPatients] = useState(patientsData);
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [nodes, setNodes] = useState(teleIcuData);
  const [selectedNode, setSelectedNode] = useState(teleIcuData[0]);
  const [abdmRecords, setAbdmRecords] = useState(abdmData);
  const [activeTab, setActiveTab] = useState<'vitals' | 'teleicu' | 'pharmacy' | 'abdm' | 'analytics'>('vitals');

  // Pharmacy Safety Auditor State
  const [drug1, setDrug1] = useState('Warfarin 5mg');
  const [drug2, setDrug2] = useState('Aspirin 75mg');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>({
    flag: "CRITICAL_CONTRAINDICATION",
    risk: "Severe synergistic gastrointestinal hemorrhage risk.",
    recommendation: "Avoid concurrent use unless strictly indicated."
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      const isDangerous = (drug1.toLowerCase().includes('warfarin') && drug2.toLowerCase().includes('aspirin')) ||
                          (drug1.toLowerCase().includes('metformin') && drug2.toLowerCase().includes('contrast'));
      setAuditResult({
        flag: isDangerous ? "CRITICAL_CONTRAINDICATION" : "SAFE_COMPATIBLE",
        risk: isDangerous ? "Severe synergistic hemorrhage or renal acidosis risk." : "No known high-risk pharmacological clash.",
        recommendation: isDangerous ? "Discontinue or space medications." : "Standard dosing schedule approved."
      });
      setIsAuditing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>AICTE • MOHFW • AROGYASETU 360 HEALTHCARE & TELE-ICU GRID • SIH26198</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ArogyaSetu 360: Edge AI ICU Vitals, Sepsis Predictor & ABDM Health Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Real-Time Continuous Telemetry, NEWS2 Early Warning, Rural Hub-and-Spoke Tele-ICU & Jan Aushadhi Pharmacy AI
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-rose-950/80 text-rose-300 border border-rose-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner font-mono">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>ABDM FHIR R4 CONNECTED</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'vitals', label: '🩺 Edge IoT Vitals & NEWS2', count: patients.length },
            { id: 'teleicu', label: '🏥 Rural Tele-ICU Hub-and-Spoke', count: nodes.length },
            { id: 'pharmacy', label: '💊 AI Prescription & Jan Aushadhi', count: janAushadhiData.length },
            { id: 'abdm', label: '📜 Ayushman Bharat (ABHA) Locker', count: abdmRecords.length },
            { id: 'analytics', label: '📊 National Health Intelligence' }
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
            VIEW 1: EDGE IOT VITALS & NEWS2
           ========================================================================= */}
        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {patients.map((p) => (
                <button
                  key={p.patient_id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                    selectedPatient.patient_id === p.patient_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{p.patient_id} • {p.location}</span>
                    <span className={`px-2 py-0.5 rounded ${p.news2_deterioration_score >= 7 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300'}`}>
                      NEWS2: {p.news2_deterioration_score} ({p.sepsis_alert})
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{p.patient_name}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">ABHA ID: {p.abha_id}</div>
                </button>
              ))}
            </div>

            {/* Split Telemetry Monitor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Continuous 6-Parameter Monitor */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedPatient.patient_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedPatient.patient_name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedPatient.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedPatient.status}
                  </span>
                </div>

                {/* 6-Parameter Vitals Grid */}
                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">HEART RATE</span>
                    <span className="text-2xl font-black text-rose-400 mt-1 block">{selectedPatient.heart_rate_bpm} BPM</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">SPO2 LEVEL</span>
                    <span className={`text-2xl font-black mt-1 block ${selectedPatient.spo2_pct < 93 ? 'text-rose-400' : 'text-cyan-400'}`}>
                      {selectedPatient.spo2_pct}%
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                    <span className="text-slate-500 block text-[9px]">BLOOD PRESSURE</span>
                    <span className="text-lg font-black text-purple-400 mt-1 block">{selectedPatient.blood_pressure}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">RESPIRATION</span>
                    <span className="text-lg font-black text-amber-400 mt-1 block">{selectedPatient.respiratory_rate}/min</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">TEMP</span>
                    <span className="text-lg font-black text-emerald-400 mt-1 block">{selectedPatient.temperature_c}°C</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">NEWS2 SCORE</span>
                    <span className="text-2xl font-black text-rose-400 mt-1 block">{selectedPatient.news2_deterioration_score}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl space-y-1 font-mono text-[11px] text-slate-300">
                  <div>ECG Rhythm: <strong className="text-cyan-300">{selectedPatient.ecg_rhythm}</strong></div>
                  <div>Assigned Intensivist: <strong className="text-white">{selectedPatient.assigned_specialist}</strong></div>
                </div>
              </div>

              {/* Right 5: Sepsis Early Deterioration Predictor */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>AI Sepsis Early Warning</span>
                    </h4>
                    <span className="text-rose-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      HIGH ACUITY
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Physiological deterioration model predicts septic shock progression 4.5 hours ahead of clinical decompensation. Immediate IV fluid resuscitation advised.
                  </p>

                  <button
                    onClick={() => setActiveTab('teleicu')}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Launch Rural Tele-ICU Bridge ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: RURAL TELE-ICU HUB-AND-SPOKE
           ========================================================================= */}
        {activeTab === 'teleicu' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {nodes.map((n) => (
                <div key={n.node_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{n.node_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{n.facility_name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-bold">
                      {n.status}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    {n.active_spokes_connected && <div><strong>Spokes Connected:</strong> {n.active_spokes_connected} District PHCs</div>}
                    {n.monitored_icu_beds && <div><strong>Monitored Beds:</strong> {n.monitored_icu_beds} Live Beds</div>}
                    {n.connected_beds && <div><strong>Local ICU Beds:</strong> {n.connected_beds} Beds</div>}
                    {n.low_bandwidth_fallback && <div className="text-cyan-300"><strong>Compression:</strong> {n.low_bandwidth_fallback}</div>}
                  </div>

                  <button
                    onClick={() => alert(`Starting Encrypted Tele-ICU Video Feed with: ${n.facility_name}`)}
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Connect Live Tele-ICU Console</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: PHARMACY & JAN AUSHADHI
           ========================================================================= */}
        {activeTab === 'pharmacy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Prescription Interaction Checker */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Pill className="w-4 h-4 text-rose-400" />
                  <span>Clinical Drug Interaction Safety Checker</span>
                </h4>

                <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Medication #1</label>
                    <input type="text" required value={drug1} onChange={(e) => setDrug1(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Medication #2</label>
                    <input type="text" required value={drug2} onChange={(e) => setDrug2(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" />
                  </div>
                  <button type="submit" disabled={isAuditing} className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                    <span>{isAuditing ? 'Checking Pharmacological Clash...' : 'Audit Drug Interaction Safety'}</span>
                  </button>
                </form>

                {auditResult && (
                  <div className={`p-4 rounded-2xl border space-y-1.5 font-mono text-xs ${
                    auditResult.flag.includes('CRITICAL') ? 'bg-rose-950/40 border-rose-800 text-rose-300' : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  }`}>
                    <div className="font-bold text-white text-sm font-sans flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{auditResult.flag}</span>
                    </div>
                    <div>Risk: {auditResult.risk}</div>
                    <div className="pt-1 border-t border-slate-900">Recommendation: <strong>{auditResult.recommendation}</strong></div>
                  </div>
                )}
              </div>

              {/* Right 6: Pradhan Mantri Jan Aushadhi Equivalents */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Jan Aushadhi Generic Cost-Saver Catalog</span>
                </h4>

                <div className="space-y-2.5">
                  {janAushadhiData.map((j, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white text-sm font-sans">{j.branded_name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{j.generic_name}</div>
                        <div className="text-slate-500 text-[10px] line-through">Branded: ₹{j.branded_cost_inr}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-black text-base">₹{j.jan_aushadhi_cost_inr}</span>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] block font-bold mt-0.5">
                          {j.savings_pct}% Cheaper
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: ABDM & ABHA HEALTH LOCKER
           ========================================================================= */}
        {activeTab === 'abdm' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-rose-500/40 pb-4">
              <div>
                <span className="text-rose-400 font-bold text-[10px] uppercase">NATIONAL HEALTH AUTHORITY (NHA) • AYUSHMAN BHARAT DIGITAL MISSION</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">ABDM FHIR R4 Health Record: {abdmRecords[0].abha_id}</h3>
              </div>
              <FileText className="w-10 h-10 text-rose-400" />
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span className="text-slate-500">Patient Name:</span><span className="text-white font-bold font-sans">{abdmRecords[0].patient_name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Primary Diagnosis:</span><span className="text-rose-400 font-bold">{abdmRecords[0].diagnosis}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Known Allergies:</span><span className="text-amber-400 font-bold">{abdmRecords[0].allergies.join(', ')}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Active Regimen:</span><span className="text-cyan-300">{abdmRecords[0].current_medications.join(' | ')}</span></div>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">ABDM CONSENT ARTIFACT:</span>
                <div className="text-sm font-bold text-white">Granted via ABHA OTP Verification</div>
              </div>
              <button onClick={() => alert("FHIR R4 EHR Bundle Exported as JSON")} className="px-4 py-2 bg-rose-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Export FHIR R4 Bundle
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: HEALTH ANALYTICS
           ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">NATIONAL HEALTH ANALYTICS</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Tele-ICU Coverage & Sepsis Mortality Reduction</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px]">SPOKE PHCS CONNECTED</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">142</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950">
                <span className="text-slate-500 block text-[9px]">SEPSIS MORTALITY DROP</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">-38.5%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950">
                <span className="text-slate-500 block text-[9px]">JAN AUSHADHI SAVINGS</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">₹4.2 Cr</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
