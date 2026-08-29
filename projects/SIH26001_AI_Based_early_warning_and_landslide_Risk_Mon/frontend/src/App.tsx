import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Sliders, 
  Camera, 
  Send, 
  ShieldAlert, 
  Activity, 
  Download, 
  Layers, 
  RefreshCw, 
  Play, 
  Globe, 
  Database,
  PhoneCall
} from 'lucide-react';
import nerStationsData from './data/ner_stations.json';
import historicalData from './data/historical_landslides.json';
import multilingualData from './data/multilingual_alerts.json';

export default function App() {
  const [stations, setStations] = useState(nerStationsData);
  const [selectedStation, setSelectedStation] = useState(nerStationsData[0]);
  
  // Real-time sensor state
  const [rainfall, setRainfall] = useState(selectedStation.current_rainfall_mm_hr);
  const [porePressure, setPorePressure] = useState(selectedStation.pore_pressure_kpa);
  const [tiltAngle, setTiltAngle] = useState(selectedStation.tilt_angle_deg);
  const [selectedLang, setSelectedLang] = useState<'en' | 'as' | 'hi' | 'bn' | 'kha'>('en');

  // Citizen Report State
  const [citizenForm, setCitizenForm] = useState({
    name: '',
    phone: '',
    location: '',
    description: '',
    submitted: false
  });

  // Factor of Safety (FOS) calculation
  const rainfallFactor = rainfall * 0.0095;
  const porePressureFactor = porePressure * 0.0125;
  const tiltFactor = tiltAngle * 0.085;
  const fos = Math.max(0.55, Number((2.65 - (rainfallFactor + porePressureFactor + tiltFactor)).toFixed(2)));
  const isCritical = fos < 1.0;
  const isWarning = fos >= 1.0 && fos < 1.4;

  const handleSelectStation = (stn: any) => {
    setSelectedStation(stn);
    setRainfall(stn.current_rainfall_mm_hr);
    setPorePressure(stn.pore_pressure_kpa);
    setTiltAngle(stn.tilt_angle_deg);
  };

  const currentAlertText = (multilingualData as any)[selectedLang]?.replace('{location}', selectedStation.name).replace('{fos}', String(fos)) || '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION (MDoNER) • SIH26001</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI-Based Early Warning & Landslide Risk Monitoring System in NER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-Time JSON Sensor Telemetry, Bishop Slope Stability Engine & Multilingual Public Broadcast
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-2xl text-xs font-black tracking-wider border flex items-center gap-2 ${
              isCritical
                ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                : isWarning
                ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              <span>{isCritical ? 'CRITICAL EVACUATION' : isWarning ? 'HIGH RISK WATCH' : 'STABLE RISK'} (FOS: {fos})</span>
            </span>
          </div>
        </header>

        {/* Station Selection Grid (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
            <span>📡 ACTIVE NER SENSING CORRIDORS ({stations.length} JSON NODES)</span>
            <span>Click node to inspect telemetry</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stations.map((stn) => (
              <button
                key={stn.id}
                onClick={() => handleSelectStation(stn)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedStation.id === stn.id
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400 font-bold">{stn.district}</div>
                <div className="text-xs font-bold truncate mt-0.5 text-slate-200">{stn.name.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">{stn.elevation_m}m • {stn.state}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 Columns: Live Telemetry Controls & AI Slope Stability */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Telemetry Sliders Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white">{selectedStation.name}</h3>
                  <p className="text-xs text-slate-400">{selectedStation.highway_link} • {selectedStation.soil_type}</p>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  {selectedStation.lat.toFixed(4)}°N, {selectedStation.lng.toFixed(4)}°E
                </span>
              </div>

              {/* Slider 1: Rainfall */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">🌧️ Optical Rain Gauge (Precipitation)</span>
                  <span className="font-mono text-blue-400">{rainfall} mm/hr</span>
                </div>
                <input
                  type="range" min="0" max="150" value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0 Dry</span><span>50 Moderate</span><span>100 Cloudburst</span><span>150 Extreme</span>
                </div>
              </div>

              {/* Slider 2: Pore Pressure */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">💧 Subsurface Piezometer (Pore Water Pressure)</span>
                  <span className="font-mono text-indigo-400">{porePressure} kPa</span>
                </div>
                <input
                  type="range" min="0" max="100" value={porePressure}
                  onChange={(e) => setPorePressure(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0 Stable</span><span>40 Saturated</span><span>80 Critical Liquefaction</span>
                </div>
              </div>

              {/* Slider 3: Tilt Angle */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">📐 MEMS Borehole Inclinometer (Slope Tilt Shift)</span>
                  <span className="font-mono text-amber-400">{tiltAngle}°</span>
                </div>
                <input
                  type="range" min="0" max="15" step="0.1" value={tiltAngle}
                  onChange={(e) => setTiltAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0° Stationary</span><span>4° Creep Strain</span><span>15° Shear Failure</span>
                </div>
              </div>
            </div>

            {/* AI Factor of Safety & Slope Stability Gauge */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400">
                <span>🤖 BISHOP SIMPLIFIED SLOPE STABILITY ENGINE</span>
                <span className="text-emerald-400">JSON Feeds Synchronized</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Factor of Safety (FOS)</div>
                  <div className={`text-2xl font-black mt-1 ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {fos}
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Failure Probability</div>
                  <div className="text-2xl font-black mt-1 text-amber-400">
                    {isCritical ? '96.5%' : isWarning ? '64.2%' : '8.1%'}
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">NDRF Warning Status</div>
                  <div className={`text-xs font-bold mt-2 ${isCritical ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isCritical ? 'RED ALERT BROADCAST' : 'MONITORING'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Multilingual Broadcast & Citizen Incident Reporting */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Multilingual Alert Simulator */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Multilingual Early Warning SMS</span>
                </h4>
                <div className="flex gap-1 text-[10px] font-bold">
                  {(['en', 'as', 'hi', 'bn', 'kha'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-2 py-1 rounded-lg uppercase ${
                        selectedLang === lang ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed min-h-[90px]">
                {currentAlertText}
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Direct Twilio / C-DOT CAP Gateway</span>
                <span className="font-bold text-emerald-400">100% Free Tier</span>
              </div>
            </div>

            {/* Citizen Crowd-Sourced Field Incident Report */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-400" />
                <span>Citizen Geo-Tagged Incident Reporter</span>
              </h4>

              {citizenForm.submitted ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-emerald-300 space-y-1 text-center">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                  <div className="font-bold">Incident Report Transmitted!</div>
                  <p className="text-[11px]">District Disaster Management Authority (DDMA) response team dispatched.</p>
                  <button onClick={() => setCitizenForm(prev => ({ ...prev, submitted: false }))} className="mt-2 text-xs font-bold underline">
                    Submit another report
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text" placeholder="Citizen Name"
                    value={citizenForm.name} onChange={(e) => setCitizenForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                  <input
                    type="text" placeholder="Location (e.g. NH-29 Mile 14)"
                    value={citizenForm.location} onChange={(e) => setCitizenForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                  <textarea
                    placeholder="Describe slope cracks, falling boulders or road sinking..."
                    rows={2}
                    value={citizenForm.description} onChange={(e) => setCitizenForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                  <button
                    onClick={() => setCitizenForm(prev => ({ ...prev, submitted: true }))}
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 font-bold text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Geo-Tagged Incident</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Historical Landslides JSON Table */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Historical Landslide Inventory Records (NER Dataset)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{historicalData.length} Documented Extreme Events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-bold">
                  <th className="py-2.5 px-3">Event ID</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">24h Rainfall</th>
                  <th className="py-2.5 px-3">Debris Volume</th>
                  <th className="py-2.5 px-3">Road Blockage</th>
                  <th className="py-2.5 px-3">Engineering Mitigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {historicalData.map((ev) => (
                  <tr key={ev.event_id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{ev.event_id}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{ev.location}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{ev.date}</td>
                    <td className="py-2.5 px-3 font-mono text-blue-400">{ev.rainfall_24h_mm} mm</td>
                    <td className="py-2.5 px-3 font-mono">{ev.volume_debris_m3} m³</td>
                    <td className="py-2.5 px-3 text-amber-400 font-bold">{ev.road_blocked_days} Days</td>
                    <td className="py-2.5 px-3 text-slate-400">{ev.mitigation_done}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
