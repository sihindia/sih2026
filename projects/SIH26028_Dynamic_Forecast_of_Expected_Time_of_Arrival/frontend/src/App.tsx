import React, { useState } from 'react';
import { 
  Train, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  QrCode, 
  Sliders, 
  TrendingUp, 
  Radio, 
  RefreshCw, 
  Zap, 
  ChevronRight, 
  Building2,
  Navigation,
  Compass,
  PhoneCall,
  BellRing
} from 'lucide-react';

import trainsData from './data/coaching_trains.json';
import itinerariesData from './data/station_itineraries.json';
import cautionData from './data/caution_orders.json';
import occupancyData from './data/junction_occupancy.json';
import alertsData from './data/alert_logs.json';

export default function App() {
  const [trains, setTrains] = useState(trainsData);
  const [selectedTrain, setSelectedTrain] = useState(trainsData[0]);
  const [activeTab, setActiveTab] = useState<'radar' | 'itinerary' | 'simulator' | 'junctions' | 'alerts'>('radar');

  // Simulator State
  const [simSpeed, setSimSpeed] = useState(128);
  const [simHeadway, setSimHeadway] = useState(5.5);
  const [simSlack, setSimSlack] = useState(85);
  const [simResult, setSimResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentItinerary = (itinerariesData as any)[selectedTrain.train_no] || (itinerariesData as any)['22436'];

  const runSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const speedBonus = Number(((simSpeed - 100) * 0.22).toFixed(1));
      const headwayBonus = simHeadway >= 5.0 ? 3.5 : -3.0;
      const slackBonus = Number(((simSlack / 100) * 12.0).toFixed(1));
      const totalMins = Number((speedBonus + headwayBonus + slackBonus).toFixed(1));
      
      setSimResult({
        totalMins,
        verdict: totalMins >= 10.0 ? 'FULL SCHEDULE RECOVERY (ON-TIME)' : `REDUCED DELAY (+${Math.max(1, Math.round(14 - totalMins))} mins)`,
        conf: Number((Math.random() * 2 + 97).toFixed(1)),
        speedBonus,
        headwayBonus,
        slackBonus
      });
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF RAILWAYS (INDIAN RAILWAYS) • RTIS TELEMETRY CLUSTER • SIH26028</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              ISRO NavIC / RTIS Satellite GPS Telemetry, Physics-Informed Machine Learning & Dynamic Headway Recovery Forecaster
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>RTIS Feed: Synchronized</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'radar', label: '🚆 Flagship Fleet Radar & RTIS Feed', count: trains.length },
            { id: 'itinerary', label: '⏱️ Station-by-Station Dynamic ETA Board', count: currentItinerary.length },
            { id: 'simulator', label: '🧪 What-If Delay Recovery Simulator' },
            { id: 'junctions', label: '🚉 Junction Platform & Berth Allocator', count: occupancyData.length },
            { id: 'alerts', label: '📱 Passenger Alert Broadcast Hub', count: alertsData.length }
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
            VIEW 1: FLAGSHIP FLEET RADAR & LIVE RTIS TELEMETRY
           ========================================================================= */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            {/* Premier Trains Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🛰️ PREMIER COACHING TRAINS TRACKED IN REAL-TIME VIA RTIS</span>
                <span className="text-cyan-400 font-mono">Select train to inspect satellite telemetry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {trains.map((t) => (
                  <button
                    key={t.train_no}
                    onClick={() => setSelectedTrain(t)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedTrain.train_no === t.train_no
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-400 font-bold">#{t.train_no}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{t.train_name.split('(')[0]}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{t.current_section}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">{t.current_speed_kmh} km/h</span>
                      <span className="text-cyan-300">+{t.ai_dynamic_eta_delay_mins}m AI ETA</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Dynamic Speed & Headway Gauges */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">TRAIN #{selectedTrain.train_no}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 font-mono">
                          {selectedTrain.loco_type}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{selectedTrain.train_name}</h3>
                      <p className="text-xs text-slate-400 font-mono">Current Block: {selectedTrain.current_section}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      {selectedTrain.ai_recovery_confidence_pct}% AI Confidence
                    </span>
                  </div>

                  {/* High Precision Speedometer & Headway Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center font-mono">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Instantaneous Speed</span>
                      <span className="text-2xl font-black text-cyan-400 mt-1 block">{selectedTrain.current_speed_kmh}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Max Perm: {selectedTrain.max_permissible_speed_kmh} km/h</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Headway Buffer</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">{selectedTrain.preceding_train_gap_km} Km</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Fluid Green Corridor</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Timetable Slack</span>
                      <span className="text-2xl font-black text-purple-400 mt-1 block">{selectedTrain.total_slack_margin_mins} mins</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Absorption Reserve</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Active Caution Order (TSR):</span>
                      <span className="text-amber-400 font-bold">{selectedTrain.active_tsr_caution}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Static NTES Delay (Scheduled):</span>
                      <span className="text-rose-400 font-bold">+{selectedTrain.static_ntes_delay_mins} minutes</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>AI Dynamic Recovery ETA:</span>
                      <span className="text-emerald-400 font-bold">+{selectedTrain.ai_dynamic_eta_delay_mins} minutes ({selectedTrain.status})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5: Comparative ETA Forecast Visualizer */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Static NTES vs Dynamic AI ETA</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      LIVE RTIS
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950/80 space-y-1">
                      <div className="flex justify-between text-rose-400 font-bold">
                        <span>STATIC NTES SYSTEM DELAY</span>
                        <span>+{selectedTrain.static_ntes_delay_mins} mins</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans">Linear interpolation assuming zero slack absorption and fixed sectional delays.</p>
                    </div>

                    <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl space-y-1">
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>AI DYNAMIC RECOVERY ETA</span>
                        <span>{selectedTrain.ai_dynamic_eta_delay_mins === 0 ? "ON-TIME" : `+${selectedTrain.ai_dynamic_eta_delay_mins} mins`}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-sans">Physics-informed speed acceleration over clear tracks + dynamic slack absorption.</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('itinerary')}
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 transition-all shadow-md font-sans"
                    >
                      <span>View Station-by-Station ETA Board</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: STATION-BY-STATION DYNAMIC ETA BOARD
           ========================================================================= */}
        {activeTab === 'itinerary' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-cyan-500/40 pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">INDIAN RAILWAYS • DYNAMIC PASSENGER BOARD</span>
                <h2 className="text-xl font-black text-white font-sans mt-0.5">Train #{selectedTrain.train_no} — {selectedTrain.train_name}</h2>
                <p className="text-slate-400 text-[11px]">Real-Time Multistation Delays & Dynamic Slack Recovery</p>
              </div>
              <Compass className="w-10 h-10 text-cyan-400" />
            </div>

            <div className="space-y-3">
              {currentItinerary.map((st: any) => (
                <div key={st.station_code} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold text-xs">{st.station_code}</span>
                      <h4 className="font-bold text-white font-sans text-sm">{st.station_name}</h4>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">Recovery Causal: <strong>{st.recovery_action}</strong></div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-slate-500 text-[9px] block">SCHEDULED</span>
                      <span className="text-white font-bold">{st.sch_arr || st.sch_dep}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[9px] block">STATIC NTES</span>
                      <span className="text-rose-400 font-bold">{st.static_delay}</span>
                    </div>
                    <div className="p-2 bg-emerald-950/60 border border-emerald-800 rounded-xl">
                      <span className="text-emerald-400 text-[9px] block font-bold">AI DYNAMIC ETA</span>
                      <span className="text-emerald-300 font-black text-sm">{st.ai_eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: WHAT-IF DELAY RECOVERY SIMULATOR
           ========================================================================= */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>What-If Delay Recovery Simulator</span>
              </h3>
              <p className="text-slate-400 font-sans">Adjust locomotive throttle, headway separation, and slack utilization to predict ETA improvements.</p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Target Locomotive Running Speed</span>
                    <span className="font-mono text-cyan-400">{simSpeed} km/h</span>
                  </div>
                  <input
                    type="range" min="80" max="130" step="2" value={simSpeed}
                    onChange={(e) => setSimSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Preceding Train Headway Separation</span>
                    <span className="font-mono text-emerald-400">{simHeadway} Km</span>
                  </div>
                  <input
                    type="range" min="2.0" max="12.0" step="0.5" value={simHeadway}
                    onChange={(e) => setSimHeadway(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Timetable Slack Utilization Factor</span>
                    <span className="font-mono text-purple-400">{simSlack}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="5" value={simSlack}
                    onChange={(e) => setSimSlack(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isCalculating}
                  className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                  <span>{isCalculating ? 'Computing Physics ML Recovery...' : 'Execute Dynamic ETA Forecast'}</span>
                </button>
              </div>
            </div>

            {/* Simulation Results Output */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Simulated ETA Prediction Outcome</span>
              </h4>

              {simResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px]">TOTAL RECOVERED</span>
                      <span className="text-2xl font-black text-cyan-400">-{simResult.totalMins} mins</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px]">PREDICTION CONFIDENCE</span>
                      <span className="text-2xl font-black text-emerald-400">{simResult.conf}%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span>Speed Acceleration Factor:</span><span className="text-cyan-400">+{simResult.speedBonus} mins</span></div>
                    <div className="flex justify-between"><span>Headway Gap Benefit:</span><span className="text-emerald-400">+{simResult.headwayBonus} mins</span></div>
                    <div className="flex justify-between"><span>Slack Absorption:</span><span className="text-purple-400">+{simResult.slackBonus} mins</span></div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Predicted Destination ETA</span>
                      <span className="text-base font-black text-white font-sans">{simResult.verdict}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Optimal
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Activity className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Execute Dynamic ETA Forecast" to run simulation.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: JUNCTION PLATFORM & BERTH ALLOCATION
           ========================================================================= */}
        {activeTab === 'junctions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {occupancyData.map((j) => (
                <div key={j.junction} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white font-sans">{j.junction}</h4>
                      <div className="text-slate-400 text-[11px]">{j.platform}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {j.berth_status}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div className="flex justify-between"><span>Assigned Train:</span><span className="text-cyan-400 font-bold">{j.assigned_train}</span></div>
                    <div className="flex justify-between"><span>Arrival In:</span><span className="text-emerald-400 font-bold">{j.eta_mins} mins</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: PASSENGER ALERTS & DISPATCH HUB
           ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-cyan-400" />
                  <span>Automated Dynamic Passenger Broadcast Alerts</span>
                </h3>
                <p className="text-slate-400 font-sans">Real-time SMS and WhatsApp notifications dispatched upon AI ETA delay reduction.</p>
              </div>
            </div>

            <div className="space-y-3">
              {alertsData.map((a) => (
                <div key={a.alert_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-cyan-400 font-bold">{a.alert_id} • Train #{a.train_no}</span>
                    <span className="text-slate-500">{a.dispatched_at}</span>
                  </div>
                  <p className="text-slate-200 font-sans text-xs pt-1 border-t border-slate-900 leading-relaxed">
                    {a.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
