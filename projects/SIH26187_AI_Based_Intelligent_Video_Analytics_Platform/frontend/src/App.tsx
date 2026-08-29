import React, { useState } from 'react';
import { 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  Play, 
  RefreshCw, 
  Sliders, 
  Truck, 
  Scan, 
  Eye, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import camerasData from './data/cctv_camera_streams.json';
import eventsData from './data/analytics_events.json';
import anprData from './data/software_anpr_records.json';
import frsData from './data/frs_watchlist.json';
import qrtData from './data/qrt_dispatches.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'ne'>('hi');
  const [cameras, setCameras] = useState(camerasData);
  const [selectedCam, setSelectedCam] = useState(camerasData[0]);
  const [events, setEvents] = useState(eventsData);
  const [anprList, setAnprList] = useState(anprData);
  const [frsList, setFrsList] = useState(frsData);
  const [activeTab, setActiveTab] = useState<'grid' | 'tripwire' | 'anpr' | 'frs' | 'command'>('grid');

  // Video Analytics Simulation State
  const [tripwireY, setTripwireY] = useState(450);
  const [nightBoost, setNightBoost] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiVerdict, setAiVerdict] = useState<any>({
    tripwire: "BREACH_DETECTED (Crawling Intruder)",
    confidence: 94.8,
    threat: 96.5,
    action: "TRIGGER_QRT_SIREN_AND_PTZ_LOCK"
  });

  const handleProcessFrame = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setAiVerdict({
        tripwire: "BREACH_DETECTED (Crawling Intruder)",
        confidence: 94.8,
        threat: 96.5,
        action: "TRIGGER_QRT_SIREN_AND_PTZ_LOCK"
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Camera className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MHA • SASHASTRA SEEMA BAL (SSB) • IBVAP 360 VIDEO ANALYTICS • SIH26187</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IBVAP 360: Intelligent Border Video Analytics Platform for Legacy CCTV
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Software-Defined Virtual Tripwire Intrusion Detection, Software ANPR & Facial Recognition on Existing Non-Smart Cameras
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('ne')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ne' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>नेपाली</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'grid', label: '📹 Live Multi-Camera CCTV Grid', count: cameras.length },
            { id: 'tripwire', label: '⚡ Virtual Tripwire & Intrusion Events', count: events.length },
            { id: 'anpr', label: '🚗 Software ANPR & Vehicle Scanner', count: anprList.length },
            { id: 'frs', label: '👤 Software Facial Recognition (FRS)', count: frsList.length },
            { id: 'command', label: '🚨 SSB Border Tactical Command' }
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
            VIEW 1: LIVE MULTI-CAMERA CCTV GRID
           ========================================================================= */}
        {activeTab === 'grid' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cameras.map((cam) => (
                <button
                  key={cam.camera_id}
                  onClick={() => setSelectedCam(cam)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCam.camera_id === cam.camera_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{cam.camera_id}</span>
                    <span className="text-emerald-400">{cam.fps} FPS</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? cam.location_hi : cam.location}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{cam.resolution} • {cam.hardware_type.split(' ')[1]}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{cam.active_ai_models[0]}</span>
                    <span>{cam.threat_level.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Stream Viewer & Edge AI Overlay */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Simulated Video Player with AI Overlay */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedCam.camera_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedCam.location}</h3>
                    <p className="text-xs text-slate-400 font-mono">Hardware: {selectedCam.hardware_type}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCam.status}
                  </span>
                </div>

                {/* Video Container Simulator */}
                <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 bg-slate-900/80 px-2 py-1 rounded text-[10px] font-mono text-rose-400 flex items-center gap-1.5">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>LIVE RTSP • 25.0 FPS</span>
                  </div>

                  {/* Virtual Tripwire Red Laser Line */}
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-rose-500 shadow-lg shadow-rose-500/80 flex items-center justify-end px-3">
                    <span className="text-[9px] font-mono font-bold bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                      VIRTUAL ZERO-LINE TRIPWIRE
                    </span>
                  </div>

                  {/* AI Bounding Box Simulator */}
                  <div className="absolute top-28 left-40 w-28 h-20 border-2 border-rose-500 bg-rose-500/10 rounded flex flex-col justify-between p-1">
                    <span className="text-[8px] font-mono font-bold bg-rose-950 text-white px-1 rounded w-fit">
                      HUMAN: 94.8% (CRAWLING)
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <Camera className="w-8 h-8 text-slate-700 mx-auto" />
                    <span className="text-xs text-slate-500 font-mono">H.264 Video Stream Active</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <span className="text-rose-400 font-bold text-[10px] uppercase block">Active Software AI Models:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCam.active_ai_models.map((m: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-300 text-xs font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('tripwire')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Intrusion Incident Stream ➔</span>
                </button>
              </div>

              {/* Right 5: Edge AI Calibration Engine */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Software Edge Video Analytics</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      YOLOv11-NANO
                    </span>
                  </div>

                  <form onSubmit={handleProcessFrame} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Virtual Tripwire Y-Coordinate (Pixels)</label>
                      <input type="number" required value={tripwireY} onChange={(e) => setTripwireY(Number(e.target.value))} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input type="checkbox" checked={nightBoost} onChange={(e) => setNightBoost(e.target.checked)} className="rounded bg-slate-950 border-slate-800" />
                      <label className="text-slate-300 font-sans text-xs">Thermal Night Vision Crawl Enhancement</label>
                    </div>

                    <button type="submit" disabled={isProcessing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>{isProcessing ? 'Processing Edge Video Frames...' : 'Calibrate AI Tripwire Plane'}</span>
                    </button>
                  </form>

                  {aiVerdict && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Status:</span><strong className="text-rose-400 font-mono">{aiVerdict.tripwire}</strong></div>
                      <div className="flex justify-between"><span>Confidence:</span><strong className="text-emerald-400 font-mono">{aiVerdict.confidence}%</strong></div>
                      <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono text-[11px]">
                        <strong>Action:</strong> {aiVerdict.action}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: VIRTUAL TRIPWIRE & INTRUSION EVENTS
           ========================================================================= */}
        {activeTab === 'tripwire' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((evt) => (
                <div key={evt.event_id} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{evt.event_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{evt.event_type}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                      Threat: {evt.threat_score}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px] font-sans">
                    <div><strong>Detected Target:</strong> <span className="font-mono text-white">{evt.object_detected}</span></div>
                    <div><strong>Timestamp:</strong> <span className="text-cyan-300 font-mono">{evt.timestamp}</span></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono"><strong>Action:</strong> {evt.action_taken}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SOFTWARE ANPR & VEHICLE SCANNER
           ========================================================================= */}
        {activeTab === 'anpr' && (
          <div className="space-y-6 font-mono text-xs">
            {anprList.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 max-w-3xl mx-auto space-y-4 shadow-2xl">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-rose-400 font-bold text-[10px]">{a.camera_id}</span>
                    <h4 className="font-bold text-xl text-white font-mono mt-0.5">{a.plate_number}</h4>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                    {a.vahan_database_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">VEHICLE CLASS</span><span className="text-white font-bold">{a.vehicle_class}</span></div>
                  <div className="p-3 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">OCR CONFIDENCE</span><span className="text-emerald-400 font-bold">{a.confidence_pct}%</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SOFTWARE FACIAL RECOGNITION (FRS)
           ========================================================================= */}
        {activeTab === 'frs' && (
          <div className="space-y-6 font-mono text-xs">
            {frsList.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 max-w-3xl mx-auto space-y-4 shadow-2xl">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-rose-400 font-bold text-[10px]">{f.match_id} • {f.camera_id}</span>
                    <h4 className="font-bold text-base text-white font-sans mt-0.5">{f.suspect_name}</h4>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded font-bold text-[10px]">
                    {(f.cosine_similarity * 100).toFixed(1)}% Match
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl text-slate-300 font-sans text-xs">
                  <strong>Watchlist Offense:</strong> {f.watchlist_reason}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 5: SSB BORDER TACTICAL COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">SASHASTRA SEEMA BAL (SSB) TACTICAL EDGE COMMAND</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Automated Border Outpost AI Surveillance Network</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">LEGACY CCTVS CONVERTED</span><span className="text-2xl font-black text-cyan-400 mt-1 block">142 Cameras</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950"><span className="text-slate-500 block text-[9px]">INTRUSIONS INTERCEPTED</span><span className="text-2xl font-black text-rose-400 mt-1 block">38 Incursions</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">AVG QRT RESPONSE TIME</span><span className="text-2xl font-black text-emerald-400 mt-1 block">2.8 Mins</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
