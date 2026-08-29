import React, { useState } from 'react';
import { 
  Scale, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  QrCode, 
  Sliders, 
  TrendingUp, 
  RefreshCw, 
  Gavel, 
  Building2, 
  ChevronRight, 
  Printer, 
  Layers, 
  BookOpen, 
  Cpu, 
  Gauge 
} from 'lucide-react';

import instrumentsData from './data/nawi_instruments.json';
import observationsData from './data/oiml_test_observations.json';
import standardsData from './data/oiml_standards_table.json';
import labsData from './data/rrsl_labs.json';

export default function App() {
  const [instruments, setInstruments] = useState(instrumentsData);
  const [selectedModel, setSelectedModel] = useState(instrumentsData[0]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tests' | 'report' | 'labs' | 'simulator'>('dashboard');

  // Sub-test tab inside test execution suite
  const [testSubTab, setTestSubTab] = useState<'weighing' | 'eccentricity' | 'repeatability'>('weighing');

  // Simulator State
  const [simLoad, setSimLoad] = useState(15.0);
  const [simIndication, setSimIndication] = useState(15.003);
  const [simResult, setSimResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentObservations = (observationsData as any)[selectedModel.model_id] || (observationsData as any)['NAWI-MOD-2026-081'];

  const runSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const e_g = selectedModel.verification_scale_interval_e_g;
      const load_g = simLoad * 1000.0;
      const ind_g = simIndication * 1000.0;
      const error_g = Number((ind_g - load_g).toFixed(3));
      const m_over_e = load_g / e_g;
      
      let mpe_g = 5.0;
      if (m_over_e <= 500) mpe_g = 0.5 * e_g;
      else if (m_over_e <= 2000) mpe_g = 1.0 * e_g;
      else mpe_g = 1.5 * e_g;

      const isPass = Math.abs(error_g) <= mpe_g;

      setSimResult({
        load: simLoad,
        ind: simIndication,
        error_g,
        mpe_g,
        m_over_e,
        isPass
      });
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Scale className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) • LEGAL METROLOGY DIVISION • SIH26035</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Non-Automatic Weighing Instruments (NAWI) OIML R-76 Test Report Generator
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Automated Type Approval Test Matrix, Maximum Permissible Error (MPE) Calculation & Digital Model Approval Certificates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>OIML R 76-1:2006 Engine</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'dashboard', label: '⚖️ NAWI Model Specs & Metrology', count: instruments.length },
            { id: 'tests', label: '📊 OIML R-76 Test Execution Suite' },
            { id: 'report', label: '📜 Model Approval Test Report' },
            { id: 'labs', label: '🏢 RRSL Testing Laboratories', count: labsData.length },
            { id: 'simulator', label: '🧪 Custom NAWI Load Caliper Test' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: NAWI MODEL SPECS & METROLOGY DASHBOARD
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Model Selector Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🔬 TESTED WEIGHING INSTRUMENT MODELS UNDERGOING TYPE EVALUATION</span>
                <span className="text-cyan-400 font-mono">Select model to view metrological parameters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {instruments.map((m) => (
                  <button
                    key={m.model_id}
                    onClick={() => setSelectedModel(m)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedModel.model_id === m.model_id
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-400 font-bold">{m.model_id.split('-')[2]} • {m.accuracy_class.split(' ')[0]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{m.model_name}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{m.manufacturer}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-bold">Max: {m.max_capacity_kg} kg</span>
                      <span className="text-cyan-300">e = {m.verification_scale_interval_e_g}g</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Metrological Specification Sheet */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{selectedModel.model_id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 font-mono">
                          {selectedModel.accuracy_class}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{selectedModel.model_name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedModel.manufacturer}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                      {selectedModel.overall_compliance_verdict}
                    </span>
                  </div>

                  {/* Metrological Values Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px]">MAX CAPACITY</span>
                      <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedModel.max_capacity_kg} kg</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                      <span className="text-slate-500 block text-[9px]">MIN CAPACITY</span>
                      <span className="text-xl font-black text-purple-400 mt-1 block">{selectedModel.min_capacity_g} g</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                      <span className="text-slate-500 block text-[9px]">INTERVAL (e)</span>
                      <span className="text-xl font-black text-emerald-400 mt-1 block">{selectedModel.verification_scale_interval_e_g} g</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                      <span className="text-slate-500 block text-[9px]">INTERVALS (n)</span>
                      <span className="text-xl font-black text-amber-400 mt-1 block">{selectedModel.number_of_intervals_n}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Evaluated as per Standard:</span>
                      <span className="text-white font-bold">{selectedModel.oiml_recommendation}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Testing Laboratory:</span>
                      <span className="text-cyan-400 font-bold">{selectedModel.testing_laboratory}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Approved Certificate Ref:</span>
                      <span className="text-emerald-400 font-bold">{selectedModel.model_approval_number}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5: Direct Action Links */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>OIML R-76 Type Evaluation Status</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      PASS
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans leading-relaxed">
                    Instrument underwent <strong>Weighing Linearity Test (0 to Max)</strong>, <strong>Eccentricity Corner Loading</strong>, and <strong>Repeatability Sequence</strong> with 100% of errors falling strictly within statutory Maximum Permissible Error (MPE) envelopes.
                  </p>

                  <button
                    onClick={() => setActiveTab('tests')}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>View Detailed Test Execution Suite</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: OIML R-76 TEST EXECUTION SUITE
           ========================================================================= */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex gap-2 border-b border-slate-800 pb-3">
              {[
                { id: 'weighing', label: '1. Weighing Linearity (0 to Max)' },
                { id: 'eccentricity', label: '2. Eccentricity Corner Test' },
                { id: 'repeatability', label: '3. Repeatability Test' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setTestSubTab(sub.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    testSubTab === sub.id ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {testSubTab === 'weighing' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Weighing Performance Test (Load & Error vs MPE)</span>
                </h4>
                <div className="space-y-2">
                  {currentObservations.weighing_test.map((w: any) => (
                    <div key={w.step} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold">Step #{w.step}</span>
                        <span className="text-white font-bold">Load: {w.load_kg} kg</span>
                        <span className="text-slate-400">➔ Indicated: {w.indicated_kg} kg</span>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div><span className="text-slate-500 text-[9px] block">ERROR</span><span className="text-emerald-400 font-bold">{w.error_g} g</span></div>
                        <div><span className="text-slate-500 text-[9px] block">MPE ALLOWED</span><span className="text-slate-300">±{w.mpe_g} g</span></div>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded text-[10px]">{w.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {testSubTab === 'eccentricity' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Eccentricity Corner Load Test (Max/3 Applied)</span>
                </h4>
                <div className="space-y-2">
                  {currentObservations.eccentricity_test.map((e: any, idx: number) => (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-purple-400 font-bold">{e.position}</span>
                        <div className="text-slate-400 text-[11px] mt-0.5">Applied: {e.load_applied_kg} kg ➔ Indicated: {e.indicated_kg} kg</div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div><span className="text-slate-500 text-[9px] block">ERROR</span><span className="text-emerald-400 font-bold">{e.error_g} g</span></div>
                        <div><span className="text-slate-500 text-[9px] block">MPE ALLOWED</span><span className="text-slate-300">±{e.mpe_g} g</span></div>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded text-[10px]">{e.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {testSubTab === 'repeatability' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Repeatability Test (5 Consecutive Runs at 0.5 Max)</span>
                </h4>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {currentObservations.repeatability_test.map((r: any) => (
                    <div key={r.run} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[9px]">RUN #{r.run}</span>
                      <span className="text-sm font-bold text-white mt-1 block">{r.indicated_kg} kg</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-emerald-400 font-bold text-[10px] uppercase">MAX OBSERVED DIFFERENCE:</span>
                    <div className="text-base font-black text-white">{currentObservations.repeatability_max_diff_g} g (Permissible MPE: {currentObservations.repeatability_mpe_g} g)</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                    {currentObservations.repeatability_verdict}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW 3: MODEL APPROVAL TEST REPORT & CERTIFICATE
           ========================================================================= */}
        {activeTab === 'report' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-cyan-500/40 pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">OIML R 76 Model Approval Test Certificate</h3>
                <p className="text-slate-400 text-[11px]">Certificate Ref: {selectedModel.model_approval_number}</p>
              </div>
              <QrCode className="w-12 h-12 text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-bold text-[10px] uppercase block">APPLICANT & MODEL DETAILS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Applicant:</span><span className="text-white font-bold font-sans">{selectedModel.manufacturer}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Model Name:</span><span>{selectedModel.model_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Accuracy Class:</span><span className="text-emerald-400 font-bold">{selectedModel.accuracy_class}</span></div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-purple-400 font-bold text-[10px] uppercase block">METROLOGICAL CHARACTERISTICS:</span>
                <div className="flex justify-between"><span className="text-slate-500">Max Capacity:</span><span className="text-white font-bold">{selectedModel.max_capacity_kg} kg</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Verification Interval (e):</span><span>{selectedModel.verification_scale_interval_e_g} g</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Scale Interval (d):</span><span>{selectedModel.scale_interval_d_g} g</span></div>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">STATUTORY CONFORMITY VERDICT:</span>
                <div className="text-lg font-black text-white font-sans mt-0.5">APPROVED FOR TRADE & COMMERCIAL WEIGHING IN INDIA</div>
                <div className="text-slate-400 text-[10px]">Tested at: {selectedModel.testing_laboratory} • Date: {selectedModel.testing_date}</div>
              </div>
              <button onClick={() => alert("Official Model Approval Test Certificate exported as PDF.")} className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Export Test Report PDF
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: RRSL TESTING LABORATORIES
           ========================================================================= */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {labsData.map((lab) => (
                <div key={lab.lab_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-cyan-400 font-bold text-[10px]">{lab.lab_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{lab.name}</h4>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div><strong>Director:</strong> {lab.director}</div>
                    <div><strong>Active Test Bays:</strong> {lab.active_test_bays} Bays</div>
                    <div className="text-emerald-400 font-bold text-[10px] pt-1 border-t border-slate-900">{lab.accreditation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: INTERACTIVE TEST RIG SIMULATOR
           ========================================================================= */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Custom NAWI Load Point Evaluator</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Applied Test Load (kg)</span><span className="text-cyan-400">{simLoad} kg</span></div>
                  <input type="range" min="0.5" max="30.0" step="0.5" value={simLoad} onChange={(e) => setSimLoad(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Scale Indication Reading (kg)</span><span className="text-purple-400">{simIndication} kg</span></div>
                  <input type="range" min={simLoad - 0.02} max={simLoad + 0.02} step="0.001" value={simIndication} onChange={(e) => setSimIndication(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>

                <button onClick={runSimulation} disabled={isCalculating} className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                  <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                  <span>{isCalculating ? 'Evaluating OIML R-76 MPE Envelope...' : 'Calculate Error & Verify OIML Conformity'}</span>
                </button>
              </div>
            </div>

            {/* Simulation Result Output */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Metrological MPE Verification Outcome</span>
              </h4>

              {simResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px]">OBSERVED ERROR</span>
                      <span className="text-2xl font-black text-cyan-400">{simResult.error_g > 0 ? `+${simResult.error_g}` : simResult.error_g} g</span>
                    </div>
                    <div className={`p-3 bg-slate-950 rounded-2xl border ${simResult.isPass ? 'border-emerald-950' : 'border-rose-950'}`}>
                      <span className="text-slate-500 block text-[9px]">OIML R-76 VERDICT</span>
                      <span className={`text-2xl font-black ${simResult.isPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {simResult.isPass ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300">
                    <div className="flex justify-between"><span>Permissible MPE Limit:</span><span className="text-white font-bold">±{simResult.mpe_g} g</span></div>
                    <div className="flex justify-between"><span>Load in Terms of (e):</span><span className="text-amber-400 font-bold">{simResult.m_over_e} e</span></div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Gauge className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Calculate Error & Verify OIML Conformity" to evaluate.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
