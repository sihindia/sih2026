import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  Activity, 
  Layers, 
  RefreshCw, 
  Compass, 
  Building2, 
  ChevronRight, 
  Radio, 
  Flame, 
  Zap, 
  Send, 
  Users, 
  LifeBuoy, 
  Globe 
} from 'lucide-react';

import alertsData from './data/hazard_alerts.json';
import ndrfData from './data/ndrf_battalions.json';
import campsData from './data/relief_camps.json';
import sosData from './data/sos_reports.json';
import routesData from './data/evacuation_routes.json';

export default function App() {
  const [alerts, setAlerts] = useState(alertsData);
  const [selectedAlert, setSelectedAlert] = useState(alertsData[0]);
  const [ndrfUnits, setNdrfUnits] = useState(ndrfData);
  const [selectedNdrf, setSelectedNdrf] = useState(ndrfData[0]);
  const [camps, setCamps] = useState(campsData);
  const [sosList, setSosList] = useState(sosData);
  const [activeTab, setActiveTab] = useState<'alerts' | 'sos' | 'ndrf' | 'camps' | 'routes'>('alerts');

  // SOS Form State
  const [citizenName, setCitizenName] = useState('Anil Talukdar');
  const [phone, setPhone] = useState('+91 94350 81942');
  const [familyCount, setFamilyCount] = useState(6);
  const [situation, setSituation] = useState('Water rising rapidly on 1st floor roof, 2 elderly persons present needing immediate evacuation');
  const [hazardType, setHazardType] = useState('FLASH_FLOOD_RIVERINE');
  const [submittedSOS, setSubmittedSOS] = useState<any>(null);

  const handleSendSOS = (e: React.FormEvent) => {
    e.preventDefault();
    const newSOS = {
      sos_id: `SOS-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      citizen_name: citizenName,
      contact_phone: phone,
      location: 'Barpeta Inundated Sector (GPS: 26.3458° N, 91.0284° E)',
      hazard_type: hazardType,
      family_members_count: Number(familyCount),
      urgency_level: 'CRITICAL_LIFE_THREAT',
      situation_details: situation,
      ai_triage_score: 98.5,
      assigned_unit: '1st Battalion NDRF Quick Response Boat',
      status: 'RESCUE_BOAT_EN_ROUTE'
    };

    setSosList([newSOS, ...sosList]);
    setSubmittedSOS(newSOS);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>AICTE • NDMA SURAKSHAGRID 360 DISASTER LIFECYCLE PLATFORM • SIH26206</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              National Disaster Risk Mitigation, Incident Command & Citizen SOS Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Pre-Disaster Early Warning, Live NDRF Battalion Tasking, Relief Shelter Logistics & AI Evacuation Routing
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-rose-950/80 text-rose-300 border border-rose-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner font-mono">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>NATIONAL EMERGENCY GRID ACTIVE</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'alerts', label: '🚨 Multi-Hazard Early Warnings', count: alerts.length },
            { id: 'sos', label: '🆘 Citizen SOS & AI Triage', count: sosList.length },
            { id: 'ndrf', label: '🚒 NDRF & SDRF Incident Command', count: ndrfUnits.length },
            { id: 'camps', label: '⛺ Relief Camp Logistics', count: camps.length },
            { id: 'routes', label: '🗺️ AI Evacuation Routing', count: routesData.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-rose-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: MULTI-HAZARD EARLY WARNINGS
           ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {alerts.map((a) => (
                <button
                  key={a.alert_id}
                  onClick={() => setSelectedAlert(a)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                    selectedAlert.alert_id === a.alert_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{a.alert_id}</span>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">{a.severity}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{a.hazard_name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{a.affected_regions.join(', ')}</div>
                </button>
              ))}
            </div>

            {/* Split Alert Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Real-Time Hazard Telemetry */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedAlert.hazard_type}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedAlert.hazard_name}</h3>
                    <p className="text-xs text-slate-400 font-mono">Landfall / Peak Window: {selectedAlert.forecast_landfall}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedAlert.status}
                  </span>
                </div>

                {/* Telemetry Metric Grid */}
                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  {selectedAlert.wind_speed_kmh && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px]">WIND GUSTS</span>
                      <span className="text-xl font-black text-rose-400 mt-1 block">{selectedAlert.wind_speed_kmh} km/h</span>
                    </div>
                  )}
                  {selectedAlert.storm_surge_meters && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px]">STORM SURGE</span>
                      <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedAlert.storm_surge_meters} m</span>
                    </div>
                  )}
                  {selectedAlert.water_discharge_cusecs && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px]">DISCHARGE</span>
                      <span className="text-sm font-black text-rose-400 mt-1 block">{selectedAlert.water_discharge_cusecs.toLocaleString()} cusecs</span>
                    </div>
                  )}
                  {selectedAlert.rainfall_24h_mm && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                      <span className="text-slate-500 block text-[9px]">24H RAINFALL</span>
                      <span className="text-xl font-black text-amber-400 mt-1 block">{selectedAlert.rainfall_24h_mm} mm</span>
                    </div>
                  )}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                    <span className="text-slate-500 block text-[9px]">SECTOR PRIORITY</span>
                    <span className="text-xs font-black text-purple-400 mt-1 block">LEVEL-1 RED</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold text-[10px] uppercase font-mono block">
                    📢 NDMA / SDMA STATUTORY SAFETY DIRECTIVE:
                  </span>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {selectedAlert.ndma_guideline}
                  </p>
                </div>
              </div>

              {/* Right 5: Quick Response Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>Incident Command Actions</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      ARMED
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Activate emergency sirens, broadcast cellular cell-broadcast alerts, and dispatch pre-positioned NDRF flood rescue battalions.
                  </p>

                  <button
                    onClick={() => setActiveTab('sos')}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Inspect Citizen SOS Distress Beacons ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: CITIZEN SOS & AI TRIAGE
           ========================================================================= */}
        {activeTab === 'sos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
              
              {/* Left 6: Live SOS Beacons */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex justify-between items-center font-mono text-slate-400 px-1">
                  <span>ACTIVE DISTRESS BEACONS (AI TRIAGE RANKED)</span>
                  <span className="text-rose-400 font-bold">{sosList.length} Active Calls</span>
                </div>

                <div className="space-y-3">
                  {sosList.map((s) => (
                    <div key={s.sos_id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-rose-400">{s.sos_id}</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold font-mono">
                              {s.urgency_level} ({s.ai_triage_score}%)
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white mt-1 font-sans">{s.citizen_name} • {s.family_members_count} Persons</h4>
                          <p className="text-[11px] text-slate-400 font-mono">{s.location}</p>
                        </div>
                        <span className="px-2 py-1 rounded bg-slate-950 text-cyan-300 text-[10px] font-mono">
                          {s.status}
                        </span>
                      </div>

                      <p className="text-slate-200 font-sans text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        "{s.situation_details}"
                      </p>

                      <div className="flex justify-between items-center text-[10px] font-mono pt-1 text-slate-400 border-t border-slate-800">
                        <span>Assigned: <strong className="text-white">{s.assigned_unit}</strong></span>
                        <span className="text-emerald-400 font-bold">Contact: {s.contact_phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 6: Citizen SOS Broadcast Simulator */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Send className="w-4 h-4 text-rose-400" />
                  <span>Broadcast Citizen SOS Distress Beacon</span>
                </h4>

                <form onSubmit={handleSendSOS} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Citizen / Community Lead Name</label>
                    <input type="text" required value={citizenName} onChange={(e) => setCitizenName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Phone / Satellite Satphone No</label>
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Persons Trapped</label>
                      <input type="number" min="1" max="100" required value={familyCount} onChange={(e) => setFamilyCount(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Hazard Type</label>
                      <select value={hazardType} onChange={(e) => setHazardType(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono">
                        <option value="FLASH_FLOOD_RIVERINE">Flash Flood Inundation</option>
                        <option value="CYCLONE_STORM_SURGE">Cyclone Storm Surge</option>
                        <option value="LANDSLIDE_DEBRIS_FLOW">Landslide Debris</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Emergency Situation Details</label>
                    <textarea rows={3} required value={situation} onChange={(e) => setSituation(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs" />
                  </div>

                  <button type="submit" className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Broadcast Emergency SOS Beacon</span>
                  </button>
                </form>

                {submittedSOS && (
                  <div className="p-3.5 bg-emerald-950/40 border border-emerald-800 rounded-xl text-emerald-300 text-[11px] font-mono space-y-1">
                    <div className="font-bold text-white">✅ SOS Beacon Transmitted ({submittedSOS.sos_id})</div>
                    <div>Assigned: {submittedSOS.assigned_unit}</div>
                    <div>Dispatch: {submittedSOS.status}</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: NDRF & SDRF INCIDENT COMMAND
           ========================================================================= */}
        {activeTab === 'ndrf' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {ndrfUnits.map((u) => (
                <div key={u.unit_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{u.unit_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{u.battalion_name}</h4>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>Personnel:</strong> <span className="text-white font-bold">{u.personnel_deployed} Rescuers</span></div>
                    <div><strong>Motorized Boats:</strong> <span className="text-cyan-300 font-bold">{u.inflatable_motor_boats || 0} Boats</span></div>
                    <div><strong>Satphone Comms:</strong> {u.satellite_satphone_units} Units</div>
                    <div><strong>Citizens Rescued:</strong> <span className="text-emerald-400 font-bold">{u.rescued_citizens_count.toLocaleString()}</span></div>
                  </div>

                  <div className="text-amber-300 text-[10px] pt-1">
                    Sector: <strong>{u.current_operational_sector}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: RELIEF CAMP LOGISTICS
           ========================================================================= */}
        {activeTab === 'camps' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {camps.map((c) => (
                <div key={c.camp_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{c.camp_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{c.camp_name}</h4>
                      <p className="text-slate-400 text-[11px]">{c.location}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] bg-slate-950 text-cyan-300 font-bold border border-slate-800">
                      {c.current_occupancy} / {c.capacity_persons} Beds
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[9px]">POTABLE WATER</span>
                      <span className="text-sm font-bold text-cyan-400">{c.potable_water_liters.toLocaleString()} L</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[9px]">DRY RATIONS</span>
                      <span className="text-sm font-bold text-emerald-400">{c.dry_rations_days} Days</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[9px]">DOCTORS</span>
                      <span className="text-sm font-bold text-purple-400">{c.medical_officers_present} Present</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: AI EVACUATION ROUTING
           ========================================================================= */}
        {activeTab === 'routes' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-rose-500/40 pb-4">
              <div>
                <span className="text-rose-400 font-bold text-[10px] uppercase">AI DYNAMIC EVACUATION CORRIDOR PLANNER</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Submersion & Landslide Hazard Avoidance Routing</h3>
              </div>
              <Compass className="w-10 h-10 text-rose-400" />
            </div>

            <div className="space-y-3">
              {routesData.map((r) => (
                <div key={r.route_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-rose-400 font-bold">{r.route_id} • {r.origin} ➔ {r.safe_destination}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{r.status}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Distance: {r.distance_km} km</div>
                  <div className="text-amber-300 text-[10px] pt-1 border-t border-slate-900">
                    Chokepoints Avoided: <strong>{r.chokepoints_avoided}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
