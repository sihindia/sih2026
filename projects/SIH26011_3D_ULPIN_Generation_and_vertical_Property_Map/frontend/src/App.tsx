import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Box, 
  Layers, 
  RefreshCw, 
  Compass, 
  Activity, 
  Globe 
} from 'lucide-react';

import parcelsData from './data/vertical_parcels_and_3d_ulpins.json';
import lidarData from './data/lidar_drone_mesh_and_pointclouds.json';
import rulesData from './data/volumetric_topology_rules_matrix.json';
import statsData from './data/naksha3d_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'kn' | 'bn'>('en');
  const [parcels, setParcels] = useState(parcelsData);
  const [selectedParcel, setSelectedParcel] = useState(parcelsData[0]);
  const [lidar, setLidar] = useState(lidarData);
  const [rules, setRules] = useState(rulesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'parcels' | 'lidar' | 'generator' | 'rules' | 'stats'>('parcels');

  // Interactive 3D ULPIN Generator Simulator
  const [isGenerating, setIsGenerating] = useState(false);
  const [genResult, setGenResult] = useState<any>({
    ulpin: "27-584-0941-F14-U02",
    volume: "511.5 m³ (165.0 m² Area × 3.1m Ceiling)",
    elevation: "+46.5m Above Mean Sea Level (MSL)",
    ladmStandard: "ISO 19152 LADM 3D Volumetric Compliant",
    collisionCheck: "ZERO Spatial Collision with Adjoining Units 1401 & 1403",
    titleDeed: "Cryptographically Verified 3D Cadastral Deed Issued"
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setGenResult({
        ulpin: "27-584-0941-F14-U02",
        volume: "511.5 m³ (165.0 m² Area × 3.1m Ceiling)",
        elevation: "+46.5m Above Mean Sea Level (MSL)",
        ladmStandard: "ISO 19152 LADM 3D Volumetric Compliant",
        collisionCheck: "ZERO Spatial Collision with Adjoining Units 1401 & 1403",
        titleDeed: "Cryptographically Verified 3D Cadastral Deed Issued"
      });
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR NAKSHA3D 360 • SIH26011</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR Naksha3D: 3D ULPIN Generation &amp; Vertical Property Mapping System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) 3D Volumetric Cadastre, Multi-Storey High-Rise Condominiums, Subsurface Metro Transit &amp; Elevated Flyover Air-Rights Mapping (ISO 19152 LADM Compliant)
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'parcels', label: '🏢 Vertical 3D Parcels', count: parcels.length },
            { id: 'lidar', label: '🛸 Drone & LiDAR Point Clouds', count: lidar.length },
            { id: 'generator', label: '⚡ 3D ULPIN Generator' },
            { id: 'rules', label: '📐 Volumetric Topology Rules', count: rules.length },
            { id: 'stats', label: '📊 Naksha3D Telemetry' }
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
            VIEW 1: PARCELS
           ========================================================================= */}
        {activeTab === 'parcels' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {parcels.map((p) => (
                <button
                  key={p.parcel_id}
                  onClick={() => setSelectedParcel(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedParcel.parcel_id === p.parcel_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{p.generated_3d_ulpin}</span>
                    <span className="text-amber-400">{p.volumetric_space_m3.toLocaleString()} m³</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.project_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.location}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.floor_level}</span>
                    <span className="text-cyan-400">{p.property_type.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedParcel.generated_3d_ulpin} • {selectedParcel.surface_survey_number}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedParcel.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedParcel.cadastral_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">3D VOLUMETRIC CADASTRE &amp; AIR-RIGHTS DELINEATION:</span>
                  <div className="text-white font-sans text-xs">
                    Volumetric Footprint: <strong className="text-amber-300">{selectedParcel.floor_area_sqm} m² Area × {selectedParcel.ceiling_height_m}m Ceiling = {selectedParcel.volumetric_space_m3.toLocaleString()} m³</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Vertical Stratification: Air-Rights: {selectedParcel.air_rights_elevation_m} | Subsurface: {selectedParcel.subsurface_depth_m}
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Topology Integrity: {selectedParcel.topology_collision_check} (ISO 19152 Compliant)
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Title Deed &amp; Encumbrance: {selectedParcel.mortgage_registry_status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">VOLUMETRIC SPACE</span><span className="text-emerald-400 font-bold">{selectedParcel.volumetric_space_m3.toLocaleString()} m³ Envelope</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">VERTICAL FLOOR LEVEL</span><span className="text-cyan-400 font-bold">{selectedParcel.floor_level}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('lidar')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Drone Orthophoto &amp; LiDAR 3D Point Clouds ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Instant 3D ULPIN Geocoding Engine</span>
                  </h4>
                  <form onSubmit={handleGenerate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Vertical Property Unit</label>
                      <input type="text" readOnly value={`${selectedParcel.project_name} - ${selectedParcel.floor_level}`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isGenerating} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Extruding Volumetric Cadastre & Checking Collision...' : 'Generate 14-Digit 3D ULPIN'}</span>
                    </button>
                  </form>
                  {genResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>3D ULPIN: <strong className="text-emerald-400 font-mono text-xs">{genResult.ulpin}</strong></div>
                      <div>Envelope: <span className="text-cyan-300 text-xs">{genResult.volume}</span></div>
                      <div>Datum Elevation: <strong className="text-amber-300 font-mono text-xs">{genResult.elevation}</strong></div>
                      <div>LADM Standard: <strong className="text-emerald-300 font-mono text-xs">{genResult.ladmStandard}</strong></div>
                      <div>Collision Validation: <strong className="text-white font-mono text-xs block mt-0.5">{genResult.collisionCheck}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LIDAR */}
        {tab === 'lidar' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {lidar.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{l.source}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.sensor_model}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Features: {l.extracted_features}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Precision: ±{l.accuracy_hz_cm || l.accuracy_vt_cm} cm Ground Accuracy</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: GENERATOR */}
        {tab === 'generator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Box className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated 3D Cadastral Volumetric Delineation</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Synthesizing UAV drone meshes, LiDAR floor slices, and architectural CAD drawings to issue legally immutable 3D ULPIN property titles for multi-level urban properties.
            </p>
          </div>
        )}

        {/* VIEW 4: RULES */}
        {tab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{r.rule_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Standard: {r.standard}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Rule: {r.enforcement}</div>
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
