import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Scale, 
  Layers, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Sliders, 
  Upload, 
  RefreshCw, 
  Eye, 
  Thermometer, 
  Droplet, 
  Clock, 
  ChevronRight, 
  Info,
  Printer,
  Download,
  Gavel
} from 'lucide-react';

import lotsData from './data/procurement_lots.json';
import detectionsData from './data/sample_detections.json';
import centersData from './data/procurement_centers.json';
import standardsData from './data/grading_standards.json';
import disputesData from './data/dispute_cases.json';

export default function App() {
  const [lots, setLots] = useState(lotsData);
  const [selectedLot, setSelectedLot] = useState(lotsData[0]);
  const [activeTab, setActiveTab] = useState<'inspector' | 'certificate' | 'hubs' | 'studio' | 'disputes'>('inspector');
  const [selectedOnion, setSelectedOnion] = useState<any>(null);

  // Custom Assayer Studio State
  const [studioSampleSize, setStudioSampleSize] = useState(150);
  const [studioWeight, setStudioWeight] = useState(160);
  const [studioMoisture, setStudioMoisture] = useState(12.5);
  const [studioVariety, setStudioVariety] = useState('Nashik Red Garva');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const currentDetections = (detectionsData as any)[selectedLot.lot_id] || (detectionsData as any)['LOT-LASALGAON-2026-081'];

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const ga = Number((Math.random() * (88 - 76) + 76).toFixed(1));
      const urs = Number((Math.random() * (4.5 - 1.2) + 1.2).toFixed(1));
      const gb = Number((100 - ga - urs).toFixed(1));
      const avgDia = Number((Math.random() * (62 - 54) + 54).toFixed(1));
      const rate = ga >= 85 ? 2650 : (ga >= 80 ? 2480 : 2350);
      const total = rate * studioWeight;

      setSimulationResult({
        ga,
        gb,
        urs,
        avgDia,
        rate,
        total,
        sprouting: (Math.random() * 1.5).toFixed(1),
        mold: (Math.random() * 0.8).toFixed(1),
        bufferEligible: ga >= 75 && urs <= 5.0 && studioMoisture <= 13.5
      });
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) • NAFED ONION BUFFER • SIH26031</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AI-Powered Computer Vision Onion Quality Assessment & Digital Grading System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Automated Optical Size Distribution ($45-70	ext{mm}$), Pathogen Defect Delineation, Caliper Geometry & Instant DBT Settlement Platform
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-amber-950/80 text-amber-300 border border-amber-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Vision v3.4 Active</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'inspector', label: '🔍 AI Vision Crate Inspector', count: lots.length },
            { id: 'certificate', label: '📜 Digital Quality Certificate (QAC)' },
            { id: 'hubs', label: '🏢 Mandi Buffer Silo Network', count: centersData.length },
            { id: 'studio', label: '🧪 Custom Assayer Studio & Simulation' },
            { id: 'disputes', label: '⚖️ Re-Grading Audit Tribunal', count: disputesData.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: AI VISION CRATE INSPECTOR & CALIPER GRID
           ========================================================================= */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            {/* Lot Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>📦 APMC PROCUREMENT LOT SAMPLES IN QUEUE</span>
                <span className="text-amber-400 font-mono">Select Lot to inspect computer vision detection</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {lots.map((l) => (
                  <button
                    key={l.lot_id}
                    onClick={() => { setSelectedLot(l); setSelectedOnion(null); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      selectedLot.lot_id === l.lot_id
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-1 ring-amber-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-amber-400 font-bold">{l.lot_id.split('-')[1]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{l.mandi_name.split(' ')[0]} {l.mandi_name.split(' ')[1]}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{l.farmer_name}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">{l.grade_a_premium_pct}% Gr.A</span>
                      <span className="text-amber-300">₹{l.certified_nafed_payout_per_qtl}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Simulated Camera / Optical Scanning Grid */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{selectedLot.lot_id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                          {selectedLot.variety}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{selectedLot.mandi_name}</h3>
                      <p className="text-xs text-slate-400">Sample Size: {selectedLot.sample_onions_analyzed} Onions Segmented via Multi-Angle RGB-D Cameras</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      {(selectedLot.ai_vision_confidence * 100).toFixed(1)}% Precision
                    </span>
                  </div>

                  {/* Simulated Visual Crate Optical Detection Surface */}
                  <div className="relative aspect-[16/9] w-full bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 p-4 overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 z-10">
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> LIVE CAMERA FEED: CAMERA 01 (OPTICAL CALIPER ARRAY)</span>
                      <span>FOV: 800x450mm</span>
                    </div>

                    {/* Simulated Bounding Boxes Overlay */}
                    <div className="relative w-full h-full my-2">
                      {currentDetections.map((onion: any) => {
                        const isGradeA = onion.grade === 'GRADE_A';
                        const isSelected = selectedOnion?.id === onion.id;
                        return (
                          <div
                            key={onion.id}
                            onClick={() => setSelectedOnion(onion)}
                            style={{
                              left: `${onion.x}%`,
                              top: `${onion.y}%`,
                              width: `${onion.w}%`,
                              height: `${onion.h}%`
                            }}
                            className={`absolute rounded-xl cursor-pointer transition-all flex flex-col justify-between p-1 text-[9px] font-mono border-2 select-none ${
                              isSelected
                                ? 'bg-amber-500/30 border-amber-400 shadow-xl ring-2 ring-amber-300 z-30 scale-105'
                                : isGradeA
                                ? 'bg-emerald-500/10 border-emerald-500/70 hover:bg-emerald-500/25 z-10'
                                : 'bg-rose-500/15 border-rose-500/80 hover:bg-rose-500/30 z-20'
                            }`}
                          >
                            <span className={`px-1 rounded text-[8px] font-bold ${
                              isGradeA ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                            }`}>
                              #{onion.id} {onion.diameter_mm}mm
                            </span>
                            {onion.defect !== 'NONE' && (
                              <span className="bg-rose-600 text-white font-bold px-1 rounded text-[7px] truncate">
                                ⚠️ {onion.defect}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900 z-10">
                      <span>Click any onion box above to view caliper geometry</span>
                      <span className="text-emerald-400 font-bold">🟢 Grade A (Buffer) | 🔴 Defect/URS</span>
                    </div>
                  </div>

                  {/* Selected Onion Inspector Detail */}
                  {selectedOnion && (
                    <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-2xl space-y-2 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black rounded-lg text-xs font-mono">
                            BULB #{selectedOnion.id}
                          </span>
                          <span className="text-xs font-bold text-white">{selectedOnion.status}</span>
                        </div>
                        <span className="text-xs font-mono text-amber-300">Conf: {(selectedOnion.conf * 100).toFixed(1)}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-slate-300 pt-1">
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">DIAMETER</span>
                          <span className="font-bold text-emerald-400 text-sm">{selectedOnion.diameter_mm} mm</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">GRADE CLASS</span>
                          <span className="font-bold text-cyan-400 text-xs">{selectedOnion.grade}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl">
                          <span className="text-slate-500 block text-[9px]">PATHOLOGY</span>
                          <span className="font-bold text-amber-400 text-xs truncate">{selectedOnion.defect}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5: Quality Breakdown & Economic Settlement Summary */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Grading Breakdown Bar */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Grading & Size Distribution Breakdown</span>
                  </h4>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Grade A (45-70mm)</span>
                      <span className="text-xl font-black text-emerald-400 mt-1 block">{selectedLot.grade_a_premium_pct}%</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Buffer Eligible</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-amber-950">
                      <span className="text-slate-500 block text-[9px] uppercase">Grade B (35-45mm)</span>
                      <span className="text-xl font-black text-amber-400 mt-1 block">{selectedLot.grade_b_domestic_pct}%</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Domestic Sale</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px] uppercase">URS Reject (&lt;30mm)</span>
                      <span className="text-xl font-black text-rose-400 mt-1 block">{selectedLot.urs_reject_pct}%</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Sprout/Rot/Cut</span>
                    </div>
                  </div>

                  {/* Detailed Caliper Metrics */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Mean Bulb Diameter:</span>
                      <span className="text-white font-bold">{selectedLot.avg_diameter_mm} mm (±{selectedLot.diameter_std_dev_mm}mm)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Moisture Content:</span>
                      <span className="text-cyan-400 font-bold">{selectedLot.moisture_content_pct}% (Max Permissible: 13.5%)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Sprouting Rate:</span>
                      <span className="text-amber-400 font-bold">{selectedLot.sprouting_rate_pct}%</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Black Mold (Aspergillus niger):</span>
                      <span className="text-emerald-400 font-bold">{selectedLot.black_mold_rate_pct}% (Safe limit &lt;1.5%)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Predicted Cold Buffer Longevity:</span>
                      <span className="text-purple-400 font-bold">{selectedLot.storage_longevity_days} Days</span>
                    </div>
                  </div>
                </div>

                {/* Instant Financial DBT Settlement Card */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>NAFED Buffer Procurement Settlement</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                      DIRECT DBT
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Farmer Beneficiary:</span>
                      <span className="text-white font-bold">{selectedLot.farmer_name}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Lot Net Weight:</span>
                      <span className="text-cyan-400 font-bold">{selectedLot.total_lot_weight_quintals} Quintals</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Base MSP Rate:</span>
                      <span>₹{selectedLot.base_msp_inr_per_qtl} / Qtl</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Quality Incentive Premium:</span>
                      <span className={selectedLot.quality_premium_inr_per_qtl >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {selectedLot.quality_premium_inr_per_qtl >= 0 ? `+₹${selectedLot.quality_premium_inr_per_qtl}` : `-₹${Math.abs(selectedLot.quality_premium_inr_per_qtl)}`} / Qtl
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                      <span className="font-bold text-white">Certified Final Rate:</span>
                      <span className="text-emerald-400 font-black text-sm">₹{selectedLot.certified_nafed_payout_per_qtl} / Qtl</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950 flex justify-between items-center font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Total Disbursed to Bank Account</span>
                      <span className="text-lg font-black text-amber-400">₹{selectedLot.total_settlement_inr.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('certificate')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 transition-all"
                    >
                      <span>View QAC</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: OFFICIAL DIGITAL QUALITY CERTIFICATE (QAC)
           ========================================================================= */}
        {activeTab === 'certificate' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-amber-500/40 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS (DoCA)</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">Digital Quality Assessment Certificate (QAC)</h2>
                <p className="text-xs text-slate-400 font-mono">National Agricultural Cooperative Marketing Federation of India (NAFED)</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center font-mono text-xs">
                <QrCode className="w-12 h-12 text-amber-400 mx-auto" />
                <span className="text-[9px] text-slate-500 block mt-1">{selectedLot.qr_auth_code}</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold text-[10px] uppercase block">PRODUCER / FARMER DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="text-white font-bold">{selectedLot.farmer_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Aadhaar (Masked):</span><span>{selectedLot.farmer_aadhaar_masked}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Registered Mobile:</span><span>{selectedLot.farmer_phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Procurement Mandi:</span><span className="text-amber-300">{selectedLot.mandi_name}</span></div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold text-[10px] uppercase block">ASSAYING & COMMODITY SPECS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Commodity Variety:</span><span className="text-white font-bold">{selectedLot.variety}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Lot Net Weight:</span><span className="text-emerald-400 font-bold">{selectedLot.total_lot_weight_quintals} Quintals</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Mean Diameter:</span><span>{selectedLot.avg_diameter_mm} mm</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Assaying Timestamp:</span><span>{selectedLot.inspection_timestamp}</span></div>
              </div>
            </div>

            {/* Verified Grading Breakdown Table */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-emerald-400 font-bold text-[10px] uppercase block">COMPUTER VISION VERIFIED QUALITY METRICS:</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-1">
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[9px]">GRADE A</span>
                  <span className="text-emerald-400 font-black text-sm">{selectedLot.grade_a_premium_pct}%</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[9px]">GRADE B</span>
                  <span className="text-amber-400 font-black text-sm">{selectedLot.grade_b_domestic_pct}%</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[9px]">GRADE C / URS</span>
                  <span className="text-rose-400 font-black text-sm">{(selectedLot.grade_c_processing_pct + selectedLot.urs_reject_pct).toFixed(1)}%</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[9px]">MOISTURE</span>
                  <span className="text-cyan-400 font-black text-sm">{selectedLot.moisture_content_pct}%</span>
                </div>
              </div>
            </div>

            {/* Payout & DBT Bank Authorization */}
            <div className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl font-mono text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">DIRECT BENEFIT TRANSFER (DBT) SETTLEMENT APPROVED:</div>
                <div className="text-2xl font-black text-white mt-1">₹{selectedLot.total_settlement_inr.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rate: ₹{selectedLot.certified_nafed_payout_per_qtl}/Qtl • Bank Ref: {selectedLot.dbt_bank_ref}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Certificate ${selectedLot.qr_auth_code} sent to printer / PDF download.`)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: MANDI BUFFER SILO NETWORK
           ========================================================================= */}
        {activeTab === 'hubs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {centersData.map((c) => (
                <div key={c.center_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold">{c.center_id}</span>
                      <h3 className="font-bold text-sm text-white font-sans mt-0.5">{c.name}</h3>
                      <div className="text-slate-400 text-[11px]">{c.state}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {c.status.split('_')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">DAILY TARGET</span>
                      <span className="text-white font-bold">{c.daily_target_mt} MT</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">PROCURED YTD</span>
                      <span className="text-cyan-400 font-bold">{c.procured_ytd_mt.toLocaleString()} MT</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl text-[10px] text-slate-400 space-y-1">
                    <div className="flex justify-between"><span>Silo Temperature:</span><span className="text-white">{c.silo_temp_c}°C</span></div>
                    <div className="flex justify-between"><span>Relative Humidity:</span><span className="text-white">{c.silo_rh_pct}%</span></div>
                    <div className="flex justify-between"><span>Quality Index Score:</span><span className="text-emerald-400 font-bold">{c.avg_quality_index} / 100</span></div>
                    <div className="flex justify-between"><span>Trucks Waiting in Mandi:</span><span className="text-amber-400 font-bold">{c.trucks_waiting}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CUSTOM ASSAYER STUDIO & REAL-TIME SIMULATION
           ========================================================================= */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Custom Lot Assayer & Parameter Simulation</span>
              </h3>
              <p className="text-slate-400">Configure sample size and physical lot parameters to simulate real-time optical grading inference.</p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Sample Onions to Analyze</span>
                    <span className="font-mono text-amber-400">{studioSampleSize} Bulbs</span>
                  </div>
                  <input
                    type="range" min="30" max="300" step="10" value={studioSampleSize}
                    onChange={(e) => setStudioSampleSize(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Total Lot Net Weight (Quintals)</span>
                    <span className="font-mono text-cyan-400">{studioWeight} Qtl</span>
                  </div>
                  <input
                    type="range" min="10" max="500" step="5" value={studioWeight}
                    onChange={(e) => setStudioWeight(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-300">Moisture Content (% Wet Basis)</span>
                    <span className="font-mono text-emerald-400">{studioMoisture}%</span>
                  </div>
                  <input
                    type="range" min="10" max="18" step="0.1" value={studioMoisture}
                    onChange={(e) => setStudioMoisture(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Onion Crop Cultivar Variety</label>
                  <select
                    value={studioVariety}
                    onChange={(e) => setStudioVariety(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                  >
                    <option>Nashik Red Garva (Rabi)</option>
                    <option>Mahuva White Onion (Gujarat)</option>
                    <option>Kurnool Early Kharif (AP)</option>
                    <option>Malwa Yellow Globe (MP)</option>
                  </select>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Running Computer Vision Optical Assaying...' : 'Run Live AI Assaying Inference'}</span>
                </button>
              </div>
            </div>

            {/* Simulation Results Output */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Inferred Quality & Settlement Projection</span>
              </h4>

              {simulationResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px]">GRADE A</span>
                      <span className="text-lg font-black text-emerald-400">{simulationResult.ga}%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                      <span className="text-slate-500 block text-[9px]">GRADE B</span>
                      <span className="text-lg font-black text-amber-400">{simulationResult.gb}%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px]">URS REJECT</span>
                      <span className="text-lg font-black text-rose-400">{simulationResult.urs}%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span>Calculated Mean Diameter:</span><span className="text-white font-bold">{simulationResult.avgDia} mm</span></div>
                    <div className="flex justify-between"><span>Sprouting Shoot Defect:</span><span className="text-amber-400">{simulationResult.sprouting}%</span></div>
                    <div className="flex justify-between"><span>Black Mold Contamination:</span><span className="text-emerald-400">{simulationResult.mold}%</span></div>
                    <div className="flex justify-between"><span>Certified NAFED Rate:</span><span className="text-cyan-400 font-bold">₹{simulationResult.rate} / Qtl</span></div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Projected Net DBT Payout</span>
                      <span className="text-xl font-black text-white">₹{simulationResult.total.toLocaleString()}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      simulationResult.bufferEligible ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                    }`}>
                      {simulationResult.bufferEligible ? '✅ Buffer Eligible' : '⚠️ Local Market Sale'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Camera className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Run Live AI Assaying Inference" to simulate real-time computer vision grading.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: DISPUTE RESOLUTION & AUDIT TRIBUNAL
           ========================================================================= */}
        {activeTab === 'disputes' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                  <Gavel className="w-4 h-4 text-amber-400" />
                  <span>NAFED / APMC Quality Dispute Resolution Tribunal</span>
                </h3>
                <p className="text-slate-400">Eliminating human subjectivity and corruption through transparent AI optical re-grading verification.</p>
              </div>
            </div>

            <div className="space-y-4">
              {disputesData.map((d) => (
                <div key={d.dispute_id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold">{d.dispute_id} • Lot: {d.lot_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{d.farmer}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {d.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-rose-950/30 border border-rose-900/60 rounded-xl text-rose-300 space-y-0.5">
                      <span className="text-[9px] uppercase font-bold block text-rose-400">Manual Assayer Finding (Disputed):</span>
                      <p>{d.manual_grader_finding}</p>
                    </div>
                    <div className="p-3 bg-emerald-950/30 border border-emerald-900/60 rounded-xl text-emerald-300 space-y-0.5">
                      <span className="text-[9px] uppercase font-bold block text-emerald-400">AI Computer Vision Optical Re-Scan:</span>
                      <p>{d.ai_vision_audit_finding}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-white font-sans text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Tribunal Verdict:</strong> {d.tribunal_resolution}</span>
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
