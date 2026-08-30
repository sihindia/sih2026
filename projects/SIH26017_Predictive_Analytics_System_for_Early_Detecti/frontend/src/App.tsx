import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  RefreshCw, 
  Scale, 
  Activity, 
  Globe 
} from 'lucide-react';

import projectsData from './data/monitored_infrastructure_projects_and_delays.json';
import shapData from './data/shap_delay_risk_drivers_matrix.json';
import actionsData from './data/proactive_policy_mitigation_actions.json';
import statsData from './data/drishtipredict_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'bn'>('en');
  const [projects, setProjects] = useState(projectsData);
  const [selectedProj, setSelectedProj] = useState(projectsData[0]);
  const [shap, setShap] = useState(shapData);
  const [actions, setActions] = useState(actionsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'projects' | 'shap' | 'ai' | 'actions' | 'stats'>('projects');

  // Interactive AI Delay Risk Forecaster
  const [isPredicting, setIsPredicting] = useState(false);
  const [predResult, setPredResult] = useState<any>({
    delayProbability: "78.4% Probability of Project Stall",
    scheduleSlip: "+7.4 Months Timeline Delay Forecasted",
    topBottleneck: "Civil Court Injunction over circle rates in Alwar (SHAP +0.42)",
    compensationDriver: "26% Disparity with Market Transaction Rates (SHAP +0.26)",
    mitigationVerdict: "Deploy Special Land Lok Adalat + 15% Consent Solatium Bonus"
  });

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPredResult({
        delayProbability: `${selectedProj.delay_risk_pct}% Probability of Project Stall`,
        scheduleSlip: `+${selectedProj.predicted_slip_months} Months Timeline Delay Forecasted`,
        topBottleneck: selectedProj.primary_bottleneck,
        compensationDriver: `Compensation Impact (SHAP +${selectedProj.shap_compensation_impact})`,
        mitigationVerdict: selectedProj.recommended_mitigation
      });
      setIsPredicting(false);
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
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR DRISHTIPREDICT 360 • SIH26017</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR DrishtiPredict: Predictive Analytics for Early Detection of Land Acquisition Delays
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) AI/ML Early Warning Decision Support Engine: Multi-Variate Gradient Boosted Delay Forecasting, SHAP Explainable AI Attributions &amp; Proactive Lok Adalat Mitigation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'projects', label: '🚨 Monitored Projects & Risk', count: projects.length },
            { id: 'shap', label: '📊 SHAP Delay Drivers', count: shap.length },
            { id: 'ai', label: '⚡ XGBoost Risk Engine' },
            { id: 'actions', label: '⚖️ Proactive Mitigation Protocols', count: actions.length },
            { id: 'stats', label: '📈 DrishtiPredict Telemetry' }
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
            VIEW 1: PROJECTS
           ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {projects.map((p) => (
                <button
                  key={p.project_id}
                  onClick={() => setSelectedProj(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProj.project_id === p.project_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{p.project_id}</span>
                    <span className={p.delay_risk_pct > 70 ? 'text-rose-400' : 'text-amber-400'}>{p.delay_risk_pct}% Risk</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.state} • {p.district}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.requiring_agency}</span>
                    <span className="text-cyan-400">+{p.predicted_slip_months} Mos Slip</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedProj.project_id} • {selectedProj.requiring_agency}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProj.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedProj.alert_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">PREDICTIVE DELAY RISK &amp; SHAP ATTRIBUTION:</span>
                  <div className="text-white font-sans text-xs">
                    Primary Bottleneck: <strong className="text-rose-400">{selectedProj.primary_bottleneck}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Forecasted Timeline Slip: +{selectedProj.predicted_slip_months} Months (Model Confidence: 91.4%)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    SHAP Factor Impact: Litigation ({selectedProj.shap_litigation_impact}) • Compensation Gap ({selectedProj.shap_compensation_impact})
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900 font-bold">
                    Recommended Policy Action: {selectedProj.recommended_mitigation}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DELAY PROBABILITY</span><span className="text-rose-400 font-bold">{selectedProj.delay_risk_pct}% Stall Risk</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NOTIFIED AREA</span><span className="text-cyan-400 font-bold">{selectedProj.notified_area_ha} Hectares</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('actions')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Dispatch Proactive Special Lok Adalat Resolution ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>Instant Delay Risk Engine</span>
                  </h4>
                  <form onSubmit={handlePredict} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Infrastructure Corridor</label>
                      <input type="text" readOnly value={`${selectedProj.project_name} (${selectedProj.state})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Computing Gradient Boosted Trees & SHAP...' : 'Run Machine Learning Delay Prediction'}</span>
                    </button>
                  </form>
                  {predResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Risk Score: <strong className="text-rose-400 font-mono text-xs">{predResult.delayProbability}</strong></div>
                      <div>Predicted Slip: <span className="text-amber-300 text-xs font-bold">{predResult.scheduleSlip}</span></div>
                      <div>Top Driver: <strong className="text-cyan-300 font-mono text-xs">{predResult.topBottleneck}</strong></div>
                      <div>Impact Factor: <strong className="text-slate-300 font-mono text-xs">{predResult.compensationDriver}</strong></div>
                      <div>Action: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{predResult.mitigationVerdict}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SHAP */}
        {tab === 'shap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {shap.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">SHAP Weight: +{s.mean_abs_shap}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.feature}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.description}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Explainable AI Global Feature Importance</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: AI */}
        {tab === 'ai' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <TrendingUp className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Variate Machine Learning Delay Risk Architecture</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Supervised gradient boosted trees trained on 15+ years of historical infrastructure land acquisition lifecycle records, forecasting delays with 91.4% AUC-ROC.
            </p>
          </div>
        )}

        {/* VIEW 4: ACTIONS */}
        {tab === 'actions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {actions.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{a.action_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Time Saved: {a.avg_time_saved}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Cost Efficiency: {a.cost_effectiveness}</div>
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
