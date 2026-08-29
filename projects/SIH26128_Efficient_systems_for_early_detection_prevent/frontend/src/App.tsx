import React, { useState } from 'react';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Syringe, 
  ShieldAlert, 
  RefreshCw, 
  FileText, 
  Activity, 
  Sliders, 
  Globe 
} from 'lucide-react';

import outbreaksData from './data/livestock_disease_outbreaks.json';
import herdsData from './data/herd_vaccination_records.json';
import samplesData from './data/veterinary_lab_samples.json';
import statsData from './data/pashu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'ta' | 'en'>('mr');
  const [outbreaks, setOutbreaks] = useState(outbreaksData);
  const [selectedOutbreak, setSelectedOutbreak] = useState(outbreaksData[0]);
  const [herds, setHerds] = useState(herdsData);
  const [samples, setSamples] = useState(samplesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'outbreaks' | 'triage' | 'vaccines' | 'labs' | 'stats'>('outbreaks');

  // Interactive AI Symptom Diagnostic Triage Simulator
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [triageResult, setTriageResult] = useState<any>({
    disease: "Suspected Lumpy Skin Disease (LSD)",
    conf: "98.6% AI Precision",
    quarantine: "5.0 km Ring Vaccination",
    advisory: "तात्काळ जनावराला वेगळे ठेवा. डास-माशांपासून संरक्षण करा.",
    status: "EMERGENCY_VET_DISPATCHED"
  });

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDiagnosing(true);
    setTimeout(() => {
      setTriageResult({
        disease: "Suspected Lumpy Skin Disease (LSD)",
        conf: "98.6% AI Precision",
        quarantine: "5.0 km Ring Vaccination",
        advisory: "तात्काळ जनावराला वेगळे ठेवा. डास-माशांपासून संरक्षण करा.",
        status: "EMERGENCY_VET_DISPATCHED"
      });
      setIsDiagnosing(false);
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
              <span>GOVERNMENT OF MAHARASHTRA • PASHURAKSHAK 360 LIVESTOCK HEALTH • SIH26128</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              PashuRakshak: AI Livestock Disease Surveillance & Outbreak Early Warning
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              AI Symptom Triage (LSD, FMD, BQ), Geospatial Containment Rings & Bharat Pashudhan Herd Vaccination Sync
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'outbreaks', label: '🐄 Disease Outbreaks & Triage', count: outbreaks.length },
            { id: 'triage', label: '🩺 AI Symptom Diagnostic Assistant' },
            { id: 'vaccines', label: '💉 Herd Vaccination Database', count: herds.length },
            { id: 'labs', label: '🧪 Veterinary Lab Sample Referrals', count: samples.length },
            { id: 'stats', label: '📊 Maharashtra Animal Husbandry Telemetry' }
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

        {/* =========================================================================
            VIEW 1: OUTBREAKS
           ========================================================================= */}
        {activeTab === 'outbreaks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outbreaks.map((o) => (
                <button
                  key={o.case_id}
                  onClick={() => setSelectedOutbreak(o)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedOutbreak.case_id === o.case_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{o.case_id}</span>
                    <span className="text-rose-400">{o.quarantine_ring_km}km Ring</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? o.disease_name_mr : o.disease_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{o.village}, {o.district} • {o.species}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Farmer: {o.farmer_name}</span>
                    <span className="text-emerald-400">{o.ai_triage_confidence_pct}% AI Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedOutbreak.case_id} • Tag: {selectedOutbreak.animal_tag_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedOutbreak.disease_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedOutbreak.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">REPORTED SYMPTOMS & CLINICAL TRIAGE:</span>
                  <div className="grid grid-cols-2 gap-2 font-sans text-xs text-slate-300">
                    {selectedOutbreak.symptoms.map((s, idx) => (
                      <div key={idx} className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Epidemic Containment Action:</strong> <span className="text-amber-400 font-mono">{selectedOutbreak.containment_action}</span></div>
                  <div><strong>Diagnostic Lab Sample:</strong> <span className="text-cyan-300 font-mono">{selectedOutbreak.lab_sample_id}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('triage')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch AI Symptom Diagnostic & Triage Assistant ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Outbreak Diagnostic Triage</span>
                  </h4>
                  <form onSubmit={handleDiagnose} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Animal Ear Tag ID</label>
                      <input type="text" readOnly value={selectedOutbreak.animal_tag_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isDiagnosing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDiagnosing ? 'animate-spin' : ''}`} />
                      <span>{isDiagnosing ? 'Analyzing Symptoms & Vector Risk...' : 'Run Outbreak Diagnostic Triage'}</span>
                    </button>
                  </form>
                  {triageResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Diagnosis: <strong className="text-emerald-400 font-mono text-xs">{triageResult.disease} ({triageResult.conf})</strong></div>
                      <div>Advisory: <strong className="text-amber-300 font-sans text-xs block mt-1">{triageResult.advisory}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TRIAGE */}
        {activeTab === 'triage' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">LIVESTOCK EPIDEMIC TRIAGE ENGINE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Differential Clinical Diagnosis & Isolation Ring</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">98.6% Accuracy</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Automatically correlates farmer-reported symptoms with rainfall, temperature, and insect vector prevalence.</div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-900">
                Dispatches automated Marathi SMS advisories to all livestock owners within a 5km radius to halt cattle market movement.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: VACCINES */}
        {activeTab === 'vaccines' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {herds.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-[10px]">{h.tag_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.breed} ({h.owner})</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>FMD Vaccination: <strong className="text-emerald-400">{h.fmd_status}</strong></div>
                  <div>LSD Status: <strong className="text-amber-300">{h.lsd_status}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Milk Yield: {h.milk_l_day} L/Day</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LABS */}
        {activeTab === 'labs' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {samples.map((s, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-emerald-400 font-bold">{s.sample_id}</span>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{s.result}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white font-sans">{s.test_type}</h4>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>Specimen: <strong className="text-white">{s.specimen}</strong></div>
                    <div className="text-slate-400">{s.lab}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: STATS */}
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
