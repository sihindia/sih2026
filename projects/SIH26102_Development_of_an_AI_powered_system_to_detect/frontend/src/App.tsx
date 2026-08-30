import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Landmark, 
  MapPin, 
  RefreshCw, 
  ShieldAlert, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/mplads_audit_cases.json';
import modelsData from './data/ai_anomaly_detection_models.json';
import telemetryData from './data/esakshi_pfms_fund_telemetry.json';
import statsData from './data/mplads_audit_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [models, setModels] = useState(modelsData);
  const [telemetry, setTelemetry] = useState(telemetryData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'models' | 'fund' | 'map' | 'stats'>('cases');

  // Interactive Project Audit Simulator
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>({
    risk: "CRITICAL FRAUD ALERT (Red Flag)",
    geoCheck: "98.4% Geo-Spatial Overlap with existing PM-AJAY Centre (85m away)",
    sorCheck: "28.5% Cost Inflation above CPWD Schedule of Rates (SoR)",
    action: "Sanction Frozen • Field Inspection Assigned to District Collector"
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        risk: "CRITICAL FRAUD ALERT (Red Flag)",
        geoCheck: "98.4% Geo-Spatial Overlap with existing PM-AJAY Centre (85m away)",
        sorCheck: "28.5% Cost Inflation above CPWD Schedule of Rates (SoR)",
        action: "Sanction Frozen • Field Inspection Assigned to District Collector"
      });
      setIsAuditing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MOSPI • MPLADS-AUDIT 360 AI FRAUD & ANOMALY DETECTION • SIH26102</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSPI MPLADS-Audit: AI System to Detect Anomalies, Fraud & Cost Overruns
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              e-SAKSHI & PFMS Fund Flow Auditing, Geo-Spatial Asset Deduplication & Split-Tendering Collusion Intelligence
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
            { id: 'cases', label: '🚨 MPLADS Audit Cases', count: cases.length },
            { id: 'models', label: '🧠 AI Anomaly Models', count: models.length },
            { id: 'fund', label: '💳 e-SAKSHI & PFMS Flow', count: telemetry.length },
            { id: 'map', label: '🗺️ Constituency Geo Map' },
            { id: 'stats', label: '📊 MPLADS Audit Telemetry' }
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
                  key={c.project_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.project_id === c.project_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.project_id}</span>
                    <span className="text-amber-400">₹{c.sanctioned_amount_lakhs} Lakhs</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.project_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.constituency} • {c.hon_mp_name}</div>
                  <div className="text-[10px] text-rose-400 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.risk_level.split('_')[0]} RISK</span>
                    <span className="text-cyan-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.project_id} • {selectedCase.constituency}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.project_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.risk_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">AI FRAUD / ANOMALY AUDIT TRAIL:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedCase.ai_anomaly_detected}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Action Taken: <strong>{selectedCase.dm_action_taken}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SANCTION AMOUNT</span><span className="text-rose-400 font-bold">₹{selectedCase.sanctioned_amount_lakhs} Lakhs</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SoR RATE INFLATION</span><span className="text-amber-400 font-bold">+{selectedCase.sor_rate_inflation_pct}% vs Benchmark</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('models')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine AI Geo-Spatial & Collusion Neural Networks ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Real-Time Anomaly Auditor</span>
                  </h4>
                  <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Project Name & Constituency</label>
                      <input type="text" readOnly value={`${selectedCase.project_title.slice(0, 45)}...`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isAuditing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                      <span>{isAuditing ? 'Running GIS Buffer & SoR Benchmark Analysis...' : 'Audit MPLADS Project Sanction'}</span>
                    </button>
                  </form>
                  {auditResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Flag: <strong className="text-rose-400 font-mono text-xs">{auditResult.risk}</strong></div>
                      <div>Action: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{auditResult.action}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MODELS */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">ACCURACY: {m.precision_pct}%</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.model_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.algorithm}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: FUND */}
        {activeTab === 'fund' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {telemetry.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{t.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.stream}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Latency: <strong className="text-cyan-400">{t.latency_ms} ms</strong></div>
                  <div>Throughput: <strong className="text-white">{t.daily_tx_volume_cr}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MAP */}
        {activeTab === 'map' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Landmark className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">National 788 Parliamentary Constituency Expenditure Map</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Visualizes real-time fund utilization, unspent balances, and geo-spatial duplicate flags across 543 Lok Sabha and 245 Rajya Sabha constituencies.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
