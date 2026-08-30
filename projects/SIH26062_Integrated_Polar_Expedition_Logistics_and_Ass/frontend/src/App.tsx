import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  ShieldAlert, 
  RefreshCw, 
  MapPin, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import operationsData from './data/polar_expedition_logistics_operations.json';
import assetsData from './data/subzero_asset_inventory_catalog.json';
import personnelData from './data/personnel_and_sar_emergency_manifest.json';
import statsData from './data/setupolar_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [operations, setOperations] = useState(operationsData);
  const [selectedOp, setSelectedOp] = useState(operationsData[0]);
  const [assets, setAssets] = useState(assetsData);
  const [personnel, setPersonnel] = useState(personnelData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'operations' | 'assets' | 'personnel' | 'routes' | 'stats'>('operations');

  // Interactive Polar Convoy Dispatch Simulator
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>({
    convoyStatus: "4x PistenBully 300 Tracked Snow Tractors Dispatched",
    tonnage: "142.5 Metric Tons Critical Wintering Cargo En Route",
    gprClearance: "Ground Penetrating Radar (GPR) Cleared - Zero Crevasse Risk",
    rfidAudit: "100% (480 Items) Sub-Zero BLE Beacons Verified Active",
    transitTime: "Estimated Transit: 14.0 Hours over 95 km Blue-Ice Route"
  });

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatching(true);
    setTimeout(() => {
      setDispatchResult({
        convoyStatus: "4x PistenBully 300 Tracked Snow Tractors Dispatched",
        tonnage: "142.5 Metric Tons Critical Wintering Cargo En Route",
        gprClearance: "Ground Penetrating Radar (GPR) Cleared - Zero Crevasse Risk",
        rfidAudit: "100% (480 Items) Sub-Zero BLE Beacons Verified Active",
        transitTime: "Estimated Transit: 14.0 Hours over 95 km Blue-Ice Route"
      });
      setIsDispatching(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Truck className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>MOES / NCPOR • SETUPOLAR 360 POLAR EXPEDITION LOGISTICS &amp; ASSETS • SIH26062</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoES SetuPolar: Integrated Polar Expedition Logistics &amp; Asset Management System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Centre for Polar and Ocean Research (NCPOR) Multi-Modal Polar Supply Chain, Fast-Ice Crane Offloading, PistenBully Tractor Convoys, -50°C RFID Cold-Chain &amp; SAR Emergency Response
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'operations', label: '🚚 Logistics Operations', count: operations.length },
            { id: 'assets', label: '🏷️ Sub-Zero Assets (-50°C)', count: assets.length },
            { id: 'personnel', label: '👥 Personnel & SAR', count: personnel.length },
            { id: 'routes', label: '🗺️ Blue-Ice Route Planner' },
            { id: 'stats', label: '📊 SetuPolar Telemetry' }
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
            VIEW 1: OPERATIONS
           ========================================================================= */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {operations.map((o) => (
                <button
                  key={o.operation_id}
                  onClick={() => setSelectedOp(o)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedOp.operation_id === o.operation_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{o.operation_id}</span>
                    <span className="text-emerald-400">{o.total_tonnage_mt} MT</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {o.operation_title.split('&')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{o.theatre_location}</div>
                  <div className="text-[10px] text-indigo-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{o.route_distance_km} km Route</span>
                    <span className="text-emerald-400">{o.convoy_transit_time_hours}h Transit</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedOp.operation_id} • {selectedOp.theatre_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedOp.operation_title} ({selectedOp.total_tonnage_mt} MT Cargo)</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedOp.delivery_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">POLAR CARGO MANIFEST &amp; TRANSPORT VEHICLES:</span>
                  <div className="text-white font-sans text-xs">
                    Cargo Items: <strong className="text-amber-300">{selectedOp.cargo_manifest}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Transport Mode: {selectedOp.transport_mode} ({selectedOp.route_distance_km} km)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Crevasse Safety: {selectedOp.crevasse_hazard_status}
                  </div>
                  <div className="text-indigo-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Cold-Chain Tracking: {selectedOp.subzero_rfid_tracking}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL CARGO TONNAGE</span><span className="text-emerald-400 font-bold">{selectedOp.total_tonnage_mt} Metric Tons</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXPEDITION TRANSIT TIME</span><span className="text-indigo-400 font-bold">{selectedOp.convoy_transit_time_hours} Hours Transit</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('assets')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Sub-Zero RFID &amp; BLE Cold-Chain Inventory ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Instant Polar Convoy Dispatcher</span>
                  </h4>
                  <form onSubmit={handleDispatch} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Expedition Convoy Route</label>
                      <input type="text" readOnly value={`${selectedOp.operation_title.split('&')[0]} (${selectedOp.route_distance_km} km)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isDispatching} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
                      <span>{isDispatching ? 'Validating GPR Crevasse Radar...' : 'Dispatch PistenBully Tractor Convoy'}</span>
                    </button>
                  </form>
                  {dispatchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Convoy: <strong className="text-emerald-400 font-mono text-xs">{dispatchResult.convoyStatus}</strong></div>
                      <div>Tonnage: <strong className="text-indigo-400 font-mono text-xs">{dispatchResult.tonnage}</strong></div>
                      <div>Crevasse Status: <strong className="text-cyan-300 font-mono text-xs">{dispatchResult.gprClearance}</strong></div>
                      <div>Cold-Chain Audit: <strong className="text-amber-300 font-mono text-xs">{dispatchResult.rfidAudit}</strong></div>
                      <div>Transit ETA: <strong className="text-white font-mono text-xs block mt-0.5">{dispatchResult.transitTime}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ASSETS */}
        {tab === 'assets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {assets.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-400 font-bold">{a.temp_rating}</span>
                  <span className="text-emerald-400 font-bold">{a.category}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{a.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Tracking: {a.tracking_tech}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Status: {a.status}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: PERSONNEL */}
        {tab === 'personnel' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {personnel.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{p.medevac_status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Role: {p.role}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-indigo-300 font-mono text-[10px]">Beacon: {p.safety_beacon_id}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ROUTES */}
        {tab === 'routes' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">95 km Blue-Ice Convoy Route &amp; Crevasse Avoidance</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time GPS waypoints plotted through satellite SAR interferometry and Ground Penetrating Radar (GPR) to steer heavy PistenBully tractor sledges around treacherous shear zones and hidden crevasses.
            </p>
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
