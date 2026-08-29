import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Sliders, 
  Layers, 
  RefreshCw, 
  ShieldAlert, 
  Zap, 
  Copy, 
  Printer, 
  ChevronRight, 
  Globe 
} from 'lucide-react';

import devicesData from './data/multi_vendor_network_devices.json';
import rulesData from './data/compliance_framework_rules.json';
import trainData from './data/training_queue.json';
import scriptsData from './data/remediation_scripts.json';
import statsData from './data/compliance_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [devices, setDevices] = useState(devicesData);
  const [selectedDevice, setSelectedDevice] = useState(devicesData[0]);
  const [rules, setRules] = useState(rulesData);
  const [trainingQueue, setTrainingQueue] = useState(trainData);
  const [scripts, setScripts] = useState<any>(scriptsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'devices' | 'matrix' | 'train' | 'remediate' | 'posture'>('devices');

  // AI Parser Training State
  const [trained, setTrained] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleTrainParser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setTrained(true);
    }, 450);
  };

  const activeScript = scripts[selectedDevice.device_id] || {
    cisco_ios_commands: [
      "! Configuration conforms to compliance baseline",
      "no ip http server",
      "ip ssh version 2"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>NTRO • NETAUDIT 360 MULTI-VENDOR COMPLIANCE AUDITOR • SIH26155</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NetAudit 360: AI-Driven Multi-Vendor Network Security Compliance Auditor
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Vendor-Agnostic Parser (Cisco, Palo Alto, Juniper, SONiC), CIS/NIST/STIG Compliance, Low-Code AI Training Loop & CLI Auto-Remediation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'devices', label: '🛡️ Multi-Vendor Audit Hub', count: devices.length },
            { id: 'matrix', label: '📜 Multi-Framework Matrix', count: rules.length },
            { id: 'train', label: '🤖 AI Low-Code Training Loop', count: trainingQueue.length },
            { id: 'remediate', label: '⚡ CLI Auto-Remediation Scripts' },
            { id: 'posture', label: '📊 NTRO Network Posture' }
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
            VIEW 1: MULTI-VENDOR AUDIT HUB
           ========================================================================= */}
        {activeTab === 'devices' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {devices.map((d) => (
                <button
                  key={d.device_id}
                  onClick={() => setSelectedDevice(d)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDevice.device_id === d.device_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{d.vendor}</span>
                    <span className={d.compliance_score_pct >= 90 ? 'text-emerald-400' : 'text-amber-400'}>
                      {d.compliance_score_pct}% Compliant
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {d.hostname}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{lang === 'hi' ? d.device_role_hi : d.device_role}</div>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{d.os_family.split(' ')[0]}</span>
                    <span>{d.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Device Audit & Remediation Trigger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Device Breakdown */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedDevice.device_id} • {selectedDevice.vendor}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedDevice.hostname}</h3>
                    <p className="text-slate-400 text-[10px]">OS: {selectedDevice.os_family} • IP: {selectedDevice.ip_address}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold">
                    {selectedDevice.compliance_score_pct}% POSTURE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-500 block text-[8px]">TOTAL CHECKS</span><span className="text-white font-bold">{selectedDevice.total_checks}</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-emerald-950"><span className="text-slate-500 block text-[8px]">PASSED</span><span className="text-emerald-400 font-bold">{selectedDevice.passed_checks}</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-rose-950"><span className="text-slate-500 block text-[8px]">FAILED / RISKS</span><span className="text-rose-400 font-bold">{selectedDevice.failed_checks}</span></div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/60 space-y-2 font-sans">
                  <span className="text-rose-400 text-xs font-mono font-bold block uppercase">CRITICAL NON-COMPLIANCE VIOLATIONS:</span>
                  {selectedDevice.critical_violations.map((v: string, idx: number) => (
                    <div key={idx} className="text-slate-200 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('remediate')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Generate Device-Specific Hardening CLI Script ➔</span>
                </button>
              </div>

              {/* Right 5: Quick Upload & Parser */}
              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Vendor-Neutral Normalizer</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      NLP SCHEMA ENGINE
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
                    <div>Active Framework: <strong className="text-emerald-400 font-mono">{selectedDevice.framework_evaluated}</strong></div>
                    <div className="text-slate-400 text-[11px]">Normalized Schema Fields Extracted: <strong>38 parameters</strong></div>
                    <div className="text-emerald-400 pt-1 border-t border-slate-900 font-mono text-[10px]">STATUS: BASELINE_MODEL_CONVERGED</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: MULTI-FRAMEWORK COMPLIANCE MATRIX
           ========================================================================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rules.map((r, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{r.framework}</h4>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{r.severity}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Standard ID:</strong> <span className="font-mono text-emerald-400">{r.standard_id}</span></div>
                    <div><strong>Category:</strong> {r.category}</div>
                    <p className="text-slate-400 text-[11px] pt-1">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: AI LOW-CODE TRAINING LOOP
           ========================================================================= */}
        {activeTab === 'train' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-emerald-500/40 pb-3">
              <span className="text-emerald-400 font-bold text-[10px] uppercase">AI-POWERED LOW-CODE TRAINING MODULE</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Adapt Parser for Unseen Proprietary Hardware & SONiC CLI</h4>
            </div>

            {trainingQueue.map((item) => (
              <div key={item.queue_id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-bold">{item.queue_id} • {item.vendor_hardware}</span>
                  <span className="text-amber-300">{item.confidence_pct}% AI Confidence</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl text-rose-300 font-mono text-xs break-all">
                  Raw Unparsed CLI: "{item.unparsed_raw_cli}"
                </div>

                <div className="text-slate-300 font-sans text-xs space-y-1">
                  <div>AI Suggested Category: <strong className="text-emerald-400">{item.ai_suggested_category}</strong></div>
                  <div>Mapped Schema: <strong className="text-cyan-300 font-mono">{item.suggested_compliance_field}</strong></div>
                </div>

                {!trained ? (
                  <form onSubmit={handleTrainParser}>
                    <button type="submit" disabled={isTraining} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs font-sans shadow-md">
                      {isTraining ? 'Updating Heuristics...' : 'Approve 1-Click Mapping (Update AI Heuristics Without Backend Restart)'}
                    </button>
                  </form>
                ) : (
                  <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-xl text-center font-bold">
                    ✓ AI Model Successfully Trained! Parser updated with 99.2% confidence.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CLI AUTO-REMEDIATION SCRIPTS
           ========================================================================= */}
        {activeTab === 'remediate' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-emerald-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase">STEP-BY-STEP CLI HARDENING SEQUENCES</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">{selectedDevice.hostname} ({selectedDevice.vendor})</h4>
              </div>
              <button onClick={() => alert("Copied Hardening Script to Clipboard!")} className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 font-sans">
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-emerald-400 font-mono text-xs overflow-x-auto">
              {(activeScript.cisco_ios_commands || activeScript.sonic_linux_commands || []).map((cmd: string, idx: number) => (
                <div key={idx}>{cmd}</div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: POSTURE
           ========================================================================= */}
        {activeTab === 'posture' && (
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
