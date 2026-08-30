import React, { useState } from 'react';
import { 
  Thermometer, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/aws_sensor_anomaly_cases.json';
import shapData from './data/shap_lime_explainability_feature_weights.json';
import healthData from './data/aws_sensor_health_predictive_maintenance.json';
import statsData from './data/skyguard_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [shap, setShap] = useState(shapData);
  const [health, setHealth] = useState(healthData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'shap' | 'health' | 'map' | 'stats'>('cases');

  // Interactive Anomaly Quality Control Simulator
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    verdict: "SENSOR_FAULT_ISOLATED (High Confidence 99.4%)",
    shap: "SHAP +0.84 RH Inconsistency (Violates Thermodynamic Physical Bounds)",
    imputed: "Imputed RH: 17.5% (Spatial Kriging Reconstructed)",
    action: "Work Order #AWS-7102 Dispatched: Replace Capacitive Hygrometer"
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        verdict: "SENSOR_FAULT_ISOLATED (High Confidence 99.4%)",
        shap: "SHAP +0.84 RH Inconsistency (Violates Thermodynamic Physical Bounds)",
        imputed: "Imputed RH: 17.5% (Spatial Kriging Reconstructed)",
        action: "Work Order #AWS-7102 Dispatched: Replace Capacitive Hygrometer"
      });
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Thermometer className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>IMD • SKYGUARD AI 360 AWS ANOMALY DETECTION & SELF-HEALING SUITE • SIH26073</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD SkyGuard AI: Intelligent Anomaly Detection for Automatic Weather Stations (AWS)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Tri-Parameter (Temp, Pressure, RH) Real-Time Quality Control, SHAP/LIME Explainable AI & Self-Healing Spatial Kriging Imputation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🌡️ Sensor Telemetry Cases', count: cases.length },
            { id: 'shap', label: '🧠 SHAP Explainability', count: shap.length },
            { id: 'health', label: '🛠️ Sensor Maintenance', count: health.length },
            { id: 'map', label: '🗺️ AWS Network Quality Map' },
            { id: 'stats', label: '📊 SkyGuard AI Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.station_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.station_id === c.station_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.station_id}</span>
                    <span className="text-amber-300">{c.ai_anomaly_verdict.split('_')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.station_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.reported_telemetry.slice(0, 45)}...</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.self_healing_imputed_value.split(' ')[0]}</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.station_id} • {selectedCase.station_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.reported_telemetry}</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">MULTIVARIATE SPATIAL & TEMPORAL AI VERDICT:</span>
                  <div className="text-white font-sans text-xs font-bold">Neighbor Truth: {selectedCase.spatial_neighbor_comparison}</div>
                  <div className="text-amber-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Explainable AI: <strong>{selectedCase.shap_explainability_reasoning}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Self-Healing Imputation: <strong>{selectedCase.self_healing_imputed_value}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Maintenance: {selectedCase.hardware_maintenance_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DETECTION ACCURACY</span><span className="text-emerald-400 font-bold">99.4% Precision</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">RECONSTRUCTION</span><span className="text-rose-400 font-bold">Spatial Kriging GP</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('shap')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine SHAP / LIME Multivariate Feature Weights ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Real-Time Anomaly Inspector</span>
                  </h4>
                  <form onSubmit={handleAnalyze} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">AWS Station Stream</label>
                      <input type="text" readOnly value={`${selectedCase.station_id} (${selectedCase.station_name.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isAnalyzing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span>{isAnalyzing ? 'Running SHAP & Spatial Kriging...' : 'Isolate Anomaly & Impute Data'}</span>
                    </button>
                  </form>
                  {analysisResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Verdict: <strong className="text-amber-300 font-mono text-xs">{analysisResult.verdict}</strong></div>
                      <div>Imputed: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{analysisResult.imputed}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SHAP */}
        {tab === 'shap' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {shap.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">SHAP +{s.shap_importance}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.feature}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.interpretation}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: HEALTH */}
        {tab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {health.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{h.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.component}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Degradation: <strong className="text-rose-400">{h.degradation_pct}%</strong></div>
                  <div className="text-cyan-300 text-[11px] pt-1 border-t border-slate-900">Failure in: {h.predicted_failure_days} Days</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MAP */}
        {tab === 'map' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Nationwide Automatic Weather Station (AWS) Health & Quality GIS Map</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time monitoring of 3,850+ IMD Automatic Weather Stations across Indian topography, visualizing sensor drift heatmaps, missing data rates, and automated work orders.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
