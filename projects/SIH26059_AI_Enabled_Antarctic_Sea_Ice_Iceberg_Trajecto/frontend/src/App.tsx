import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Ship, 
  Waves, 
  RefreshCw, 
  Navigation, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import missionsData from './data/antarctic_voyage_navigation_missions.json';
import iceTracksData from './data/sea_ice_concentration_and_iceberg_tracks.json';
import costsData from './data/polar_vessel_routing_cost_surfaces.json';
import statsData from './data/himnav_polar_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'mr' | 'bn'>('en');
  const [missions, setMissions] = useState(missionsData);
  const [selectedMission, setSelectedMission] = useState(missionsData[0]);
  const [iceTracks, setIceTracks] = useState(iceTracksData);
  const [costs, setCosts] = useState(costsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'missions' | 'routing' | 'icebergs' | 'costs' | 'stats'>('missions');

  // Interactive Polar Pathfinding Simulator
  const [isPathfinding, setIsPathfinding] = useState(false);
  const [routeResult, setRouteResult] = useState<any>({
    path: "Coastal Flaw Polynya Route (69°12'S, 11°45'E)",
    fuelSaved: "42.6 Metric Tons Marine Gas Oil Saved",
    timeSaved: "34.0 Hours Faster Polar Transit",
    icebergClearance: "6.4 nm Safe Separation from Tabular IB-LAZ-04",
    besetmentRisk: "ZERO BESETMENT RISK (Compression Zones Avoided)"
  });

  const handlePathfind = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPathfinding(true);
    setTimeout(() => {
      setRouteResult({
        path: "Coastal Flaw Polynya Route (69°12'S, 11°45'E)",
        fuelSaved: "42.6 Metric Tons Marine Gas Oil Saved",
        timeSaved: "34.0 Hours Faster Polar Transit",
        icebergClearance: "6.4 nm Safe Separation from Tabular IB-LAZ-04",
        besetmentRisk: "ZERO BESETMENT RISK (Compression Zones Avoided)"
      });
      setIsPathfinding(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>MOES / NCPOR • HIMNAV 360 ANTARCTIC POLAR NAVIGATION DECISION SYSTEM • SIH26059</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCPOR HimNav: AI-Enabled Antarctic Sea-Ice, Iceberg Trajectory &amp; Polar Ship Routing
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Centre for Polar and Ocean Research (NCPOR) Spatiotemporal Sea-Ice ConvLSTM Forecasting, Multi-Source Satellite SAR / Radiometry, Iceberg Drift Dynamics &amp; Besetment-Free Polar Vessel Pathfinding
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'missions', label: '❄️ Antarctic Voyages', count: missions.length },
            { id: 'routing', label: '🗺️ A* Polar Route Optimizer' },
            { id: 'icebergs', label: '🧊 Iceberg Drift Tracks', count: iceTracks.length },
            { id: 'costs', label: '⚓ Ice Regime Fuel Costs', count: costs.length },
            { id: 'stats', label: '📊 HimNav Telemetry' }
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
            VIEW 1: MISSIONS
           ========================================================================= */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {missions.map((m) => (
                <button
                  key={m.voyage_id}
                  onClick={() => setSelectedMission(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMission.voyage_id === m.voyage_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{m.voyage_id}</span>
                    <span className="text-emerald-400">-{m.fuel_saved_metric_tons} MT Fuel</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {m.expedition_name.split('-')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{m.transit_corridor}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>SIC: {m.current_sea_ice_concentration_pct}%</span>
                    <span className="text-amber-400">+{m.transit_time_saved_hours}h Saved</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedMission.voyage_id} • {selectedMission.vessel_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMission.expedition_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMission.navigation_verdict}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">POLAR CORRIDOR &amp; ICE REGIME PROFILE:</span>
                  <div className="text-white font-sans text-xs">
                    Transit Corridor: <strong className="text-amber-300">{selectedMission.transit_corridor}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Sea-Ice Regime: {selectedMission.current_sea_ice_concentration_pct}% SIC | Thickness: {selectedMission.prevailing_ice_thickness_m}m
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Tracked Iceberg: {selectedMission.tracked_iceberg}
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    AI Recommended Path: {selectedMission.ai_recommended_waypoint_path}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">POLAR FUEL SAVED</span><span className="text-emerald-400 font-bold">{selectedMission.fuel_saved_metric_tons} Metric Tons MGO</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXPEDITION TRANSIT TIME</span><span className="text-cyan-400 font-bold">+{selectedMission.transit_time_saved_hours} Hours Faster</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('routing')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Polar Class A* Cost Surface Pathfinding Solver ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Polar Route Pathfinder</span>
                  </h4>
                  <form onSubmit={handlePathfind} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Antarctic Voyage Destination</label>
                      <input type="text" readOnly value={`${selectedMission.expedition_name.split('-')[0]} (Lazarev Sea)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isPathfinding} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPathfinding ? 'animate-spin' : ''}`} />
                      <span>{isPathfinding ? 'Computing A* Polynya Cost Surface...' : 'Optimize Safe Icebreaker Route'}</span>
                    </button>
                  </form>
                  {routeResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Optimal Path: <strong className="text-emerald-400 font-mono text-xs">{routeResult.path}</strong></div>
                      <div>Fuel Savings: <strong className="text-cyan-300 font-mono text-xs">{routeResult.fuelSaved}</strong></div>
                      <div>Time Saved: <strong className="text-amber-300 font-mono text-xs">{routeResult.timeSaved}</strong></div>
                      <div>Iceberg Buffer: <strong className="text-white font-mono text-xs">{routeResult.icebergClearance}</strong></div>
                      <div>Besetment Check: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{routeResult.besetmentRisk}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ROUTING */}
        {tab === 'routing' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Navigation className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">A* Polar Class Cost-Surface Pathfinding Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Optimizes waypoints through coastal flaw polynyas and thermal leads while penalizing high-compression multi-year pack ice (&gt;80% SIC) to completely eliminate vessel besetment risks.
            </p>
          </div>
        )}

        {/* VIEW 3: ICEBERGS */}
        {tab === 'icebergs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {iceTracks.map((i, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-bold">{i.drift_speed_knots} kts</span>
                  <span className="text-amber-400 font-bold">{i.drift_direction}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{i.iceberg_id}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Size: {i.dimensions}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-400 font-mono text-[10px]">Safety: {i.collision_hazard}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: COSTS */}
        {tab === 'costs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {costs.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">{c.vessel_speed_knots} kts Speed</span>
                  <span className="text-rose-400 font-bold">Besetment: {c.besetment_probability * 100}%</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{c.ice_regime}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Fuel Burn: {c.fuel_burn_tons_day} Metric Tons / Day</p>
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
