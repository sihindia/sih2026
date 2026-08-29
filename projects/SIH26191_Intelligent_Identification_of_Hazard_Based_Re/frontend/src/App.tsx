import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Sliders, 
  RefreshCw, 
  DollarSign, 
  Navigation, 
  FileText, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio, 
  Globe 
} from 'lucide-react';

import habitationsData from './data/vulnerable_habitations.json';
import sitesData from './data/safe_relocation_sites.json';
import capacityData from './data/carrying_capacity_metrics.json';
import corridorsData from './data/evacuation_corridors.json';
import plansData from './data/relocation_action_plans.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ml' | 'as'>('hi');
  const [habitations, setHabitations] = useState(habitationsData);
  const [selectedHab, setSelectedHab] = useState(habitationsData[0]);
  const [safeSites, setSafeSites] = useState(sitesData);
  const [selectedSite, setSelectedSite] = useState(sitesData[0]);
  const [corridors, setCorridors] = useState(corridorsData);
  const [activeTab, setActiveTab] = useState<'redzones' | 'sites' | 'matrix' | 'corridors' | 'command'>('redzones');

  // Carrying Capacity Simulator State
  const [landArea, setLandArea] = useState(48.5);
  const [slopeAngle, setSlopeAngle] = useState(5.8);
  const [waterYield, setWaterYield] = useState(450000);
  const [targetPop, setTargetPop] = useState(1840);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [capacityResult, setCapacityResult] = useState<any>({
    maxCap: 3200,
    headroom: 1360,
    isSafe: true,
    score: 94.5,
    verdict: "APPROVED FOR PERMANENT RESETTLEMENT"
  });

  const handleEvaluateCapacity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      const spatialCap = Math.round(landArea * 65);
      const waterCap = Math.round(waterYield / 135.0);
      const maxSustainable = Math.min(spatialCap, waterCap);
      const isSafe = slopeAngle < 12.0 && maxSustainable >= targetPop;
      
      setCapacityResult({
        maxCap: maxSustainable,
        headroom: maxSustainable - targetPop,
        isSafe,
        score: isSafe ? 94.5 : 52.0,
        verdict: isSafe ? "APPROVED FOR PERMANENT RESETTLEMENT" : "UNSUITABLE: Exceeds slope/water carrying capacity"
      });
      setIsEvaluating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MHA • NDRF • SURAKSHAGRID REDZONE AI DISASTER MANAGEMENT DSS • SIH26191</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SurakshaGrid: Multi-Hazard Red Zones & Proactive Habitational Relocation DSS
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Real-Time GIS Landslide/Flood Red Zones, Carrying Capacity Evaluation & 3-Phase Proactive Resettlement
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ml')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ml' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>മലയാളം</button>
            <button onClick={() => setLang('as')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'as' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>অসমীয়া</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'redzones', label: '🚨 Hazard-Based Red Zones', count: habitations.length },
            { id: 'sites', label: '🏞️ Safer Sites & Carrying Capacity', count: safeSites.length },
            { id: 'matrix', label: '📋 Relocation Priority Matrix' },
            { id: 'corridors', label: '🚛 NDRF Transit Corridors', count: corridors.length },
            { id: 'command', label: '📊 National SDMA Command Hub' }
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
            VIEW 1: HAZARD-BASED RED ZONES
           ========================================================================= */}
        {activeTab === 'redzones' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {habitations.map((hab) => (
                <button
                  key={hab.habitation_id}
                  onClick={() => setSelectedHab(hab)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedHab.habitation_id === hab.habitation_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{hab.habitation_id}</span>
                    <span className="text-amber-300">HVI {hab.habitation_vulnerability_index}/100</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? hab.name_hi : lang === 'ml' ? hab.name_ml : hab.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{hab.district}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{hab.population_at_risk} at Risk</span>
                    <span>{hab.zone_classification.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Red Zone Geospatial Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Real-Time Risk Telemetry */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedHab.habitation_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedHab.name}</h3>
                    <p className="text-xs text-slate-400">{selectedHab.district}</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedHab.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">SLOPE GRADIENT</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">{selectedHab.slope_angle_deg}° (High Risk)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">24H RAINFALL THRESHOLD</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedHab.rainfall_threshold_24h_mm} mm</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">POPULATION AT RISK</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">{selectedHab.population_at_risk}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 font-bold text-[10px] uppercase font-mono block">MULTI-HAZARD VECTOR:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedHab.hazard_types.map((h: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-300 text-xs font-mono font-bold">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl flex justify-between items-center text-xs font-mono text-slate-300">
                  <span>Assigned Safe Relocation Township:</span>
                  <strong className="text-emerald-400">{selectedHab.assigned_safe_site}</strong>
                </div>
              </div>

              {/* Right 5: AI Relocation Action */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Proactive Resettlement DSS</span>
                    </h4>
                    <span className="text-rose-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      HVI: {selectedHab.habitation_vulnerability_index}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    AI terrain instability model indicates immediate debris avalanche vulnerability upon exceeding 250mm cumulative rainfall. Proactive phase 1 relocation recommended.
                  </p>

                  <button
                    onClick={() => setActiveTab('sites')}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Assess Safe Relocation Capacity ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: SAFER RELOCATION SITES & CARRYING CAPACITY
           ========================================================================= */}
        {activeTab === 'sites' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Interactive Carrying Capacity Evaluator */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-rose-400" />
                  <span>Carrying Capacity Evaluator</span>
                </h4>

                <form onSubmit={handleEvaluateCapacity} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Usable Habitation Land (Hectares)</label>
                    <input type="number" step="0.5" required value={landArea} onChange={(e) => setLandArea(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Terrain Slope Gradient (Degrees, &lt; 12° safe)</label>
                    <input type="number" step="0.1" required value={slopeAngle} onChange={(e) => setSlopeAngle(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Groundwater Daily Yield (Litres/Day)</label>
                    <input type="number" step="1000" required value={waterYield} onChange={(e) => setWaterYield(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Intended Population to Resettle</label>
                    <input type="number" required value={targetPop} onChange={(e) => setTargetPop(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                  </div>

                  <button type="submit" disabled={isEvaluating} className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                    <span>{isEvaluating ? 'Computing Ecological & Spatial Capacity...' : 'Assess Sustainable Carrying Capacity'}</span>
                  </button>
                </form>
              </div>

              {/* Right 6: Suitability Verdict */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Site Carrying Capacity Audit Verdict</span>
                </h4>

                {capacityResult && (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 font-bold text-sm font-sans flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{capacityResult.verdict}</span>
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{capacityResult.score}% Suitability</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center pt-1">
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">MAX SUSTAINABLE CAP</span>
                        <span className="text-xl font-black text-white">{capacityResult.maxCap.toLocaleString()} People</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <span className="text-slate-500 block text-[9px]">CAPACITY HEADROOM</span>
                        <span className="text-xl font-black text-emerald-400">+{capacityResult.headroom.toLocaleString()} Margin</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                      <div>Water Norm: <strong>135 L / Capita / Day CPHEEO Verified</strong></div>
                      <div>Slope Buffer: <strong>Safe gradient under 12° seismic standard</strong></div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: RELOCATION PRIORITY MATRIX
           ========================================================================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-3">
                <span className="text-rose-400 font-bold text-[10px] uppercase">PHASE 1: IMMEDIATE (0-30 DAYS)</span>
                <h4 className="font-bold text-sm text-white font-sans">Critical Red Zone Habitations</h4>
                <p className="text-slate-300 font-sans text-xs">Chooralmala Valley & Sunil Ward Joshimath. Direct pre-monsoon evacuation.</p>
                <div className="text-rose-300 font-bold">690 Families (₹44.85 Cr Sanctioned)</div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-amber-800/80 space-y-3">
                <span className="text-amber-400 font-bold text-[10px] uppercase">PHASE 2: SHORT-TERM (1-6 MONTHS)</span>
                <h4 className="font-bold text-sm text-white font-sans">High-Risk Amber Buffer Zones</h4>
                <p className="text-slate-300 font-sans text-xs">Salmora Majuli Riverbank & Malin perimeter habitations.</p>
                <div className="text-amber-300 font-bold">510 Families (Planned Resettlement)</div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-800/80 space-y-3">
                <span className="text-emerald-400 font-bold text-[10px] uppercase">PHASE 3: MEDIUM-TERM (6-18 MONTHS)</span>
                <h4 className="font-bold text-sm text-white font-sans">Permanent Infrastructure Scaling</h4>
                <p className="text-slate-300 font-sans text-xs">School, PHC hospital, and livelihood skill development centers.</p>
                <div className="text-emerald-300 font-bold">Comprehensive Township Transition</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: NDRF TRANSIT CORRIDORS
           ========================================================================= */}
        {activeTab === 'corridors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {corridors.map((c) => (
                <div key={c.corridor_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{c.corridor_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{c.route_name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {c.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">LENGTH</span><span className="text-white font-bold">{c.length_km} km</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BRIDGE LOAD</span><span className="text-cyan-400 font-bold">{c.bridge_load_capacity_tons} T</span></div>
                    <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NDRF ETA</span><span className="text-emerald-400 font-bold">{c.ndrf_convoy_eta_mins} mins</span></div>
                  </div>

                  <button onClick={() => alert(`NDRF Convoy Dispatched along: ${c.route_name}`)} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Dispatch NDRF Evacuation Convoy ➔</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: NATIONAL SDMA COMMAND HUB
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">NATIONAL DISASTER MANAGEMENT AUTHORITY (NDMA)</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">National Resettlement & Housing Grant Ledger</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">TOTAL POPULATION RELOCATED</span><span className="text-2xl font-black text-white mt-1 block">4,910</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">DBT HOUSING SANCTIONED</span><span className="text-2xl font-black text-emerald-400 mt-1 block">₹44.85 Cr</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950"><span className="text-slate-500 block text-[9px]">SAFE HABITATIONS BUILT</span><span className="text-2xl font-black text-cyan-400 mt-1 block">3 Modern Hubs</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
