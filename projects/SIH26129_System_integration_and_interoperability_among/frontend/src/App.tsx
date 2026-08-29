import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Share2, 
  Link2, 
  RefreshCw, 
  Clock, 
  UserCheck, 
  Sliders, 
  Globe 
} from 'lucide-react';

import servicesData from './data/interoperable_citizen_services.json';
import connectorsData from './data/departmental_connectors_mesh.json';
import recordsData from './data/master_citizen_golden_records.json';
import statsData from './data/mahasetu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [services, setServices] = useState(servicesData);
  const [selectedService, setSelectedService] = useState(servicesData[0]);
  const [connectors, setConnectors] = useState(connectorsData);
  const [records, setRecords] = useState(recordsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'services' | 'connectors' | 'golden' | 'workflow' | 'stats'>('services');

  // Interactive Multi-Department Workflow Orchestrator
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchResult, setOrchResult] = useState<any>({
    docsSaved: 6,
    turnaround: "2.5 Days (Statutory SLA: 15 Days)",
    depts: "Mahabhulekh ➔ MahaDBT ➔ MSEDCL ➔ MEDA",
    status: "CROSS_DEPARTMENT_PARALLEL_APPROVED"
  });

  const handleOrchestrate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrchestrating(true);
    setTimeout(() => {
      setOrchResult({
        docsSaved: 6,
        turnaround: "2.5 Days (Statutory SLA: 15 Days)",
        depts: "Mahabhulekh ➔ MahaDBT ➔ MSEDCL ➔ MEDA",
        status: "CROSS_DEPARTMENT_PARALLEL_APPROVED"
      });
      setIsOrchestrating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHASETU 360 INTEROPERABILITY • SIH26129</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaSetu: Federated Digital Interoperability & Unified Citizen Service Mesh
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Cross-Department API Mesh (Mahabhulekh, Vahan, MahaDBT), Consent-Driven Golden Citizen Profile & Unified Workflow
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'services', label: '🏛️ Unified Citizen Services', count: services.length },
            { id: 'connectors', label: '🔗 Departmental API Mesh', count: connectors.length },
            { id: 'golden', label: '👤 Golden Citizen Records' },
            { id: 'workflow', label: '⚡ Parallel Workflow Orchestration' },
            { id: 'stats', label: '📊 MahaSetu Governance Telemetry' }
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
            VIEW 1: SERVICES
           ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.application_id}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedService.application_id === s.application_id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{s.application_id}</span>
                    <span className="text-emerald-400">{s.sla_days_actual} Days (SLA: {s.sla_days_statutory}d)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? s.service_title_mr : s.service_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.citizen_name} • {s.district}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{s.departments_orchestrated.length} Depts Orchestrated</span>
                    <span className="text-emerald-400">{s.documents_saved_count} Documents Saved</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedService.application_id} • {selectedService.citizen_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedService.service_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedService.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">FEDERATED CROSS-DEPARTMENT PIPELINE:</span>
                  <div className="space-y-1.5 font-sans">
                    {selectedService.workflow_pipeline.map((p) => (
                      <div key={p.step} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-mono text-blue-400 font-bold">#{p.step}</span>
                          <div>
                            <span className="font-bold text-white block">{p.dept}</span>
                            <span className="text-slate-400 text-[11px]">{p.action}</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400">{p.status} ({p.time_taken})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Actual Turnaround:</strong> <span className="text-emerald-400 font-mono">{selectedService.sla_days_actual} Days (Statutory SLA: {selectedService.sla_days_statutory} Days)</span></div>
                  <div><strong>Citizen Duplicate Burden Saved:</strong> <span className="text-cyan-300 font-mono">{selectedService.documents_saved_count} Physical Certificates</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('connectors')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Departmental API Connectors Mesh ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Cross-Portal Orchestration Engine</span>
                  </h4>
                  <form onSubmit={handleOrchestrate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Service Application ID</label>
                      <input type="text" readOnly value={selectedService.application_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isOrchestrating} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOrchestrating ? 'animate-spin' : ''}`} />
                      <span>{isOrchestrating ? 'Orchestrating State Departments...' : 'Execute Parallel Clearance'}</span>
                    </button>
                  </form>
                  {orchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Turnaround: <strong className="text-emerald-400 font-mono text-xs">{orchResult.turnaround}</strong></div>
                      <div>Route: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{orchResult.depts}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CONNECTORS */}
        {activeTab === 'connectors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {connectors.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-blue-400 font-bold">{c.dept_code}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{c.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{c.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>API Protocol: <strong className="text-white">{c.protocol}</strong></div>
                  <div>Latency: <strong className="text-emerald-400">{c.avg_latency_ms} ms</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Uptime: {c.uptime_pct}% SLA</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: GOLDEN */}
        {activeTab === 'golden' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-blue-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-blue-400 font-bold text-[10px] uppercase">CONSENT-BASED CITIZEN MASTER RECORD</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Golden Citizen Profile: MAHA-UID-881245</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">DigiLocker Verified</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Land Holdings: <strong className="text-white font-mono">4.2 Acres (Mahabhulekh 7/12 Survey #142)</strong></div>
              <div>Domicile Status: <strong className="text-emerald-400 font-mono">Maharashtra Verified (e-Pramaan SSO)</strong></div>
              <div>Caste Validity: <strong className="text-cyan-300 font-mono">OBC-2021-994 (Social Justice Dept)</strong></div>
            </div>
          </div>
        )}

        {/* VIEW 4: WORKFLOW */}
        {activeTab === 'workflow' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <Share2 className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Parallel Cross-Department Clearance Active</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Simultaneous automated verification across Revenue, MSEDCL, and MahaDBT reduces citizen application processing from 15 days to 2.5 days.
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
