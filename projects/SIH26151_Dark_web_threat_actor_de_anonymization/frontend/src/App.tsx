import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Globe, 
  FileText, 
  RefreshCw, 
  GitMerge, 
  Layers, 
  Terminal, 
  ChevronRight, 
  Printer, 
  Share2, 
  Radio 
} from 'lucide-react';

import actorsData from './data/darkweb_threat_actors.json';
import leaksData from './data/tor_infrastructure_leaks.json';
import styloData from './data/stylometric_logs.json';
import statsData from './data/ntro_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'pa'>('hi');
  const [actors, setActors] = useState(actorsData);
  const [selectedActor, setSelectedActor] = useState(actorsData[0]);
  const [leaks, setLeaks] = useState(leaksData);
  const [styloLogs, setStyloLogs] = useState(styloData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'actors' | 'leaks' | 'graph' | 'stylometrics' | 'command'>('actors');

  // Interactive Onion De-Anonymization State
  const [onionUrl, setOnionUrl] = useState("hydra77netphantom2948.onion");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>({
    clearnetIp: "103.145.72.18",
    asn: "Spectra Broadband / ASN 45820 (Noida, India)",
    vuln: "Apache mod_status leak + Let's Encrypt SSL Serial 04:9A:88:12:F4:3B:10:9C",
    domain: "api-gateway.noidatechcorp.in",
    confidence: 98.4,
    action: "ISSUE_SECTION_91_CRPC_TO_ISP_FOR_SUBSCRIBER_LOGS"
  });

  // Stylometric State
  const [postText, setPostText] = useState("Offering fresh dump of 5M KYC records with instant escrow. No lowballs, contact on TOX with PGP signed proof.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [styloResult, setStyloResult] = useState<any>({
    match: "Vikrant Malhotra (Alias: NetPhantom)",
    similarity: 0.968,
    verdict: "DEFINITIVE_AUTHOR_MATCH"
  });

  const handleScanOnion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        clearnetIp: "103.145.72.18",
        asn: "Spectra Broadband / ASN 45820 (Noida, India)",
        vuln: "Apache mod_status leak + Let's Encrypt SSL Serial 04:9A:88:12:F4:3B:10:9C",
        domain: "api-gateway.noidatechcorp.in",
        confidence: 98.4,
        action: "ISSUE_SECTION_91_CRPC_TO_ISP_FOR_SUBSCRIBER_LOGS"
      });
      setIsScanning(false);
    }, 500);
  };

  const handleAnalyzeText = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setStyloResult({
        match: "Vikrant Malhotra (Alias: NetPhantom)",
        similarity: 0.968,
        verdict: "DEFINITIVE_AUTHOR_MATCH"
      });
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>NTRO • DARKNETRA 360 DARK WEB DE-ANONYMIZATION ENGINE • SIH26151</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DarkNetra 360: Dark Web Threat Actor De-Anonymization Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Tor Hidden Service Misconfiguration Scanner, Clearnet IP Fingerprinting, Multi-Marketplace Entity Graph & AI Stylometrics
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('pa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'pa' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>ਪੰਜਾਬੀ</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'actors', label: '🕵️ Unmasked Threat Dossiers', count: actors.length },
            { id: 'leaks', label: '🧅 Tor Infrastructure Leaks', count: leaks.length },
            { id: 'graph', label: '🕸️ Multi-Marketplace Entity Graph' },
            { id: 'stylometrics', label: '✍️ AI Stylometric Linguistic Fingerprinter' },
            { id: 'command', label: '📊 NTRO Cyber Threat Command' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-rose-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: UNMASKED THREAT DOSSIERS
           ========================================================================= */}
        {activeTab === 'actors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {actors.map((a) => (
                <button
                  key={a.actor_id}
                  onClick={() => setSelectedActor(a)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedActor.actor_id === a.actor_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{a.actor_id}</span>
                    <span className="text-emerald-400">{a.attribution_confidence_pct}% Conf</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {a.darkweb_alias}
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono">Real: {a.real_world_identity.split('(')[0]}</div>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{a.onion_marketplaces[0]}</span>
                    <span>{a.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Dossier View & Live De-Anonymizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Actor Intelligence Dossier */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedActor.actor_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedActor.darkweb_alias}</h3>
                    <p className="text-xs text-amber-300 font-mono">Real-World Entity: <strong>{selectedActor.real_world_identity}</strong></p>
                  </div>
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold font-mono">
                    {selectedActor.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between"><span>Attributed Clearnet IP:</span><strong className="text-rose-400">{selectedActor.attributed_clearnet_ip}</strong></div>
                  <div className="flex justify-between"><span>PGP Key Fingerprint:</span><strong className="text-cyan-300">{selectedActor.pgp_key_fingerprint}</strong></div>
                  <div>Primary Threat: <span className="text-white font-sans">{lang === 'hi' ? selectedActor.primary_threat_category_hi : selectedActor.primary_threat_category}</span></div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 break-all space-y-1">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">LINKED CRYPTOCURRENCY WALLETS (BTC / XMR)</span>
                  {selectedActor.linked_cryptowallets.map((w: string, idx: number) => (
                    <div key={idx} className="text-amber-400 font-bold">• {w}</div>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400">
                  De-Anonymization Vector: <strong>{selectedActor.deanonymization_vector}</strong>
                </div>

                <button
                  onClick={() => setActiveTab('leaks')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Tor Infrastructure Leaks & SSL Proof ➔</span>
                </button>
              </div>

              {/* Right 5: Tor Service Fingerprinting Scanner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Onion Infrastructure Fingerprinter</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      ACTIVE TOR NODE CRAWLER
                    </span>
                  </div>

                  <form onSubmit={handleScanOnion} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Target Tor Hidden Service (.onion)</label>
                      <input type="text" required value={onionUrl} onChange={(e) => setOnionUrl(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400 break-all" />
                    </div>

                    <button type="submit" disabled={isScanning} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                      <span>{isScanning ? 'Probing Tor Descriptors...' : 'De-Anonymize Hidden Service'}</span>
                    </button>
                  </form>

                  {scanResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Clearnet IP:</span><strong className="text-rose-400 font-mono text-sm">{scanResult.clearnetIp}</strong></div>
                      <div className="flex justify-between"><span>Hosting ASN:</span><strong className="text-cyan-300 font-mono">{scanResult.asn.split('/')[0]}</strong></div>
                      <div className="flex justify-between"><span>Confidence:</span><strong className="text-emerald-400 font-mono">{scanResult.confidence}%</strong></div>
                      <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono text-[10px]">{scanResult.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: TOR INFRASTRUCTURE LEAKS
           ========================================================================= */}
        {activeTab === 'leaks' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaks.map((l, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-rose-800/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white font-mono">{l.onion_url}</h4>
                      <p className="text-rose-400 text-[11px] font-bold">Clearnet IP: {l.leaked_clearnet_ip}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">Conf: {l.confidence_score}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Vulnerability:</strong> <span className="font-mono text-amber-300">{l.vulnerability_type}</span></div>
                    <div><strong>SSL Serial Match:</strong> <span className="font-mono text-cyan-300">{l.ssl_certificate_serial}</span></div>
                    <div><strong>Hosting Provider:</strong> {l.hosting_provider}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: ENTITY RESOLUTION GRAPH
           ========================================================================= */}
        {activeTab === 'graph' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">CROSS-FORUM IDENTITY CORRELATION GRAPH</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Automated Multi-Marketplace Threat Actor Clustering</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div>Primary Cluster ID: <strong className="text-rose-400">NTRO-ACTOR-2026-091</strong></div>
              <div>BreachForums Handle: <strong className="text-white">NetPhantom</strong></div>
              <div>Dread / Genesis Market: <strong className="text-cyan-300">GhostBroker_IN</strong></div>
              <div>PGP Fingerprint Anchor: <strong className="text-emerald-400 font-mono">4096R/0x891AF3902849182C (100% Signature Match)</strong></div>
              <div className="text-amber-300 pt-1 border-t border-slate-900">
                Resolution Verdict: Rebranded personas linked to single physical operator in Noida, UP.
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: AI STYLOMETRIC LINGUISTIC FINGERPRINTER
           ========================================================================= */}
        {activeTab === 'stylometrics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-400" />
                <span>AI Stylometric Text Matcher</span>
              </h4>
              <form onSubmit={handleAnalyzeText} className="space-y-3 font-sans text-xs">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Darknet Forum Post Text Sample</label>
                  <textarea rows={4} required value={postText} onChange={(e) => setPostText(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-slate-200" />
                </div>
                <button type="submit" disabled={isAnalyzing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs font-sans shadow-md">
                  {isAnalyzing ? 'Extracting Syntactic N-Grams...' : 'Execute Stylometric Author Attribution'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-sm text-white font-sans">Attribution Result</h4>
              {styloResult && (
                <div className="p-3 bg-slate-950 rounded-xl space-y-2 text-slate-300 font-sans text-xs">
                  <div>Top Matched Known Persona: <strong className="text-rose-400 font-mono">{styloResult.match}</strong></div>
                  <div>Stylometric Cosine Score: <strong className="text-emerald-400 font-mono">{(styloResult.similarity * 100).toFixed(1)}%</strong></div>
                  <div className="text-amber-300 pt-1 border-t border-slate-900 font-mono text-[11px]">{styloResult.verdict}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{s.value}</span>
                <span className="text-emerald-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
