import React, { useState } from 'react';
import { 
  LineChart, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  CreditCard, 
  MessageSquare, 
  RefreshCw, 
  Trophy, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import traineesData from './data/longitudinal_trainee_outcomes.json';
import epfoData from './data/epfo_payroll_verification_stream.json';
import vtpData from './data/vtp_training_provider_rankings.json';
import statsData from './data/tracer_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [trainees, setTrainees] = useState(traineesData);
  const [selectedTrainee, setSelectedTrainee] = useState(traineesData[0]);
  const [epfoLogs, setEpfoLogs] = useState(epfoData);
  const [vtpRankings, setVtpRankings] = useState(vtpData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cohorts' | 'epfo' | 'survey' | 'vtp' | 'stats'>('cohorts');

  // Interactive EPFO Tracer Simulator
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState<any>({
    employer: "Bharat Forge Ltd (Mundhwa, Pune)",
    salary: "₹19,500 ➔ ₹28,500/month (+46.1%)",
    retention: "14 Months Continuous EPFO Deposits",
    roi: "9.4x Lifetime Skilling Tax Multiplier",
    status: "EPFO_CRYPTOGRAPHICALLY_VERIFIED"
  });

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracing(true);
    setTimeout(() => {
      setTraceResult({
        employer: "Bharat Forge Ltd (Mundhwa, Pune)",
        salary: "₹19,500 ➔ ₹28,500/month (+46.1%)",
        retention: "14 Months Continuous EPFO Deposits",
        roi: "9.4x Lifetime Skilling Tax Multiplier",
        status: "EPFO_CRYPTOGRAPHICALLY_VERIFIED"
      });
      setIsTracing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <LineChart className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHAKOUSHALYATRACER 360 • SIH26135</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaKoushalyaTracer: Longitudinal Skilling Employment Outcomes & Wage Tracer
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Consent-Based Trainee Golden ID, Cryptographic EPFO Payroll Verification & Skilling ROI Impact Analytics
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cohorts', label: '👤 Longitudinal Trainee Cohorts', count: trainees.length },
            { id: 'epfo', label: '💳 EPFO Payroll Verification', count: epfoLogs.length },
            { id: 'survey', label: '💬 WhatsApp Automated Surveys' },
            { id: 'vtp', label: '🏆 VTP & ITI Quality Index', count: vtpRankings.length },
            { id: 'stats', label: '📊 Maharashtra Skilling ROI Telemetry' }
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
            VIEW 1: COHORTS
           ========================================================================= */}
        {activeTab === 'cohorts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trainees.map((t) => (
                <button
                  key={t.trainee_id}
                  onClick={() => setSelectedTrainee(t)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTrainee.trainee_id === t.trainee_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{t.trainee_id}</span>
                    <span className="text-emerald-400">+{t.wage_growth_pct}% Salary Gain</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? t.name_mr : t.name} • <span className="text-amber-300">{t.trade}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{t.employer} • {t.retention_months} Mos Retained</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Initial: ₹{t.initial_salary_pm}/mo</span>
                    <span className="text-emerald-400">Current: ₹{t.current_salary_pm}/mo</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedTrainee.trainee_id} • UAN: {selectedTrainee.epfo_uan}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTrainee.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTrainee.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">LONGITUDINAL CAREER PROGRESSION:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedTrainee.institution} ➔ {selectedTrainee.employer}</div>
                  <div className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Survey: <em>"{selectedTrainee.whatsapp_survey_response}"</em>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WAGE PROGRESSION</span><span className="text-emerald-400 font-bold">₹{selectedTrainee.initial_salary_pm} ➔ ₹{selectedTrainee.current_salary_pm} (+{selectedTrainee.wage_growth_pct}%)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">JOB RETENTION</span><span className="text-cyan-400 font-bold">{selectedTrainee.retention_months} Months Formal Track</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('epfo')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Verify EPFO Payroll & Continuous PF Deposits ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>EPFO Career Tracer</span>
                  </h4>
                  <form onSubmit={handleTrace} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Trainee UAN Number</label>
                      <input type="text" readOnly value={selectedTrainee.epfo_uan} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isTracing} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTracing ? 'animate-spin' : ''}`} />
                      <span>{isTracing ? 'Querying EPFO UAN Registry...' : 'Trace Career Progression'}</span>
                    </button>
                  </form>
                  {traceResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Salary Uplift: <strong className="text-emerald-400 font-mono text-xs">{traceResult.salary}</strong></div>
                      <div>Skilling ROI: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{traceResult.roi}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: EPFO */}
        {activeTab === 'epfo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {epfoLogs.map((log, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-teal-400 font-bold">{log.log_id}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">VERIFIED</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{log.employer}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>UAN: <strong className="text-white font-mono">{log.uan}</strong></div>
                  <div>Last PF Deposit: <strong className="text-emerald-400">{log.last_pf_deposit}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Continuity: {log.continuity_months} Months Formal Track</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SURVEY */}
        {activeTab === 'survey' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-teal-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-teal-400 font-bold text-[10px] uppercase">AUTOMATED WHATSAPP LONGITUDINAL BOT</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">3, 6, 12 & 24-Month Multilingual Candidate Feedback</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">91.4% Response Rate</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Dispatches conversational Marathi and Hindi chat surveys via official government WhatsApp business API.</div>
              <div className="text-teal-400 font-bold pt-1 border-t border-slate-900">
                Captures wage progression, career promotions, and identifies job dropout reasons automatically.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: VTP */}
        {activeTab === 'vtp' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {vtpRankings.map((v, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-teal-400 font-bold">RANK #{v.rank}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{v.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{v.institution}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>12-Month Retention: <strong className="text-emerald-400 font-mono">{v.retention_12m_pct}%</strong></div>
                  <div>Average Wage Growth: <strong className="text-cyan-400 font-mono">+{v.avg_wage_growth_pct}%</strong></div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900">Employer Rating: {v.employer_rating}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
