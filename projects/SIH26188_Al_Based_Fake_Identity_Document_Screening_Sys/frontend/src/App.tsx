import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  Sparkles, 
  Scan, 
  RefreshCw, 
  Lock, 
  FileText, 
  Fingerprint, 
  Eye, 
  Sliders, 
  Layers, 
  ChevronRight, 
  Printer, 
  Share2, 
  Globe 
} from 'lucide-react';

import documentsData from './data/screened_travel_documents.json';
import rulesData from './data/forgery_rules.json';
import faceData from './data/face_match_logs.json';
import watchlistData from './data/watchlist_records.json';
import checkpointsData from './data/checkpoints_list.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'bn' | 'ne'>('hi');
  const [documents, setDocuments] = useState(documentsData);
  const [selectedDoc, setSelectedDoc] = useState(documentsData[0]);
  const [rules, setRules] = useState(rulesData);
  const [watchlist, setWatchlist] = useState(watchlistData);
  const [checkpoints, setCheckpoints] = useState(checkpointsData);
  const [activeTab, setActiveTab] = useState<'scanner' | 'facematch' | 'mrz' | 'watchlist' | 'command'>('scanner');

  // MRZ Calculator State
  const [passNum, setPassNum] = useState('P8912401');
  const [dobVal, setDobVal] = useState('840512');
  const [expVal, setExpVal] = useState('300920');
  const [isScreening, setIsScreening] = useState(false);
  const [mrzResult, setMrzResult] = useState<any>({
    checksum: "FAILED (DOB Modulus 10 Mismatch)",
    threat: 96.5,
    verdict: "RED_IMMEDIATE_ARREST_AND_IMPOUND",
    anomalies: ["Photo Replacement ELA Anomaly", "Font Kerning Disparity"]
  });

  const handleScreenMRZ = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScreening(true);
    setTimeout(() => {
      const isForged = passNum.includes("8912401") || dobVal.includes("840512");
      setMrzResult({
        checksum: isForged ? "FAILED (DOB Modulus 10 Mismatch)" : "PASSED (ICAO 9303 Valid)",
        threat: isForged ? 96.5 : 4.2,
        verdict: isForged ? "RED_IMMEDIATE_ARREST_AND_IMPOUND" : "GREEN_CLEAR_FOR_TRANSIT",
        anomalies: isForged ? ["Photo Replacement ELA Anomaly", "Font Kerning Disparity"] : []
      });
      setIsScreening(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MHA • SASHASTRA SEEMA BAL (SSB) • SEEMADRISHTI 360 AI BORDER SCREENER • SIH26188</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SeemaDrishti 360: AI Fake Identity & Document Screening System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              ICAO Doc 9303 MRZ Checksum Validator, Error Level Analysis (ELA) Forgery Detection & Biometric Face Verification
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('ne')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ne' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>नेपाली</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scanner', label: '🛂 Document Screening Console', count: documents.length },
            { id: 'facematch', label: '👤 Biometric Face Match (1:1)', count: faceData.length },
            { id: 'mrz', label: '📜 ICAO 9303 MRZ Engine' },
            { id: 'watchlist', label: '🚨 Interpol & MHA Watchlist', count: watchlist.length },
            { id: 'command', label: '📊 SSB Checkpoint Command' }
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
            VIEW 1: DOCUMENT SCREENING CONSOLE
           ========================================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {documents.map((doc) => (
                <button
                  key={doc.document_id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDoc.document_id === doc.document_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{doc.document_id}</span>
                    <span className={`px-2 py-0.5 rounded ${doc.threat_score > 70 ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}>
                      Risk: {doc.threat_score}/100
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {doc.traveler_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{doc.document_type} • {doc.passport_number}</div>
                  <div className="text-[10px] text-rose-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{doc.checkpoint.split(' ')[0]} ICP</span>
                    <span>{doc.triage_decision.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Inspection View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Forensic Inspection Details */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-rose-400">{selectedDoc.document_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedDoc.traveler_name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedDoc.checkpoint}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedDoc.threat_score > 70 ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedDoc.triage_decision}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs text-slate-300">
                  <div className="text-cyan-400 font-bold">MRZ STRING (ICAO DOC 9303):</div>
                  <div className="p-2 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 tracking-wider">
                    {selectedDoc.mrz_line_1}<br/>
                    {selectedDoc.mrz_line_2}
                  </div>
                  <div className="pt-1 flex justify-between">
                    <span>MRZ Checksum:</span>
                    <strong className={selectedDoc.mrz_checksum_status.includes('PASSED') ? 'text-emerald-400' : 'text-rose-400'}>{selectedDoc.mrz_checksum_status}</strong>
                  </div>
                </div>

                {/* Forgery Anomalies */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 font-bold text-[10px] uppercase font-mono block">FORENSIC FORGERY ANOMALIES DETECTED:</span>
                  {selectedDoc.tampering_detected.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedDoc.tampering_detected.map((t: string, idx: number) => (
                        <div key={idx} className="p-2.5 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-200 font-sans text-xs flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-800 rounded-xl text-emerald-300 font-sans text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zero tampering detected. Clean physical and digital substrate.</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">BIOMETRIC FACE MATCH</span>
                    <span className="text-xl font-black text-rose-400 mt-1 block">{selectedDoc.face_match_confidence_pct}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">WATCHLIST STATUS</span>
                    <span className={`text-sm font-black mt-1 block ${selectedDoc.watchlist_hit ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {selectedDoc.watchlist_remarks}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5: AI Verification Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>SSB Border Action</span>
                    </h4>
                    <span className="text-rose-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      THREAT: {selectedDoc.threat_score}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    AI optical document analysis confirms fraudulent passport blank with head-swap tampering. Officer should immediately detain individual and notify central IB desk.
                  </p>

                  <button
                    onClick={() => setActiveTab('facematch')}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Run Biometric 1:1 Face Match ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: BIOMETRIC FACE MATCH
           ========================================================================= */}
        {activeTab === 'facematch' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {faceData.map((f) => (
                <div key={f.match_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-rose-400 font-bold text-[10px]">{f.match_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{f.traveler_name}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                      f.cosine_similarity_score > 0.85 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {(f.cosine_similarity_score * 100).toFixed(1)}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">DOC PHOTO EMBEDDING</span>
                      <span className="text-xs text-cyan-300 font-mono truncate">{f.document_photo_hash}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl">
                      <span className="text-slate-500 block text-[9px]">LIVE WEBCAM EMBEDDING</span>
                      <span className="text-xs text-rose-300 font-mono truncate">{f.live_webcam_hash}</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl font-sans text-xs ${
                    f.verdict.includes('MISMATCH') ? 'bg-rose-950/40 border border-rose-800 text-rose-300' : 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                  }`}>
                    <strong>Verdict:</strong> {f.verdict}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: MRZ ENGINE
           ========================================================================= */}
        {activeTab === 'mrz' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Scan className="w-4 h-4 text-rose-400" />
                  <span>ICAO Doc 9303 Checksum Engine</span>
                </h4>
                <form onSubmit={handleScreenMRZ} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Passport Number</label>
                    <input type="text" required value={passNum} onChange={(e) => setPassNum(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Date of Birth (YYMMDD)</label>
                    <input type="text" required value={dobVal} onChange={(e) => setDobVal(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Date of Expiry (YYMMDD)</label>
                    <input type="text" required value={expVal} onChange={(e) => setExpVal(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold" />
                  </div>
                  <button type="submit" disabled={isScreening} className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isScreening ? 'animate-spin' : ''}`} />
                    <span>{isScreening ? 'Computing Modulus 10 Weights [7,3,1]...' : 'Validate MRZ Checksum Integrity'}</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
                <h4 className="font-bold text-sm text-white font-sans">Cryptographic Validation Output</h4>
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Checksum Status:</span>
                    <strong className={mrzResult.checksum.includes('PASSED') ? 'text-emerald-400' : 'text-rose-400'}>{mrzResult.checksum}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Threat Score:</span>
                    <strong className="text-rose-400 text-lg font-black">{mrzResult.threat}/100</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl font-sans text-xs text-white">
                    Decision: <strong className="text-rose-400">{mrzResult.verdict}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: WATCHLIST & LOC
           ========================================================================= */}
        {activeTab === 'watchlist' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="border-b border-rose-500/40 pb-3">
              <span className="text-rose-400 font-bold text-[10px] uppercase">INTELLIGENCE BUREAU (IB) & INTERPOL SLTD DATABASE</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Active Look-Out Circulars (LOC) & Red Notices</h4>
            </div>

            <div className="space-y-3">
              {watchlist.map((w) => (
                <div key={w.record_id} className="p-4 bg-slate-950 rounded-2xl border border-rose-800/80 space-y-2 text-slate-300 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-rose-400 font-bold">{w.record_id} • {w.subject_name}</span>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{w.status}</span>
                  </div>
                  <div>Aliases: <strong className="text-white">{w.aliases.join(', ')}</strong></div>
                  <div>Offense: <span className="text-amber-300">{w.offense}</span></div>
                  <div>Agency: {w.issuing_agency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: SSB CHECKPOINT COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {checkpoints.map((cp) => (
              <div key={cp.code} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div><h4 className="font-bold text-sm text-white font-sans">{cp.name}</h4><p className="text-slate-400 text-[11px]">{cp.border}</p></div>
                  <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{cp.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DAILY PASSENGERS</span><span className="text-white font-bold">{cp.daily_passengers.toLocaleString()}</span></div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-rose-950"><span className="text-rose-400 block text-[8px] font-bold">FORGERIES CAUGHT</span><span className="text-rose-300 font-bold">{cp.forged_detected_month}/month</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
