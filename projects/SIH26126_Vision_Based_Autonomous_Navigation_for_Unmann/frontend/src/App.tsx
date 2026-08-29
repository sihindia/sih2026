import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Navigation, 
  ShieldAlert, 
  RefreshCw, 
  Compass, 
  Sliders, 
  Eye, 
  Globe 
} from 'lucide-react';

import missionsData from './data/ugv_mission_scenarios.json';
import trajectoryData from './data/visual_slam_trajectory.json';
import hazardsData from './data/terrain_hazard_segmentation.json';
import statsData from './data/bel_navbot_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [missions, setMissions] = useState(missionsData);
  const [selectedMission, setSelectedMission] = useState(missionsData[0]);
  const [trajectory, setTrajectory] = useState(trajectoryData);
  const [hazards, setHazards] = useState(hazardsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'missions' | 'slam' | 'hazards' | 'planner' | 'stats'>('missions');

  // Interactive UGV Path Planner Simulator
  const [isPlanning, setIsPlanning] = useState(false);
  const [plannerResult, setPlannerResult] = useState<any>({
    speed: "1.45 m/s (Nominal)",
    steering: "0.12 rad/s",
    wheels: "L: 220 RPM / R: 235 RPM",
    drift: "0.82% Visual SLAM",
    status: "COLLISION_FREE_PATH_ENGAGED"
  });

  const handlePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanning(true);
    setTimeout(() => {
      setPlannerResult({
        speed: "1.45 m/s (Nominal)",
        steering: "0.12 rad/s",
        wheels: "L: 220 RPM / R: 235 RPM",
        drift: "0.82% Visual SLAM",
        status: "COLLISION_FREE_PATH_ENGAGED"
      });
      setIsPlanning(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>BHARAT ELECTRONICS LIMITED (BEL) • NAVBOT 360 AUTONOMOUS UGV • SIH26126</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BEL NavBot: Vision-Based Autonomous Navigation for GPS-Denied UGVs
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Monocular/Stereo Visual SLAM & Odometry, Real-Time Terrain Traversability & Dynamic DWA Collision Avoidance
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'missions', label: '🛡️ BEL UGV Tactical Missions', count: missions.length },
            { id: 'slam', label: '👁️ Visual SLAM Trajectory' },
            { id: 'hazards', label: '🚧 Terrain Traversability AI', count: hazards.length },
            { id: 'planner', label: '🕹️ DWA Path Planner & Motor Actuation' },
            { id: 'stats', label: '📊 BEL Autonomy Telemetry' }
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
            VIEW 1: MISSIONS
           ========================================================================= */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {missions.map((m) => (
                <button
                  key={m.mission_id}
                  onClick={() => setSelectedMission(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMission.mission_id === m.mission_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{m.mission_id}</span>
                    <span className="text-emerald-400">{m.traversal_distance_m}m Path</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? m.mission_name_hi : m.mission_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{m.environment_type} • Speed: {m.linear_speed_m_s} m/s</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{m.obstacles_detected_count} Hazards Cleared</span>
                    <span className="text-emerald-400">Drift: {m.visual_slam_drift_pct}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedMission.mission_id} • {selectedMission.environment_type}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMission.mission_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMission.mission_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 block text-[9px] font-bold">VISUAL SLAM DRIFT (GPS-DENIED)</span>
                    <div className="text-white text-base font-bold">{selectedMission.visual_slam_drift_pct}% Total Drift</div>
                    <div className="text-slate-400 text-[10px]">Over {selectedMission.traversal_distance_m}m Path</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-emerald-400 block text-[9px] font-bold">COLLISION AVOIDANCE</span>
                    <div className="text-white text-base font-bold">{selectedMission.obstacles_detected_count} Obstacles Cleared</div>
                    <div className="text-slate-400 text-[10px]">Traversability: {selectedMission.traversability_accuracy_pct}%</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Primary Vision Sensors:</strong> <span className="text-amber-400 font-mono">{selectedMission.primary_sensors}</span></div>
                  <div><strong>Linear Cruise Velocity:</strong> <span className="text-cyan-300 font-mono">{selectedMission.linear_speed_m_s} m/s</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('slam')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Visual SLAM 6-DOF Trajectory & Keyframes ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Dynamic Path Planner Simulator</span>
                  </h4>
                  <form onSubmit={handlePlan} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Tactical Mission</label>
                      <input type="text" readOnly value={selectedMission.mission_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isPlanning} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPlanning ? 'animate-spin' : ''}`} />
                      <span>{isPlanning ? 'Computing DWA Trajectory...' : 'Engage DWA Path Planner'}</span>
                    </button>
                  </form>
                  {plannerResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Motor Actuation: <strong className="text-amber-400 font-mono text-xs">{plannerResult.wheels}</strong></div>
                      <div>Path Safety: <strong className="text-emerald-400 font-mono text-xs">{plannerResult.status}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SLAM */}
        {activeTab === 'slam' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trajectory.map((t, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-amber-400 font-bold">Waypoint #{t.waypoint_id}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{t.loop_closure ? 'Loop Closed' : 'Tracking'}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>Coordinates [X, Y]: <strong className="text-white">[{t.pos_x_m}m, {t.pos_y_m}m]</strong></div>
                    <div>Heading Yaw: <strong className="text-cyan-400">{t.heading_deg}°</strong></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900">Visual Features: {t.keyframe_features} Inliers</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: HAZARDS */}
        {activeTab === 'hazards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {hazards.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold text-[10px]">Risk: {h.risk_level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.hazard_class}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Tire Friction Coeff: <strong className="text-emerald-400">{h.friction_coeff}</strong></div>
                  <div className="text-cyan-300">Max Safe Speed: {h.speed_limit_m_s} m/s</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: PLANNER */}
        {activeTab === 'planner' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Navigation className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Dynamic Window Approach (DWA) Planner Active</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Linear: 1.45 m/s • Angular: 0.12 rad/s • Differential Motors: Left 220 RPM / Right 235 RPM • Zero collision path locked.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
