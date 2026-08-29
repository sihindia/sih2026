import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Radio, 
  Wind, 
  RefreshCw, 
  Crosshair, 
  Sliders, 
  Eye, 
  Globe 
} from 'lucide-react';

import scenariosData from './data/fsoc_tracking_scenarios.json';
import telemetryData from './data/virtual_camera_telemetry.json';
import disturbancesData from './data/atmospheric_disturbance_models.json';
import statsData from './data/optipat_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [scenarios, setScenarios] = useState(scenariosData);
  const [selectedScenario, setSelectedScenario] = useState(scenariosData[0]);
  const [telemetry, setTelemetry] = useState(telemetryData);
  const [disturbances, setDisturbances] = useState(disturbancesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scenarios' | 'viewport' | 'turbulence' | 'servo' | 'stats'>('scenarios');

  // Interactive PAT Simulator
  const [isTracking, setIsTracking] = useState(false);
  const [patResult, setPatResult] = useState<any>({
    acqTime: "84.0 ms",
    errorDeg: "0.082°",
    lockStatus: "LOCK_MAINTAINED (99.6%)",
    servoPan: "44.28° Az",
    servoTilt: "28.21° El"
  });

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setTimeout(() => {
      setPatResult({
        acqTime: "84.0 ms",
        errorDeg: "0.082°",
        lockStatus: "LOCK_MAINTAINED (99.6%)",
        servoPan: "44.28° Az",
        servoTilt: "28.21° El"
      });
      setIsTracking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>ISRO • OPTIPAT 360 VIRTUAL CAMERA FSOC TRACKING • SIH26169</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OptiPAT 360: Virtual Camera Coarse Tracking for Mobile FSOC Terminals
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              AI Pointing, Acquisition & Tracking (PAT), Closed-Loop Virtual PTZ Viewport & Atmospheric Scintillation ($C_n^2$) Simulator
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scenarios', label: '🎯 Mobile FSOC Link Scenarios', count: scenarios.length },
            { id: 'viewport', label: '📹 Virtual Pan-Tilt Viewport' },
            { id: 'turbulence', label: '🌪️ Atmospheric Turbulence (Cn²)', count: disturbances.length },
            { id: 'servo', label: '📐 Closed-Loop Servo PID Telemetry' },
            { id: 'stats', label: '📊 ISRO Optical Link Benchmarks' }
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
            VIEW 1: SCENARIOS
           ========================================================================= */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.scenario_id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedScenario.scenario_id === s.scenario_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{s.scenario_id}</span>
                    <span className="text-emerald-400">Lock: {s.lock_retention_rate_pct}%</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? s.link_name_hi : s.link_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.link_distance_km} km @ {s.optical_wavelength_nm}nm • Slew: {s.target_angular_velocity_deg_s}°/s</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Acq: {s.acquisition_time_ms} ms</span>
                    <span>Error: {s.mean_tracking_error_deg}°</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedScenario.scenario_id} • {selectedScenario.link_topology}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedScenario.link_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScenario.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-indigo-400 block text-[9px] font-bold">OPTICAL BEACON ACQUISITION</span>
                    <div className="text-white text-xs">Latency: {selectedScenario.acquisition_time_ms} ms</div>
                    <div className="text-slate-400 text-[10px]">FOV Search Mode &lt; 120ms</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-emerald-400 block text-[9px] font-bold">POINTING TRACKING ACCURACY</span>
                    <div className="text-white text-xs">Mean Error: {selectedScenario.mean_tracking_error_deg}°</div>
                    <div className="text-slate-400 text-[10px]">Lock Retention: {selectedScenario.lock_retention_rate_pct}%</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Atmospheric Turbulence:</strong> <span className="text-amber-400 font-mono">{selectedScenario.atmospheric_turbulence_cn2}</span></div>
                  <div><strong>Angular Slew Velocity:</strong> <span className="text-cyan-300 font-mono">{selectedScenario.target_angular_velocity_deg_s}°/sec</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('viewport')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Engage Virtual Pan-Tilt Camera Viewport ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Closed-Loop PAT Simulator</span>
                  </h4>
                  <form onSubmit={handleTrack} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">FSOC Target Terminal</label>
                      <input type="text" readOnly value={selectedScenario.scenario_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isTracking} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTracking ? 'animate-spin' : ''}`} />
                      <span>{isTracking ? 'Acquiring 1550nm Optical Beacon...' : 'Engage Coarse Alignment Servo'}</span>
                    </button>
                  </form>
                  {patResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Acquisition: <strong className="text-emerald-400 font-mono text-xs">{patResult.acqTime} ({patResult.lockStatus})</strong></div>
                      <div>Servo Position: <strong className="text-cyan-300 font-mono text-xs">{patResult.servoPan}, {patResult.servoTilt}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: VIEWPORT */}
        {activeTab === 'viewport' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Crosshair className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Virtual PTZ Viewport Locked on Target Beacon</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Pan: 44.28° Azimuth • Tilt: 28.21° Elevation • Closed-Loop PID tracking error within 0.082° pointing threshold.
            </p>
          </div>
        )}

        {/* VIEW 3: TURBULENCE */}
        {activeTab === 'turbulence' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {disturbances.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-white font-sans">{d.model_name}</h4>
                <p className="text-slate-300 text-xs font-sans">{d.impact}</p>
                <div className="text-indigo-400 pt-1 border-t border-slate-900">Severity: {d.severity}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SERVO */}
        {activeTab === 'servo' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {telemetry.map((t, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <span className="text-indigo-400 font-bold">Frame #{t.frame_id} (60 FPS)</span>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>Pan/Tilt: <strong className="text-white font-mono">{t.pan_angle_deg}° / {t.tilt_angle_deg}°</strong></div>
                    <div>Centroid Intensity: <strong className="text-emerald-400 font-mono">{(t.centroid_intensity * 100).toFixed(0)}%</strong></div>
                    <div className="text-cyan-300 pt-1 border-t border-slate-900">PID Correction: {t.servo_pid_correction_deg}°</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
