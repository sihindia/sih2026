import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Clock, 
  RefreshCw, 
  Plane, 
  ShieldAlert, 
  CloudRain, 
  Globe 
} from 'lucide-react';

import casesData from './data/convective_nowcast_storm_cases.json';
import streamsData from './data/multisensor_fusion_data_streams.json';
import trackingData from './data/storm_cell_tracking_parameters.json';
import statsData from './data/mesonowcast_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [streams, setStreams] = useState(streamsData);
  const [tracking, setTracking] = useState(trackingData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'streams' | 'hazards' | 'aviation' | 'stats'>('cases');

  // Interactive Convective Storm Simulator
  const [isNowcasting, setIsNowcasting] = useState(false);
  const [nowcastResult, setNowcastResult] = useState<any>({
    leadCountdown: "150 Minutes (2.5 Hours Lead)",
    hailPrediction: "94.2% Probability (3.5 - 5.0 cm Giant Hail)",
    downburstGust: "104 km/h Severe Microburst",
    cloudburstStatus: "EXCEEDED (120 mm/h Instantaneous Rain Core)",
    aviationGuidance: "TAF MICROBURST WARNING: Divert 6 inbound flights; ground apron equipment immediately"
  });

  const handleNowcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNowcasting(true);
    setTimeout(() => {
      setNowcastResult({
        leadCountdown: "150 Minutes (2.5 Hours Lead)",
        hailPrediction: "94.2% Probability (3.5 - 5.0 cm Giant Hail)",
        downburstGust: "104 km/h Severe Microburst",
        cloudburstStatus: "EXCEEDED (120 mm/h Instantaneous Rain Core)",
        aviationGuidance: "TAF MICROBURST WARNING: Divert 6 inbound flights; ground apron equipment immediately"
      });
      setIsNowcasting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-yellow-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-bold tracking-wider">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>NCMRWF • MESONOWCAST 360 CONVECTIVE SCALE SEVERE WEATHER NOWCASTING • SIH26084</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF MesoNowcast: Convective Scale Nowcasting for Thunderstorms, Hail & Cloudbursts (0–6 hr)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Multi-Source Heterogeneous Data Fusion (Doppler Weather Radar, INSAT-3DR Satellite & Lightning Detection Networks) at 1–3 km Hyper-Local Resolution
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-yellow-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-yellow-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-yellow-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-yellow-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-yellow-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⚡ Convective Nowcasts', count: cases.length },
            { id: 'streams', label: '📡 Multi-Sensor Streams', count: streams.length },
            { id: 'hazards', label: '🌪️ Hail & Downburst Hazards', count: tracking.length },
            { id: 'aviation', label: '✈️ Aviation & Agritech Alerts' },
            { id: 'stats', label: '📊 MesoNowcast Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-yellow-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-yellow-950/60 border-yellow-500 text-white shadow-lg ring-2 ring-yellow-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-yellow-400">{c.case_id}</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{c.lead_time_hours}</span>
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.target_corridor}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.hazard_phenomena}</div>
                  <div className="text-[10px] text-yellow-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Hail: {c.hail_probability_pct}% | Gust: {c.downburst_wind_kmh}km/h</span>
                    <span className="text-rose-400">ALERT</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-yellow-400 font-bold">{selectedCase.case_id} • {selectedCase.target_corridor}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.hazard_phenomena}</h3>
                  </div>
                  <span className="px-3 py-1 bg-yellow-950 text-yellow-300 border border-yellow-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.lead_time_hours} Countdown
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-yellow-400 block text-[9px] font-bold uppercase">MULTI-SOURCE RADAR, SATELLITE & LIGHTNING SIGNALS:</span>
                  <div className="text-white font-sans text-xs">
                    DWR Reflectivity: <strong className="text-rose-400">{selectedCase.dwr_reflectivity_dbz} dBZ</strong> | CTT Glaciation: <strong className="text-cyan-300">{selectedCase.satellite_ctt_drop}</strong>
                  </div>
                  <div className="text-yellow-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Lightning Jump Rate: <strong>{selectedCase.lightning_jump_rate}</strong> | Hail: <strong>{selectedCase.hail_probability_pct}% ({selectedCase.hail_size_cm})</strong>
                  </div>
                  <div className="text-rose-400 font-sans text-[11px]">
                    Downburst Gust: <strong>{selectedCase.downburst_wind_kmh} km/h</strong> | Cloudburst: <strong>{selectedCase.cloudburst_risk}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Intervention Action: {selectedCase.sector_impact_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">HAIL PROBABILITY</span><span className="text-yellow-400 font-bold">{selectedCase.hail_probability_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PEAK DOWNBURST GUST</span><span className="text-rose-400 font-bold">{selectedCase.downburst_wind_kmh} km/h</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('streams')}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Doppler Radar, INSAT-3DR & Lightning Ingestion Streams ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span>Convective Cell Nowcast Engine</span>
                  </h4>
                  <form onSubmit={handleNowcast} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Corridor & Radar Core</label>
                      <input type="text" readOnly value={`${selectedCase.target_corridor} (${selectedCase.dwr_reflectivity_dbz} dBZ)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-yellow-400" />
                    </div>
                    <button type="submit" disabled={isNowcasting} className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isNowcasting ? 'animate-spin' : ''}`} />
                      <span>{isNowcasting ? 'Fusing Radar & Lightning Vectors...' : 'Compute Storm Nowcast'}</span>
                    </button>
                  </form>
                  {nowcastResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Countdown: <strong className="text-yellow-400 font-mono text-xs">{nowcastResult.leadCountdown}</strong></div>
                      <div>Hail Risk: <strong className="text-amber-300 font-mono text-xs">{nowcastResult.hailPrediction}</strong></div>
                      <div>Aviation Action: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{nowcastResult.aviationGuidance}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STREAMS */}
        {tab === 'streams' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {streams.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-yellow-400 font-bold">{s.refresh_rate}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.stream_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="text-cyan-300 text-xs font-mono">{s.parameters}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: HAZARDS */}
        {tab === 'hazards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {tracking.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">HAZARD #{idx + 1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.hazard}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{t.physical_basis}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: AVIATION */}
        {tab === 'aviation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-yellow-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-950 border border-yellow-500 flex items-center justify-center text-yellow-400">
              <Plane className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Aviation Wind Shear & Agritech Hail Early Warning System</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automates sub-hourly Terminal Aerodrome Forecasts (TAF) with microburst runway alerts for air traffic controllers while pushing real-time anti-hail net deployment alerts to commercial orchards and horticulture farmers.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-yellow-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
