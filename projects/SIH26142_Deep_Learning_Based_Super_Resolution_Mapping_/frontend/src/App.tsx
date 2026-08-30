import React, { useState } from 'react';
import { 
  Satellite, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Maximize2, 
  Cpu, 
  RefreshCw, 
  Eye, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import scenesData from './data/satellite_super_resolution_scenes.json';
import modelsData from './data/deep_learning_srm_models.json';
import metricsData from './data/spectral_consistency_metrics.json';
import statsData from './data/ntro_srm_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [scenes, setScenes] = useState(scenesData);
  const [selectedScene, setSelectedScene] = useState(scenesData[0]);
  const [models, setModels] = useState(modelsData);
  const [metrics, setMetrics] = useState(metricsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scenes' | 'models' | 'spectral' | 'assets' | 'stats'>('scenes');

  // Interactive Deep Learning SRM Inference Simulator
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceResult, setEnhanceResult] = useState<any>({
    resolution: "2.5 Meters / Pixel (4x Spatial Enhancement)",
    psnr: "35.42 dB (0.942 SSIM)",
    sam: "1.84° Spectral Angle Mapper",
    assets: "14 Aircraft Shelters + 3,200m Runway Centerline",
    confidence: "98.6% Epistemic Certainty"
  });

  const handleEnhance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnhancing(true);
    setTimeout(() => {
      setEnhanceResult({
        resolution: "2.5 Meters / Pixel (4x Spatial Enhancement)",
        psnr: "35.42 dB (0.942 SSIM)",
        sam: "1.84° Spectral Angle Mapper",
        assets: "14 Aircraft Shelters + 3,200m Runway Centerline",
        confidence: "98.6% Epistemic Certainty"
      });
      setIsEnhancing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-sky-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold tracking-wider">
              <Satellite className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>NTRO • SUPERSAT 360 GENERATIVE SUPER-RESOLUTION MAPPING • SIH26142</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO SuperSat: Deep Learning Super-Resolution Mapping from Satellite Imagery
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              10m Sentinel-2 to &lt;2.5m Sub-Pixel Synthesis (Swin2SR Transformers), SAM Spectral Preservation & Strategic Asset Extraction
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-sky-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scenes', label: '🛰️ Strategic Satellite Scenes', count: scenes.length },
            { id: 'models', label: '🧠 Generative SRM Models', count: models.length },
            { id: 'spectral', label: '🌈 Spectral Consistency (SAM)', count: metrics.length },
            { id: 'assets', label: '🎯 Sub-Pixel Asset Extraction' },
            { id: 'stats', label: '📊 NTRO SuperSat Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-sky-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenes.map((s) => (
                <button
                  key={s.scene_id}
                  onClick={() => setSelectedScene(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedScene.scene_id === s.scene_id
                      ? 'bg-sky-950/60 border-sky-500 text-white shadow-lg ring-2 ring-sky-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-sky-400">{s.scene_id}</span>
                    <span className="text-emerald-400">{s.magnification_factor}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.location_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.coordinates} • {s.input_sensor}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Model: {s.generative_model}</span>
                    <span className="text-emerald-400">PSNR: {s.psnr_db} dB</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-sky-400 font-bold">{selectedScene.scene_id} • {selectedScene.coordinates}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedScene.location_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScene.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-sky-400 block text-[9px] font-bold uppercase">SUB-PIXEL TACTICAL ASSETS EXTRACTED:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedScene.assets_resolved.join(' • ')}</div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    PSNR: <strong>{selectedScene.psnr_db} dB</strong> • SSIM: <strong>{selectedScene.ssim_score}</strong> • SAM: <strong>{selectedScene.spectral_angle_mapper_deg}°</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">INPUT RESOLUTION</span><span className="text-rose-400 font-bold">10 Meters (Sentinel-2)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ENHANCED SRM OUTPUT</span><span className="text-emerald-400 font-bold">{selectedScene.output_resolution} ({selectedScene.magnification_factor})</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('models')}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Swin2SR Vision Transformer Architecture ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Deep SRM Inference</span>
                  </h4>
                  <form onSubmit={handleEnhance} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Satellite Tile & Target Area</label>
                      <input type="text" readOnly value={`${selectedScene.location_name} (${selectedScene.input_sensor})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-sky-400" />
                    </div>
                    <button type="submit" disabled={isEnhancing} className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEnhancing ? 'animate-spin' : ''}`} />
                      <span>{isEnhancing ? 'Synthesizing Sub-Pixel Details...' : 'Super-Resolve 10m ➔ 2.5m'}</span>
                    </button>
                  </form>
                  {enhanceResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Resolution: <strong className="text-emerald-400 font-mono text-xs">{enhanceResult.resolution}</strong></div>
                      <div>Assets: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{enhanceResult.assets}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MODELS */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold">{m.model_name}</span>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Parameters: <strong className="text-white">{m.params_m} M</strong></div>
                  <div>Inference Speed: <strong className="text-emerald-400">{m.inference_fps} FPS</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">{m.strengths}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SPECTRAL */}
        {activeTab === 'spectral' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-sky-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-sky-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-sky-400 font-bold text-[10px] uppercase">RADIOMETRIC & SPECTRAL INTEGRITY VALIDATOR</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Spectral Angle Mapper (SAM) & ERGAS Consistency</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Zero Radiometric Drift</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {metrics.map((met, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-sky-400 font-bold block">{met.metric}</span>
                    <div className="text-slate-400">Target: {met.target}</div>
                    <div className="text-emerald-400 font-bold text-xs pt-1 border-t border-slate-900">Achieved: {met.achieved}</div>
                  </div>
                ))}
              </div>
              <div className="text-sky-400 font-bold pt-2 border-t border-slate-900">
                Maintains accurate Normalized Difference Vegetation Index (NDVI) and Normalized Difference Water Index (NDWI) values across multi-spectral bands.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ASSETS */}
        {activeTab === 'assets' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-sky-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-950 border border-sky-500 flex items-center justify-center text-sky-400">
              <Eye className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Tactical Feature & Building Footprint Vectorization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Extracts narrow unpaved tactical tracks, runway centerlines, aircraft revetments, and naval drydocks directly from 2.5m synthesized sub-pixel rasters.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-sky-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
