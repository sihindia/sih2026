import React, { useState } from 'react';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  RefreshCw, 
  Navigation, 
  Layers, 
  DollarSign, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Globe 
} from 'lucide-react';

import complaintsData from './data/cybercrime_complaints.json';
import hotspotsData from './data/predicted_atm_hotspots.json';
import trailsData from './data/mule_trails.json';
import dispatchesData from './data/lea_dispatches.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'gu' | 'kn'>('hi');
  const [complaints, setComplaints] = useState(complaintsData);
  const [selectedComplaint, setSelectedComplaint] = useState(complaintsData[0]);
  const [hotspots, setHotspots] = useState(hotspotsData);
  const [trails, setTrails] = useState(trailsData);
  const [dispatches, setDispatches] = useState(dispatchesData);
  const [activeTab, setActiveTab] = useState<'complaints' | 'heatmap' | 'mule' | 'dispatch' | 'command'>('complaints');

  // Predictive Simulator State
  const [fraudAmt, setFraudAmt] = useState(4200000);
  const [muleCity, setMuleCity] = useState('Surat');
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<any>({
    cluster: "ATM Cluster #SUR-04 (Ring Road Textile Market)",
    probability: 94.2,
    window: "30 to 55 Minutes",
    severity: "CRITICAL_HIGH_VALUE_SIPHON",
    action: "DISPATCH_PCR_QUICK_RESPONSE_AND_FREEZE_NPCI_LIEN"
  });

  const handleForecast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForecasting(true);
    setTimeout(() => {
      const prob = muleCity.includes("Surat") || muleCity.includes("Mewat") ? 94.2 : 84.0;
      setForecastResult({
        cluster: `ATM Cluster #${muleCity.toUpperCase().slice(0,3)}-04 (${muleCity} Central)`,
        probability: prob,
        window: fraudAmt > 1000000 ? "25 to 50 Minutes" : "40 to 65 Minutes",
        severity: "CRITICAL_HIGH_VALUE_SIPHON",
        action: "DISPATCH_PCR_QUICK_RESPONSE_AND_FREEZE_NPCI_LIEN"
      });
      setIsForecasting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <CreditCard className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>MHA • I4C • DHANSURAKSHA 360 CYBERCRIME CASH WITHDRAWAL FORECASTER • SIH26184</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DhanSuraksha 360: Predictive Cash Withdrawal Hotspot & Mule Interception System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              1930 Helpline Real-Time Ingestion, Spatial-Temporal ATM Withdrawal Prediction, Instant Lien & Police Interception Dispatch
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'complaints', label: '🚨 NCRP Complaints & Hotspots', count: complaints.length },
            { id: 'heatmap', label: '🗺️ GIS ATM Risk Heatmap', count: hotspots.length },
            { id: 'mule', label: '🏦 Mule Layering & Instant Lien' },
            { id: 'dispatch', label: '🚔 Police PCR Interception Dispatch', count: dispatches.length },
            { id: 'command', label: '📊 I4C National Recovery Hub' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-rose-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: NCRP COMPLAINTS & HOTSPOTS
           ========================================================================= */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {complaints.map((c) => (
                <button
                  key={c.complaint_id}
                  onClick={() => setSelectedComplaint(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedComplaint.complaint_id === c.complaint_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.complaint_id}</span>
                    <span className="text-amber-300">{c.withdrawal_probability_pct}% Prob</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? c.fraud_category_hi : c.fraud_category}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Siphoned: ₹{(c.siphoned_amount_inr / 100000).toFixed(1)} Lakhs</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{c.victim_location.split(',')[0]}</span>
                    <span>{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Siphon Telemetry & AI Hotspot Prediction */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Incident Telemetry */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedComplaint.complaint_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedComplaint.fraud_category}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedComplaint.victim_location} • Source: {selectedComplaint.portal_source}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedComplaint.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">SIPHONED AMOUNT</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">₹{(selectedComplaint.siphoned_amount_inr / 100000).toFixed(1)} L</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">WITHDRAWAL PROB</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedComplaint.withdrawal_probability_pct}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">CASH-OUT WINDOW</span>
                    <span className="text-sm font-black text-amber-300 mt-2 block">{selectedComplaint.predicted_withdrawal_window}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div>Mule Destination Bank: <strong className="text-white">{selectedComplaint.mule_destination_bank}</strong></div>
                  <div>Predicted ATM Hotspot: <strong className="text-rose-400">{selectedComplaint.predicted_withdrawal_hotspot}</strong></div>
                  <div>Assigned Unit: <span className="text-emerald-400">{selectedComplaint.assigned_lea_unit}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('dispatch')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Dispatch Nearby Police Interception Unit ➔</span>
                </button>
              </div>

              {/* Right 5: AI Spatial Predictor */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Spatial-Temporal Hotspot Forecaster</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      RANDOM FOREST AI
                    </span>
                  </div>

                  <form onSubmit={handleForecast} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Siphoned Fraud Amount (₹)</label>
                      <input type="number" required value={fraudAmt} onChange={(e) => setFraudAmt(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Destination Mule City</label>
                      <input type="text" required value={muleCity} onChange={(e) => setMuleCity(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>

                    <button type="submit" disabled={isForecasting} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isForecasting ? 'animate-spin' : ''}`} />
                      <span>{isForecasting ? 'Predicting ATM Geo-Coordinates...' : 'Forecast Cash-Out Hotspot'}</span>
                    </button>
                  </form>

                  {forecastResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Hotspot:</span><strong className="text-rose-400 font-mono">{forecastResult.cluster}</strong></div>
                      <div className="flex justify-between"><span>Probability:</span><strong className="text-emerald-400 font-mono">{forecastResult.probability}%</strong></div>
                      <div className="flex justify-between"><span>Time Window:</span><span className="text-amber-300 font-mono">{forecastResult.window}</span></div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: GIS ATM RISK HEATMAP
           ========================================================================= */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {hotspots.map((h) => (
                <div key={h.hotspot_id} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{h.hotspot_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{h.kiosk_name}</h4>
                      <p className="text-slate-400 text-[11px]">{h.city}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                      Risk: {h.cash_out_risk_score}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PREDICTED CASH</span><span className="text-white font-bold">₹{(h.predicted_cash_flow_inr / 100000).toFixed(1)} L</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ASSIGNED PCR</span><span className="text-cyan-300 font-bold">{h.assigned_pcr_van.split(' ')[0]}</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PCR ETA</span><span className="text-emerald-400 font-bold">{h.pcr_eta_mins} mins</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-slate-300 text-[11px]">
                    GPS Coordinates: <strong className="text-amber-300">{h.gps_coordinates}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: MULE LAYERING & INSTANT LIEN
           ========================================================================= */}
        {activeTab === 'mule' && (
          <div className="space-y-6 font-mono text-xs">
            {trails.map((t) => (
              <div key={t.trail_id} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 shadow-2xl">
                <div className="border-b border-rose-500/40 pb-3">
                  <span className="text-rose-400 font-bold text-[10px] uppercase">CITIZEN FINANCIAL CYBER FRAUD REPORTING (CFCFRMS)</span>
                  <h4 className="text-lg font-black text-white font-sans mt-0.5">Automated Multi-Tier Mule Account Lien Lock</h4>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                  <div>Layer 1 Primary Mule: <strong className="text-white font-sans">{t.layer_1_mule}</strong></div>
                  <div>Layer 2 Aggregator Mule: <strong className="text-cyan-300 font-sans">{t.layer_2_mule}</strong></div>
                  <div>Layer 3 Target ATM Card: <strong className="text-rose-400 font-mono">{t.layer_3_atm_card}</strong></div>
                  <div className="flex justify-between pt-1 border-t border-slate-900">
                    <span>Lien Hold Placed: <strong className="text-emerald-400 font-sans text-sm">₹{t.lien_placed_inr.toLocaleString()}</strong></span>
                    <span className="text-emerald-300 font-bold">Lien Speed: {t.time_to_freeze_seconds}s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 4: POLICE PCR DISPATCH
           ========================================================================= */}
        {activeTab === 'dispatch' && (
          <div className="space-y-6 font-mono text-xs">
            {dispatches.map((d) => (
              <div key={d.dispatch_id} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-4 max-w-3xl mx-auto">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-rose-400 font-bold text-[10px]">{d.dispatch_id}</span>
                    <h4 className="font-bold text-sm text-white font-sans mt-0.5">{d.pcr_unit}</h4>
                    <p className="text-slate-400 text-[11px]">{d.target_hotspot}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                    {d.cctv_feed_status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Suspect Profile:</strong> {d.suspect_description}</div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono"><strong>Action:</strong> {d.action}</div>
                </div>

                <button onClick={() => alert("PCR Unit Dispatched. Live ATM Cordon Active.")} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Execute On-Site Interception ➔</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 5: I4C NATIONAL RECOVERY HUB
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">INDIAN CYBER CRIME COORDINATION CENTRE (I4C)</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">National Proactive Cyber Recovery & Interception Ledger</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">DAILY NCRP COMPLAINTS</span><span className="text-2xl font-black text-white mt-1 block">8,240</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">FUNDS FROZEN BEFORE CASH-OUT</span><span className="text-2xl font-black text-emerald-400 mt-1 block">₹18.45 Cr</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">AVG PCR INTERCEPTION TIME</span><span className="text-2xl font-black text-cyan-400 mt-1 block">9.4 Mins</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
