import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Compass, 
  ShoppingBag, 
  Layers, 
  Globe, 
  CheckCircle2, 
  Volume2, 
  RefreshCw, 
  Eye, 
  Share2, 
  Printer, 
  ChevronRight, 
  Sliders, 
  Flame, 
  Zap, 
  BookOpen 
} from 'lucide-react';

import monumentsData from './data/monuments_3d_archive.json';
import ichData from './data/intangible_heritage.json';
import trailsData from './data/cultural_trails.json';
import artisansData from './data/artisan_marketplace.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'sa'>('hi');
  const [monuments, setMonuments] = useState(monumentsData);
  const [selectedMon, setSelectedMon] = useState(monumentsData[0]);
  const [ichList, setIchList] = useState(ichData);
  const [trails, setTrails] = useState(trailsData);
  const [artisans, setArtisans] = useState(artisansData);
  const [activeTab, setActiveTab] = useState<'monuments' | 'ich' | 'trails' | 'artisans' | 'preservation'>('monuments');

  // Interactive Acoustic Resonance Tester
  const [isPlayingAcoustics, setIsPlayingAcoustics] = useState(false);

  const testAcousticResonance = () => {
    setIsPlayingAcoustics(true);
    setTimeout(() => {
      setIsPlayingAcoustics(false);
      alert(`Acoustic Resonance Frequency: ${selectedMon.acoustic_resonance_hz} Hz measured inside Sanctum Sanctorum (Garbhagriha).`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Building2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AICTE • MINISTRY OF CULTURE • DHAROHAR360 INDIAN HERITAGE GRID • SIH26197</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dharohar360: National Digital Heritage, 3D Monument Explorer & Artisan Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Photogrammetric Architectural Engineering, UNESCO Living Traditions, Thematic Trails & GI Craft Registry
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('sa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sa' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>संस्कृतम्</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'monuments', label: '🏛️ 3D Monument Engineering', count: monuments.length },
            { id: 'ich', label: '🎭 Intangible Heritage (UNESCO ICH)', count: ichList.length },
            { id: 'trails', label: '🗺️ AI Cultural Pilgrimage Trails', count: trails.length },
            { id: 'artisans', label: '🎨 GI Tag Artisan Marketplace', count: artisans.length },
            { id: 'preservation', label: '🔍 Digital ASI Conservation' }
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
            VIEW 1: 3D MONUMENT ENGINEERING EXPLORER
           ========================================================================= */}
        {activeTab === 'monuments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {monuments.map((m) => (
                <button
                  key={m.monument_id}
                  onClick={() => setSelectedMon(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedMon.monument_id === m.monument_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{m.monument_id}</span>
                    <span className="text-cyan-300">{m.era}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? m.name_hi : lang === 'ta' ? m.name_ta : m.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{m.location}</div>
                  <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{m.architectural_style.split(' ')[0]}</span>
                    <span>{m.acoustic_resonance_hz} Hz</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Monument Architecture Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Engineering Marvels & Acoustic Frequency */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedMon.monument_id} • {selectedMon.era}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedMon.name}</h3>
                    <p className="text-xs text-slate-400">{selectedMon.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedMon.status}
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold text-[10px] uppercase font-mono block">CIVILIZATIONAL ENGINEERING MARVEL:</span>
                  <p className="text-slate-200 font-sans text-xs leading-relaxed">
                    {selectedMon.engineering_marvel}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">ARCHITECTURAL STYLE</span>
                    <span className="text-xs font-black text-amber-400 mt-1 block">{selectedMon.architectural_style}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">ACOUSTIC RESONANCE</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedMon.acoustic_resonance_hz} Hz</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-white font-sans">Garbhagriha Acoustic Simulation</span>
                  </div>
                  <button onClick={testAcousticResonance} disabled={isPlayingAcoustics} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs font-sans shadow-md">
                    {isPlayingAcoustics ? 'Measuring Frequency...' : 'Play Frequency Resonance'}
                  </button>
                </div>
              </div>

              {/* Right 5: 3D AR Model Preview */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>3D Photogrammetric Mesh</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      LOD-4 AR READY
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div>3D Asset: <strong className="text-cyan-300">{selectedMon.3d_ar_mesh}</strong></div>
                    <div>Point Cloud Density: <span className="text-white">12.4 Million Points</span></div>
                    <div>Texture Resolution: <span className="text-amber-400">8K PBR Subsurface Material</span></div>
                  </div>

                  <button
                    onClick={() => alert(`Launching WebGL 3D AR Viewer for: ${selectedMon.name}`)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Launch Interactive 3D AR Viewer ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: INTANGIBLE CULTURAL HERITAGE (UNESCO ICH)
           ========================================================================= */}
        {activeTab === 'ich' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {ichList.map((ich) => (
                <div key={ich.ich_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold text-[10px]">{ich.ich_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{ich.title}</h4>
                      <p className="text-slate-400 text-[11px]">{ich.region}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">{ich.significance}</p>

                  <div className="p-2.5 bg-slate-950 rounded-xl text-emerald-400 font-bold text-[10px]">
                    {ich.unesco_status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: CULTURAL TRAILS
           ========================================================================= */}
        {activeTab === 'trails' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {trails.map((t) => (
                <div key={t.trail_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold text-[10px]">{t.trail_id} • {t.duration_days} Days</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{t.trail_name}</h4>
                      <p className="text-slate-400 text-[11px]">{t.state}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-slate-300 text-[11px]">
                    <div><strong>Key Monument Stops:</strong> {t.key_stops.join(' ➔ ')}</div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900"><strong>Experience:</strong> {t.experience_highlight}</div>
                  </div>

                  <button onClick={() => alert(`Downloaded AI Itinerary Guide for: ${t.trail_name}`)} className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                    Download Smart Pilgrimage Itinerary ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: ARTISAN GI MARKETPLACE
           ========================================================================= */}
        {activeTab === 'artisans' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {artisans.map((art) => (
                <div key={art.craft_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold text-[10px]">{art.craft_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{art.craft_name}</h4>
                      <p className="text-slate-400 text-[11px] font-sans">Master Artisan: {art.artisan_name} ({art.origin})</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {art.gi_tag_cert}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs">{art.craft_medium}</p>

                  <div className="p-3 bg-slate-950 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 text-[9px] block">DIRECT ARTISAN PRICE</span>
                      <span className="text-emerald-400 font-black text-lg">₹{art.price_inr.toLocaleString()}</span>
                    </div>
                    <button onClick={() => alert(`Support Artisan: Purchased ${art.craft_name}`)} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Support Rural Artisan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: PRESERVATION
           ========================================================================= */}
        {activeTab === 'preservation' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-amber-500/40 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">ARCHAEOLOGICAL SURVEY OF INDIA (ASI) DIGITAL CONSERVATION</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">High-Precision LiDAR & Photogrammetry Preservation Vault</h4>
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300 font-sans text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h5 className="font-bold text-white font-mono">📡 Monolithic Stress Simulation</h5>
                <p className="text-slate-400 text-[11px]">Finite element modeling of Kailash Temple monolithic cliff basalt confirms 0.02mm seismic stability over 1,200 years.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h5 className="font-bold text-white font-mono">💧 Subterranean Water Table Monitoring</h5>
                <p className="text-slate-400 text-[11px]">Rani ki Vav moisture sensors track micro-climate evaporation to prevent mineral efflorescence on sandstone carvings.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
