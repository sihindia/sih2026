import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Volume2, 
  Activity, 
  RefreshCw, 
  Play, 
  Cpu, 
  Eye, 
  Globe 
} from 'lucide-react';

import experimentsData from './data/bas_scientific_experiments.json';
import telemetryData from './data/astronaut_3d_hmr_telemetry.json';
import alertsData from './data/sequence_anomaly_alerts.json';
import statsData from './data/antariksh_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [experiments, setExperiments] = useState(experimentsData);
  const [selectedExp, setSelectedExp] = useState(experimentsData[0]);
  const [telemetry, setTelemetry] = useState(telemetryData);
  const [alerts, setAlerts] = useState(alertsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'experiments' | 'hmr' | 'alerts' | 'logs' | 'stats'>('experiments');

  // Interactive Sequence Step Validator
  const [isValidating, setIsValidating] = useState(false);
  const [valResult, setValResult] = useState<any>({
    step: "Step 4: Optical Laser Diagnostic Alignment",
    integrity: "100% VALID_SEQUENCE",
    next: "Step 5: High-Resolution Holographic Imaging Scan",
    voiceAlert: "NONE (Sequence Nominal)"
  });

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setTimeout(() => {
      setValResult({
        step: "Step 4: Optical Laser Diagnostic Alignment",
        integrity: "100% VALID_SEQUENCE",
        next: "Step 5: High-Resolution Holographic Imaging Scan",
        voiceAlert: "NONE (Sequence Nominal)"
      });
      setIsValidating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Users className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>ISRO • ANTARIKSHHAR 360 ASTRONAUT ACTIVITY ASSISTANT • SIH26174</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AntarikshHAR: AI Astronaut Activity Recognition for Bharatiya Antariksh Station (BAS)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Microgravity 3D Human Mesh Recovery (HMR), Protocol Sequence Validation & Voice-Based Anomaly Warnings
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'experiments', label: '🚀 BAS Scientific Experiments', count: experiments.length },
            { id: 'hmr', label: '🧘 3D Human Mesh Recovery (HMR)', count: telemetry.length },
            { id: 'alerts', label: '⚠️ Sequence Validation & Alerts', count: alerts.length },
            { id: 'logs', label: '📋 Timestamped Protocol Logs' },
            { id: 'stats', label: '📊 ISRO Space Station Telemetry' }
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
            VIEW 1: EXPERIMENTS
           ========================================================================= */}
        {activeTab === 'experiments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experiments.map((exp) => (
                <button
                  key={exp.experiment_id}
                  onClick={() => setSelectedExp(exp)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedExp.experiment_id === exp.experiment_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{exp.experiment_id}</span>
                    <span className="text-emerald-400">Step {exp.current_active_step} / {exp.total_steps} Active</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? exp.title_hi : exp.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{exp.astronaut_id}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Next: {exp.suggested_next_step.split(':')[1] || exp.suggested_next_step}</span>
                    <span className="text-emerald-400">{exp.hand_object_interaction_conf}% Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedExp.experiment_id} • {selectedExp.astronaut_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedExp.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedExp.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">EXPERIMENT STEP SEQUENCE HUD:</span>
                  <div className="space-y-1.5 font-sans">
                    {selectedExp.steps_sequence.map((st) => (
                      <div key={st.step_no} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        st.status === 'COMPLETED' ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' :
                        st.status === 'IN_PROGRESS' ? 'bg-purple-950/60 border-purple-500 text-white font-bold ring-1 ring-purple-400' :
                        'bg-slate-950 border-slate-800 text-slate-500'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-mono">{st.step_no}</span>
                          <span>{st.action}</span>
                        </div>
                        <span className="font-mono text-[10px]">{st.time} ({st.status})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-purple-900/60 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Suggested Next Action:</strong> <span className="text-amber-400 font-mono">{selectedExp.suggested_next_step}</span></div>
                  <div><strong>Protocol Integrity:</strong> <span className="text-emerald-400 font-mono">{selectedExp.sequence_integrity}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('hmr')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Microgravity 3D Human Mesh Recovery (HMR) ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Real-Time HAR Sequence Verifier</span>
                  </h4>
                  <form onSubmit={handleValidate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Current Observed Action</label>
                      <input type="text" readOnly value="Optical Laser Diagnostic Alignment" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" />
                    </div>
                    <button type="submit" disabled={isValidating} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
                      <span>{isValidating ? 'Tracking 3D Human Pose Mesh...' : 'Validate Protocol Step'}</span>
                    </button>
                  </form>
                  {valResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Sequence Status: <strong className="text-emerald-400 font-mono text-xs">{valResult.integrity}</strong></div>
                      <div>HUD Suggestion: <strong className="text-amber-300 font-mono text-xs">{valResult.next}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HMR */}
        {activeTab === 'hmr' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {telemetry.map((t, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{t.joint}</h4>
                    <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded font-bold">{t.confidence}% Conf</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>3D Position [X,Y,Z]: <strong className="text-white font-mono">[{t.pos_x_cm}, {t.pos_y_cm}, {t.pos_z_cm}] cm</strong></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900">Interaction: {t.interaction_target}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {alerts.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-rose-900 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{a.type}</span>
                  <span className="text-rose-400 font-bold">{a.severity}</span>
                </div>
                <p className="text-white text-xs font-sans font-bold leading-relaxed">{a.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-purple-500/40 pb-3">
              <span className="text-purple-400 font-bold text-[10px] uppercase">STRUCTURED PROTOCOL EXECUTION TRANSCRIPT</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">BAS-EXP-2026-001 Protocol Log</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-mono text-xs">
              <div>[T+04:12] Step 1: Thermal Chamber Inspection (20.0°C) ➔ COMPLETED (99.4% Conf)</div>
              <div>[T+08:45] Step 2: Glovebox Hermetic Purge Seal Check ➔ COMPLETED (98.8% Conf)</div>
              <div>[T+14:20] Step 3: Micro-Pipette Solution Injection ➔ COMPLETED (97.6% Conf)</div>
              <div>[T+19:05] Step 4: Optical Laser Diagnostic Alignment ➔ IN_PROGRESS (98.2% Conf)</div>
            </div>
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
