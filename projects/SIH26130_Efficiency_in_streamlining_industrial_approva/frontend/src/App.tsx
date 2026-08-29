import React, { useState } from 'react';
import { 
  Factory, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  FileCheck2, 
  Calendar, 
  RefreshCw, 
  Coins, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import applicationsData from './data/industrial_approval_applications.json';
import inspectionsData from './data/joint_inspection_schedules.json';
import incentivesData from './data/state_industrial_incentives_psi.json';
import statsData from './data/mahaudyog_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [applications, setApplications] = useState(applicationsData);
  const [selectedApp, setSelectedApp] = useState(applicationsData[0]);
  const [inspections, setInspections] = useState(inspectionsData);
  const [incentives, setIncentives] = useState(incentivesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'projects' | 'checklist' | 'inspections' | 'incentives' | 'stats'>('projects');

  // Interactive Project Clearance & Incentive Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>({
    nocs: "5 Mandatory NOCs (MIDC, MPCB, DISH, Fire, MSEDCL)",
    turnaround: "11.5 Days (SLA: 45 Days)",
    subsidy: "₹28.50 Crores (PSI 2019 Scheme)",
    status: "FAST_TRACK_SINGLE_WINDOW_APPROVED"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setEvalResult({
        nocs: "5 Mandatory NOCs (MIDC, MPCB, DISH, Fire, MSEDCL)",
        turnaround: "11.5 Days (SLA: 45 Days)",
        subsidy: "₹28.50 Crores (PSI 2019 Scheme)",
        status: "FAST_TRACK_SINGLE_WINDOW_APPROVED"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Factory className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHAUDYOG 360 SINGLE-WINDOW • SIH26130</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaUdyog: Streamlining Industrial Approvals, Compliance & PSI Incentives
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Dynamic Approval Checklist, Joint Central Inspection Scheduler (CIS) & Package Scheme of Incentives (PSI 2019)
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'projects', label: '🏭 Industrial Projects & Approvals', count: applications.length },
            { id: 'checklist', label: '📋 Dynamic Regulatory Checklist' },
            { id: 'inspections', label: '🔍 Joint Central Inspections', count: inspections.length },
            { id: 'incentives', label: '💰 PSI 2019 Incentives & Subsidies', count: incentives.length },
            { id: 'stats', label: '📊 Maharashtra EoDB Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
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
              {applications.map((app) => (
                <button
                  key={app.project_id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedApp.project_id === app.project_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{app.project_id}</span>
                    <span className="text-emerald-400">{app.actual_turnaround_days} Days (SLA: {app.statutory_sla_days}d)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? app.project_name_mr : app.project_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{app.enterprise} • ₹{app.investment_inr_cr} Cr</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{app.statutory_nocs.length} NOCs Granted</span>
                    <span className="text-emerald-400">PSI: ₹{app.psi_incentive_sanction_cr} Cr Sanctioned</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedApp.project_id} • {selectedApp.enterprise}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedApp.project_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedApp.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">PARALLEL STATUTORY CLEARANCES GRANTED:</span>
                  <div className="space-y-1.5 font-sans">
                    {selectedApp.statutory_nocs.map((n, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-bold text-white block">{n.agency}</span>
                            <span className="text-slate-400 text-[11px]">{n.clearance}</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400">{n.status} ({n.days} Days)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Total Turnaround:</strong> <span className="text-emerald-400 font-mono">{selectedApp.actual_turnaround_days} Days (Statutory SLA: {selectedApp.statutory_sla_days} Days)</span></div>
                  <div><strong>PSI 2019 Incentive Sanction:</strong> <span className="text-amber-400 font-mono">₹{selectedApp.psi_incentive_sanction_cr} Crores Capital Subsidy</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('checklist')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Dynamic Regulatory Checklist Generator ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Industrial Clearance Evaluator</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Project Name</label>
                      <input type="text" readOnly value={selectedApp.project_name} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Evaluating Statutory Clearances...' : 'Evaluate Single-Window Track'}</span>
                    </button>
                  </form>
                  {evalResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Turnaround: <strong className="text-emerald-400 font-mono text-xs">{evalResult.turnaround}</strong></div>
                      <div>Subsidy Sanction: <strong className="text-amber-300 font-mono text-xs block mt-0.5">{evalResult.subsidy}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-indigo-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-indigo-400 font-bold text-[10px] uppercase">DYNAMIC REGULATORY CHECKLIST</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Automotive EV CleanTech Manufacturing Tier</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">5 Clearances Pre-Mapped</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Pre-validates factory layout plans against <strong>MIDC Development Control Regulations</strong>.</div>
              <div className="text-indigo-400 font-bold pt-1 border-t border-slate-900">
                Reuses corporate GSTIN and PAN data, eliminating 70% of manual paper forms.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: INSPECTIONS */}
        {activeTab === 'inspections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {inspections.map((i, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-indigo-400 font-bold">{i.inspection_id}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{i.audit_status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{i.unit}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Date: <strong className="text-white">{i.date}</strong></div>
                  <div>Combined Agencies: <strong className="text-cyan-300">{i.agencies_combined.join(' + ')}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: INCENTIVES */}
        {activeTab === 'incentives' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {incentives.map((inc, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-white font-sans">{inc.zone}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Capital Subsidy: <strong className="text-amber-400 font-mono">{inc.capital_subsidy_pct}%</strong></div>
                  <div>Power Duty Exemption: <strong className="text-emerald-400 font-mono">{inc.electricity_duty_exemption}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">SGST Refund: {inc.sgst_refund_pct}%</div>
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
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
