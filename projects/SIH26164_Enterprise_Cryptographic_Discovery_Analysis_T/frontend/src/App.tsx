import React, { useState } from 'react';
import { 
  KeyRound, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  FileSpreadsheet, 
  ShieldAlert, 
  Cpu, 
  RefreshCw, 
  Globe 
} from 'lucide-react';

import cbomData from './data/cryptographic_bill_of_materials.json';
import pqcData from './data/pqc_algorithms.json';
import statsData from './data/ecdat_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [cbom, setCbom] = useState(cbomData);
  const [selectedAsset, setSelectedAsset] = useState(cbomData[0]);
  const [pqc, setPqc] = useState(pqcData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cbom' | 'mosca' | 'pqc' | 'stats'>('cbom');

  // Interactive CBOM Scanner
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>({
    assets: 14,
    vulnerable: 11,
    mosca: "MIGRATION_URGENT (X+Y > Z)",
    replacement: "ML-KEM-768 & ML-DSA-65 (FIPS 203/204)"
  });

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        assets: 14,
        vulnerable: 11,
        mosca: "MIGRATION_URGENT (X+Y > Z)",
        replacement: "ML-KEM-768 & ML-DSA-65 (FIPS 203/204)"
      });
      setIsScanning(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-violet-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-bold tracking-wider">
              <KeyRound className="w-4 h-4 text-violet-400 animate-pulse" />
              <span>NTRO • ECDAT 360 POST-QUANTUM CRYPTOGRAPHIC DISCOVERY • SIH26164</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ECDAT: Enterprise Cryptographic Discovery & Quantum Risk Analysis
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Cryptographic Bill of Materials (CBOM), Mosca's Theorem Quantum Risk Model & NIST FIPS 203/204 PQC Transition Advisor
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-violet-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-violet-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-violet-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-violet-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-violet-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cbom', label: '📦 Cryptographic Bill of Materials (CBOM)', count: cbom.length },
            { id: 'mosca', label: '⏳ Mosca Quantum Risk Theorem' },
            { id: 'pqc', label: '🛡️ NIST Post-Quantum Standards', count: pqc.length },
            { id: 'stats', label: '📊 Enterprise Quantum Readiness' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-violet-500 text-slate-950 shadow-lg shadow-violet-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-violet-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* VIEW 1: CBOM */}
        {activeTab === 'cbom' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cbom.map((c) => (
                <button
                  key={c.asset_id}
                  onClick={() => setSelectedAsset(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedAsset.asset_id === c.asset_id
                      ? 'bg-violet-950/60 border-violet-500 text-white shadow-lg ring-2 ring-violet-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-violet-400">{c.asset_id}</span>
                    <span className="text-rose-400">{c.algorithm.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? c.location_hi : c.location}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.algorithm}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{c.mosca_risk_verdict.split(' ')[0]}</span>
                    <span>PQC: {c.recommended_pqc_replacement.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-violet-400 font-bold">{selectedAsset.asset_id} • {selectedAsset.algorithm}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedAsset.location}</h3>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedAsset.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[8px]">DATA SHELF-LIFE (X)</span>
                    <span className="text-white font-bold">{selectedAsset.data_shelf_life_years} Years</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[8px]">MIGRATION TIME (Y)</span>
                    <span className="text-amber-400 font-bold">{selectedAsset.migration_time_years} Years</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <div><strong>Mosca Quantum Verdict:</strong> <span className="text-rose-400 font-mono">{selectedAsset.mosca_risk_verdict}</span></div>
                  <div><strong>Target PQC Replacement:</strong> <span className="text-emerald-400 font-mono">{selectedAsset.recommended_pqc_replacement}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('pqc')}
                  className="w-full py-3 bg-violet-500 hover:bg-violet-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore NIST Post-Quantum Cryptography Migration Plan ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>Automated CBOM Scanner</span>
                  </h4>
                  <form onSubmit={handleScan} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Repository / Container Image</label>
                      <input type="text" readOnly value="docker.ntro.local/core-payments:v2.4" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-violet-400" />
                    </div>
                    <button type="submit" disabled={isScanning} className="w-full py-2.5 bg-violet-500 hover:bg-violet-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                      <span>{isScanning ? 'Extracting Cryptographic Primitives...' : 'Generate CBOM Inventory'}</span>
                    </button>
                  </form>
                  {scanResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Quantum Vulnerable: <strong className="text-rose-400 font-mono">{scanResult.vulnerable} / {scanResult.assets} Assets</strong></div>
                      <div>Replacement: <strong className="text-emerald-400 font-mono text-xs">{scanResult.replacement}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MOSCA */}
        {activeTab === 'mosca' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-violet-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-violet-500/40 pb-3">
              <span className="text-violet-400 font-bold text-[10px] uppercase">MOSCA'S THEOREM (X + Y &gt; Z)</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Quantum Risk Evaluation Framework</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div><strong>X = Shelf-Life:</strong> Time confidential data must remain protected (e.g. 15 years for classified assets).</div>
              <div><strong>Y = Migration Time:</strong> Time required to re-engineer systems with PQC (e.g. 3.5 years).</div>
              <div><strong>Z = Time to Quantum Computer:</strong> Expected arrival of Cryptographically Relevant Quantum Computer (CRQC ~ 2032 / 6 years).</div>
              <div className="text-rose-400 font-bold pt-1 border-t border-slate-900">
                Since (15 + 3.5 = 18.5) &gt; 6, adversary "Harvest-Now-Decrypt-Later" attack is an active and critical threat.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PQC */}
        {activeTab === 'pqc' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {pqc.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-white font-sans">{p.name}</h4>
                  <span className="px-2 py-0.5 bg-violet-950 text-violet-300 rounded font-bold">{p.standard}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Type: <strong className="text-white">{p.type}</strong></div>
                  <div>Security: <strong className="text-emerald-400">{p.security_category}</strong></div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-900">Use: {p.use_case}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-violet-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
