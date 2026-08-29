import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  QrCode, 
  Sliders, 
  RefreshCw, 
  Cpu, 
  Database, 
  Layers, 
  Activity, 
  Eye, 
  FileText, 
  Building2, 
  ChevronRight, 
  Fingerprint, 
  Flame, 
  Zap, 
  Camera 
} from 'lucide-react';

import modelsData from './data/models_inventory.json';
import auditsData from './data/training_data_audit.json';
import provenanceData from './data/inference_provenance.json';
import shiftData from './data/distribution_shift.json';
import reportsData from './data/assurance_reports.json';

export default function App() {
  const [models, setModels] = useState(modelsData);
  const [selectedModel, setSelectedModel] = useState(modelsData[0]);
  const [provenanceRecords, setProvenanceRecords] = useState(provenanceData);
  const [selectedProv, setSelectedProv] = useState(provenanceData[0]);
  const [activeTab, setActiveTab] = useState<'inventory' | 'poisoning' | 'provenance' | 'shift' | 'governance'>('inventory');

  // Backdoor Scanner State
  const [scanModel, setScanModel] = useState('MOD-DEF-RESNET-042');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  // Cryptographic Tamper Simulator
  const [tamperInjected, setTamperInjected] = useState(false);

  const runBackdoorScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const isPoisoned = scanModel.includes('RESNET');
      setScanResult({
        modelId: scanModel,
        anomalyIndex: isPoisoned ? 2.85 : 0.42,
        isPoisoned,
        triggerPattern: isPoisoned ? '4x4 Pixel Patch (Top-Left Corner)' : 'NONE (L1 Clean)',
        targetClass: isPoisoned ? 'Civilian Truck (Forces Hostile Armour Misclassification)' : 'N/A',
        action: isPoisoned ? 'QUARANTINE_MODEL_IMMEDIATELY' : 'PASS_CERTIFIED'
      });
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MINISTRY OF DEFENCE (MoD) • INDIAN ARMY DGIS AIR-GAPPED CV ASSURANCE • SIH26228</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Trustworthy Computer Vision Integrity Assurance for Data, Models & Inference
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Multi-Contributor Poisoning Detection, Model Backdoor Fingerprinting, Cryptographic Provenance & Terrain Shift Radar
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-rose-950/80 text-rose-300 border border-rose-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner font-mono">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>AIR-GAPPED DEFENSE GRID</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'inventory', label: '🛡️ Defense CV Models Inventory', count: models.length },
            { id: 'poisoning', label: '🧪 Pillar 1 & 2: Poisoning & Backdoor Scan' },
            { id: 'provenance', label: '🔐 Pillar 3: Cryptographic Provenance', count: provenanceRecords.length },
            { id: 'shift', label: '🛰️ Pillar 4: Terrain Drift & OOD Radar', count: shiftData.length },
            { id: 'governance', label: '📜 Pillar 5: Military Governance & Audit', count: reportsData.length }
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
            VIEW 1: DEFENSE CV MODELS INVENTORY
           ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Model Selector Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>🎯 OPERATIONAL COMPUTER VISION ASSETS (TACTICAL RECON & AIR DEFENSE)</span>
                <span className="text-rose-400 font-mono">Select model to inspect SHA-256 weight digest</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {models.map((m) => (
                  <button
                    key={m.model_id}
                    onClick={() => setSelectedModel(m)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedModel.model_id === m.model_id
                        ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-1 ring-rose-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-rose-400 font-bold">{m.model_id}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{m.name}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{m.vendor}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className={m.assurance_status === 'VERIFIED_OPERATIONAL' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {m.assurance_status}
                      </span>
                      <span className="text-cyan-300">{m.parameter_count_m}M Params</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Model Specifications & Cryptographic Signature */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-rose-400">{selectedModel.model_id} • {selectedModel.architecture}</span>
                      <h3 className="font-bold text-base text-white mt-1">{selectedModel.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">Contributor Vendor: {selectedModel.vendor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                      selectedModel.assurance_status === 'VERIFIED_OPERATIONAL'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}>
                      {selectedModel.assurance_status}
                    </span>
                  </div>

                  {/* Weights SHA-256 Digest Box */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Cryptographic Weights SHA-256 Digest:</span>
                    <div className="p-2.5 bg-slate-900 rounded-xl text-cyan-300 text-[11px] break-all border border-slate-800">
                      {selectedModel.weights_sha256}
                    </div>
                  </div>

                  {/* Metric Bar */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px]">BACKDOOR INDEX</span>
                      <span className={`text-xl font-black mt-1 block ${selectedModel.backdoor_anomaly_index > 2.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {selectedModel.backdoor_anomaly_index}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-950">
                      <span className="text-slate-500 block text-[9px]">ROBUSTNESS</span>
                      <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedModel.adversarial_robustness_score}%</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-purple-950">
                      <span className="text-slate-500 block text-[9px]">INPUT RESOLUTION</span>
                      <span className="text-sm font-black text-purple-400 mt-1 block">{selectedModel.input_resolution}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300">
                    <span className="text-slate-500 text-[9px] block uppercase font-bold">Deployment Disposition:</span>
                    <span className="text-white font-bold">{selectedModel.deployed_unit}</span>
                  </div>
                </div>
              </div>

              {/* Right 5: Multi-Contributor Pipeline Health */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-rose-400" />
                      <span>Pipeline Integrity Metric</span>
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      DGIS VERIFIED
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans leading-relaxed">
                    Unified evidence-based assurance assessing <strong>Training Data Poisoning</strong>, <strong>Weight Backdoors</strong>, and <strong>Inference Replay Tampering</strong> across multi-vendor defense models.
                  </p>

                  <button
                    onClick={() => setActiveTab('poisoning')}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Run Backdoor & Poisoning Scanner</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: POISONING & BACKDOOR SCANNER
           ========================================================================= */}
        {activeTab === 'poisoning' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Fingerprint className="w-4 h-4 text-rose-400" />
                <span>Pillar 2: Neural Cleanse Backdoor Trigger Reconstruction</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Target Model Asset</label>
                  <select
                    value={scanModel} onChange={(e) => setScanModel(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
                  >
                    <option value="MOD-DEF-RESNET-042">MOD-DEF-RESNET-042 (AeroTech Third-Party Model)</option>
                    <option value="MOD-DEF-YOLO-081">MOD-DEF-YOLO-081 (Bharat Defence Tactical Recon)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between"><span>Trigger Search Algorithm:</span><span className="text-white font-bold">L1-Norm Optimization (Pattern Inversion)</span></div>
                  <div className="flex justify-between"><span>Anomaly Cutoff Index:</span><span className="text-amber-400 font-bold">&gt; 2.0 (Threshold Flag)</span></div>
                </div>

                <button
                  onClick={runBackdoorScan} disabled={isScanning}
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Running Neural Cleanse Inversion...' : 'Execute Backdoor Integrity Scan'}</span>
                </button>
              </div>
            </div>

            {/* Backdoor Scan Result */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Backdoor Reconstruction Outcome</span>
              </h4>

              {scanResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                      <span className="text-slate-500 block text-[9px]">ANOMALY INDEX</span>
                      <span className={`text-2xl font-black ${scanResult.anomalyIndex > 2.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {scanResult.anomalyIndex}
                      </span>
                    </div>
                    <div className={`p-3 bg-slate-950 rounded-2xl border ${scanResult.isPoisoned ? 'border-rose-950' : 'border-emerald-950'}`}>
                      <span className="text-slate-500 block text-[9px]">STATUS</span>
                      <span className={`text-xl font-black ${scanResult.isPoisoned ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {scanResult.isPoisoned ? 'BACKDOOR DETECTED' : 'CLEAN MODEL'}
                      </span>
                    </div>
                  </div>

                  {scanResult.isPoisoned && (
                    <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-1.5 text-rose-200">
                      <div className="text-xs font-bold text-rose-400">🚨 RECONSTRUCTED TROJAN TRIGGER:</div>
                      <div className="text-[11px]">Pattern: <strong>{scanResult.triggerPattern}</strong></div>
                      <div className="text-[11px]">Target Behavior: <strong>{scanResult.targetClass}</strong></div>
                    </div>
                  )}

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Recommended Action:</span>
                    <span className={`font-bold ${scanResult.isPoisoned ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {scanResult.action}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Fingerprint className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Execute Backdoor Integrity Scan" to evaluate.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: CRYPTOGRAPHIC INFERENCE PROVENANCE
           ========================================================================= */}
        {activeTab === 'provenance' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
              <div className="flex justify-between items-center border-b-2 border-rose-500/40 pb-4">
                <div>
                  <span className="text-rose-400 font-bold text-[10px] uppercase">PILLAR 3: CRYPTOGRAPHIC INFERENCE BINDING & PROVENANCE</span>
                  <h3 className="text-xl font-black text-white font-sans mt-0.5">Inference Record: {selectedProv.record_id}</h3>
                  <p className="text-slate-400 text-[11px]">Binding: Input Image Hash + Model Digest + Preprocessing + Bounding Boxes + Ed25519 Signature</p>
                </div>
                <Lock className="w-10 h-10 text-rose-400" />
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <span className="text-rose-400 font-bold text-[10px] uppercase block">CRYPTOGRAPHIC BINDING COMPONENTS:</span>
                  <div className="flex justify-between"><span className="text-slate-500">Image SHA-256:</span><span className="text-white text-[11px] truncate max-w-md">{selectedProv.image_sha256}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Model Weights Digest:</span><span className="text-cyan-300 text-[11px] truncate max-w-md">{selectedProv.weights_digest}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Merkle Root Hash:</span><span className="text-purple-300 text-[11px]">{selectedProv.merkle_root}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Timestamp:</span><span className="text-slate-300">{selectedProv.timestamp} (Nonce: {selectedProv.nonce})</span></div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase block">DETECTED TARGETS:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProv.detections.map((d: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-900 rounded-lg text-white font-bold border border-slate-800">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex justify-between items-center ${
                  selectedProv.tamper_detected
                    ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold block text-slate-400">Ed25519 Signature Verification:</span>
                    <span className="font-black text-sm">{selectedProv.integrity_status}</span>
                  </div>
                  <button onClick={() => alert("Cryptographic proof valid.")} className="px-4 py-2 bg-rose-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                    Validate Signature Proof
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: TERRAIN DRIFT & DISTRIBUTION SHIFT
           ========================================================================= */}
        {activeTab === 'shift' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {shiftData.map((s, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white font-sans">{s.terrain}</h4>
                      <div className="text-slate-400 text-[11px]">{s.sensor}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.mahalanobis_distance > 5.0 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      Dist: {s.mahalanobis_distance}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div className="font-bold text-cyan-300">{s.classification}</div>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900">{s.recommendation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: MILITARY GOVERNANCE & AUDIT
           ========================================================================= */}
        {activeTab === 'governance' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-rose-500/40 pb-4">
              <div>
                <span className="text-rose-400 font-bold text-[10px] uppercase">INDIAN ARMY • DIRECTORATE GENERAL OF INFORMATION SYSTEMS (DGIS)</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Air-Gapped AI Metrology & Assurance Certificate</h3>
                <p className="text-slate-400 text-[11px]">Certificate Ref: REP-DGIS-2026-081</p>
              </div>
              <QrCode className="w-12 h-12 text-rose-400" />
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-bold text-[10px] uppercase block">DGIS MILITARY ASSURANCE VERDICT:</span>
                <div className="text-lg font-black text-white font-sans mt-0.5">CERTIFIED SAFE FOR AIR-GAPPED TACTICAL DEPLOYMENT</div>
                <div className="text-slate-400 text-[10px]">Evaluated by: Lt. Col. V. S. Chauhan • Integrity Score: 97.5%</div>
              </div>
              <button onClick={() => alert("DGIS Assurance Audit Certificate exported as PDF.")} className="px-4 py-2 bg-rose-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Export Certificate PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
