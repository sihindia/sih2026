import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Scale, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  Globe 
} from 'lucide-react';

import lotsData from './data/onion_procurement_lots_and_grading.json';
import detectionsData from './data/cv_detected_onion_samples.json';
import hubsData from './data/procurement_hubs_telemetry.json';
import disputesData from './data/dispute_redressal_cases.json';
import statsData from './data/pyaazparikshan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'te'>('en');
  const [lots, setLots] = useState(lotsData);
  const [selectedLot, setSelectedLot] = useState(lotsData[0]);
  const [detections, setDetections] = useState(detectionsData);
  const [selectedOnion, setSelectedOnion] = useState<any>(null);
  const [hubs, setHubs] = useState(hubsData);
  const [disputes, setDisputes] = useState(disputesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'inspector' | 'qac' | 'hubs' | 'studio' | 'disputes'>('inspector');

  // Studio Sim
  const [studioSamples, setStudioSamples] = useState(150);
  const [studioWeight, setStudioWeight] = useState(160);
  const [simResult, setSimResult] = useState<any>(null);

  const runSim = () => {
    const ga = Number((Math.random() * (88 - 76) + 76).toFixed(1));
    const urs = Number((Math.random() * (4 - 1) + 1).toFixed(1));
    const gb = Number((100 - ga - urs).toFixed(1));
    const rate = ga >= 85 ? 2650 : (ga >= 80 ? 2480 : 2350);
    setSimResult({ ga, gb, urs, rate, total: rate * studioWeight });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS • NAFED ONION BUFFER • SIH26031</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              PyaazParikshan AI: Computer Vision Quality Assessment &amp; Grading for Onions
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Onion Buffer Quality Assurance: Real-Time Bounding-Box Detection, Caliper Sizing (45-70mm), URS (Sprouted/Rotten) Identification &amp; Instant Mandi DBT Payout
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'inspector', label: '📷 CV Optical Bounding Box Inspector', count: lots.length },
            { id: 'qac', label: '📜 Digital Quality Certificate (QAC)' },
            { id: 'hubs', label: '🏛️ Procurement Mandi Telemetry', count: hubs.length },
            { id: 'studio', label: '🧪 Batch Grading Studio Simulator' },
            { id: 'disputes', label: '⚖️ Dispute Redressal & Stats' }
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
            VIEW 1: INSPECTOR
           ========================================================================= */}
        {activeTab === 'inspector' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lots.map((l) => (
                <button
                  key={l.lot_id}
                  onClick={() => setSelectedLot(l)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedLot.lot_id === l.lot_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{l.lot_id}</span>
                    <span className="text-emerald-400">{l.grade_a_pct}% Grade A</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {l.variety}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{l.mandi_center.split('(')[0]}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{l.lot_weight_quintals} Qtl</span>
                    <span className="text-emerald-400">{l.final_payout_rate}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedLot.lot_id} • {selectedLot.farmer_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedLot.mandi_center}</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedLot.grade_classification}
                  </span>
                </div>

                {/* Simulated Computer Vision Camera Canvas */}
                <div className="relative w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                  {detections.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedOnion(d)}
                      style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
                      className={`absolute rounded-full border-2 transition-all flex items-center justify-center ${
                        d.grade === 'A' ? 'border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/30' :
                        d.grade === 'B' ? 'border-amber-500 bg-amber-500/10 hover:bg-amber-500/30' :
                        'border-rose-500 bg-rose-500/20 hover:bg-rose-500/40'
                      }`}
                    >
                      <span className="text-[9px] font-bold text-white shadow-sm">{d.grade}</span>
                    </button>
                  ))}
                  <div className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 px-2 py-1 rounded text-slate-400 font-mono">
                    CV Bounding Caliper: Click bulb to inspect
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">OPTICAL SENSING AUDIT:</span>
                  <div className="text-white font-sans text-xs">
                    Mean Bulb Caliper: <strong className="text-amber-300">{selectedLot.mean_diameter_mm}</strong> | Moisture: {selectedLot.moisture_content_pct}
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Grade Breakdown: Grade A ({selectedLot.grade_a_pct}%) | Grade B ({selectedLot.grade_b_pct}%) | URS Defect ({selectedLot.urs_pct}%)
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Defect Trace: Sprouting {selectedLot.sprouting_pct} | Black Mold {selectedLot.black_mold_pct}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL LOT VALUE</span><span className="text-emerald-400 font-bold">{selectedLot.total_lot_value}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ESTIMATED STORAGE LIFE</span><span className="text-cyan-400 font-bold">{selectedLot.storage_shelf_life_days} Days</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('qac')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Generate Tamper-Proof Digital Certificate (QAC) ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Bulb Caliper Inspection</span>
                  </h4>
                  {selectedOnion ? (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                      <div>Bulb ID: <strong className="text-amber-400">#{selectedOnion.id}</strong></div>
                      <div>Caliper Diameter: <strong className="text-white">{selectedOnion.diameter_mm}</strong></div>
                      <div>Classification: <strong className={selectedOnion.grade === 'A' ? 'text-emerald-400' : 'text-amber-400'}>Grade {selectedOnion.grade} ({selectedOnion.status})</strong></div>
                      <div>Defect Status: <strong className="text-cyan-300">{selectedOnion.defect}</strong></div>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-950 rounded-2xl text-center text-slate-500">
                      Click any detected onion in the viewport to display individual bounding-box caliper metrics.
                    </div>
                  )}
                  <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl">
                    <div className="text-amber-400 font-bold text-[10px] uppercase">NAFED DBT SETTLEMENT:</div>
                    <div className="text-white font-bold text-sm mt-0.5">{selectedLot.dbt_transaction_utr}</div>
                    <div className="text-[10px] text-slate-400">Instant credit to farmer bank account verified.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: QAC */}
        {activeTab === 'qac' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-amber-500/40 pb-3">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">DEPARTMENT OF CONSUMER AFFAIRS (DoCA)</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">National Quality Assessment Certificate (QAC)</h4>
              </div>
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex justify-between"><span>Certificate No:</span><strong className="text-white">{selectedLot.quality_certificate_no}</strong></div>
              <div className="flex justify-between"><span>Farmer Name:</span><strong className="text-white">{selectedLot.farmer_name}</strong></div>
              <div className="flex justify-between"><span>Lot Center:</span><strong className="text-cyan-400">{selectedLot.mandi_center}</strong></div>
              <div className="flex justify-between"><span>Assessed Grade:</span><strong className="text-emerald-400">{selectedLot.grade_classification}</strong></div>
              <div className="flex justify-between"><span>Net Quantity:</span><strong className="text-white">{selectedLot.lot_weight_quintals} Quintals</strong></div>
              <div className="flex justify-between"><span>Authorized Payout:</span><strong className="text-emerald-400 text-sm">{selectedLot.total_lot_value}</strong></div>
            </div>
          </div>
        )}

        {/* VIEW 3: HUBS */}
        {activeTab === 'hubs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {hubs.map((h: any) => (
              <div key={h.hub_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-white font-sans">{h.hub_name}</h4>
                    <div className="text-slate-400 text-[11px]">{h.state} • Target: {h.daily_target}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">{h.quality_index}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="flex justify-between"><span>Procured:</span><span className="text-emerald-400 font-bold">{h.procured_so_far}</span></div>
                  <div className="flex justify-between"><span>Storage Temp/RH:</span><span className="text-cyan-400 font-bold">{h.ambient_temp} / {h.relative_humidity}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: STUDIO */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Batch Quality Grading Simulator</span>
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Sample Count:</span><span className="font-mono text-amber-400">{studioSamples} Bulbs</span></div>
                  <input type="range" min="50" max="300" step="10" value={studioSamples} onChange={(e) => setStudioSamples(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Lot Weight:</span><span className="font-mono text-emerald-400">{studioWeight} Quintals</span></div>
                  <input type="range" min="50" max="400" step="10" value={studioWeight} onChange={(e) => setStudioWeight(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <button onClick={runSim} className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                  Run Computer Vision Grading Model
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h4 className="font-bold text-sm text-white font-sans">Simulated Grading Outcome</h4>
              {simResult ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">GRADE A</span><span className="text-base font-bold text-emerald-400">{simResult.ga}%</span></div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950"><span className="text-slate-500 block text-[9px]">GRADE B</span><span className="text-base font-bold text-amber-400">{simResult.gb}%</span></div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950"><span className="text-slate-500 block text-[9px]">URS</span><span className="text-base font-bold text-rose-400">{simResult.urs}%</span></div>
                  </div>
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                    <span className="text-xs text-white font-bold font-sans">Total Payout: ₹{simResult.total.toLocaleString()}</span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold rounded text-[10px] font-sans">₹{simResult.rate}/Qtl</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-sans">Click "Run Computer Vision Grading Model" to test.</div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 5: DISPUTES */}
        {activeTab === 'disputes' && (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Resolved Mandi Quality Disputes with Optical Audit Evidence</span>
            </h4>
            <div className="space-y-3">
              {disputes.map((d: any) => (
                <div key={d.dispute_id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-bold">{d.dispute_id} • {d.mandi}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">RESOLVED</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">Farmer: {d.farmer} | Disputed Metric: {d.disputed_metric}</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-slate-950 rounded-xl text-rose-300">Manual Claim: {d.manual_grader_claim}</div>
                    <div className="p-2 bg-slate-950 rounded-xl text-emerald-300">AI Result: {d.ai_cv_audit_result}</div>
                  </div>
                  <div className="text-amber-300 text-[10px] pt-1 border-t border-slate-800">Resolution: {d.resolution}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                  <span className="text-2xl font-black text-amber-400 mt-1 block">{s.value}</span>
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
