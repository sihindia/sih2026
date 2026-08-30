import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  Home, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  Globe 
} from 'lucide-react';

import proposalsData from './data/land_acquisition_proposals_registry.json';
import stagesData from './data/rfctlarr_act_stages_workflow.json';
import familiesData from './data/displaced_families_resettlement_registry.json';
import statsData from './data/bhoomiacquire_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'bn'>('en');
  const [proposals, setProposals] = useState(proposalsData);
  const [selectedProp, setSelectedProp] = useState(proposalsData[0]);
  const [stages, setStages] = useState(stagesData);
  const [families, setFamilies] = useState(familiesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'proposals' | 'stages' | 'dbt' | 'families' | 'stats'>('proposals');

  // Interactive Direct Benefit Transfer (DBT) & Possession Simulator
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [dbtResult, setDbtResult] = useState<any>({
    disbursedTotal: "₹428.5 Cr Disbursed (95.2% Complete)",
    paymentRail: "PFMS / Aadhaar Payment Bridge (APB) Direct to Bank Account",
    familiesBenefited: "1,820 Affected Families Compensated with 100% Solatium",
    resettlementScheme: "92% R&R Housing Plots Handed Over at Nokha Smart Colony",
    possessionHandover: "Physical Possession Certificate Issued to NHAI Project Director"
  });

  const handleDisburse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisbursing(true);
    setTimeout(() => {
      setDbtResult({
        disbursedTotal: `₹${selectedProp.disbursed_compensation_cr} Cr Disbursed (${selectedProp.disbursed_pct}% Complete)`,
        paymentRail: "PFMS / Aadhaar Payment Bridge (APB) Direct to Bank Account",
        familiesBenefited: `${selectedProp.affected_families_count.toLocaleString()} Families Compensated with Solatium`,
        resettlementScheme: `${selectedProp.randr_completion_pct}% R&R Resettlement Colony Completed`,
        possessionHandover: `Physical Possession Issued to ${selectedProp.requiring_body}`
      });
      setIsDisbursing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR BHOOMIACQUIRE 360 • SIH26016</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR BhoomiAcquire: Real-Time National Land Acquisition &amp; Management System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) NLAMS Portal End-to-End Digital Workflow: Section 11/19 Notifications, Compensation Valuation under RFCTLARR Act 2013, DBT Disbursement &amp; R&amp;R Resettlement
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'proposals', label: '🏗️ National Land Acquisition Corridors', count: proposals.length },
            { id: 'stages', label: '📜 RFCTLARR Act Workflow', count: stages.length },
            { id: 'dbt', label: '💳 Compensation DBT Engine' },
            { id: 'families', label: '🏡 R&R Resettlement Registry', count: families.length },
            { id: 'stats', label: '📊 BhoomiAcquire Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: PROPOSALS
           ========================================================================= */}
        {activeTab === 'proposals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {proposals.map((p) => (
                <button
                  key={p.project_id}
                  onClick={() => setSelectedProp(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProp.project_id === p.project_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{p.project_id}</span>
                    <span className="text-amber-400">{p.disbursed_pct}% Paid</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.state} • {p.district}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.acquired_area_ha}/{p.notified_area_ha} Ha</span>
                    <span className="text-cyan-400">R&amp;R: {p.randr_completion_pct}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedProp.project_id} • {selectedProp.requiring_body}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProp.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedProp.lifecycle_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">LAND ACQUISITION &amp; COMPENSATION METRICS:</span>
                  <div className="text-white font-sans text-xs">
                    Land Acquired: <strong className="text-emerald-300">{selectedProp.acquired_area_ha} Ha of {selectedProp.notified_area_ha} Ha Notified Area</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Compensation Disbursed: ₹{selectedProp.disbursed_compensation_cr} Cr of ₹{selectedProp.assessed_compensation_cr} Cr Assessed ({selectedProp.disbursed_pct}% Disbursed via PFMS)
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Rehabilitation &amp; Resettlement (R&amp;R): {selectedProp.randr_completion_pct}% Completed across {selectedProp.affected_families_count.toLocaleString()} Affected Families
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900 font-bold">
                    Current Statutory Stage: {selectedProp.current_stage}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ACQUIRED LAND</span><span className="text-emerald-400 font-bold">{selectedProp.acquired_area_ha} Hectares</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COMPENSATION PAID</span><span className="text-cyan-400 font-bold">₹{selectedProp.disbursed_compensation_cr} Crores</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('dbt')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Execute Direct Benefit Transfer (DBT) Compensation ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                    <span>Instant DBT Disbursement Gateway</span>
                  </h4>
                  <form onSubmit={handleDisburse} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Infrastructure Corridor</label>
                      <input type="text" readOnly value={`${selectedProp.title} (${selectedProp.state})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isDisbursing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDisbursing ? 'animate-spin' : ''}`} />
                      <span>{isDisbursing ? 'Routing PFMS Aadhaar Payment Bridge...' : 'Disburse RFCTLARR Award via PFMS / DBT'}</span>
                    </button>
                  </form>
                  {dbtResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Disbursed: <strong className="text-emerald-400 font-mono text-xs">{dbtResult.disbursedTotal}</strong></div>
                      <div>Payment Rail: <span className="text-cyan-300 text-xs">{dbtResult.paymentRail}</span></div>
                      <div>Beneficiaries: <strong className="text-white font-mono text-xs">{dbtResult.familiesBenefited}</strong></div>
                      <div>R&amp;R Progress: <strong className="text-amber-300 font-mono text-xs">{dbtResult.resettlementScheme}</strong></div>
                      <div>Possession: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{dbtResult.possessionHandover}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STAGES */}
        {tab === 'stages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {stages.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{s.statute}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.stage_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.description}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Statutory Milestone Tracked in NLAMS</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: DBT */}
        {tab === 'dbt' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <IndianRupee className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">National PFMS Direct Benefit Transfer Compensation Gateway</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated electronic compensation disbursement directly to bank accounts seeded with Aadhaar and 14-digit ULPIN, eliminating middleman leakages and reducing land award litigation by 68%.
            </p>
          </div>
        )}

        {/* VIEW 4: FAMILIES */}
        {tab === 'families' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {families.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{f.family_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.head_of_household} ({f.village})</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Acquired: {f.land_acquired_bigha} Bigha | Paid: {f.compensation_paid}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">R&amp;R: {f.resettlement_plot}</div>
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
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
