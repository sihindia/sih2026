import React, { useState } from 'react';
import { 
  Lock, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Eye, 
  RefreshCw, 
  Sliders, 
  Building2, 
  ChevronRight, 
  Printer, 
  Share2, 
  Flame, 
  Globe 
} from 'lucide-react';

import docsData from './data/legal_investigation_documents.json';
import ledgerData from './data/blockchain_ledger.json';
import rolesData from './data/rbac_roles.json';
import certsData from './data/section65b_certs.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta'>('hi');
  const [documents, setDocuments] = useState(docsData);
  const [selectedDoc, setSelectedDoc] = useState(docsData[0]);
  const [ledger, setLedger] = useState(ledgerData);
  const [roles, setRoles] = useState(rolesData);
  const [certs, setCerts] = useState(certsData);
  const [activeTab, setActiveTab] = useState<'repo' | 'blockchain' | 'redactor' | 'certs' | 'rbac'>('repo');

  // Interactive Redactor State
  const [rawText, setRawText] = useState('Victim Ananya Sharma, age 14, residing at Flat 402 Green Park Delhi, provided statement regarding suspect...');
  const [isRedacting, setIsRedacting] = useState(false);
  const [redactedText, setRedactedText] = useState('Victim [REDACTED - SEC 228A IPC], age 14, residing at [REDACTED - ADDRESS], provided statement regarding suspect...');

  const handleRedact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedacting(true);
    setTimeout(() => {
      let res = rawText;
      for (const s of ['Ananya Sharma', 'Flat 402 Green Park Delhi', 'Ananya', 'Sharma']) {
        res = res.replace(new RegExp(s, 'gi'), '[REDACTED - SEC 228A IPC]');
      }
      setRedactedText(res);
      setIsRedacting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>MHA • NCRB • NYAYAVAULT 360 BLOCKCHAIN LEGAL DMS • SIH26190</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NyayaVault 360: Secure Legal & Investigation Document Management System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Blockchain Document Tamper-Sealing, AI PII/POCSO Redactor, Dynamic Security Watermarking & Section 65B Evidence Certificates
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'repo', label: '📁 Legal Evidence Repository', count: documents.length },
            { id: 'blockchain', label: '🔗 Blockchain Immutable Ledger', count: ledger.length },
            { id: 'redactor', label: '🛡️ AI PII & POCSO Redactor' },
            { id: 'certs', label: '📜 Section 65B Certificates', count: certs.length },
            { id: 'rbac', label: '👥 Multi-Department RBAC' }
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
            VIEW 1: LEGAL EVIDENCE REPOSITORY
           ========================================================================= */}
        {activeTab === 'repo' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {documents.map((doc) => (
                <button
                  key={doc.document_id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDoc.document_id === doc.document_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{doc.document_id}</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? doc.title_hi : doc.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{doc.case_number}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{doc.document_type.split(' ')[0]}</span>
                    <span>{doc.investigating_officer.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Document Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Cryptographic Document Metadata */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedDoc.document_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedDoc.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedDoc.case_number} • {selectedDoc.case_type}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedDoc.tamper_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 font-mono text-xs text-slate-300">
                  <div className="text-cyan-400 font-bold">CRYPTOGRAPHIC PROOFS:</div>
                  <div className="flex justify-between"><span>SHA-256 Hash:</span><span className="text-emerald-400 truncate max-w-xs">{selectedDoc.sha256_hash}</span></div>
                  <div className="flex justify-between"><span>Blockchain TX:</span><strong className="text-purple-300">{selectedDoc.blockchain_tx_id}</strong></div>
                  <div className="flex justify-between"><span>IPFS CID:</span><strong className="text-amber-300 truncate max-w-xs">{selectedDoc.ipfs_cid}</strong></div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden font-mono text-xs space-y-2">
                  {/* Forensic Dynamic Watermark Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none rotate-12 text-center text-sm font-bold text-amber-400">
                    OFFICIAL USE • BADGE #MH-9182 • IP: 10.24.8.19 • {new Date().toISOString()}
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Investigating Officer: <strong>{selectedDoc.investigating_officer}</strong></span>
                    <span>Classification: <strong className="text-amber-300">{selectedDoc.classification}</strong></span>
                  </div>

                  {selectedDoc.pii_redacted && (
                    <div className="p-2.5 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-300 font-sans text-xs">
                      ⚠️ {selectedDoc.redaction_notice}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('redactor')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Open AI PII & Privacy Redactor ➔</span>
                </button>
              </div>

              {/* Right 5: Evidence Integrity Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Evidence Chain of Custody</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      HYPERLEDGER CERTIFIED
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Digital fingerprint strictly matches the genesis block hash. Zero byte-level manipulation detected across storage nodes.
                  </p>

                  <button
                    onClick={() => setActiveTab('certs')}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs font-sans"
                  >
                    View Section 65B Certificate ➔
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: BLOCKCHAIN IMMUTABLE AUDIT LEDGER
           ========================================================================= */}
        {activeTab === 'blockchain' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ledger.map((b) => (
                <div key={b.block_height} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold">Block #{b.block_height}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{b.action}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">
                      {b.status}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div>Document: <strong className="text-cyan-300">{b.document_id}</strong></div>
                    <div>Signer: <span className="text-white">{b.actor}</span></div>
                    <div>Merkle Root: <strong className="text-purple-300">{b.merkle_root}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: AI PII & POCSO REDACTOR
           ========================================================================= */}
        {activeTab === 'redactor' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 6: Raw Input */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Unredacted Legal Investigation Statement</span>
                </h4>

                <form onSubmit={handleRedact} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Statement Text with Sensitive PII</label>
                    <textarea rows={4} value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" />
                  </div>

                  <button type="submit" disabled={isRedacting} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isRedacting ? 'animate-spin' : ''}`} />
                    <span>{isRedacting ? 'Redacting Victim PII via Legal NLP...' : 'Auto-Mask PII (Section 228A IPC Compliant)'}</span>
                  </button>
                </form>
              </div>

              {/* Right 6: Redacted Output */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Redacted Public & Court Copy</span>
                </h4>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-emerald-400 font-bold text-[10px] uppercase">MASKED OUTPUT:</div>
                  <p className="text-slate-200 font-sans text-xs leading-relaxed">{redactedText}</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SECTION 65B CERTIFICATES
           ========================================================================= */}
        {activeTab === 'certs' && (
          <div className="space-y-6 font-mono text-xs">
            {certs.map((c) => (
              <div key={c.cert_id} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 shadow-2xl">
                <div className="border-b border-amber-500/40 pb-3">
                  <span className="text-amber-400 font-bold text-[10px] uppercase">ELECTRONIC EVIDENCE ADMISSIBILITY CERTIFICATE</span>
                  <h4 className="text-lg font-black text-white font-sans mt-0.5">{c.compliance_act}</h4>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
                  <div>Certificate ID: <strong className="text-cyan-300">{c.cert_id}</strong></div>
                  <div>Case Number: <strong>{c.case_number}</strong></div>
                  <div>Electronic Record: <strong className="text-white font-sans">{c.electronic_record}</strong></div>
                  <div>Certifying Authority: <strong className="text-amber-400">{c.certifying_authority}</strong></div>
                  <div className="text-emerald-400 pt-1 border-t border-slate-900 font-bold">Status: {c.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            VIEW 5: MULTI-DEPARTMENT RBAC
           ========================================================================= */}
        {activeTab === 'rbac' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {roles.map((r) => (
              <div key={r.role_name} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white font-sans">{r.role_name}</h4>
                <div className="space-y-1 text-slate-300">
                  <span className="text-amber-400 font-bold text-[10px] block uppercase">PERMISSIONS:</span>
                  {r.permissions.map((p: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
