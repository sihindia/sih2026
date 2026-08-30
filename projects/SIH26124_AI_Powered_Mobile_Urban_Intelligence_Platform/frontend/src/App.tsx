import React, { useState } from 'react';
import { 
  Bus, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Camera, 
  MapPin, 
  RefreshCw, 
  ShieldAlert, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/urban_bus_fleet_sensing_cases.json';
import defectsData from './data/pothole_road_defect_registry.json';
import trafficData from './data/traffic_density_anpr_records.json';
import statsData from './data/urbaneye_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [defects, setDefects] = useState(defectsData);
  const [traffic, setTraffic] = useState(trafficData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'defects' | 'traffic' | 'heatmap' | 'stats'>('cases');

  // Interactive Bus Urban Sensing Frame Processor Simulator
  const [isProcessing, setIsProcessing] = useState(false);
  const [procResult, setProcResult] = useState<any>({
    defect: "Class-3 Pothole Cluster (1.8m x 0.6m, 8cm depth)",
    anpr: "KA-04-NB-9210 (Rash Bus Lane Encroachment • 99.2% OCR Conf)",
    ticket: "BBMP Road Repair Work Order #8491 Dispatched",
    bandwidth: "99.2% Bandwidth Saved (Structured Edge Metadata Only)"
  });

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setProcResult({
        defect: "Class-3 Pothole Cluster (1.8m x 0.6m, 8cm depth)",
        anpr: "KA-04-NB-9210 (Rash Bus Lane Encroachment • 99.2% OCR Conf)",
        ticket: "BBMP Road Repair Work Order #8491 Dispatched",
        bandwidth: "99.2% Bandwidth Saved (Structured Edge Metadata Only)"
      });
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Bus className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>BEL • URBANEYE 360 MOBILE URBAN SENSING BUS FLEET PLATFORM • SIH26124</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BEL UrbanEye: AI-Powered Mobile Urban Intelligence Using Public Transport Fleets
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Edge-AI Onboard Bus Vision, Automated Pothole & Road Defect Mapping, Traffic Density Analysis & Hit-and-Run ANPR Alerts
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🚌 Bus Sensing Cases', count: cases.length },
            { id: 'defects', label: '🕳️ Potholes & Defects', count: defects.length },
            { id: 'traffic', label: '🚦 Traffic & ANPR', count: traffic.length },
            { id: 'heatmap', label: '🗺️ GIS Urban Heatmap' },
            { id: 'stats', label: '📊 UrbanEye Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{c.case_id}</span>
                    <span className="text-cyan-300">{c.bus_vehicle_no}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.transit_agency} • {c.route_no}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.road_defect_detected.slice(0, 45)}...</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>ANPR: {c.anpr_ocr_confidence}%</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedCase.case_id} • {selectedCase.bus_vehicle_no}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.transit_agency} ({selectedCase.route_no})</h3>
                  </div>
                  <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">EDGE VISION SENSING & MUNICIPAL DISPATCH:</span>
                  <div className="text-white font-sans text-xs font-bold">GPS: {selectedCase.gps_coordinates}</div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Defect Detected: <strong>{selectedCase.road_defect_detected}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    ANPR Infraction: <strong>{selectedCase.anpr_infraction_event} ({selectedCase.anpr_ocr_confidence}% Conf)</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Action: {selectedCase.municipal_action_ticket}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BANDWIDTH SAVED</span><span className="text-emerald-400 font-bold">{selectedCase.edge_bandwidth_saved_pct}% (Edge Metadata Only)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TRAFFIC FLOW</span><span className="text-indigo-400 font-bold">{selectedCase.vehicle_density_flow.split(' ')[0]} Veh/Min</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('defects')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Pothole & Defect Repair Workflow Matrix ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Edge Bus Vision Processor</span>
                  </h4>
                  <form onSubmit={handleProcess} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Active Transit Bus</label>
                      <input type="text" readOnly value={`${selectedCase.bus_vehicle_no} (${selectedCase.route_no})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>{isProcessing ? 'Processing Edge Video Stream...' : 'Process Bus Onboard Frame'}</span>
                    </button>
                  </form>
                  {procResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Defect: <strong className="text-rose-400 font-mono text-xs">{procResult.defect}</strong></div>
                      <div>ANPR: <strong className="text-amber-300 font-mono text-xs block mt-0.5">{procResult.anpr}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DEFECTS */}
        {tab === 'defects' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {defects.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{d.severity}</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.defect_type}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Avg Depth: <strong className="text-cyan-400">{d.avg_depth_cm} cm</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Repair SLA: {d.priority_sla_hours} Hours</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: TRAFFIC */}
        {tab === 'traffic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {traffic.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">HOURLY: {t.hourly_volume} VEH/HR</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.junction}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Bus Lane Violations: <strong className="text-amber-400">{t.bus_lane_violations}</strong></div>
                  <div className="text-rose-400 text-[11px] pt-1 border-t border-slate-900">Congestion: {t.congestion_index}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: HEATMAP */}
        {tab === 'heatmap' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Centralized GIS Road Defect & Congestion Command Center</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Aggregates geospatial data from 650+ public transport buses mapping origin-destination bottlenecks, potholes, waterlogging, and hit-and-run ANPR tracking in real time.
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
