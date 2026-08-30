import React, { useState } from 'react';
import { 
  Eye, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Activity, 
  RefreshCw, 
  HeartPulse, 
  FileText, 
  Layers, 
  Globe 
} from 'lucide-react';

import casesData from './data/retinal_screening_cases.json';
import scaleData from './data/icdr_retinopathy_severity_scale.json';
import modelData from './data/simulink_telemedicine_workflow_model.json';
import statsData from './data/netraai_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [scale, setScale] = useState(scaleData);
  const [model, setModel] = useState(modelData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'gradcam' | 'scale' | 'simulink' | 'stats'>('cases');

  // Interactive Screening Simulator
  const [isScreening, setIsScreening] = useState(false);
  const [screenResult, setScreenResult] = useState<any>({
    grade: "Level 2: Moderate NPDR (Referable DR)",
    confidence: "94.2% AI Confidence",
    gradcamRegion: "Superior temporal vascular arcade & macular perifovea",
    reviewTime: "18 Seconds (Tele-Ophthalmologist Confirmed)",
    action: "Referral: Urgent District Civil Hospital Ophthalmology Appointment"
  });

  const handleScreen = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScreening(true);
    setTimeout(() => {
      setScreenResult({
        grade: "Level 2: Moderate NPDR (Referable DR)",
        confidence: "94.2% AI Confidence",
        gradcamRegion: "Superior temporal vascular arcade & macular perifovea",
        reviewTime: "18 Seconds (Tele-Ophthalmologist Confirmed)",
        action: "Referral: Urgent District Civil Hospital Ophthalmology Appointment"
      });
      setIsScreening(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Eye className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MATHWORKS • NETRAAI 360 EXPLAINABLE AI RETINAL SCREENING • SIH26038</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MathWorks NetraAI: Explainable AI for Diabetic Retinopathy Screening in Rural India
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              MATLAB Medical Imaging & Deep Learning Pipeline with CLAHE Enhancement, Sub-Pixel Microaneurysm Segmentation, Grad-CAM Explainability & Simulink Rural Telemedicine Throughput Modeling
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '👁️ Rural PHC Screenings', count: cases.length },
            { id: 'gradcam', label: '🧠 Grad-CAM Explainability' },
            { id: 'scale', label: '📋 ICDR Severity Scale', count: scale.length },
            { id: 'simulink', label: '🌐 Simulink Telemedicine Model', count: model.length },
            { id: 'stats', label: '📊 NetraAI Telemetry' }
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
                  key={c.patient_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.patient_id === c.patient_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.patient_id}</span>
                    <span className="text-amber-300">{c.ai_confidence_pct}% AI</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.icdr_grade}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.phc_location.split(',')[0]}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.patient_demographics.split(',')[0]}</span>
                    <span className="text-emerald-400">{c.tele_ophthalmologist_time_sec}s Review</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.patient_id} • {selectedCase.phc_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.icdr_grade}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">RETINAL FUNDUS IMAGE & SUB-PIXEL LESION SEGMENTATION:</span>
                  <div className="text-white font-sans text-xs">
                    Patient: <strong className="text-amber-300">{selectedCase.patient_demographics}</strong> | Camera: {selectedCase.fundus_camera}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    Quality Check: {selectedCase.image_quality}
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Lesions Detected: {selectedCase.lesions_detected}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Grad-CAM Focus: {selectedCase.gradcam_attention}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Doctor Validation: Reviewed in <strong className="text-white">{selectedCase.tele_ophthalmologist_time_sec} Seconds</strong> with AI concurrence
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    Clinical Referral: {selectedCase.clinical_action}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AI CONFIDENCE SCORE</span><span className="text-rose-400 font-bold">{selectedCase.ai_confidence_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">SPECIALIST REVIEW SPEED</span><span className="text-emerald-400 font-bold">{selectedCase.tele_ophthalmologist_time_sec} Seconds</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('gradcam')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Grad-CAM Visual Heatmap & Attention Saliency ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Instant Retinal Screening Simulator</span>
                  </h4>
                  <form onSubmit={handleScreen} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Patient Screening Record</label>
                      <input type="text" readOnly value={`${selectedCase.patient_id} (${selectedCase.lesions_detected.split('+')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isScreening} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isScreening ? 'animate-spin' : ''}`} />
                      <span>{isScreening ? 'Computing CLAHE & Grad-CAM Heatmap...' : 'Evaluate DR Grade & Generate Grad-CAM'}</span>
                    </button>
                  </form>
                  {screenResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Grade: <strong className="text-rose-400 font-mono text-xs">{screenResult.grade}</strong></div>
                      <div>Confidence: <strong className="text-amber-300 font-mono text-xs">{screenResult.confidence}</strong></div>
                      <div>Saliency: <strong className="text-cyan-300 font-mono text-xs">{screenResult.gradcamRegion}</strong></div>
                      <div>Tele-Review: <strong className="text-emerald-400 font-mono text-xs">{screenResult.reviewTime}</strong></div>
                      <div>Action: <strong className="text-white font-mono text-xs block mt-0.5">{screenResult.action}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GRADCAM */}
        {tab === 'gradcam' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Flame className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Grad-CAM Visual Attention Saliency Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Replaces black-box AI predictions with clinically corroborated attention heatmaps that map precisely to microaneurysm clusters and hard exudates, allowing ophthalmologists to review and sign off in under 30 seconds.
            </p>
          </div>
        )}

        {/* VIEW 3: SCALE */}
        {tab === 'scale' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {scale.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{s.level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{s.referral_status}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{s.clinical_description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: SIMULINK */}
        {tab === 'simulink' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {model.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{m.specification}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.parameter}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.optimization}</p>
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
