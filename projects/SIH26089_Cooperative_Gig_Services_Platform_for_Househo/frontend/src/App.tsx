import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Building2, 
  Layers, 
  Globe 
} from 'lucide-react';

import casesData from './data/cooperative_gig_bookings_cases.json';
import societiesData from './data/labour_cooperative_societies_registry.json';
import welfareData from './data/worker_welfare_insurance_fund.json';
import statsData from './data/sahakargig_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [societies, setSocieties] = useState(societiesData);
  const [welfare, setWelfare] = useState(welfareData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'societies' | 'welfare' | 'dispatch' | 'stats'>('cases');

  // Interactive Cooperative Booking Simulator
  const [isBooking, setIsBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>({
    assignedWorker: "Santosh V. More (NCCT Certified Master Electrician)",
    society: "Dharavi Labour Cooperative Federation Ltd.",
    eta: "25 Minutes Doorstep Arrival",
    fairWage: "₹615 directly to Worker + ₹35 to Welfare & Accident Fund",
    zeroCommission: "₹0.00 Deductions (Corporate gig apps charge ₹530 commission!)"
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setBookingResult({
        assignedWorker: "Santosh V. More (NCCT Certified Master Electrician)",
        society: "Dharavi Labour Cooperative Federation Ltd.",
        eta: "25 Minutes Doorstep Arrival",
        fairWage: "₹615 directly to Worker + ₹35 to Welfare & Accident Fund",
        zeroCommission: "₹0.00 Deductions (Corporate gig apps charge ₹530 commission!)"
      });
      setIsBooking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <Users className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>MINISTRY OF COOPERATION • NCCT • SAHAKARGIG 360 COOPERATIVE SERVICES • SIH26089</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SahakarGig: Cooperative Gig Services Platform for Household & Community Services
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Empowering Labour Cooperative Federations to Provide Verified Home Services with 0% Corporate Commission Exploitation, Fair Living Wages & Social Security
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🛠️ Service Bookings', count: cases.length },
            { id: 'societies', label: '🏛️ Co-op Registry', count: societies.length },
            { id: 'welfare', label: '🛡️ Fair Wages & Welfare', count: welfare.length },
            { id: 'dispatch', label: '📍 Geo-Spatial Dispatch' },
            { id: 'stats', label: '📊 SahakarGig Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.booking_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.booking_id === c.booking_id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{c.booking_id}</span>
                    <span className="text-emerald-400">₹{c.customer_paid_inr} Total</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.service_category}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.worker_name}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Worker: ₹{c.worker_received_inr}</span>
                    <span className="text-blue-400">ETA: {c.eta_minutes}m</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedCase.booking_id} • {selectedCase.customer_locality}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.service_category}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">COOPERATIVE MEMBER DISPATCH & LIVING WAGE DISTRIBUTION:</span>
                  <div className="text-white font-sans text-xs">
                    Assigned Member: <strong className="text-blue-400">{selectedCase.worker_name}</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Labour Cooperative: {selectedCase.cooperative_society}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Transparent Payout: Worker receives <strong className="text-white">₹{selectedCase.worker_received_inr} (95%)</strong> + Welfare Contribution: <strong>₹{selectedCase.welfare_fund_inr} (5%)</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Anti-Exploitation Proof: {selectedCase.private_platform_comparison}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WORKER DIRECT EARNING</span><span className="text-emerald-400 font-bold">₹{selectedCase.worker_received_inr}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DOORSTEP ARRIVAL TIME</span><span className="text-blue-400 font-bold">{selectedCase.eta_minutes} Minutes</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('societies')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View Certified Labour Cooperative Societies Registry ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Instant Cooperative Booking Engine</span>
                  </h4>
                  <form onSubmit={handleBook} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Service & Locality</label>
                      <input type="text" readOnly value={`${selectedCase.service_category} (${selectedCase.customer_locality})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isBooking} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isBooking ? 'animate-spin' : ''}`} />
                      <span>{isBooking ? 'Matching Nearest Co-op Member...' : 'Book Cooperative Professional'}</span>
                    </button>
                  </form>
                  {bookingResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Assigned: <strong className="text-blue-400 font-mono text-xs">{bookingResult.assignedWorker}</strong></div>
                      <div>Payout: <strong className="text-emerald-400 font-mono text-xs">{bookingResult.fairWage}</strong></div>
                      <div>Zero Commission: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{bookingResult.zeroCommission}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SOCIETIES */}
        {tab === 'societies' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {societies.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold">{s.location}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Verified Members: <strong className="text-emerald-400">{s.members.toLocaleString()}</strong></div>
                  <div>Skills: <span className="text-slate-400 text-xs">{s.skills}</span></div>
                  <div className="text-amber-400 text-[11px] pt-1 border-t border-slate-900">{s.cert_body}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: WELFARE */}
        {tab === 'welfare' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {welfare.map((w, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">PILLAR #{idx + 1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{w.pillar}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{w.details}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DISPATCH */}
        {tab === 'dispatch' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Geo-Spatial 3–5 km Hyperlocal Co-op Dispatch</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Matches customer emergency service calls directly with cooperative members residing in the immediate ward, minimizing commute times to under 30 minutes while ensuring 100% police and cooperative verification.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
