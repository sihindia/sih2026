import React, { useState } from 'react';
import { 
  Mic, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GraduationCap, 
  PhoneCall, 
  RefreshCw, 
  IndianRupee, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import bensData from './data/pmajay_sc_beneficiaries.json';
import coursesData from './data/nsqf_skilling_courses_catalog.json';
import channelsData from './data/multilingual_voice_channels.json';
import statsData from './data/pmajay_vani_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [bens, setBens] = useState(bensData);
  const [selectedBen, setSelectedBen] = useState(bensData[0]);
  const [courses, setCourses] = useState(coursesData);
  const [channels, setChannels] = useState(channelsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'bens' | 'courses' | 'voice' | 'heatmap' | 'stats'>('bens');

  // Interactive Voice Dialogue Simulator
  const [isTalking, setIsTalking] = useState(false);
  const [voiceResult, setVoiceResult] = useState<any>({
    dialect: "Bhojpuri / Rural Magahi Dialect Identified",
    aspiration: "Modern Footwear Production & Self-Employed Workshop",
    pathway: "Footwear Production & CAD Pattern Design (NSQF Level 4)",
    grant: "₹50,000 Tool Kit & Modern Machinery Subsidy under PM-AJAY GIA",
    centre: "Gaya SC Vocational Training Hub (6.2 km away)"
  });

  const handleVoiceChat = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTalking(true);
    setTimeout(() => {
      setVoiceResult({
        dialect: "Bhojpuri / Rural Magahi Dialect Identified",
        aspiration: "Modern Footwear Production & Self-Employed Workshop",
        pathway: "Footwear Production & CAD Pattern Design (NSQF Level 4)",
        grant: "₹50,000 Tool Kit & Modern Machinery Subsidy under PM-AJAY GIA",
        centre: "Gaya SC Vocational Training Hub (6.2 km away)"
      });
      setIsTalking(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Mic className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MOSJE • PM-AJAY VANI 360 MULTILINGUAL VOICE SKILLING ASSISTANT • SIH26097</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              PM-AJAY Vani: AI Voice Assistant for Livelihood Mapping & NSQF Skilling
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Voice-First Conversational Profiling in Rural Dialects, NSQF Skilling Pathways & PM-AJAY GIA Enterprise Grants
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'bens', label: '🎙️ Beneficiary Profiles', count: bens.length },
            { id: 'courses', label: '🎓 NSQF Skilling Courses', count: courses.length },
            { id: 'voice', label: '📱 Multilingual Voice Hub', count: channels.length },
            { id: 'heatmap', label: '🗺️ District Skill Demand' },
            { id: 'stats', label: '📊 PM-AJAY Vani Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: BENS
           ========================================================================= */}
        {activeTab === 'bens' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bens.map((b) => (
                <button
                  key={b.beneficiary_id}
                  onClick={() => setSelectedBen(b)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedBen.beneficiary_id === b.beneficiary_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{b.beneficiary_id}</span>
                    <span className="text-emerald-400">{b.voice_dialect}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {b.name} ({b.age} yrs)
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{b.location} • {b.education}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Trade: {b.family_trade}</span>
                    <span className="text-amber-400 font-bold">{b.pmajay_gia_grant.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedBen.beneficiary_id} • {selectedBen.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedBen.name} ({selectedBen.age} yrs)</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedBen.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">RECOMMENDED NSQF PATHWAY & GIA GRANT:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedBen.recommended_nsqf_pathway}</div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Grant Support: <strong>{selectedBen.pmajay_gia_grant}</strong> • Centre: <strong>{selectedBen.local_skill_centre}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ASPIRATION</span><span className="text-amber-400 font-bold">{selectedBen.aspiration.split(' ')[0]} {selectedBen.aspiration.split(' ')[1]}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DIALECT PROFILED</span><span className="text-emerald-400 font-bold">{selectedBen.voice_dialect}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('courses')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore NSQF Skilling Pathways & Sector Skill Councils ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI Voice Dialogue Portal</span>
                  </h4>
                  <form onSubmit={handleVoiceChat} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Beneficiary & Dialect</label>
                      <input type="text" readOnly value={`${selectedBen.name} (${selectedBen.voice_dialect})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isTalking} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isTalking ? 'animate-spin' : ''}`} />
                      <span>{isTalking ? 'Analyzing Dialect & Mapping NSQF...' : 'Simulate Conversational Voice Interview'}</span>
                    </button>
                  </form>
                  {voiceResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Pathway: <strong className="text-amber-400 font-mono text-xs">{voiceResult.pathway}</strong></div>
                      <div>Grant: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{voiceResult.grant}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: COURSES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {courses.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold">{c.nsqf_level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.course_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Duration: <strong className="text-white">{c.duration_hrs} Hours</strong></div>
                  <div>Stipend: <strong className="text-emerald-400">{c.stipend}</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{c.sector}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: VOICE */}
        {activeTab === 'voice' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-amber-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">LOW-BANDWIDTH & TELEPHONY VOICE CHANNELS</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Rural Dialect Voice AI & IVR Telephony Hub</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">12 Dialects</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {channels.map((ch, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">{ch.channel}</span>
                    <div className="text-slate-400 text-[10px]">{ch.target}</div>
                    <div className="text-emerald-400 text-[10px] pt-1 border-t border-slate-900">{ch.dialects}</div>
                  </div>
                ))}
              </div>
              <div className="text-amber-400 font-bold pt-2 border-t border-slate-900">
                Empowers rural SC beneficiaries to discover livelihoods via simple spoken conversations without typing text forms.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: HEATMAP */}
        {activeTab === 'heatmap' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Aspirational District Livelihood & Skilling Demand Heatmap</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time analytics across 112+ aspirational districts matching local industry demand with certified NSQF vocational batches.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
