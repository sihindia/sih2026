import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  FileText, 
  Building2, 
  Award, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

import instrumentsData from './data/nawi_tested_instruments_catalog.json';
import testsData from './data/oiml_r76_weighing_performance_tests.json';
import labsData from './data/rrsl_metrology_laboratories.json';
import statsData from './data/oiml_compliance_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'kn' | 'gu'>('en');
  const [instruments, setInstruments] = useState(instrumentsData);
  const [selectedInst, setSelectedInst] = useState(instrumentsData[0]);
  const [weighingTests, setWeighingTests] = useState(testsData);
  const [labs, setLabs] = useState(labsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tests' | 'report' | 'labs' | 'simulator'>('dashboard');

  // Simulator
  const [simLd, setSimLd] = useState(15.0);
  const [simInd, setSimInd] = useState(15.003);
  const [simOut, setSimOut] = useState<any>(null);

  const runSim = () => {
    const err = Number(((simInd - simLd) * 1000).toFixed(1));
    const mpe = simLd <= 2.5 ? 2.5 : simLd <= 10.0 ? 5.0 : 7.5;
    const isPass = Math.abs(err) <= mpe;
    setSimOut({ err, mpe, isPass });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Scale className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS • LEGAL METROLOGY DIVISION • SIH26035</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OIML MetrologyLab: Non-Automatic Weighing Instruments (NAWI) R-76 Test Report Generator
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Standardized Model Approval Testing Platform for NAWI as per OIML Recommendation R 76-1:2006 &amp; R 76-2:2007: Automated Intrinsic Error Calculations, MPE Tolerance Checks &amp; Digital Test Reports
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'dashboard', label: '⚖️ NAWI Model Specs & Metrology', count: instruments.length },
            { id: 'tests', label: '📊 OIML R-76 Test Execution Suite', count: weighingTests.length },
            { id: 'report', label: '📜 Model Approval Test Report' },
            { id: 'labs', label: '🏢 RRSL Testing Laboratories', count: labs.length },
            { id: 'simulator', label: '🧪 Custom Load Test Caliper' }
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
            VIEW 1: DASHBOARD
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {instruments.map((inst) => (
                <button
                  key={inst.instrument_id}
                  onClick={() => setSelectedInst(inst)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedInst.instrument_id === inst.instrument_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{inst.instrument_id}</span>
                    <span className="text-emerald-400">{inst.accuracy_class}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {inst.instrument_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{inst.manufacturer_name}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Max: {inst.max_capacity}</span>
                    <span className="text-amber-400">e = {inst.verification_scale_interval_e}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedInst.instrument_id} • {selectedInst.accuracy_class}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedInst.instrument_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedInst.approval_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">METROLOGICAL CHARACTERISTICS (OIML R 76-1):</span>
                  <div className="text-white font-sans text-xs">
                    Manufacturer: <strong className="text-slate-300">{selectedInst.manufacturer_name}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Max: {selectedInst.max_capacity} | Min: {selectedInst.min_capacity}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Verification Interval (e): {selectedInst.verification_scale_interval_e} | Actual Scale Interval (d): {selectedInst.scale_interval_d} | n = {selectedInst.number_of_intervals_n}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Testing Lab: {selectedInst.testing_laboratory} | Standard: {selectedInst.evaluation_standard}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('report')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>View Full OIML R 76-2 Digital Test Report ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Model Approval Certificate</span>
                  </h4>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span>Certificate No:</span><strong className="text-white">{selectedInst.model_approval_certificate}</strong></div>
                    <div className="flex justify-between"><span>Conformity:</span><strong className="text-emerald-400">OIML-CS Pattern Approved</strong></div>
                    <div className="flex justify-between"><span>Stamping Validity:</span><strong className="text-cyan-400">10 Years Pan-India</strong></div>
                  </div>
                  <div className="p-4 bg-cyan-950/40 border border-cyan-800 rounded-2xl text-[10px] text-slate-400">
                    Certified under Legal Metrology (General) Rules, 2011 and OIML R 76-1.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TESTS */}
        {activeTab === 'tests' && (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Clause A.4.4 Weighing Performance Test (Increasing &amp; Decreasing Loads)</span>
            </h4>
            <div className="space-y-2">
              {weighingTests.map((t) => (
                <div key={t.step_number} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-cyan-400 font-bold">Step #{t.step_number}</span>
                  <span className="text-white">Load: <strong>{t.applied_load}</strong></span>
                  <span className="text-slate-300">Indication: <strong>{t.indicated_reading}</strong></span>
                  <span className="text-emerald-400 font-bold">Error: {t.intrinsic_error}</span>
                  <span className="text-amber-400">MPE: {t.maximum_permissible_error}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-bold">{t.test_verdict}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: REPORT */}
        {activeTab === 'report' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-cyan-500/40 pb-3">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">OIML R 76-2 TYPE EVALUATION REPORT</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">{selectedInst.model_approval_certificate}</h4>
              </div>
              <Award className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300 text-xs font-sans">
              <div>Instrument: <strong className="text-white">{selectedInst.instrument_name}</strong></div>
              <div>Manufacturer: <strong className="text-slate-300">{selectedInst.manufacturer_name}</strong></div>
              <div>Class: <strong className="text-cyan-400">{selectedInst.accuracy_class}</strong></div>
              <div>Capacity: <strong className="text-white">{selectedInst.max_capacity}</strong></div>
              <div>Laboratory: <strong className="text-purple-300">{selectedInst.testing_laboratory}</strong></div>
              <div>Status: <strong className="text-emerald-400">OIML R 76-1 COMPLIANT</strong></div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center font-sans text-xs text-slate-400">
              This digital test report complies with OIML Certificate System (OIML-CS) requirements for Non-Automatic Weighing Instruments.
            </div>
          </div>
        )}

        {/* VIEW 4: LABS */}
        {activeTab === 'labs' && (
          <div className="space-y-4 font-mono text-xs">
            {labs.map((l) => (
              <div key={l.lab_id} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-bold">{l.lab_id} • {l.lab_name}</span>
                  <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded text-[10px] font-bold">{l.testing_bays_count}</span>
                </div>
                <p className="text-slate-300 font-sans text-xs">Director: {l.director_head} | Accreditation: {l.accreditation}</p>
                <div className="text-amber-300 text-xs pt-1 border-t border-slate-800">Specialization: {l.metrological_specialization}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Custom Load MPE Calculator</span>
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Test Load (kg):</span><span className="font-mono text-cyan-400">{simLd} kg</span></div>
                  <input type="range" min="0.5" max="30.0" step="0.5" value={simLd} onChange={(e) => setSimLd(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Indicated Reading (kg):</span><span className="font-mono text-amber-400">{simInd} kg</span></div>
                  <input type="number" step="0.001" value={simInd} onChange={(e) => setSimInd(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
                </div>
                <button onClick={runSim} className="w-full py-3 bg-cyan-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                  Calculate Intrinsic Error &amp; Verify MPE
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h4 className="font-bold text-sm text-white font-sans">Verification Output</h4>
              {simOut ? (
                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl border flex justify-between items-center ${
                    simOut.isPass ? 'bg-emerald-950/60 border-emerald-500' : 'bg-rose-950/60 border-rose-500'
                  }`}>
                    <span className="text-white font-bold text-xs font-sans">{simOut.isPass ? 'PASS (WITHIN MPE)' : 'FAIL (EXCEEDS MPE)'}</span>
                    <span className="font-mono text-sm font-bold text-white">Error: {simOut.err} g</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-xs">
                    <div>Maximum Permissible Error (MPE): <strong className="text-amber-400">±{simOut.mpe} g</strong></div>
                    <div>Intrinsic Error: <strong className={simOut.isPass ? 'text-emerald-400' : 'text-rose-400'}>{simOut.err} g</strong></div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-sans">Set parameters and click "Calculate Intrinsic Error".</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
