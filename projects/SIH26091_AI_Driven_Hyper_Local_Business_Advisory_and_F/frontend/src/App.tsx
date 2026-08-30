import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  Compass, 
  RefreshCw, 
  PieChart, 
  Coins, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

import casesData from './data/rural_micro_enterprise_advisory_cases.json';
import schemesData from './data/concessional_credit_schemes_matrix.json';
import swotData from './data/hyperlocal_swot_competitor_metrics.json';
import statsData from './data/udyamsaathi_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [schemes, setSchemes] = useState(schemesData);
  const [swot, setSwot] = useState(swotData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'calculator' | 'swot' | 'schemes' | 'stats'>('cases');

  // Interactive Financial Calculator & Scheme Router
  const [marginInput, setMarginInput] = useState<number>(100000);
  const [categoryInput, setCategoryInput] = useState<string>("Dairy & Food Value Addition");
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState<any>({
    projectCost: 1000000,
    scheme: "Term Loan Scheme (MoSJE / NSFDC)",
    eligibleLoan: 900000,
    rate: "8.0% p.a.",
    tenure: "7 Years",
    moratorium: "6 Months Moratorium Holiday",
    quarterlyEmi: 42650
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const projectCost = marginInput / 0.10;
      if (projectCost <= 140000) {
        setCalcResult({
          projectCost: projectCost,
          scheme: "Micro Finance Scheme (MoSJE / NBCFDC)",
          eligibleLoan: Math.min(projectCost * 0.90, 125000),
          rate: "6.5% p.a.",
          tenure: "3 Years",
          moratorium: "3 Months Moratorium Holiday",
          quarterlyEmi: 11520
        });
      } else {
        setCalcResult({
          projectCost: projectCost,
          scheme: "Term Loan Scheme (MoSJE / NSFDC)",
          eligibleLoan: Math.min(projectCost * 0.90, 4500000),
          rate: "8.0% p.a.",
          tenure: "7 Years",
          moratorium: "6 Months Moratorium Holiday",
          quarterlyEmi: 42650
        });
      }
      setIsCalculating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Briefcase className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>MOSJE • UDYAMSAATHI 360 RURAL BUSINESS ADVISORY & LOAN STRUCTURING • SIH26091</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE UdyamSaathi: AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              10% Margin to 90% Concessional Loan Calculator with Automated Micro Finance vs Term Loan Scheme Routing and Hyper-Local Feasibility Reports
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '💼 Enterprise Cases', count: cases.length },
            { id: 'calculator', label: '🧮 10% Margin Calculator' },
            { id: 'swot', label: '🔍 Hyperlocal SWOT & Density', count: swot.length },
            { id: 'schemes', label: '📜 Concessional Schemes', count: schemes.length },
            { id: 'stats', label: '📊 UdyamSaathi Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
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
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{c.case_id}</span>
                    <span className="text-emerald-400">Margin: ₹{c.available_margin_inr.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.proposed_business}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.entrepreneur_name}</div>
                  <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Project: ₹{c.calculated_project_cost_inr.toLocaleString()}</span>
                    <span className="text-emerald-400">APPROVED</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedCase.case_id} • {selectedCase.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.proposed_business}</h3>
                  </div>
                  <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.scheme_selected.split(' ')[0]}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">CONCESSIONAL LOAN STRUCTURING & HYPER-LOCAL MARKET INSIGHTS:</span>
                  <div className="text-white font-sans text-xs">
                    Entrepreneur: <strong className="text-purple-400">{selectedCase.entrepreneur_name}</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    10% Margin: <strong>₹{selectedCase.available_margin_inr.toLocaleString()}</strong> ➔ Total Project Cost: <strong>₹{selectedCase.calculated_project_cost_inr.toLocaleString()}</strong> ➔ 90% Loan: <strong className="text-emerald-400">₹{selectedCase.eligible_loan_amount_inr.toLocaleString()}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Terms: {selectedCase.interest_rate_pct}% p.a. | {selectedCase.tenure_years} Years Tenure | {selectedCase.moratorium_months} Months Moratorium | Quarterly EMI: <strong className="text-white">₹{selectedCase.quarterly_emi_inr.toLocaleString()}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Market Catchment: {selectedCase.market_radius_km} | Underserved Demand: {selectedCase.underserved_demand}
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Competitor Density: {selectedCase.competitor_density}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">90% CONCESSIONAL LOAN</span><span className="text-emerald-400 font-bold">₹{selectedCase.eligible_loan_amount_inr.toLocaleString()}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">QUARTERLY EMI (POST-MORATORIUM)</span><span className="text-purple-400 font-bold">₹{selectedCase.quarterly_emi_inr.toLocaleString()}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('calculator')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch 10% Margin to 90% Loan Smart Financial Calculator ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Instant Loan Structuring Engine</span>
                  </h4>
                  <form onSubmit={handleCalculate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Available Margin Money (10%)</label>
                      <input 
                        type="number" 
                        value={marginInput} 
                        onChange={(e) => setMarginInput(Number(e.target.value))}
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" 
                      />
                    </div>
                    <button type="submit" disabled={isCalculating} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                      <span>{isCalculating ? 'Routing Scheme & Calculating EMI...' : 'Structure Concessional Loan'}</span>
                    </button>
                  </form>
                  {calcResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Total Project Cost: <strong className="text-white font-mono text-xs">₹{calcResult.projectCost.toLocaleString()}</strong></div>
                      <div>Scheme Selected: <strong className="text-purple-400 font-mono text-xs">{calcResult.scheme}</strong></div>
                      <div>90% Loan: <strong className="text-emerald-400 font-mono text-xs">₹{calcResult.eligibleLoan.toLocaleString()} @ {calcResult.rate}</strong></div>
                      <div>Repayment: <strong className="text-amber-300 font-mono text-xs block mt-0.5">Quarterly EMI: ₹{calcResult.quarterlyEmi.toLocaleString()} ({calcResult.moratorium})</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CALCULATOR */}
        {tab === 'calculator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-400">
              <Calculator className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Smart Scheme Auto-Selection Router</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automatically maps available margin money (10%) to project costs. Directs units ≤₹1.40 Lakh to Micro Finance (6.5% interest, 3-yr tenure, 3-mo moratorium) and projects from ₹1.40L to ₹50 Lakh to Term Loan Scheme (8.0% interest, 7-yr tenure, 6-mo moratorium).
            </p>
          </div>
        )}

        {/* VIEW 3: SWOT */}
        {tab === 'swot' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {swot.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold uppercase">{s.component}</span>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SCHEMES */}
        {tab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {schemes.map((sc, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold">{sc.cost_ceiling}</span>
                <h4 className="font-bold text-sm text-white font-sans">{sc.scheme_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Loan Limit: <strong className="text-emerald-400">{sc.loan_percentage}</strong></div>
                  <div>Interest: <strong className="text-amber-400">{sc.concessional_interest}</strong></div>
                  <div>Tenure: <strong className="text-white">{sc.repayment_tenure} ({sc.moratorium_period})</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{sc.target_beneficiaries}</div>
                </div>
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
                <span className="text-2xl font-black text-purple-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
