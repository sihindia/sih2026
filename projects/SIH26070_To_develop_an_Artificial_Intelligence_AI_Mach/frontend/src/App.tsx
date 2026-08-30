import React, { useState } from 'react';
import { 
  Wind, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Radio, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/tropical_cyclones_satellite_cases.json';
import satData from './data/multi_source_satellite_sensor_channels.json';
import dvorakData from './data/ai_dvorak_intensity_classification_scales.json';
import statsData from './data/cycloneai_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [satellites, setSatellites] = useState(satData);
  const [dvorak, setDvorak] = useState(dvorakData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'satellites' | 'dvorak' | 'landfall' | 'stats'>('cases');

  // Interactive 72-Hour Landfall & Storm Surge Predictor Simulator
  const [isPredicting, setIsPredicting] = useState(false);
  const [predResult, setPredResult] = useState<any>({
    dvorak: "AI Dvorak T4.5 (120 km/h Sustained Winds • 984 hPa)",
    landfall: "Dhamra Port / Bhitarkanika (Odisha Coast • Oct 25 00:00 UTC)",
    surge: "2.4m Inundation Surge (24.2 km 72h Track Error)",
    evac: "RED ALERT: Coastal Evacuation for Kendrapara, Bhadrak & Balasore"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPredResult({
        dvorak: "AI Dvorak T4.5 (120 km/h Sustained Winds • 984 hPa)",
        landfall: "Dhamra Port / Bhitarkanika (Odisha Coast • Oct 25 00:00 UTC)",
        surge: "2.4m Inundation Surge (24.2 km 72h Track Error)",
        evac: "RED ALERT: Coastal Evacuation for Kendrapara, Bhadrak & Balasore"
      });
      setIsPredicting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Wind className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>IMD • CYCLONEAI 360 MULTI-SATELLITE CYCLONE PATTERN & 72H LANDFALL PREDICTOR • SIH26070</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD CycloneAI: AI Multi-Source Satellite Tropical Cyclone Pattern & Landfall Prediction
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              INSAT-3DR/3DS TIR1/WV Fusion, Automated Computer Vision Dvorak T-Number Intensity & 72-Hour Landfall Surge Modeling
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🌀 Cyclone Cases', count: cases.length },
            { id: 'satellites', label: '🛰️ Multi-Source Satellites', count: satellites.length },
            { id: 'dvorak', label: '🌪️ AI Dvorak Scale', count: dvorak.length },
            { id: 'landfall', label: '🎯 72h Landfall & Surge' },
            { id: 'stats', label: '📊 CycloneAI Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
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
                  key={c.cyclone_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.cyclone_id === c.cyclone_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{c.cyclone_id}</span>
                    <span className="text-rose-400">Dvorak T{c.ai_dvorak_t_number}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.cyclone_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Basin: {c.ocean_basin}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Winds: {c.max_sustained_winds_kmh} km/h</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedCase.cyclone_id} • {selectedCase.ocean_basin}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.cyclone_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">MULTI-SOURCE SATELLITE & DVORAK INTENSITY:</span>
                  <div className="text-white font-sans text-xs font-bold">Satellite Feeds: {selectedCase.primary_satellite_sources}</div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    AI Dvorak T-Number: <strong>T{selectedCase.ai_dvorak_t_number} ({selectedCase.max_sustained_winds_kmh} km/h • {selectedCase.central_pressure_hpa} hPa)</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    72h Landfall Target: <strong>{selectedCase.predicted_landfall_location} (Surge: {selectedCase.storm_surge_height_m}m)</strong>
                  </div>
                  <div className="text-rose-300 font-sans text-[11px]">
                    Evacuation Notice: {selectedCase.evacuation_advisory}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">72H TRACK ERROR</span><span className="text-emerald-400 font-bold">{selectedCase.72h_track_error_km} km (&lt;35km Target)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">STORM SURGE</span><span className="text-teal-400 font-bold">{selectedCase.storm_surge_height_m} Meters</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('satellites')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Multi-Spectral Satellite Sensor Feeds ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>72h Landfall & Surge Predictor</span>
                  </h4>
                  <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Cyclone Eye Position</label>
                      <input type="text" readOnly value={`${selectedCase.cyclone_name.slice(0, 30)} (${selectedCase.current_eye_coords})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Running PINN Ensemble Track Model...' : 'Forecast 72h Landfall & Surge'}</span>
                    </button>
                  </form>
                  {predResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Landfall: <strong className="text-teal-400 font-mono text-xs">{predResult.landfall}</strong></div>
                      <div>Alert: <strong className="text-rose-300 font-mono text-xs block mt-0.5">{predResult.evac}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SATELLITES */}
        {tab === 'satellites' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {satellites.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{s.frequency_cadence}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.satellite_sensor}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Resolution: <strong className="text-white">{s.spatial_res}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Purpose: {s.purpose}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: DVORAK */}
        {tab === 'dvorak' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {dvorak.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{d.t_number}</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.cyclone_category}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Winds: <strong className="text-amber-400">{d.wind_knots}</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Pressure: {d.central_pressure_drop}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LANDFALL */}
        {tab === 'landfall' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <Compass className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Physics-Informed 72-Hour Cyclone Landfall Cone & Coastal Surge Radar</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simulates dynamic storm surge hydrodynamics, ocean bottom bathymetry, and astronomical tide superposition generating high-precision coastal district evacuation warnings.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
