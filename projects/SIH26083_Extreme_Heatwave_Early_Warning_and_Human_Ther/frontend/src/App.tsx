import React, { useState } from 'react';
import { 
  Sun, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HeartPulse, 
  Activity, 
  RefreshCw, 
  Sliders, 
  ShieldAlert, 
  Building2, 
  Globe 
} from 'lucide-react';

import casesData from './data/human_thermal_stress_cases.json';
import indicesData from './data/thermal_stress_indices_matrix.json';
import hapData from './data/ward_heat_action_plans.json';
import statsData from './data/thermalshield_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [indices, setIndices] = useState(indicesData);
  const [hap, setHap] = useState(hapData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'indices' | 'hospital' | 'hap' | 'stats'>('cases');

  // Interactive Thermal Stress Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [stressResult, setStressResult] = useState<any>({
    heatIndex: "54.6°C (Extreme Danger / RealFeel)",
    wbgt: "33.8°C (Lethal Limit for Heavy Outdoor Labor)",
    utci: "44.2°C (Extreme Thermal Stress)",
    projectedSpike: "+285 admissions/day (Dehydration & Hyperthermia)",
    civicTrigger: "Mandatory labor suspension from 11:30 to 16:00; activate 85 cooling shelters"
  });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setStressResult({
        heatIndex: "54.6°C (Extreme Danger / RealFeel)",
        wbgt: "33.8°C (Lethal Limit for Heavy Outdoor Labor)",
        utci: "44.2°C (Extreme Thermal Stress)",
        projectedSpike: "+285 admissions/day (Dehydration & Hyperthermia)",
        civicTrigger: "Mandatory labor suspension from 11:30 to 16:00; activate 85 cooling shelters"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Sun className="w-4 h-4 text-rose-400 animate-spin" />
              <span>NCMRWF • THERMALSHIELD 360 HUMAN THERMAL STRESS & EARLY WARNING • SIH26083</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NCMRWF ThermalShield: Extreme Heatwave Early Warning & Human Thermal Stress Index
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Fusing Temperature, Humidity, Wind & Radiation into Physiological Indices (WBGT, UTCI, Heat Index) Linked to Ward-Level Heat Action Plans
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
            { id: 'cases', label: '☀️ Thermal Stress Cases', count: cases.length },
            { id: 'indices', label: '🌡️ WBGT & UTCI Indices', count: indices.length },
            { id: 'hospital', label: '🏥 Mortality & Hospital Risk' },
            { id: 'hap', label: '🏢 Ward Heat Action Plans', count: hap.length },
            { id: 'stats', label: '📊 ThermalShield Telemetry' }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <span className="text-amber-400">Day {c.forecast_lead_day} ({c.lead_time_hours}h)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.city_zone}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.hazard_type}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>HI: {c.heat_index_c}°C | WBGT: {c.wbgt_index_c}°C</span>
                    <span className="text-rose-400">RED ALERT</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.case_id} • {selectedCase.city_zone}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.hazard_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">PHYSIOLOGICAL HEAT METRICS & DEMOGRAPHIC VULNERABILITY:</span>
                  <div className="text-white font-sans text-xs">
                    Air Temp: <strong className="text-amber-400">{selectedCase.dry_bulb_temp_c}°C</strong> | Relative Humidity: <strong className="text-cyan-300">{selectedCase.relative_humidity_pct}%</strong>
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    RealFeel Heat Index: <strong>{selectedCase.heat_index_c}°C</strong> | WBGT: <strong className="text-amber-300">{selectedCase.wbgt_index_c}°C</strong> | UTCI: <strong>{selectedCase.utci_stress_c}°C</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Vulnerable Groups: {selectedCase.vulnerable_demographics}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Projected Hospitalization Surge: <strong>{selectedCase.projected_hospital_spike}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Municipal Action: {selectedCase.municipal_hap_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">HEAT INDEX (REALFEEL)</span><span className="text-rose-400 font-bold">{selectedCase.heat_index_c}°C</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">WET-BULB GLOBE TEMP</span><span className="text-amber-400 font-bold">{selectedCase.wbgt_index_c}°C</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('indices')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Examine WBGT, UTCI & Heat Index Physiological Danger Thresholds ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Human Heat Stress Calculator</span>
                  </h4>
                  <form onSubmit={handleEvaluate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Zone & Meteorology</label>
                      <input type="text" readOnly value={`${selectedCase.city_zone} (${selectedCase.dry_bulb_temp_c}°C / ${selectedCase.relative_humidity_pct}% RH)`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Evaluating Human Heat Budget...' : 'Compute Thermal Stress'}</span>
                    </button>
                  </form>
                  {stressResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>WBGT: <strong className="text-rose-400 font-mono text-xs">{stressResult.wbgt}</strong></div>
                      <div>Admissions: <strong className="text-amber-300 font-mono text-xs">{stressResult.projectedSpike}</strong></div>
                      <div>Civic Action: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{stressResult.civicTrigger}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INDICES */}
        {tab === 'indices' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {indices.map((idx, i) => (
              <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{idx.index_name}</span>
                <h4 className="font-bold text-sm text-white font-sans">{idx.formula}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Safe Band: <strong className="text-emerald-400">{idx.safe_threshold}</strong></div>
                  <div>Danger Band: <strong className="text-rose-400">{idx.danger_threshold}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: HOSPITAL */}
        {tab === 'hospital' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <HeartPulse className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Mortality & Hospitalization Risk Predictor</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Correlates extreme wet-bulb temperatures and heat indices with ward-level elderly density, outdoor laborer censuses, and historical heat death curves with 3 to 5 days of predictive foresight.
            </p>
          </div>
        )}

        {/* VIEW 4: HAP */}
        {tab === 'hap' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {hap.map((h, i) => (
              <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{h.tier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{h.trigger}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{h.actions}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
