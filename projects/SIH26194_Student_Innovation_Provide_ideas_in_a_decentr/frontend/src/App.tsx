import React, { useState } from 'react';
import { 
  GitMerge, 
  GraduationCap, 
  Pill, 
  Building2, 
  Leaf, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Database, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  FileText, 
  ChevronRight, 
  Printer, 
  Share2, 
  Lock, 
  Globe 
} from 'lucide-react';

import useCasesData from './data/dlt_use_cases.json';
import blocksData from './data/live_blocks_ledger.json';
import contractsData from './data/smart_contracts.json';
import didData from './data/did_identities.json';
import validatorsData from './data/validator_nodes.json';

export default function App() {
  const [useCases, setUseCases] = useState(useCasesData);
  const [selectedCase, setSelectedCase] = useState(useCasesData[0]);
  const [blocks, setBlocks] = useState(blocksData);
  const [contracts, setContracts] = useState(contractsData);
  const [validators, setValidators] = useState(validatorsData);
  const [activeTab, setActiveTab] = useState<'usecases' | 'sandbox' | 'explorer' | 'did' | 'strategy'>('usecases');

  // Interactive Smart Contract Minter State
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [degreeName, setDegreeName] = useState('B.Tech in Artificial Intelligence & Data Science');
  const [collegeCode, setCollegeCode] = useState('INST-AICTE-IITD-01');
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<any>(null);

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setTimeout(() => {
      const txHash = "0x" + Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
      setMintResult({
        txHash,
        blockNum: 1849206,
        tokenType: "Soulbound Non-Transferable ERC-5192 NFT",
        did: "did:bhartiya:aicte-2026-9812-student",
        student: studentName,
        degree: degreeName,
        status: "COMMITTED_TO_NATIONAL_LEDGER"
      });
      setIsMinting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <GitMerge className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>AICTE • MEITY • BHARTIYALEDGER 360 NATIONAL DLT GRID • SIH26194</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              BhartiyaLedger 360: National Enterprise Blockchain, NFTs & Trust Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Proof-of-Authority Consortium DLT, Soulbound Academic Diplomas, Pharma Cold-Chain & W3C DID Identity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 font-mono shadow-inner">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>POA CONSENSUS (2,450 TPS)</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'usecases', label: '⛓️ Multi-Sector DLT Architecture', count: useCases.length },
            { id: 'sandbox', label: '📜 Smart Contract Degree Minter' },
            { id: 'explorer', label: '🔍 Live Block Explorer', count: blocks.length },
            { id: 'did', label: '🆔 W3C Decentralized Identity (DID)', count: didData.length },
            { id: 'strategy', label: '📊 National Blockchain Strategy' }
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
            VIEW 1: MULTI-SECTOR DLT ARCHITECTURE
           ========================================================================= */}
        {activeTab === 'usecases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {useCases.map((uc) => (
                <button
                  key={uc.use_case_id}
                  onClick={() => setSelectedCase(uc)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.use_case_id === uc.use_case_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{uc.use_case_id}</span>
                    <span className="text-emerald-400">{uc.consensus_mode.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {uc.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{uc.sector}</div>
                </button>
              ))}
            </div>

            {/* Split Architecture Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: DLT Specifications */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400">{selectedCase.use_case_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedCase.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">Contract: {selectedCase.contract_address}</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.sector}
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase font-mono block">DECENTRALIZED ARCHITECTURE OVERVIEW:</span>
                  <p className="text-slate-200 font-sans text-xs leading-relaxed">
                    {selectedCase.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                    <span className="text-slate-500 block text-[9px]">PRIVACY ENGINE</span>
                    <span className="text-xs font-black text-cyan-400 mt-1 block">{selectedCase.privacy_engine}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">ECONOMIC / AUDIT IMPACT</span>
                    <span className="text-xs font-black text-emerald-400 mt-1 block">{selectedCase.economic_impact}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('sandbox')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Execute Smart Contract on Sandbox ➔</span>
                </button>
              </div>

              {/* Right 5: Solidity Contract Interface */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Smart Contract ABI</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      AUDITED 99.8%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-2 text-slate-300">
                    <div className="text-cyan-300 font-bold">{contracts[0].name} ({contracts[0].version})</div>
                    <div className="text-[11px] space-y-1">
                      {contracts[0].methods.map((m: string, i: number) => (
                        <div key={i} className="text-slate-400 font-mono">❯ {m}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/40 border border-cyan-800 rounded-xl text-cyan-300 font-sans text-xs">
                    <strong>Gas Optimization:</strong> ERC-5192 standard minimizes on-chain storage with cryptographic Merkle root anchoring.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: SMART CONTRACT DEGREE MINTER
           ========================================================================= */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Degree Minter Form */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Issue Soulbound Non-Transferable Diploma (ERC-5192)</span>
                </h4>

                <form onSubmit={handleMint} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Student Full Name</label>
                    <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Degree Title / Specialization</label>
                    <input type="text" required value={degreeName} onChange={(e) => setDegreeName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Issuing Institution Code (AICTE / UGC Accredited)</label>
                    <input type="text" required value={collegeCode} onChange={(e) => setCollegeCode(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono text-cyan-400 font-bold" />
                  </div>

                  <button type="submit" disabled={isMinting} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isMinting ? 'animate-spin' : ''}`} />
                    <span>{isMinting ? 'Executing PoA Smart Contract...' : 'Mint Soulbound NFT Degree to Ledger'}</span>
                  </button>
                </form>
              </div>

              {/* Right 6: Minting Receipt & Cryptographic Proof */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>On-Chain Cryptographic Receipt</span>
                </h4>

                {mintResult ? (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-800 space-y-2 font-mono text-xs">
                    <div className="text-emerald-400 font-bold text-sm font-sans flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{mintResult.status}</span>
                    </div>
                    <div className="text-slate-300">Tx Hash: <span className="text-cyan-300 break-all">{mintResult.txHash}</span></div>
                    <div className="text-slate-300">Block: <strong>#{mintResult.blockNum}</strong></div>
                    <div className="text-slate-300">Recipient DID: <span className="text-white">{mintResult.did}</span></div>
                    <div className="p-3 bg-slate-900 rounded-xl space-y-1 font-sans text-xs text-white">
                      <div>Graduate: <strong>{mintResult.student}</strong></div>
                      <div>Degree: <strong>{mintResult.degree}</strong></div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 font-sans text-xs border border-dashed border-slate-800 rounded-2xl">
                    Submit the form to generate an immutable soulbound token receipt.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: LIVE BLOCK EXPLORER
           ========================================================================= */}
        {activeTab === 'explorer' && (
          <div className="space-y-6">
            <div className="space-y-3 font-mono text-xs">
              {blocks.map((b) => (
                <div key={b.block_number} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-cyan-400 font-bold text-sm">Block #{b.block_number}</span>
                      <span className="text-slate-500 ml-2">({b.timestamp})</span>
                      <div className="text-slate-400 text-[11px] mt-0.5 truncate">Validator: {b.validator}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 rounded font-bold text-[10px]">
                      {b.transactions_count} Transactions
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-[11px]">
                    <div className="truncate"><span className="text-slate-500">Block Hash: </span><span className="text-slate-300">{b.block_hash}</span></div>
                    <div className="truncate"><span className="text-slate-500">Merkle Root: </span><span className="text-emerald-400">{b.merkle_root}</span></div>
                    <div className="text-cyan-300 pt-1">Payload: {b.sector_summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: W3C DECENTRALIZED IDENTITY (DID)
           ========================================================================= */}
        {activeTab === 'did' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">W3C SELF-SOVEREIGN IDENTITY (SSI) VAULT</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">{didData[0].did}</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div>Holder: <strong className="text-white font-sans">{didData[0].owner}</strong></div>
              <div>Ed25519 Public Key: <span className="text-cyan-300">{didData[0].public_key_ed25519}</span></div>
            </div>

            <div className="space-y-2">
              <span className="text-cyan-400 font-bold text-[10px] uppercase block">VERIFIABLE CREDENTIAL CLAIMS:</span>
              {didData[0].credentials_held.map((c: string, idx: number) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-white font-sans">
                  <span>{c}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-mono text-[10px] font-bold">ZK-VERIFIED</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: NATIONAL BLOCKCHAIN STRATEGY
           ========================================================================= */}
        {activeTab === 'strategy' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase">MEITY NATIONAL BLOCKCHAIN STRATEGY</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">National Ledger Infrastructure Metrics</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">PEAK THROUGHPUT</span><span className="text-2xl font-black text-cyan-400 mt-1 block">2,450 TPS</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">ENERGY REDUCTION</span><span className="text-2xl font-black text-emerald-400 mt-1 block">-99.9%</span></div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950"><span className="text-slate-500 block text-[9px]">CONSORTIUM NODES</span><span className="text-2xl font-black text-purple-400 mt-1 block">48 Live</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
