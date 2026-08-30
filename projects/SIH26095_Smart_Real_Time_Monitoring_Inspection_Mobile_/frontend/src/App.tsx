import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Video, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import institutesData from './data/dosje_monitored_institutes.json';
import assignmentsData from './data/surprise_inspection_assignments.json';
import analyticsData from './data/ai_attendance_anomaly_telemetry.json';
import statsData from './data/mosje_drishti_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [institutes, setInstitutes] = useState(institutesData);
  const [selectedInst, setSelectedInst] = useState(institutesData[0]);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [analytics, setAnalytics] = useState(analyticsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'institutes' | 'assignments' | 'cctv' | 'audit' | 'stats'>('institutes');

  // Interactive Inspection Submission Simulator
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>({
    status: "100% Geo-Tagged Verification Passed (12m Precision)",
    cctv: "Live 4-Channel RTSP Stream Archived in Ministry Vault",
    vc: "Conducted Surprise VC with Centre In-Charge & 6 Inmates",
    compliance: "94.0% Overall Facility & Hygiene Score"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitResult({
        status: "100% Geo-Tagged Verification Passed (12m Precision)",
        cctv: "Live 4-Channel RTSP Stream Archived in Ministry Vault",
        vc: "Conducted Surprise VC with Centre In-Charge & 6 Inmates",
        compliance: "94.0% Overall Facility & Hygiene Score"
      });
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>MOSJE • DRISHTI 360 SMART REAL-TIME MONITORING & INSPECTION • SIH26095</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE Drishti: Smart Real-Time Monitoring & Surprise Inspection Mobile Suite
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Live CCTV Stream Integration, Random Video Conferencing (VC), Automated AI Duty Allocation & Geo-Tagged Audits
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'institutes', label: '🏢 Monitored Institutes', count: institutes.length },
            { id: 'assignments', label: '🎲 Random AI Duty Allocation', count: assignments.length },
            { id: 'cctv', label: '📹 Live CCTV Feed & Surprise VC' },
            { id: 'audit', label: '📋 Geo-Tagged Audit Checklist' },
            { id: 'stats', label: '📊 MoSJE Drishti Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: INSTITUTES
           ========================================================================= */}
        {activeTab === 'institutes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {institutes.map((inst) => (
                <button
                  key={inst.institute_id}
                  onClick={() => setSelectedInst(inst)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedInst.institute_id === inst.institute_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{inst.institute_id}</span>
                    <span className="text-emerald-400">{inst.verified_present}/{inst.enrolled_beneficiaries} Present</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {inst.institute_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{inst.scheme_name} • {inst.location}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>CCTV: {inst.cctv_channels_active} Ch</span>
                    <span className="text-emerald-400">Score: {inst.hygiene_compliance_score}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedInst.institute_id} • {selectedInst.scheme_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedInst.institute_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedInst.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">SURPRISE VC & GEO-FENCED INSPECTION EVIDENCE:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedInst.surprise_vc_status}</div>
                  <div className="text-cyan-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Assigned Inspector: <strong>{selectedInst.assigned_inspector}</strong> • Geo-Fence: <strong>{selectedInst.geo_fence_status}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">VERIFIED INMATES</span><span className="text-emerald-400 font-bold">{selectedInst.verified_present} / {selectedInst.enrolled_beneficiaries} Present</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COMPLIANCE SCORE</span><span className="text-teal-400 font-bold">{selectedInst.hygiene_compliance_score}% Verified</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('cctv')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Live CCTV Feeds & Instant Surprise Video Call ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Inspection Audit Portal</span>
                  </h4>
                  <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Institute & Scheme</label>
                      <input type="text" readOnly value={`${selectedInst.institute_name} (${selectedInst.scheme_name})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                      <span>{isSubmitting ? 'Verifying Geo-Fence & Syncing CCTV...' : 'Submit Real-Time Inspection Report'}</span>
                    </button>
                  </form>
                  {submitResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Geo-Fence: <strong className="text-emerald-400 font-mono text-xs">{submitResult.status}</strong></div>
                      <div>VC Audit: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{submitResult.vc}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {assignments.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{a.assignment_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.target_ngo}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Assigned Officer: <strong className="text-white">{a.officer}</strong></div>
                  <div>Surprise Window: <strong className="text-amber-400">{a.window_hours}</strong></div>
                  <div className="text-emerald-400 pt-1 border-t border-slate-900">{a.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CCTV */}
        {activeTab === 'cctv' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-teal-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-teal-400 font-bold text-[10px] uppercase">MULTI-CHANNEL RTSP & WEBRTC LIVE STREAMING</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Surveillance Wall & Instant Video Call Console</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Live 4-Ch Active</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div>Streams encrypted feeds from Ward Rooms, Dispensaries, Kitchens, and Entrance Gates with one-tap WebRTC video call to verify staff and beneficiaries in real time.</div>
              <div className="text-teal-400 font-bold pt-2 border-t border-slate-900">
                Eliminates ghost beneficiaries and proxy staff operations across all DoSJE funded programs.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: AUDIT */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {analytics.map((an, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold">{an.metric_name}</span>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Accuracy: <strong className="text-emerald-400">{an.accuracy_pct}%</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{an.anomaly_flag}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
