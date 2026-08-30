import React, { useState } from 'react';
import { 
  Smartphone, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  HeartPulse, 
  Activity, 
  RefreshCw, 
  Compass, 
  Sliders, 
  Globe 
} from 'lucide-react';

import personasData from './data/mausam_personalized_personas_cases.json';
import widgetsData from './data/persona_dynamic_weather_widgets.json';
import advisoriesData from './data/context_aware_advisory_rules.json';
import statsData from './data/mausampersona_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [personas, setPersonas] = useState(personasData);
  const [selectedPersona, setSelectedPersona] = useState(personasData[0]);
  const [widgets, setWidgets] = useState(widgetsData);
  const [advisories, setAdvisories] = useState(advisoriesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'personas' | 'widgets' | 'rules' | 'preview' | 'stats'>('personas');

  // Interactive Persona Layout Renderer Simulator
  const [isRendering, setIsRendering] = useState(false);
  const [renderResult, setRenderResult] = useState<any>({
    layout: ["Air Quality & Asthma Alert", "Pollen Allergy Meter", "UV Sunscreen Advisory", "Hydration Clock"],
    bulletin: "ALERT: PM2.5 at hazardous levels. Wear N95 respirator mask outdoors; keep indoor HEPA air purifiers active.",
    priority: "CRITICAL AIR QUALITY TRIGGER (AQI > 350)",
    status: "AI WIDGET RE-ORDERED TO TOP"
  });

  const handleRender = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRendering(true);
    setTimeout(() => {
      setRenderResult({
        layout: ["Air Quality & Asthma Alert", "Pollen Allergy Meter", "UV Sunscreen Advisory", "Hydration Clock"],
        bulletin: "ALERT: PM2.5 at hazardous levels. Wear N95 respirator mask outdoors; keep indoor HEPA air purifiers active.",
        priority: "CRITICAL AIR QUALITY TRIGGER (AQI > 350)",
        status: "AI WIDGET RE-ORDERED TO TOP"
      });
      setIsRendering(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Smartphone className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>IMD • MAUSAMPERSONA 360 PERSONALIZED HOMEPAGE ENGINE • SIH26076</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD MausamPersona: Personalized Homepage Engine for 'Mausam' Mobile App
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              8 Dedicated User Personas (Health, Fitness, Beach/Surfing, Travel, Parents, Farming, Commute, Events) with Context-Aware Dynamic AI Widget Re-Ordering
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'personas', label: '📱 8 User Personas', count: personas.length },
            { id: 'widgets', label: '🧩 Modular Widgets', count: widgets.length },
            { id: 'rules', label: '⚡ Context AI Rules', count: advisories.length },
            { id: 'preview', label: '📱 Live App Preview' },
            { id: 'stats', label: '📊 MausamPersona Telemetry' }
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
            VIEW 1: PERSONAS
           ========================================================================= */}
        {activeTab === 'personas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {personas.map((p) => (
                <button
                  key={p.persona_id}
                  onClick={() => setSelectedPersona(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedPersona.persona_id === p.persona_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{p.persona_id}</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.persona_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.location}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.dynamic_widget_order[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedPersona.persona_id} • {selectedPersona.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedPersona.persona_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-bold font-mono">
                    {selectedPersona.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">PERSONA-SPECIFIC REAL-TIME METRICS & ORDERING:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedPersona.primary_metrics}</div>
                  <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    AI Widget Order: {selectedPersona.dynamic_widget_order.join(' ➔ ')}
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Actionable Advice: <strong>{selectedPersona.actionable_bulletin}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('widgets')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore Modular UI Weather Widgets Library ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Dynamic Layout Simulator</span>
                  </h4>
                  <form onSubmit={handleRender} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">User Demographic</label>
                      <input type="text" readOnly value={`${selectedPersona.persona_name} (${selectedPersona.location})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isRendering} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isRendering ? 'animate-spin' : ''}`} />
                      <span>{isRendering ? 'Contextualizing Live Sensors & Sorting...' : 'Render Hyper-Personalized Homepage'}</span>
                    </button>
                  </form>
                  {renderResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Pinned: <strong className="text-rose-400 font-mono text-xs">{renderResult.priority}</strong></div>
                      <div>Advisory: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{renderResult.bulletin}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WIDGETS */}
        {tab === 'widgets' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {widgets.map((w, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{w.update_frequency}</span>
                <h4 className="font-bold text-sm text-white font-sans">{w.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Target: <strong className="text-white">{w.target_persona}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Widget ID: {w.widget_id}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RULES */}
        {tab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {advisories.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{a.safety_priority}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.trigger_event}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{a.layout_effect}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: PREVIEW */}
        {tab === 'preview' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Mausam Mobile App Context-Aware Personalization Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Dynamically re-orders cards based on user geolocation, live time of day, active fitness trackers, and extreme weather sensor thresholds across India.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
