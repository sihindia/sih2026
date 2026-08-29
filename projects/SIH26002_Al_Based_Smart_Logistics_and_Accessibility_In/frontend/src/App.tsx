import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  Activity, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Package, 
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import corridorsData from './data/corridors.json';
import consignmentsData from './data/consignments.json';
import districtData from './data/district_accessibility.json';

export default function App() {
  const [corridors, setCorridors] = useState(corridorsData);
  const [consignments, setConsignments] = useState(consignmentsData);
  const [selectedConsignment, setSelectedConsignment] = useState(consignmentsData[0]);

  // Route Optimizer Form
  const [origin, setOrigin] = useState('Guwahati Medical Depot');
  const [destination, setDestination] = useState('Civil Hospital, Aizawl');
  const [commodity, setCommodity] = useState('Critical Medical Vaccines');
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationResult({
        recommendedRoute: 'NH-27 Lumding - Haflong Bypass Route (Avoids NH-06 Sonapur mudslide)',
        distanceKm: 395,
        estimatedTimeHours: 8.5,
        accessibilityScore: 88,
        disruptionBypassed: 'Avoided 4.5h Sonapur Tunnel blockage',
        coldChainCheckpoints: 4,
        carbonFootprintKg: 142
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <Truck className="w-4 h-4" />
              <span>MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION (MDoNER) • SIH26002</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI-Based Smart Logistics & Accessibility Intelligence Platform for NER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-Time Corridor Disruptions, Critical Consignment Cold-Chain Telemetry & AI Re-Routing Engine
            </p>
          </div>

          <span className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Logistics Fleet: 4 Consignments Tracking</span>
          </span>
        </header>

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Monitored Highway Corridors</span>
            <div className="text-2xl font-black text-white font-mono">{corridors.length} Arteries</div>
            <div className="text-[11px] text-amber-400">1 Blocked • 2 Restricted • 2 Normal</div>
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Regional Accessibility Index</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">65.4 / 100</div>
            <div className="text-[11px] text-slate-400">Weighted across 8 NER States</div>
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Life-Saving Supplies In Transit</span>
            <div className="text-2xl font-black text-blue-400 font-mono">100% Monitored</div>
            <div className="text-[11px] text-emerald-400">Zero Spoilage Breaches Recorded</div>
          </div>
        </div>

        {/* Interactive Highway Corridor Status Board (JSON Data) */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Real-Time NER Highway Corridor Accessibility Status</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Live JSON Feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {corridors.map((c) => {
              const isBlocked = c.current_status === 'BLOCKED';
              const isRestricted = c.current_status === 'PARTIALLY_RESTRICTED' || c.current_status === 'WEATHER_WARNING';
              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    isBlocked 
                      ? 'bg-red-950/40 border-red-800 text-red-200'
                      : isRestricted
                      ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-xs text-white">{c.highway}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isBlocked ? 'bg-red-600 text-white' : isRestricted ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {c.current_status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{c.states.join(', ')} • {c.length_km} km</div>
                    <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">{c.bottleneck_cause}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] flex justify-between items-center text-slate-400 font-mono">
                    <span>Delay: +{c.avg_delay_hours}h</span>
                    <span>Index: {c.accessibility_score}/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split Grid: Live Consignment Telemetry & AI Re-Routing Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 6: Live Consignments Cold-Chain Telemetry */}
          <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span>Tracked Consignments & Cold-Chain Telemetry</span>
            </h3>

            <div className="space-y-3">
              {consignments.map((item) => (
                <div
                  key={item.consignment_id}
                  onClick={() => setSelectedConsignment(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedConsignment.consignment_id === item.consignment_id
                      ? 'bg-blue-950/60 border-blue-500 ring-1 ring-blue-400'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-400">{item.consignment_id}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{item.commodity}</h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.origin} → {item.destination}</div>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-700">
                      {item.current_temp_c}°C
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
                    <span>Vehicle: {item.vehicle_no}</span>
                    <span className="font-mono text-amber-400 font-bold">{item.estimated_eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6: AI Dynamic Route Optimization Simulator */}
          <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI Dynamic Re-Routing & Bypass Simulator</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Origin Terminal</label>
                <input
                  type="text" value={origin} onChange={(e) => setOrigin(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Destination Location</label>
                <input
                  type="text" value={destination} onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Commodity Sensitivity</label>
                <select
                  value={commodity} onChange={(e) => setCommodity(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                >
                  <option>Critical Medical Vaccines (Cold Storage 2-8°C)</option>
                  <option>Perishable Agricultural Fruits (Queen Pineapple)</option>
                  <option>Cryogenic Liquid Medical Oxygen (LMO)</option>
                  <option>PDS Essential Foodgrains</option>
                </select>
              </div>

              <button
                onClick={handleOptimizeRoute}
                disabled={isOptimizing}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
              >
                {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                <span>Compute AI Safe Alternate Route</span>
              </button>

              {optimizationResult && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-emerald-400">✅ Optimal Safe Route Generated</span>
                    <span className="font-mono text-[11px] text-slate-400">Score: {optimizationResult.accessibilityScore}/100</span>
                  </div>
                  <div className="text-xs text-white font-medium">{optimizationResult.recommendedRoute}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                    <div className="p-2 bg-slate-900 rounded-lg">Distance: {optimizationResult.distanceKm} km</div>
                    <div className="p-2 bg-slate-900 rounded-lg">Est. Duration: {optimizationResult.estimatedTimeHours} hrs</div>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold">{optimizationResult.disruptionBypassed}</div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* District-Wise Accessibility Vulnerability Heatmap (JSON Data) */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>District-Wise Connectivity & Logistics Vulnerability Index</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {districtData.map((d) => (
              <div key={d.district} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="text-slate-400 text-[10px] uppercase font-bold">{d.state}</div>
                <div className="font-bold text-white">{d.district}</div>
                <div className="flex justify-between items-center pt-1 font-mono">
                  <span className="text-emerald-400 font-bold">{d.index}/100</span>
                  <span className="text-[10px] text-slate-500">{d.active_trucks} Trucks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
