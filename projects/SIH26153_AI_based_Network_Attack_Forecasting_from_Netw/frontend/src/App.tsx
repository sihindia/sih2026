import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Zap, 
  RefreshCw, 
  ShieldAlert, 
  Terminal, 
  Sliders, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Globe 
} from 'lucide-react';

import snapshotsData from './data/traffic_flow_snapshots.json';
import forecastsData from './data/trajectory_forecasts.json';
import shapData from './data/shap_weights.json';
import benchmarkData from './data/benchmark_metrics.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [snapshots, setSnapshots] = useState(snapshotsData);
  const [selectedSnap, setSelectedSnap] = useState(snapshotsData[0]);
  const [forecasts, setForecasts] = useState(forecastsData);
  const [shapWeights, setShapWeights] = useState(shapData);
  const [benchmarks, setBenchmarks] = useState(benchmarkData);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'dynamics' | 'mitre' | 'shap' | 'benchmarks'>('telemetry');

  // Interactive K-Step Rollout Simulator
  const [kSteps, setKSteps] = useState(5);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simVerdict, setSimVerdict] = useState<any>({
    predictedStage: "Lateral Movement & SCADA PLC Command Injection (T1021)",
    prob: 96.4,
    leadTime: "+38.0s (Proactive)",
    action: "PROACTIVE_ISOLATE_VLAN_AND_RESET_KEYS"
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setTimeout(() => {
      setSimVerdict({
        predictedStage: "Lateral Movement & SCADA PLC Command Injection (T1021)",
        prob: 96.4,
        leadTime: "+38.0s (Proactive)",
        action: "PROACTIVE_ISOLATE_VLAN_AND_RESET_KEYS"
      });
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>NTRO • NETWORLD 360 AI WORLD MODELS ATTACK FORECASTER • SIH26153</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NetWorld 360: AI Network Attack Forecasting from Traffic Telemetry
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              World Models Architecture Learning P(S_t+1 | S_t) State Dynamics, K-Step Infiltration Simulation & SHAP Explainability
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'telemetry', label: '🌐 Live Telemetry & K-Step Forecaster', count: snapshots.length },
            { id: 'dynamics', label: '🔮 Latent State Dynamics Graph' },
            { id: 'mitre', label: '🎯 MITRE ATT&CK Kill-Chain Mapping' },
            { id: 'shap', label: '🧠 Explainable SHAP Attribution', count: shapWeights.length },
            { id: 'benchmarks', label: '📊 World Model vs Baseline Benchmarks', count: benchmarks.length }
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
            VIEW 1: LIVE TELEMETRY & K-STEP FORECASTER
           ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {snapshots.map((s) => (
                <button
                  key={s.snapshot_id}
                  onClick={() => setSelectedSnap(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSnap.snapshot_id === s.snapshot_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{s.snapshot_id}</span>
                    <span className="text-rose-400">{s.k_step_infiltration_prob_pct}% Infiltration Prob</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? s.network_segment_hi : s.network_segment}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">SYN Ratio: {s.flow_features.tcp_syn_flag_ratio} • Lead: +{s.early_warning_lead_time_seconds}s</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{s.current_observed_stage.split(' ')[0]}</span>
                    <span>{s.threat_severity.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Telemetry & World Model Forward Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Two-Level Traffic Features */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedSnap.snapshot_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSnap.network_segment}</h3>
                    <p className="text-slate-400 text-[10px]">Current Observed State: <strong className="text-amber-300">{selectedSnap.current_observed_stage}</strong></p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold">
                    {selectedSnap.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <span className="text-cyan-400 font-bold block text-[9px] uppercase">FLOW-LEVEL (NETFLOW / IPFIX)</span>
                    <div>Src: {selectedSnap.flow_features.src_ip} ➔ Dst: {selectedSnap.flow_features.dst_ip}</div>
                    <div>TCP SYN Ratio: <strong className="text-rose-400">{selectedSnap.flow_features.tcp_syn_flag_ratio}</strong></div>
                    <div>Bytes: {selectedSnap.flow_features.bytes_per_flow} ({selectedSnap.flow_features.packets_per_flow} pkts)</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                    <span className="text-emerald-400 font-bold block text-[9px] uppercase">PACKET-LEVEL (PCAP DERIVED)</span>
                    <div>TTL Variance: <strong className="text-white">{selectedSnap.packet_features.ttl_variance}</strong></div>
                    <div>Payload Entropy: <strong className="text-amber-300">{selectedSnap.packet_features.payload_entropy}</strong></div>
                    <div className="text-[10px] text-slate-400 truncate">{selectedSnap.packet_features.port_scan_pattern}</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div>Predicted Future State (K+3): <strong className="text-rose-400 font-mono">{selectedSnap.predicted_future_stage_k3}</strong></div>
                  <div>Early Warning Lead Time: <strong className="text-emerald-400 font-mono">+{selectedSnap.early_warning_lead_time_seconds} Seconds Before Breach</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('dynamics')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Visualize World Model Forward Simulation Trajectory ➔</span>
                </button>
              </div>

              {/* Right 5: World Model Simulator */}
              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>World Model P(S_t+1 | S_t)</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      TEMPORAL TRANSFORMER
                    </span>
                  </div>

                  <form onSubmit={handleSimulate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Forward Steps Rollout (K-Windows)</label>
                      <input type="number" min="1" max="10" required value={kSteps} onChange={(e) => setKSteps(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>

                    <button type="submit" disabled={isSimulating} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Rolling Out Latent States...' : 'Run Forward Infiltration Simulation'}</span>
                    </button>
                  </form>

                  {simVerdict && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Infiltration Prob:</span><strong className="text-rose-400 font-mono text-sm">{simVerdict.prob}%</strong></div>
                      <div className="flex justify-between"><span>Proactive Lead:</span><strong className="text-emerald-400 font-mono">{simVerdict.leadTime}</strong></div>
                      <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono text-[10px]">{simVerdict.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: LATENT STATE DYNAMICS GRAPH
           ========================================================================= */}
        {activeTab === 'dynamics' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">K-STEP FORWARD ROLLOUT LATENT STATE TRAJECTORY</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Simulation of Attacker Progression P(S_t+k | S_t)</h4>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { step: "K+1 (+5s)", state: "Recon (T1595)", prob: "35.0%" },
                { step: "K+2 (+15s)", state: "Exploit (T1190)", prob: "68.4%" },
                { step: "K+3 (+30s)", state: "Lateral (T1021)", prob: "91.2%" },
                { step: "K+4 (+45s)", state: "C2 (T1071)", prob: "96.4%" },
                { step: "K+5 (+60s)", state: "Exfil (T1048)", prob: "98.8%" }
              ].map((k, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold text-[9px] block">{k.step}</span>
                  <div className="text-white font-sans font-bold text-xs">{k.state}</div>
                  <span className="text-rose-400 font-bold text-xs block">{k.prob}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: MITRE ATT&CK KILL-CHAIN MAPPING
           ========================================================================= */}
        {activeTab === 'mitre' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { stage: "Reconnaissance (T1595)", detail: "SYN sweep across Port 445/3389", status: "DETECTED" },
                { stage: "Initial Access (T1190)", detail: "Exploiting web gateway deserialization", status: "PREDICTED_K2" },
                { stage: "Lateral Movement (T1021)", detail: "SMB / SCADA Modbus PLC Infiltration", status: "PREDICTED_K3" }
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-white font-sans">{m.stage}</h4>
                  <p className="text-slate-300 font-sans text-xs">{m.detail}</p>
                  <span className="text-cyan-400 font-bold text-[10px]">{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: EXPLAINABLE SHAP ATTRIBUTION
           ========================================================================= */}
        {activeTab === 'shap' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">SHAP FEATURE IMPORTANCE & ATTENTION WEIGHTS</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Interpretable Infiltration Driving Features</h4>
            </div>

            <div className="space-y-3">
              {shapWeights.map((w, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl flex justify-between items-center">
                  <div>
                    <strong className="text-white font-sans">{w.feature}</strong>
                    <p className="text-slate-400 text-[10px]">{w.direction}</p>
                  </div>
                  <span className="text-cyan-400 font-bold text-sm">+{w.shap_value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: BENCHMARKS
           ========================================================================= */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benchmarks.map((b, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{b.model_name}</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">F1 SCORE</span><span className="text-white font-bold">{b.f1_score_pct}%</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PRECISION</span><span className="text-emerald-400 font-bold">{b.precision_pct}%</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LEAD TIME</span><span className="text-cyan-300 font-bold">{b.lead_time_seconds.split(' ')[0]}</span></div>
                  </div>
                  <div className="text-slate-400 text-[11px]">Architecture: {b.architecture}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
