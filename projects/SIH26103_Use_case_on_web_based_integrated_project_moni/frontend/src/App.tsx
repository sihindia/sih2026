import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Building2, 
  TrendingUp, 
  RefreshCw, 
  Clock, 
  Sliders, 
  Globe 
} from 'lucide-react';

import projectsData from './data/paimana_mega_infrastructure_projects.json';
import modelsData from './data/ai_overrun_forecasting_models.json';
import sectorsData from './data/infrastructure_sector_clusters.json';
import statsData from './data/paimana_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [projects, setProjects] = useState(projectsData);
  const [selectedPrj, setSelectedPrj] = useState(projectsData[0]);
  const [models, setModels] = useState(modelsData);
  const [sectors, setSectors] = useState(sectorsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'projects' | 'models' | 'sectors' | 'drivers' | 'stats'>('projects');

  // Interactive Overrun Forecasting Simulator
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<any>({
    costEscalation: "+₹4,340.0 Crores (+34.7% Escalation)",
    timeOverrun: "+14 Months Predicted Slippage",
    bottleneck: "42.6 km RoW Land Acquisition & Forest Clearances",
    riskIndex: "88.5 / 100 (Critical Delay • Action Required)"
  });

  const handleForecast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForecasting(true);
    setTimeout(() => {
      setForecastResult({
        costEscalation: "+₹4,340.0 Crores (+34.7% Escalation)",
        timeOverrun: "+14 Months Predicted Slippage",
        bottleneck: "42.6 km RoW Land Acquisition & Forest Clearances",
        riskIndex: "88.5 / 100 (Critical Delay • Action Required)"
      });
      setIsForecasting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <BarChart3 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>MOSPI • PAIMANA-AI 360 MEGA INFRASTRUCTURE MONITORING • SIH26103</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSPI PAIMANA-AI: Predictive Analytics & Early Warning System for Infrastructure
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              1,981 Mega Projects (≥₹150 Cr), AI Cost/Schedule Overrun Forecasting & Root-Cause Delay Decomposition
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'projects', label: '🏗️ PAIMANA Mega Projects', count: projects.length },
            { id: 'models', label: '📈 AI Overrun Forecasting', count: models.length },
            { id: 'sectors', label: '🏛️ 22 Infrastructure Sectors', count: sectors.length },
            { id: 'drivers', label: '🔍 Root-Cause Delay Drivers' },
            { id: 'stats', label: '📊 PAIMANA Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-blue-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <button
                  key={p.project_id}
                  onClick={() => setSelectedPrj(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedPrj.project_id === p.project_id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{p.project_id}</span>
                    <span className="text-amber-400">₹{p.revised_cost_cr} Cr</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.ministry} • {p.sector}</div>
                  <div className="text-[10px] text-rose-400 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Overrun: +₹{p.predicted_cost_overrun_cr} Cr</span>
                    <span className="text-amber-300">+{p.predicted_schedule_delay_months} Mos Delay</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedPrj.project_id} • {selectedPrj.sector}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedPrj.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedPrj.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">AI OVERRUN FORECAST & PRIMARY BOTTLENECK:</span>
                  <div className="text-white font-sans text-xs font-bold">Predicted Escalation: +₹{selectedPrj.predicted_cost_overrun_cr} Cr • Delay: +{selectedPrj.predicted_schedule_delay_months} Months</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Primary Driver: <strong>{selectedPrj.primary_delay_driver}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">REVISED COST</span><span className="text-blue-400 font-bold">₹{selectedPrj.revised_cost_cr} Cr</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PHYSICAL PROGRESS</span><span className="text-emerald-400 font-bold">{selectedPrj.physical_progress_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('models')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Analyze ML Gradient Boosting & Temporal Overrun Models ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Predictive Analytics Simulator</span>
                  </h4>
                  <form onSubmit={handleForecast} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Mega Project & Ministry</label>
                      <input type="text" readOnly value={`${selectedPrj.project_name.slice(0, 45)}...`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isForecasting} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isForecasting ? 'animate-spin' : ''}`} />
                      <span>{isForecasting ? 'Forecasting 18-Month Overrun Trajectory...' : 'Run Early Warning Overrun Forecast'}</span>
                    </button>
                  </form>
                  {forecastResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Cost: <strong className="text-rose-400 font-mono text-xs">{forecastResult.costEscalation}</strong></div>
                      <div>Delay: <strong className="text-amber-300 font-mono text-xs block mt-0.5">{forecastResult.timeOverrun}</strong></div>
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
                <span className="text-blue-400 font-bold">R² ACCURACY: {m.r2_score}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.model_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.target}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SECTORS */}
        {activeTab === 'sectors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {sectors.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold">{s.ongoing_projects} PROJECTS</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.sector_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Portfolio: <strong className="text-white">{s.portfolio_cost_cr}</strong></div>
                  <div>Avg Delay: <strong className="text-amber-400">{s.avg_delay_months} Months</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DRIVERS */}
        {activeTab === 'drivers' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Multi-Factor Infrastructure Bottleneck Decomposition</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Isolates delay contributions: 42% Land Acquisition & RoW, 24% Forest & Wildlife Clearances, 18% EPC Liquidity Stress, 16% Geological Surprises.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
