import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Bug, 
  ShieldAlert, 
  RefreshCw, 
  Droplets, 
  Activity, 
  Sliders, 
  Globe 
} from 'lucide-react';

import alertsData from './data/crop_disease_outbreak_alerts.json';
import trapsData from './data/smart_pheromone_trap_telemetry.json';
import advisoriesData from './data/ipm_advisory_dosage_catalog.json';
import statsData from './data/mahapik_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [alerts, setAlerts] = useState(alertsData);
  const [selectedAlert, setSelectedAlert] = useState(alertsData[0]);
  const [traps, setTraps] = useState(trapsData);
  const [advisories, setAdvisories] = useState(advisoriesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'alerts' | 'diagnose' | 'traps' | 'ipm' | 'stats'>('alerts');

  // Interactive AI Crop Health Diagnostic Simulator
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagResult, setDiagResult] = useState<any>({
    pest: "Pink Bollworm (गुलाबी बोंडअळी)",
    conf: "98.4% AI Pathology",
    treatment: "Emamectin Benzoate 5% SG @ 4.5g / 10L Water",
    advisory: "गुलाबी बोंडअळीचा प्रादुर्भाव झाला आहे. तातडीने कामगंध सापळे लावा.",
    saved: "42% Yield Loss Prevented"
  });

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDiagnosing(true);
    setTimeout(() => {
      setDiagResult({
        pest: "Pink Bollworm (गुलाबी बोंडअळी)",
        conf: "98.4% AI Pathology",
        treatment: "Emamectin Benzoate 5% SG @ 4.5g / 10L Water",
        advisory: "गुलाबी बोंडअळीचा प्रादुर्भाव झाला आहे. तातडीने कामगंध सापळे लावा.",
        saved: "42% Yield Loss Prevented"
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
              <Sprout className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHAPIKRAKSHAK 360 CROP HEALTH • SIH26131</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaPikRakshak: AI Early Crop Disease Detection & Pest Infestation Management
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Visual Plant Pathology AI, Smart IoT Pheromone Trap Telemetry & Integrated Pest Management (IPM) Advisories
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
            { id: 'alerts', label: '🌾 Crop Health Alerts & Hotspots', count: alerts.length },
            { id: 'diagnose', label: '🔬 AI Plant Pathology Diagnostic' },
            { id: 'traps', label: '🪤 IoT Smart Pheromone Traps', count: traps.length },
            { id: 'ipm', label: '🧪 IPM Dosage & Bio-Control', count: advisories.length },
            { id: 'stats', label: '📊 Maharashtra Agronomic Telemetry' }
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
            VIEW 1: ALERTS
           ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alerts.map((a) => (
                <button
                  key={a.alert_id}
                  onClick={() => setSelectedAlert(a)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedAlert.alert_id === a.alert_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{a.alert_id}</span>
                    <span className="text-rose-400">{a.trap_moth_count_night} Moths/Night (ETL: {a.etl_threshold})</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? a.crop_name_mr : a.crop_name} • <span className="text-amber-300">{a.pest_disease}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{a.location} • {a.crop_stage}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Farmer: {a.farmer_name}</span>
                    <span className="text-emerald-400">Yield Saved: {a.yield_loss_prevented_pct}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedAlert.alert_id} • {selectedAlert.crop_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedAlert.pest_disease}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedAlert.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">RECOMMENDED INTEGRATED PEST MANAGEMENT (IPM) PRESCRIPTION:</span>
                  <div className="text-white font-sans text-xs font-bold leading-relaxed">{selectedAlert.recommended_ipm_treatment}</div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">{selectedAlert.marathi_advisory}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI PATHOLOGY CONFIDENCE</span><span className="text-emerald-400 font-bold">{selectedAlert.ai_diagnosis_confidence_pct}% Precision</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ESTIMATED YIELD SAVED</span><span className="text-cyan-400 font-bold">+{selectedAlert.yield_loss_prevented_pct}% Harvest</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('diagnose')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch AI Visual Plant Pathology Diagnostic Assistant ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Crop Health Diagnoser</span>
                  </h4>
                  <form onSubmit={handleDiagnose} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Crop & Field</label>
                      <input type="text" readOnly value={`${selectedAlert.crop_name} (${selectedAlert.location})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isDiagnosing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDiagnosing ? 'animate-spin' : ''}`} />
                      <span>{isDiagnosing ? 'Analyzing Pathology & ETL...' : 'Diagnose Plant Pathology'}</span>
                    </button>
                  </form>
                  {diagResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Prescription: <strong className="text-emerald-400 font-mono text-xs">{diagResult.treatment}</strong></div>
                      <div>Impact: <strong className="text-cyan-300 font-mono text-xs">{diagResult.saved}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DIAGNOSE */}
        {activeTab === 'diagnose' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">AI VISUAL PLANT PATHOLOGY ENGINE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Mobile Leaf Symptom & Pest Identifier</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">97.8% Accuracy</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Detects foliar lesions, bacterial blights, and moth larval bores in under <strong>400ms</strong> directly on farmers' smartphones.</div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-900">
                Prevents overuse of synthetic chemical pesticides by recommending biological antagonists (Trichoderma, Neem Extract).
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TRAPS */}
        {activeTab === 'traps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {traps.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-emerald-400 font-bold">{t.trap_id}</span>
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{t.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{t.crop} Solar Pheromone Node</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Moths Counted: <strong className="text-rose-400 font-mono">{t.moths_caught} Moths/Night</strong></div>
                  <div>Humidity & Temp: <strong className="text-cyan-300 font-mono">{t.humidity_pct}% RH @ {t.temp_c}°C</strong></div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900">Leaf Wetness: {t.leaf_wetness_hrs} Hours</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: IPM */}
        {activeTab === 'ipm' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {advisories.map((adv, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white font-sans">{adv.pest} Management</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Biological Bio-Control: <strong className="text-emerald-400">{adv.biological}</strong></div>
                  <div>Chemical Spray Dosage: <strong className="text-amber-300">{adv.chemical}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Safe Harvest Waiting: {adv.waiting_period_days} Days</div>
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
