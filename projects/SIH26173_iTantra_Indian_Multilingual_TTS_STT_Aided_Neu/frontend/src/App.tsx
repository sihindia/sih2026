import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Volume2, 
  Mic, 
  RefreshCw, 
  Wifi, 
  Activity, 
  Share2, 
  Globe 
} from 'lucide-react';

import sessionsData from './data/multilingual_voice_sessions.json';
import languagesData from './data/indian_languages_speech_models.json';
import telemetryData from './data/radio_access_link_telemetry.json';
import statsData from './data/itantra_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [sessions, setSessions] = useState(sessionsData);
  const [selectedSession, setSelectedSession] = useState(sessionsData[0]);
  const [languages, setLanguages] = useState(languagesData);
  const [telemetry, setTelemetry] = useState(telemetryData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'sessions' | 'languages' | 'compression' | 'emergency' | 'stats'>('sessions');

  // Interactive Push-To-Talk Simulator
  const [isTalking, setIsTalking] = useState(false);
  const [pttResult, setPttResult] = useState<any>({
    stt: "180 ms",
    ble: "45 ms",
    tts: "140 ms",
    total: "365 ms (Sub-Second)",
    size: "48 Bytes (0.96 kbps)",
    status: "MAX_VOLUME_SPEECH_SYNTHESIZED"
  });

  const handlePtt = () => {
    setIsTalking(true);
    setTimeout(() => {
      setPttResult({
        stt: "180 ms",
        ble: "45 ms",
        tts: "140 ms",
        total: "365 ms (Sub-Second)",
        size: "48 Bytes (0.96 kbps)",
        status: "MAX_VOLUME_SPEECH_SYNTHESIZED"
      });
      setIsTalking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>ISRO • ITANTRA 360 NEURAL TRANSCEIVER RADIO ACCESS • SIH26173</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              iTantra: Indian Multilingual STT/TTS Neural Transceiver for Low-Bitrate Links
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              10 Offline Indian Languages, 0.96 kbps Neural Token Walkie-Talkie Transceiver & Sub-Second Distress Voice Mesh
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'sessions', label: '🎙️ Push-to-Talk Voice Sessions', count: sessions.length },
            { id: 'languages', label: '🗣️ 10 Indian Languages Models', count: languages.length },
            { id: 'compression', label: '📻 Low-Bitrate Compression (0.96 kbps)' },
            { id: 'emergency', label: '🚨 Emergency Distress Override' },
            { id: 'stats', label: '📊 ISRO Disaster Mesh Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: SESSIONS
           ========================================================================= */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sessions.map((s) => (
                <button
                  key={s.session_id}
                  onClick={() => setSelectedSession(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSession.session_id === s.session_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{s.session_id}</span>
                    <span className="text-emerald-400">{s.total_mouth_to_ear_latency_ms} ms Latency</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? s.source_node_hi : s.source_node} • <span className="text-amber-300">{s.language}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans italic">"{s.spoken_message}"</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{s.transmitted_payload_bytes} Bytes Transmitted</span>
                    <span className="text-emerald-400">{s.bandwidth_compression_ratio.split(' ')[0]} Savings</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedSession.session_id} • {selectedSession.language}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSession.source_node}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedSession.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">SPOKEN TRANSCRIPTION:</span>
                  <div className="text-white text-sm font-sans font-bold leading-relaxed">{selectedSession.spoken_message}</div>
                  <div className="text-slate-400 text-xs font-sans mt-1">"{selectedSession.spoken_message_en}"</div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ON-DEVICE STT</span><span className="text-white font-bold">{selectedSession.stt_processing_time_ms} ms</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BLE RADIO</span><span className="text-cyan-400 font-bold">{selectedSession.ble_radio_transit_time_ms} ms</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RECEIVER TTS</span><span className="text-emerald-400 font-bold">{selectedSession.tts_synthesis_time_ms} ms</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('compression')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect 0.96 kbps Neural Token Compression ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center justify-center gap-2">
                    <Mic className="w-4 h-4 text-orange-400" />
                    <span>Neural PTT Walkie-Talkie</span>
                  </h4>
                  <button
                    onClick={handlePtt}
                    disabled={isTalking}
                    className={`w-24 h-24 mx-auto rounded-full flex flex-col items-center justify-center transition-all shadow-2xl ${
                      isTalking
                        ? 'bg-rose-500 text-white animate-pulse scale-105'
                        : 'bg-orange-500 hover:bg-orange-400 text-slate-950 font-black'
                    }`}
                  >
                    <Mic className="w-8 h-8" />
                    <span className="text-[9px] uppercase font-bold mt-1">{isTalking ? 'Transmitting' : 'Push to Talk'}</span>
                  </button>
                  {pttResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs text-left">
                      <div>Total Mouth-to-Ear: <strong className="text-emerald-400 font-mono text-xs">{pttResult.total}</strong></div>
                      <div>Transmitted Size: <strong className="text-cyan-300 font-mono text-xs">{pttResult.size}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LANGUAGES */}
        {activeTab === 'languages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {languages.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-white font-sans">{l.name}</h4>
                  <span className="px-2 py-0.5 bg-orange-950 text-orange-300 rounded font-bold">{l.status}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>STT Word Error Rate: <strong className="text-emerald-400">{l.stt_wer_pct}% WER</strong></div>
                  <div>TTS Naturalness: <strong className="text-amber-300">{l.tts_mos_score} / 5.0 MOS</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Flash Size: {l.model_size_mb} MB</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: COMPRESSION */}
        {activeTab === 'compression' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-orange-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-orange-400 font-bold text-[10px] uppercase">LOW-BITRATE RADIO ACCESS COMPRESSION</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">0.96 kbps Neural Text Tokens vs 64 kbps Raw PCM</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">98.5% Data Savings</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Raw PCM 16kHz audio requires <strong>64 kbps</strong>, suffering 42% packet loss and 15m maximum BLE range.</div>
              <div className="text-emerald-400 font-bold pt-1 border-t border-slate-900">
                iTantra encodes voice into 48-byte UTF-8 semantic tokens transmitted in 45ms over 120m long-range Bluetooth mesh without dropouts.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: EMERGENCY */}
        {activeTab === 'emergency' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Volume2 className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Emergency Distress High-Volume Audio Override</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Broadcasts cyclone/flood/disaster audio at maximum volume non-interruptible even if the recipient device is on silent mode.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-orange-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
