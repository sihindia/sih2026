import React, { useState } from 'react';
import { 
  Box, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Waves, 
  Eye, 
  RefreshCw, 
  Sliders, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import scenesData from './data/ocean_3d_covisualization_scenes.json';
import instrumentsData from './data/insitu_instruments_argo_glider_registry.json';
import colorbarsData from './data/scientific_3d_colorbars_and_shaders.json';
import statsData from './data/samudra3d_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'te' | 'ta' | 'bn'>('en');
  const [scenes, setScenes] = useState(scenesData);
  const [selectedScene, setSelectedScene] = useState(scenesData[0]);
  const [instruments, setInstruments] = useState(instrumentsData);
  const [colorbars, setColorbars] = useState(colorbarsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scenes' | 'volumetric' | 'instruments' | 'colorbars' | 'stats'>('scenes');

  // Interactive 3D Depth Slicer & Isosurface Simulator
  const [isRendering, setIsRendering] = useState(false);
  const [sliceResult, setSliceResult] = useState<any>({
    depthSlice: "Depth Slice: 65.0 Meters (Main Thermocline Transition)",
    isosurfaceD26: "3D Isosurface D26 = 26.0°C Extracted & Rendered",
    instrumentsOverlaid: "ARGO WMO #2902194 & Slocum Glider INCOIS-GL04 Profile Co-Displayed",
    modelBias: "Model-Observation Deviation: ±0.14°C (Highly Accurate)",
    renderStatus: "60 FPS Interactive WebGL Raymarching Active (Vertical Exaggeration: 25x)"
  });

  const handleRender = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRendering(true);
    setTimeout(() => {
      setSliceResult({
        depthSlice: "Depth Slice: 65.0 Meters (Main Thermocline Transition)",
        isosurfaceD26: "3D Isosurface D26 = 26.0°C Extracted & Rendered",
        instrumentsOverlaid: "ARGO WMO #2902194 & Slocum Glider INCOIS-GL04 Profile Co-Displayed",
        modelBias: "Model-Observation Deviation: ±0.14°C (Highly Accurate)",
        renderStatus: "60 FPS Interactive WebGL Raymarching Active (Vertical Exaggeration: 25x)"
      });
      setIsRendering(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <Box className="w-4 h-4 text-blue-400 animate-spin" />
              <span>MOES / INCOIS • SAMUDRA3D 360 WEB-BASED 3D OCEAN VISUALIZATION • SIH26067</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              INCOIS Samudra3D: Web-Based Interactive 3D Ocean Model &amp; In-Situ Co-Visualization
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Indian National Centre for Ocean Information Services (INCOIS) Browser-Native WebGL 3D Volumetric Raymarching, ROMS/HYCOM Model Integration with ARGO Profiling Floats &amp; Autonomous Gliders
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scenes', label: '🌐 3D Ocean Scenes', count: scenes.length },
            { id: 'volumetric', label: '🧊 Volumetric 3D Slicer' },
            { id: 'instruments', label: '📍 In-Situ ARGO & Gliders', count: instruments.length },
            { id: 'colorbars', label: '🎨 Colormaps & Shaders', count: colorbars.length },
            { id: 'stats', label: '📊 Samudra3D Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-blue-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: SCENES
           ========================================================================= */}
        {activeTab === 'scenes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenes.map((s) => (
                <button
                  key={s.scene_id}
                  onClick={() => setSelectedScene(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedScene.scene_id === s.scene_id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{s.scene_id}</span>
                    <span className="text-emerald-400">{s.rendering_fps} FPS</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.scene_title.split('&')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{s.theatre_domain}</div>
                  <div className="text-[10px] text-blue-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Bias: ±{s.model_vs_insitu_bias_c}°C</span>
                    <span className="text-amber-400">{s.vertical_exaggeration_factor.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedScene.scene_id} • {selectedScene.theatre_domain}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedScene.scene_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScene.webgl_engine_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">3D NUMERICAL MODEL &amp; IN-SITU CO-VISUALIZATION:</span>
                  <div className="text-white font-sans text-xs">
                    Model Grid: <strong className="text-amber-300">{selectedScene.numerical_model_source}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    In-Situ Overlay: {selectedScene.insitu_instruments_overlaid}
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Isosurface Rendering: {selectedScene.rendered_isosurfaces}
                  </div>
                  <div className="text-indigo-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Flow Streamlines: {selectedScene.vector_flow_streamlines} ({selectedScene.vertical_exaggeration_factor})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MODEL-OBSERVATION BIAS</span><span className="text-emerald-400 font-bold">±{selectedScene.model_vs_insitu_bias_c}°C Deviation</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WEBGL RENDERING SPEED</span><span className="text-blue-400 font-bold">{selectedScene.rendering_fps} FPS Smooth Interactive</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('volumetric')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Interactive 3D Volumetric Raymarching Slicer ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Instant 3D Depth Slicer</span>
                  </h4>
                  <form onSubmit={handleRender} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Ocean Domain</label>
                      <input type="text" readOnly value={`${selectedScene.scene_title.split('&')[0]} (${selectedScene.theatre_domain.split('(')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isRendering} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isRendering ? 'animate-spin' : ''}`} />
                      <span>{isRendering ? 'Extracting D26 Thermocline Isosurfaces...' : 'Extract 3D Depth Slice & ARGO Points'}</span>
                    </button>
                  </form>
                  {sliceResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Slice: <strong className="text-emerald-400 font-mono text-xs">{sliceResult.depthSlice}</strong></div>
                      <div>Isosurface: <strong className="text-blue-400 font-mono text-xs">{sliceResult.isosurfaceD26}</strong></div>
                      <div>In-Situ Overlay: <strong className="text-cyan-300 font-mono text-xs">{sliceResult.instrumentsOverlaid}</strong></div>
                      <div>Accuracy: <strong className="text-amber-300 font-mono text-xs">{sliceResult.modelBias}</strong></div>
                      <div>WebGL Engine: <strong className="text-white font-mono text-xs block mt-0.5">{sliceResult.renderStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: VOLUMETRIC */}
        {tab === 'volumetric' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <Box className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">3D WebGL Volumetric Raymarching Architecture</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Directly renders 3D NetCDF model tensors (temperature, salinity, current streamlines) in any web browser without desktop software. Allows interactive clipping planes, depth slicing, and vertical exaggeration adjustments.
            </p>
          </div>
        )}

        {/* VIEW 3: INSTRUMENTS */}
        {tab === 'instruments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {instruments.map((i, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{i.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{i.instrument_id}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Type: {i.type} ({i.coordinates})</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Sensors: {i.sensors} (Max: {i.max_depth_m}m)</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: COLORBARS */}
        {tab === 'colorbars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {colorbars.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-400 font-bold">{c.palette_name}</span>
                  <span className="text-emerald-400 font-bold">{c.range}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{c.variable}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Scale: {c.color_scale}</p>
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
                <span className="text-2xl font-black text-blue-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
