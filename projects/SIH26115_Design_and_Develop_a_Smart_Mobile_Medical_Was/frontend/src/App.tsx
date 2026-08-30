import React, { useState } from 'react';
import { 
  Trash2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Cpu, 
  RefreshCw, 
  QrCode, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/hospital_biomedical_waste_collection_cases.json';
import cadData from './data/autodesk_fusion_generative_cad_specs.json';
import schemesData from './data/cpcb_biomedical_waste_color_schemes.json';
import statsData from './data/fusionmedwaste_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [cad, setCad] = useState(cadData);
  const [schemes, setSchemes] = useState(schemesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'cad' | 'schemes' | 'manifest' | 'stats'>('cases');

  // Interactive Vision Classifier Simulator
  const [isClassifying, setIsClassifying] = useState(false);
  const [classResult, setClassResult] = useState<any>({
    bin: "RED BIN (Infectious Plastics & IV Tubing)",
    treatment: "Autoclaving at 121°C + Shredding for Authorized Recycling",
    qr: "CPCB-BMW-DEL-88192-2026",
    accuracy: "99.4% AI Vision Confidence"
  });

  const handleClassify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClassifying(true);
    setTimeout(() => {
      setClassResult({
        bin: "RED BIN (Infectious Plastics & IV Tubing)",
        treatment: "Autoclaving at 121°C + Shredding for Authorized Recycling",
        qr: "CPCB-BMW-DEL-88192-2026",
        accuracy: "99.4% AI Vision Confidence"
      });
      setIsClassifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Trash2 className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>AUTODESK • FUSIONMEDWASTE 360 SMART MOBILE MEDICAL WASTE AMR • SIH26115</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Autodesk FusionMedWaste: Smart Mobile Medical-Waste Collection & Segregation System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Autonomous Mobile Robot (AMR), AI Computer Vision 4-Bin Sorting & Autodesk Fusion Generative Chassis Design
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🤖 AMR Waste Collection', count: cases.length },
            { id: 'cad', label: '🛠️ Fusion CAD Specs', count: cad.length },
            { id: 'schemes', label: '🎨 CPCB Color Segregation', count: schemes.length },
            { id: 'manifest', label: '📜 CPCB Digital QR Manifesto' },
            { id: 'stats', label: '📊 MedWaste Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-rose-400' : 'bg-slate-800 text-slate-300'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.case_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.case_id === c.case_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.case_id}</span>
                    <span className="text-cyan-300">Total: {c.total_weight_kg} kg</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.hospital_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Robot: {c.robot_unit}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Yellow: {c.yellow_bag_kg}kg • Red: {c.red_bag_kg}kg</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.case_id} • {selectedCase.robot_unit}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.hospital_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">4-COMPARTMENT WEIGHT TELEMETRY:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Yellow (Anatomical): <strong className="text-amber-400">{selectedCase.yellow_bag_kg} kg</strong></div>
                    <div>Red (Plastics): <strong className="text-rose-400">{selectedCase.red_bag_kg} kg</strong></div>
                    <div>White (Sharps): <strong className="text-cyan-300">{selectedCase.white_sharps_kg} kg</strong></div>
                    <div>Blue (Glass): <strong className="text-indigo-400">{selectedCase.blue_glass_kg} kg</strong></div>
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    CPCB Digital Manifesto: <strong>{selectedCase.cpcb_qr_manifest}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL LOAD</span><span className="text-white font-bold">{selectedCase.total_weight_kg} kg</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI VISION ACCURACY</span><span className="text-emerald-400 font-bold">{selectedCase.vision_confidence_pct}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('cad')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine Autodesk Fusion Generative CAD Design ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>AI Waste Vision Classifier</span>
                  </h4>
                  <form onSubmit={handleClassify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Hospital Waste Item</label>
                      <input type="text" readOnly value="Contaminated IV Tubing & Catheter Lines" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isClassifying} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isClassifying ? 'animate-spin' : ''}`} />
                      <span>{isClassifying ? 'Scanning Depth Vision & Spectral Image...' : 'Classify Medical Waste Item'}</span>
                    </button>
                  </form>
                  {classResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Bin: <strong className="text-rose-400 font-mono text-xs">{classResult.bin}</strong></div>
                      <div>QR: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{classResult.qr}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CAD */}
        {activeTab === 'cad' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {cad.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">FUSION GENERATIVE CAD</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.component}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Material: <strong className="text-white">{c.material}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">FEA Safety Factor: {c.fea_safety_factor}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: SCHEMES */}
        {activeTab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {schemes.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{s.color}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.waste_type}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.treatment}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MANIFEST */}
        {activeTab === 'manifest' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <QrCode className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">CPCB Bio-Medical Waste Digital QR Manifesto Generator</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time digital barcoding and GPS telemetry integration with Common Bio-Medical Waste Treatment Facilities (CBWTF) under BMW Rules 2016.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
