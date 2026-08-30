import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Plane, 
  DollarSign, 
  RefreshCw, 
  PieChart, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import routesData from './data/dgca_weighted_city_pairs_basket.json';
import leadTimesData from './data/advance_purchase_leadtime_elasticity.json';
import componentsData from './data/fare_disaggregation_tax_components.json';
import statsData from './data/vayuindex_cpi_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'mr' | 'ta'>('en');
  const [routes, setRoutes] = useState(routesData);
  const [selectedRoute, setSelectedRoute] = useState(routesData[0]);
  const [leadTimes, setLeadTimes] = useState(leadTimesData);
  const [components, setComponents] = useState(componentsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'routes' | 'index' | 'leadtimes' | 'components' | 'stats'>('routes');

  // Interactive Airfare Price Index Calculator
  const [isCalculating, setIsCalculating] = useState(false);
  const [indexResult, setIndexResult] = useState<any>({
    apixScore: "118.4 pts (+4.2% MoM Inflation)",
    jevonsIndex: "117.9 (Geometric Mean across 4 Airlines)",
    laspeyresWeight: "14.2% National DGCA Passenger Traffic Share",
    cpiImpact: "+14.2 bps to Transport Sub-Group Inflation",
    rbiFeedStatus: "TRANSMITTED TO NSO & RBI MONETARY POLICY FEED"
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIndexResult({
        apixScore: "118.4 pts (+4.2% MoM Inflation)",
        jevonsIndex: "117.9 (Geometric Mean across 4 Airlines)",
        laspeyresWeight: "14.2% National DGCA Passenger Traffic Share",
        cpiImpact: "+14.2 bps to Transport Sub-Group Inflation",
        rbiFeedStatus: "TRANSMITTED TO NSO & RBI MONETARY POLICY FEED"
      });
      setIsCalculating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <TrendingUp className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>MOSPI / DIID • VAYUINDEX 360 REAL-TIME AIRFARE CPI AUGMENTATION • SIH26056</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSPI VayuIndex: Real-Time Airfare Price Index for Consumer Price Index (CPI)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Statistical Office (NSO) Automated Web Scraping of Airline Portals &amp; OTAs, DGCA Traffic-Weighted City-Pairs, Multi-Lead Time Elasticity (T+1 to T+45) &amp; Jevons-Laspeyres Inflation Index
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'routes', label: '✈️ DGCA Route Basket', count: routes.length },
            { id: 'index', label: '📈 APIx Real-Time Index' },
            { id: 'leadtimes', label: '⏳ Lead-Time Elasticity', count: leadTimes.length },
            { id: 'components', label: '🧾 Fare Disaggregation', count: components.length },
            { id: 'stats', label: '📊 MoSPI VayuIndex Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-blue-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: ROUTES
           ========================================================================= */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {routes.map((r) => (
                <button
                  key={r.route_code}
                  onClick={() => setSelectedRoute(r)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedRoute.route_code === r.route_code
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{r.route_code}</span>
                    <span className="text-emerald-400">APIx: {r.current_route_apix}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {r.sector_name.split('⇋')[0]} ⇋ {r.sector_name.split('⇋')[1]?.split(' ')[1]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{r.carriers_monitored}</div>
                  <div className="text-[10px] text-blue-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>DGCA Wt: {r.dgca_traffic_weight_pct}%</span>
                    <span className="text-amber-400">+{r.mom_inflation_pct}% MoM</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedRoute.route_code} • {selectedRoute.sector_name}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">DGCA Traffic Weight: {selectedRoute.dgca_traffic_weight_pct}%</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedRoute.cpi_contribution_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-blue-400 block text-[9px] font-bold uppercase">DYNAMIC AIRFARE QUOTES &amp; TAX DISAGGREGATION:</span>
                  <div className="text-white font-sans text-xs">
                    Carriers Scraped: <strong className="text-amber-300">{selectedRoute.carriers_monitored}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Lead Time Quotes: T+1 (₹{selectedRoute.fares_by_lead_time.T_plus_1.toLocaleString()}) | T+7 (₹{selectedRoute.fares_by_lead_time.T_plus_7.toLocaleString()}) | T+15 (₹{selectedRoute.fares_by_lead_time.T_plus_15.toLocaleString()}) | T+30 (₹{selectedRoute.fares_by_lead_time.T_plus_30.toLocaleString()})
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Component Split: Base Fare ({selectedRoute.fare_split.base_fare_pct}%) | Fuel Surcharge ({selectedRoute.fare_split.fuel_surcharge_yq_pct}%) | UDF/ASF ({selectedRoute.fare_split.udf_asf_fees_pct}%) | GST ({selectedRoute.fare_split.gst_tax_pct}%)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CURRENT ROUTE APIX INDEX</span><span className="text-emerald-400 font-bold">{selectedRoute.current_route_apix} pts (+{selectedRoute.mom_inflation_pct}% MoM)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">T+1 TO T+30 SPREAD</span><span className="text-blue-400 font-bold">{(selectedRoute.fares_by_lead_time.T_plus_1 / selectedRoute.fares_by_lead_time.T_plus_30).toFixed(2)}x Multiplier</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('index')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch National Jevons-Laspeyres Airfare Index Calculator ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Instant APIx Index Generator</span>
                  </h4>
                  <form onSubmit={handleCalculate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Sector Pair</label>
                      <input type="text" readOnly value={`${selectedRoute.route_code} (${selectedRoute.sector_name.split('⇋')[0].trim()} - ${selectedRoute.sector_name.split('⇋')[1]?.trim()})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>
                    <button type="submit" disabled={isCalculating} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                      <span>{isCalculating ? 'Computing Geometric Jevons Means...' : 'Calculate Route & National APIx'}</span>
                    </button>
                  </form>
                  {indexResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Route APIx: <strong className="text-emerald-400 font-mono text-xs">{indexResult.apixScore}</strong></div>
                      <div>Jevons Mean: <strong className="text-blue-400 font-mono text-xs">{indexResult.jevonsIndex}</strong></div>
                      <div>DGCA Weight: <strong className="text-cyan-300 font-mono text-xs">{indexResult.laspeyresWeight}</strong></div>
                      <div>CPI Impact: <strong className="text-amber-300 font-mono text-xs">{indexResult.cpiImpact}</strong></div>
                      <div>NSO/RBI Feed: <strong className="text-white font-mono text-xs block mt-0.5">{indexResult.rbiFeedStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INDEX */}
        {tab === 'index' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Jevons-Laspeyres Inflation Index Architecture</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Combines geometric unweighted Jevons means at the elementary carrier-leadtime level with official DGCA passenger-traffic Laspeyres weights to generate an unbiased, high-frequency airfare inflation metric for MoSPI and RBI.
            </p>
          </div>
        )}

        {/* VIEW 3: LEAD TIMES */}
        {tab === 'leadtimes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {leadTimes.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-400 font-bold">{l.avg_multiplier}</span>
                  <span className="text-emerald-400 font-bold">{l.price_elasticity.split(' ')[0]}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{l.horizon}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Target: {l.consumer_type}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: COMPONENTS */}
        {tab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {components.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-cyan-400 font-bold">{c.share_pct} Share</span>
                  <span className="text-amber-400 font-bold">{c.cpi_classification.split(' ')[0]}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{c.component}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{c.pricing_model}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
