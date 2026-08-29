import React, { useState } from 'react';
import { 
  Truck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  Sparkles, 
  Building2, 
  Scale, 
  ShieldCheck, 
  QrCode, 
  MapPin, 
  RefreshCw, 
  Sliders, 
  FileText, 
  TrendingUp, 
  Printer, 
  ChevronRight, 
  PhoneCall,
  Navigation,
  CheckCircle
} from 'lucide-react';

import centersData from './data/procurement_centers.json';
import tokensData from './data/farmer_tokens.json';
import slotsData from './data/slot_availability.json';
import pricesData from './data/crop_prices.json';
import grievancesData from './data/grievances.json';

export default function App() {
  const [centers, setCenters] = useState(centersData);
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]);
  const [tokens, setTokens] = useState(tokensData);
  const [selectedToken, setSelectedToken] = useState(tokensData[0]);
  const [slots, setSlots] = useState(slotsData);
  
  const [activeTab, setActiveTab] = useState<'queue' | 'wizard' | 'pass' | 'loadbalancer' | 'grievance'>('queue');

  // Booking Wizard Form State
  const [farmerName, setFarmerName] = useState('Balwinder Singh Dhillon');
  const [phone, setPhone] = useState('9876543210');
  const [crop, setCrop] = useState('Wheat (Grade-I FAQ)');
  const [quantity, setQuantity] = useState(150);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM – 11:00 AM');
  const [vehicleNo, setVehicleNo] = useState('PB-10-DF-9912');
  const [bookedPass, setBookedPass] = useState<any>(null);

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const token = {
      token_id: `TOKEN-PUN-2026-${Math.floor(Math.random() * 900 + 100)}`,
      center_id: selectedCenter.center_id,
      mandi_name: selectedCenter.name,
      farmer_name: farmerName,
      farmer_phone_masked: `+91 ${phone.slice(0, 5)} XXXXX`,
      aadhaar_masked: "XXXX-XXXX-9941",
      vehicle_number: vehicleNo,
      commodity: crop,
      quantity_quintals: Number(quantity),
      booking_date: "2026-08-30",
      assigned_slot: selectedSlot,
      assigned_bay: `Weighbridge Bay #${Math.floor(Math.random() * 4 + 1)}`,
      workflow_status: {
        step_1_gate_entry: { completed: false, time: "Upcoming", status: "Slot Booked" },
        step_2_gross_weight: { completed: false, time: "--", weight_kg: 0, status: "Pending" },
        step_3_qc_assaying: { completed: false, time: "--", moisture_pct: 0, status: "Pending" },
        step_4_unloading_tare: { completed: false, time: "--", tare_weight_kg: 0, net_weight_qtl: Number(quantity), status: "Pending" },
        step_5_dbt_payment: { completed: false, time: "--", payout_inr: Number(quantity) * 2275, utr_number: "Pre-Authorized", status: "Ready" }
      },
      current_step: 0,
      turnaround_mins_actual: 0,
      j_form_invoice_no: `JFORM-PUN-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
      qr_token_code: `PASS-DOCA-${Math.floor(Math.random() * 90000 + 10000)}`
    };

    setTokens([token, ...tokens]);
    setSelectedToken(token);
    setBookedPass(token);
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
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) • E-PROCUREMENT PORTAL • SIH26032</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Smart Farmer Slot Booking & Real-Time Mandi Queue Management System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Zero-Congestion Weighbridge Scheduling, Live In-Gate Tracking, Digital Pass QR & Instant J-Form DBT Clearance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Virtual Queue Synced</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'queue', label: '🚚 Live Mandi Queue & Weighbridges', count: tokens.length },
            { id: 'wizard', label: '🎟️ Farmer Slot Booking Wizard' },
            { id: 'pass', label: '📱 Digital Gate Pass & DBT Payout' },
            { id: 'loadbalancer', label: '🗺️ AI Mandi Congestion & Load Balancer', count: centers.length },
            { id: 'grievance', label: '🛡️ Grievance Redressal Desk', count: grievancesData.length }
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
            VIEW 1: LIVE MANDI QUEUE & WEIGHBRIDGE OPERATIONS
           ========================================================================= */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            {/* Center Selector Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🌾 ACTIVE MSP PROCUREMENT MANDIS & TERMINALS</span>
                <span className="text-emerald-400 font-mono">Select Mandi to view live weighbridge queues</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {centers.map((c) => (
                  <button
                    key={c.center_id}
                    onClick={() => setSelectedCenter(c)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedCenter.center_id === c.center_id
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">{c.center_id.split('-')[1]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{c.name.split('(')[0]}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{c.district}, {c.state}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">{c.avg_turnaround_mins}m TAT</span>
                      <span className="text-cyan-300">{c.open_slots_today} Slots</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Active Farmer Tokens in Queue */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400">{selectedCenter.center_id}</span>
                      <h3 className="font-bold text-base text-white mt-0.5">{selectedCenter.name}</h3>
                      <p className="text-xs text-slate-400">Commodity: {selectedCenter.commodities.join(' • ')}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-950 text-cyan-400 border border-slate-800 rounded-xl text-xs font-bold font-mono">
                      {selectedCenter.weighbridge_bays_active} Active Weighbridge Bays
                    </span>
                  </div>

                  {/* Active Tokens Cards */}
                  <div className="space-y-3">
                    {tokens.map((t) => {
                      const isSelected = selectedToken?.token_id === t.token_id;
                      return (
                        <button
                          key={t.token_id}
                          onClick={() => setSelectedToken(t)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all space-y-2 ${
                            isSelected
                              ? 'bg-slate-950 border-emerald-500 shadow-lg ring-1 ring-emerald-400'
                              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-emerald-400">{t.token_id}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 font-mono">
                                  {t.vehicle_number}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-white mt-1">{t.farmer_name}</h4>
                              <div className="text-[11px] text-slate-400 mt-0.5">{t.commodity} • {t.quantity_quintals} Qtl</div>
                            </div>
                            <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              Step {t.current_step}/5 Complete
                            </span>
                          </div>

                          <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] flex justify-between text-slate-300">
                            <span>Slot: <strong className="text-white">{t.assigned_slot}</strong> ({t.assigned_bay})</span>
                            <span className="text-emerald-400 font-bold">{t.workflow_status.step_5_dbt_payment.completed ? 'DBT Transferred' : 'In Processing'}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5: Live 5-Step Procurement Workflow Tracker */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Live Procurement Step Tracker</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      {selectedToken.token_id}
                    </span>
                  </div>

                  {/* 5-Step Process Timeline */}
                  <div className="space-y-3 font-mono text-[11px]">
                    {[
                      { step: 1, name: 'Gate Entry & RFID Verification', data: selectedToken.workflow_status.step_1_gate_entry },
                      { step: 2, name: 'Weighbridge Gross Weight Recording', data: selectedToken.workflow_status.step_2_gross_weight },
                      { step: 3, name: 'Quality Assay & Moisture Testing', data: selectedToken.workflow_status.step_3_qc_assaying },
                      { step: 4, name: 'Silo Unloading & Tare Weight Deduction', data: selectedToken.workflow_status.step_4_unloading_tare },
                      { step: 5, name: 'J-Form Generation & DBT Bank Transfer', data: selectedToken.workflow_status.step_5_dbt_payment }
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                          st.data.completed
                            ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          st.data.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {st.data.completed ? '✓' : st.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white font-sans text-xs">{st.name}</span>
                            <span className="text-[9px] text-slate-400">{st.data.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{st.data.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('pass')}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 transition-all shadow-md"
                    >
                      <span>View Official Digital Pass & DBT Receipt</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: FARMER SLOT BOOKING WIZARD
           ========================================================================= */}
        {activeTab === 'wizard' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>ONLINE FARMER SLOT REGISTRATION WIZARD</span>
              </div>
              <h2 className="text-xl font-black text-white mt-1">Book Guaranteed Weighbridge Delivery Slot</h2>
              <p className="text-xs text-slate-400">Zero physical waiting line. Instant SMS token and allocated weighbridge bay confirmation.</p>
            </div>

            <form onSubmit={handleBookSlot} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Farmer Full Name</label>
                  <input
                    type="text" required value={farmerName} onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Mobile Number (SMS Updates)</label>
                  <input
                    type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Target Mandi / Procurement Center</label>
                  <select
                    value={selectedCenter.center_id}
                    onChange={(e) => {
                      const c = centers.find(x => x.center_id === e.target.value);
                      if (c) setSelectedCenter(c);
                    }}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-sans"
                  >
                    {centers.map((c) => (
                      <option key={c.center_id} value={c.center_id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Crop Commodity to Deliver</label>
                  <select
                    value={crop} onChange={(e) => setCrop(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-sans"
                  >
                    <option>Wheat (Grade-I FAQ MSP)</option>
                    <option>Paddy (Grade-A)</option>
                    <option>Rabi Storage Onion</option>
                    <option>Bengal Gram / Chana</option>
                    <option>Mustard Seed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Estimated Quantity (Quintals)</label>
                  <input
                    type="number" min="10" max="800" required value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Vehicle Registration Number</label>
                  <input
                    type="text" required value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs uppercase"
                  />
                </div>
              </div>

              {/* Slot Grid Selection */}
              <div>
                <label className="text-slate-300 font-bold block mb-2">Select Preferred 1-Hour Time Window</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {slots.map((s) => (
                    <button
                      type="button" key={s.time_slot}
                      onClick={() => setSelectedSlot(s.time_slot)}
                      className={`p-2.5 rounded-xl border text-center text-[10px] transition-all ${
                        selectedSlot === s.time_slot
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div>{s.time_slot.split('–')[0]}</div>
                      <div className="text-[9px] text-slate-500">{s.available} slots open</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans mt-4"
              >
                <QrCode className="w-4 h-4" />
                <span>Confirm Booking & Generate Official Gate Pass</span>
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DIGITAL GATE PASS & DBT INVOICE
           ========================================================================= */}
        {activeTab === 'pass' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-emerald-500/40 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GOVERNMENT OF INDIA • DEPARTMENT OF CONSUMER AFFAIRS (DoCA)</span>
                </div>
                <h2 className="text-2xl font-black text-white font-sans mt-1">Farmer Mandi In-Gate e-Pass</h2>
                <p className="text-slate-400 text-[11px]">E-Procurement Token: {selectedToken.token_id}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <QrCode className="w-12 h-12 text-emerald-400 mx-auto" />
                <span className="text-[9px] text-slate-500 block mt-1">{selectedToken.qr_token_code}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">FARMER BENEFICIARY DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="text-white font-bold font-sans">{selectedToken.farmer_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span>{selectedToken.farmer_phone_masked}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Vehicle:</span><span className="text-cyan-400 font-bold">{selectedToken.vehicle_number}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Delivery Mandi:</span><span className="text-amber-300">{selectedToken.mandi_name}</span></div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold text-[10px] uppercase block">SLOT & WEIGHBRIDGE DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Commodity:</span><span className="text-white font-bold font-sans">{selectedToken.commodity}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Quantity:</span><span className="text-emerald-400 font-bold">{selectedToken.quantity_quintals} Quintals</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Allocated Slot:</span><span className="text-white font-bold">{selectedToken.assigned_slot}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Allocated Bay:</span><span className="text-amber-400 font-bold">{selectedToken.assigned_bay}</span></div>
              </div>
            </div>

            {/* DBT Settlement & J-Form Invoice */}
            <div className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">GOVERNMENT J-FORM INVOICE & DBT SETTLEMENT:</span>
                <div className="text-2xl font-black text-white font-sans mt-1">₹{selectedToken.workflow_status.step_5_dbt_payment.payout_inr.toLocaleString()}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Invoice: {selectedToken.j_form_invoice_no} • Bank UTR: {selectedToken.workflow_status.step_5_dbt_payment.utr_number}</div>
              </div>
              <button
                onClick={() => alert(`Official e-Pass ${selectedToken.token_id} sent to print / download.`)}
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg font-sans"
              >
                <Printer className="w-4 h-4" />
                <span>Print Gate Pass</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: AI MANDI LOAD BALANCER & CONGESTION HEATMAP
           ========================================================================= */}
        {activeTab === 'loadbalancer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {centers.map((c) => {
                const isModerate = c.congestion_status.includes('MODERATE');
                return (
                  <div key={c.center_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold">{c.center_id}</span>
                        <h4 className="font-bold text-sm text-white font-sans mt-0.5">{c.name}</h4>
                        <div className="text-slate-400 text-[11px]">{c.district}, {c.state}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        isModerate ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      }`}>
                        {c.congestion_status.split('_')[0]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2.5 bg-slate-950 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">TRUCKS IN QUEUE</span>
                        <span className="text-white font-bold text-sm">{c.active_queue_trucks}</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">AVG WAIT TIME</span>
                        <span className="text-cyan-400 font-bold text-sm">{c.avg_turnaround_mins} mins</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-[11px]">
                      <span className="text-slate-500 text-[9px] uppercase font-bold block">AI Traffic Recommendation:</span>
                      <p className="text-slate-300 font-sans">{c.nearby_alternate_mandi}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: GRIEVANCE REDRESSAL DESK
           ========================================================================= */}
        {activeTab === 'grievance' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>DoCA Farmer Grievance & Escalation Resolution Desk</span>
                </h3>
                <p className="text-slate-400">Instant on-spot rectification for weighbridge discrepancies and DBT bank transfer queries.</p>
              </div>
            </div>

            <div className="space-y-3">
              {grievancesData.map((g) => (
                <div key={g.ticket_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{g.ticket_id} • {g.mandi_name}</span>
                      <h4 className="font-bold text-white font-sans text-xs mt-0.5">{g.farmer_name} — {g.issue_type}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {g.resolution_status}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl text-slate-300 text-[11px] font-sans">
                    <span className="text-emerald-400 font-bold block mb-0.5">Resolution Action:</span>
                    {g.resolution_note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
