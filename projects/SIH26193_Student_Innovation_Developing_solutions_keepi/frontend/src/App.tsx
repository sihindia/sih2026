import React, { useState } from 'react';
import { 
  Leaf, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Sliders, 
  RefreshCw, 
  Cpu, 
  Building2, 
  FileText, 
  Sun, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  ShoppingBag, 
  Globe 
} from 'lucide-react';

import cropsData from './data/crop_value_addition.json';
import diseaseData from './data/crop_disease_diagnostics.json';
import coldData from './data/cold_storage_grid.json';
import mandiData from './data/enam_mandi_prices.json';
import receiptsData from './data/fpo_warehouse_receipts.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'te'>('hi');
  const [crops, setCrops] = useState(cropsData);
  const [selectedCrop, setSelectedCrop] = useState(cropsData[0]);
  const [diseases, setDiseases] = useState(diseaseData);
  const [coldStorages, setColdStorages] = useState(coldData);
  const [mandiPrices, setMandiPrices] = useState(mandiData);
  const [receipts, setReceipts] = useState(receiptsData);
  const [activeTab, setActiveTab] = useState<'processing' | 'diagnostics' | 'coldstorage' | 'enam' | 'finance'>('processing');

  // Value Addition Calculator State
  const [harvestQty, setHarvestQty] = useState(5000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [roiResult, setRoiResult] = useState<any>({
    rawRev: 60000,
    procRev: 166250,
    netProfit: 86250,
    upliftPct: 143.8,
    product: "Aseptic Tomato Paste & Sun-Dried Powder"
  });

  const handleCalcValue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const rawVal = harvestQty * selectedCrop.raw_farmgate_price_inr_kg;
      const procQty = harvestQty * 0.35;
      const procVal = procQty * selectedCrop.processed_price_inr_kg;
      const profit = procVal - rawVal - (harvestQty * 4.0);

      setRoiResult({
        rawRev: rawVal,
        procRev: procVal,
        netProfit: profit,
        upliftPct: Math.round((profit / rawVal) * 100),
        product: selectedCrop.processed_product
      });
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>AICTE • MOFPI • E-NAM • KRISHISETU 360 SMART AGRI & FOODTECH • SIH26193</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KrishiSetu 360: Post-Harvest Value Addition & Farm-to-Fork Supply Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Food Processing Value Addition, Precision Agronomy Diagnostics, Solar Cold Storage & e-NAM Mandi Discovery
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'processing', label: '🌾 Post-Harvest Value Addition', count: crops.length },
            { id: 'diagnostics', label: '🔬 AI Precision Agronomy', count: diseases.length },
            { id: 'coldstorage', label: '❄️ Solar Micro-Cold Storage', count: coldStorages.length },
            { id: 'enam', label: '📈 e-NAM Mandi Price Tracker', count: mandiPrices.length },
            { id: 'finance', label: '📜 e-NWR Warehouse Finance', count: receipts.length }
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
            VIEW 1: POST-HARVEST FOOD PROCESSING & VALUE ADDITION
           ========================================================================= */}
        {activeTab === 'processing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {crops.map((c) => (
                <button
                  key={c.crop_id}
                  onClick={() => setSelectedCrop(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCrop.crop_id === c.crop_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{c.crop_id}</span>
                    <span className="text-cyan-300">+{c.value_addition_uplift_pct}% Margin</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? c.crop_name_hi : lang === 'mr' ? c.crop_name_mr : c.crop_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Raw: ₹{c.raw_farmgate_price_inr_kg}/kg ➔ Processed: ₹{c.processed_price_inr_kg}/kg</div>
                </button>
              ))}
            </div>

            {/* Split Calculator & Processing Protocols */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 6: Value Addition ROI Calculator */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Food Processing Value Addition Calculator</span>
                </h4>

                <form onSubmit={handleCalcValue} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Primary Harvest Quantity (kg)</label>
                    <input type="number" required value={harvestQty} onChange={(e) => setHarvestQty(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                  </div>

                  <button type="submit" disabled={isCalculating} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                    <span>{isCalculating ? 'Computing Processing Profitability...' : 'Calculate Food Processing Profits'}</span>
                  </button>
                </form>

                {roiResult && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Raw Farmgate Revenue:</span>
                      <strong className="text-slate-400 text-sm">₹{roiResult.rawRev.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Processed Product Revenue:</span>
                      <strong className="text-cyan-400 text-sm">₹{roiResult.procRev.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400 pt-1 border-t border-slate-900">
                      <span className="font-bold">Net Extra Profit:</span>
                      <strong className="text-emerald-400 text-lg font-black">+₹{roiResult.netProfit.toLocaleString()} (+{roiResult.upliftPct}%)</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Right 6: Processing Architecture */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCrop.crop_id}</span>
                    <h4 className="font-bold text-sm text-white mt-0.5">{selectedCrop.crop_name}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-950 text-cyan-300 font-bold text-[10px] border border-slate-800">
                    {selectedCrop.shelf_life_extension}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <span className="text-emerald-400 font-bold text-[10px] uppercase block">Value-Added Product:</span>
                  <div className="text-white font-sans font-bold">{selectedCrop.processed_product}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase block">Processing Technology:</span>
                  <div className="text-slate-300 font-sans">{selectedCrop.processing_tech}</div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-emerald-300 font-sans text-xs">
                  <strong>MoFPI Subsidy Support:</strong> {selectedCrop.mofpi_pmfme_subsidy}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: AI PRECISION AGRONOMY
           ========================================================================= */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {diseases.map((d) => (
                <div key={d.disease_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{d.disease_id} • Crop: {d.crop}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{d.disease_name}</h4>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px] font-sans">
                    <div><strong>Symptoms:</strong> {d.symptoms}</div>
                    <div className="text-amber-300"><strong>Soil / Nutrients:</strong> {d.npk_deficiency}</div>
                    <div className="text-emerald-300 pt-1 border-t border-slate-900"><strong>Bio-Remedy:</strong> {d.organic_bio_remedy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SOLAR MICRO-COLD STORAGE
           ========================================================================= */}
        {activeTab === 'coldstorage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {coldStorages.map((cs) => (
                <div key={cs.facility_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{cs.facility_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{cs.location}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {cs.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TEMPERATURE</span><span className="text-cyan-400 font-bold">{cs.current_temperature_c}°C</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">HUMIDITY</span><span className="text-white font-bold">{cs.relative_humidity_pct}%</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ETHYLENE</span><span className="text-emerald-400 font-bold">{cs.ethylene_level_ppm} ppm</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div>Stored Produce: <strong>{cs.stored_crops}</strong> (Cap: {cs.storage_capacity_mt} MT)</div>
                    <div className="text-emerald-300">Spoilage Reduction: <strong>{cs.spoilage_reduction_pct}% Loss Avoided</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: E-NAM MANDI PRICES
           ========================================================================= */}
        {activeTab === 'enam' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {mandiPrices.map((m) => (
                <div key={m.mandi_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{m.mandi_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{m.mandi_name}</h4>
                      <p className="text-slate-400 text-[11px] font-sans">{m.commodity}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-950 text-emerald-400 font-black text-sm rounded-xl border border-emerald-950">
                      ₹{m.modal_price_inr_quintal}/Q
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl flex justify-between items-center text-slate-300 text-[11px]">
                    <div>Min: ₹{m.min_price_inr_quintal} | Max: ₹{m.max_price_inr_quintal}</div>
                    <div className="text-cyan-300 font-bold">{m.daily_volume_mt} MT Traded</div>
                  </div>

                  <div className="text-amber-300 text-[11px] font-sans">
                    <strong>7-Day AI Price Forecast:</strong> {m.ai_7day_forecast}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: E-NWR WAREHOUSE FINANCE
           ========================================================================= */}
        {activeTab === 'finance' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">WAREHOUSING DEVELOPMENT & REGULATORY AUTHORITY (WDRA)</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Electronic Negotiable Warehouse Receipt (e-NWR) Pledge Loan</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span>Receipt ID:</span><strong className="text-cyan-300">{receipts[0].receipt_id}</strong></div>
              <div className="flex justify-between"><span>Beneficiary Farmer:</span><span className="text-white font-bold font-sans">{receipts[0].farmer_name}</span></div>
              <div className="flex justify-between"><span>Pledged Commodity:</span><span>{receipts[0].commodity} ({receipts[0].stored_quantity_mt} MT)</span></div>
              <div className="flex justify-between"><span>Sanctioned Credit Loan:</span><strong className="text-emerald-400 text-sm font-sans">₹{receipts[0].sanctioned_loan_inr.toLocaleString()} (at {receipts[0].interest_rate_pct}% p.a.)</strong></div>
              <div className="flex justify-between pt-1 border-t border-slate-900"><span>Status:</span><span className="text-emerald-300 font-bold">{receipts[0].status}</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
