import React, { useState } from 'react';
import { 
  Plane, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  Flame, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import missionsData from './data/male_uav_engine_digital_twin_missions.json';
import subsystemsData from './data/engine_subsystems_telemetry_matrix.json';
import modelsData from './data/pinn_thermodynamic_fault_models.json';
import statsData from './data/garudatwin_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'kn' | 'mr' | 'ta'>('en');
  const [missions, setMissions] = useState(missionsData);
  const [selectedMission, setSelectedMission] = useState(missionsData[0]);
  const [subsystems, setSubsystems] = useState(subsystemsData);
  const [models, setModels] = useState(modelsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'missions' | 'twin' | 'subsystems' | 'models' | 'stats'>('missions');

  // Interactive Digital Twin Telemetry Synchronizer
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>({
    twinHealth: "100% THERMODYNAMIC OTTO CYCLE CONFORMANCE",
    earlyAlert: "Cylinder #3 Injector Spray Partial Clogging (2.8h Lead)",
    predictedRUL: "42.5 Flight Hours to Recommended Service",
    advisory: "Execute ultrasonic injector cleaning post-sortie",
    missionVerdict: "SAFE OPERATING ENVELOPE - MISSION PROCEEDS"
  });

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setTimeout(() => {
      setSyncResult({
        twinHealth: "100% THERMODYNAMIC OTTO CYCLE CONFORMANCE",
        earlyAlert: "Cylinder #3 Injector Spray Partial Clogging (2.8h Lead)",
        predictedRUL: "42.5 Flight Hours to Recommended Service",
        advisory: "Execute ultrasonic injector cleaning post-sortie",
        missionVerdict: "SAFE OPERATING ENVELOPE - MISSION PROCEEDS"
      });
      setIsSyncing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Plane className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>DRDO / IDEX • GARUDATWIN 360 MALE UAV AERO PISTON ENGINE DIGITAL TWIN • SIH26054</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DRDO GarudaTwin: Real-Time Digital Twin &amp; Fault Prediction for MALE UAV Piston Engines
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Tapas-BH-201 &amp; Archer-NG Propulsion Reliability with CAN Bus Telemetry Synchronization, Physics-Informed Neural Networks (PINN), Remaining Useful Life (RUL) Estimation &amp; Zero In-Flight Flameout Defense
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'missions', label: '✈️ MALE UAV Flight Missions', count: missions.length },
            { id: 'twin', label: '⚙️ Digital Twin Engine Synchronizer' },
            { id: 'subsystems', label: '📊 8 Telemetry Subsystems', count: subsystems.length },
            { id: 'models', label: '🧠 PINN Fault & RUL Models', count: models.length },
            { id: 'stats', label: '📈 GarudaTwin Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: MISSIONS
           ========================================================================= */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {missions.map((m) => (
                <button
                  key={m.mission_id}
                  onClick={() => setSelectedMission(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMission.mission_id === m.mission_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{m.mission_id}</span>
                    <span className="text-emerald-400">RUL: {m.predicted_rul_hours}h</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {m.uav_platform.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{m.operational_theatre}</div>
                  <div className="text-[10px] text-indigo-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{m.telemetry_stream.split('|')[1]}</span>
                    <span className="text-amber-400">{m.pinn_anomaly_confidence}% Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedMission.mission_id} • {selectedMission.uav_platform}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMission.operational_theatre}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMission.twin_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">PHYSICS-INFORMED DIGITAL TWIN HEALTH SYNCHRONIZATION:</span>
                  <div className="text-cyan-300 font-sans text-xs">
                    Propulsion Engine: {selectedMission.aero_piston_engine}
                  </div>
                  <div className="text-white font-sans text-xs pt-1 border-t border-slate-900">
                    Live Telemetry Frame: <strong className="text-amber-300">{selectedMission.engine_state}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Early Predictive Diagnosis: {selectedMission.digital_twin_assessment}
                  </div>
                  <div className="text-amber-300 font-sans text-xs">
                    Maintenance Action: {selectedMission.maintenance_advisory}
                  </div>
                  <div className="text-indigo-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Mission Envelope: {selectedMission.mission_risk_level}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PREDICTED REMAINING LIFE (RUL)</span><span className="text-emerald-400 font-bold">{selectedMission.predicted_rul_hours} Flight Hours</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PINN ANOMALY CONFIDENCE</span><span className="text-indigo-400 font-bold">{selectedMission.pinn_anomaly_confidence}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('twin')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Real-Time Digital Twin Virtual Engine Synchronizer ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Instant CAN Telemetry Ingestion</span>
                  </h4>
                  <form onSubmit={handleSync} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">UAV Callsign &amp; FADEC Bus</label>
                      <input type="text" readOnly value={`${selectedMission.uav_platform.split('(')[0]} (CAN Bus 1 Mbps)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isSyncing} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Synchronizing Virtual Twin & Estimating RUL...' : 'Sync Telemetry with Digital Twin'}</span>
                    </button>
                  </form>
                  {syncResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Twin Health: <strong className="text-emerald-400 font-mono text-xs">{syncResult.twinHealth}</strong></div>
                      <div>Early Warning: <strong className="text-amber-300 font-mono text-xs">{syncResult.earlyAlert}</strong></div>
                      <div>Predicted RUL: <strong className="text-cyan-300 font-mono text-xs">{syncResult.predictedRUL}</strong></div>
                      <div>Action Plan: <strong className="text-white font-mono text-xs">{syncResult.advisory}</strong></div>
                      <div>Verdict: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{syncResult.missionVerdict}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TWIN */}
        {tab === 'twin' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Digital Twin Virtual Engine Synchronization Core</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Mirrors thermodynamic Otto cycle parameters in real time at the Ground Control Station (GCS). Replaces threshold alarms with physics-informed state estimation to prevent catastrophic mid-air engine stalls.
            </p>
          </div>
        )}

        {/* VIEW 3: SUBSYSTEMS */}
        {tab === 'subsystems' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {subsystems.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-400 font-bold">{s.nominal_range}</span>
                  <span className="text-rose-400 font-bold">Limit: {s.critical_limit}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.subsystem}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Failure Mode: {s.failure_mode}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MODELS */}
        {tab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{m.warning_lead_time}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.fault_type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.physics_grounding}</p>
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
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
