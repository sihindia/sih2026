import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Activity, 
  Cpu, 
  RefreshCw, 
  Binary, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import capturesData from './data/raw_rf_signal_captures.json';
import modulationsData from './data/modulation_constellation_profiles.json';
import fecData from './data/fec_error_correction_schemes.json';
import statsData from './data/signalintel_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [captures, setCaptures] = useState(capturesData);
  const [selectedCapture, setSelectedCapture] = useState(capturesData[0]);
  const [modulations, setModulations] = useState(modulationsData);
  const [fecSchemes, setFecSchemes] = useState(fecData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'captures' | 'constellation' | 'fec' | 'payload' | 'stats'>('captures');

  // Interactive RF Signal Demodulator Simulator
  const [isDemodulating, setIsDemodulating] = useState(false);
  const [demodResult, setDemodResult] = useState<any>({
    modulation: "16-QAM (1.2 MBaud Symbol Rate)",
    samplingRate: "2.40 MSPS (Complex Float32)",
    snr: "22.4 dB (High Quality Link)",
    fec: "Viterbi R=1/2 (K=7) + Reed-Solomon RS(255,223)",
    syncHeader: "0x1ACFFC1D (CCSDS Space Telemetry Standard)",
    payload: "1024 Bytes Telemetry Extracted (0 Residual Bit Errors)"
  });

  const handleDemodulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemodulating(true);
    setTimeout(() => {
      setDemodResult({
        modulation: "16-QAM (1.2 MBaud Symbol Rate)",
        samplingRate: "2.40 MSPS (Complex Float32)",
        snr: "22.4 dB (High Quality Link)",
        fec: "Viterbi R=1/2 (K=7) + Reed-Solomon RS(255,223)",
        syncHeader: "0x1ACFFC1D (CCSDS Space Telemetry Standard)",
        payload: "1024 Bytes Telemetry Extracted (0 Residual Bit Errors)"
      });
      setIsDemodulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>NTRO • SIGNALINTEL 360 RF SIGNAL ANALYSIS & DEMODULATION • SIH26147</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO SignalIntel: Automated RF Signal Parameter Extraction & Demodulation (.IQ / .wav)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Automatic Modulation Classification (16-QAM/QPSK/FSK), De-Interleaving & Viterbi/Reed-Solomon FEC Decoding Suite
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'captures', label: '📡 Raw RF Captures (.IQ / .wav)', count: captures.length },
            { id: 'constellation', label: '🌌 Constellation & FFT Waterfall', count: modulations.length },
            { id: 'fec', label: '🧬 De-Interleaving & FEC Decoders', count: fecSchemes.length },
            { id: 'payload', label: '💾 Bit-Stream Frame Payload' },
            { id: 'stats', label: '📊 NTRO SignalIntel Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: CAPTURES
           ========================================================================= */}
        {activeTab === 'captures' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {captures.map((c) => (
                <button
                  key={c.capture_id}
                  onClick={() => setSelectedCapture(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCapture.capture_id === c.capture_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{c.capture_id}</span>
                    <span className="text-emerald-400">{c.detected_modulation.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.signal_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.center_frequency_mhz} MHz • {c.sampling_rate_msps} MSPS</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>File: {c.file_name}</span>
                    <span className="text-cyan-400">SNR: +{c.measured_snr_db} dB</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedCapture.capture_id} • {selectedCapture.file_format}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCapture.signal_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCapture.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">DEMODULATION & FEC PARAMETERS:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedCapture.detected_modulation} ({selectedCapture.symbol_rate_kbaud} kBaud)</div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    FEC: <strong>{selectedCapture.fec_scheme}</strong> • Interleaving: <strong>{selectedCapture.deinterleaving_mode}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CENTER FREQUENCY & RATE</span><span className="text-cyan-400 font-bold">{selectedCapture.center_frequency_mhz} MHz ({selectedCapture.sampling_rate_msps} MSPS)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">FRAME HEADER SYNC</span><span className="text-emerald-400 font-bold">{selectedCapture.sync_header}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('constellation')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect 16-QAM Constellation & Waterfall Spectrogram ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>RF Demodulator Pipeline</span>
                  </h4>
                  <form onSubmit={handleDemodulate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Input RF Capture File</label>
                      <input type="text" readOnly value={`${selectedCapture.file_name} (${selectedCapture.detected_modulation})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isDemodulating} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDemodulating ? 'animate-spin' : ''}`} />
                      <span>{isDemodulating ? 'Demodulating & Viterbi Decoding...' : 'Execute Automated RF Demodulation'}</span>
                    </button>
                  </form>
                  {demodResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Modulation: <strong className="text-cyan-400 font-mono text-xs">{demodResult.modulation}</strong></div>
                      <div>Payload: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{demodResult.payload}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CONSTELLATION */}
        {activeTab === 'constellation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {modulations.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{m.name}</span>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Points: <strong className="text-white">{m.constellation_points} States</strong></div>
                  <div>Efficiency: <strong className="text-emerald-400">{m.bits_per_symbol} Bits / Symbol</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{m.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: FEC */}
        {activeTab === 'fec' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">DE-INTERLEAVING & FORWARD ERROR CORRECTION</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Viterbi Soft-Decision & Reed-Solomon Decoding</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">0 Residual BER</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {fecSchemes.map((f, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-cyan-400 font-bold block">{f.scheme_name}</span>
                    <div className="text-slate-400">{f.correction_capability || f.constraint_length || f.code_rate}</div>
                    <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">{f.standard}</div>
                  </div>
                ))}
              </div>
              <div className="text-cyan-400 font-bold pt-2 border-t border-slate-900">
                De-interleaving disperses burst channel noise, enabling concatenated Viterbi and Reed-Solomon decoders to recover corrupt space downlink packets.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PAYLOAD */}
        {activeTab === 'payload' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Binary className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Bit-Stream Frame Header Synchronization & Payload Extraction</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Performs correlation on demodulated bit-streams to detect CCSDS, AX.25, and STANAG preamble sync words, outputting raw unpacked satellite telemetry data packets.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
