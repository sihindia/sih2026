import React, { useState } from 'react';
import { 
  FileText, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Eye, 
  Database, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import docsData from './data/scanned_documents.json';
import recordsData from './data/extracted_records.json';

export default function App() {
  const [docs, setDocs] = useState(docsData);
  const [selectedDoc, setSelectedDoc] = useState(docsData[0]);
  const [records, setRecords] = useState(recordsData);

  // Unit Converter State
  const [rawArea, setRawArea] = useState(2.0);
  const [unitType, setUnitType] = useState('Bigha (UP)');

  const getHectares = () => {
    const factors: Record<string, number> = {
      'Bigha (UP)': 0.2529,
      'Bigha (Bihar)': 0.2508,
      'Guntha (MH)': 0.0101,
      'Kanal (Punjab)': 0.0505
    };
    return (rawArea * (factors[unitType] || 0.25)).toFixed(3);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <Scan className="w-4 h-4 text-emerald-400" />
              <span>DEPARTMENT OF LAND RESOURCES (DoLR) • DILRMP • SIH26018</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Intelligent Land Record Digitization & Multilingual OCR Validation System
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated Extraction of Jamabandi, Khatiyan & 7/12 Records from Handwritten Historical Documents
            </p>
          </div>

          <span className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Vision-OCR Engine: Active</span>
          </span>
        </header>

        {/* Documents Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>📜 SCANNED HISTORICAL LAND REGISTERS ({docs.length} ARCHIVES IN DATASET)</span>
            <span>Click archive to inspect OCR bounding extraction</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {docs.map((d) => (
              <button
                key={d.doc_id}
                onClick={() => setSelectedDoc(d)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedDoc.doc_id === d.doc_id
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md ring-1 ring-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{d.doc_id}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{d.document_type}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{d.village}, {d.state}</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    {d.scan_quality_dpi} DPI
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>{d.script_language.split(' ')[0]}</span>
                  <span className="text-emerald-400 font-bold">{(d.avg_ocr_confidence * 100).toFixed(1)}% Conf</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Extracted Land Records Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Digitized Land Record Fields ({selectedDoc.village})</span>
                  </h3>
                  <p className="text-xs text-slate-400">Classified khasra parcels, ownership titles & standardized area</p>
                </div>
              </div>

              <div className="space-y-3">
                {records.map((r) => {
                  const isHighConf = r.ocr_confidence > 0.90;
                  return (
                    <div key={r.record_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-emerald-400">Khasra #{r.khasra_no}</span>
                            <span className="font-mono text-[10px] text-slate-500">(Khata #{r.khata_no})</span>
                          </div>
                          <div className="font-bold text-sm text-white mt-0.5">{r.owner_name}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{r.land_classification}</div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold border ${
                          isHighConf ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}>
                          {(r.ocr_confidence * 100).toFixed(1)}% OCR
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px] font-mono text-slate-300">
                        <span>Original: {r.plot_area_raw}</span>
                        <span className="text-cyan-400 font-bold">{r.plot_area_standard_ha} Hectares</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5: Regional Area Unit Converter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Regional Land Unit Standardizer (DILRMP)</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Local Land Area Value</label>
                  <input
                    type="number" step="0.1" value={rawArea}
                    onChange={(e) => setRawArea(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Regional Traditional Unit</label>
                  <select
                    value={unitType} onChange={(e) => setUnitType(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  >
                    <option>Bigha (UP)</option>
                    <option>Bigha (Bihar)</option>
                    <option>Guntha (MH)</option>
                    <option>Kanal (Punjab)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Standard Metric Output:</span>
                  <div className="text-lg font-black text-emerald-400">{getHectares()} Hectares</div>
                  <div className="text-[11px] text-slate-400">Equivalent to {(Number(getHectares()) * 2.471).toFixed(3)} Acres</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
