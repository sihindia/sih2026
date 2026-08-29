import React, { useState } from 'react';
import { 
  Recycle, 
  Leaf, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  RefreshCw, 
  Zap, 
  Truck, 
  Cpu, 
  Flame, 
  Sliders, 
  DollarSign, 
  Building2, 
  Share2, 
  Printer, 
  ChevronRight, 
  Globe 
} from 'lucide-react';

import categoriesData from './data/waste_categories.json';
import binsData from './data/smart_iot_bins.json';
import routesData from './data/truck_routes.json';
import biogasData from './data/biogas_plants.json';
import creditsData from './data/citizen_credits.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta'>('hi');
  const [categories, setCategories] = useState(categoriesData);
  const [selectedCat, setSelectedCat] = useState(categoriesData[0]);
  const [bins, setBins] = useState(binsData);
  const [selectedBin, setSelectedBin] = useState(binsData[0]);
  const [biogasPlants, setBiogasPlants] = useState(biogasData);
  const [activeTab, setActiveTab] = useState<'classifier' | 'bins' | 'biogas' | 'credits' | 'sbm'>('classifier');

  // Interactive AI Waste Classifier State
  const [itemQuery, setItemQuery] = useState('Plastic PET Beverage Bottle with leftover juice');
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<any>({
    stream: "Dry Recyclable Waste (Blue Bin)",
    color: "Blue",
    purity: 84.5,
    dest: "Material Recovery Facility (MRF) Optical Baling",
    warning: "Contamination Alert: Rinse liquid residue before dry disposal."
  });

  const handleClassify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClassifying(true);
    setTimeout(() => {
      const q = itemQuery.toLowerCase();
      let stream = "Dry Recyclable Waste (Blue Bin)";
      let color = "Blue";
      let dest = "MRF Circular Pelletization Plant";
      let hasContam = q.includes("leftover") || q.includes("juice") || q.includes("dirty");
      
      if (q.includes("food") || q.includes("peel") || q.includes("tea") || q.includes("vegetable")) {
        stream = "Biodegradable Wet Waste (Green Bin)";
        color = "Green";
        dest = "Indore Devguradia Gobardhan Bio-Methanation Plant";
        hasContam = false;
      } else if (q.includes("battery") || q.includes("mobile") || q.includes("cable") || q.includes("circuit")) {
        stream = "Electronic Waste (Yellow Bin)";
        color = "Yellow";
        dest = "Authorized Hydrometallurgy Metal Extraction";
        hasContam = false;
      } else if (q.includes("pad") || q.includes("medicine") || q.includes("syringe") || q.includes("diaper")) {
        stream = "Domestic Hazardous & Sanitary (Red Bin)";
        color = "Red";
        dest = "High-Temperature Controlled Incineration";
        hasContam = false;
      }

      setClassificationResult({
        stream,
        color,
        purity: hasContam ? 84.5 : 98.5,
        dest,
        warning: hasContam ? "Contamination Alert: Rinse liquid residue before dry disposal." : "100% Pure Segregation Verified."
      });
      setIsClassifying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Recycle className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>AICTE • MOHUA • SWACHH BHARAT MISSION 2.0 • SWACHHAI 360 • SIH26195</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SwachhAI 360: AI Waste Segregation, Smart IoT Bins & Bio-Methanation Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Computer Vision 4-Stream Waste Sorting, Ultrasonic Smart Bin Fleet Telemetry & Gobardhan CBG Bio-Gas Energy
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'classifier', label: '🗑️ AI Vision Waste Classifier', count: categories.length },
            { id: 'bins', label: '📡 Smart IoT Bins & EV Fleet', count: bins.length },
            { id: 'biogas', label: '⚡ Gobardhan Bio-Methanation', count: biogasPlants.length },
            { id: 'credits', label: '🪙 Citizen Green Credits', count: creditsData.length },
            { id: 'sbm', label: '📊 SBM 2.0 Star Rating Hub' }
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
            VIEW 1: AI VISION WASTE CLASSIFIER
           ========================================================================= */}
        {activeTab === 'classifier' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.category_id}
                  onClick={() => setSelectedCat(cat)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCat.category_id === cat.category_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{cat.category_id}</span>
                    <span className="text-cyan-300">₹{cat.economic_value_inr_kg}/kg</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? cat.name_hi : cat.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Assigned Bin: {cat.bin_color}</div>
                </button>
              ))}
            </div>

            {/* Split Classifier & Camera Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 6: Live AI Scanner Query */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Edge YOLOv8 Waste Optical Classifier</span>
                </h4>

                <form onSubmit={handleClassify} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Waste Item Optical Description / Image OCR Tag</label>
                    <input type="text" required value={itemQuery} onChange={(e) => setItemQuery(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold" />
                  </div>

                  <button type="submit" disabled={isClassifying} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isClassifying ? 'animate-spin' : ''}`} />
                    <span>{isClassifying ? 'Classifying Optical Features...' : 'Analyze Waste Stream & Contamination'}</span>
                  </button>
                </form>

                {classificationResult && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 font-bold">{classificationResult.stream}</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{classificationResult.purity}% Purity</span>
                    </div>
                    <div className="text-slate-300 text-[11px] font-sans">Destination: <strong>{classificationResult.dest}</strong></div>
                    <div className={`p-2.5 rounded-xl text-[11px] font-sans ${
                      classificationResult.warning.includes('Alert') ? 'bg-amber-950/60 border border-amber-800 text-amber-300' : 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    }`}>
                      {classificationResult.warning}
                    </div>
                  </div>
                )}
              </div>

              {/* Right 6: Waste Stream Processing Architecture */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedCat.category_id}</span>
                    <h4 className="font-bold text-sm text-white mt-0.5">{selectedCat.name}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-950 text-cyan-300 font-bold text-[10px] border border-slate-800">
                    Value: ₹{selectedCat.economic_value_inr_kg}/kg
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <span className="text-emerald-400 font-bold text-[10px] uppercase block">Typical Waste Items:</span>
                  <div className="text-white font-sans">{selectedCat.items_included.join(', ')}</div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase block">Circular Technology:</span>
                  <div className="text-slate-300 font-sans">{selectedCat.treatment_technology}</div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-emerald-300 font-sans text-xs">
                  <strong>Output Yield:</strong> {selectedCat.conversion_output}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: SMART IOT BINS & FLEET
           ========================================================================= */}
        {activeTab === 'bins' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {bins.map((b) => (
                <div key={b.bin_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{b.bin_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{b.location}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.fill_level_pct >= 80 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300'
                    }`}>
                      {b.fill_level_pct}% Full
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[9px]">ODOR (NH3)</span><span className="text-white font-bold">{b.odor_ammonia_ppm} ppm</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[9px]">SOLAR BATTERY</span><span className="text-emerald-400 font-bold">{b.battery_pct}%</span></div>
                  </div>

                  <div className="text-slate-400 text-[11px] font-sans">Type: {b.bin_type}</div>

                  <button onClick={() => alert(`Dispatched EV Collection Truck to: ${b.location}`)} className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Dispatch EV Tipper Truck ➔</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: GOBARDHAN BIOGAS
           ========================================================================= */}
        {activeTab === 'biogas' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">MINISTRY OF HOUSING & URBAN AFFAIRS (MOHUA) • GOBARDHAN SCHEME</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">{biogasPlants[0].facility_name}</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">DAILY WASTE INTAKE</span><span className="text-2xl font-black text-emerald-400 mt-1 block">{biogasPlants[0].daily_waste_intake_tons} Tons</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">DAILY CBG GAS YIELD</span><span className="text-2xl font-black text-cyan-400 mt-1 block">{biogasPlants[0].daily_biogas_output_cbg_kg.toLocaleString()} kg</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950"><span className="text-slate-500 block text-[9px]">BIO-COMPOST YIELD</span><span className="text-2xl font-black text-purple-400 mt-1 block">{biogasPlants[0].organic_compost_tons} Tons</span></div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300">
              <div className="flex justify-between"><span>Digester Thermophilic Temp:</span><strong className="text-white">{biogasPlants[0].digester_temp_c}°C</strong></div>
              <div className="flex justify-between"><span>Anaerobic Slurry pH:</span><strong className="text-emerald-400">{biogasPlants[0].ph_level} (Optimal)</strong></div>
              <div className="flex justify-between"><span>Status:</span><span className="text-cyan-300 font-bold">{biogasPlants[0].status}</span></div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CITIZEN CREDITS
           ========================================================================= */}
        {activeTab === 'credits' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">CITIZEN GREEN REWARDS</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Household Waste Segregation Credits</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <div className="flex justify-between"><span className="text-slate-500">Resident:</span><span className="text-white font-bold">{creditsData[0].resident_name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Ward:</span><span>{creditsData[0].ward}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Segregation Purity:</span><strong className="text-emerald-400">{creditsData[0].segregation_purity_pct}%</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Municipal Tax Rebate:</span><strong className="text-cyan-400">₹{creditsData[0].tax_rebate_applied_inr} Saved</strong></div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: SBM 2.0 STAR RATING
           ========================================================================= */}
        {activeTab === 'sbm' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">SWACHH SURVEKSHAN 2026 BENCHMARKS</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">7-Star Garbage-Free City Indicators</h4>
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300 font-sans text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold font-mono">100% Door-to-Door Segregation:</span>
                <p className="text-slate-400 text-[11px]">Direct IoT RFID tag tracking on household bins ensuring zero mixed-waste pickup.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold font-mono">100% Legacy Waste Remediation:</span>
                <p className="text-slate-400 text-[11px]">Bio-mining of old landfill dumpsites converting reclaimed land into urban green parks.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
