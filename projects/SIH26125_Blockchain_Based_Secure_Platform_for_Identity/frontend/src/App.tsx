import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Lock, 
  Key, 
  RefreshCw, 
  Link, 
  Sliders, 
  Globe 
} from 'lucide-react';

import casesData from './data/blockchain_digital_assets_did_cases.json';
import didsData from './data/decentralized_identity_did_registry.json';
import rbacData from './data/smart_contract_rbac_permission_matrix.json';
import statsData from './data/trustchain_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [dids, setDids] = useState(didsData);
  const [rbac, setRbac] = useState(rbacData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'dids' | 'rbac' | 'explorer' | 'stats'>('cases');

  // Interactive Smart Contract Transaction Simulator
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<any>({
    txHash: "0x7a89bc214ef5601289ea01243781290bbce81293a90f128c7412890bfa3c8291",
    block: "Block #1,849,204 (12 Confirmations)",
    rbac: "RBAC Verified: ROLE_DEFENCE_AUDITOR (Level 5 Clearance)",
    status: "IMMUTABLY RECORDED ON BLOCKCHAIN"
  });

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setTimeout(() => {
      setMintResult({
        txHash: "0x7a89bc214ef5601289ea01243781290bbce81293a90f128c7412890bfa3c8291",
        block: "Block #1,849,204 (12 Confirmations)",
        rbac: "RBAC Verified: ROLE_DEFENCE_AUDITOR (Level 5 Clearance)",
        status: "IMMUTABLY RECORDED ON BLOCKCHAIN"
      });
      setIsMinting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>BEL • TRUSTCHAIN 360 BLOCKCHAIN IDENTITY, RBAC & DIGITAL ASSET PLATFORM • SIH26125</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BEL TrustChain: Blockchain Platform for Decentralized Identity (DID), RBAC & Digital Asset Management
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              W3C Decentralized Identifiers (DIDs), Smart-Contract Governed Defense Asset NFTs (ERC-721/1155) & Immutable On-Chain RBAC Audit Trails
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🛡️ Asset Custody Cases', count: cases.length },
            { id: 'dids', label: '🪪 Decentralized DIDs', count: dids.length },
            { id: 'rbac', label: '📜 Smart Contract RBAC', count: rbac.length },
            { id: 'explorer', label: '⛓️ On-Chain Block Explorer' },
            { id: 'stats', label: '📊 TrustChain Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cases.map((c) => (
                <button
                  key={c.asset_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.asset_id === c.asset_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{c.asset_id}</span>
                    <span className="text-cyan-300">{c.token_standard.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.asset_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Owner: {c.current_did_owner.slice(0, 30)}...</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Role: {c.smart_contract_rbac_role.split(' ')[0]}</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedCase.asset_id} • {selectedCase.token_standard}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.asset_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">SMART CONTRACT NFT PROVENANCE & RBAC VALIDATION:</span>
                  <div className="text-white font-sans text-xs font-bold">Owner DID: {selectedCase.current_did_owner}</div>
                  <div className="text-cyan-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Recipient DID: <strong>{selectedCase.target_recipient_did}</strong>
                  </div>
                  <div className="text-amber-300 font-mono text-[10px]">
                    Firmware SHA-256: {selectedCase.firmware_sha256_hash}
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Permission: {selectedCase.smart_contract_rbac_role}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BLOCK CONFIRMATIONS</span><span className="text-emerald-400 font-bold">{selectedCase.block_confirmations} Blocks (Finalized)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">ON-CHAIN AUDIT</span><span className="text-purple-400 font-bold">100% Immutable</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('dids')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Verify W3C Decentralized Identifiers & Public Keys ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Smart Contract Execution Engine</span>
                  </h4>
                  <form onSubmit={handleMint} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Defence Asset Token</label>
                      <input type="text" readOnly value={`${selectedCase.asset_id} (${selectedCase.asset_title.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" />
                    </div>
                    <button type="submit" disabled={isMinting} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isMinting ? 'animate-spin' : ''}`} />
                      <span>{isMinting ? 'Verifying RBAC Signature & Mining Tx...' : 'Execute On-Chain Custody Transfer'}</span>
                    </button>
                  </form>
                  {mintResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Tx Hash: <strong className="text-purple-400 font-mono text-xs">{mintResult.txHash.slice(0, 30)}...</strong></div>
                      <div>Status: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{mintResult.status}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DIDS */}
        {tab === 'dids' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {dids.map((d, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold">{d.role}</span>
                <h4 className="font-bold text-sm text-white font-sans">{d.did_uri}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Entity: <strong className="text-white">{d.controller_entity}</strong></div>
                  <div className="text-cyan-400 text-[11px] pt-1 border-t border-slate-900">Key: {d.public_key_type}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: RBAC */}
        {tab === 'rbac' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rbac.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{r.smart_contract_modifier}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.role_name}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{r.permissions}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: EXPLORER */}
        {tab === 'explorer' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-400">
              <Link className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">On-Chain Defence Asset Blockchain Explorer</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time ledger verifying cryptographic provenance, smart contract mints, firmware hash audits, and tamper-proof role permission updates across Indian defense installations.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
