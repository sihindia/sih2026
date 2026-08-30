import React, { useState } from 'react';
import { 
  Video, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Camera, 
  HardDrive, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/dvr_forensic_cases.json';
import oemsData from './data/oem_file_system_profiles.json';
import analyticsData from './data/ai_video_analytics_detections.json';
import statsData from './data/dvrforensics_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [oems, setOems] = useState(oemsData);
  const [analytics, setAnalytics] = useState(analyticsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'oems' | 'analytics' | 'chain' | 'stats'>('cases');

  // Interactive DVR Forensic Parsing Simulator
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<any>({
    channels: "16 Synchronized Video Channels (H.264 / H.265 Streams)",
    recovery: "1,420 Deleted Clips Recovered (48.2 Hours Total)",
    reId: "Suspect Trajectory: Gate-01 ➔ Corridor-C ➔ Server Room",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    legal: "Indian Evidence Act Section 65B Certified & Tamper-Proof"
  });

  const handleParse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsParsing(true);
    setTimeout(() => {
      setParseResult({
        channels: "16 Synchronized Video Channels (H.264 / H.265 Streams)",
        recovery: "1,420 Deleted Clips Recovered (48.2 Hours Total)",
        reId: "Suspect Trajectory: Gate-01 ➔ Corridor-C ➔ Server Room",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        legal: "Indian Evidence Act Section 65B Certified & Tamper-Proof"
      });
      setIsParsing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Video className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>NTRO • DVRFORENSICS 360 MULTI-VENDOR SURVEILLANCE SUITE • SIH26150</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO DVRForensics: Multi-Vendor DVR/NVR Forensic Acquisition & AI Video Analytics
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Universal OEM File System Parsing (Hikvision/Dahua/CP Plus), Deleted Footage Carving & Section 65B Evidence Dossiers
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '📹 DVR/NVR Forensic Cases', count: cases.length },
            { id: 'oems', label: '🗄️ Multi-Vendor OEM File Systems', count: oems.length },
            { id: 'analytics', label: '🤖 AI Video Analytics & Re-ID', count: analytics.length },
            { id: 'chain', label: '📜 Section 65B Chain of Custody' },
            { id: 'stats', label: '📊 NTRO DVRForensics Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
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
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{c.case_id}</span>
                    <span className="text-emerald-400">{c.recovered_footage_hours} Recovered</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.case_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.dvr_oem_vendor} • {c.file_system_type}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Channels: {c.channels_extracted}</span>
                    <span className="text-cyan-400">{c.recovered_deleted_clips} Deleted Clips</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedCase.case_id} • {selectedCase.dvr_oem_vendor}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.case_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">AI VIDEO ANALYTICS & DELETED FOOTAGE RECOVERY:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedCase.ai_analytics_insight}</div>
                  <div className="text-cyan-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Recovered: <strong>{selectedCase.recovered_deleted_clips} Clips ({selectedCase.recovered_footage_hours})</strong> • Timestamp: <strong>{selectedCase.timestamp_normalization}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CHANNELS SYNCHRONIZED</span><span className="text-indigo-400 font-bold">{selectedCase.channels_extracted} Video Channels</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LEGAL EVIDENCE ACT</span><span className="text-emerald-400 font-bold">Section 65B Certified</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('oems')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Proprietary OEM File System Drivers ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>DVR Forensic Pipeline</span>
                  </h4>
                  <form onSubmit={handleParse} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Surveillance Media Image</label>
                      <input type="text" readOnly value={`${selectedCase.source_media} (${selectedCase.file_system_type})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isParsing} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isParsing ? 'animate-spin' : ''}`} />
                      <span>{isParsing ? 'Demuxing Proprietary Streams...' : 'Parse & Recover DVR Footage'}</span>
                    </button>
                  </form>
                  {parseResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Recovery: <strong className="text-emerald-400 font-mono text-xs">{parseResult.recovery}</strong></div>
                      <div>Insight: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{parseResult.reId}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: OEMS */}
        {activeTab === 'oems' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {oems.map((o, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">{o.vendor}</span>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>File System: <strong className="text-white">{o.fs_name}</strong></div>
                  <div>Encoding: <strong className="text-cyan-400">{o.encoding}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Share: {o.market_share_pct}% Surveillance Base</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-indigo-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-indigo-400 font-bold text-[10px] uppercase">AI-POWERED COMPUTER VISION ANALYTICS ENGINE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">YOLOv11 Object Detection & Cross-Camera Person Re-ID</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">99.2% Re-ID Match</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {analytics.map((a, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-indigo-400 font-bold block">{a.module}</span>
                    <div className="text-slate-400 text-[10px]">{a.description}</div>
                    <div className="text-emerald-400 text-xs font-bold pt-1 border-t border-slate-900">{a.precision_pct}% Accuracy</div>
                  </div>
                ))}
              </div>
              <div className="text-indigo-400 font-bold pt-2 border-t border-slate-900">
                Reconstructs seamless multi-camera suspect movement trajectories across complex building layouts.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: CHAIN */}
        {activeTab === 'chain' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Indian Evidence Act Section 65B Electronic Certificate</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automates generation of court-admissible forensic certificates with synchronized MD5 and SHA-256 cryptographic verification hashes.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
