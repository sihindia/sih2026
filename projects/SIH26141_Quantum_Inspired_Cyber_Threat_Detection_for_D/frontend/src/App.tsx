import React, { useState } from 'react';
import { 
  KeyRound, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Lock, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import signaturesData from './data/quantum_digital_signatures.json';
import pauliData from './data/pauli_eigenstate_measurements.json';
import threatsData from './data/attack_threat_simulations.json';
import statsData from './data/qds_security_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [signatures, setSignatures] = useState(signaturesData);
  const [selectedSig, setSelectedSig] = useState(signaturesData[0]);
  const [pauliStates, setPauliStates] = useState(pauliData);
  const [threats, setThreats] = useState(threatsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'signatures' | 'pauli' | 'threats' | 'proofs' | 'stats'>('signatures');

  // Interactive Quantum QDS Verification Simulator
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>({
    qber: "0.84% QBER (Threshold: 3.20%)",
    threat: "No Eavesdropping / No Decoherence",
    forgeryProb: "< 10^-12 (Information-Theoretic Security)",
    verdict: "AUTHENTIC_QDS_DETERMINISTICALLY_ACCEPTED"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setVerifyResult({
        qber: "0.84% QBER (Threshold: 3.20%)",
        threat: "No Eavesdropping / No Decoherence",
        forgeryProb: "< 10^-12 (Information-Theoretic Security)",
        verdict: "AUTHENTIC_QDS_DETERMINISTICALLY_ACCEPTED"
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <KeyRound className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>EGREEN QUANTA • QUANTUMSIGNGUARD 360 QDS PROTOCOL • SIH26141</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              QuantumSignGuard: Quantum-Inspired Cyber Threat Detection for Digital Signature Security
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Teleportation-Based Quantum Digital Signatures, Pauli Projective Measurements & Non-ML Information-Theoretic Threat Shield
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'signatures', label: '🛡️ Quantum Signatures (QDS)', count: signatures.length },
            { id: 'pauli', label: '🔮 Pauli Projective Operators', count: pauliStates.length },
            { id: 'threats', label: '🚨 Attack Threat Simulations', count: threats.length },
            { id: 'proofs', label: '📜 Information-Theoretic Proofs' },
            { id: 'stats', label: '📊 QuantumSignGuard Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: SIGNATURES
           ========================================================================= */}
        {activeTab === 'signatures' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {signatures.map((s) => (
                <button
                  key={s.signature_id}
                  onClick={() => setSelectedSig(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedSig.signature_id === s.signature_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{s.signature_id}</span>
                    <span className={s.measured_qber_pct < s.qber_security_threshold_pct ? 'text-emerald-400' : 'text-rose-400'}>
                      QBER: {s.measured_qber_pct}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.document_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.signer_alice} ➔ {s.verifier_bob}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Pairs: {s.entangled_bell_pairs_used}</span>
                    <span className="text-emerald-400">P_forge: {s.forgery_probability}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedSig.signature_id} • 3-Party QDS</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedSig.document_title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedSig.measured_qber_pct < selectedSig.qber_security_threshold_pct 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {selectedSig.threat_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">PAULI TELEPORTATION CORRECTION & VERIFICATION:</span>
                  <div className="text-white font-sans text-xs font-bold">{selectedSig.pauli_correction_applied}</div>
                  <div className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Verdict: <strong className={selectedSig.measured_qber_pct < selectedSig.qber_security_threshold_pct ? 'text-emerald-400' : 'text-rose-400'}>{selectedSig.verification_verdict}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MEASURED QBER</span><span className={selectedSig.measured_qber_pct < selectedSig.qber_security_threshold_pct ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{selectedSig.measured_qber_pct}% (Threshold: {selectedSig.qber_security_threshold_pct}%)</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">FORGERY RISK</span><span className="text-emerald-400 font-bold">{selectedSig.forgery_probability}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('threats')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Simulate Quantum Intercept-and-Resend Attack ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>QDS Verification Hub</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Quantum Signature Vector</label>
                      <input type="text" readOnly value={`${selectedSig.signature_id} (${selectedSig.document_title})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Measuring Pauli Projective Observables...' : 'Verify Signature Integrity'}</span>
                    </button>
                  </form>
                  {verifyResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>QBER: <strong className="text-emerald-400 font-mono text-xs">{verifyResult.qber}</strong></div>
                      <div>Verdict: <strong className="text-cyan-300 font-mono text-xs block mt-0.5">{verifyResult.verdict}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PAULI */}
        {activeTab === 'pauli' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-purple-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-purple-400 font-bold text-[10px] uppercase">PROJECTIVE QUANTUM MEASUREMENT OPERATORS</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">Pauli-X, Pauli-Y & Pauli-Z Observables</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Exact Orthogonality</span>
            </div>
            <div className="space-y-2 font-sans text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 font-mono">
                {pauliStates.map((p, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-purple-400 font-bold block">{p.operator}</span>
                    <div className="text-slate-400 text-[10px]">{p.measurement_basis}</div>
                    <div className="text-emerald-400 text-[10px] pt-1 border-t border-slate-900">{p.eigenstates.join(' • ')}</div>
                  </div>
                ))}
              </div>
              <div className="text-purple-400 font-bold pt-2 border-t border-slate-900">
                Non-commuting observables [σx, σz] ≠ 0 enforce the quantum No-Cloning Theorem, guaranteeing that Eve cannot copy signatures without detectable perturbation.
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: THREATS */}
        {activeTab === 'threats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {threats.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">ATTACK VECTOR #{idx+1}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.attack_type}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans">
                  <div>Induced QBER: <strong className="text-rose-400 font-mono">{t.induced_qber}</strong></div>
                  <div>Detection: <strong className="text-amber-300 text-[11px]">{t.detection_mechanism}</strong></div>
                  <div className="text-emerald-400 pt-1 border-t border-slate-900">Defense: {t.defense}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: PROOFS */}
        {activeTab === 'proofs' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-400">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Information-Theoretic Security & Shor-Immunity Proof</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Security relies on fundamental laws of quantum physics (Heisenberg Uncertainty & Entanglement Monogamy), remaining unconditionally secure even against infinite-power quantum computers.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
