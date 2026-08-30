import React, { useState } from 'react';
import { 
  Waves, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Ship, 
  Compass, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import incidentsData from './data/marine_oil_spill_incidents.json';
import driftData from './data/hydrodynamic_drift_hindcast_models.json';
import aisData from './data/ais_vessel_traffic_correlations.json';
import statsData from './data/oceanspill_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [incidents, setIncidents] = useState(incidentsData);
  const [selectedIncident, setSelectedIncident] = useState(incidentsData[0]);
  const [driftModels, setDriftModels] = useState(driftData);
  const [aisTraffic, setAisTraffic] = useState(aisData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'incidents' | 'drift' | 'ais' | 'dossier' | 'stats'>('incidents');

  // Interactive Oil Spill Attribution Simulator
  const [isAttributing, setIsAttributing] = useState(false);
  const [attribResult, setAttribResult] = useState<any>({
    vessel: "MT Pacific Horizon (IMO 9481234, Panama Flag)",
    confidence: "98.4% Attribution Confidence",
    hindcastOrigin: "19.4281° N, 71.3125° E (28 Aug 02:40 UTC)",
    anomaly: "Speed dropped from 14.2 ➔ 6.1 Knots during midnight transit",
    action: "ICGS Samarth Interception Warrant Issued (MARPOL Annex I)"
  });

  const handleAttribute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAttributing(true);
    setTimeout(() => {
      setAttribResult({
        vessel: "MT Pacific Horizon (IMO 9481234, Panama Flag)",
        confidence: "98.4% Attribution Confidence",
        hindcastOrigin: "19.4281° N, 71.3125° E (28 Aug 02:40 UTC)",
        anomaly: "Speed dropped from 14.2 ➔ 6.1 Knots during midnight transit",
        action: "ICGS Samarth Interception Warrant Issued (MARPOL Annex I)"
      });
      setIsAttributing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Waves className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>NTRO • OCEANSPIL 360 SATELLITE SPILL & AIS ATTRIBUTION • SIH26143</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO OceanSpill: Satellite SAR Oil Spill Detection & AIS Polluter Attribution Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Sentinel-1 SAR Slick Segmentation, OpenDrift Lagrangian Particle Hindcasting & Coast Guard Legal Enforcement
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
            { id: 'incidents', label: '🌊 Marine Oil Spill Incidents', count: incidents.length },
            { id: 'drift', label: '🧭 Lagrangian Drift Hindcasting' },
            { id: 'ais', label: '🚢 AIS Spatio-Temporal Correlation', count: aisTraffic.length },
            { id: 'dossier', label: '📜 Coast Guard MARPOL Dossier' },
            { id: 'stats', label: '📊 NTRO OceanSpill Telemetry' }
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
            VIEW 1: INCIDENTS
           ========================================================================= */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedIncident.incident_id === inc.incident_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{inc.incident_id}</span>
                    <span className="text-rose-400">{inc.slick_area_sq_km} sq km Slick</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {inc.region_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{inc.coordinates} • {inc.oil_type}</div>
                  <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Culprit: {inc.culprit_vessel_name}</span>
                    <span>Match: {inc.attribution_confidence_pct}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedIncident.incident_id} • {selectedIncident.sensor_used}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedIncident.region_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedIncident.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">ATTRIBUTED POLLUTING VESSEL & EVIDENCE:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedIncident.culprit_vessel_name} ({selectedIncident.imo_number}, {selectedIncident.vessel_flag} Flag {selectedIncident.vessel_type})</div>
                  <div className="text-rose-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    AIS Speed Anomaly: <strong>{selectedIncident.ais_speed_drop_knots}</strong> • Hindcasted Time: <strong>{selectedIncident.hindcasted_spill_time}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ESTIMATED VOLUME</span><span className="text-amber-400 font-bold">{selectedIncident.estimated_spill_volume_mt} Metric Tons ({selectedIncident.slick_area_sq_km} km²)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ATTRIBUTION SCORE</span><span className="text-emerald-400 font-bold">{selectedIncident.attribution_confidence_pct}% Verified</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('drift')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Simulate OpenDrift Lagrangian Particle Trajectory ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Polluter Attribution Engine</span>
                  </h4>
                  <form onSubmit={handleAttribute} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Incident Area & Sensor</label>
                      <input type="text" readOnly value={`${selectedIncident.region_name} (${selectedIncident.sensor_used})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isAttributing} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAttributing ? 'animate-spin' : ''}`} />
                      <span>{isAttributing ? 'Reconstructing AIS Trajectory Windows...' : 'Attribute Polluting Vessel'}</span>
                    </button>
                  </form>
                  {attribResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Culprit: <strong className="text-rose-400 font-mono text-xs">{attribResult.vessel}</strong></div>
                      <div>Confidence: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{attribResult.confidence}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DRIFT */}
        {activeTab === 'drift' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-amber-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">LAGRANGIAN HYDRODYNAMIC BACKWARD HINDCASTING</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">OpenDrift Particle Dispersion & Weathering Simulation</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">±0.6 km Precision</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3 font-mono">
                {driftModels.map((d, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">{d.model_name}</span>
                    <div className="text-slate-400">Currents: {d.surface_current_vector || d.coastal_impact_eta}</div>
                    <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Accuracy: {d.hindcast_accuracy_km}</div>
                  </div>
                ))}
              </div>
              <div className="text-amber-400 font-bold pt-2 border-t border-slate-900">
                Backward particle tracing calculates the exact timestamp and GPS coordinate where the vessel initiated illegal bilge or ballast discharge.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: AIS */}
        {activeTab === 'ais' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {aisTraffic.map((v, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-amber-400 font-bold">RANK #{v.rank}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${v.attribution_score > 50 ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}>
                    {v.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{v.vessel_name} (IMO: {v.imo})</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Distance to Origin: <strong className="text-white">{v.distance_to_origin_km} km</strong></div>
                  <div>Speed Profile: <strong className="text-rose-400">{v.speed_anomaly}</strong></div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900">Attribution Match: {v.attribution_score}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DOSSIER */}
        {activeTab === 'dossier' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated MARPOL Annex I Legal Enforcement Dossier</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Compiles calibrated SAR radar imagery, OpenDrift hydrodynamic trajectory vectors, and verified AIS speed anomalies into an admissible legal prosecution dossier for the Indian Coast Guard and Admiralty Courts.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
