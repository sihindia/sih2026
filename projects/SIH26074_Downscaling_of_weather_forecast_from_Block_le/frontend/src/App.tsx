import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sun, 
  Wind, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/panchayat_weather_downscaling_cases.json';
import featData from './data/super_resolution_downscaling_features.json';
import cropData from './data/crop_specific_agrometeorological_advisories.json';
import statsData from './data/krishimausam_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [features, setFeatures] = useState(featData);
  const [advisories, setAdvisories] = useState(cropData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'features' | 'advisories' | 'map' | 'stats'>('cases');

  // Interactive 1km Super-Resolution Downscaler Simulator
  const [isDownscaling, setIsDownscaling] = useState(false);
  const [downscaleResult, setDownscaleResult] = useState<any>({
    microclimate: "Temp: 44.8°C | RH: 8.0% | Wind: 38 km/h Loo | ET: 8.4 mm/day",
    advisory: "URGENT: Initiate 4-hour early morning drip irrigation before 07:00 IST. Strictly postpone spraying.",
    crop: "Mustard (Pod Development Stage)",
    confidence: "96.8% Downscaling Precision (Physics-Guided SRGAN)"
  });

  const handleDownscale = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownscaling(true);
    setTimeout(() => {
      setDownscaleResult({
        microclimate: "Temp: 44.8°C | RH: 8.0% | Wind: 38 km/h Loo | ET: 8.4 mm/day",
        advisory: "URGENT: Initiate 4-hour early morning drip irrigation before 07:00 IST. Strictly postpone spraying.",
        crop: "Mustard (Pod Development Stage)",
        confidence: "96.8% Downscaling Precision (Physics-Guided SRGAN)"
      });
      setIsDownscaling(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Sprout className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>IMD • KRISHIMAUSAM 360 PANCHAYAT WEATHER DOWNSCALING & AGRO-ADVISORY • SIH26074</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD KrishiMausam: AI Weather Downscaling (Block to Panchayat) & Agro-Advisories
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              12km to 1km Physics-Guided SRGAN Super-Resolution, DEM Terrain & NDVI Microclimate Calibration with Crop-Specific Farming Bulletins
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🌾 Downscaling Cases', count: cases.length },
            { id: 'features', label: '⛰️ SRGAN Terrain Layers', count: features.length },
            { id: 'advisories', label: '🚜 Crop Agro-Advisories', count: advisories.length },
            { id: 'map', label: '🗺️ Panchayat Microclimate Map' },
            { id: 'stats', label: '📊 KrishiMausam Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.panchayat_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.panchayat_id === c.panchayat_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{c.panchayat_id}</span>
                    <span className="text-cyan-300">1km Grid ({c.downscaling_confidence_pct}%)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.panchayat_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Crop: {c.crop_targeted.slice(0, 30)}...</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.coarse_block_forecast_12km.split('|')[0]}</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCase.panchayat_id} • {selectedCase.panchayat_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.crop_targeted}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">COARSE 12KM BLOCK VS DOWNSCALED 1KM PANCHAYAT:</span>
                  <div className="text-slate-400 font-sans text-xs">Coarse 12km: {selectedCase.coarse_block_forecast_12km}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900 font-bold">
                    AI 1km Downscaled: {selectedCase.ai_downscaled_panchayat_1km}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Agro-Advisory: <strong>{selectedCase.hyperlocal_agro_advisory}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DOWNSCALING PRECISION</span><span className="text-emerald-400 font-bold">{selectedCase.downscaling_confidence_pct}% SRGAN Accuracy</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SPATIAL RESOLUTION</span><span className="text-cyan-400 font-bold">12km ➔ 1km Grid</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('features')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine SRGAN Physics-Guided Terrain & NDVI Layers ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Panchayat Super-Resolution Engine</span>
                  </h4>
                  <form onSubmit={handleDownscale} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Gram Panchayat Location</label>
                      <input type="text" readOnly value={`${selectedCase.panchayat_id} (${selectedCase.panchayat_name.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isDownscaling} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDownscaling ? 'animate-spin' : ''}`} />
                      <span>{isDownscaling ? 'Downscaling 12km to 1km Microclimate...' : 'Generate 1km Agro-Advisory'}</span>
                    </button>
                  </form>
                  {downscaleResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>1km Weather: <strong className="text-cyan-300 font-mono text-xs">{downscaleResult.microclimate}</strong></div>
                      <div>Advisory: <strong className="text-amber-300 font-mono text-xs block mt-0.5">{downscaleResult.advisory}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FEATURES */}
        {tab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {features.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{f.resolution}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.feature_layer}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{f.influence}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ADVISORIES */}
        {tab === 'advisories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {advisories.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{a.stage}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.crop}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Factor: <strong className="text-rose-400">{a.critical_weather_factor}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Action: {a.action_rule}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MAP */}
        {tab === 'map' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Gram Panchayat Microclimate & Farming Advisory GIS Map</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Visualizes 1km downscaled temperature, relative humidity, dry loo winds, and localized rainfall gradients across 255,000+ Gram Panchayats with vernacular SMS/WhatsApp audio delivery.
            </p>
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
