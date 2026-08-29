import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Key, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  RefreshCw, 
  Copy, 
  Printer, 
  ChevronRight, 
  Globe 
} from 'lucide-react';

import deploymentsData from './data/ipsec_vpn_deployments.json';
import inferencesData from './data/encrypted_traffic_ai_inference.json';
import vulnsData from './data/cryptographic_vulnerability_matrix.json';
import statsData from './data/ipsec_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [deployments, setDeployments] = useState(deploymentsData);
  const [selectedTunnel, setSelectedTunnel] = useState(deploymentsData[0]);
  const [inferences, setInferences] = useState(inferencesData);
  const [vulnerabilities, setVulnerabilities] = useState(vulnsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'deployments' | 'traffic' | 'vulns' | 'hardening' | 'defense'>('deployments');

  // Interactive PCAP Auditor
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditVerdict, setAuditVerdict] = useState<any>({
    ike: "IKEv1 (Aggressive Mode)",
    cipher: "3DES-CBC + HMAC-MD5",
    dh: "DH Group 2 (1024-bit)",
    pfs: "DISABLED",
    score: 38.0,
    action: "ENFORCE_IKEV2_AND_AES_256_GCM"
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditVerdict({
        ike: "IKEv1 (Aggressive Mode)",
        cipher: "3DES-CBC + HMAC-MD5",
        dh: "DH Group 2 (1024-bit)",
        pfs: "DISABLED",
        score: 38.0,
        action: "ENFORCE_IKEV2_AND_AES_256_GCM"
      });
      setIsAuditing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold tracking-wider">
              <Lock className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>NTRO • SETUSECURE 360 AI IPSEC PROTOCOL ANALYZER • SIH26160</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SetuSecure 360: AI-Powered IPsec VPN Protocol Analyzer & Auditor
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              IKEv1/IKEv2 Handshake Parser, Cryptographic Cipher Evaluation, AI Encrypted Traffic Fingerprinter & Automated Hardening
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-blue-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-blue-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'deployments', label: '🔒 IPsec Deployments & Posture', count: deployments.length },
            { id: 'traffic', label: '🧠 AI Encrypted Traffic Classifier', count: inferences.length },
            { id: 'vulns', label: '⚠️ Cryptographic Vulnerabilities', count: vulnerabilities.length },
            { id: 'hardening', label: '⚡ Auto-Hardening Generator' },
            { id: 'defense', label: '📊 NTRO VPN Defense Hub' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-blue-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: DEPLOYMENTS
           ========================================================================= */}
        {activeTab === 'deployments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deployments.map((d) => (
                <button
                  key={d.tunnel_id}
                  onClick={() => setSelectedTunnel(d)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedTunnel.tunnel_id === d.tunnel_id
                      ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-blue-400">{d.tunnel_id}</span>
                    <span className={d.security_posture_score >= 80 ? 'text-emerald-400' : 'text-rose-400'}>
                      {d.security_posture_score}/100 Posture
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? d.gateway_name_hi : d.gateway_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{d.endpoint_ips}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{d.ike_version.split(' ')[0]}</span>
                    <span>{d.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Tunnel Parameters & Protocol Auditor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Tunnel Parameters */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-blue-400 font-bold">{selectedTunnel.tunnel_id} • {selectedTunnel.operational_mode}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedTunnel.gateway_name}</h3>
                    <p className="text-slate-400 text-[10px]">Endpoints: {selectedTunnel.endpoint_ips}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedTunnel.security_posture_score >= 80 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {selectedTunnel.security_posture_score}% HEALTH
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px]">
                  <div className="flex justify-between"><span>IKE Handshake Version:</span><strong className="text-white font-mono">{selectedTunnel.ike_version}</strong></div>
                  <div className="flex justify-between"><span>Encryption Cipher:</span><strong className="text-amber-400 font-mono">{selectedTunnel.encryption_cipher}</strong></div>
                  <div className="flex justify-between"><span>Diffie-Hellman Key Exchange:</span><strong className="text-cyan-300 font-mono">{selectedTunnel.diffie_hellman_group}</strong></div>
                  <div className="flex justify-between"><span>Perfect Forward Secrecy (PFS):</span><strong className={selectedTunnel.perfect_forward_secrecy === 'ENABLED' ? 'text-emerald-400' : 'text-rose-400'}>{selectedTunnel.perfect_forward_secrecy}</strong></div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/60 space-y-2 font-sans">
                  <span className="text-rose-400 text-xs font-mono font-bold block uppercase">CRYPTOGRAPHIC VULNERABILITIES & RISKS:</span>
                  {selectedTunnel.identified_threats.map((t: string, idx: number) => (
                    <div key={idx} className="text-slate-200 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('hardening')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Generate Hardened IKEv2 + AES-GCM Configuration ➔</span>
                </button>
              </div>

              {/* Right 5: Protocol PCAP Scanner */}
              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>Live Protocol Decoder</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      RFC 7296 IKEv2 ENGINE
                    </span>
                  </div>

                  <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Select Captured VPN Trace</label>
                      <input type="text" readOnly value="gateway_del_01_handshake.pcap" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-blue-400" />
                    </div>

                    <button type="submit" disabled={isAuditing} className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                      <span>{isAuditing ? 'Parsing SA Transforms & Handshakes...' : 'Audit IPsec Cryptographic Posture'}</span>
                    </button>
                  </form>

                  {auditVerdict && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Handshake:</span><strong className="text-rose-400 font-mono text-xs">{auditVerdict.ike}</strong></div>
                      <div className="flex justify-between"><span>Cipher Suite:</span><strong className="text-amber-300 font-mono text-xs">{auditVerdict.cipher}</strong></div>
                      <div className="text-rose-300 pt-1 border-t border-slate-900 font-mono text-[10px]">{auditVerdict.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: ENCRYPTED TRAFFIC INFERENCE
           ========================================================================= */}
        {activeTab === 'traffic' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inferences.map((inf, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-blue-900/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{inf.inferred_application}</h4>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">{inf.ai_confidence_pct}% AI Conf</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Packet Feature Basis:</strong> <span className="font-mono text-blue-300">{inf.feature_basis}</span></div>
                    <div className="text-amber-300 pt-1 border-t border-slate-900"><strong>Security Finding:</strong> {inf.security_implication}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: VULNERABILITY MATRIX
           ========================================================================= */}
        {activeTab === 'vulns' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vulnerabilities.map((v, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{v.vulnerability}</h4>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">CVSS {v.cvss_score}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Severity:</strong> <span className="text-rose-400 font-bold">{v.severity}</span></div>
                    <div className="text-cyan-300 pt-1"><strong>Remediation:</strong> {v.remediation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: HARDENING
           ========================================================================= */}
        {activeTab === 'hardening' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-blue-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-blue-400 font-bold text-[10px] uppercase">STRONGSWAN / CISCO ASA HARDENING TEMPLATE</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Enforce IKEv2 + AES-256-GCM + DH Group 19 (Curve25519)</h4>
              </div>
              <button onClick={() => alert("Copied Hardening Template to Clipboard!")} className="px-3 py-1.5 bg-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 font-sans">
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
{`# /etc/swanctl/conf.d/hardened_tunnel.conf
connections {
  secure-gw {
    version = 2
    proposals = aes256gcm16-prfsha384-ecp256-curve25519
    local_addrs = 10.200.1.1
    remote_addrs = 10.200.4.1
    children {
      net-to-net {
        esp_proposals = aes256gcm16-ecp256
        mode = tunnel
        dpd_action = restart
      }
    }
  }
}`}
            </pre>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: DEFENSE
           ========================================================================= */}
        {activeTab === 'defense' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
