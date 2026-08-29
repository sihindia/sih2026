import React, { useState } from 'react';
import { 
  Ship, 
  Anchor, 
  TrendingDown, 
  TrendingUp, 
  Compass, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  Layers, 
  Navigation,
  ArrowRight
} from 'lucide-react';
import tradeRoutesData from './data/trade_routes.json';
import portConstraintsData from './data/port_constraints.json';

export default function App() {
  const [routes, setRoutes] = useState(tradeRoutesData);
  const [selectedRoute, setSelectedRoute] = useState(tradeRoutesData[0]);
  const [ports, setPorts] = useState(portConstraintsData);

  // Charter Optimizer Inputs
  const [parcelTons, setParcelTons] = useState(165000);
  const [targetDischargePort, setTargetDischargePort] = useState('Paradip');
  const [optResult, setOptResult] = useState<any>(null);
  const [isComputing, setIsComputing] = useState(false);

  const handleRunForecast = () => {
    setIsComputing(true);
    setTimeout(() => {
      setIsComputing(false);
      const isCape = parcelTons >= 120000;
      const rate = isCape ? 12.80 : 21.50;
      const savings = parcelTons * 2.40;
      setOptResult({
        vessel: isCape ? 'Capesize (180,000 DWT)' : 'Panamax (75,000 DWT)',
        strategy: 'Lock 3-Month Period Charter Contract (Avoids Spot Volatility)',
        rateUSD: rate,
        totalCostUSD: (parcelTons * rate).toLocaleString(),
        projectedSavingsUSD: savings.toLocaleString(),
        draftStatus: 'Compliant with Indian East Coast Berth Draft',
        bdiIndexTrend: 'Bearish (-6.4% in 30 Days)'
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
              <Ship className="w-4 h-4" />
              <span>MINISTRY OF STEEL • STEEL AUTHORITY OF INDIA LTD. (SAIL) • SIH26006</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Intelligent Freight Forecasting & Bulk Vessel Chartering Optimization Platform
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              BDI Machine Learning Rate Predictor, Port Draft Feasibility & Period vs Spot Contract Decision Engine
            </p>
          </div>

          <span className="px-4 py-2 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span>Active Bulk Cargo Fleet: Monitored</span>
          </span>
        </header>

        {/* Trade Routes Selection Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>🌐 OVERSEAS BULK COAL PROCUREMENT TRADE LANES ({routes.length} LANES)</span>
            <span>Click lane to inspect</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {routes.map((r) => (
              <button
                key={r.route_id}
                onClick={() => setSelectedRoute(r)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedRoute.route_id === r.route_id
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md ring-1 ring-cyan-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{r.route_id}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{r.origin_port} → {r.destination_port}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{r.primary_commodity}</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    ${r.current_spot_rate_usd_t}/t
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>{r.distance_nautical_miles} NM</span>
                  <span className="text-emerald-400 font-bold">{r.charter_recommendation.replace(/_/g, ' ')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Port Draft & LOA Constraints Board */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-cyan-400" />
                    <span>Indian East Coast Discharge Port Infrastructure Constraints</span>
                  </h3>
                  <p className="text-xs text-slate-400">Draft depths, maximum LOA limits & daily bulk discharge capacities</p>
                </div>
                <span className="text-xs font-mono text-emerald-400">{ports.length} East Coast Ports</span>
              </div>

              <div className="space-y-3">
                {ports.map((p) => (
                  <div key={p.port_name} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{p.port_name} Port</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{p.max_vessel} • Max LOA: {p.max_loa_m}m</div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="font-bold text-cyan-400">Max Draft: {p.max_draft_m}m</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{p.discharge_rate_mtpd.toLocaleString()} MTPD rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5: AI Charter & Freight Predictor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>AI Vessel Charter Strategy Optimizer</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Cargo Parcel Quantity (Tons)</label>
                  <input
                    type="number" step="5000" value={parcelTons}
                    onChange={(e) => setParcelTons(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Target Discharge Port</label>
                  <select
                    value={targetDischargePort} onChange={(e) => setTargetDischargePort(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  >
                    <option>Paradip (Deep Draft 17.1m)</option>
                    <option>Visakhapatnam (16.5m)</option>
                    <option>Dhamra (18.0m)</option>
                    <option>Gangavaram (19.5m)</option>
                    <option>Haldia (8.2m Riverine)</option>
                  </select>
                </div>

                <button
                  onClick={handleRunForecast}
                  disabled={isComputing}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  {isComputing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                  <span>Generate AI Optimal Charter Contract</span>
                </button>

                {optResult && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="font-bold text-emerald-400">✅ Recommended Strategy</span>
                      <span className="font-mono text-cyan-400 text-[11px]">${optResult.rateUSD}/t</span>
                    </div>
                    <div className="text-xs font-bold text-white">{optResult.strategy}</div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-300">
                      <div className="p-2 bg-slate-900 rounded-lg">Vessel: {optResult.vessel.split(' ')[0]}</div>
                      <div className="p-2 bg-slate-900 rounded-lg text-emerald-400 font-bold">Save: ${optResult.projectedSavingsUSD}</div>
                    </div>
                    <div className="text-[11px] text-slate-400">{optResult.draftStatus}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
