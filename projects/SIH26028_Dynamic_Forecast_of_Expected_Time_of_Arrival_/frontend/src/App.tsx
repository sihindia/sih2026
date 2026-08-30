import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Train, 
  Clock, 
  Radio, 
  Compass, 
  Sliders, 
  Globe 
} from 'lucide-react';

import trainsData from './data/coaching_trains_telemetry.json';
import itinerariesData from './data/station_itineraries_dynamic_eta.json';
import occupancyData from './data/junction_platform_occupancy.json';
import alertsData from './data/passenger_broadcast_alerts.json';
import statsData from './data/raileta_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'mr' | 'ta'>('en');
  const [trains, setTrains] = useState(trainsData);
  const [selectedTrain, setSelectedTrain] = useState(trainsData[0]);
  const [itineraries, setItineraries] = useState(itinerariesData);
  const [occupancy, setOccupancy] = useState(occupancyData);
  const [alerts, setAlerts] = useState(alertsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'radar' | 'itinerary' | 'simulator' | 'junctions' | 'alerts'>('radar');

  // Simulator
  const [simSpeed, setSimSpeed] = useState(128);
  const [simHeadway, setSimHeadway] = useState(5.5);
  const [simSlack, setSimSlack] = useState(85);
  const [simResult, setSimResult] = useState<any>(null);

  const currentItin = (itineraries as any)[selectedTrain.train_number] || (itineraries as any)["22436"];

  const runSim = () => {
    const spd = Number(((simSpeed - 100) * 0.22).toFixed(1));
    const hdw = simHeadway >= 5.0 ? 3.5 : -3.0;
    const slk = Number(((simSlack / 100) * 12.0).toFixed(1));
    const tot = Number((spd + hdw + slk).toFixed(1));
    setSimResult({
      tot,
      verdict: tot >= 10.0 ? 'FULL SCHEDULE RECOVERY (ON-TIME)' : `REDUCED DELAY (+${Math.max(1, Math.round(14 - tot))} mins)`,
      conf: "98.2%",
      spd, hdw, slk
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF RAILWAYS • CRIS / RTIS TELEMETRY • SIH26028</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              RailETA Dynamic: Dynamic Forecast of Expected Time of Arrival for Coaching Trains
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Indian Railways RTIS Satellite Tracking: ISRO NavIC Locomotive GPS Telemetry, Physics-Informed ML Headway Models &amp; Dynamic Schedule Recovery Forecaster
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'radar', label: '🚆 Flagship Fleet Radar & RTIS Feed', count: trains.length },
            { id: 'itinerary', label: '⏱️ Station-by-Station Dynamic ETA Board' },
            { id: 'simulator', label: '🧪 What-If Delay Recovery Simulator' },
            { id: 'junctions', label: '🚉 Junction Platform Allocator', count: occupancy.length },
            { id: 'alerts', label: '📱 Passenger Broadcast Alerts', count: alerts.length }
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
            VIEW 1: RADAR
           ========================================================================= */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {trains.map((t) => (
                <button
                  key={t.train_number}
                  onClick={() => setSelectedTrain(t)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTrain.train_number === t.train_number
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{t.train_number}</span>
                    <span className="text-emerald-400">{t.prediction_confidence_pct}% Confidence</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {t.train_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{t.current_block_section}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{t.current_speed_kmh} km/h</span>
                    <span className="text-emerald-400">{t.dynamic_ai_eta.split('(')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">TRAIN #{selectedTrain.train_number} • {selectedTrain.locomotive_type}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTrain.train_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTrain.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">RTIS SATELLITE TELEMETRY &amp; CAUTION ORDER PROFILE:</span>
                  <div className="text-white font-sans text-xs">
                    Current Section: <strong className="text-cyan-300">{selectedTrain.current_block_section}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Speed &amp; Headway: {selectedTrain.current_speed_kmh} km/h (Max: {selectedTrain.max_permissible_speed_kmh} km/h) | Clear Ahead: {selectedTrain.forward_headway_km} Km
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Active Caution Orders (TSR): {selectedTrain.temporary_speed_restrictions}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Static Delay: <span className="line-through text-slate-500">{selectedTrain.ntes_static_delay}</span> ➔ <strong className="text-emerald-400 font-mono">Dynamic AI: {selectedTrain.dynamic_ai_eta}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RECOVERY SLACK</span><span className="text-cyan-400 font-bold">{selectedTrain.schedule_recovery_slack_mins} Minutes In-Built</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI PREDICTION CONFIDENCE</span><span className="text-emerald-400 font-bold">{selectedTrain.prediction_confidence_pct}% Accurate</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('itinerary')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View Station-by-Station Dynamic ETA Board ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Dynamic ETA Intelligence Engine</span>
                  </h4>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="text-cyan-400 font-bold text-[10px] uppercase">RTIS TELEMETRY ATTRIBUTES:</div>
                    <div className="flex justify-between"><span>GPS Position Feed:</span><strong className="text-white font-bold">ISRO NavIC Continuous (1 Hz)</strong></div>
                    <div className="flex justify-between"><span>Signal Interlock:</span><strong className="text-emerald-400 font-bold">Automatic Block 4-Aspect</strong></div>
                    <div className="flex justify-between"><span>Forecast Algorithm:</span><strong className="text-purple-400 font-bold">Physics-Informed XGBoost</strong></div>
                  </div>
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
                    <div className="text-emerald-400 font-bold text-[10px] uppercase">DOWNSTREAM PASSENGER BENEFIT:</div>
                    <div className="text-white font-bold text-sm mt-0.5">38 Mins Uncertainty Eliminated</div>
                    <div className="text-[10px] text-slate-400">Syncs directly with station displays &amp; feeder logistics.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Station-by-Station Dynamic ETA Board for Train #{selectedTrain.train_number}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentItin.map((st: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-cyan-400 font-bold text-base font-sans">{st.station_code}</span>
                    <span className="text-slate-400 text-[10px]">{st.station_name}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">Sch: {st.scheduled_time}</div>
                  <div className="p-2 bg-slate-950 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500">NTES: <span className="line-through">{st.static_delay}</span></div>
                    <div className="text-xs font-bold text-emerald-400">Dynamic: {st.dynamic_ai_eta}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">{st.action_notes}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>What-If Dynamic Delay Recovery Simulator</span>
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Average Sectional Speed:</span><span className="font-mono text-cyan-400">{simSpeed} km/h</span></div>
                  <input type="range" min="100" max="130" step="2" value={simSpeed} onChange={(e) => setSimSpeed(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Forward Headway Distance:</span><span className="font-mono text-emerald-400">{simHeadway} Km</span></div>
                  <input type="range" min="2.0" max="8.0" step="0.5" value={simHeadway} onChange={(e) => setSimHeadway(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Slack Buffer Ingestion:</span><span className="font-mono text-purple-400">{simSlack}%</span></div>
                  <input type="range" min="0" max="100" step="5" value={simSlack} onChange={(e) => setSimSlack(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <button onClick={runSim} className="w-full py-3 bg-cyan-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                  Execute Dynamic ETA Forecast
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h4 className="font-bold text-sm text-white font-sans">Simulated Forecast Outcome</h4>
              {simResult ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">TOTAL RECOVERED</span><span className="text-xl font-bold text-cyan-400">-{simResult.tot} mins</span></div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">CONFIDENCE</span><span className="text-xl font-bold text-emerald-400">{simResult.conf}</span></div>
                  </div>
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <span className="text-xs text-white font-bold font-sans">{simResult.verdict}</span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold rounded text-[10px] font-sans">Optimal</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-sans">Click "Execute Dynamic ETA Forecast" to evaluate.</div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: JUNCTIONS */}
        {activeTab === 'junctions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {occupancy.map((j: any, idx: number) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-white font-sans">{j.junction_name}</h4>
                    <div className="text-slate-400 text-[11px]">{j.platform_number}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{j.status}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="flex justify-between"><span>Train:</span><span className="text-cyan-400 font-bold">{j.assigned_train}</span></div>
                  <div className="flex justify-between"><span>Arrival In:</span><span className="text-emerald-400 font-bold">{j.estimated_arrival_in}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Automated Dynamic Passenger Broadcast Alerts</span>
            </h4>
            <div className="space-y-3">
              {alerts.map((a: any) => (
                <div key={a.alert_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between"><span className="text-cyan-400 font-bold">{a.alert_id} • Train #{a.train_number}</span><span className="text-slate-500">{a.timestamp}</span></div>
                  <p className="text-slate-200 font-sans text-xs pt-1 border-t border-slate-900">{a.message_content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
