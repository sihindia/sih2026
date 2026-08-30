import React, { useState } from 'react';
import { 
  Mic, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  PhoneCall, 
  RefreshCw, 
  Radio, 
  Sliders, 
  Globe 
} from 'lucide-react';

import incidentsData from './data/voice_cloning_attack_incidents.json';
import detectorsData from './data/deepfake_speech_detectors.json';
import gatewaysData from './data/telecom_voip_gateways.json';
import statsData from './data/voiceguard_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [incidents, setIncidents] = useState(incidentsData);
  const [selectedInc, setSelectedInc] = useState(incidentsData[0]);
  const [detectors, setDetectors] = useState(detectorsData);
  const [gateways, setGateways] = useState(gatewaysData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'incidents' | 'detectors' | 'gateways' | 'dialects' | 'stats'>('incidents');

  // Interactive Live Voice Analysis Simulator
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    risk: "96.4 / 100 (Critical Deepfake Attack)",
    synthesizer: "VITS2 Neural TTS with 3s Zero-Shot Voice Clone",
    artifacts: "98.8% Phase Discontinuity in CQT Spectrogram",
    action: "Call Intercepted (185ms) • Out-of-Band Push Notification Dispatched"
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        risk: "96.4 / 100 (Critical Deepfake Attack)",
        synthesizer: "VITS2 Neural TTS with 3s Zero-Shot Voice Clone",
        artifacts: "98.8% Phase Discontinuity in CQT Spectrogram",
        action: "Call Intercepted (185ms) • Out-of-Band Push Notification Dispatched"
      });
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Mic className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>AICTE • VOICEGUARD 360 REAL-TIME VOICE CLONING DEFENSE SHIELD • SIH26104</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AICTE VoiceGuard: Real-Time Detection & Prevention of Voice Cloning Impersonation
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Acoustic & Spectral Artifact Neural Analysis (<250ms), Biometric Pitch Jitter Verification & VoIP Call Interception
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'incidents', label: '🎙️ Voice Impersonation Incidents', count: incidents.length },
            { id: 'detectors', label: '🧠 Deepfake Speech Detectors', count: detectors.length },
            { id: 'gateways', label: '📞 VoIP & Telecom Interceptor', count: gateways.length },
            { id: 'dialects', label: '🌐 12 Indian Dialect Resilience' },
            { id: 'stats', label: '📊 VoiceGuard Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: INCIDENTS
           ========================================================================= */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => setSelectedInc(inc)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedInc.incident_id === inc.incident_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{inc.incident_id}</span>
                    <span className="text-rose-400">Risk: {inc.impersonation_risk_score}/100</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {inc.caller_id}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Target: {inc.target_personnel}</div>
                  <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Synth: {inc.synthesizer_detected.split(' ')[0]}</span>
                    <span className="text-emerald-400">{inc.status}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedInc.incident_id} • {selectedInc.caller_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedInc.target_personnel}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedInc.risk_classification}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">ACOUSTIC ARTIFACTS & REAL-TIME INTERCEPTION:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedInc.spectral_artifacts}</div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    System Action: <strong>{selectedInc.system_action}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SYNTHESIZER MODEL</span><span className="text-purple-400 font-bold">{selectedInc.synthesizer_detected.split(' ')[0]}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">IMPERSONATION RISK</span><span className="text-rose-400 font-bold">{selectedInc.impersonation_risk_score} / 100</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('detectors')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine RawNet3 Acoustic Artifact & Jitter Neural Networks ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Real-Time Voice Stream Inspector</span>
                  </h4>
                  <form onSubmit={handleAnalyze} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Live Call Audio Stream (VoIP / 16kHz PCM)</label>
                      <input type="text" readOnly value={`${selectedInc.caller_id} ➔ ${selectedInc.target_personnel.slice(0, 30)}...`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" />
                    </div>
                    <button type="submit" disabled={isAnalyzing} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span>{isAnalyzing ? 'Extracting MFCCs & CQT Phase Inconsistencies...' : 'Inspect Ongoing Live Voice Stream'}</span>
                    </button>
                  </form>
                  {analysisResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-rose-400 font-mono text-xs">{analysisResult.risk}</strong></div>
                      <div>Action: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{analysisResult.action}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DETECTORS */}
        {activeTab === 'detectors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {detectors.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold">EER: {d.eer_pct}%</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.detector_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{d.target}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: GATEWAYS */}
        {activeTab === 'gateways' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {gateways.map((g, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">ACTIVE INTERCEPTOR</span>
                <h4 className="font-bold text-sm text-white font-sans">{g.gateway_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Capacity: <strong className="text-white">{g.throughput}</strong></div>
                  <div>Latency: <strong className="text-cyan-400">{g.avg_latency_ms} ms</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DIALECTS */}
        {activeTab === 'dialects' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-400">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Lingual Indian Dialect & Accent Resilience Shield</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Trained across 12 Indian languages (Hindi, Tamil, Bengali, Telugu, Marathi, Punjabi, Kannada, Gujarati, Malayalam, Odia, Assamese & Indian English).
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
