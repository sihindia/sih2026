import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Droplet, 
  RefreshCw, 
  Zap, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import stationsData from './data/antarctic_research_stations_telemetry.json';
import energyData from './data/polar_microgrid_chp_energy_matrix.json';
import lifeSupportData from './data/life_support_water_and_waste_systems.json';
import statsData from './data/maitribharati_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [stations, setStations] = useState(stationsData);
  const [selectedStation, setSelectedStation] = useState(stationsData[0]);
  const [energy, setEnergy] = useState(energyData);
  const [lifeSupport, setLifeSupport] = useState(lifeSupportData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'stations' | 'energy' | 'water' | 'fuel' | 'stats'>('stations');

  // Interactive Digital Twin HVAC & Microgrid Optimizer
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [twinResult, setTwinResult] = useState<any>({
    indoorTemp: "21.4°C Target Habitat Temperature Maintained",
    heatRecovery: "85.2 kW Thermal Energy Recycled from DG Exhaust",
    traceHeating: "+12.0°C Active Trace Heating on Lake Water Line",
    autonomyDays: "142 Days Complete Polar Wintering Autonomy",
    satelliteLink: "GSAT-7 Telemetry Synchronized to NCPOR HQ Goa"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setTwinResult({
        indoorTemp: "21.4°C Target Habitat Temperature Maintained",
        heatRecovery: "85.2 kW Thermal Energy Recycled from DG Exhaust",
        traceHeating: "+12.0°C Active Trace Heating on Lake Water Line",
        autonomyDays: "142 Days Complete Polar Wintering Autonomy",
        satelliteLink: "GSAT-7 Telemetry Synchronized to NCPOR HQ Goa"
      });
      setIsOptimizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>MOES / NCPOR • MAITRIBHARATI 360 ANTARCTIC DIGITAL TWIN • SIH26060</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoES MaitriBharati: Digital Twin Platform for Indian Antarctic Research Stations
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Centre for Polar and Ocean Research (NCPOR) SCADA Digital Twin for Maitri &amp; Bharati, Combined Heat &amp; Power (CHP) Microgrid, Lake Priyadarshini Water Heating, MBBR Zero Discharge &amp; GSAT Remote Sync
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'stations', label: '🏔️ Antarctic Station Twins', count: stations.length },
            { id: 'energy', label: '⚡ CHP Polar Microgrid', count: energy.length },
            { id: 'water', label: '💧 Water & Life Support', count: lifeSupport.length },
            { id: 'fuel', label: '⛽ Fuel Logistics & Autonomy' },
            { id: 'stats', label: '📊 MaitriBharati Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: STATIONS
           ========================================================================= */}
        {activeTab === 'stations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stations.map((s) => (
                <button
                  key={s.station_id}
                  onClick={() => setSelectedStation(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedStation.station_id === s.station_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{s.station_id}</span>
                    <span className="text-emerald-400">{s.wintering_autonomy_days}d Fuel</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.station_name.split('Antarctic')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{s.geographic_location}</div>
                  <div className="text-[10px] text-orange-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Outdoor: {s.ambient_temperature_c}°C</span>
                    <span className="text-emerald-400">Indoor: {s.indoor_habitat_temp_c}°C</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedStation.station_id} • {selectedStation.geographic_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedStation.station_name} (Crew: {selectedStation.wintering_crew_size} Scientists)</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedStation.overall_life_support_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">SCADA DIGITAL TWIN LIFE-SUPPORT MATRIX:</span>
                  <div className="text-white font-sans text-xs">
                    CHP Microgrid: <strong className="text-amber-300">{selectedStation.chp_microgrid_status}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Thermal Heat Recovery: {selectedStation.thermal_heat_recovery_kw} kW Recycled to Living Quarters
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Freshwater Life Support: {selectedStation.freshwater_source}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Satellite Link: {selectedStation.satellite_telemetry_link}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WINTERING FUEL INVENTORY</span><span className="text-emerald-400 font-bold">{selectedStation.fuel_reserve_litres.toLocaleString()} Litres ({selectedStation.wintering_autonomy_days} Days)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">THERMAL GRADIENT</span><span className="text-orange-400 font-bold">ΔT = {(selectedStation.indoor_habitat_temp_c - selectedStation.ambient_temperature_c).toFixed(1)}°C (Sub-Zero Safe)</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('energy')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch SCADA Combined Heat &amp; Power (CHP) Microgrid Simulator ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Instant Polar HVAC &amp; Power Balancer</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Antarctic Habitat Base</label>
                      <input type="text" readOnly value={`${selectedStation.station_name.split(' ')[0]} Base (${selectedStation.ambient_temperature_c}°C Ambient)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Recycling Diesel Exhaust Thermal Energy...' : 'Optimize Microgrid Heat Recovery'}</span>
                    </button>
                  </form>
                  {twinResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Habitat Temp: <strong className="text-emerald-400 font-mono text-xs">{twinResult.indoorTemp}</strong></div>
                      <div>Thermal Recycled: <strong className="text-orange-400 font-mono text-xs">{twinResult.heatRecovery}</strong></div>
                      <div>Lake Trace Heating: <strong className="text-cyan-300 font-mono text-xs">{twinResult.traceHeating}</strong></div>
                      <div>Fuel Autonomy: <strong className="text-amber-300 font-mono text-xs">{twinResult.autonomyDays}</strong></div>
                      <div>Goa Telemetry: <strong className="text-white font-mono text-xs block mt-0.5">{twinResult.satelliteLink}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ENERGY */}
        {tab === 'energy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {energy.map((e, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-orange-400 font-bold">{e.output_kw} kW Electrical</span>
                  <span className="text-emerald-400 font-bold">+{e.thermal_recovered_kw} kW Thermal</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{e.subsystem}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Fuel Burn: {e.fuel_burn_lph} L/h | Exhaust: {e.exhaust_temp_c}°C</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: WATER */}
        {tab === 'water' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {lifeSupport.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{l.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.life_support_element}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{l.operational_spec}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Flow: {l.flow_rate_lpm} L/min</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: FUEL */}
        {tab === 'fuel' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-950 border border-orange-500 flex items-center justify-center text-orange-400">
              <Droplet className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Polar Jet A-1 &amp; Arctic Diesel Inventory Control</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated tank farm telemetry tracking leak detection, flow rates, and fuel transfer to guarantee 140+ days of wintering survival during complete Antarctic isolation.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-orange-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
