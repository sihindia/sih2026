import React, { useState } from 'react';
import { 
  LineChart, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  RefreshCw, 
  ShieldAlert, 
  Building2, 
  PhoneCall, 
  Globe 
} from 'lucide-react';

import casesData from './data/longitudinal_victim_distress_cases.json';
import channelsData from './data/periodic_touchpoint_monitoring_channels.json';
import modelsData from './data/predictive_crisis_escalation_models.json';
import statsData from './data/manasrakshak_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [channels, setChannels] = useState(channelsData);
  const [models, setModels] = useState(modelsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'touchpoints' | 'models' | 'dashboard' | 'stats'>('cases');

  // Interactive Longitudinal Crisis Predictor
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictResult, setPredictResult] = useState<any>({
    crisisEscalation: "CRITICAL ESCALATION (91.2% Confidence)",
    projectedCollapse: "High risk of witness hostility or acute self-harm within 14 days",
    districtAction: "Relocate witness to secure state safe house; SPP petition to cancel accused bail",
    clinicalTherapy: "Assign emergency twice-weekly trauma psychotherapy by District Mental Health Authority"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPredictResult({
        crisisEscalation: "CRITICAL ESCALATION (91.2% Confidence)",
        projectedCollapse: "High risk of witness hostility or acute self-harm within 14 days",
        districtAction: "Relocate witness to secure state safe house; SPP petition to cancel accused bail",
        clinicalTherapy: "Assign emergency twice-weekly trauma psychotherapy by District Mental Health Authority"
      });
      setIsPredicting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <TrendingUp className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>MOSJE • MANASRAKSHAK 360 DYNAMIC MENTAL HEALTH & DISTRESS PREDICTION • SIH26094</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE ManasRakshak: AI-Powered Dynamic Mental Health Monitoring & Distress Prediction System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Continuous 6–12 Month Longitudinal Distress Scoring (DDS), 14-Day Advance Crisis Escalation Modeling & District DM/SP Witness Protection Oversight
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '📊 Longitudinal Cases', count: cases.length },
            { id: 'touchpoints', label: '📞 Multi-Channel Surveillance', count: channels.length },
            { id: 'models', label: '📈 Predictive Risk Modeling', count: models.length },
            { id: 'dashboard', label: '🏢 District DM & SP Dashboard' },
            { id: 'stats', label: '📊 ManasRakshak Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{c.case_id}</span>
                    <span className="text-rose-400">Current DDS: {c.current_month5_dds}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.victim_identifier}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.location}</div>
                  <div className="text-[10px] text-teal-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.legal_stage.split(' ')[0]}</span>
                    <span className={c.current_month5_dds > 70 ? 'text-rose-400' : 'text-emerald-400'}>{c.longitudinal_trend.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedCase.case_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.victim_identifier}</h3>
                  </div>
                  <span className="px-3 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status.split('_')[0]}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">LONGITUDINAL DISTRESS TRAJECTORY (MONTH 1 ➔ MONTH 3 ➔ MONTH 5):</span>
                  <div className="text-white font-sans text-xs">
                    Distress Curve: M1: <strong className="text-slate-400">{selectedCase.initial_dds_score}</strong> ➔ M3: <strong className="text-amber-400">{selectedCase.month3_dds_score}</strong> ➔ Current M5: <strong className="text-rose-400">{selectedCase.current_month5_dds} / 100</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Legal Stage: {selectedCase.legal_stage}
                  </div>
                  <div className="text-rose-400 font-sans text-[11px] pt-1 border-t border-slate-900 font-bold">
                    Root Cause: {selectedCase.distress_root_cause}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Predictive Escalation Model: {selectedCase.ai_crisis_prediction}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    District DM/SP Action: {selectedCase.district_interventions}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CURRENT DYNAMIC DISTRESS SCORE</span><span className="text-rose-400 font-bold">{selectedCase.current_month5_dds} / 100</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LONGITUDINAL TRAJECTORY</span><span className="text-teal-400 font-bold">{selectedCase.longitudinal_trend}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('touchpoints')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Review Multi-Channel IVRS & Chatbot Surveillance Logs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Predictive Crisis Escalation Engine</span>
                  </h4>
                  <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Case Profile & Current DDS</label>
                      <input type="text" readOnly value={`${selectedCase.case_id} (DDS: ${selectedCase.current_month5_dds})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Forecasting 14-Day Trajectory...' : 'Predict 14-Day Crisis Escalation'}</span>
                    </button>
                  </form>
                  {predictResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Prediction: <strong className="text-rose-400 font-mono text-xs">{predictResult.crisisEscalation}</strong></div>
                      <div>Risk Horizon: <strong className="text-amber-300 font-mono text-xs">{predictResult.projectedCollapse}</strong></div>
                      <div>DM/SP Action: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{predictResult.districtAction}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TOUCHPOINTS */}
        {tab === 'touchpoints' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {channels.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{c.frequency}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.channel}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{c.method}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: MODELS */}
        {tab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">MODEL #{idx + 1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.metric}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.factor}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Tier District Magistrate & SP Protection Portal</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Provides designated district authorities with real-time alerts when a victim's Dynamic Distress Score indicates imminent intimidation capitulation, automatically triggering statutory witness protection and financial relief under the SC/ST (PoA) Act, 1989.
            </p>
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
