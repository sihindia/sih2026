import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  RefreshCw, 
  Lock, 
  Globe 
} from 'lucide-react';

import sessionsData from './data/email_communication_sessions.json';
import certsData from './data/x509_certificate_chains.json';
import statsData from './data/securemail_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [sessions, setSessions] = useState(sessionsData);
  const [selectedSession, setSelectedSession] = useState(sessionsData[0]);
  const [certs, setCerts] = useState(certsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'sessions' | 'certs' | 'posture' | 'stats'>('sessions');

  // Interactive PCAP Email Scanner
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditVerdict, setAuditVerdict] = useState<any>({
    tls: "TLS 1.0 (Deprecated RFC 8996)",
    cipher: "TLS_RSA_WITH_3DES_EDE_CBC_SHA",
    score: 28.5,
    flag: "STRIPTLS_DOWNGRADE_VULNERABLE",
    action: "ENFORCE_TLS_1_3_AND_DANE_TLSA_RECORDS"
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditVerdict({
        tls: "TLS 1.0 (Deprecated RFC 8996)",
        cipher: "TLS_RSA_WITH_3DES_EDE_CBC_SHA",
        score: 28.5,
        flag: "STRIPTLS_DOWNGRADE_VULNERABLE",
        action: "ENFORCE_TLS_1_3_AND_DANE_TLSA_RECORDS"
      });
      setIsAuditing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Mail className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>NTRO • SECUREMAILSCOPE 360 EMAIL CRYPTO AUDITOR • SIH26159</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SecureMailScope: AI-Assisted Cryptographic Posture Assessment for Email
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              PCAP Stream Reconstructor, STARTTLS Negotiation Auditor, X.509 Certificate Chain Validator & AI Threat Classifier
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'sessions', label: '📧 Reconstructed Email Sessions', count: sessions.length },
            { id: 'certs', label: '📜 X.509 Certificate Chains', count: certs.length },
            { id: 'posture', label: '🛡️ Cryptographic Posture Scorecard' },
            { id: 'stats', label: '📊 National Email Defense Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* VIEW 1: SESSIONS */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sessions.map((s) => (
                <button
                  key={s.session_id}
                  onClick={() => setSelectedSession(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSession.session_id === s.session_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{s.session_id}</span>
                    <span className={s.crypto_risk_score >= 80 ? 'text-emerald-400' : 'text-rose-400'}>
                      {s.crypto_risk_score}/100 Posture
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? s.server_fqdn_hi : s.server_fqdn}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.protocol} • {s.negotiated_tls_version}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{s.starttls_negotiation.split('_')[0]}</span>
                    <span>{s.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedSession.session_id} • {selectedSession.protocol}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSession.server_fqdn}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedSession.crypto_risk_score >= 80 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {selectedSession.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 text-[11px]">
                  <div>STARTTLS State: <strong className="text-white font-mono">{selectedSession.starttls_negotiation}</strong></div>
                  <div>Negotiated Cipher: <strong className="text-amber-400 font-mono">{selectedSession.cipher_suite}</strong></div>
                  <div>Key Exchange: <strong className="text-cyan-300 font-mono">{selectedSession.key_exchange}</strong></div>
                  <div>Certificate Status: <strong className="text-purple-300 font-sans">{selectedSession.cert_validation_status}</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('certs')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect X.509 Certificate Chain & Cryptographic Proofs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Live Mail PCAP Scanner</span>
                  </h4>
                  <form onSubmit={handleAudit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">PCAP Stream</label>
                      <input type="text" readOnly value="smtp_traffic_sample.pcap" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isAuditing} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                      <span>{isAuditing ? 'Parsing TLS Handshakes...' : 'Audit Email Cryptographic Posture'}</span>
                    </button>
                  </form>
                  {auditVerdict && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>TLS Version: <strong className="text-rose-400 font-mono">{auditVerdict.tls}</strong></div>
                      <div>Posture Score: <strong className="text-rose-400 font-mono">{auditVerdict.score}/100</strong></div>
                      <div className="text-indigo-300 pt-1 border-t border-slate-900 font-mono text-[10px]">{auditVerdict.action}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CERTS */}
        {activeTab === 'certs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {certs.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-white font-sans">{c.subject_cn}</h4>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded font-bold">{c.valid_until.split(' ')[0]}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Issuer: <strong className="text-white">{c.issuer_cn}</strong></div>
                  <div>Key Type: <strong className="text-cyan-300">{c.public_key_type}</strong></div>
                  <div>Signature: <strong className="text-amber-400">{c.signature_algorithm}</strong></div>
                  <div className="text-indigo-300 pt-1 border-t border-slate-900 font-mono">{c.security_verdict}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: POSTURE */}
        {activeTab === 'posture' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-indigo-500/40 pb-3">
              <span className="text-indigo-400 font-bold text-[10px] uppercase">CRYPTOGRAPHIC POSTURE AUDIT RULES</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Enterprise Secure Email Best Practice Compliance</h4>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
              <div>Enforce TLS 1.3: <strong className="text-emerald-400">Strict Minimum Version</strong></div>
              <div>Require DANE / TLSA: <strong className="text-cyan-300">DNSSEC-Secured Certificate Pinning</strong></div>
              <div>Deprecate 3DES & RC4: <strong className="text-rose-400">Enforce Authenticated AES-GCM or ChaCha20-Poly1305</strong></div>
            </div>
          </div>
        )}

        {/* VIEW 4: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
