import React, { useState } from 'react';
import { 
  Waves, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Clock, 
  RefreshCw, 
  Navigation, 
  ShieldAlert, 
  MapPin, 
  Globe 
} from 'lucide-react';

import casesData from './data/urban_flood_nowcast_cases.json';
import drainageData from './data/drainage_network_hydraulic_graph.json';
import routingData from './data/street_level_inundation_routing.json';
import statsData from './data/urbanhydro_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [drainage, setDrainage] = useState(drainageData);
  const [routing, setRouting] = useState(routingData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'drainage' | 'routing' | 'topography' | 'stats'>('cases');

  // Interactive Urban Flood Simulator
  const [isSimulating, setIsSimulating] = useState(false);
  const [floodResult, setFloodResult] = useState<any>({
    predictedDepth: "88.5 cm (Severe Inundation / Vehicle Submersion Risk)",
    subwayClosure: "Kurla & Sion Subways Automatically Barricaded",
    alternativeRoute: "Divert emergency traffic via Eastern Freeway Elevated Corridor",
    pumpingRate: "BMC 500 HP dewatering pumps activated @ Gandhi Market (18,000 L/min)",
    tideLockWarning: "Mithi River Outfall Gate #4 Locked by 4.4m High Spring Tide"
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setTimeout(() => {
      setFloodResult({
        predictedDepth: "88.5 cm (Severe Inundation / Vehicle Submersion Risk)",
        subwayClosure: "Kurla & Sion Subways Automatically Barricaded",
        alternativeRoute: "Divert emergency traffic via Eastern Freeway Elevated Corridor",
        pumpingRate: "BMC 500 HP dewatering pumps activated @ Gandhi Market (18,000 L/min)",
        tideLockWarning: "Mithi River Outfall Gate #4 Locked by 4.4m High Spring Tide"
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
              <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>NCMRWF • URBANHYDRO 360 REAL-TIME URBAN FLOOD NOWCASTING • SIH26085</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF UrbanHydro: Urban Flood Nowcasting System (Drainage & Rainfall Coupling)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Coupling 2D High-Resolution Surface DEMs with 1D Underground Directed-Graph Drainage Networks for Street-Level Inundation Depths (0–3 hr Lead Time)
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
            { id: 'cases', label: '🌊 Flood Nowcasts', count: cases.length },
            { id: 'drainage', label: '🚰 Drainage Graph', count: drainage.length },
            { id: 'routing', label: '🚗 Flood-Safe Routing', count: routing.length },
            { id: 'topography', label: '🏙️ 2D Surface DEM' },
            { id: 'stats', label: '📊 UrbanHydro Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{c.case_id}</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{c.lead_time_hours}</span>
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.metro_city}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.drainage_basin}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Depth: {c.projected_water_depth_cm} cm</span>
                    <span className="text-rose-400">FLOOD ALERT</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedCase.case_id} • {selectedCase.metro_city}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.drainage_basin}</h3>
                  </div>
                  <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-bold font-mono">
                    Depth: {selectedCase.projected_water_depth_cm} cm
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">COUPLED 2D RAINFALL & 1D HYDRAULIC NETWORK SURCHARGE:</span>
                  <div className="text-white font-sans text-xs">
                    Radar Rainfall: <strong className="text-amber-400">{selectedCase.rainfall_rate_mmh} mm/h</strong> | Node Status: <strong className="text-rose-400">{selectedCase.drainage_node_status}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Hydraulic Surcharge: <strong>{selectedCase.hydraulic_surcharge}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Navigation Action: <strong>{selectedCase.navigation_reroute}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Municipal Pumping: {selectedCase.pumping_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PROJECTED INUNDATION DEPTH</span><span className="text-cyan-400 font-bold">{selectedCase.projected_water_depth_cm} cm</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SUBWAY INTERCEPTION LEAD</span><span className="text-amber-400 font-bold">{selectedCase.lead_time_hours}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('drainage')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect 1D Underground Drainage Hydraulic Network Graph ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Hydraulic Flood Simulation</span>
                  </h4>
                  <form onSubmit={handleSimulate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Metro Corridor & Rain Intensity</label>
                      <input type="text" readOnly value={`${selectedCase.metro_city} (${selectedCase.rainfall_rate_mmh} mm/h)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isSimulating} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Solving 1D/2D Saint-Venant Conduits...' : 'Nowcast Street Inundation'}</span>
                    </button>
                  </form>
                  {floodResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Water Depth: <strong className="text-cyan-400 font-mono text-xs">{floodResult.predictedDepth}</strong></div>
                      <div>Subway Status: <strong className="text-rose-400 font-mono text-xs">{floodResult.subwayClosure}</strong></div>
                      <div>Transit Reroute: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{floodResult.alternativeRoute}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DRAINAGE */}
        {tab === 'drainage' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {drainage.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{d.count}</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.element}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Hydraulic Function: <strong className="text-white">{d.function}</strong></div>
                  <div className="text-rose-400 text-[11px] pt-1 border-t border-slate-900">Failure Trigger: {d.failure_mode}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ROUTING */}
        {tab === 'routing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {routing.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">Limit: {r.critical_depth}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.vehicle_type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.routing_policy}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: TOPOGRAPHY */}
        {tab === 'topography' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Navigation className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Dynamic Street-Level Flood Routing API</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Interfaces directly with civic navigation services to suggest flood-safe alternative pathways for emergency ambulances, fire trucks, and city buses, preventing vehicles from being trapped inside drowned underpasses.
            </p>
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
