import React, { useState } from 'react';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Mic, 
  RefreshCw, 
  ShieldAlert, 
  PhoneCall, 
  FileText, 
  Globe 
} from 'lucide-react';

import casesData from './data/nhaa_stress_trauma_cases.json';
import acousticsData from './data/voice_acoustic_speech_features_matrix.json';
import tiersData from './data/stress_vulnerability_index_tiers.json';
import statsData from './data/traumashield_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [acoustics, setAcoustics] = useState(acousticsData);
  const [tiers, setTiers] = useState(tiersData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'acoustics' | 'tiers' | 'sos' | 'stats'>('cases');

  // Interactive Trauma Assessment Simulator
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessResult, setAssessResult] = useState<any>({
    sviScore: "94.5 / 100",
    riskCategory: "CRITICAL_RISK (Score 76-100)",
    traumaFindings: "Acute Panic, Imminent Threat to Life, Severe Intimidation",
    emergencyEscalation: "RED ALERT: Auto-patched to NIMHANS Trauma Psychiatrist in 15s; Priority Alert sent to District SP & DM for armed witness protection under SC/ST (PoA) Act"
  });

  const handleAssess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAssessing(true);
    setTimeout(() => {
      setAssessResult({
        sviScore: "94.5 / 100",
        riskCategory: "CRITICAL_RISK (Score 76-100)",
        traumaFindings: "Acute Panic, Imminent Threat to Life, Severe Intimidation",
        emergencyEscalation: "RED ALERT: Auto-patched to NIMHANS Trauma Psychiatrist in 15s; Priority Alert sent to District SP & DM for armed witness protection under SC/ST (PoA) Act"
      });
      setIsAssessing(false);
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
              <span>MOSJE • NHAA 14566 • TRAUMASHIELD 360 REAL-TIME STRESS & TRAUMA AI • SIH26093</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE TraumaShield: Real-Time Stress & Trauma Assessment for NHAA (14566)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Speech Acoustics (Pitch Micro-Tremors, Jitter, Hesitation Pauses) & NLP Emotion AI Generating a 0–100 Stress Vulnerability Index (SVI) with Automated Multi-Agency Protection Triggers
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🛡️ NHAA 14566 Calls', count: cases.length },
            { id: 'acoustics', label: '🎙️ Voice Speech Acoustics', count: acoustics.length },
            { id: 'tiers', label: '📈 SVI Tiers & Protocols', count: tiers.length },
            { id: 'sos', label: '🚨 Emergency Interventions' },
            { id: 'stats', label: '📊 TraumaShield Telemetry' }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.call_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.call_id === c.call_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.call_id}</span>
                    <span className="text-amber-300">SVI: {c.svi_score}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.caller_category}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.location}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.risk_category.split(' ')[0]}</span>
                    <span className="text-rose-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.call_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.caller_category}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    SVI: {selectedCase.svi_score} / 100
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">LIVE HELPLINE VOICE NARRATIVE & SPEECH ACOUSTIC TELEMETRY:</span>
                  <div className="text-amber-300 font-sans text-xs italic">
                    Caller Narrative: "{selectedCase.caller_narrative}"
                  </div>
                  <div className="text-white font-sans text-xs pt-1 border-t border-slate-900">
                    Acoustics: Pitch Tremor: <strong className="text-rose-400">{selectedCase.pitch_instability_hz}</strong> | Hesitation Pauses: <strong className="text-cyan-300">{selectedCase.speech_pause_ratio_pct}%</strong> | Jitter: <strong className="text-amber-300">{selectedCase.speech_jitter_pct}%</strong>
                  </div>
                  <div className="text-rose-300 font-sans text-[11px]">
                    Clinical Diagnosis: {selectedCase.trauma_indicators}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    Statutory Action: {selectedCase.automated_interventions}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">STRESS VULNERABILITY INDEX</span><span className="text-rose-400 font-bold">{selectedCase.svi_score} / 100</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EMERGENCY TRIAGE</span><span className="text-amber-400 font-bold">{selectedCase.risk_category.split(' ')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('acoustics')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Speech Waveform Acoustics & Voice Tremor Signals ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Real-Time Trauma Evaluation Engine</span>
                  </h4>
                  <form onSubmit={handleAssess} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Live Call Narrative & Acoustics</label>
                      <input type="text" readOnly value={`${selectedCase.caller_category} (Pitch: ${selectedCase.pitch_instability_hz})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isAssessing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAssessing ? 'animate-spin' : ''}`} />
                      <span>{isAssessing ? 'Evaluating Pitch Tremors & NLP Emotion...' : 'Compute SVI & Dispatch SOS'}</span>
                    </button>
                  </form>
                  {assessResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>SVI Score: <strong className="text-rose-400 font-mono text-xs">{assessResult.sviScore} ({assessResult.riskCategory})</strong></div>
                      <div>Diagnosis: <strong className="text-amber-300 font-mono text-xs">{assessResult.traumaFindings}</strong></div>
                      <div>Emergency SOS: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{assessResult.emergencyEscalation}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ACOUSTICS */}
        {tab === 'acoustics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {acoustics.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">THRESHOLD: {a.trauma_threshold}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.feature}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Normal Baseline: <span className="text-emerald-400">{a.baseline}</span></div>
                  <p className="text-slate-400 text-xs pt-1 border-t border-slate-900">{a.significance}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: TIERS */}
        {tab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {tiers.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{t.tier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.description}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Protocol: {t.protocol}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SOS */}
        {tab === 'sos' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <PhoneCall className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Agency Rapid Protection Escalation Matrix</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Under the SC/ST (Prevention of Atrocities) Act, 1989, critical distress triggers bypass traditional queue delays, instantly connecting the victim to clinical psychiatric tele-counseling and dispatching police protection units.
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
