import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  RefreshCw, 
  TrendingUp, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Building2, 
  Globe 
} from 'lucide-react';

import personnelData from './data/personnel_wellness.json';
import biometricData from './data/biometric_telemetry.json';
import dassData from './data/dass21_guidelines.json';
import heatmapData from './data/battalion_heatmaps.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'pa' | 'dg'>('hi');
  const [personnel, setPersonnel] = useState(personnelData);
  const [selectedTrooper, setSelectedTrooper] = useState(personnelData[0]);
  const [biometrics, setBiometrics] = useState(biometricData);
  const [dassRules, setDassRules] = useState(dassData);
  const [heatmaps, setHeatmaps] = useState(heatmapData);
  const [activeTab, setActiveTab] = useState<'radar' | 'biometrics' | 'dass21' | 'welfare' | 'command'>('radar');

  // Stress Calculator State
  const [deployMonths, setDeployMonths] = useState(14.5);
  const [leaveDeficit, setLeaveDeficit] = useState(210);
  const [hrvVal, setHrvVal] = useState(18.4);
  const [sleepHrs, setSleepHrs] = useState(3.8);
  const [isPredicting, setIsPredicting] = useState(false);
  const [stressResult, setStressResult] = useState<any>({
    score: 88.5,
    status: "RED_CRITICAL_INTERVENTION_NEEDED",
    action: "Mandatory 15-Day Compassionate Leave + Tele-Psychiatry Counseling"
  });

  const handlePredictStress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      const hrvPen = Math.max(0, (35.0 - hrvVal) * 1.8);
      const sleepPen = Math.max(0, (6.5 - sleepHrs) * 12.0);
      const deployPen = (deployMonths / 12.0) * 18.0;
      const leavePen = (leaveDeficit / 180.0) * 20.0;
      const totalScore = Math.min(99.0, Math.round(20.0 + hrvPen + sleepPen + deployPen + leavePen));
      const isCrit = totalScore >= 75;

      setStressResult({
        score: totalScore,
        status: isCrit ? "RED_CRITICAL_INTERVENTION_NEEDED" : "AMBER_ELEVATED_FATIGUE",
        action: isCrit ? "Mandatory 15-Day Compassionate Leave + Tele-Psychiatry Counseling" : "Schedule Regular Shift Rotation"
      });
      setIsPredicting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MHA • CRPF • VEERSWASTHYA 360 UNIFORMED FORCES WELLNESS AI • SIH26186</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              VeerSwasthya 360: AI Predictive Personnel Stress & Welfare Monitoring System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              CAPF Burnout Prediction, Heart Rate Variability (HRV) Sleep Telemetry, DASS-21 Assessments & Non-Stigmatizing Interventions
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('dg')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'dg' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>डोगरी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'radar', label: '🪖 Trooper Wellness & Burnout Radar', count: personnel.length },
            { id: 'biometrics', label: '💓 Biometric & Sleep Telemetry' },
            { id: 'dass21', label: '📝 Confidential DASS-21 Screener' },
            { id: 'welfare', label: '🛡️ Commander Welfare Action' },
            { id: 'command', label: '📊 National CAPF Wellness Heatmap', count: heatmaps.length }
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
            VIEW 1: TROOPER WELLNESS & BURNOUT RADAR
           ========================================================================= */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {personnel.map((p) => (
                <button
                  key={p.personnel_id}
                  onClick={() => setSelectedTrooper(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTrooper.personnel_id === p.personnel_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{p.personnel_id}</span>
                    <span className={p.burnout_risk_score > 70 ? 'text-rose-400' : 'text-emerald-400'}>
                      Burnout: {p.burnout_risk_score}/100
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.rank} • {p.force.split(' ')[0]}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{p.continuous_deployment_months} Mo Deploy</span>
                    <span>{p.triage_status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Operational & Biometric Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Operational Profile */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedTrooper.personnel_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedTrooper.name} ({selectedTrooper.rank})</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedTrooper.unit} • {selectedTrooper.deployment_location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedTrooper.burnout_risk_score > 70 ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedTrooper.triage_status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">HRV rMSSD</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">{selectedTrooper.hrv_rmssd_ms} ms</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">AVG SLEEP</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedTrooper.avg_sleep_hours} hrs</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">LEAVE DEFICIT</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">{selectedTrooper.leave_deficit_days} Days</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div>DASS-21 Stress Index: <strong className="text-rose-400">{selectedTrooper.dass21_stress_score}/42</strong></div>
                  <div>Night Patrol Load: <strong>{selectedTrooper.night_patrol_hours_weekly} hrs / week</strong></div>
                  <div className="text-emerald-400 pt-1 border-t border-slate-900">
                    Recommended Action: <strong>{selectedTrooper.recommended_action}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('welfare')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Grant Compassionate Leave & Welfare Support ➔</span>
                </button>
              </div>

              {/* Right 5: AI Stress Risk Predictor */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Predictive Burnout Risk Engine</span>
                    </h4>
                    <span className="text-rose-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      CONFIDENTIAL
                    </span>
                  </div>

                  <form onSubmit={handlePredictStress} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Continuous Deployment (Months)</label>
                      <input type="number" step="0.5" required value={deployMonths} onChange={(e) => setDeployMonths(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Leave Deficit (Days)</label>
                      <input type="number" required value={leaveDeficit} onChange={(e) => setLeaveDeficit(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">HRV rMSSD (ms, &lt; 25 indicates overload)</label>
                      <input type="number" step="0.1" required value={hrvVal} onChange={(e) => setHrvVal(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Night Sleep Duration (Hours)</label>
                      <input type="number" step="0.1" required value={sleepHrs} onChange={(e) => setSleepHrs(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>

                    <button type="submit" disabled={isPredicting} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>{isPredicting ? 'Computing Autonomic Fatigue...' : 'Evaluate Cumulative Burnout Risk'}</span>
                    </button>
                  </form>

                  {stressResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Burnout Risk:</span><strong className="text-rose-400 font-mono text-sm">{stressResult.score}/100</strong></div>
                      <div className="text-emerald-400 font-mono text-[11px]">{stressResult.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: BIOMETRIC & SLEEP TELEMETRY
           ========================================================================= */}
        {activeTab === 'biometrics' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {biometrics.map((b, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{b.metric_name}</h4>
                    <span className="px-2 py-0.5 bg-slate-950 text-cyan-300 rounded text-[10px]">{b.normal_range}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl text-rose-300 font-sans text-xs">
                    <strong>Critical Threshold:</strong> {b.critical_threshold}
                  </div>
                  <p className="text-slate-400 font-sans text-xs">{b.clinical_significance}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DASS-21 PSYCHOLOGICAL SCREENER
           ========================================================================= */}
        {activeTab === 'dass21' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dassRules.map((d, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{d.category}</h4>
                  <div className="p-2.5 bg-slate-950 rounded-xl text-amber-300 text-[11px]">
                    {d.score_range}
                  </div>
                  <div className="text-slate-300 font-sans text-xs">
                    <strong>Intervention:</strong> {d.intervention}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: COMMANDER WELFARE ACTION
           ========================================================================= */}
        {activeTab === 'welfare' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">COMMANDANT DISCRETIONARY WELFARE DESK</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Non-Stigmatizing Rest & Compassionate Leave Sanction</h4>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span>Beneficiary:</span><strong className="text-white font-sans">Constable Rajesh Kumar (204 CoBRA Sukma)</strong></div>
              <div className="flex justify-between"><span>Sanctioned Leave:</span><strong className="text-emerald-400 font-sans text-sm">15 Days Paid Family Leave</strong></div>
              <div className="flex justify-between"><span>Assigned Tele-Psychiatrist:</span><span className="text-cyan-300">Dr. Shalini Mukherji (MHA Central Medical Cell)</span></div>
              <div className="text-emerald-400 pt-1 border-t border-slate-900 font-bold">Confidentiality: STRICT MEDICAL PRIVILEGE (Zero Career Record Impact)</div>
            </div>

            <button onClick={() => alert("15-Day Compassionate Leave Sanctioned & Travel Voucher Issued.")} className="w-full py-3 bg-rose-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
              Confirm & Issue Digital Leave Pass ➔
            </button>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: NATIONAL CAPF WELLNESS HEATMAP
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heatmaps.map((h, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{h.battalion}</h4>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TOTAL TROOPERS</span><span className="text-white font-bold">{h.total_strength}</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-rose-950"><span className="text-rose-400 block text-[8px]">RED RISK</span><span className="text-rose-300 font-bold">{h.red_risk_count}</span></div>
                  </div>
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Wellness Index:</span>
                    <strong className="text-emerald-400 font-sans">{h.overall_wellness_index}%</strong>
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
