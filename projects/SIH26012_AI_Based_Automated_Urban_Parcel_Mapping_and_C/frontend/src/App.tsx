import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  Globe 
} from 'lucide-react';

import zonesData from './data/drone_survey_zones_and_flights.json';
import parcelsData from './data/extracted_cadastral_parcels_and_ulpins.json';
import rulesData from './data/topology_validation_and_sliver_rules.json';
import statsData from './data/nakshadrone_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'bn'>('en');
  const [zones, setZones] = useState(zonesData);
  const [selectedZone, setSelectedZone] = useState(zonesData[0]);
  const [parcels, setParcels] = useState(parcelsData);
  const [rules, setRules] = useState(rulesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'zones' | 'parcels' | 'engine' | 'topology' | 'stats'>('zones');

  // Interactive GeoAI Cadastral Feature Extraction Simulator
  const [isExtracting, setIsExtracting] = useState(false);
  const [extResult, setExtResult] = useState<any>({
    parcelsExtracted: "142 Cadastral Parcels Delineated (Sub-5cm Precision)",
    buildingFootprints: "186 Structural Footprints Extracted (DSM Ortho-Corrected)",
    roadCenterlines: "14.8 km Road Corridors Traced with Width Annotations",
    topologyValidation: "PASSED: Zero Polygon Slivers, Dangles or Self-Intersections",
    ulpinGenerated: "Pre-allocated 14-Digit Standardized ULPINs for Land Records",
    exportFormats: "GIS-Ready GeoJSON, ESRI Shapefile & OGC WFS Endpoints"
  });

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExtracting(true);
    setTimeout(() => {
      setExtResult({
        parcelsExtracted: "142 Cadastral Parcels Delineated (Sub-5cm Precision)",
        buildingFootprints: "186 Structural Footprints Extracted (DSM Ortho-Corrected)",
        roadCenterlines: "14.8 km Road Corridors Traced with Width Annotations",
        topologyValidation: "PASSED: Zero Polygon Slivers, Dangles or Self-Intersections",
        ulpinGenerated: "Pre-allocated 14-Digit Standardized ULPINs for Land Records",
        exportFormats: "GIS-Ready GeoJSON, ESRI Shapefile & OGC WFS Endpoints"
      });
      setIsExtracting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR NAKSHADRONE 360 • SIH26012</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR NakshaDrone: AI-Based Urban Parcel Mapping &amp; Drone Feature Extraction
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) NAKSHA Programme High-Resolution Drone Orthorectified Imagery (ORI), Mask R-CNN &amp; SAM Deep Learning Parcel Segmentation &amp; Automated Cadastral Topology Validator
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'zones', label: '🛰️ Drone Survey Zones', count: zones.length },
            { id: 'parcels', label: '🏠 Extracted Parcels & ULPIN', count: parcels.length },
            { id: 'engine', label: '📐 GeoAI Extraction Engine' },
            { id: 'topology', label: '🛡️ Topology & Sliver Rules', count: rules.length },
            { id: 'stats', label: '📊 NakshaDrone Telemetry' }
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
            VIEW 1: ZONES
           ========================================================================= */}
        {activeTab === 'zones' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {zones.map((z) => (
                <button
                  key={z.zone_id}
                  onClick={() => setSelectedZone(z)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedZone.zone_id === z.zone_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{z.zone_id}</span>
                    <span className="text-amber-400">{z.gsd_cm_px} cm/px GSD</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {z.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{z.city}, {z.state}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{z.total_parcels_extracted} Parcels</span>
                    <span className="text-cyan-400">{z.geoai_confidence_pct}% Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedZone.zone_id} • {selectedZone.city}, {selectedZone.state}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedZone.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedZone.survey_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">DRONE SURVEY FLIGHT &amp; GEOAI EXTRACTION:</span>
                  <div className="text-white font-sans text-xs">
                    Coverage &amp; Resolution: <strong className="text-amber-300">{selectedZone.surveyed_area_sqm.toLocaleString()} m² Area at {selectedZone.gsd_cm_px} cm/px GSD ({selectedZone.flight_altitude_m}m AGL)</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Extracted Features: {selectedZone.total_parcels_extracted} Urban Parcels &amp; {selectedZone.building_footprints_delineated} Building Footprints
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Camera Sensor: {selectedZone.drone_sensor} (High-Precision GNSS Geotagging)
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Ground Truthing Validation: {selectedZone.geoai_confidence_pct}% Agreement with Field Surveyors
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DELINEATED PARCELS</span><span className="text-emerald-400 font-bold">{selectedZone.total_parcels_extracted} Land Parcels</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BUILDING FOOTPRINTS</span><span className="text-cyan-400 font-bold">{selectedZone.building_footprints_delineated} Structures</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('parcels')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Extracted Cadastral Parcels &amp; 14-Digit ULPINs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Instant GeoAI Parcel Extractor</span>
                  </h4>
                  <form onSubmit={handleExtract} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Drone Flight Corridor</label>
                      <input type="text" readOnly value={`${selectedZone.name} (${selectedZone.city} • ${selectedZone.gsd_cm_px} cm/px)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isExtracting} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isExtracting ? 'animate-spin' : ''}`} />
                      <span>{isExtracting ? 'Segmenting Parcels & Snapping Slivers...' : 'Run Automated Cadastral Feature Extraction'}</span>
                    </button>
                  </form>
                  {extResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Parcels: <strong className="text-emerald-400 font-mono text-xs">{extResult.parcelsExtracted}</strong></div>
                      <div>Footprints: <span className="text-cyan-300 text-xs">{extResult.buildingFootprints}</span></div>
                      <div>Road Centerlines: <strong className="text-amber-300 font-mono text-xs">{extResult.roadCenterlines}</strong></div>
                      <div>Topology Validation: <strong className="text-emerald-300 font-mono text-xs">{extResult.topologyValidation}</strong></div>
                      <div>Cadastral Output: <strong className="text-white font-mono text-xs block mt-0.5">{extResult.exportFormats}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PARCELS */}
        {tab === 'parcels' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {parcels.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">{p.ulpin}</span>
                  <span className="text-cyan-400 font-bold">{p.extraction_confidence_pct}% Conf</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{p.parcel_id} • {p.land_use}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Parcel Area: {p.parcel_area_sqm} m² | Building: {p.building_footprint_sqm} m²</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Access: {p.road_access_width_m}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ENGINE */}
        {tab === 'engine' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Layers className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">GeoAI Computer Vision Deep Learning Segmentation</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Multi-scale convolutional neural network combining Mask R-CNN and Segment Anything Model (SAM) with Digital Surface Models (DSM) to delineate parcel boundary walls and building envelopes.
            </p>
          </div>
        )}

        {/* VIEW 4: TOPOLOGY */}
        {tab === 'topology' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{r.rule}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.tolerance}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.description}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Standard: Survey of India Cadastral Compliant</div>
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
