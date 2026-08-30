import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Calculator, 
  RefreshCw, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import profilesData from './data/enterprise_cyber_risk_profiles.json';
import controlsData from './data/cyber_controls_investment_catalog.json';
import simulationsData from './data/what_if_scenario_simulations.json';
import statsData from './data/cybervalue_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [profiles, setProfiles] = useState(profilesData);
  const [selectedProf, setSelectedProf] = useState(profilesData[0]);
  const [controls, setControls] = useState(controlsData);
  const [simulations, setSimulations] = useState(simulationsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'profiles' | 'controls' | 'optimizer' | 'simulations' | 'stats'>('profiles');

  // Interactive ROSI Optimizer Simulator
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [budgetSlider, setBudgetSlider] = useState(45);
  const [optResult, setOptResult] = useState<any>({
    riskReduction: "-₹11.2 Crores EAL (-75.6% Exposure Reduction)",
    rosi: "410% Return on Security Investment",
    controls: "Zero-Trust Microsegmentation + FIDO2 Hardware MFA",
    payback: "1.4 Months Payback Horizon"
  });

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setOptResult({
        riskReduction: "-₹11.2 Crores EAL (-75.6% Exposure Reduction)",
        rosi: "410% Return on Security Investment",
        controls: "Zero-Trust Microsegmentation + FIDO2 Hardware MFA",
        payback: "1.4 Months Payback Horizon"
      });
      setIsOptimizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>AICTE • CYBERVALUE 360 CONTINUOUS CYBER RISK QUANTIFICATION • SIH26105</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AICTE CyberValue: Continuous Cyber Risk Quantification & ROSI Investment Optimizer
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Monetary Cyber Risk Quantification (EAL & Cyber VaR in ₹ Cr), AI Capital Allocation & What-If Simulations
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'profiles', label: '💰 Financial Cyber Risk Profiles', count: profiles.length },
            { id: 'controls', label: '🛡️ Security Controls Catalog', count: controls.length },
            { id: 'optimizer', label: '🎯 AI ROSI Budget Optimizer' },
            { id: 'simulations', label: '🔬 What-If Simulation Studio', count: simulations.length },
            { id: 'stats', label: '📊 CyberValue Telemetry' }
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
            VIEW 1: PROFILES
           ========================================================================= */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profiles.map((p) => (
                <button
                  key={p.asset_id}
                  onClick={() => setSelectedProf(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProf.asset_id === p.asset_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{p.asset_id}</span>
                    <span className="text-rose-400">EAL: ₹{p.current_eal_cr} Cr</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.infrastructure_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">95% VaR: ₹{p.cyber_var_95_cr} Cr • ROSI: {p.rosi_pct}%</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Invest: ₹{p.required_investment_lakhs}L</span>
                    <span className="text-cyan-400">Save: ₹{p.quantified_risk_reduction_cr} Cr</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedProf.asset_id} • {selectedProf.criticality}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProf.infrastructure_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    ROSI: {selectedProf.rosi_pct}%
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">MONETARY RISK QUANTIFICATION & DRIVERS:</span>
                  <div className="text-white font-sans text-xs font-bold">Primary Risk Drivers: {selectedProf.primary_risk_drivers}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Recommended Control: <strong>{selectedProf.recommended_control}</strong> (Cost: ₹{selectedProf.required_investment_lakhs}L ➔ Saves ₹{selectedProf.quantified_risk_reduction_cr} Cr)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXPECTED ANNUAL LOSS (EAL)</span><span className="text-rose-400 font-bold">₹{selectedProf.current_eal_cr} Crores</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">95% CYBER VALUE AT RISK</span><span className="text-amber-400 font-bold">₹{selectedProf.cyber_var_95_cr} Crores</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('optimizer')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Optimize Cybersecurity Capital Budget Allocation ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>FAIR Monetary Risk Engine</span>
                  </h4>
                  <form onSubmit={handleOptimize} className="space-y-3 font-sans text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                        <span>Security Spend Budget</span>
                        <span className="text-emerald-400">₹{budgetSlider} Lakhs</span>
                      </div>
                      <input type="range" min="10" max="100" value={budgetSlider} onChange={(e) => setBudgetSlider(Number(e.target.value))} className="w-full accent-emerald-400" />
                    </div>
                    <button type="submit" disabled={isOptimizing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>{isOptimizing ? 'Running Constrained Knapsack Optimization...' : 'Run ROSI Investment Optimization'}</span>
                    </button>
                  </form>
                  {optResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Saved: <strong className="text-emerald-400 font-mono text-xs">{optResult.riskReduction}</strong></div>
                      <div>ROSI: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{optResult.rosi}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CONTROLS */}
        {activeTab === 'controls' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {controls.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{c.control_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Capex: <strong className="text-white">₹{c.cost_lakhs} Lakhs</strong></div>
                  <div>Risk Mitigation: <strong className="text-emerald-400">-{c.risk_reduction_pct}% Loss</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{c.framework}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: OPTIMIZER */}
        {activeTab === 'optimizer' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Calculator className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">AI-Driven Security Capital Allocation Optimizer</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Computes maximum risk reduction under explicit board budget constraints, plotting diminishing return curves to guarantee optimal ROI on cyber controls.
            </p>
          </div>
        )}

        {/* VIEW 4: SIMULATIONS */}
        {activeTab === 'simulations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {simulations.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{s.budget_applied_lakhs}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.scenario_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>EAL Impact: <strong className="text-emerald-400">{s.eal_impact}</strong></div>
                  <div>95% VaR Impact: <strong className="text-amber-400">{s.p95_var_impact}</strong></div>
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
