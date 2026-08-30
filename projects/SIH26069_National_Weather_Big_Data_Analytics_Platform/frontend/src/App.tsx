import React, { useState } from 'react';
import { 
  CloudRain, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Radar, 
  RefreshCw, 
  MapPin, 
  Sliders, 
  Globe 
} from 'lucide-react';

import eventsData from './data/national_weather_crowdsourced_events.json';
import fakeData from './data/ai_fake_weather_detection_log.json';
import radarData from './data/imd_aws_radar_ground_truth_grid.json';
import statsData from './data/mausamvani_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [events, setEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(eventsData[0]);
  const [fakeDetection, setFakeDetection] = useState(fakeData);
  const [radar, setRadar] = useState(radarData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'events' | 'fake' | 'radar' | 'map' | 'stats'>('events');

  // Interactive Crowdsource Weather Verification Simulator
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>({
    verdict: "AUTHENTIC LIVE WEATHER EVENT (Matched Mumbai Doppler Radar 52 dBZ)",
    dedup: "18 Duplicate Social Posts Merged within 500m Radius",
    alert: "IMD RED ALERT: Flash Flooding & Torrential Inundation Warning",
    action: "Dispatched to BMC Disaster Cell & NDRF Command"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setVerifyResult({
        verdict: "AUTHENTIC LIVE WEATHER EVENT (Matched Mumbai Doppler Radar 52 dBZ)",
        dedup: "18 Duplicate Social Posts Merged within 500m Radius",
        alert: "IMD RED ALERT: Flash Flooding & Torrential Inundation Warning",
        action: "Dispatched to BMC Disaster Cell & NDRF Command"
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-sky-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold tracking-wider">
              <CloudRain className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>IMD • MAUSAMVANI 360 NATIONAL WEATHER BIG DATA & VERIFICATION PLATFORM • SIH26069</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD MausamVani: National Weather Big Data Analytics & Crowdsourcing Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              1.2M Daily Crowdsourced Feeds (#IMD, Citizen Reports, AWS), AI Misinformation & Deepfake Storm Filtering with Doppler Ground Truth
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-sky-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'events', label: '⛈️ Weather Stream', count: events.length },
            { id: 'fake', label: '🛡️ AI Fake Filter', count: fakeDetection.length },
            { id: 'radar', label: '📡 Doppler Ground Truth', count: radar.length },
            { id: 'map', label: '🗺️ GIS Weather Risk Map' },
            { id: 'stats', label: '📊 MausamVani Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-sky-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: EVENTS
           ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {events.map((e) => (
                <button
                  key={e.event_id}
                  onClick={() => setSelectedEvent(e)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedEvent.event_id === e.event_id
                      ? 'bg-sky-950/60 border-sky-500 text-white shadow-lg ring-2 ring-sky-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-sky-400">{e.event_id}</span>
                    <span className="text-rose-400">{e.imd_warning_level.split('_')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {e.location}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{e.weather_category.slice(0, 45)}...</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Merged: {e.duplicate_clusters_merged} Posts</span>
                    <span className="text-emerald-400">{e.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-sky-400 font-bold">{selectedEvent.event_id} • {selectedEvent.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedEvent.weather_category}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedEvent.imd_warning_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-sky-400 block text-[9px] font-bold uppercase">CROWDSOURCED METADATA & AI VALIDATION:</span>
                  <div className="text-white font-sans text-xs font-bold">Source: {selectedEvent.source_channel}</div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Verification: <strong>{selectedEvent.ai_fake_news_status}</strong>
                  </div>
                  <div className="text-rose-300 font-sans text-[11px]">
                    Emergency Action: {selectedEvent.action_dispatched}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">VERIFICATION PRECISION</span><span className="text-emerald-400 font-bold">{selectedEvent.confidence_score}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DUPLICATES MERGED</span><span className="text-sky-400 font-bold">{selectedEvent.duplicate_clusters_merged} Posts within 500m</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('fake')}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Review AI Fake Weather & Misinformation Filter ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Live Post Verification Engine</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Crowdsourced Weather Post</label>
                      <input type="text" readOnly value={`${selectedEvent.source_channel.slice(0, 35)} (${selectedEvent.location.split(' ')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-sky-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Verifying with Radar & Satellites...' : 'Validate Crowdsourced Weather Report'}</span>
                    </button>
                  </form>
                  {verifyResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Verdict: <strong className="text-emerald-400 font-mono text-xs">{verifyResult.verdict}</strong></div>
                      <div>Action: <strong className="text-rose-300 font-mono text-xs block mt-0.5">{verifyResult.alert}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FAKE */}
        {tab === 'fake' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {fakeDetection.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{f.verdict}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.claim}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Detection: <strong className="text-cyan-400">{f.detection_method}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Post ID: {f.post_id}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RADAR */}
        {tab === 'radar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {radar.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold">{r.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.station_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Band: <strong className="text-white">{r.band}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Peak Reflectivity: {r.peak_reflectivity_dbz} dBZ</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MAP */}
        {tab === 'map' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-sky-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-950 border border-sky-500 flex items-center justify-center text-sky-400">
              <MapPin className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">National Weather Risk & Crowdsourced GIS Map</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time multi-layered weather visualization combining INSAT-3DR satellite infrared feeds, Doppler radar ground truth, and verified crowdsourced flood/heatwave alerts.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-sky-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
