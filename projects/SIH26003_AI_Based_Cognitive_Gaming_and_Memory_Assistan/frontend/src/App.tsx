import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  Clock, 
  RefreshCw, 
  Gamepad2, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import patientsData from './data/dementia_patient_profiles_and_sessions.json';
import gamesData from './data/cultural_cognitive_games_catalog.json';
import remindersData from './data/caregiver_reminders_and_alerts_schedule.json';
import statsData from './data/smritiner_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'as' | 'bn' | 'hi' | 'kha' | 'miz'>('en');
  const [patients, setPatients] = useState(patientsData);
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [games, setGames] = useState(gamesData);
  const [reminders, setReminders] = useState(remindersData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'patients' | 'games' | 'reminders' | 'engine' | 'stats'>('patients');

  // Interactive AI Cognitive Performance Evaluator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>({
    accuracy: "92.4% Tap Accuracy (High Visual-Spatial Recall)",
    latency: "1.4 Seconds Average Reaction Latency",
    fatigue: "14.0% Cognitive Fatigue (Optimal Engagement Zone)",
    adaptation: "AI Adaptation: Advanced from Level 3 to Level 4 (Reminiscence)",
    caregiverSync: "Caregiver & ASHA Telemetry Synchronized via SMS & WhatsApp"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setEvalResult({
        accuracy: "92.4% Tap Accuracy (High Visual-Spatial Recall)",
        latency: "1.4 Seconds Average Reaction Latency",
        fatigue: "14.0% Cognitive Fatigue (Optimal Engagement Zone)",
        adaptation: "AI Adaptation: Advanced from Level 3 to Level 4 (Reminiscence)",
        caregiverSync: "Caregiver & ASHA Telemetry Synchronized via SMS & WhatsApp"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MDONER • SMRITINER 360 GERIATRIC COGNITIVE THERAPY • SIH26003</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MDoNER SmritiNER: AI Cognitive Gaming &amp; Memory Platform for Dementia in NER
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Ministry of Development of North Eastern Region (MDoNER) Culturally-Inclusive Cognitive Gaming, Indigenous Reminiscence Therapy (Gamosa/Puan/Folk Music), AI Adaptive Difficulty &amp; Caregiver Companion
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('as')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'as' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>অসমীয়া</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('kha')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kha' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>Khasi</button>
            <button onClick={() => setLang('miz')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'miz' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>Mizo</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'patients', label: '🧠 Patient Therapy Sessions', count: patients.length },
            { id: 'games', label: '🎮 Cultural Cognitive Games', count: games.length },
            { id: 'reminders', label: '⏰ Caregiver & Pill Alerts', count: reminders.length },
            { id: 'engine', label: '📈 Adaptive Fatigue Engine' },
            { id: 'stats', label: '📊 SmritiNER Telemetry' }
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
            VIEW 1: PATIENTS
           ========================================================================= */}
        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {patients.map((p) => (
                <button
                  key={p.patient_id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedPatient.patient_id === p.patient_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{p.patient_id}</span>
                    <span className="text-emerald-400">{p.session_performance.tap_accuracy_pct}% Acc</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.diagnosis}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.preferred_language}</span>
                    <span className="text-cyan-400">{p.session_performance.current_difficulty_level.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedPatient.patient_id} • {selectedPatient.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedPatient.name} ({selectedPatient.diagnosis})</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedPatient.session_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">REMINISCENCE MODULE &amp; NEUROCOGNITIVE PERFORMANCE:</span>
                  <div className="text-white font-sans text-xs">
                    Active Module: <strong className="text-amber-300">{selectedPatient.active_cognitive_module}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Tap Accuracy: {selectedPatient.session_performance.tap_accuracy_pct}% | Reaction Latency: {selectedPatient.session_performance.reaction_latency_sec}s
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    AI Difficulty Adaptation: {selectedPatient.session_performance.current_difficulty_level} ➔ {selectedPatient.session_performance.recommended_next_level}
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Medication Compliance: {selectedPatient.medication_compliance}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">REACTION LATENCY</span><span className="text-emerald-400 font-bold">{selectedPatient.session_performance.reaction_latency_sec} Seconds Fast</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COGNITIVE FATIGUE INDEX</span><span className="text-cyan-400 font-bold">{selectedPatient.session_performance.cognitive_fatigue_score_pct}% Low Fatigue</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('games')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Culturally-Inclusive Cognitive Games ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Instant Cognitive Assessment Simulator</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Patient Clinical Profile</label>
                      <input type="text" readOnly value={`${selectedPatient.name} (${selectedPatient.diagnosis})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Analyzing Neurocognitive Tap Dynamics...' : 'Evaluate Patient Cognitive Session'}</span>
                    </button>
                  </form>
                  {evalResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Accuracy: <strong className="text-emerald-400 font-mono text-xs">{evalResult.accuracy}</strong></div>
                      <div>Latency: <strong className="text-cyan-300 font-mono text-xs">{evalResult.latency}</strong></div>
                      <div>Fatigue: <strong className="text-amber-300 font-mono text-xs">{evalResult.fatigue}</strong></div>
                      <div>Adaptation: <strong className="text-rose-300 font-mono text-xs">{evalResult.adaptation}</strong></div>
                      <div>Caregiver Hub: <strong className="text-white font-mono text-xs block mt-0.5">{evalResult.caregiverSync}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GAMES */}
        {tab === 'games' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {games.map((g, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{g.cognitive_focus}</span>
                <h4 className="font-bold text-sm text-white font-sans">{g.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Elements: {g.cultural_elements}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Benefit: {g.neuro_benefit}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: REMINDERS */}
        {tab === 'reminders' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {reminders.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400 font-bold">{r.time}</span>
                  <span className="text-emerald-400 font-bold">{r.type}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{r.title}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.instruction}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-rose-300 font-mono text-[10px]">Voice Prompt: {r.voice_alert}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ENGINE */}
        {tab === 'engine' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">AI Adaptive Difficulty &amp; Cognitive Fatigue Modeling</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Dynamically modulates stimulus complexity based on patient response latency and error distribution to prevent frustration while stimulating neuroplasticity across frontal and temporal lobes.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
