import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  Navigation, 
  RefreshCw, 
  MapPin, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import corridorsData from './data/ner_logistics_corridors_and_disruptions.json';
import shipmentsData from './data/essential_commodities_shipments_registry.json';
import detoursData from './data/alternate_detour_routes_and_bridges.json';
import statsData from './data/gatiner_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'as' | 'bn' | 'hi' | 'kha' | 'miz'>('en');
  const [corridors, setCorridors] = useState(corridorsData);
  const [selectedCorridor, setSelectedCorridor] = useState(corridorsData[0]);
  const [shipments, setShipments] = useState(shipmentsData);
  const [detours, setDetours] = useState(detoursData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'corridors' | 'shipments' | 'optimizer' | 'bridges' | 'stats'>('corridors');

  // Interactive AI Route Detour Optimizer Simulator
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optResult, setOptResult] = useState<any>({
    primaryStatus: "Primary NH-10 Corridor Blocked at 29th Mile Setijhora (Landslide)",
    recommendedBypass: "Diverted via NH-717A: Lava ➔ Algarah ➔ Pedong ➔ Reshi ➔ Rhenock",
    bridgeCapacity: "Bailey Bridge Structural Rating: 24 Metric Tons (Clear for 22.5 MT Tanker)",
    delayHours: "+2.5 Hours Detour Latency (100% On-Time Delivery Guarantee)",
    deliveryStatus: "Liquid Medical Oxygen Delivered Intact to STNM Hospital Gangtok"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setOptResult({
        primaryStatus: "Primary NH-10 Corridor Blocked at 29th Mile Setijhora (Landslide)",
        recommendedBypass: "Diverted via NH-717A: Lava ➔ Algarah ➔ Pedong ➔ Reshi ➔ Rhenock",
        bridgeCapacity: "Bailey Bridge Structural Rating: 24 Metric Tons (Clear for 22.5 MT Tanker)",
        delayHours: "+2.5 Hours Detour Latency (100% On-Time Delivery Guarantee)",
        deliveryStatus: "Liquid Medical Oxygen Delivered Intact to STNM Hospital Gangtok"
      });
      setIsOptimizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Truck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MDONER • GATINER 360 SMART LOGISTICS &amp; ACCESSIBILITY • SIH26002</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MDoNER GatiNER: AI-Based Smart Logistics &amp; Accessibility Platform for NER
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Ministry of Development of North Eastern Region (MDoNER) Real-Time Mountain Corridor Monitoring, Landslide Disruption Forecasts, Dynamic Bailey Bridge Detours &amp; Essential Cold-Chain Cargo Tracking
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('as')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'as' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>অসমীয়া</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('kha')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kha' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>Khasi</button>
            <button onClick={() => setLang('miz')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'miz' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>Mizo</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'corridors', label: '🚚 Arterial Corridors', count: corridors.length },
            { id: 'shipments', label: '📦 Essential Cold-Chain', count: shipments.length },
            { id: 'optimizer', label: '🔄 AI Detour Optimizer' },
            { id: 'bridges', label: '🌉 Mountain Bridges & Bypasses', count: detours.length },
            { id: 'stats', label: '📊 GatiNER Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: CORRIDORS
           ========================================================================= */}
        {activeTab === 'corridors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {corridors.map((c) => (
                <button
                  key={c.corridor_id}
                  onClick={() => setSelectedCorridor(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCorridor.corridor_id === c.corridor_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{c.corridor_id}</span>
                    <span className="text-amber-400">{c.distance_km} km</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.corridor_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.primary_highway}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Delay: +{c.estimated_delay_hours}h</span>
                    <span className="text-rose-400">{c.disruption_severity.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCorridor.corridor_id} • {selectedCorridor.states_spanned}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCorridor.corridor_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCorridor.logistics_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">HAZARD DISRUPTION &amp; DYNAMIC REROUTING:</span>
                  <div className="text-white font-sans text-xs">
                    Current Disruption: <strong className="text-rose-400">{selectedCorridor.current_disruption}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Recommended Detour: {selectedCorridor.ai_recommended_detour}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Bridge Clearance: {selectedCorridor.detour_bridge_capacity}
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Priority Cargo: {selectedCorridor.essential_cargo_priority}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL CORRIDOR DISTANCE</span><span className="text-emerald-400 font-bold">{selectedCorridor.distance_km} Kilometers</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MINIMIZED DETOUR LATENCY</span><span className="text-cyan-400 font-bold">+{selectedCorridor.estimated_delay_hours} Hours Delay</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('shipments')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Track Essential Cold-Chain Supplies &amp; Medicines ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Instant Mountain Detour Predictor</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Disrupted Highway Corridor</label>
                      <input type="text" readOnly value={`${selectedCorridor.primary_highway} (${selectedCorridor.states_spanned})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Evaluating Bailey Bridge Limits...' : 'Calculate Optimal Alternate Mountain Detour'}</span>
                    </button>
                  </form>
                  {optResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <span className="text-rose-300 text-xs">{optResult.primaryStatus}</span></div>
                      <div>Detour: <strong className="text-emerald-400 font-mono text-xs">{optResult.recommendedBypass}</strong></div>
                      <div>Bridge: <strong className="text-amber-300 font-mono text-xs">{optResult.bridgeCapacity}</strong></div>
                      <div>ETA Impact: <strong className="text-cyan-300 font-mono text-xs">{optResult.delayHours}</strong></div>
                      <div>Delivery: <strong className="text-white font-mono text-xs block mt-0.5">{optResult.deliveryStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SHIPMENTS */}
        {tab === 'shipments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {shipments.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">{s.category}</span>
                  <span className="text-cyan-400 font-bold">{s.temp_monitored}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.origin} ➔ {s.destination}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Status: {s.status}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: OPTIMIZER */}
        {tab === 'optimizer' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Navigation className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Modal AI Mountain Route Optimization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time graph routing engine assessing vehicle gross vehicle weight (GVW), hairpin turn turning radius, and bailey bridge limits to guarantee supply delivery to high-altitude hospitals and food godowns.
            </p>
          </div>
        )}

        {/* VIEW 4: BRIDGES */}
        {tab === 'bridges' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {detours.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">Max: {d.max_vehicle_tonnage_mt} MT</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.detour_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{d.terrain} ({d.hairpin_bends} Hairpins)</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Rescue: {d.emergency_tow_station}</div>
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
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
