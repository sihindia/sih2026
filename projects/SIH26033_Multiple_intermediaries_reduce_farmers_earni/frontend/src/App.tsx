import React, { useState } from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  QrCode, 
  Sliders, 
  DollarSign, 
  RefreshCw, 
  Scale, 
  MapPin, 
  ChevronRight, 
  Printer, 
  Calendar, 
  CreditCard,
  Droplet,
  PackageCheck,
  Percent
} from 'lucide-react';

import fpoListingsData from './data/fpo_listings.json';
import buyerOrdersData from './data/buyer_orders.json';
import demandData from './data/demand_forecasts.json';
import routesData from './data/logistics_routes.json';
import arbitrageData from './data/arbitrage_index.json';

export default function App() {
  const [listings, setListings] = useState(fpoListingsData);
  const [selectedListing, setSelectedListing] = useState(fpoListingsData[0]);
  const [orders, setOrders] = useState(buyerOrdersData);
  const [selectedOrder, setSelectedOrder] = useState(buyerOrdersData[0]);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'arbitrage' | 'demand' | 'logistics' | 'escrow'>('marketplace');

  // Direct Contract Order Form State
  const [buyerName, setBuyerName] = useState('Delhi NCR Bulk Consumer Collective');
  const [orderQty, setOrderQty] = useState(25);
  const [destCity, setDestCity] = useState('Delhi-NCR Central Hub');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const totalVal = selectedListing.consumer_direct_price_per_qtl * orderQty;
    const newOrd = {
      order_id: `ORD-GEN-2026-${Math.floor(Math.random() * 900 + 100)}`,
      buyer_name: buyerName,
      buyer_type: "Bulk Consumer Cooperative",
      destination_city: destCity,
      ordered_commodity: selectedListing.commodity,
      ordered_quantity_qtl: Number(orderQty),
      total_order_value_inr: totalVal,
      fpo_assigned: selectedListing.fpo_name,
      escrow_payment_status: "ESCROW_LOCKED_100_PCT",
      logistics_status: "REEFER_VAN_DISPATCHED (Cold Chain #402)",
      estimated_delivery: "2026-08-30 08:30 AM"
    };

    setOrders([newOrd, ...orders]);
    setSelectedOrder(newOrd);
    setConfirmedOrder(newOrd);
    setActiveTab('escrow');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <ShoppingBag className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) • KISAN D2C & B2B DIRECT MARKETPLACE • SIH26033</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Direct Farmer-to-Consumer / FPO Digital Marketplace & AI Logistics Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Middlemen Disintermediation (+158% Farmer Earnings, -24% Consumer Prices), AI Urban Demand Forecasting & Smart Escrow
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Direct Trade Engine Active</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'marketplace', label: '🌾 Direct FPO Marketplace & Trade', count: listings.length },
            { id: 'arbitrage', label: '📉 Middlemen Elimination & Arbitrage' },
            { id: 'demand', label: '🧠 AI Urban Demand Forecasting', count: demandData.length },
            { id: 'logistics', label: '🚚 Farmgate Logistics & Cold Chain', count: routesData.length },
            { id: 'escrow', label: '💳 Escrow Smart Contract & PoD', count: orders.length }
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
            VIEW 1: DIRECT FPO MARKETPLACE & TRADE
           ========================================================================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* FPO Listings Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🌱 VERIFIED FARMER PRODUCER ORGANIZATIONS (FPOS) READY FOR DIRECT DISPATCH</span>
                <span className="text-emerald-400 font-mono">Select FPO to contract direct batches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {listings.map((l) => (
                  <button
                    key={l.listing_id}
                    onClick={() => setSelectedListing(l)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedListing.listing_id === l.listing_id
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">{l.listing_id.split('-')[2]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{l.fpo_name}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{l.commodity.split('(')[0]}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">₹{l.consumer_direct_price_per_qtl}/Qtl</span>
                      <span className="text-cyan-300">Save {l.consumer_savings_pct}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Selected FPO Commodity Details & Pricing Comparison */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400">{selectedListing.listing_id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 font-mono">
                          {selectedListing.member_farmers_count} Member Farmers
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{selectedListing.commodity}</h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedListing.fpo_name} • {selectedListing.district}, {selectedListing.state}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      {selectedListing.available_quantity_mt} MT In Stock
                    </span>
                  </div>

                  {/* Pricing Comparison Bar */}
                  <div className="grid grid-cols-3 gap-3 text-center font-mono">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Farmgate Payout</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">₹{selectedListing.farmgate_price_per_qtl}</span>
                      <span className="text-[9px] text-emerald-300 block mt-0.5">{selectedListing.farmer_share_pct}% Direct Share</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Direct Buyer Price</span>
                      <span className="text-2xl font-black text-cyan-400 mt-1 block">₹{selectedListing.consumer_direct_price_per_qtl}</span>
                      <span className="text-[9px] text-cyan-300 block mt-0.5">Save {selectedListing.consumer_savings_pct}%</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Mandi Middlemen Rate</span>
                      <span className="text-2xl font-black text-rose-400 mt-1 block">₹{selectedListing.traditional_mandi_retail_price_per_qtl}</span>
                      <span className="text-[9px] text-rose-300 block mt-0.5">Exploitative Margin</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Harvesting Date:</span>
                      <span className="text-white font-bold">{selectedListing.harvest_date} (Shelf Life: {selectedListing.shelf_life_days} Days)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Quality & Food Safety Certification:</span>
                      <span className="text-emerald-400 font-bold">{selectedListing.fssai_cert} (Lab Tested)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>FPO Representative:</span>
                      <span className="text-amber-400 font-bold">{selectedListing.fpo_contact} ({selectedListing.phone})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5: Instant Direct Purchase Contract Wizard */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>Direct Contract Purchase Form</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      SMART ESCROW
                    </span>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-3 font-mono">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Buyer / Society Name</label>
                      <input
                        type="text" required value={buyerName} onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Order Quantity (Quintals)</label>
                      <input
                        type="number" min={selectedListing.min_order_qtl} max="500" required value={orderQty} onChange={(e) => setOrderQty(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
                      />
                      <span className="text-[10px] text-slate-500">Min Order: {selectedListing.min_order_qtl} Quintals</span>
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Destination City Hub</label>
                      <select
                        value={destCity} onChange={(e) => setDestCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-sans"
                      >
                        <option>Delhi-NCR Central Hub</option>
                        <option>Mumbai MMR Warehouse</option>
                        <option>Bengaluru Urban Center</option>
                        <option>Hyderabad Distribution Hub</option>
                      </select>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                      <div className="flex justify-between"><span>Unit Direct Rate:</span><span className="text-white">₹{selectedListing.consumer_direct_price_per_qtl} / Qtl</span></div>
                      <div className="flex justify-between"><span>Direct Farmer Payout:</span><span className="text-emerald-400 font-bold">₹{(selectedListing.farmgate_price_per_qtl * orderQty).toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold pt-1 border-t border-slate-900 text-white">
                        <span>Total Escrow Value:</span>
                        <span className="text-amber-400 text-sm">₹{(selectedListing.consumer_direct_price_per_qtl * orderQty).toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Lock Escrow & Dispatch Farmgate Reefer</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: MIDDLEMEN ELIMINATION & ARBITRAGE
           ========================================================================= */}
        {activeTab === 'arbitrage' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-emerald-500/40 pb-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">DEPARTMENT OF CONSUMER AFFAIRS (DoCA) • SUPPLY CHAIN AUDIT</span>
                <h2 className="text-xl font-black text-white font-sans mt-0.5">Kisan Direct vs Traditional Middlemen Disintermediation</h2>
                <p className="text-slate-400 text-[11px]">Eliminating 4 to 6 Intermediary Tiers to Maximize Farmer Realization & Lower Consumer Inflation</p>
              </div>
              <Percent className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-3">
              {arbitrageData.map((a, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white font-sans text-sm">{a.layer}</span>
                    <div className="text-[10px] text-slate-400 font-sans">Strategic Outcome: <strong className="text-emerald-400">{a.benefit}</strong></div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <span className="text-slate-500 text-[9px] block">TRADITIONAL</span>
                      <span className="text-rose-400 font-bold text-sm">{a.traditional_pct}%</span>
                    </div>
                    <div className="p-2 bg-emerald-950/60 border border-emerald-800 rounded-xl">
                      <span className="text-emerald-400 text-[9px] block font-bold">DIRECT AI</span>
                      <span className="text-emerald-300 font-black text-sm">{a.direct_platform_pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: AI URBAN DEMAND FORECASTING
           ========================================================================= */}
        {activeTab === 'demand' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {demandData.map((d) => (
                <div key={d.city} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white font-sans">{d.city}</h4>
                      <div className="text-emerald-400 text-[11px] font-bold">{d.commodity}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {(d.ai_confidence_score * 100).toFixed(1)}% Conf
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">WEEKLY DEMAND</span>
                      <span className="text-white font-bold">{d.weekly_projected_demand_mt} MT</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">REGIONAL DEFICIT</span>
                      <span className="text-rose-400 font-bold">{d.projected_deficit_mt} MT</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <span className="text-slate-500 text-[9px] uppercase font-bold block">Suggested Direct Sourcing Route:</span>
                    <p className="font-sans text-[11px] text-white font-bold">{d.suggested_farmgate_source}</p>
                    <div className="text-[10px] text-amber-400 mt-1 font-mono">Trend: {d.price_trend_prediction}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: FARMGATE LOGISTICS & COLD CHAIN
           ========================================================================= */}
        {activeTab === 'logistics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {routesData.map((r) => (
                <div key={r.route_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold">{r.route_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{r.origin} ➔ {r.destination}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {r.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">DISTANCE</span>
                      <span className="text-white font-bold">{r.distance_km} Km</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">TEMP (°C)</span>
                      <span className="text-cyan-400 font-bold">{r.cold_storage_temp_c}°C</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">SPOILAGE</span>
                      <span className="text-emerald-400 font-bold">{r.current_spoilage_rate_pct}%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-slate-300 flex justify-between items-center text-[11px]">
                    <span>Fleet: <strong>{r.vehicle}</strong></span>
                    <span className="text-amber-400 font-bold">₹{r.freight_cost_per_qtl}/Qtl Freight</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: ESCROW SMART CONTRACT & PROOF OF DELIVERY (PoD)
           ========================================================================= */}
        {activeTab === 'escrow' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-emerald-500/40 pb-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">GOVERNMENT SMART ESCROW & DIRECT SETTLEMENT</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Order #{selectedOrder.order_id} — PoD Delivery Receipt</h3>
                <p className="text-slate-400 text-[11px]">Smart Contract Auto-Disbursement upon QR Scanning</p>
              </div>
              <QrCode className="w-12 h-12 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">BUYER & SHIPMENT DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Buyer:</span><span className="text-white font-bold font-sans">{selectedOrder.buyer_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Destination:</span><span>{selectedOrder.destination_city}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Logistics:</span><span className="text-cyan-400 font-bold">{selectedOrder.logistics_status}</span></div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-bold text-[10px] uppercase block">FPO & COMMODITY DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">FPO Source:</span><span className="text-white font-bold font-sans">{selectedOrder.fpo_assigned}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Commodity:</span><span>{selectedOrder.ordered_commodity}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Quantity:</span><span className="text-emerald-400 font-bold">{selectedOrder.ordered_quantity_qtl} Quintals</span></div>
              </div>
            </div>

            <div className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">TOTAL ESCROW VALUE (DIRECT BENEFIT TRANSFER READY):</span>
                <div className="text-2xl font-black text-white font-sans mt-1">₹{selectedOrder.total_order_value_inr.toLocaleString()}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Status: {selectedOrder.escrow_payment_status} • Estimated Delivery: {selectedOrder.estimated_delivery}</div>
              </div>
              <button onClick={() => alert(`Escrow PoD for order ${selectedOrder.order_id} verified.`)} className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Verify PoD & Disburse DBT
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
