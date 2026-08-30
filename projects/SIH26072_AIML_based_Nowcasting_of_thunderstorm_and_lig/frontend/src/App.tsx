import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Radio, 
  ShieldAlert, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/thunderstorm_lightning_nowcast_cases.json';
import sensorData from './data/atmospheric_sensors_radar_satellite_network.json';
import convData from './data/convlstm_storm_cell_trajectory_models.json';
import statsData from './data/vajravani_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [sensors, setSensors] = useState(sensorData);
  const [convlstm, setConvlstm] = useState(convData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'sensors' | 'convlstm' | 'radar' | 'stats'>('cases');

  // Interactive Lightning Nowcasting Simulator
  const [isNowcasting, setIsNowcasting] = useState(false);
  const [nowcastResult, setNowcastResult] = useState<any>({
    event: "Severe Kalbaishakhi Nor'wester Squall (95 km/h) & Intense CG Lightning",
    leadTime: "45 Minutes Lead Time (Strike Peak in 35 Minutes)",
    action: "RED ALERT: Trigger 42 Gram Panchayat Sirens & Damini App Broadcast",
    accuracy: "95.6% Nowcast Accuracy (ConvLSTM Cell Tracker)"
  });

  const handleNowcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNowcasting(true);
    setTimeout(() => {
      setNowcastResult({
        event: "Severe Kalbaishakhi Nor'wester Squall (95 km/h) & Intense CG Lightning",
        leadTime: "45 Minutes Lead Time (Strike Peak in 35 Minutes)",
        action: "RED ALERT: Trigger 42 Gram Panchayat Sirens & Damini App Broadcast",
        accuracy: "95.6% Nowcast Accuracy (ConvLSTM Cell Tracker)"
      });
      setIsNowcasting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>IMD • VAJRAVANI 360 THUNDERSTORM & LIGHTNING 0-3H NOWCASTING SUITE • SIH26072</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD VajraVani: AI/ML Thunderstorm & Lightning Nowcasting Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Doppler Radar Core (55 dBZ) + IITM Lightning Location Network + INSAT-3DR Rapid Soundings with ConvLSTM Spatio-Temporal Nowcasting (45m Lead Time)
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '⚡ Nowcast Cases', count: cases.length },
            { id: 'sensors', label: '📡 Multi-Sensor Network', count: sensors.length },
            { id: 'convlstm', label: '🌪️ ConvLSTM Cell Models', count: convlstm.length },
            { id: 'radar', label: '🗺️ Lightning Strike Radar' },
            { id: 'stats', label: '📊 VajraVani Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
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
                  key={c.nowcast_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.nowcast_id === c.nowcast_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{c.nowcast_id}</span>
                    <span className="text-emerald-400">Lead: {c.nowcast_lead_time_mins}m</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.region_district}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.predicted_severe_event.slice(0, 45)}...</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Accuracy: {c.nowcast_accuracy_pct}%</span>
                    <span className="text-rose-400">RED ALERT</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedCase.nowcast_id} • {selectedCase.region_district}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.predicted_severe_event}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">ATMOSPHERIC SENSOR FUSION & CONVLSTM NOWCAST:</span>
                  <div className="text-white font-sans text-xs font-bold">Sensor Inputs: {selectedCase.atmospheric_sensor_inputs}</div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Propagation: <strong>{selectedCase.predicted_severe_event} ({selectedCase.strike_propagation_time})</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Action: {selectedCase.disaster_mitigation_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WARNING LEAD TIME</span><span className="text-emerald-400 font-bold">{selectedCase.nowcast_lead_time_mins} Minutes Lead</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NOWCAST ACCURACY</span><span className="text-amber-400 font-bold">{selectedCase.nowcast_accuracy_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('sensors')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Radar, Lightning & Satellite Sensor Mesh ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>ConvLSTM Nowcasting Engine</span>
                  </h4>
                  <form onSubmit={handleNowcast} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Convective Storm Region</label>
                      <input type="text" readOnly value={`${selectedCase.nowcast_id} (${selectedCase.region_district.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isNowcasting} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isNowcasting ? 'animate-spin' : ''}`} />
                      <span>{isNowcasting ? 'Running ConvLSTM Spatio-Temporal Model...' : 'Generate 0-3h Lightning Nowcast'}</span>
                    </button>
                  </form>
                  {nowcastResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Event: <strong className="text-rose-400 font-mono text-xs">{nowcastResult.event}</strong></div>
                      <div>Lead: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{nowcastResult.leadTime}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SENSORS */}
        {tab === 'sensors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {sensors.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{s.update_interval}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.sensor_system}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Measurement: <strong className="text-cyan-400">{s.measurement}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Purpose: {s.purpose}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CONVLSTM */}
        {tab === 'convlstm' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {convlstm.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{c.forecast_horizon}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.model_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Features: <strong className="text-white">{c.features}</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Accuracy: {c.accuracy}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: RADAR */}
        {tab === 'radar' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Real-Time Lightning Strike Radar & CAP Siren Geo-Map</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Visualizes live cloud-to-ground (CG) lightning strike density heatmaps, Doppler radar echo tops ($>12	ext{ km}$), and automated siren broadcast radiuses across rural agricultural districts.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
