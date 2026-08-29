import React, { useState } from 'react';
import { 
  Satellite, 
  Layers, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  Sliders, 
  RefreshCw, 
  ShieldCheck, 
  Pickaxe, 
  Compass, 
  Zap,
  ArrowRight
} from 'lucide-react';
import minesData from './data/manganese_mines.json';
import spaceData from './data/space_telemetry.json';

export default function App() {
  const [mines, setMines] = useState(minesData);
  const [selectedMine, setSelectedMine] = useState(minesData[1]); // Dongri Buzurg
  const [spaceTelemetry, setSpaceTelemetry] = useState(spaceData);

  // Simulation Controls
  const [hemmAvailability, setHemmAvailability] = useState(selectedMine.hemm_availability_pct);
  const [rainfallMm, setRainfallMm] = useState(45);
  const [blastingDelayDays, setBlastingDelayDays] = useState(2);

  const handleSelectMine = (m: any) => {
    setSelectedMine(m);
    setHemmAvailability(m.hemm_availability_pct);
  };

  // Real-time Shortfall Calculation
  const hemmDeficit = Math.max(0, (85 - hemmAvailability) * 250);
  const rainDeficit = Math.max(0, (rainfallMm - 20) * 180);
  const blastingDeficit = blastingDelayDays * 800;
  const estimatedShortfallMt = Math.round(hemmDeficit + rainDeficit + blastingDeficit);
  const isShortfallCritical = estimatedShortfallMt > 2500;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
              <Satellite className="w-4 h-4" />
              <span>MINISTRY OF STEEL • MOIL LIMITED • SIH26009</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI/ML & Space Technology for Manganese Reserves & Production Shortfall Mitigation
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Satellite Remote Sensing (SWIR & InSAR), Reserve Delineation & Real-Time Mine Shortfall Predictor
            </p>
          </div>

          <span className={`px-4 py-2 rounded-2xl text-xs font-black tracking-wider border flex items-center gap-2 ${
            isShortfallCritical ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isShortfallCritical ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span>{isShortfallCritical ? 'ELEVATED SHORTFALL WATCH' : 'OPTIMAL EXTRACTION'}</span>
          </span>
        </header>

        {/* Mines Switcher Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>⛏️ MOIL MANGANESE MINING SECTORS ({mines.length} MINES)</span>
            <span>Click mine to inspect</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mines.map((m) => (
              <button
                key={m.mine_id}
                onClick={() => handleSelectMine(m)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedMine.mine_id === m.mine_id
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md ring-1 ring-cyan-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{m.mine_id}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{m.mine_name.split('(')[0]}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.district}, {m.state}</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {m.mn_grade_pct}% Mn
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Reserves: {m.proven_reserves_million_tonnes} MT</span>
                  <span className="text-cyan-300 font-bold">{m.ore_type.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Space Telemetry & What-If Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Space Technology Indices */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Satellite className="w-4 h-4 text-cyan-400" />
                <span>Satellite Remote Sensing & Mineral Spectral Signatures</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {spaceTelemetry.map((item) => (
                  <div key={item.parameter} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="font-bold text-slate-300">{item.parameter}</div>
                    <div className="font-mono text-cyan-400 font-bold">{item.value}</div>
                    <div className="text-[10px] text-slate-500">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What-If Shortfall Simulation Controls */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Operational Constraint Simulation Sliders</span>
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">🚜 HEMM Dumper / Excavator Availability</span>
                  <span className="font-mono text-emerald-400">{hemmAvailability}%</span>
                </div>
                <input
                  type="range" min="40" max="100" value={hemmAvailability}
                  onChange={(e) => setHemmAvailability(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">🌧️ 24h Pit Precipitation / Water Influx</span>
                  <span className="font-mono text-blue-400">{rainfallMm} mm</span>
                </div>
                <input
                  type="range" min="0" max="120" value={rainfallMm}
                  onChange={(e) => setRainfallMm(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">💥 Bench Blasting & Explosive Delays</span>
                  <span className="font-mono text-amber-400">{blastingDelayDays} Days</span>
                </div>
                <input
                  type="range" min="0" max="7" value={blastingDelayDays}
                  onChange={(e) => setBlastingDelayDays(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

          </div>

          {/* Right 5: AI Shortfall Forecast & Corrective Planning */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
                <span>🤖 MOIL AI PRODUCTION FORECASTER</span>
                <span className="text-cyan-400">Live Telemetry</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Monthly Target</div>
                  <div className="text-xl font-black mt-1 text-white">{selectedMine.monthly_target_mt.toLocaleString()} MT</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Projected Shortfall</div>
                  <div className={`text-xl font-black mt-1 ${isShortfallCritical ? 'text-amber-400' : 'text-emerald-400'}`}>
                    -{estimatedShortfallMt.toLocaleString()} MT
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 font-sans text-xs space-y-1">
                <div className="font-bold text-slate-400 text-[10px] uppercase">AI Corrective Mine Schedule:</div>
                <div className="text-white font-medium">
                  {isShortfallCritical 
                    ? 'Re-deploy 85T dumpers to Bench 4 East and activate submersible pit sump pumps.'
                    : 'Standard operational extraction schedule optimal.'}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
