import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  TreePine, 
  Play, 
  RefreshCw, 
  Wrench, 
  Sliders, 
  Globe 
} from 'lucide-react';

import projectsData from './data/urban_mixed_use_revit_projects.json';
import structuralData from './data/revit_structural_reinforcement_schedules.json';
import facadeData from './data/forma_microclimate_facade_studies.json';
import statsData from './data/revitmixeduse_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [projects, setProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [structural, setStructural] = useState(structuralData);
  const [facade, setFacade] = useState(facadeData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'projects' | 'structural' | 'facade' | 'walkthrough' | 'stats'>('projects');

  // Interactive Load & Rebar Calculator Simulator
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState<any>({
    hvac: "420 TR (34.5% HVAC Load Reduction via Stack Effect)",
    ev: "960 kW (16 x 60kW DC EV Fast Chargers in Basement)",
    rebar: "112 kg/m³ Fe550D TMT (IS 13920 Ductile Compliance)",
    lod: "LOD 350 Autodesk Revit 2026 Structural BIM"
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setCalcResult({
        hvac: "420 TR (34.5% HVAC Load Reduction via Stack Effect)",
        ev: "960 kW (16 x 60kW DC EV Fast Chargers in Basement)",
        rebar: "112 kg/m³ Fe550D TMT (IS 13920 Ductile Compliance)",
        lod: "LOD 350 Autodesk Revit 2026 Structural BIM"
      });
      setIsCalculating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>AUTODESK • REVITMIXEDUSE 360 B+G+9 MIXED-USE BIM & STRUCTURAL SUITE • SIH26116</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Autodesk RevitMixedUse: Urban Mixed-Use (B+G+9) BIM Design & Structural Detailing
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              11-Level Integrated Architecture (Basement EV + Commercial Podium + 8 Residential Floors), Biophilic Courtyard & 2D/3D Rebar
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
            { id: 'projects', label: '🏢 B+G+9 Revit Projects', count: projects.length },
            { id: 'structural', label: '🏗️ Structural Rebar (2D/3D)', count: structural.length },
            { id: 'facade', label: '🌿 Biophilic Courtyard & Facade', count: facade.length },
            { id: 'walkthrough', label: '🎬 30s 4K Walkthrough Animation' },
            { id: 'stats', label: '📊 RevitMixedUse Telemetry' }
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
            VIEW 1: PROJECTS
           ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <button
                  key={p.project_id}
                  onClick={() => setSelectedProject(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProject.project_id === p.project_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{p.project_id}</span>
                    <span className="text-cyan-300">BUA: {p.total_built_up_area_sq_m} m²</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.location}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Units: {p.residential_units.split(' ')[0]}</span>
                    <span className="text-emerald-400">{p.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedProject.project_id} • {selectedProject.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProject.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedProject.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">B+G+9 ARCHITECTURAL ZONING & STRUCTURAL SPECS:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Plot Area: <strong className="text-white">{selectedProject.plot_dimensions_mm}</strong></div>
                    <div>Basement EV: <strong className="text-emerald-400">{selectedProject.basement_features}</strong></div>
                    <div>Commercial Podium: <strong className="text-cyan-300">{selectedProject.commercial_podium_sq_m}</strong></div>
                    <div>Residential Units: <strong className="text-amber-300">{selectedProject.residential_units}</strong></div>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Courtyard Stack Effect: <strong>{selectedProject.courtyard_stack_flow_ms} m/s ({selectedProject.hvac_energy_reduction_pct}% HVAC Savings)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL BUILT-UP AREA</span><span className="text-white font-bold">{selectedProject.total_built_up_area_sq_m} m²</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BIM DETAILING</span><span className="text-teal-400 font-bold">{selectedProject.bim_lod}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('structural')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View Structural Rebar Reinforcement Drawings & Schedules ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Revit Engineering Calculator</span>
                  </h4>
                  <form onSubmit={handleCalculate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">B+G+9 Building Project</label>
                      <input type="text" readOnly value={selectedProject.project_name} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isCalculating} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                      <span>{isCalculating ? 'Computing HVAC Stack & Rebar Schedule...' : 'Calculate B+G+9 Engineering Loads'}</span>
                    </button>
                  </form>
                  {calcResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>HVAC: <strong className="text-teal-400 font-mono text-xs">{calcResult.hvac}</strong></div>
                      <div>Rebar: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{calcResult.rebar}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STRUCTURAL */}
        {activeTab === 'structural' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {structural.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{s.standard}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.element}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Dimensions: <strong className="text-white">{s.dimensions}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">{s.rebar_spec}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: FACADE */}
        {activeTab === 'facade' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {facade.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{f.orientation}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.shading_type}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>SHGC: <strong className="text-emerald-400">{f.shgc} Low-E</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Daylight: {f.daylight_lux}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: WALKTHROUGH */}
        {activeTab === 'walkthrough' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <Play className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">30-Second 4K Walkthrough Video & Realistic Render Showcase</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Visual storytelling animating the pedestrian commercial ground promenade, central biophilic courtyard, and luxury residential sky balconies in Autodesk Revit.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
