import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Terminal, 
  Cpu, 
  RefreshCw, 
  ShieldAlert, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import scriptsData from './data/jocky_forensic_scripts.json';
import polyData from './data/polymorphic_engine_profiles.json';
import evasionData from './data/edr_evasion_techniques.json';
import statsData from './data/jockylang_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [scripts, setScripts] = useState(scriptsData);
  const [selectedScript, setSelectedScript] = useState(scriptsData[0]);
  const [polymorphism, setPolymorphism] = useState(polyData);
  const [evasion, setEvasion] = useState(evasionData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scripts' | 'poly' | 'evasion' | 'artifacts' | 'stats'>('scripts');

  // Interactive JOCKY Polymorphic Compilation Simulator
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileResult, setCompileResult] = useState<any>({
    hash: "f9410b37c28841aef912048ba819234b (Ephemeral)",
    cfg: "Control-Flow Graph Flattened (14 Randomized States)",
    encryption: "In-Memory ChaCha20 Ephemeral String Encryption",
    edrStatus: "100% EDR Bypass (0 Detection Alerts Raised)",
    yield: "18 Injected Shellcode Blocks + In-Memory C2 Beacons Extracted"
  });

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);
    setTimeout(() => {
      setCompileResult({
        hash: "f9410b37c28841aef912048ba819234b (Ephemeral)",
        cfg: "Control-Flow Graph Flattened (14 Randomized States)",
        encryption: "In-Memory ChaCha20 Ephemeral String Encryption",
        edrStatus: "100% EDR Bypass (0 Detection Alerts Raised)",
        yield: "18 Injected Shellcode Blocks + In-Memory C2 Beacons Extracted"
      });
      setIsCompiling(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Code2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>NTRO • JOCKYLANG 360 NEXT-GEN EDR-EVASIVE FORENSIC FRAMEWORK • SIH26148</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NTRO JockyLang: Next-Gen EDR-Evasive Forensic Language Framework & Compiler
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Custom LLVM Frontend Language, Automated Polymorphic CI/CD Delivery & In-Memory Direct Syscalls
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scripts', label: '📜 JOCKY Forensic Scripts', count: scripts.length },
            { id: 'poly', label: '🧬 Polymorphic CI/CD Compiler', count: polymorphism.length },
            { id: 'evasion', label: '🛡️ In-Memory & BYOVD Evasion', count: evasion.length },
            { id: 'artifacts', label: '🔍 Extracted Memory Artifacts' },
            { id: 'stats', label: '📊 NTRO JockyLang Telemetry' }
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
            VIEW 1: SCRIPTS
           ========================================================================= */}
        {activeTab === 'scripts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scripts.map((s) => (
                <button
                  key={s.script_id}
                  onClick={() => setSelectedScript(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedScript.script_id === s.script_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{s.script_id}</span>
                    <span className="text-cyan-400">100% EDR Evasion</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight font-mono">
                    {s.script_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.target_platform}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Vector: {s.execution_vector.split(' ')[0]}</span>
                    <span className="text-emerald-400">Latency: {s.runtime_ms} ms</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedScript.script_id} • {selectedScript.target_platform}</span>
                    <h3 className="font-bold text-base text-white font-mono mt-0.5">{selectedScript.script_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedScript.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">JOCKY SOURCE CODE & IN-MEMORY VECTOR:</span>
                  <div className="text-cyan-300 font-mono text-xs font-bold bg-slate-900 p-2.5 rounded-xl border border-slate-800">{selectedScript.code_snippet}</div>
                  <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Execution Vector: <strong>{selectedScript.execution_vector}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">POLYMORPHIC HASH</span><span className="text-emerald-400 font-bold font-mono">{selectedScript.polymorphic_build_hash.slice(0, 16)}...</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EDR EVASION RATE</span><span className="text-emerald-400 font-bold">100% (0 Detection Alerts)</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('poly')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Trigger Continuous Polymorphic LLVM Rebuild ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>JOCKY Runtime Compiler</span>
                  </h4>
                  <form onSubmit={handleCompile} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Source Script & Target Architecture</label>
                      <input type="text" readOnly value={`${selectedScript.script_name} (${selectedScript.target_platform})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isCompiling} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isCompiling ? 'animate-spin' : ''}`} />
                      <span>{isCompiling ? 'Flattening CFG & Mutating Hash...' : 'Compile & Execute Polymorphic Script'}</span>
                    </button>
                  </form>
                  {compileResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>EDR Status: <strong className="text-emerald-400 font-mono text-xs">{compileResult.edrStatus}</strong></div>
                      <div>Yield: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{compileResult.yield}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: POLY */}
        {activeTab === 'poly' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {polymorphism.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">TECHNIQUE #{idx+1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.technique}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: EVASION */}
        {activeTab === 'evasion' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">LIVING-OFF-THE-LAND & BYOVD SUBVERSION SUITE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Direct Syscalls & Process Hollowing</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Zero Disk Artifacts</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {evasion.map((e, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold block">{e.method}</span>
                    <div className="text-slate-400 text-[10px]">{e.target}</div>
                  </div>
                ))}
              </div>
              <div className="text-emerald-400 font-bold pt-2 border-t border-slate-900">
                Bypasses CrowdStrike, SentinelOne, and Microsoft Defender ATP by avoiding hooked userland DLLs and invoking raw kernel SSNs directly.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ARTIFACTS */}
        {activeTab === 'artifacts' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Terminal className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Volatile In-Memory Forensic Triage & Decrypted Evidence Yield</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Extracts injected adversary shellcodes, unhooked memory dumps, and ephemeral SOCKS5 sockets while routing forensic telemetry over CDN domain fronting meshes.
            </p>
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
