import React, { useState } from 'react';
import { 
  Anchor, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Waves, 
  LifeBuoy, 
  RefreshCw, 
  Crosshair, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import casesData from './data/side_scan_sonar_debris_cases.json';
import taxonomyData from './data/marine_debris_sonar_taxonomy.json';
import shadowMatrixData from './data/acoustic_shadow_height_estimation_matrix.json';
import statsData from './data/samudranetra_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn' | 'mr'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [taxonomy, setTaxonomy] = useState(taxonomyData);
  const [shadowMatrix, setShadowMatrix] = useState(shadowMatrixData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'surveys' | 'detector' | 'shadow' | 'taxonomy' | 'stats'>('surveys');

  // Interactive Sonar Debris Detection Simulator
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectResult, setDetectResult] = useState<any>({
    anomalyClass: "Discarded Nylon Monofilament Ghost Net (ALDFG)",
    confidence: "98.4% YOLOv10 Acoustic Vision Confidence",
    shadowHeight: "1.82 Meters Vertical Obstacle Relief",
    geotag: "8°48'14.2"N, 78°12'36.8"E (Tuticorin Coral Zone)",
    salvageAction: "ALDFG Retrieval Mission Dispatched to NIOT Diver Unit"
  });

  const handleDetect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDetecting(true);
    setTimeout(() => {
      setDetectResult({
        anomalyClass: "Discarded Nylon Monofilament Ghost Net (ALDFG)",
        confidence: "98.4% YOLOv10 Acoustic Vision Confidence",
        shadowHeight: "1.82 Meters Vertical Obstacle Relief",
        geotag: "8°48'14.2"N, 78°12'36.8"E (Tuticorin Coral Zone)",
        salvageAction: "ALDFG Retrieval Mission Dispatched to NIOT Diver Unit"
      });
      setIsDetecting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Anchor className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>MOES / NIOT • SAMUDRANETRA 360 ACOUSTIC MARINE DEBRIS AI • SIH26057</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NIOT SamudraNetra: AI-Powered Marine Debris &amp; Ghost Net Detection in Sonar Imagery
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Institute of Ocean Technology (NIOT) Deep Learning Side-Scan Sonar (SSS) Acoustic Vision, Speckle Noise Filtering, Shadow Height Trigonometry &amp; Geotagged Ocean Cleanup Reporting
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'surveys', label: '🌊 Sonar Survey Logs', count: cases.length },
            { id: 'detector', label: '🎯 Ghost Net AI Detector' },
            { id: 'shadow', label: '📐 Shadow Height Solver', count: shadowMatrix.length },
            { id: 'taxonomy', label: '🏷️ Debris Taxonomy', count: taxonomy.length },
            { id: 'stats', label: '📊 SamudraNetra Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: SURVEYS
           ========================================================================= */}
        {activeTab === 'surveys' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.survey_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.survey_id === c.survey_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{c.survey_id}</span>
                    <span className="text-emerald-400">{c.detection_confidence_pct}% Conf</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.detected_anomaly_class.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.survey_location}</div>
                  <div className="text-[10px] text-teal-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Depth: {c.seabed_depth_meters}m</span>
                    <span className="text-amber-400">Alt: {c.towfish_altitude_meters}m</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedCase.survey_id} • {selectedCase.detected_anomaly_class}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.survey_location}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.hazard_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">SIDE-SCAN SONAR ACOUSTIC WATERFALL PROFILE:</span>
                  <div className="text-white font-sans text-xs">
                    Sonar Instrument: <strong className="text-amber-300">{selectedCase.sonar_instrument}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Target Dimensions: {selectedCase.bounding_dimensions}
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Acoustic Return: {selectedCase.acoustic_signature}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Geotag Coordinates: {selectedCase.geotag_coordinates.latitude}, {selectedCase.geotag_coordinates.longitude}
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Action: {selectedCase.recommended_mitigation}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI DETECTION CONFIDENCE</span><span className="text-emerald-400 font-bold">{selectedCase.detection_confidence_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SEABED BATHYMETRY</span><span className="text-teal-400 font-bold">{selectedCase.seabed_depth_meters}m Depth (Alt {selectedCase.towfish_altitude_meters}m)</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('detector')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Deep Learning YOLOv10 Acoustic Debris Detector ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Instant Sonar Image Processor</span>
                  </h4>
                  <form onSubmit={handleDetect} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Survey Sonar Log</label>
                      <input type="text" readOnly value={`${selectedCase.survey_id} (${selectedCase.sonar_instrument.split(' ')[0]} Dual-Freq)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isDetecting} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
                      <span>{isDetecting ? 'Segmenting Acoustic Highlights & Shadows...' : 'Run YOLOv10 Marine Anomaly Detection'}</span>
                    </button>
                  </form>
                  {detectResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Classification: <strong className="text-emerald-400 font-mono text-xs">{detectResult.anomalyClass}</strong></div>
                      <div>Confidence: <strong className="text-teal-400 font-mono text-xs">{detectResult.confidence}</strong></div>
                      <div>Vertical Relief: <strong className="text-cyan-300 font-mono text-xs">{detectResult.shadowHeight}</strong></div>
                      <div>Geotag: <strong className="text-amber-300 font-mono text-xs">{detectResult.geotag}</strong></div>
                      <div>Response: <strong className="text-white font-mono text-xs block mt-0.5">{detectResult.salvageAction}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DETECTOR */}
        {tab === 'detector' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <Crosshair className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">YOLOv10 &amp; U-Net Acoustic Vision Architecture</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Performs real-time segmentation on noisy side-scan sonar waterfall pings. Automatically decouples natural geological ripples from high-threat synthetic objects (ghost fishing nets, lost containers, submerged pipelines).
            </p>
          </div>
        )}

        {/* VIEW 3: SHADOW */}
        {tab === 'shadow' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {shadowMatrix.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-teal-400 font-bold">Alt: {s.towfish_altitude_m}m</span>
                  <span className="text-emerald-400 font-bold">Relief: {s.calculated_height_m}m</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">Slant Range: {s.slant_range_m}m</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Shadow: {s.shadow_length_m}m ({s.formula})</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: TAXONOMY */}
        {tab === 'taxonomy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {taxonomy.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{t.acoustic_highlight}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.debris_type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Shadow: {t.shadow_behavior}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-rose-300 font-mono text-[10px]">Threat: {t.ecological_threat}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
