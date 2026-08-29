import React, { useState } from 'react';
import { 
  Recycle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  QrCode, 
  MapPin, 
  Phone, 
  Layers, 
  DollarSign, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Cpu, 
  Database, 
  Building2, 
  ChevronRight, 
  Printer, 
  Volume2, 
  Globe 
} from 'lucide-react';

import materialsData from './data/materials_catalog.json';
import priceData from './data/price_board.json';
import recyclersData from './data/authorized_recyclers.json';
import lotsData from './data/collector_lots.json';
import safetyData from './data/safety_guidelines.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('hi');
  const [materials, setMaterials] = useState(materialsData);
  const [selectedMat, setSelectedMat] = useState(materialsData[0]);
  const [lots, setLots] = useState(lotsData);
  const [selectedLot, setSelectedLot] = useState(lotsData[0]);
  const [activeTab, setActiveTab] = useState<'creator' | 'rates' | 'recyclers' | 'receipt' | 'safety'>('creator');

  // Lot Creator State
  const [collectorName, setCollectorName] = useState('Ramesh Tukaram Shinde');
  const [collectorPhone, setCollectorPhone] = useState('+91 98224 08194');
  const [weightKg, setWeightKg] = useState(25);
  const [city, setCity] = useState('Nagpur (नागपुर)');
  const [createdLot, setCreatedLot] = useState<any>(null);

  const t = {
    en: {
      subtitle: "MINISTRY OF MINES • JNARDDC E-WASTE & CRITICAL MINERALS • SIH26229",
      title: "Kabadiwala Connect – Bringing Informal Collectors to Formal Recycling",
      desc: "Vernacular Price Discovery, Direct CPCB Recycler Matching & Critical Mineral Recovery",
      tab1: "📱 Create E-Waste Lot",
      tab2: "📈 Live Rate Board",
      tab3: "🚚 Certified Recyclers",
      tab4: "📜 Traceable Handover Slip",
      tab5: "🛡️ Safety Guidelines",
      estPayout: "Total Estimated Payout",
      extraGain: "Extra Gain vs Local Scrappy",
      createBtn: "Create Lot & Book Recycler Pickup"
    },
    hi: {
      subtitle: "खान मंत्रालय (भारत सरकार) • JNARDDC ई-कचरा व महत्वपूर्ण खनिज मंच • SIH26229",
      title: "कबाड़ीवाला कनेक्ट – अनौपचारिक संग्राहक को औपचारिक रीसाइक्लिंग से जोड़ना",
      desc: "सही भाव खोज, प्रमाणित रीसायकलर से सीधा संपर्क और डिजिटल रसीद भुगतान",
      tab1: "📱 ई-कचरा लॉट बनाएं",
      tab2: "📈 लाइव भाव बोर्ड",
      tab3: "🚚 प्रमाणित रीसायकलर",
      tab4: "📜 डिजिटल हस्तांतरण रसीद",
      tab5: "🛡️ सुरक्षा व स्वास्थ्य निर्देश",
      estPayout: "कुल अनुमानित कमाई",
      extraGain: "लोकल कबाड़ी से अतिरिक्त मुनाफा",
      createBtn: "लॉट दर्ज करें और रीसायकलर पिकअप बुक करें"
    },
    mr: {
      subtitle: "खाण मंत्रालय (भारत सरकार) • JNARDDC ई-कचरा व दुर्मिळ खनिजे मंच • SIH26229",
      title: "कबाडीवाला कनेक्ट – अनौपचारिक भंगार वेचकांना थेट औपचारिक रीसायकलिंगशी जोडणे",
      desc: "पारदर्शक दर, अधिकृत रीसायकलर्सशी थेट संपर्क आणि डिजिटल पावती",
      tab1: "📱 ई-कचरा लॉट तयार करा",
      tab2: "📈 थेट बाजार भाव",
      tab3: "🚚 अधिकृत रीसायकलर्स",
      tab4: "📜 डिजिटल हस्तांतरण पावती",
      tab5: "🛡️ सुरक्षा व दक्षता नियम",
      estPayout: "एकूण अंदाजित रक्कम",
      extraGain: "स्थानिक दरापेक्षा जास्तीचा नफा",
      createBtn: "लॉट तयार करा आणि गाडी बुक करा"
    }
  }[lang];

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();
    const formalVal = selectedMat.formal_recycler_rate_per_kg * weightKg;
    const informalVal = selectedMat.informal_market_rate_per_kg * weightKg;
    const gain = formalVal - informalVal;

    const newLot = {
      lot_id: `LOT-EWASTE-NAG-2026-${Math.floor(Math.random() * 900 + 100)}`,
      collector_name: collectorName,
      collector_phone: collectorPhone,
      location: `${city} (GPS: Verified)`,
      material_name: selectedMat.name_en,
      category_id: selectedMat.category_id,
      estimated_weight_kg: Number(weightKg),
      quoted_rate_per_kg: selectedMat.formal_recycler_rate_per_kg,
      total_estimated_payout_inr: formalVal,
      informal_rate_comparison_inr: informalVal,
      net_income_gain_inr: gain,
      assigned_recycler: "Eco-Recycle JNARDDC Technology Centre",
      pickup_status: "PICKUP_SCHEDULED_TODAY",
      payment_status: "READY_FOR_HANDOVER_PAYMENT",
      created_at: "Just Now"
    };

    setLots([newLot, ...lots]);
    setSelectedLot(newLot);
    setCreatedLot(newLot);
    setActiveTab('receipt');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Recycle className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{t.subtitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              {t.desc}
            </p>
          </div>

          {/* Language Switcher Buttons */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button
              onClick={() => setLang('hi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('mr')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'creator', label: t.tab1, count: materials.length },
            { id: 'rates', label: t.tab2 },
            { id: 'recyclers', label: t.tab3, count: recyclersData.length },
            { id: 'receipt', label: t.tab4, count: lots.length },
            { id: 'safety', label: t.tab5 }
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
            VIEW 1: PICTORIAL LOT CREATOR
           ========================================================================= */}
        {activeTab === 'creator' && (
          <div className="space-y-6">
            {/* Pictorial E-Waste Category Selection Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>📸 ई-कचरा श्रेणी चुनें / SELECT E-WASTE CATEGORY</span>
                <span className="text-emerald-400 font-mono">Tap image card to select</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {materials.map((m) => (
                  <button
                    key={m.category_id}
                    onClick={() => setSelectedMat(m)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      selectedMat.category_id === m.category_id
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-emerald-400">
                      {m.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                      {m.icon === 'Zap' && <Zap className="w-6 h-6" />}
                      {m.icon === 'Database' && <Database className="w-6 h-6" />}
                      {m.icon === 'Layers' && <Layers className="w-6 h-6" />}
                      {m.icon === 'Camera' && <Camera className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-xs font-black text-white leading-tight">
                        {lang === 'hi' ? m.name_hi : lang === 'mr' ? m.name_mr : m.name_en}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-bold font-mono mt-1">
                        ₹{m.formal_recycler_rate_per_kg}/kg
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Material Value & Minerals Recovered */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400">{selectedMat.category_id}</span>
                      <h3 className="font-bold text-lg text-white mt-1">
                        {lang === 'hi' ? selectedMat.name_hi : lang === 'mr' ? selectedMat.name_mr : selectedMat.name_en}
                      </h3>
                      <p className="text-xs text-slate-400">{selectedMat.name_en}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      ₹{selectedMat.formal_recycler_rate_per_kg} / kg (MSP)
                    </span>
                  </div>

                  {/* Pricing Comparison Bar */}
                  <div className="grid grid-cols-2 gap-3 text-center font-mono">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px] uppercase">JNARDDC Recycler Rate</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">₹{selectedMat.formal_recycler_rate_per_kg} / kg</span>
                      <span className="text-[10px] text-emerald-300 block mt-0.5">Government Guaranteed Fair Price</span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Local Middlemen Scrap Rate</span>
                      <span className="text-2xl font-black text-rose-400 mt-1 block">₹{selectedMat.informal_market_rate_per_kg} / kg</span>
                      <span className="text-[10px] text-rose-300 block mt-0.5">Underpaid by {Math.round(((selectedMat.formal_recycler_rate_per_kg - selectedMat.informal_market_rate_per_kg) / selectedMat.informal_market_rate_per_kg) * 100)}%</span>
                    </div>
                  </div>

                  {/* Critical Minerals Recovered List */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-bold text-[10px] uppercase font-mono block">
                      🇮🇳 CRITICAL MINERALS RECOVERED FOR NATION (दुर्मिळ व मौल्यवान खनिजे):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMat.critical_minerals_recovered.map((min: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-lg text-xs font-mono font-bold">
                          {min}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-xl flex items-center gap-3 text-amber-200 text-xs">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-400" />
                    <span><strong>सुरक्षा सूचना:</strong> {selectedMat.safe_handling_tip}</span>
                  </div>
                </div>
              </div>

              {/* Right 5: Digital Lot Creation Form */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>{t.tab1}</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      ONLINE
                    </span>
                  </div>

                  <form onSubmit={handleCreateLot} className="space-y-3 font-mono">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">कबाड़ीवाला / संग्राहक का नाम</label>
                      <input
                        type="text" required value={collectorName} onChange={(e) => setCollectorName(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">मोबाइल नंबर (Mobile No)</label>
                      <input
                        type="text" required value={collectorPhone} onChange={(e) => setCollectorPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">अनुमानित वजन (Weight in Kg)</label>
                      <input
                        type="number" min="1" max="500" required value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-base font-bold font-mono text-emerald-400"
                      />
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>{t.estPayout}:</span>
                        <span className="text-emerald-400 font-bold text-sm">₹{(selectedMat.formal_recycler_rate_per_kg * weightKg).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>{t.extraGain}:</span>
                        <span className="text-cyan-400 font-bold">+₹{((selectedMat.formal_recycler_rate_per_kg - selectedMat.informal_market_rate_per_kg) * weightKg).toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.createBtn}</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: LIVE RATE BOARD
           ========================================================================= */}
        {activeTab === 'rates' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-emerald-500/40 pb-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">JNARDDC & CPCB VERIFIED RATE TICKER</span>
                <h2 className="text-xl font-black text-white font-sans mt-0.5">ई-कचरा पारदर्शी दैनिक भाव सूची (Daily Rate Board)</h2>
                <p className="text-slate-400 text-[11px]">Empowering Informal Waste Pickers with Real-Time Guaranteed Pricing</p>
              </div>
              <TrendingUp className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-3">
              {priceData.map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-emerald-400 font-bold text-[10px]">{p.location}</span>
                    <h4 className="font-bold text-white font-sans text-sm mt-0.5">{p.mat_name}</h4>
                    <span className="text-[10px] text-cyan-300 font-mono">{p.trend}</span>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <span className="text-slate-500 text-[9px] block">LOCAL INFORMAL</span>
                      <span className="text-rose-400 font-bold">{p.informal_price}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-xl">
                      <span className="text-emerald-400 text-[9px] block font-bold">JNARDDC FORMAL</span>
                      <span className="text-emerald-300 font-black text-base">{p.formal_price}</span>
                      <span className="text-[9px] text-cyan-300 block font-bold">{p.bonus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: CERTIFIED RECYCLERS
           ========================================================================= */}
        {activeTab === 'recyclers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {recyclersData.map((r) => (
                <div key={r.recycler_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-emerald-400 font-bold text-[10px]">{r.recycler_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{r.company_name}</h4>
                      <p className="text-slate-400 text-[11px]">{r.city}, {r.state}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>EPR Reg:</strong> <span className="text-emerald-400">{r.cpcb_epr_registration}</span></div>
                    <div><strong>Pickup Radius:</strong> {r.pickup_radius_km} Km</div>
                    <div><strong>Helpline:</strong> {r.contact_phone}</div>
                    <div className="text-amber-400 font-bold text-[10px] pt-1 border-t border-slate-900">
                      Payment: {r.payment_modes.join(' / ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: DIGITAL TRACEABLE HANDOVER SLIP & EPR TOKEN
           ========================================================================= */}
        {activeTab === 'receipt' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-emerald-500/40 pb-4">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">MINISTRY OF MINES • JNARDDC EPR RECYCLING RECEIPT</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">लॉट हस्तांतरण रसीद (Handover Pass: {selectedLot.lot_id})</h3>
                <p className="text-slate-400 text-[11px]">Verifiable Digital Proof-of-Collection for Formal EPR Credits</p>
              </div>
              <QrCode className="w-12 h-12 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">COLLECTOR & LOCATION DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Collector:</span><span className="text-white font-bold font-sans">{selectedLot.collector_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Contact:</span><span>{selectedLot.collector_phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="text-slate-300">{selectedLot.location}</span></div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-bold text-[10px] uppercase block">E-WASTE MATERIAL & WEIGHT:</span>
                <div className="flex justify-between"><span className="text-slate-500">Category:</span><span className="text-white font-bold">{selectedLot.material_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Weight:</span><span className="text-emerald-400 font-bold">{selectedLot.estimated_weight_kg} kg</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Assigned Recycler:</span><span className="text-amber-400 font-bold">{selectedLot.assigned_recycler}</span></div>
              </div>
            </div>

            <div className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">TOTAL GUARANTEED PAYOUT (नकद / UPI भुगतान):</span>
                <div className="text-2xl font-black text-white font-sans mt-0.5">₹{selectedLot.total_estimated_payout_inr.toLocaleString()}</div>
                <div className="text-cyan-300 text-[11px] font-bold">Extra Income: +₹{selectedLot.net_income_gain_inr.toLocaleString()} vs local scrap dealers</div>
              </div>
              <button onClick={() => alert("EPR Handover Receipt printed/saved.")} className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Print Handover Slip
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: SAFETY GUIDELINES
           ========================================================================= */}
        {activeTab === 'safety' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {safetyData.map((s, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-white font-sans">{s.hazard}</h4>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-slate-300 text-[11px]">
                    <div className="text-rose-300"><strong>खतरा (Risk):</strong> {s.risk}</div>
                    <div className="text-emerald-300 pt-1 border-t border-slate-900"><strong>सही तरीका (Do This):</strong> {s.do_this}</div>
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
