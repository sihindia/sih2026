import React, { useState } from 'react';
import { 
  HardHat, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  ShieldCheck, 
  RefreshCw, 
  QrCode, 
  Languages, 
  Flame, 
  Globe 
} from 'lucide-react';

import casesData from './data/vocational_training_cases.json';
import modulesData from './data/industrial_safety_modules_curriculum.json';
import lexiconData from './data/multilingual_santali_hindi_lexicon.json';
import statsData from './data/surakshatraining_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sat' | 'mr' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [modules, setModules] = useState(modulesData);
  const [lexicon, setLexicon] = useState(lexiconData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'viewport' | 'modules' | 'lexicon' | 'stats'>('cases');

  // Interactive AR Drill Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>({
    score: "96.0 / 100",
    rating: "GRADE_A (DGMS Dhanbad Certified)",
    certNumber: "CERT-JH-SAFE-2026-DHN091",
    evacuationTime: "22 Seconds (Compliant with <30s standard)",
    feedback: "Filter Self-Rescuer properly clipped; followed green AR lasers to refuge airway"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setEvalResult({
        score: "96.0 / 100",
        rating: "GRADE_A (DGMS Dhanbad Certified)",
        certNumber: "CERT-JH-SAFE-2026-DHN091",
        evacuationTime: "22 Seconds (Compliant with <30s standard)",
        feedback: "Filter Self-Rescuer properly clipped; followed green AR lasers to refuge airway"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <HardHat className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>JHARKHAND • SURAKSHAAR 360 VOCATIONAL INDUSTRIAL SAFETY AR • SIH26041</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Jharkhand SurakshaAR: Mobile AR Vocational Safety Simulator for Mining & Manufacturing
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Compliance under DGMS Dhanbad, Factories Act 1948 & Mines Act 1952 via Mid-Range Smartphone AR with Hindi & Tribal Santali (Ol Chiki) Voiceover Support
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sat')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sat' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>ᱥᱟᱱᱛᱟᱲᱤ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🦺 Safety Drill Trials', count: cases.length },
            { id: 'viewport', label: '📱 Mobile AR Viewport' },
            { id: 'modules', label: '📚 5 DGMS Safety Modules', count: modules.length },
            { id: 'lexicon', label: '🗣️ Santali & Hindi Lexicon', count: lexicon.length },
            { id: 'stats', label: '📊 SurakshaAR Telemetry' }
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
                  key={c.trial_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.trial_id === c.trial_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.trial_id}</span>
                    <span className="text-emerald-400">{c.completion_score} / 100</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.trainee_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.workplace.split(',')[0]}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.safety_module.split(':')[0]}</span>
                    <span className="text-emerald-400">CERTIFIED</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.trial_id} • {selectedCase.workplace}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.safety_module}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.dgms_rating}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">MOBILE AR DRILL ACTIONS & DGMS SAFETY VERIFICATION:</span>
                  <div className="text-white font-sans text-xs">
                    Trainee: <strong className="text-amber-300">{selectedCase.trainee_name}</strong> | Audio Mode: <strong className="text-emerald-400">{selectedCase.language}</strong>
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Simulated Hazard: {selectedCase.ar_scenario}
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    AR Action Execution: {selectedCase.drill_actions}
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    QR Stamped Certificate: <strong className="text-cyan-300">{selectedCase.qr_certificate}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ASSESSMENT SCORE</span><span className="text-emerald-400 font-bold">{selectedCase.completion_score} / 100</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DGMS STATUS</span><span className="text-amber-400 font-bold">{selectedCase.dgms_rating.split(' ')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('viewport')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Smartphone Camera AR Hazard Viewport ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant AR Drill Evaluation</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Trainee & Drill Scenario</label>
                      <input type="text" readOnly value={`${selectedCase.trainee_name} (${selectedCase.ar_scenario.split('&')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Evaluating Timing & Spatial AR Compliance...' : 'Score AR Drill & Issue QR Pass'}</span>
                    </button>
                  </form>
                  {evalResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-emerald-400 font-mono text-xs">{evalResult.score} ({evalResult.rating})</strong></div>
                      <div>Response Time: <strong className="text-amber-300 font-mono text-xs">{evalResult.evacuationTime}</strong></div>
                      <div>Certificate: <strong className="text-cyan-300 font-mono text-xs">{evalResult.certNumber}</strong></div>
                      <div>Feedback: <strong className="text-white font-mono text-xs block mt-0.5">{evalResult.feedback}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: VIEWPORT */}
        {tab === 'viewport' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Smartphone className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Smartphone Markerless AR Camera Viewport</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Operates on standard mid-range Android phones (Android 10+) using camera-based SLAM to overlay interactive fire extinguishers, methane plumes, and conveyor lockout levers without requiring any expensive VR goggles.
            </p>
          </div>
        )}

        {/* VIEW 3: MODULES */}
        {tab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {modules.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{m.module_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.focus}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LEXICON */}
        {tab === 'lexicon' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {lexicon.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{l.term_en}</span>
                <h4 className="font-bold text-sm text-amber-300 font-sans">{l.term_hi}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="text-emerald-400 font-bold text-sm">Santali: {l.term_santali}</div>
                  <div className="text-slate-400 text-xs pt-1 border-t border-slate-900">{l.audio_cue}</div>
                </div>
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
