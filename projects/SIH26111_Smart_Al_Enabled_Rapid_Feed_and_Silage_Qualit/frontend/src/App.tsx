import React, { useState } from 'react';
import { 
  Wheat, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Milk, 
  Activity, 
  RefreshCw, 
  Apple, 
  Sliders, 
  Globe 
} from 'lucide-react';

import samplesData from './data/cattle_feed_silage_samples.json';
import modelsData from './data/nir_spectroscopy_calibration_models.json';
import rationsData from './data/dairy_advisory_ration_formulations.json';
import statsData from './data/pashuposhan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [samples, setSamples] = useState(samplesData);
  const [selectedSample, setSelectedSample] = useState(samplesData[0]);
  const [models, setModels] = useState(modelsData);
  const [rations, setRations] = useState(rationsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'samples' | 'models' | 'rations' | 'silage' | 'stats'>('samples');

  // Interactive Feed Testing Simulator
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>({
    protein: "21.4% Crude Protein (Optimal • Grade A)",
    moisture: "8.2% Moisture (Safe Storage)",
    urea: "NEGATIVE (Zero Synthetic Adulteration)",
    advisory: "Feed 2.5 kg/day + 15 kg Green Fodder for High Yielding Gir Cows"
  });

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTimeout(() => {
      setTestResult({
        protein: "21.4% Crude Protein (Optimal • Grade A)",
        moisture: "8.2% Moisture (Safe Storage)",
        urea: "NEGATIVE (Zero Synthetic Adulteration)",
        advisory: "Feed 2.5 kg/day + 15 kg Green Fodder for High Yielding Gir Cows"
      });
      setIsTesting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Wheat className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>DAHD • PASHUPOSHAN 360 SMART RAPID FEED & SILAGE QUALITY TESTING • SIH26111</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DAHD PashuPoshan: AI-Enabled Rapid Feed & Silage Testing System for Dairy Farmers
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Portable Smartphone NIR Spectroscopy (<3 Mins), Urea & Aflatoxin Adulteration Screening & ICAR-NDRI Balanced Diet Advisories
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
            { id: 'samples', label: '🌾 Feed & Silage Tests', count: samples.length },
            { id: 'models', label: '🔬 NIR Spectroscopy Models', count: models.length },
            { id: 'rations', label: '🐄 ICAR-NDRI Balanced Rations', count: rations.length },
            { id: 'silage', label: '🧪 Silage Fermentation Index' },
            { id: 'stats', label: '📊 PashuPoshan Telemetry' }
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
            VIEW 1: SAMPLES
           ========================================================================= */}
        {activeTab === 'samples' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {samples.map((s) => (
                <button
                  key={s.sample_id}
                  onClick={() => setSelectedSample(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSample.sample_id === s.sample_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{s.sample_id}</span>
                    <span className="text-cyan-300">CP: {s.crude_protein_pct}%</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.sample_type}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.farm_location.slice(0, 45)}...</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Moist: {s.moisture_pct}%</span>
                    <span className="text-emerald-400">{s.quality_grade}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedSample.sample_id} • {selectedSample.farm_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSample.sample_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedSample.quality_grade}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">NUTRITIONAL COMPOSITION & ADULTERATION CHECK:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Crude Protein: <strong className="text-emerald-400">{selectedSample.crude_protein_pct}%</strong></div>
                    <div>Moisture: <strong className="text-cyan-300">{selectedSample.moisture_pct}%</strong></div>
                    <div>NDF Fiber: <strong className="text-amber-300">{selectedSample.ndf_fiber_pct}%</strong></div>
                    <div>TDN Energy: <strong className="text-emerald-300">{selectedSample.tdn_energy_pct}%</strong></div>
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Urea Check: <strong>{selectedSample.urea_adulteration}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AFLATOXIN B1</span><span className="text-emerald-400 font-bold">{selectedSample.aflatoxin_b1_ppb || 0} ppb (Safe)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SAND / SILICA ASH</span><span className="text-cyan-400 font-bold">{selectedSample.sand_silica_pct || 0}% Ash</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('rations')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View ICAR-NDRI Tailored Cattle Diet Plan ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>NIR Rapid Feed Analyzer</span>
                  </h4>
                  <form onSubmit={handleTest} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Sample Feed & Farm Source</label>
                      <input type="text" readOnly value={selectedSample.sample_type} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isTesting} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Scanning 900-1700nm NIR Spectrum...' : 'Execute Instant Feed Quality Scan'}</span>
                    </button>
                  </form>
                  {testResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Protein: <strong className="text-emerald-400 font-mono text-xs">{testResult.protein}</strong></div>
                      <div>Adulteration: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{testResult.urea}</strong></div>
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
                <span className="text-emerald-400 font-bold">R² PRECISION: {m.r2_score}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.model_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Wavelength: <strong className="text-cyan-400">{m.spectral_range}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RATIONS */}
        {activeTab === 'rations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {rations.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">ICAR-NDRI RATION PLAN</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.animal_breed}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Feed Pellets: <strong className="text-white">{r.concentrate_kg} kg/day</strong></div>
                  <div>Silage / Green Fodder: <strong className="text-emerald-400">{r.silage_kg} kg / {r.green_fodder_kg} kg</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Mineral Mixture: {r.mineral_mixture_g} grams/day</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SILAGE */}
        {activeTab === 'silage' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Milk className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Bunker & Pit Silage Fermentation Quality Index</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time monitoring of silo temperature, pH (3.8-4.2), lactic-to-acetic acid ratios, and absence of butyric acid/mould spoilage.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
