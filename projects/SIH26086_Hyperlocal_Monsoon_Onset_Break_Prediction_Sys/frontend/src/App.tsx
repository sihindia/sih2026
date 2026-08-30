import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Globe2, 
  Calendar, 
  RefreshCw, 
  Smartphone, 
  ShieldAlert, 
  CloudRain, 
  Globe 
} from 'lucide-react';

import casesData from './data/monsoon_onset_break_cases.json';
import teleconnectionsData from './data/global_teleconnections_enso_mjo_matrix.json';
import advisoriesData from './data/crop_specific_agronomic_advisories.json';
import statsData from './data/krishimonsoon_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [teleconnections, setTeleconnections] = useState(teleconnectionsData);
  const [advisories, setAdvisories] = useState(advisoriesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'teleconnections' | 'advisories' | 'broadcast' | 'stats'>('cases');

  // Interactive Onset/Break Simulator
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictResult, setPredictResult] = useState<any>({
    onsetAlert: "FALSE ONSET TRAP DETECTED: Deceptive shower on June 11",
    breakProbability: "84% Probability of 16-Day Dry Break (June 12 to June 27)",
    sowingGuidance: "POSTPONE SOWING: Defer Kharif sowing to June 28 revival surge",
    savingsPerAcre: "₹6,500/acre saved in avoided seed germination failure & re-tillage"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPredictResult({
        onsetAlert: "FALSE ONSET TRAP DETECTED: Deceptive shower on June 11",
        breakProbability: "84% Probability of 16-Day Dry Break (June 12 to June 27)",
        sowingGuidance: "POSTPONE SOWING: Defer Kharif sowing to June 28 revival surge",
        savingsPerAcre: "₹6,500/acre saved in avoided seed germination failure & re-tillage"
      });
      setIsPredicting(false);
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
              <span>NCMRWF • KRISHIMONSOON 360 BLOCK & VILLAGE ONSET/BREAK SYSTEM • SIH26086</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF KrishiMonsoon: Hyperlocal Monsoon Onset & Break Prediction System (Block/Village Scale)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Downscaling Global Climate Teleconnections (ENSO, IOD, MJO) to Panchayat-Level 7–30 Day Probabilistic Onset, False Onset & Dry-Break Forecasts
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🌱 Onset & Break Cases', count: cases.length },
            { id: 'teleconnections', label: '🌐 Teleconnections (ENSO/MJO)', count: teleconnections.length },
            { id: 'advisories', label: '🌾 Crop Agronomic Rules', count: advisories.length },
            { id: 'broadcast', label: '📱 Farmer SMS/WhatsApp' },
            { id: 'stats', label: '📊 KrishiMonsoon Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{c.case_id}</span>
                    <span className="text-amber-400">{c.lead_time_weeks}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.target_block}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Crop: {c.primary_crop}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Dry Break: {c.break_duration_days} Days</span>
                    <span className="text-emerald-400">DISPATCHED</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCase.case_id} • {selectedCase.target_block}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">Crop: {selectedCase.primary_crop}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.lead_time_weeks}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">GLOBAL TELECONNECTIONS & HYPERLOCAL DOWNSCALED OUTLOOK:</span>
                  <div className="text-slate-300 font-sans text-xs">Teleconnections: {selectedCase.teleconnection_signals}</div>
                  <div className="text-rose-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Downscaled Prediction: <strong>{selectedCase.hyperlocal_ai_prediction}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Financial Risk Avoided: <strong>{selectedCase.financial_risk_without_ai}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Agronomic Recommendation: {selectedCase.crop_agronomic_advisory}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PREDICTED DRY BREAK</span><span className="text-rose-400 font-bold">{selectedCase.break_duration_days} Days</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">HORIZON FORESIGHT</span><span className="text-emerald-400 font-bold">{selectedCase.forecast_horizon_days} Days Ahead</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('teleconnections')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect ENSO, IOD & MJO Planetary Teleconnections Downscaling ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Hyperlocal Onset & Break Engine</span>
                  </h4>
                  <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Block & Crop</label>
                      <input type="text" readOnly value={`${selectedCase.target_block} (${selectedCase.primary_crop})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Downscaling Global Climate Indices...' : 'Predict Onset & Break Risk'}</span>
                    </button>
                  </form>
                  {predictResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <strong className="text-rose-400 font-mono text-xs">{predictResult.onsetAlert}</strong></div>
                      <div>Dry Break: <strong className="text-amber-300 font-mono text-xs">{predictResult.breakProbability}</strong></div>
                      <div>Farmer Savings: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{predictResult.savingsPerAcre}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TELECONNECTIONS */}
        {tab === 'teleconnections' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {teleconnections.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{t.signal}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.role}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Favorable: <strong className="text-emerald-400">{t.favorable_phases}</strong></div>
                  <div className="text-rose-400 text-[11px] pt-1 border-t border-slate-900">Suppressed: {t.suppressed_phases}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ADVISORIES */}
        {tab === 'advisories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {advisories.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{a.crop}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.vulnerability}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{a.action_rule}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: BROADCAST */}
        {tab === 'broadcast' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multilingual Automated Farmer WhatsApp & SMS Broadcast Gateway</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Delivers hyper-localized, crop-specific voice and text advisories in regional Indian languages directly to registered farmer mobile phones and village Kisan Call Centres 2 to 4 weeks in advance.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
