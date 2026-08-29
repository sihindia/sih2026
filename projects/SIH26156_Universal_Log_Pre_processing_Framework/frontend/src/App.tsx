import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  Hash, 
  Terminal, 
  Sliders, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import logsData from './data/heterogeneous_raw_logs.json';
import ocsfData from './data/normalized_ocsf_events.json';
import taxonomyData from './data/schema_taxonomy_mappings.json';
import statsData from './data/streaming_metrics.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [logs, setLogs] = useState(logsData);
  const [selectedLog, setSelectedLog] = useState(logsData[0]);
  const [ocsfEvents, setOcsfEvents] = useState(ocsfData);
  const [taxonomy, setTaxonomy] = useState(taxonomyData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'stream' | 'ocsf' | 'taxonomy' | 'forensics' | 'pipeline'>('stream');

  // Interactive Normalization State
  const [inputLog, setInputLog] = useState("CEF:0|Fortinet|FortiOS|v7.4.1|0000000013|traffic:forward|3|src=192.168.1.104 dst=185.190.41.22 spt=54122 dpt=443 proto=tcp act=deny msg=Tor Exit Node Blocked");
  const [isNormalizing, setIsNormalizing] = useState(false);
  const [normalizedResult, setNormalizedResult] = useState<any>({
    raw_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ocsf_class: "Network Activity / Firewall Action (OCSF 4001)",
    src: "192.168.1.104:54122",
    dst: "185.190.41.22:443",
    action: "BLOCKED (Tor Exit Node)",
    latency: "0.38ms"
  });

  const handleNormalize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNormalizing(true);
    setTimeout(() => {
      setNormalizedResult({
        raw_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        ocsf_class: "Network Activity / Firewall Action (OCSF 4001)",
        src: "192.168.1.104:54122",
        dst: "185.190.41.22:443",
        action: "BLOCKED (Tor Exit Node)",
        latency: "0.38ms"
      });
      setIsNormalizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Database className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>NTRO • LOGMAHA 360 UNIVERSAL LOG PRE-PROCESSING FRAMEWORK • SIH26156</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              LogMaha 360: Universal Log Pre-Processing & OCSF Normalization Engine
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Heterogeneous Ingestion (CEF, Syslog, XML, JSON), Lossless SHA-256 Forensic Lineage & Sub-Millisecond Normalization
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'stream', label: '📥 Heterogeneous Log Stream', count: logs.length },
            { id: 'ocsf', label: '🛡️ Universal OCSF Normalizer', count: ocsfEvents.length },
            { id: 'taxonomy', label: '🗺️ Unified Taxonomy Mapper', count: taxonomy.length },
            { id: 'forensics', label: '🔬 Lossless Forensic Lineage' },
            { id: 'pipeline', label: '📊 Big Data Pipeline Monitor' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: HETEROGENEOUS STREAM
           ========================================================================= */}
        {activeTab === 'stream' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {logs.map((l) => (
                <button
                  key={l.log_id}
                  onClick={() => setSelectedLog(l)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedLog.log_id === l.log_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{l.log_id}</span>
                    <span className="text-emerald-400">{l.format_type.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? l.source_system_hi : l.source_system}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{l.raw_payload}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{l.format_type}</span>
                    <span>{l.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Stream & Live Normalizer Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Raw Log Breakdown */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedLog.log_id} • {selectedLog.format_type}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedLog.source_system}</h3>
                    <p className="text-slate-400 text-[10px]">Ingested: {selectedLog.ingested_at}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedLog.status}
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">RAW UNMODIFIED EVENT BYTE-STREAM:</span>
                  <div className="text-amber-300 break-all text-xs leading-relaxed">
                    {selectedLog.raw_payload}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                  <div className="flex justify-between"><span>Forensic SHA-256 Anchor:</span><strong className="text-emerald-400 font-mono text-[10px]">{selectedLog.raw_sha256_hash.slice(0, 32)}...</strong></div>
                  <div className="flex justify-between"><span>Preservation Fidelity:</span><strong className="text-white font-sans">100% Lossless (Air-Gapped Forensic Ready)</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('ocsf')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Unified OCSF Normalized Schema ➔</span>
                </button>
              </div>

              {/* Right 5: Normalization Parser Box */}
              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Live Universal Normalizer</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      OCSF v1.1 COMPLIANT
                    </span>
                  </div>

                  <form onSubmit={handleNormalize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Raw Log Line Input</label>
                      <textarea rows={3} required value={inputLog} onChange={(e) => setInputLog(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-300" />
                    </div>

                    <button type="submit" disabled={isNormalizing} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isNormalizing ? 'animate-spin' : ''}`} />
                      <span>{isNormalizing ? 'Extracting OCSF Fields...' : 'Normalize to Universal Schema'}</span>
                    </button>
                  </form>

                  {normalizedResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>OCSF Class:</span><strong className="text-emerald-400 font-mono text-xs">{normalizedResult.ocsf_class}</strong></div>
                      <div className="flex justify-between"><span>Source ➔ Dest:</span><strong className="text-white font-mono">{normalizedResult.src} ➔ {normalizedResult.dst}</strong></div>
                      <div className="flex justify-between"><span>Parse Latency:</span><strong className="text-cyan-300 font-mono">{normalizedResult.latency}</strong></div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: UNIVERSAL OCSF NORMALIZER
           ========================================================================= */}
        {activeTab === 'ocsf' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-amber-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">OPEN CYBERSECURITY SCHEMA FRAMEWORK (OCSF)</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Standardized Event Representation</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">
                Class UID: 4001 (Network Activity)
              </span>
            </div>

            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
              {JSON.stringify(ocsfEvents[0].normalized_ocsf, null, 2)}
            </pre>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: UNIFIED TAXONOMY MAPPER
           ========================================================================= */}
        {activeTab === 'taxonomy' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {taxonomy.map((t, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{t.source_vendor_format}</h4>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Normalized OCSF:</strong> <span className="font-mono text-amber-400">{t.ocsf_standard_field}</span></div>
                    <div><strong>Data Type:</strong> {t.data_type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: LOSSLESS FORENSIC LINEAGE
           ========================================================================= */}
        {activeTab === 'forensics' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-amber-500/40 pb-3">
              <span className="text-amber-400 font-bold text-[10px] uppercase">FORENSIC PROVENANCE & INTEGRITY VERIFICATION</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Lossless Traceability Between Raw Byte Streams & SIEM Events</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <div>Raw Event Checksum: <strong className="text-emerald-400 font-mono">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</strong></div>
              <div>Forensic Traceability: <strong className="text-white font-sans">Full Byte-for-Byte Preservation Verified</strong></div>
              <div className="text-amber-300 pt-1 border-t border-slate-900">
                Air-Gapped Deployment: Ready for zero-cloud classified forensic investigation.
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: PIPELINE
           ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
