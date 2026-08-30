import React, { useState } from 'react';
import { 
  CloudSun, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Mic, 
  Volume2, 
  RefreshCw, 
  Send, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import intentsData from './data/weathergpt_conversational_intents.json';
import modelsData from './data/nwp_forecast_models_and_radar_matrix.json';
import alertsData from './data/extreme_weather_alerts_registry.json';
import statsData from './data/weathergpt_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'te' | 'ta' | 'bn'>('en');
  const [intents, setIntents] = useState(intentsData);
  const [selectedIntent, setSelectedIntent] = useState(intentsData[0]);
  const [models, setModels] = useState(modelsData);
  const [alerts, setAlerts] = useState(alertsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'chat' | 'alerts' | 'models' | 'advisories' | 'stats'>('chat');

  // Interactive Natural Language Chat Simulator
  const [userQuery, setUserQuery] = useState(intentsData[0].user_query_text);
  const [isAnswering, setIsAnswering] = useState(false);
  const [chatResponse, setChatResponse] = useState<any>({
    answer: "GFS Model predicts a dry spell for the next 48 hours over Amravati. Rain probability is < 15%. Clear window available for pesticide spraying today and tomorrow.",
    model: "IMD WRF-3km High Resolution + GFS-T1534",
    advisory: "Complete chemical pesticide spraying within 48h. Ensure drainage channels are clear before Thursday's heavy rain (45-65mm).",
    alert: "GREEN_NOMINAL (Safe for Field Work)",
    latency: "182 ms Response Time (WIS 2.0 Real-Time Stream)"
  });

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnswering(true);
    setTimeout(() => {
      setChatResponse({
        answer: selectedIntent.weathergpt_response,
        model: selectedIntent.nwp_model_retrieved,
        advisory: selectedIntent.actionable_advisory,
        alert: selectedIntent.alert_level,
        latency: "182 ms Response Time (WIS 2.0 Real-Time Stream)"
      });
      setIsAnswering(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <CloudSun className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MOES / IMD • WEATHERGPT 360 CONVERSATIONAL METEOROLOGICAL AI • SIH26068</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              IMD WeatherGPT: Conversational AI for Weather Forecasting &amp; Alerts
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              India Meteorological Department (IMD) Natural Language AI Integrating GFS/WRF Numerical Models, Doppler Radars, INSAT-3DR Satellites, Voice-Enabled Agromet Advisories in 12+ Indian Languages
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('te')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'te' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>తెలుగు</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'chat', label: '💬 WeatherGPT Assistant', count: intents.length },
            { id: 'alerts', label: '🚨 Extreme Weather Alerts', count: alerts.length },
            { id: 'models', label: '🌦️ NWP Forecast Models', count: models.length },
            { id: 'advisories', label: '🌾 Agromet & Sectoral Advisories' },
            { id: 'stats', label: '📊 WeatherGPT Telemetry' }
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
            VIEW 1: CHAT
           ========================================================================= */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {intents.map((i) => (
                <button
                  key={i.query_id}
                  onClick={() => { setSelectedIntent(i); setUserQuery(i.user_query_text); }}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedIntent.query_id === i.query_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{i.query_id}</span>
                    <span className={i.alert_level.includes('RED') ? 'text-rose-400' : i.alert_level.includes('ORANGE') ? 'text-amber-400' : 'text-emerald-400'}>
                      {i.alert_level.split('_')[0]}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {i.user_persona}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{i.location}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{i.language}</span>
                    <span className="text-emerald-400">{i.sector.split('&')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedIntent.query_id} • {selectedIntent.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedIntent.user_persona}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedIntent.alert_level.includes('RED') ? 'bg-rose-950 text-rose-300 border-rose-800' :
                    selectedIntent.alert_level.includes('ORANGE') ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedIntent.alert_level}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">CONVERSATIONAL USER QUERY &amp; MODEL SYNTHESIS:</span>
                  <div className="text-white font-sans text-xs">
                    Query: <strong className="text-amber-300">"{selectedIntent.user_query_text}"</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    NWP Source: {selectedIntent.nwp_model_retrieved}
                  </div>
                  <div className="text-sky-300 font-sans text-xs pt-1 border-t border-slate-900">
                    WeatherGPT Intelligence: {selectedIntent.weathergpt_response}
                  </div>
                  <div className="text-amber-200 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Actionable Advice: {selectedIntent.actionable_advisory}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NWP RETRIEVAL LATENCY</span><span className="text-emerald-400 font-bold">182 ms Ultra-Low</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LANGUAGES SUPPORTED</span><span className="text-amber-400 font-bold">12+ Indian Regional</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect IMD Real-Time Extreme Weather Warning Alerts ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Live Interactive Chat Simulator</span>
                  </h4>
                  <form onSubmit={handleAsk} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Type or Speak Weather Question</label>
                      <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button type="submit" disabled={isAnswering} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <Send className={`w-4 h-4 ${isAnswering ? 'animate-bounce' : ''}`} />
                      <span>{isAnswering ? 'Retrieving GFS/WRF Grids...' : 'Ask WeatherGPT Natural Language Assistant'}</span>
                    </button>
                  </form>
                  {chatResponse && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Response: <span className="text-amber-200 text-xs">{chatResponse.answer}</span></div>
                      <div className="pt-1">NWP Model: <strong className="text-emerald-400 font-mono text-xs">{chatResponse.model}</strong></div>
                      <div>Advisory: <strong className="text-sky-300 font-mono text-xs">{chatResponse.advisory}</strong></div>
                      <div>Status: <strong className="text-white font-mono text-xs block mt-0.5">{chatResponse.latency}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ALERTS */}
        {tab === 'alerts' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {alerts.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className={`font-bold ${a.severity.includes('RED') ? 'text-rose-400' : a.severity.includes('ORANGE') ? 'text-amber-400' : 'text-yellow-400'}`}>{a.severity}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.hazard}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Regions: {a.regions}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Lead Time: {a.lead_time}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: MODELS */}
        {tab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400 font-bold">{m.resolution}</span>
                  <span className="text-emerald-400 font-bold">{m.update_frequency}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{m.model_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Coverage: {m.coverage}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ADVISORIES */}
        {tab === 'advisories' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <CloudSun className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Sectoral Agromet &amp; Disaster Decision Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated translation of numerical weather forecasts into direct economic actions: irrigation cutoffs before heavy rainfall, pesticide spraying clear windows, and deep-sea marine safety advisories.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
