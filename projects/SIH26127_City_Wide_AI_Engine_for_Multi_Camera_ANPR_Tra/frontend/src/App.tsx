import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Car, 
  ShieldAlert, 
  RefreshCw, 
  MapPin, 
  Activity, 
  Sliders, 
  Globe 
} from 'lucide-react';

import trajectoriesData from './data/tracked_vehicles_trajectories.json';
import camerasData from './data/anpr_cameras_grid.json';
import flowData from './data/macro_traffic_flow_analytics.json';
import statsData from './data/bel_anpr_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [trajectories, setTrajectories] = useState(trajectoriesData);
  const [selectedTrajectory, setSelectedTrajectory] = useState(trajectoriesData[0]);
  const [cameras, setCameras] = useState(camerasData);
  const [flow, setFlow] = useState(flowData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'trajectories' | 'anpr' | 'flow' | 'alerts' | 'stats'>('trajectories');

  // Interactive ANPR Trajectory Query Simulator
  const [isTracking, setIsTracking] = useState(false);
  const [trackResult, setTrackResult] = useState<any>({
    points: 4,
    distance: "24.8 km Reconstructed",
    lastSeen: "Sohna Road Toll Plaza (Cam-88)",
    alert: "CRITICAL_BLACKLIST_STOLEN_VEHICLE",
    speed: "49.2 km/h Average"
  });

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setTimeout(() => {
      setTrackResult({
        points: 4,
        distance: "24.8 km Reconstructed",
        lastSeen: "Sohna Road Toll Plaza (Cam-88)",
        alert: "CRITICAL_BLACKLIST_STOLEN_VEHICLE",
        speed: "49.2 km/h Average"
      });
      setIsTracking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>BHARAT ELECTRONICS LIMITED (BEL) • TRAJECTOVISION 360 CITY ANPR • SIH26127</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BEL TrajectoVision: City-Wide Multi-Camera ANPR Trajectory Tracking
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              High-Accuracy License Plate OCR (&gt;94%), Spatial-Temporal Route Reconstruction & Urban Traffic Flow Heatmaps
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'trajectories', label: '🚗 Vehicle Trajectory Tracking', count: trajectories.length },
            { id: 'anpr', label: '📷 Multi-Lane ANPR OCR Nodes', count: cameras.length },
            { id: 'flow', label: '🚦 Macro Traffic Flow & Heatmaps', count: flow.length },
            { id: 'alerts', label: '🚨 Blacklist Intercept Alerts' },
            { id: 'stats', label: '📊 BEL Smart City Telemetry' }
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
            VIEW 1: TRAJECTORIES
           ========================================================================= */}
        {activeTab === 'trajectories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trajectories.map((t) => (
                <button
                  key={t.plate_number}
                  onClick={() => setSelectedTrajectory(t)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTrajectory.plate_number === t.plate_number
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{t.plate_number}</span>
                    <span className="text-emerald-400">{t.total_distance_km} km Path</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? t.vehicle_model_hi : t.vehicle_model}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{t.last_seen_location} • {t.mean_speed_km_h} km/h</div>
                  <div className="text-[10px] text-rose-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{t.trajectory_points.length} Sightings</span>
                    <span className="text-rose-300 font-bold">{t.blacklist_status.split('_')[1]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedTrajectory.plate_number} • {selectedTrajectory.vehicle_model}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTrajectory.last_seen_location}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTrajectory.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">CHRONOLOGICAL SIGHTINGS TRANSCRIPT:</span>
                  <div className="space-y-1.5 font-sans">
                    {selectedTrajectory.trajectory_points.map((p) => (
                      <div key={p.point} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-mono text-rose-400 font-bold">#{p.point}</span>
                          <span className="font-bold text-white">{p.location}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{p.time} • {p.speed_km_h} km/h • OCR: {p.ocr_conf}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Total Reconstructed Corridor:</strong> <span className="text-emerald-400 font-mono">{selectedTrajectory.total_distance_km} km @ {selectedTrajectory.mean_speed_km_h} km/h average</span></div>
                  <div><strong>Alert Disposition:</strong> <span className="text-rose-400 font-mono font-bold">{selectedTrajectory.blacklist_status}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('anpr')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect City-Wide ANPR Camera Network Nodes ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>ANPR Trajectory Search Engine</span>
                  </h4>
                  <form onSubmit={handleTrack} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target License Plate</label>
                      <input type="text" readOnly value={selectedTrajectory.plate_number} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isTracking} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTracking ? 'animate-spin' : ''}`} />
                      <span>{isTracking ? 'Reconstructing GIS Route...' : 'Reconstruct Trajectory'}</span>
                    </button>
                  </form>
                  {trackResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Corridor: <strong className="text-emerald-400 font-mono text-xs">{trackResult.distance} ({trackResult.points} Sightings)</strong></div>
                      <div>Dispatch: <strong className="text-rose-400 font-mono text-xs">{trackResult.alert}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ANPR */}
        {activeTab === 'anpr' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {cameras.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-rose-400 font-bold">{c.camera_id}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{c.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{c.location}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>OCR Accuracy: <strong className="text-emerald-400">{c.ocr_acc_pct}%</strong></div>
                  <div className="text-cyan-300">Multi-Lane Capacity: {c.lanes} Lanes @ {c.fps} FPS</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: FLOW */}
        {activeTab === 'flow' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {flow.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold text-[10px]">{f.congestion_level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.corridor}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Traffic Density: <strong className="text-white">{f.vehicle_density}</strong></div>
                  <div className="text-emerald-400">Average Corridor Speed: {f.avg_speed_km_h} km/h</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Blacklist Interception Alert Active</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              DL-01-AB-1234 flagged as Stolen Vehicle at Sohna Road Toll Plaza. Automated intercept alert dispatched to Sector Patrol Units.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
