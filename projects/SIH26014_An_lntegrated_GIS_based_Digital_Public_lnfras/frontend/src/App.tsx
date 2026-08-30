import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Building2, 
  RefreshCw, 
  Compass, 
  Activity, 
  Globe 
} from 'lucide-react';

import parcelsData from './data/land_stack_dpi_parcels_and_ro_r.json';
import layersData from './data/dpi_three_tier_layers_architecture.json';
import apisData from './data/open_api_departmental_endpoints.json';
import statsData from './data/landstack_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'pa'>('en');
  const [parcels, setParcels] = useState(parcelsData);
  const [selectedParcel, setSelectedParcel] = useState(parcelsData[0]);
  const [layers, setLayers] = useState(layersData);
  const [apis, setApis] = useState(apisData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'parcels' | 'tiers' | 'citizen' | 'apis' | 'stats'>('parcels');

  // Interactive Bhu-Aadhaar Land Ownership Certificate Generator
  const [isVerifying, setIsVerifying] = useState(false);
  const [certResult, setCertResult] = useState<any>({
    bhuAadhaarId: "BHU-AADHAAR-04-001-9012-3341",
    owner: "Chandigarh Heritage Retail Trust",
    mutationStatus: "Mutation Cleared (Tehsildar Digital Token 0x88F21A)",
    encumbrance: "Zero Bank Mortgages / Encumbrances Found",
    propertyTax: "₹1,45,000/yr Paid (Civic Assessment 2026-27)",
    dscValidation: "Cryptographically Verified by Controller of Certifying Authorities (CCA)"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setCertResult({
        bhuAadhaarId: `BHU-AADHAAR-${selectedParcel.ulpin}`,
        owner: selectedParcel.owner_name,
        mutationStatus: "Mutation Cleared (Tehsildar Digital Token 0x88F21A)",
        encumbrance: "Zero Bank Mortgages / Encumbrances Found",
        propertyTax: selectedParcel.usecase_layer_services.split('•')[0].trim(),
        dscValidation: "Cryptographically Verified by Controller of Certifying Authorities (CCA)"
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Layers className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR LANDSTACK 360 • SIH26014</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR LandStack: Integrated GIS-Based Digital Public Infrastructure (DPI)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) 3-Tier Layered Land Stack: Base Cadastre (ULPIN Bhu-Aadhaar), Essential RoR &amp; Deeds, and Citizen Service Delivery across National Pilots in Chandigarh &amp; Tamil Nadu
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'parcels', label: '🏠 Land Stack Parcels (Pilots)', count: parcels.length },
            { id: 'tiers', label: '🏛️ 3-Tier DPI Architecture', count: layers.length },
            { id: 'citizen', label: '📜 Citizen Bhu-Aadhaar Portal' },
            { id: 'apis', label: '⚡ Open Inter-Agency APIs', count: apis.length },
            { id: 'stats', label: '📊 LandStack Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: PARCELS
           ========================================================================= */}
        {activeTab === 'parcels' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {parcels.map((p) => (
                <button
                  key={p.ulpin}
                  onClick={() => setSelectedParcel(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedParcel.ulpin === p.ulpin
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{p.ulpin}</span>
                    <span className="text-amber-400">{p.parcel_area_sqm} m²</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.owner_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.location}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.state_ut.split('(')[0]}</span>
                    <span className="text-cyan-400">PILOT_ACTIVE</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedParcel.ulpin} • {selectedParcel.state_ut}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedParcel.location}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedParcel.stack_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">3-TIER DPI LAYER CONFLATION:</span>
                  <div className="text-white font-sans text-xs">
                    Tier 1 (Base Cadastre): <strong className="text-emerald-300">{selectedParcel.base_layer_cadastre}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Tier 2 (Essential Rights): {selectedParcel.essential_layer_rights}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Tier 3 (Use-Cases): {selectedParcel.usecase_layer_services}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px] pt-1 border-t border-slate-900 font-bold">
                    Citizen Service: {selectedParcel.citizen_service_status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PARCEL AREA</span><span className="text-emerald-400 font-bold">{selectedParcel.parcel_area_sqm} m²</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">TITLE HOLDER</span><span className="text-cyan-400 font-bold truncate block">{selectedParcel.owner_name}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('citizen')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch Citizen Bhu-Aadhaar Certificate Verification ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Instant Bhu-Aadhaar Verification</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">14-Digit Standardized ULPIN</label>
                      <input type="text" readOnly value={`${selectedParcel.ulpin} (${selectedParcel.location.split(',')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Verifying RoR Mutation & Encumbrances...' : 'Verify Land Stack Record'}</span>
                    </button>
                  </form>
                  {certResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Bhu-Aadhaar: <strong className="text-emerald-400 font-mono text-xs">{certResult.bhuAadhaarId}</strong></div>
                      <div>Owner: <span className="text-white text-xs font-bold">{certResult.owner}</span></div>
                      <div>Mutation: <strong className="text-cyan-300 font-mono text-xs">{certResult.mutationStatus}</strong></div>
                      <div>Encumbrance: <strong className="text-emerald-300 font-mono text-xs">{certResult.encumbrance}</strong></div>
                      <div>Fiscal: <strong className="text-amber-300 font-mono text-xs">{certResult.propertyTax}</strong></div>
                      <div>Security: <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{certResult.dscValidation}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TIERS */}
        {tab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {layers.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{l.tier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.components}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{l.governance_role}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">National DPI Framework Compliant</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CITIZEN */}
        {tab === 'citizen' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Citizen Bhu-Aadhaar Digital Certificate Delivery</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Empowering citizens with instant, verifiable land title certificates, digital mortgage clearances, and transparent property mutation tracking without visits to administrative revenue offices.
            </p>
          </div>
        )}

        {/* VIEW 4: APIS */}
        {tab === 'apis' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {apis.map((a, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{a.method} {a.endpoint}</span>
                <h4 className="font-bold text-sm text-white font-sans">{a.description}</h4>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">Security: {a.security}</div>
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
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
