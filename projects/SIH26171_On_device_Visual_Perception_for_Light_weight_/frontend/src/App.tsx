import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Eye, 
  Lock, 
  RefreshCw, 
  Terminal, 
  Cpu, 
  Sliders, 
  Globe 
} from 'lucide-react';

import tasksData from './data/browser_agent_tasks.json';
import rulesData from './data/pii_redaction_rules.json';
import actionsData from './data/server_vlm_action_logs.json';
import statsData from './data/priv_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTask, setSelectedTask] = useState(tasksData[0]);
  const [rules, setRules] = useState(rulesData);
  const [actions, setActions] = useState(actionsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'tasks' | 'webgpu' | 'redaction' | 'actions' | 'stats'>('tasks');

  // Interactive Browser Agent Execution Simulator
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentResult, setAgentResult] = useState<any>({
    redactedCount: 3,
    latency: "16.4 ms (WebGPU)",
    leakage: "0 Bytes (Zero Raw Pixels)",
    action: "click(selector='#btn-submit-grant-auth')"
  });

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setAgentResult({
        redactedCount: 3,
        latency: "16.4 ms (WebGPU)",
        leakage: "0 Bytes (Zero Raw Pixels)",
        action: "click(selector='#btn-submit-grant-auth')"
      });
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>ISRO • PRIVACYLENS 360 ON-DEVICE BROWSER VISION AGENT • SIH26171</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              PrivacyLens AI: On-Device Visual Perception for Browser Agents
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Client-Side WebGPU Vision Transformer (ViT), Zero-Leakage PII Redaction & Privacy-Preserving Server VLM Action Planning
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'tasks', label: '🛡️ PrivacyLens Browser Agent Tasks', count: tasks.length },
            { id: 'webgpu', label: '👁️ WebGPU On-Device ViT' },
            { id: 'redaction', label: '🔒 Client-Side PII Redaction Rules', count: rules.length },
            { id: 'actions', label: '⚡ Server VLM Action Plans', count: actions.length },
            { id: 'stats', label: '📊 ISRO Privacy & Latency Benchmarks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
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
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{t.task_id}</span>
                    <span className="text-emerald-400">{t.client_webgpu_latency_ms} ms (WebGPU)</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? t.portal_name_hi : t.portal_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono line-clamp-1">{t.user_intent}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{t.pii_redaction_count} PII Elements Masked</span>
                    <span className="text-emerald-400">{t.raw_pixel_leakage_bytes} Bytes Raw Leaked</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedTask.task_id} • {selectedTask.client_webgpu_latency_ms} ms</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTask.portal_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedTask.execution_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">ON-DEVICE REDACTED SENSITIVE / PII ELEMENTS:</span>
                  <ul className="space-y-1 text-slate-300 font-sans text-xs">
                    {selectedTask.raw_screen_pii_elements.map((elem, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{elem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px] font-sans">
                  <div><strong>Server Transmission:</strong> <span className="text-teal-300 font-mono">{selectedTask.transmitted_to_server}</span></div>
                  <div><strong>Server VLM Action:</strong> <span className="text-amber-400 font-mono">{selectedTask.server_vlm_action}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('webgpu')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect WebGPU On-Device Vision Transformer Pipeline ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>PrivacyLens Agent Simulator</span>
                  </h4>
                  <form onSubmit={handleProcess} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Workflow Task</label>
                      <input type="text" readOnly value={selectedTask.task_id} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>{isProcessing ? 'Redacting PII & Planning Actions...' : 'Execute Privacy-Safe Agent Step'}</span>
                    </button>
                  </form>
                  {agentResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Latency: <strong className="text-teal-400 font-mono text-xs">{agentResult.latency}</strong></div>
                      <div>Server Action: <strong className="text-amber-300 font-mono text-xs">{agentResult.action}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WEBGPU */}
        {activeTab === 'webgpu' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-teal-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-teal-400 font-bold text-[10px] uppercase">ON-DEVICE WEBGPU VISION TRANSFORMER</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Transformers.js + ONNX Runtime Web Acceleration</h4>
              </div>
              <span className="px-3 py-1 bg-teal-950 text-teal-300 rounded-xl font-bold font-mono">16.4 ms Latency</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
              <div>Processes screen state directly inside the user's browser via hardware-accelerated <strong>WebGPU compute shaders</strong>.</div>
              <div className="text-teal-400 font-bold pt-1 border-t border-slate-900">
                Zero raw screenshots or biometric image bytes ever leave the client device.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: REDACTION */}
        {activeTab === 'redaction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold text-[10px]">{r.detection_method}</span>
                <h4 className="font-bold text-sm text-white font-sans">{r.pii_type}</h4>
                <p className="text-slate-300 text-xs font-sans">Action: {r.redaction_action}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ACTIONS */}
        {activeTab === 'actions' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {actions.map((a, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 font-bold">Step #{a.step}</span>
                  <h4 className="font-bold text-sm text-white font-sans">{a.action}</h4>
                  <div className="text-slate-400 font-mono text-[10px]">Params: {a.params}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
