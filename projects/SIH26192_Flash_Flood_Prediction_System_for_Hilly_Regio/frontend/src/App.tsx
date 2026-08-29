import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Droplets, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Volume2, 
  Sliders, 
  RefreshCw, 
  Truck, 
  Building2, 
  ShieldCheck, 
  Navigation, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Flame, 
  Globe 
} from 'lucide-react';

import basinsData from './data/hilly_river_basins.json';
import telemetryData from './data/iot_telemetry.json';
import alertsData from './data/village_alerts.json';
import reliefData from './data/relief_camps.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ph' | 'ml'>('hi');
  const [basins, setBasins] = useState(basinsData);
  const [selectedBasin, setSelectedBasin] = useState(basinsData[0]);
  const [telemetry, setTelemetry] = useState(telemetryData);
  const [alerts, setAlerts] = useState(alertsData);
  const [reliefCamps, setReliefCamps] = useState(reliefData);
  const [activeTab, setActiveTab] = useState<'basins' | 'predictor' | 'alerts' | 'relief' | 'command'>('basins');

  // Hydrodynamic Simulator State
  const [rainRate, setRainRate] = useState(88.5);
  const [soilSat, setSoilSat] = useState(96.2);
  const [slopeDeg, setSlopeDeg] = useState(36.5);
  const [isPredicting, setIsPredicting] = useState(false);
  const [simResult, setSimResult] = useState<any>({
    peakDischarge: 1480.0,
    stageRise: 4.6,
    leadTime: 55,
    isCritical: true,
    verdict: "RED_ALERT_FLASH_FLOOD_IMMINENT"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      const satFactor = 1.0 + (soilSat / 100.0) * 0.6;
      const peak = Math.round((0.85 * rainRate * 1450.0 * 0.278 / 10.0) * satFactor);
      const lead = Math.max(25, Math.round(120 - (slopeDeg * 1.6) - (rainRate * 0.3)));
      const isCrit = peak > 800.0 || rainRate > 65.0;

      setSimResult({
        peakDischarge: peak,
        stageRise: (peak / 320.0).toFixed(2),
        leadTime: lead,
        isCritical: isCrit,
        verdict: isCrit ? "RED_ALERT_FLASH_FLOOD_IMMINENT" : "YELLOW_WATCH"
      });
      setIsPredicting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Droplets className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>MHA • NDRF • JALPRAVAH 360 FLASH FLOOD EARLY WARNING GRID • SIH26192</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              JalPravah 360: Hyper-Local Flash Flood & Surge Predictor for Hilly Terrains
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Multi-Source Radar Precipitation, Soil Pore Saturation, Hydrodynamic Runoff & Village Siren Broadcasts
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ph')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ph' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>पहाड़ी</button>
            <button onClick={() => setLang('ml')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ml' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>മലയാളം</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'basins', label: '🌊 Catchment Basins & Telemetry', count: basins.length },
            { id: 'predictor', label: '⚡ AI Hydrodynamic Surge Predictor' },
            { id: 'alerts', label: '📢 Village CAP Siren Alerts', count: alerts.length },
            { id: 'relief', label: '🏕️ Safe High-Ground Relief Grid', count: reliefCamps.length },
            { id: 'command', label: '📊 National NDRF Hilly Command' }
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
            VIEW 1: CATCHMENT BASINS & TELEMETRY
           ========================================================================= */}
        {activeTab === 'basins' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {basins.map((b) => (
                <button
                  key={b.basin_id}
                  onClick={() => setSelectedBasin(b)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedBasin.basin_id === b.basin_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{b.basin_id}</span>
                    <span className="text-rose-400">{b.lead_time_minutes}m Lead Time</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? b.name_hi : lang === 'ph' ? b.name_pahari : b.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{b.state}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{b.current_rainfall_intensity_mm_h} mm/h</span>
                    <span>Stage: {b.current_stream_stage_m}m</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Basin Hydro-Meteorological Monitor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Basin Telemetry */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400">{selectedBasin.basin_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedBasin.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedBasin.state} • Slope: {selectedBasin.average_slope_deg}°</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedBasin.alert_level.split('_')[0]} ALERT
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">RADAR PRECIPITATION</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedBasin.current_rainfall_intensity_mm_h} mm/h</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">SOIL SATURATION</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">{selectedBasin.soil_moisture_saturation_pct}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">RIVER STAGE HEIGHT</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">{selectedBasin.current_stream_stage_m}m</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs text-slate-300">
                  <div>Overtopping Status: <strong className="text-rose-400">{selectedBasin.stage_status}</strong></div>
                  <div>Simulated Peak Discharge: <strong className="text-white">{selectedBasin.peak_discharge_cumecs} cumecs</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('predictor')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch AI Hydrodynamic Surge Predictor ➔</span>
                </button>
              </div>

              {/* Right 5: Live IoT Sensor Feeds */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400" />
                      <span>Live IoT Sensor Grid</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      LIVE WEBRTC
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {telemetry.map((t) => (
                      <div key={t.sensor_id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400 font-bold">{t.sensor_id}</span>
                          <span className="text-rose-300 font-bold text-[10px]">{t.status.split('_')[0]}</span>
                        </div>
                        <div className="text-white font-sans">{t.type}</div>
                        <div className="text-emerald-400 text-[11px] font-bold">{t.live_reading}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: AI HYDRODYNAMIC SURGE PREDICTOR
           ========================================================================= */}
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Hydrodynamic Simulator Controls */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Hydrodynamic Runoff Simulation Engine</span>
                </h4>

                <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Radar Rain Intensity (mm/hr)</label>
                    <input type="number" step="1" required value={rainRate} onChange={(e) => setRainRate(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Soil Moisture Saturation (% Saturation)</label>
                    <input type="number" step="0.5" required value={soilSat} onChange={(e) => setSoilSat(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Catchment Slope Gradient (Degrees)</label>
                    <input type="number" step="0.5" required value={slopeDeg} onChange={(e) => setSlopeDeg(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                  </div>

                  <button type="submit" disabled={isPredicting} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                    <span>{isPredicting ? 'Executing Kinematic Wave Model...' : 'Simulate Flash Flood Surge & Lead Time'}</span>
                  </button>
                </form>
              </div>

              {/* Right 6: Surge Output Verdict */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Predicted Surge Hydrograph & Lead Time</span>
                </h4>

                {simResult && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-rose-400 font-bold text-sm font-sans flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{simResult.verdict}</span>
                      </span>
                      <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold">{simResult.leadTime} Mins Lead Time</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center pt-1">
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">PEAK DISCHARGE</span>
                        <span className="text-xl font-black text-white">{simResult.peakDischarge} cumecs</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">STAGE RISE</span>
                        <span className="text-xl font-black text-cyan-400">+{simResult.stageRise}m Surge</span>
                      </div>
                    </div>

                    <button onClick={() => setActiveTab('alerts')} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md">
                      Broadcast Emergency CAP Sirens ➔
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: VILLAGE CAP SIREN ALERTS
           ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {alerts.map((a) => (
                <div key={a.alert_id} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{a.alert_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{a.target_village}</h4>
                      <p className="text-slate-400 text-[11px]">{a.district}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                      {a.lead_time_to_impact} Lead
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>Hazard:</strong> {a.hazard}</div>
                    <div><strong>Channels:</strong> <span className="text-cyan-300">{a.broadcast_channels.join(', ')}</span></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900"><strong>Action:</strong> {a.action_instruction}</div>
                  </div>

                  <button onClick={() => alert(`CAP Emergency Sirens Broadcast to: ${a.target_village}`)} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Trigger CAP Siren Broadcast ➔</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SAFE HIGH-GROUND RELIEF GRID
           ========================================================================= */}
        {activeTab === 'relief' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {reliefCamps.map((camp) => (
                <div key={camp.camp_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-cyan-400 font-bold text-[10px]">{camp.camp_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{camp.camp_name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {camp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ELEVATION</span><span className="text-cyan-400 font-bold">+{camp.elevation_above_river_m}m</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CAPACITY</span><span className="text-white font-bold">{camp.capacity_people}</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RATIONS</span><span className="text-emerald-400 font-bold">{camp.stocked_rations_days} Days</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: NATIONAL NDRF HILLY COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">NATIONAL FLASH FLOOD EARLY WARNING HUB</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">High-Altitude Catchment Telemetry Network</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">MONITORED HILLY BASINS</span><span className="text-2xl font-black text-cyan-400 mt-1 block">42 Catchments</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">AVG EVACUATION LEAD TIME</span><span className="text-2xl font-black text-emerald-400 mt-1 block">58 Mins</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950"><span className="text-slate-500 block text-[9px]">CAP CONNECTED SIRENS</span><span className="text-2xl font-black text-purple-400 mt-1 block">180 Towers</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
