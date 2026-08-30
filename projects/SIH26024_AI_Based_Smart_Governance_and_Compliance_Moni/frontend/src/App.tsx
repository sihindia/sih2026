import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Users, 
  RefreshCw, 
  Activity, 
  FileCheck2, 
  Globe 
} from 'lucide-react';

import minesData from './data/coal_mines_compliance_registry.json';
import inspectionsData from './data/field_inspections_and_violations.json';
import contractorsData from './data/contractor_labour_governance_ledger.json';
import statsData from './data/koilgovernance_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'or' | 'mr'>('en');
  const [mines, setMines] = useState(minesData);
  const [selectedMine, setSelectedMine] = useState(minesData[0]);
  const [inspections, setInspections] = useState(inspectionsData);
  const [contractors, setContractors] = useState(contractorsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'mines' | 'inspections' | 'engine' | 'contractors' | 'stats'>('mines');

  // Interactive Compliance Audit Simulator
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>({
    overallScore: "98.4% Statutory Compliance Index",
    dgmsSafety: "Grade A+ (Exemplary - CMR 2017 Verified)",
    slopeStability: "Highwall Radar: 0.3 mm/hr (Stable Benches)",
    airPollution: "PM10: 84.5 ug/m3 (Permissible under SPCB CTO)",
    labourStandard: "Biometric Attendance: 99.2% | VTC Safety: 100%"
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        overallScore: `${selectedMine.compliance_index_pct}% Statutory Compliance Index`,
        dgmsSafety: selectedMine.dgms_safety_rating,
        slopeStability: `Slope Radar: ${selectedMine.slope_stability_radar_status}`,
        airPollution: `PM10: ${selectedMine.ambient_pm10_ug_m3} ug/m3 (${selectedMine.spcb_cto_status})`,
        labourStandard: `Clearance: ${selectedMine.forest_clearance_stage}`
      });
      setIsAuditing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF COAL • COAL INDIA LIMITED • SIH26024</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KoilGovernance AI: Smart Governance &amp; Compliance Monitoring for Coal Mines
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Coal India Limited (CIL) Statutory E-Governance: DGMS Coal Mines Regulations (CMR 2017), Real-Time Slope Radar Telemetry, Geo-Tagged Mobile Safety Audits &amp; Contractor Labour Verification
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('or')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'or' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ଓଡ଼ିଆ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'mines', label: '🛡️ Coal Mines Compliance Registry', count: mines.length },
            { id: 'inspections', label: '📍 Geo-Tagged Field Audits', count: inspections.length },
            { id: 'engine', label: '⚡ AI Anomaly & Risk Engine' },
            { id: 'contractors', label: '👷 Contractor & Labour Ledger', count: contractors.length },
            { id: 'stats', label: '📊 KoilGovernance Telemetry' }
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
            VIEW 1: MINES
           ========================================================================= */}
        {activeTab === 'mines' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mines.map((m) => (
                <button
                  key={m.mine_id}
                  onClick={() => setSelectedMine(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMine.mine_id === m.mine_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{m.mine_id}</span>
                    <span className="text-cyan-400">{m.compliance_index_pct}% Score</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {m.mine_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{m.area_coalfield} • {m.subsidiary.split(' ')[0]}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{m.dgms_safety_rating.split(' ')[0]}</span>
                    <span className="text-amber-400">PM10: {m.ambient_pm10_ug_m3}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedMine.mine_id} • {selectedMine.subsidiary}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedMine.mine_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMine.governance_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">STATUTORY COMPLIANCE &amp; SAFETY AUDIT:</span>
                  <div className="text-white font-sans text-xs">
                    DGMS Safety Rating: <strong className="text-emerald-400">{selectedMine.dgms_safety_rating}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Slope Stability Radar: {selectedMine.slope_stability_radar_status}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Ambient Air Quality: PM10 {selectedMine.ambient_pm10_ug_m3} ug/m3 | SPCB Consent: {selectedMine.spcb_cto_status}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Forest Clearance Stage: {selectedMine.forest_clearance_stage} | Daily Output: {selectedMine.daily_production_tonnes.toLocaleString()} Tonnes
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COMPLIANCE INDEX</span><span className="text-emerald-400 font-bold">{selectedMine.compliance_index_pct}% Adherence</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DAILY EXTRACTION</span><span className="text-cyan-400 font-bold">{selectedMine.daily_production_tonnes.toLocaleString()} T/Day</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('inspections')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Dispatch Geo-Tagged Safety Inspection ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant Statutory Audit Scanner</span>
                  </h4>
                  <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Mine Project Site</label>
                      <input type="text" readOnly value={`${selectedMine.mine_name} (${selectedMine.subsidiary.split(' ')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isAuditing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                      <span>{isAuditing ? 'Auditing DGMS & SPCB Telemetry Streams...' : 'Execute AI Smart Governance Audit'}</span>
                    </button>
                  </form>
                  {auditResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-emerald-400 font-mono text-xs">{auditResult.overallScore}</strong></div>
                      <div>DGMS: <span className="text-cyan-300 text-xs">{auditResult.dgmsSafety}</span></div>
                      <div>Stability: <strong className="text-amber-300 font-mono text-xs">{auditResult.slopeStability}</strong></div>
                      <div>Environment: <strong className="text-slate-300 font-mono text-xs">{auditResult.airPollution}</strong></div>
                      <div>Clearances: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{auditResult.labourStandard}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INSPECTIONS */}
        {activeTab === 'inspections' && (
          <div className="space-y-4 font-mono text-xs">
            {inspections.map((i, idx) => (
              <div key={idx} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">{i.inspection_id} • {i.geo_coordinates}</span>
                  <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded text-[10px]">{i.urgency}</span>
                </div>
                <h4 className="text-white text-xs font-sans font-bold">{i.mine_name} — {i.inspection_domain}</h4>
                <p className="p-2.5 bg-slate-950 rounded-xl text-slate-300 text-[11px] font-sans">Inspector: {i.inspector_name} | {i.observations}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-sans text-[11px]">
                  Action Required: {i.corrective_action_required}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ENGINE */}
        {activeTab === 'engine' && (
          <div className="p-8 bg-slate-900 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">AI Compliance Anomaly &amp; Recurring Violation Predictor</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Continuous multi-spectral and sensor data analytics correlating ground slope movement radars, continuous ambient air quality stations (CAAQMS), and DGMS inspection tickets to eliminate accident risks.
            </p>
          </div>
        )}

        {/* VIEW 4: CONTRACTORS */}
        {activeTab === 'contractors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {contractors.map((c, idx) => (
              <div key={idx} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">{c.contractor_id}</span>
                  <span className="text-cyan-400 font-bold">{c.active_workers_count} Workers</span>
                </div>
                <h4 className="text-white text-xs font-sans font-bold">{c.firm_name} ({c.mine_site})</h4>
                <p className="text-slate-300 text-[10px]">Biometric: {c.biometric_attendance_pct}% | VTC Safety: {c.vtc_safety_training_pct}%</p>
                <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-300">PPE: {c.ppe_adherence_status}</div>
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
