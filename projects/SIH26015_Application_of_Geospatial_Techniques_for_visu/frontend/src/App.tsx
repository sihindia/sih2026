import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Droplets, 
  Layers, 
  Trees, 
  RefreshCw, 
  Compass, 
  Activity, 
  Globe 
} from 'lucide-react';

import watershedsData from './data/watershed_basins_and_ecological_scores.json';
import structuresData from './data/geotagged_water_harvesting_structures.json';
import indicesData from './data/srishti_drishti_satellite_indices.json';
import statsData from './data/jaldrishti_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'te' | 'bn'>('en');
  const [watersheds, setWatersheds] = useState(watershedsData);
  const [selectedWtr, setSelectedWtr] = useState(watershedsData[0]);
  const [structures, setStructures] = useState(structuresData);
  const [indices, setIndices] = useState(indicesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'basins' | 'structures' | 'satellite' | 'scores' | 'stats'>('basins');

  // Interactive Geo-Coded Image & Satellite Analytics Simulator
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [anaResult, setAnaResult] = useState<any>({
    biomassGain: "+28.5% NDVI Vegetation Canopy Expansion",
    waterHolding: "145,000 m³ Stored (88.0% Active Retention)",
    soilMoisture: "42.0% Root-Zone Moisture Index (SMI)",
    siltStatus: "Low Siltation (12% Bed Depth, Optimal)",
    aquiferLift: "+1.8m Groundwater Level Rise Recorded",
    healthVerdict: "Ecological Health Score: 86.4 / 100 (HIGH_IMPACT)"
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnaResult({
        biomassGain: `+${selectedWtr.ndvi_gain_pct}% NDVI Vegetation Canopy Expansion`,
        waterHolding: `${selectedWtr.storage_capacity_cum.toLocaleString()} m³ Stored Active Retention`,
        soilMoisture: `${selectedWtr.soil_moisture_pct}% Root-Zone Moisture Index (SMI)`,
        siltStatus: selectedWtr.siltation_level,
        aquiferLift: "+1.8m Groundwater Level Rise Recorded",
        healthVerdict: `Ecological Health Score: ${selectedWtr.ecological_health_score} / 100 (${selectedWtr.monitoring_status})`
      });
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR JALDRISHTI 360 • SIH26015</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR JalDrishti: Geospatial Interpretation of Geo-Coded Images &amp; Watershed Analytics
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) SRISHTI-DRISHTI 30m Satellite Remote Sensing Platform, Field Geo-Tagged Photo Computer Vision, Siltation Tracking &amp; Micro-Watershed Ecological Health Scoring
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'basins', label: '🏞️ Micro-Watershed Basins', count: watersheds.length },
            { id: 'structures', label: '📸 Geo-Tagged Structures', count: structures.length },
            { id: 'satellite', label: '🛰️ SRISHTI-DRISHTI Satellite', count: indices.length },
            { id: 'scores', label: '🧪 Ecological Health Index' },
            { id: 'stats', label: '📊 JalDrishti Telemetry' }
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
            VIEW 1: BASINS
           ========================================================================= */}
        {activeTab === 'basins' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {watersheds.map((w) => (
                <button
                  key={w.watershed_id}
                  onClick={() => setSelectedWtr(w)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedWtr.watershed_id === w.watershed_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{w.watershed_id}</span>
                    <span className="text-emerald-400">Score: {w.ecological_health_score}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {w.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{w.location}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{w.area_hectares.toLocaleString()} Ha</span>
                    <span className="text-amber-400">NDVI: +{w.ndvi_gain_pct}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedWtr.watershed_id} • {selectedWtr.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedWtr.name} ({selectedWtr.basin})</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedWtr.monitoring_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">WATERSHED HEALTH &amp; HYDROLOGY TELEMETRY:</span>
                  <div className="text-white font-sans text-xs">
                    Surface Water Retention: <strong className="text-cyan-300">{selectedWtr.storage_capacity_cum.toLocaleString()} m³ across {selectedWtr.active_structures_count} Active Structures</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Vegetation Canopy Recovery: +{selectedWtr.ndvi_gain_pct}% NDVI Biomass Expansion
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Soil Moisture: {selectedWtr.soil_moisture_pct}% Root-Zone Index (SMI)
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Siltation Assessment: {selectedWtr.siltation_level}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ECOLOGICAL HEALTH SCORE</span><span className="text-emerald-400 font-bold">{selectedWtr.ecological_health_score} / 100</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CATCHMENT AREA</span><span className="text-cyan-400 font-bold">{selectedWtr.area_hectares.toLocaleString()} Hectares</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('structures')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Field Geo-Tagged Check Dams &amp; Silt Traps ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Watershed Analyzer</span>
                  </h4>
                  <form onSubmit={handleAnalyze} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Micro-Watershed Target</label>
                      <input type="text" readOnly value={`${selectedWtr.name} (${selectedWtr.location})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isAnalyzing} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span>{isAnalyzing ? 'Processing SRISHTI-DRISHTI 30m Tiles...' : 'Run Geospatial Interpretation Analysis'}</span>
                    </button>
                  </form>
                  {anaResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Biomass: <strong className="text-emerald-400 font-mono text-xs">{anaResult.biomassGain}</strong></div>
                      <div>Water Stored: <span className="text-cyan-300 text-xs">{anaResult.waterHolding}</span></div>
                      <div>Soil Moisture: <strong className="text-amber-300 font-mono text-xs">{anaResult.soilMoisture}</strong></div>
                      <div>Silt Status: <strong className="text-slate-300 font-mono text-xs">{anaResult.siltStatus}</strong></div>
                      <div>Verdict: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{anaResult.healthVerdict}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STRUCTURES */}
        {tab === 'structures' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {structures.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-bold">{s.structure_id}</span>
                  <span className="text-emerald-400 font-bold">{s.water_holding_pct}% Holding</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">GPS: {s.coordinates} | Silt: {s.silt_status}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Impact: {s.impact}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SATELLITE */}
        {tab === 'satellite' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {indices.map((ind, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{ind.index}</span>
                <h4 className="font-bold text-sm text-white font-sans">{ind.formula}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{ind.purpose}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Platform: {ind.satellite_platform}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SCORES */}
        {tab === 'scores' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Droplets className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Ecological Watershed Health Matrix</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Synthesizing multi-spectral vegetation indices (NDVI), surface water presence (NDWI), Sentinel-1 soil moisture (SMI), and field geo-tagged photo inspections into an objective score from 0 to 100.
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
