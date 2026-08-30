import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Calendar, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Globe 
} from 'lucide-react';

import centersData from './data/mandi_procurement_centers.json';
import tokensData from './data/farmer_tokens_and_queue_status.json';
import slotsData from './data/mandi_time_slots_availability.json';
import grievancesData from './data/farmer_grievance_dispatches.json';
import statsData from './data/kisansetu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'pa' | 'mr' | 'kn'>('en');
  const [centers, setCenters] = useState(centersData);
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]);
  const [tokens, setTokens] = useState(tokensData);
  const [selectedToken, setSelectedToken] = useState(tokensData[0]);
  const [slots, setSlots] = useState(slotsData);
  const [grievances, setGrievances] = useState(grievancesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'queue' | 'wizard' | 'pass' | 'loadbalancer' | 'grievances'>('queue');

  // Wizard Form
  const [wName, setWName] = useState('Balwinder Singh Dhillon');
  const [wPhone, setWPhone] = useState('9876543210');
  const [wCrop, setWCrop] = useState('Wheat (Grade-I FAQ)');
  const [wQtl, setWQtl] = useState(150);
  const [wSlot, setWSlot] = useState('10:00 AM – 11:00 AM');
  const [wVeh, setWVeh] = useState('PB-10-DF-9912');

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newToken = {
      token_id: `TOKEN-GEN-${Math.floor(Math.random() * 900 + 100)}`,
      farmer_name: wName,
      mobile_masked: `+91 ${wPhone.slice(0, 5)} XXXXX`,
      vehicle_number: wVeh,
      crop_name: wCrop,
      quantity_quintals: Number(wQtl),
      allotted_slot: wSlot,
      assigned_bay: "Bay #2",
      gate_entry_status: "Slot Booked Online",
      weighbridge_gross: "Pending In-Gate",
      qc_assessment: "Pre-Certified",
      dbt_payment_status: `₹${(Number(wQtl) * 2275).toLocaleString()} Pre-Authorized`,
      current_step: 1,
      jform_number: `JFORM-PUN-${Math.floor(Math.random() * 90000 + 10000)}`,
      qr_pass_code: `PASS-DOCA-${Math.floor(Math.random() * 90000 + 10000)}`
    };
    setSelectedToken(newToken as any);
    setActiveTab('pass');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Truck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS • E-PROCUREMENT QUEUE • SIH26032</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KisanSetu Queue: Mandi Slot Booking &amp; Real-Time Queue Management
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Agricultural Procurement Platform: Instant Time-Slot Reservation, Virtual Gate Pass with QR Verification, Turn-Around-Time (TAT) Load Balancing &amp; End-to-End J-Form DBT Tracking
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'queue', label: '🚚 Mandi Live Traffic & Queues', count: centers.length },
            { id: 'wizard', label: '📅 Farmer Slot Booking Wizard' },
            { id: 'pass', label: '🎫 Gate Entry Pass & Token Status' },
            { id: 'loadbalancer', label: '⚖️ Intelligent Congestion Balancer' },
            { id: 'grievances', label: '🚨 Grievances & Telemetry', count: grievances.length }
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
            VIEW 1: QUEUE
           ========================================================================= */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {centers.map((c) => (
                <button
                  key={c.center_id}
                  onClick={() => setSelectedCenter(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCenter.center_id === c.center_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{c.center_id}</span>
                    <span className="text-cyan-400">{c.current_truck_queue} In Queue</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.center_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{c.district_state}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>TAT: {c.average_tat_mins}</span>
                    <span className="text-amber-400">{c.available_slots_today} Slots Open</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCenter.center_id} • {selectedCenter.district_state}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCenter.center_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCenter.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">MANDI THROUGHPUT TELEMETRY:</span>
                  <div className="text-white font-sans text-xs">
                    Primary Procurement: <strong className="text-emerald-300">{selectedCenter.primary_crop}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Daily Capacity: {selectedCenter.daily_intake_capacity} across {selectedCenter.active_unloading_bays} Automated Unloading Bays
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Average Turn-Around-Time (TAT): {selectedCenter.average_tat_mins} | Load Balancer Alternative: {selectedCenter.load_balancer_alternative}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CURRENT TRUCK QUEUE</span><span className="text-cyan-400 font-bold">{selectedCenter.current_truck_queue} Vehicles Active</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AVAILABLE SLOTS TODAY</span><span className="text-emerald-400 font-bold">{selectedCenter.available_slots_today} Windows Open</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('wizard')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Book Immediate Harvest Delivery Slot ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Mandi Slot Matrix</span>
                  </h4>
                  <div className="space-y-2">
                    {slots.map((s, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-white font-mono">{s.time_window}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.available_capacity > 5 ? 'bg-emerald-950 text-emerald-300' :
                          s.available_capacity > 0 ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                        }`}>
                          {s.available_capacity > 0 ? `${s.available_capacity} Slots` : 'FULL'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WIZARD */}
        {activeTab === 'wizard' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <h4 className="text-lg font-black text-white font-sans">Farmer Mandi Slot Booking Wizard</h4>
            <form onSubmit={handleWizardSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Farmer Full Name</label>
                  <input type="text" value={wName} onChange={(e) => setWName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" required />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Mobile Number (For SMS/WhatsApp)</label>
                  <input type="text" value={wPhone} onChange={(e) => setWPhone(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Vehicle Reg Number</label>
                  <input type="text" value={wVeh} onChange={(e) => setWVeh(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" required />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Crop Variety</label>
                  <input type="text" value={wCrop} onChange={(e) => setWCrop(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" required />
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Est. Quintals</label>
                  <input type="number" value={wQtl} onChange={(e) => setWQtl(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" required />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Preferred Time Window</label>
                <select value={wSlot} onChange={(e) => setWSlot(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs">
                  {slots.filter(s => s.available_capacity > 0).map((s, idx) => (
                    <option key={idx} value={s.time_window}>{s.time_window} ({s.available_capacity} slots available)</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                Generate Instant Gate QR Pass &amp; Book Token
              </button>
            </form>
          </div>
        )}

        {/* VIEW 3: PASS */}
        {activeTab === 'pass' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-emerald-500/40 pb-3">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">E-PROCUREMENT MANDI TOKEN &amp; GATE PASS</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">{(selectedToken as any).token_id || (selectedToken as any).id}</h4>
              </div>
              <QrCode className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300 text-xs">
              <div>Farmer: <strong className="text-white font-bold">{(selectedToken as any).farmer_name || (selectedToken as any).farmer}</strong></div>
              <div>Vehicle: <strong className="text-cyan-400 font-bold">{(selectedToken as any).vehicle_number || (selectedToken as any).vehicle}</strong></div>
              <div>Slot: <strong className="text-amber-400 font-bold">{(selectedToken as any).allotted_slot || (selectedToken as any).slot}</strong></div>
              <div>Bay: <strong className="text-emerald-400 font-bold">{(selectedToken as any).assigned_bay || (selectedToken as any).bay}</strong></div>
              <div>Quantity: <strong className="text-white font-bold">{(selectedToken as any).quantity_quintals || (selectedToken as any).qtl} Qtl</strong></div>
              <div>Payment: <strong className="text-emerald-400 font-bold">{(selectedToken as any).dbt_payment_status || (selectedToken as any).dbt}</strong></div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center font-sans text-xs text-slate-400">
              Show this digital QR code at Mandi Gate Scanner for zero-waiting priority admission.
            </div>
          </div>
        )}

        {/* VIEW 4: LOAD BALANCER */}
        {activeTab === 'loadbalancer' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Truck className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Dynamic Mandi Load Balancing &amp; Traffic Diversion</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated geo-fenced congestion balancer rerouting arriving harvest vehicles to nearby secondary APMCs with zero wait times and guaranteed equal MSP pricing.
            </p>
          </div>
        )}

        {/* VIEW 5: GRIEVANCES */}
        {activeTab === 'grievances' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-3">
              {grievances.map((g: any) => (
                <div key={g.ticket_id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 font-bold">{g.ticket_id} • {g.mandi}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{g.status}</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">Farmer: {g.farmer} | Issue: {g.issue}</p>
                  <div className="text-cyan-300 text-[10px] pt-1 border-t border-slate-800">Resolution: {g.resolution_notes}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 text-center">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
