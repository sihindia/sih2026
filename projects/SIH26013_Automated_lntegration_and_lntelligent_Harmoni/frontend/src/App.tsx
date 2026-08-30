import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GitMerge, 
  Building, 
  RefreshCw, 
  Compass, 
  Activity, 
  Globe 
} from 'lucide-react';

import conflictsData from './data/multi_source_conflicts_queue.json';
import layersData from './data/geospatial_layers_registry.json';
import wardCasesData from './data/integrated_ward_conflation_cases.json';
import statsData from './data/samanvay3d_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'bn'>('en');
  const [conflicts, setConflicts] = useState(conflictsData);
  const [selectedConflict, setSelectedConflict] = useState(conflictsData[0]);
  const [layers, setLayers] = useState(layersData);
  const [wardCases, setWardCases] = useState(wardCasesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'conflicts' | 'layers' | 'conflation' | 'wards' | 'stats'>('conflicts');

  // Interactive AI Spatial Conflation Simulator
  const [isHarmonizing, setIsHarmonizing] = useState(false);
  const [harmResult, setHarmResult] = useState<any>({
    conflictResolved: "0.42m Boundary Shift Snapped to Sub-3cm Drone Ground Truth",
    algorithm: "Thin Plate Spline (TPS) + Hausdorff Polygon Boundary Conflation",
    confidence: "99.2% Spatial Conflation Confidence Approved",
    stakeholderSync: "State Revenue Dept Khasra & PMC Property Tax Layer Mutated",
    disputeMitigation: "Zero Inter-Departmental Boundary Dispute Recorded"
  });

  const handleHarmonize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHarmonizing(true);
    setTimeout(() => {
      setHarmResult({
        conflictResolved: "0.42m Boundary Shift Snapped to Sub-3cm Drone Ground Truth",
        algorithm: "Thin Plate Spline (TPS) + Hausdorff Polygon Boundary Conflation",
        confidence: "99.2% Spatial Conflation Confidence Approved",
        stakeholderSync: "State Revenue Dept Khasra & PMC Property Tax Layer Mutated",
        disputeMitigation: "Zero Inter-Departmental Boundary Dispute Recorded"
      });
      setIsHarmonizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR SAMANVAY3D 360 • SIH26013</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR Samanvay3D: Multi-Source Geospatial Data Harmonization Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) NAKSHA Programme Intelligent Spatial Conflation, Drone ORI &amp; Legacy Revenue Khasra Harmonization, Municipal GIS Integration &amp; Boundary Conflict Resolution
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'conflicts', label: '🔄 Conflict Resolution Queue', count: conflicts.length },
            { id: 'layers', label: '🗺️ Multi-Source Geospatial Layers', count: layers.length },
            { id: 'conflation', label: '⚡ AI Conflation Engine' },
            { id: 'wards', label: '🏢 Integrated Wards', count: wardCases.length },
            { id: 'stats', label: '📊 Samanvay3D Telemetry' }
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
            VIEW 1: CONFLICTS
           ========================================================================= */}
        {activeTab === 'conflicts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {conflicts.map((c) => (
                <button
                  key={c.conflict_id}
                  onClick={() => setSelectedConflict(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedConflict.conflict_id === c.conflict_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{c.conflict_id}</span>
                    <span className="text-amber-400">{c.spatial_shift_m}m Shift</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.conflict_type}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.ulpin}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.location.split(',')[0]}</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedConflict.conflict_id} • {selectedConflict.ulpin}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedConflict.conflict_type} ({selectedConflict.spatial_shift_m}m Discrepancy)</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedConflict.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">ROOT CAUSE &amp; AI CONFLATION ACTION:</span>
                  <div className="text-white font-sans text-xs">
                    Root Cause: <strong className="text-rose-400">{selectedConflict.root_cause}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    AI Harmonization Applied: {selectedConflict.ai_resolution_applied}
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Inter-Agency Stakeholders: {selectedConflict.inter_agency_stakeholders}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Location: {selectedConflict.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SPATIAL OFFSET RESOLVED</span><span className="text-emerald-400 font-bold">{selectedConflict.spatial_shift_m} Meters Snapped</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CADASTRE STANDARD</span><span className="text-cyan-400 font-bold">14-Digit ULPIN Aligned</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('layers')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Multi-Agency Geospatial Layers &amp; Formats ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Spatial Conflator</span>
                  </h4>
                  <form onSubmit={handleHarmonize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Discrepant Parcel Layer</label>
                      <input type="text" readOnly value={`${selectedConflict.conflict_id} (${selectedConflict.ulpin} • ${selectedConflict.spatial_shift_m}m Shift)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isHarmonizing} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isHarmonizing ? 'animate-spin' : ''}`} />
                      <span>{isHarmonizing ? 'Computing Thin Plate Spline (TPS) Conflation...' : 'Harmonize Multi-Agency Geospatial Offset'}</span>
                    </button>
                  </form>
                  {harmResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Shift Snapped: <strong className="text-emerald-400 font-mono text-xs">{harmResult.conflictResolved}</strong></div>
                      <div>Algorithm: <span className="text-cyan-300 text-xs">{harmResult.algorithm}</span></div>
                      <div>Confidence: <strong className="text-amber-300 font-mono text-xs">{harmResult.confidence}</strong></div>
                      <div>Agency Sync: <strong className="text-emerald-300 font-mono text-xs">{harmResult.stakeholderSync}</strong></div>
                      <div>Dispute Outcome: <strong className="text-white font-mono text-xs block mt-0.5">{harmResult.disputeMitigation}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LAYERS */}
        {tab === 'layers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {layers.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-bold">{l.agency}</span>
                  <span className="text-emerald-400 font-bold">{l.spatial_accuracy}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{l.layer_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Format: {l.format} | Sync Cadence: {l.update_frequency}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Interoperability: OGC WFS/WMS Certified</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CONFLATION */}
        {tab === 'conflation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <GitMerge className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Deep Learning Geospatial Conflation &amp; Coordinate Transformation</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated spatial matching algorithms fusing historical Khasra revenue maps, municipal property tax boundaries, and underground utility vectors onto sub-3cm drone orthophoto ground truth.
            </p>
          </div>
        )}

        {/* VIEW 4: WARDS */}
        {tab === 'wards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {wardCases.map((w, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{w.conflation_score_pct}% Match</span>
                <h4 className="font-bold text-sm text-white font-sans">{w.ward_name} ({w.city})</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Harmonized: {w.parcels_harmonized} Parcels | Resolved: {w.conflicts_resolved} Conflicts</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Property Tax Gain: +{w.tax_base_gain_pct}% Base Growth</div>
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
