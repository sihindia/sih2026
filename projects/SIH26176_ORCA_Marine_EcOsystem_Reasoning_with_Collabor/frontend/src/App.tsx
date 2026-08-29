import React, { useState } from 'react';
import { 
  Anchor, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Send, 
  Layers, 
  Wind, 
  Activity, 
  Navigation, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import pfzData from './data/potential_fishing_zones.json';
import satelliteData from './data/satellite_telemetry.json';
import safetyData from './data/marine_safety_advisories.json';
import reasoningTraces from './data/agentic_reasoning_traces.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ta' | 'ml' | 'te' | 'hi'>('ta');
  const [pfzList, setPfzList] = useState(pfzData);
  const [selectedPfz, setSelectedPfz] = useState(pfzData[0]);
  const [satellites, setSatellites] = useState(satelliteData);
  const [safety, setSafety] = useState(safetyData);
  const [activeTab, setActiveTab] = useState<'copilot' | 'gis' | 'telemetry' | 'router' | 'command'>('copilot');

  // Conversational Copilot State
  const [userQuery, setUserQuery] = useState("Where is the nearest Potential Fishing Zone from Rameswaram and is it safe?");
  const [isReasoning, setIsReasoning] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      sender: "user",
      text: "Where is the nearest Potential Fishing Zone from Rameswaram and is it safe?"
    },
    {
      sender: "agent",
      trace: reasoningTraces[0].agent_trace,
      text: reasoningTraces[0].synthesized_response
    }
  ]);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const newQuery = userQuery;
    setUserQuery("");
    setChatLog((prev) => [...prev, { sender: "user", text: newQuery }]);
    setIsReasoning(true);

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "agent",
          trace: reasoningTraces[0].agent_trace,
          text: reasoningTraces[0].synthesized_response
        }
      ]);
      setIsReasoning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Anchor className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>ISRO • INCOIS • ORCA 360 MARINE REASONING MULTI-AGENTS • SIH26176</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ORCA 360: Marine EcOsystem Reasoning with Collaborative Agents
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              ISRO Oceansat-3 Earth Observation, Potential Fishing Zone (PFZ) Predictor, IMBL Geo-Fencing & Multilingual Copilot
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('ml')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ml' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>മലയാളം</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'copilot', label: '🤖 Agentic AI Marine Copilot' },
            { id: 'gis', label: '🗺️ ISRO Oceansat-3 PFZ Map', count: pfzList.length },
            { id: 'telemetry', label: '🌊 Oceanographic & Satellite Telemetry' },
            { id: 'router', label: '🧭 Safe Router & IMBL Geo-Fencer' },
            { id: 'command', label: '📊 INCOIS Coastal Command' }
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
            VIEW 1: AGENTIC AI MARINE COPILOT
           ========================================================================= */}
        {activeTab === 'copilot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8: Conversational Stream */}
            <div className="lg:col-span-8 bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[500px] space-y-4">
              <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
                {chatLog.map((c, idx) => (
                  <div key={idx} className={`space-y-2 ${c.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-4 rounded-2xl text-xs max-w-2xl ${
                      c.sender === 'user'
                        ? 'bg-cyan-950 text-cyan-200 border border-cyan-800 font-bold'
                        : 'bg-slate-950 text-slate-200 border border-slate-800 space-y-3'
                    }`}>
                      {c.sender === 'agent' && c.trace && (
                        <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-900/60 space-y-1.5 font-mono text-[10px] text-left">
                          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Collaborative Multi-Agent Reasoning Trace</span>
                          </span>
                          {c.trace.map((t: any, tidx: number) => (
                            <div key={tidx} className="text-slate-300">
                              <span className="text-cyan-300 font-bold">{t.agent}:</span> {t.action}
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendQuery} className="flex gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Ask in Tamil, Malayalam, Hindi or English (e.g. Is it safe to fish near Rameswaram tomorrow?)..."
                  className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={isReasoning}
                  className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Ask ORCA</span>
                </button>
              </form>
            </div>

            {/* Right 4: Collaborative Agents Status */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase">MULTI-AGENT ENSEMBLE</span>
                  <h4 className="font-bold text-sm text-white font-sans mt-0.5">5 Specialized AI Agents Online</h4>
                </div>

                {[
                  { name: "Agent 1: Orchestrator & NLP", role: "Query Decomposition & Vernacular Translation" },
                  { name: "Agent 2: Oceansat-3 Earth Obs", role: "Chlorophyll OCM-3 & SST Fronts" },
                  { name: "Agent 3: PFZ Thermal Predictor", role: "Pelagic Fish Aggregation Modeler" },
                  { name: "Agent 4: Navigational Geo-Fencer", role: "IMBL Boundary Proximity Warning" },
                  { name: "Agent 5: Marine Safety Advisor", role: "Wave Height & Cyclone Surge Risk" }
                ].map((a, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-0.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <strong className="text-cyan-300 font-sans">{a.name}</strong>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">{a.role}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            VIEW 2: ISRO OCEANSAT-3 PFZ MAP
           ========================================================================= */}
        {activeTab === 'gis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {pfzList.map((p) => (
                <div key={p.pfz_id} className="bg-slate-900 p-6 rounded-3xl border border-cyan-900/80 space-y-4 shadow-xl">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-cyan-400 font-bold text-[10px]">{p.pfz_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">
                        {lang === 'ta' ? p.coastal_sector_ta : lang === 'ml' ? p.coastal_sector_ml : p.coastal_sector}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {p.sea_surface_temp_c}°C SST
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CHLOROPHYLL</span><span className="text-emerald-400 font-bold">{p.chlorophyll_mg_m3} mg/m³</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BEARING</span><span className="text-cyan-300 font-bold">{p.bearing_deg}° SE</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DISTANCE</span><span className="text-white font-bold">{p.distance_nautical_miles} NM</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px] font-sans">
                    <div><strong>Target Species:</strong> {p.expected_species}</div>
                    <div className="text-cyan-400 pt-1 border-t border-slate-900 font-mono"><strong>IMBL Buffer:</strong> {p.imbl_buffer_distance_nm} NM Safe</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: OCEANOGRAPHIC & SATELLITE TELEMETRY
           ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {satellites.map((s, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-white font-sans">{s.sensor_name}</h4>
                  <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 rounded text-[10px]">{s.status}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                  <div><strong>Coverage:</strong> {s.coverage_area}</div>
                  <div><strong>Resolution:</strong> {s.chlorophyll_resolution || s.sst_resolution}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SAFE ROUTER & IMBL GEO-FENCER
           ========================================================================= */}
        {activeTab === 'router' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">NAUTICAL ROUTE PLANNER & IMBL WARNING</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Optimal Low-Fuel Fishing Corridor</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <div className="flex justify-between"><span>Origin:</span><strong className="text-white font-sans">Rameswaram Fishing Jetty</strong></div>
              <div className="flex justify-between"><span>Target PFZ:</span><strong className="text-cyan-300 font-sans">Gulf of Mannar Front #1 (16.4 NM)</strong></div>
              <div className="flex justify-between"><span>IMBL Margin:</span><strong className="text-emerald-400 font-sans">6.8 NM Distance to Sri Lanka Border (Safe)</strong></div>
              <div className="flex justify-between"><span>Fuel Estimate:</span><span className="text-amber-300 font-bold">28.5 Litres Diesel Saved</span></div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">ACTIVE PFZ ZONES</span><span className="text-xl font-bold text-cyan-400 mt-1 block">18 Clusters</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">FISHERMEN CONNECTED</span><span className="text-xl font-bold text-emerald-400 mt-1 block">42,500 Vessels</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">IMBL INCIDENTS PREVENTED</span><span className="text-xl font-bold text-cyan-400 mt-1 block">100% Zero Crossing</span></div>
          </div>
        )}

      </div>
    </div>
  );
}
