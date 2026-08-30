import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  FileCode, 
  Sliders, 
  Globe 
} from 'lucide-react';

import tasksData from './data/sovereign_agentic_confidential_tasks.json';
import modelsData from './data/open_weight_llm_registry.json';
import networkData from './data/air_gapped_network_egress_logs.json';
import statsData from './data/sovereignforge_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTask, setSelectedTask] = useState(tasksData[0]);
  const [models, setModels] = useState(modelsData);
  const [network, setNetwork] = useState(networkData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'tasks' | 'models' | 'network' | 'deliverables' | 'stats'>('tasks');

  // Interactive Agentic Task Executor Simulator
  const [isExecuting, setIsExecuting] = useState(false);
  const [execResult, setExecResult] = useState<any>({
    model: "Llama-3.2-11B-Vision + DeepSeek-R1-Distill-70B",
    tools: "local_ocr ➔ python_thermo_sandbox ➔ docx_generator",
    deliverable: "MRPL-APR-2026-081.docx (Engineering Approval Note)",
    egress: "0 BYTES EGRESS (100% On-Premise Air-Gapped)"
  });

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);
    setTimeout(() => {
      setExecResult({
        model: "Llama-3.2-11B-Vision + DeepSeek-R1-Distill-70B",
        tools: "local_ocr ➔ python_thermo_sandbox ➔ docx_generator",
        deliverable: "MRPL-APR-2026-081.docx (Engineering Approval Note)",
        egress: "0 BYTES EGRESS (100% On-Premise Air-Gapped)"
      });
      setIsExecuting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Lock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MRPL • SOVEREIGNFORGE 360 AIR-GAPPED ON-PREMISE AGENTIC AI WORKBENCH • SIH26117</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MRPL SovereignForge: Air-Gapped Sovereign Agentic AI Workbench for Industrial Operations
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              100% Zero-Egress On-Premise GPU Inference, Dynamic Multi-Model Router (DeepSeek-R1, Qwen-Coder, Llama-Vision) & Local Sandbox Tools
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
            { id: 'tasks', label: '🛡️ Confidential Tasks', count: tasks.length },
            { id: 'models', label: '🧠 Open-Weight LLMs', count: models.length },
            { id: 'network', label: '🔒 Zero-Egress Network Monitor', count: network.length },
            { id: 'deliverables', label: '📄 Deliverables (.docx/.xlsx/.py)' },
            { id: 'stats', label: '📊 SovereignForge Telemetry' }
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
            VIEW 1: TASKS
           ========================================================================= */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tasks.map((t) => (
                <button
                  key={t.task_id}
                  onClick={() => setSelectedTask(t)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTask.task_id === t.task_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{t.task_id}</span>
                    <span className="text-emerald-400">Egress: {t.network_egress_bytes} B</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {t.department}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{t.task_description.slice(0, 50)}...</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Model: {t.auto_routed_model.split(' ')[0]}</span>
                    <span className="text-emerald-400">{t.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedTask.task_id} • {selectedTask.department}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTask.task_description}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTask.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">DYNAMIC AUTO-ROUTED MODEL & LOCAL TOOLS:</span>
                  <div className="text-white font-sans text-xs font-bold">Model: {selectedTask.auto_routed_model}</div>
                  <div className="text-emerald-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Tools Called: <strong>{selectedTask.local_tools_executed.join(' ➔ ')}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Output Deliverable: <strong>{selectedTask.deliverable_file}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXTERNAL DATA EGRESS</span><span className="text-emerald-400 font-bold">0.00 Bytes (Air-Gapped)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CONFIDENCE SCORE</span><span className="text-cyan-400 font-bold">{selectedTask.confidence_score}%</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('models')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Open-Weight Model Registry & VRAM Profiles ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Agentic Task Execution Engine</span>
                  </h4>
                  <form onSubmit={handleExecute} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Confidential Industrial Prompt</label>
                      <input type="text" readOnly value={selectedTask.task_description} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isExecuting} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
                      <span>{isExecuting ? 'Running Multi-Step On-Premise Agent...' : 'Execute Air-Gapped Agentic Plan'}</span>
                    </button>
                  </form>
                  {execResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Deliverable: <strong className="text-cyan-400 font-mono text-xs">{execResult.deliverable}</strong></div>
                      <div>Sovereignty: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{execResult.egress}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MODELS */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {models.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{m.vram_required}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.model_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Task: <strong className="text-white">{m.specialization}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Throughput: {m.latency_tokens_sec} tok/s</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: NETWORK */}
        {activeTab === 'network' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {network.map((n, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{n.direction}</span>
                <h4 className="font-bold text-sm text-white font-sans">{n.interface}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Blocked External Packets: <strong className="text-rose-400">{n.packets_blocked}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Status: {n.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: DELIVERABLES */}
        {activeTab === 'deliverables' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <FileCode className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated Engineering Deliverable Studio (.docx / .xlsx / .py)</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real deliverables generated directly on premises: Section 4.2 Engineering Approval Notes, Excel thermodynamic balances, and Python refinery optimization scripts.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
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
