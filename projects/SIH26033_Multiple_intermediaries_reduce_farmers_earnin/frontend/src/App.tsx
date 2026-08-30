import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Layers, 
  Percent, 
  Globe 
} from 'lucide-react';

import listingsData from './data/fpo_direct_produce_listings.json';
import arbitrageData from './data/supply_chain_arbitrage_breakdown.json';
import demandData from './data/urban_demand_forecasting_matrix.json';
import routesData from './data/farm_to_fork_cold_chain_routes.json';
import statsData from './data/kisandirect_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'pa' | 'mr' | 'te'>('en');
  const [listings, setListings] = useState(listingsData);
  const [selectedListing, setSelectedListing] = useState(listingsData[0]);
  const [arbitrage, setArbitrage] = useState(arbitrageData);
  const [demand, setDemand] = useState(demandData);
  const [routes, setRoutes] = useState(routesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'arbitrage' | 'demand' | 'logistics' | 'escrow'>('marketplace');

  // Direct Order Form
  const [buyer, setBuyer] = useState('Delhi NCR Resident Collective');
  const [qty, setQty] = useState(25);
  const [dest, setDest] = useState('Delhi-NCR Central Hub');
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numRate = parseInt(selectedListing.direct_consumer_price_per_qtl.replace(/[^\d]/g, ''));
    const numFarm = parseInt(selectedListing.farm_gate_price_per_qtl.replace(/[^\d]/g, ''));
    const order = {
      order_id: `ORD-DOCA-${Math.floor(Math.random() * 900 + 100)}`,
      buyer_name: buyer,
      crop_commodity: selectedListing.crop_commodity,
      fpo_name: selectedListing.fpo_name,
      quantity_quintals: Number(qty),
      total_consumer_payment: `₹${(numRate * Number(qty)).toLocaleString()}`,
      direct_farmer_payout: `₹${(numFarm * Number(qty)).toLocaleString()}`,
      destination_hub: dest,
      escrow_status: "ESCROW_LOCKED_100_PCT",
      proof_of_delivery_token: `PASS-POD-${Math.floor(Math.random() * 90000 + 10000)}`
    };
    setPlacedOrder(order);
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
              <span>MINISTRY OF CONSUMER AFFAIRS • DIRECT FARMER MARKETPLACE • SIH26033</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KisanDirect D2C: Direct Farm-to-Consumer &amp; Bulk Buyer Marketplace
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Disintermediating Indian Agricultural Supply Chains: Direct FPO Producer Catalogs, AI Urban Demand Forecasting, Farm-to-Fork Cold Chain Optimization &amp; Smart Escrow Payments
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'marketplace', label: '🌾 Direct FPO Producer Catalogs', count: listings.length },
            { id: 'arbitrage', label: '💰 Middleman Margin Elimination', count: arbitrage.length },
            { id: 'demand', label: '📈 AI Urban Demand Forecaster', count: demand.length },
            { id: 'logistics', label: '🚚 Farm-to-Fork Cold Chain', count: routes.length },
            { id: 'escrow', label: '🔒 Smart Escrow Payouts' }
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
            VIEW 1: MARKETPLACE
           ========================================================================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {listings.map((l) => (
                <button
                  key={l.listing_id}
                  onClick={() => setSelectedListing(l)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedListing.listing_id === l.listing_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{l.listing_id}</span>
                    <span className="text-cyan-400">{l.farmer_value_share_pct} Value</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {l.crop_commodity.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{l.fpo_name}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Direct: {l.direct_consumer_price_per_qtl}</span>
                    <span className="text-amber-400">Save {l.consumer_savings_pct}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedListing.listing_id} • {selectedListing.origin_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedListing.crop_commodity}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedListing.verification_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">PRICE ARBITRAGE &amp; SAVINGS AUDIT:</span>
                  <div className="text-white font-sans text-xs">
                    Producer FPO: <strong className="text-emerald-300">{selectedListing.fpo_name}</strong> ({selectedListing.member_farmers_count} Farmers)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Direct Price: {selectedListing.direct_consumer_price_per_qtl} vs Traditional Mandi Retail: <span className="line-through text-slate-500">{selectedListing.traditional_mandi_retail_price}</span>
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Farmer Farm-Gate Net Realization: {selectedListing.farm_gate_price_per_qtl} ({selectedListing.farmer_value_share_pct} of total consumer value)
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    FPO Lead: {selectedListing.fpo_contact_person} | Available Harvest Stock: {selectedListing.available_stock_mt} MT
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">FARMER VALUE SHARE</span><span className="text-emerald-400 font-bold">{selectedListing.farmer_value_share_pct} of Spend</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DIRECT CONSUMER SAVINGS</span><span className="text-cyan-400 font-bold">{selectedListing.consumer_savings_pct} Cheaper</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('escrow')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Place Direct Bulk Order with Smart Escrow ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Direct Order Calculator</span>
                  </h4>
                  <form onSubmit={handleOrderSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Buyer Organization / Collective</label>
                      <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Order Quintals</label>
                        <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" required />
                      </div>
                      <div>
                        <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Destination</label>
                        <input type="text" value={dest} onChange={(e) => setDest(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" required />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs font-sans shadow-md">
                      Lock Direct Smart Escrow Contract
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ARBITRAGE */}
        {activeTab === 'arbitrage' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-400" />
              <span>Supply Chain Margin Disintermediation Audit</span>
            </h4>
            <div className="space-y-3">
              {arbitrage.map((a, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white font-sans font-bold block">{a.supply_chain_layer}</span>
                    <span className="text-slate-400 text-[10px]">Impact: {a.net_impact}</span>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-slate-500 mr-3">Trad: {a.traditional_channel_pct}</span>
                    <span className="text-emerald-400 font-bold">Direct: {a.direct_d2c_model_pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: DEMAND */}
        {activeTab === 'demand' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {demand.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-white font-sans">{d.consumption_hub}</h4>
                    <div className="text-slate-400 text-[11px]">{d.commodity}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">{d.ai_confidence}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="flex justify-between"><span>Demand:</span><strong className="text-emerald-400">{d.weekly_demand_mt}</strong></div>
                  <div className="flex justify-between"><span>Deficit:</span><strong className="text-rose-400">{d.current_local_deficit}</strong></div>
                  <div className="text-cyan-300 text-[10px] pt-1 border-t border-slate-900">Source: {d.optimal_farm_source}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: LOGISTICS */}
        {activeTab === 'logistics' && (
          <div className="space-y-4 font-mono text-xs">
            {routes.map((r) => (
              <div key={r.route_id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">{r.route_id} • {r.route_name}</span>
                  <span className="text-cyan-400">{r.distance_km}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                  <div>Fleet: <strong className="text-white">{r.assigned_fleet}</strong></div>
                  <div>Temp: <strong className="text-cyan-400 font-mono">{r.temperature_celsius}</strong> | Transit Spoilage: <strong className="text-emerald-400 font-mono">{r.transit_spoilage_pct}</strong></div>
                  <div className="text-amber-300 font-mono text-[10px] pt-1 border-t border-slate-900">Freight Cost: {r.freight_cost_per_qtl}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: ESCROW */}
        {activeTab === 'escrow' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-emerald-500/40 pb-3">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">SMART ESCROW CONTRACT (DoCA VERIFIED)</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">
                  {placedOrder ? placedOrder.order_id : "No Active Order"}
                </h4>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            {placedOrder ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-slate-300 text-xs font-sans">
                  <div>Buyer: <strong className="text-white">{placedOrder.buyer_name}</strong></div>
                  <div>Produce: <strong className="text-emerald-300">{placedOrder.crop_commodity}</strong></div>
                  <div>Quantity: <strong className="text-white">{placedOrder.quantity_quintals} Quintals</strong></div>
                  <div>Destination: <strong className="text-cyan-300">{placedOrder.destination_hub}</strong></div>
                  <div>Consumer Escrow: <strong className="text-emerald-400 text-sm">{placedOrder.total_consumer_payment}</strong></div>
                  <div>Direct Farmer Credit: <strong className="text-emerald-400 text-sm">{placedOrder.direct_farmer_payout}</strong></div>
                </div>
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                  <span className="text-xs text-white font-bold">{placedOrder.proof_of_delivery_token}</span>
                  <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-[10px] font-sans">Escrow Locked</span>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-slate-950 rounded-2xl text-center text-slate-500 font-sans">
                Select a listing from the marketplace and click "Place Direct Bulk Order" to lock a smart escrow contract.
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-3 text-center">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
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
