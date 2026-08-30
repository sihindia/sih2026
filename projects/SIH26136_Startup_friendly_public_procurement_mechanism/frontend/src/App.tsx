import React, { useState } from 'react';
import { 
  Rocket, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  FileCheck, 
  RefreshCw, 
  Scale, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import challengesData from './data/departmental_innovation_challenges.json';
import startupsData from './data/eligible_dpiit_startups_registry.json';
import contractsData from './data/milestone_escrow_contracts.json';
import statsData from './data/procurement_stats.json';

export default function App() {
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [challenges, setChallenges] = useState(challengesData);
  const [selectedChallenge, setSelectedChallenge] = useState(challengesData[0]);
  const [startups, setStartups] = useState(startupsData);
  const [contracts, setContracts] = useState(contractsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'challenges' | 'sandbox' | 'startups' | 'validation' | 'stats'>('challenges');

  // Interactive PoC Scale-Up Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [scaleResult, setScaleResult] = useState<any>({
    audit: "COEP Technological University (96.4% Score)",
    escrow: "₹10.0 Lakhs Released (Final Milestone 3)",
    scaleUp: "₹4.80 Crores Commercial Contract Sanctioned",
    pathway: "Direct State-Wide Scale-Up (Rule 173 GFR Exemption)",
    status: "SCALE_UP_PROCUREMENT_SANCTIONED"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setScaleResult({
        audit: "COEP Technological University (96.4% Score)",
        escrow: "₹10.0 Lakhs Released (Final Milestone 3)",
        scaleUp: "₹4.80 Crores Commercial Contract Sanctioned",
        pathway: "Direct State-Wide Scale-Up (Rule 173 GFR Exemption)",
        status: "SCALE_UP_PROCUREMENT_SANCTIONED"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Rocket className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>GOVERNMENT OF MAHARASHTRA • MAHASTARTUPSANDBOX 360 • SIH26136</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MahaStartupSandbox: Public Innovation Procurement & Controlled Pilot Sandbox
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Outcome-Based Challenges, 90-Day Paid Sandbox PoC Contracts, Third-Party University Audits & Commercial Scale-Up
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'challenges', label: '🚀 Department Innovation Challenges', count: challenges.length },
            { id: 'sandbox', label: '🧪 90-Day Paid Sandbox & Milestones' },
            { id: 'startups', label: '🛡️ Eligible DPIIT Startups', count: startups.length },
            { id: 'validation', label: '🎓 Third-Party Academic Audit', count: contracts.length },
            { id: 'stats', label: '📊 MSInS Procurement Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: CHALLENGES
           ========================================================================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenges.map((c) => (
                <button
                  key={c.challenge_id}
                  onClick={() => setSelectedChallenge(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedChallenge.challenge_id === c.challenge_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{c.challenge_id}</span>
                    <span className="text-emerald-400">₹{c.pilot_grant_inr_lakhs}L Grant (90 Days)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'mr' ? c.title_mr : c.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.department}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Startup: {c.startup_awarded}</span>
                    <span className="text-emerald-400">Scale-Up: ₹{c.scale_up_contract_cr} Cr</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-orange-400 font-bold">{selectedChallenge.challenge_id} • {selectedChallenge.department}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedChallenge.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedChallenge.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-orange-400 block text-[9px] font-bold uppercase">90-DAY SANDBOX ESCROW MILESTONES:</span>
                  <div className="space-y-1.5 font-sans">
                    {selectedChallenge.milestones.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{m.phase} - ₹{m.payout_lakhs} Lakhs</span>
                          <span className="text-slate-400 text-[11px]">{m.deliverable}</span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Statutory Startup Exemptions:</strong> <span className="text-amber-400 font-mono">{selectedChallenge.exemptions_granted.join(' • ')}</span></div>
                  <div><strong>Academic Evaluator:</strong> <span className="text-cyan-300 font-mono">{selectedChallenge.evaluating_body} ({selectedChallenge.pilot_score_pct}% Score)</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('sandbox')}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch 90-Day Paid Sandbox Milestone Tracker ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Commercial Scale-Up Gate</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Innovation Challenge</label>
                      <input type="text" readOnly value={`${selectedChallenge.title} (${selectedChallenge.startup_awarded})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-orange-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Verifying Academic Audit & KPIs...' : 'Sanction Commercial Scale-Up'}</span>
                    </button>
                  </form>
                  {scaleResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Contract: <strong className="text-emerald-400 font-mono text-xs">{scaleResult.scaleUp}</strong></div>
                      <div>Pathway: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{scaleResult.pathway}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-orange-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-orange-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-orange-400 font-bold text-[10px] uppercase">MAHARASHTRA INNOVATION SANDBOX (MSINS)</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Controlled 90-Day Paid PoC Deployment</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Escrow Protected</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Slashes government innovation procurement cycles from <strong>18 months down to 42 days</strong>.</div>
              <div className="text-orange-400 font-bold pt-1 border-t border-slate-900">
                Waives prior turnover and past experience requirements, allowing DPIIT-certified startups to test solutions in real municipal environments.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: STARTUPS */}
        {activeTab === 'startups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {startups.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-orange-400 font-bold">{s.startup_id}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">DPIIT VERIFIED</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{s.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Domain: <strong className="text-white">{s.sector}</strong></div>
                  <div>Patents Filed: <strong className="text-emerald-400">{s.patents}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">MSInS Sandbox Alumni: Yes</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: VALIDATION */}
        {activeTab === 'validation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {contracts.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-bold">{c.contract_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.challenge}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Escrow Custodian: <strong className="text-white">{c.escrow_bank}</strong></div>
                  <div>Disbursed Grant: <strong className="text-emerald-400">₹{c.total_disbursed_lakhs} Lakhs</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Academic Audit: {c.third_party_audit}</div>
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
                <span className="text-2xl font-black text-orange-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
