import React, { useState } from 'react';
import { 
  CreditCard, 
  ShoppingBag, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Sliders, 
  RefreshCw, 
  Activity, 
  DollarSign, 
  Percent, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Flame, 
  Zap, 
  Globe 
} from 'lucide-react';

import sectorsData from './data/tertiary_sectors.json';
import fintechData from './data/fintech_loan_underwriting.json';
import ondcData from './data/ondc_inventory.json';
import hospitalityData from './data/hospitality_rooms.json';
import royaltiesData from './data/creator_royalties.json';

export default function App() {
  const [sectors, setSectors] = useState(sectorsData);
  const [selectedSector, setSelectedSector] = useState(sectorsData[0]);
  const [fintechLoans, setFintechLoans] = useState(fintechData);
  const [ondcItems, setOndcItems] = useState(ondcData);
  const [rooms, setRooms] = useState(hospitalityData);
  const [royalties, setRoyalties] = useState(royaltiesData);
  const [activeTab, setActiveTab] = useState<'fintech' | 'retail' | 'hospitality' | 'creator' | 'analytics'>('fintech');

  // FinTech Underwriting Form State
  const [bizName, setBizName] = useState('Shree Krishna Electronics');
  const [monthlyUPI, setMonthlyUPI] = useState(520000);
  const [reqAmount, setReqAmount] = useState(180000);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [sanctionResult, setSanctionResult] = useState<any>(null);

  // Hospitality Surge State
  const [festSurge, setFestSurge] = useState(true);

  const handleUnderwrite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      const maxEl = Math.round(monthlyUPI * 0.40);
      const sanc = Math.min(reqAmount, maxEl);
      setSanctionResult({
        biz: bizName,
        maxEligible: maxEl,
        sanctioned: sanc,
        rate: 10.5,
        dailyEmi: Math.round((sanc * 1.05) / 180),
        status: "INSTANT_OCEN_SANCTION_APPROVED"
      });
      setIsEvaluating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>AICTE • MIC-STUDENT INNOVATION • OMNITERTIARY 360 PLATFORM • SIH26199</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tertiary Sector Innovation: FinTech, Smart Retail (ONDC), Hospitality & Media
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              OCEN Cashflow Underwriting, Decentralized ONDC Kirana Aggregation, Dynamic Yield AI & Web3 Micro-Royalties
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950/80 border border-emerald-800 rounded-2xl flex items-center gap-2 font-mono text-xs text-emerald-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Services GDP Share: <strong>54.2%</strong></span>
            </div>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'fintech', label: '💳 FinTech & OCEN Cashflow Credit', count: fintechLoans.length },
            { id: 'retail', label: '🛍️ Smart Retail & ONDC Commerce', count: ondcItems.length },
            { id: 'hospitality', label: '🏨 Hospitality & AI Yield Engine', count: rooms.length },
            { id: 'creator', label: '🎬 Creator Economy & Royalties', count: royalties.length },
            { id: 'analytics', label: '📊 Tertiary Sector Macro Hub' }
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
            VIEW 1: FINTECH & OCEN CASHFLOW CREDIT
           ========================================================================= */}
        {activeTab === 'fintech' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Live Underwritten MSME Loans */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex justify-between items-center text-slate-400 px-1">
                  <span>OCEN CASHFLOW UNDERWRITTEN MSME LOANS</span>
                  <span className="text-emerald-400 font-bold">{fintechLoans.length} Loans Sanctioned</span>
                </div>

                <div className="space-y-3">
                  {fintechLoans.map((l) => (
                    <div key={l.application_id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-emerald-400 font-bold text-[10px]">{l.application_id}</span>
                          <h4 className="font-bold text-sm text-white font-sans mt-0.5">{l.business_name}</h4>
                          <p className="text-slate-400 text-[11px] font-sans">Proprietor: {l.proprietor}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                          Score: {l.ai_credit_score}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="p-2.5 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">MONTHLY UPI</span>
                          <span className="text-sm font-bold text-white">₹{l.monthly_upi_turnover_inr.toLocaleString()}</span>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">SANCTIONED</span>
                          <span className="text-sm font-bold text-emerald-400">₹{l.sanctioned_amount_inr.toLocaleString()}</span>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">INTEREST</span>
                          <span className="text-sm font-bold text-cyan-400">{l.interest_rate_pct}% p.a.</span>
                        </div>
                      </div>

                      <div className="text-slate-300 text-[10px] pt-1 border-t border-slate-800/80">
                        Repayment: <strong>{l.repayment_mode}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 6: Instant Loan Underwriting Simulator */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>OCEN Cashflow Underwriting Engine</span>
                </h4>

                <form onSubmit={handleUnderwrite} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">MSME Enterprise / Business Name</label>
                    <input type="text" required value={bizName} onChange={(e) => setBizName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Monthly UPI / QR Inflow (₹)</label>
                    <input type="number" min="10000" max="5000000" required value={monthlyUPI} onChange={(e) => setMonthlyUPI(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Requested Working Capital Loan (₹)</label>
                    <input type="number" min="10000" max="2000000" required value={reqAmount} onChange={(e) => setReqAmount(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                  </div>

                  <button type="submit" disabled={isEvaluating} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                    <span>{isEvaluating ? 'Underwriting via OCEN & AA...' : 'Sanction Instant Cashflow Loan'}</span>
                  </button>
                </form>

                {sanctionResult && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-emerald-300 space-y-2 font-mono text-xs">
                    <div className="font-bold text-white text-sm font-sans flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{sanctionResult.status}</span>
                    </div>
                    <div className="flex justify-between text-slate-300"><span>Sanctioned Amount:</span><strong className="text-emerald-400 text-base">₹{sanctionResult.sanctioned.toLocaleString()}</strong></div>
                    <div className="flex justify-between text-slate-300"><span>Interest Rate:</span><strong>{sanctionResult.rate}% p.a.</strong></div>
                    <div className="flex justify-between text-slate-300"><span>Daily Auto-Debit (UPI AutoPay):</span><strong>₹{sanctionResult.dailyEmi}/day</strong></div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: SMART RETAIL & ONDC OPEN COMMERCE
           ========================================================================= */}
        {activeTab === 'retail' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {ondcItems.map((item) => (
                <div key={item.item_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{item.item_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{item.item_name}</h4>
                      <p className="text-slate-400 text-[11px]">{item.seller_store}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-bold">
                      {item.delivery_eta_mins} Mins ETA
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 text-[10px] block line-through">MRP: ₹{item.base_mrp_inr}</span>
                      <span className="text-emerald-400 font-black text-lg">₹{item.ondc_discounted_price_inr}</span>
                    </div>
                    <button onClick={() => alert(`Added ${item.item_name} to ONDC Open Cart`)} className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Order via ONDC
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SMART HOSPITALITY & AI YIELD ENGINE
           ========================================================================= */}
        {activeTab === 'hospitality' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {rooms.map((r) => (
                <div key={r.room_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{r.room_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{r.hotel_name}</h4>
                      <p className="text-slate-400 text-[11px]">{r.location} • {r.room_type}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-purple-950 text-purple-300 font-bold text-[10px]">
                      {r.occupancy_rate_pct}% Occupancy
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">BASE TARIFF</span>
                      <span className="text-sm font-bold text-slate-400">₹{r.base_tariff_inr}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-emerald-950">
                      <span className="text-emerald-400 block text-[9px] font-bold">AI DYNAMIC YIELD</span>
                      <span className="text-lg font-black text-emerald-400">₹{r.current_ai_dynamic_tariff_inr}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>Demand Driver:</strong> <span className="text-cyan-300">{r.demand_driver}</span></div>
                    <div><strong>Smart BLE Key:</strong> <span className="text-amber-400">{r.keyless_token}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CREATOR ECONOMY & ROYALTIES
           ========================================================================= */}
        {activeTab === 'creator' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-emerald-500/40 pb-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">CREATOR ECONOMY • WEB3 MICRO-ROYALTIES</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Automated Transparent Streaming Royalty Payouts</h3>
              </div>
              <Sparkles className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-3">
              {royalties.map((roy) => (
                <div key={roy.contract_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 font-bold">{roy.contract_id} • {roy.title}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{roy.payout_status}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Artist: {roy.artist_name} • Total Streams: {roy.streams_count.toLocaleString()}</div>
                  <div className="p-3 bg-slate-900 rounded-xl flex justify-between items-center text-white font-bold">
                    <span>Total Disbursed Royalties:</span>
                    <span className="text-emerald-400 text-lg">₹{roy.total_earned_inr.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: MACRO ANALYTICS
           ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">INDIA TERTIARY SECTOR DIGITALIZATION</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Macroeconomic Innovation Breakdown</h4>
            </div>

            <div className="grid grid-cols-2 gap-4 font-sans text-xs">
              {sectorsData.map((s) => (
                <div key={s.sector_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-white">{s.name}</h5>
                    <span className="text-emerald-400 font-mono font-bold text-xs">{s.gdp_share_pct}% GDP</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{s.key_benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
