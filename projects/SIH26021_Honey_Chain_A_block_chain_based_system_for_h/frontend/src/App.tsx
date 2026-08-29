import React, { useState } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Thermometer, 
  Radio, 
  Sparkles, 
  RefreshCw, 
  Award, 
  Cpu, 
  Lock,
  ArrowRight
} from 'lucide-react';
import batchesData from './data/honey_batches.json';
import hivesData from './data/smart_hives.json';

export default function App() {
  const [batches, setBatches] = useState(batchesData);
  const [selectedBatch, setSelectedBatch] = useState(batchesData[0]);
  const [hives, setHives] = useState(hivesData);

  // Active Tab
  const [activeView, setActiveView] = useState<'qr' | 'hives' | 'blockchain'>('qr');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>MINISTRY OF MSME • KVIC HONEY MISSION • SIH26021</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Honey Chain: Blockchain Honey Traceability & Smart Beekeeping Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Immutable QR Provenance, NABL Lab NMR Purity Verification & IoT Smart Hive Telemetry
            </p>
          </div>

          <span className="px-4 py-2 bg-amber-950 text-amber-300 border border-amber-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Blockchain Ledger: Verified</span>
          </span>
        </header>

        {/* Batch Selection Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>🍯 VERIFIED KVIC HONEY BATCHES ({batches.length} BATCHES)</span>
            <span>Click batch to verify provenance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {batches.map((b) => (
              <button
                key={b.batch_id}
                onClick={() => setSelectedBatch(b)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedBatch.batch_id === b.batch_id
                    ? 'bg-amber-950/60 border-amber-500 text-white shadow-md ring-1 ring-amber-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{b.batch_id}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{b.variety}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{b.beekeeper_name.split('(')[0]}</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                    {b.nmr_purity_score_pct}% NMR
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Harvest: {b.harvest_date}</span>
                  <span className="text-amber-300 font-bold">Block #{b.block_number}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: QR Code Provenance Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>Consumer QR Code Provenance Trace</span>
                  </h3>
                  <p className="text-xs text-slate-400">{selectedBatch.variety} • Batch QR: {selectedBatch.qr_code}</p>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  FSSAI: {selectedBatch.fssai_lic_no}
                </span>
              </div>

              {/* Provenance Steps */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 bg-amber-950 rounded-xl border border-amber-800 text-amber-400 font-bold">01</div>
                  <div>
                    <div className="font-bold text-white">Apiary Hive Harvest</div>
                    <div className="text-[11px] text-slate-400">{selectedBatch.apiary_location}</div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-1">Harvested on {selectedBatch.harvest_date} by {selectedBatch.beekeeper_name}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 bg-blue-950 rounded-xl border border-blue-800 text-blue-400 font-bold">02</div>
                  <div>
                    <div className="font-bold text-white">NABL Certified Lab Purity & NMR Testing</div>
                    <div className="text-[11px] text-slate-400">{selectedBatch.nabl_lab_cert}</div>
                    <div className="text-[10px] font-mono text-blue-400 mt-1">Pollen: {selectedBatch.pollen_fingerprint}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-800 text-emerald-400 font-bold">03</div>
                  <div>
                    <div className="font-bold text-white">KVIC Bottling & Immutable Blockchain Seal</div>
                    <div className="text-[11px] text-slate-400">Bottled on {selectedBatch.bottling_date} • Moisture: {selectedBatch.moisture_content_pct}%</div>
                    <div className="text-[10px] font-mono text-slate-500 truncate block mt-1">Tx: {selectedBatch.blockchain_tx_hash}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5: IoT Smart Hive Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>IoT Smart Hive Box Telemetry</span>
              </h4>

              <div className="space-y-3">
                {hives.map((h) => (
                  <div key={h.hive_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-400">{h.hive_id}</span>
                        <div className="font-bold text-white text-xs mt-0.5">{h.apiary}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {h.queen_status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-900 font-mono text-[11px]">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-[9px] text-slate-500 block">TEMP</span>
                        <span className="font-bold text-amber-400">{h.internal_temp_c}°C</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-[9px] text-slate-500 block">WEIGHT</span>
                        <span className="font-bold text-blue-400">{h.weight_kg} kg</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-[9px] text-slate-500 block">SWARM FREQ</span>
                        <span className="font-bold text-emerald-400">{h.acoustic_freq_hz} Hz</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
