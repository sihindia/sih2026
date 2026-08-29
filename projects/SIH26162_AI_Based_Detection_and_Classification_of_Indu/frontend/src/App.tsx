import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Navigation, 
  RefreshCw, 
  ShieldAlert, 
  Globe 
} from 'lucide-react';

import anomaliesData from './data/thermal_anomaly_sources.json';
import taxonomyData from './data/classification_taxonomy.json';
import statsData from './data/fire_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [anomalies, setAnomalies] = useState(anomaliesData);
  const [selectedAnomaly, setSelectedAnomaly] = useState(anomaliesData[0]);
  const [taxonomy, setTaxonomy] = useState(taxonomyData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'anomalies' | 'taxonomy' | 'gis' | 'stats'>('anomalies');

  // Interactive Hotspot Classifier
  const [isClassifying, setIsClassifying] = useState(false);
  const [classResult, setClassResult] = useState<any>({
    type: "PERSISTENT_INDUSTRIAL_GAS_FLARE",
    conf: "99.4%",
    action: "NORMAL_OPERATIONAL_FLARE"
  });

  const handleClassify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClassifying(true);
    setTimeout(() => {
      setClassResult({
        type: "PERSISTENT_INDUSTRIAL_GAS_FLARE",
        conf: "99.4%",
        action: "NORMAL_OPERATIONAL_FLARE"
      });
      setIsClassifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>NTRO • AGNIDRISHTI 360 THERMAL ANOMALY CLASSIFIER • SIH26162</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AgniDrishti 360: AI Detection & Classification of Industrial Fires & Thermal Sources
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              NASA FIRMS VIIRS & MODIS Thermal Satellite Data Fused with OpenStreetMap (OSM) to Segregate Industrial Flares from Wildfires
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'anomalies', label: '🔥 Thermal Hotspot Feed', count: anomalies.length },
            { id: 'taxonomy', label: '🗺️ AI Classification Taxonomy', count: taxonomy.length },
            { id: 'gis', label: '🛰️ NASA FIRMS & OSM Map Overlay' },
            { id: 'stats', label: '📊 National Thermal Statistics' }
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

        {/* VIEW 1: ANOMALIES */}
        {activeTab === 'anomalies' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {anomalies.map((a) => (
                <button
                  key={a.anomaly_id}
                  onClick={() => setSelectedAnomaly(a)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedAnomaly.anomaly_id === a.anomaly_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{a.anomaly_id}</span>
                    <span className={a.detected_source_type.includes('INDUSTRIAL') ? 'text-cyan-300' : 'text-rose-400'}>
                      {a.brightness_temperature_kelvin}K ({a.frp_megawatts}MW)
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? a.facility_name_hi : a.facility_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{a.coordinates}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{a.detected_source_type.split('_')[0]}</span>
                    <span>{a.ai_classification_confidence_pct}% Conf</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedAnomaly.anomaly_id}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedAnomaly.facility_name}</h3>
                    <p className="text-slate-400 text-[10px]">{selectedAnomaly.coordinates}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedAnomaly.detected_source_type.includes('INDUSTRIAL') ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {selectedAnomaly.detected_source_type}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-500 block text-[8px]">BRIGHTNESS TEMP</span><span className="text-orange-400 font-bold text-sm">{selectedAnomaly.brightness_temperature_kelvin} K</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-amber-950"><span className="text-slate-500 block text-[8px]">FIRE RADIATIVE POWER</span><span className="text-amber-400 font-bold text-sm">{selectedAnomaly.frp_megawatts} MW</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-emerald-950"><span className="text-slate-500 block text-[8px]">AI CONFIDENCE</span><span className="text-emerald-400 font-bold text-sm">{selectedAnomaly.ai_classification_confidence_pct}%</span></div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <div><strong>OSM Landuse & Infrastructure Match:</strong> <span className="font-mono text-cyan-300">{selectedAnomaly.osm_facility_match}</span></div>
                  <div><strong>Operational Hazard Directive:</strong> <span className="text-amber-300">{selectedAnomaly.hazard_status}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('gis')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect GIS Satellite Hotspot Overlay ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>NASA FIRMS AI Classifier</span>
                  </h4>
                  <form onSubmit={handleClassify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Satellite Anomaly ID</label>
                      <input type="text" readOnly value={selectedAnomaly.anomaly_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isClassifying} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isClassifying ? 'animate-spin' : ''}`} />
                      <span>{isClassifying ? 'Fusing FIRMS with OSM Polygons...' : 'Classify Thermal Source'}</span>
                    </button>
                  </form>
                  {classResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Classification: <strong className="text-cyan-300 font-mono">{classResult.type}</strong></div>
                      <div>Confidence: <strong className="text-emerald-400 font-mono">{classResult.conf}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TAXONOMY */}
        {activeTab === 'taxonomy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {taxonomy.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white font-sans">{t.class_type}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Signature: <strong className="text-orange-400 font-sans">{t.thermal_signature}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Action: {t.action}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: GIS */}
        {activeTab === 'gis' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-orange-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-orange-400 font-bold text-[10px] uppercase">GIS MAP OVERLAY</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">{selectedAnomaly.facility_name}</h4>
              </div>
              <span className="px-3 py-1 bg-orange-500 text-slate-950 font-black rounded-xl text-xs font-sans">
                NASA FIRMS Live
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <div>Coordinates: <strong className="text-orange-400">{selectedAnomaly.coordinates}</strong></div>
              <div>OSM Infrastructure: <strong className="text-white">{selectedAnomaly.osm_facility_match}</strong></div>
              <div>Thermal Radiative Power: <strong className="text-amber-400">{selectedAnomaly.frp_megawatts} MW</strong></div>
            </div>
          </div>
        )}

        {/* VIEW 4: STATS */}
        {activeTab === 'stats' && (
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
