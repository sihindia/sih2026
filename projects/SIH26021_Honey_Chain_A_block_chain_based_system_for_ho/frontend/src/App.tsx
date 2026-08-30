import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Radio, 
  RefreshCw, 
  Cpu, 
  Flame, 
  Globe 
} from 'lucide-react';

import batchesData from './data/honey_batches_and_nmr_certificates.json';
import hivesData from './data/smart_iot_hive_telemetry.json';
import ledgerData from './data/blockchain_transaction_ledger.json';
import statsData from './data/honeychain_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'kn' | 'bn' | 'ur'>('en');
  const [batches, setBatches] = useState(batchesData);
  const [selectedBatch, setSelectedBatch] = useState(batchesData[0]);
  const [hives, setHives] = useState(hivesData);
  const [ledger, setLedger] = useState(ledgerData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'batches' | 'iot' | 'verify' | 'ledger' | 'stats'>('batches');

  // Interactive Consumer QR Verification Simulator
  const [isVerifying, setIsVerifying] = useState(false);
  const [qrResult, setQrResult] = useState<any>({
    authenticityStatus: "100% PURE UNADULTERATED RAW HONEY CERTIFIED",
    pollenAnalysis: "92.4% Robinia Pseudoacacia (White Acacia Flora)",
    nmrSpectroscopy: "Passed NABL Nuclear Magnetic Resonance Test (Zero C4 Sugars)",
    blockchainTx: "0x9a8f4c2e1b7890a234f012de67bc45ef89012345 (Polygon PoS)",
    beekeeperFairPrice: "₹180/kg Direct Fair-Trade Premium Credited to Ghulam Nabi Mir"
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setQrResult({
        authenticityStatus: `100% AUTHENTIC ${selectedBatch.botanical_origin.toUpperCase()}`,
        pollenAnalysis: `${selectedBatch.pollen_purity_pct}% Botanical Floral Density`,
        nmrSpectroscopy: selectedBatch.nmr_isotope_test,
        blockchainTx: `${selectedBatch.blockchain_tx_hash} (Immutable Block)`,
        beekeeperFairPrice: `Beekeeper: ${selectedBatch.beekeeper_name} (${selectedBatch.region})`
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <QrCode className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF MSME • KVIC HONEY CHAIN 360 • SIH26021</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KVIC Honey Chain: Blockchain Honey Traceability &amp; Smart Beekeeping
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Khadi &amp; Village Industries Commission (KVIC) National Honey Mission: End-to-End On-Chain Batch Tracking, NMR Purity Verification, IoT Hive Acoustics &amp; Consumer QR Code Authenticity
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('kn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'kn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>ಕನ್ನಡ</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('ur')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ur' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>اردو</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'batches', label: '🍯 Monitored Honey Batches', count: batches.length },
            { id: 'iot', label: '🐝 Smart IoT Hive Acoustics', count: hives.length },
            { id: 'verify', label: '📱 Consumer QR Authentication' },
            { id: 'ledger', label: '⛓️ Polygon PoS Ledger', count: ledger.length },
            { id: 'stats', label: '📊 HoneyChain Telemetry' }
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
            VIEW 1: BATCHES
           ========================================================================= */}
        {activeTab === 'batches' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {batches.map((b) => (
                <button
                  key={b.batch_id}
                  onClick={() => setSelectedBatch(b)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedBatch.batch_id === b.batch_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{b.batch_id}</span>
                    <span className="text-emerald-400">{b.pollen_purity_pct}% Purity</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {b.apiary_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{b.region}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{b.beekeeper_name}</span>
                    <span className="text-cyan-400">{b.retail_pack_price}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedBatch.batch_id} • {selectedBatch.region}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedBatch.apiary_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    {selectedBatch.traceability_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">BOTANICAL &amp; CHEMICAL PURITY METRICS:</span>
                  <div className="text-white font-sans text-xs">
                    Floral Origin: <strong className="text-amber-300">{selectedBatch.botanical_origin}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    NMR Spectroscopy: {selectedBatch.nmr_isotope_test} (Zero Adulteration)
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Moisture Content: {selectedBatch.moisture_pct}% | HMF: {selectedBatch.hmf_mg_kg} mg/kg (FSSAI Compliant)
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900 font-mono">
                    Blockchain Hash: {selectedBatch.blockchain_tx_hash}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">BOTANICAL PURITY</span><span className="text-amber-400 font-bold">{selectedBatch.pollen_purity_pct}% Monofloral</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">PRICE TO CONSUMER</span><span className="text-cyan-400 font-bold">{selectedBatch.retail_pack_price}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('verify')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Verify Batch Authenticity via Consumer QR Code ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>Instant Honey Authenticity Scanner</span>
                  </h4>
                  <form onSubmit={handleVerify} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Apiary Honey Batch</label>
                      <input type="text" readOnly value={`${selectedBatch.apiary_name} (${selectedBatch.batch_id})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-amber-400" />
                    </div>
                    <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                      <span>{isVerifying ? 'Scanning Polygon PoS Smart Contract...' : 'Verify Cryptographic Authenticity'}</span>
                    </button>
                  </form>
                  {qrResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Status: <strong className="text-emerald-400 font-mono text-xs">{qrResult.authenticityStatus}</strong></div>
                      <div>Flora: <span className="text-amber-300 text-xs">{qrResult.pollenAnalysis}</span></div>
                      <div>Purity: <strong className="text-cyan-300 font-mono text-xs">{qrResult.nmrSpectroscopy}</strong></div>
                      <div>Ledger: <strong className="text-purple-300 font-mono text-xs truncate block">{qrResult.blockchainTx}</strong></div>
                      <div>Benefit: <strong className="text-slate-300 font-mono text-xs block mt-0.5">{qrResult.beekeeperFairPrice}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: IOT */}
        {tab === 'iot' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {hives.map((h, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400 font-bold">{h.hive_id}</span>
                  <span className="text-emerald-400 font-bold">{h.internal_temp_c}°C</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{h.colony_health}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Humidity: {h.humidity_pct}% | Acoustic: {h.acoustic_frequency_hz} Hz</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">Harvest: {h.harvest_readiness}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: VERIFY */}
        {tab === 'verify' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <QrCode className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Consumer QR Code Cryptographic Verification</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Scan the QR code on every jar to verify authentic farm-to-spoon provenance, NABL-certified NMR lab test reports, and fair-trade beekeeper payments directly on Polygon PoS.
            </p>
          </div>
        )}

        {/* VIEW 4: LEDGER */}
        {tab === 'ledger' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {ledger.map((l, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-purple-400 font-bold">Block #{l.block_no}</span>
                <h4 className="font-bold text-sm text-white font-sans">{l.event}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Tx: {l.tx_hash} | Gas: {l.gas_used}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-emerald-300 font-mono text-[10px]">Validator: {l.validator}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
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
