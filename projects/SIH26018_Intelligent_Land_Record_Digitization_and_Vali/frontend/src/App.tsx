import React, { useState } from 'react';
import { 
  Scan, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  Database, 
  RefreshCw, 
  Scale, 
  Activity, 
  Globe 
} from 'lucide-react';

import docsData from './data/scanned_historical_documents_catalog.json';
import recordsData from './data/digitized_land_records_entities.json';
import unitsData from './data/regional_area_conversion_units_matrix.json';
import statsData from './data/abhilekhai_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'gu' | 'bn'>('en');
  const [docs, setDocs] = useState(docsData);
  const [selectedDoc, setSelectedDoc] = useState(docsData[0]);
  const [records, setRecords] = useState(recordsData);
  const [units, setUnits] = useState(unitsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'docs' | 'records' | 'converter' | 'dilrmp' | 'stats'>('docs');

  // Converter state
  const [rawArea, setRawArea] = useState(2.0);
  const [unit, setUnit] = useState('Bigha (UP / Standard)');

  const getHectares = () => {
    const factors: Record<string, number> = { 
      'Bigha (UP / Standard)': 0.2529, 
      'Bigha (Bihar)': 0.2508, 
      'Guntha (Maharashtra)': 0.0101, 
      'Kanal (Punjab)': 0.0505 
    };
    return (rawArea * (factors[unit] || 0.25)).toFixed(3);
  };

  // Interactive OCR Simulator
  const [isDigitizing, setIsDigitizing] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>({
    khasraExtracted: "Khasra #412/1 & #412/2 Delineated with High Confidence",
    ownerIdentified: "Ramprasad Shriram Tripathi & Ghanshyam Shriram Tripathi",
    metricStandardization: "Converted 2 Bigha 4 Biswa into 0.556 Hectares (5,560 m²)",
    ulpinAllocated: "09-182-0412-1001 (National 14-Digit Standard Identifier)",
    dilrmpStatus: "Validated against State Revenue Database; 0 Duplicates"
  });

  const handleDigitize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDigitizing(true);
    setTimeout(() => {
      setOcrResult({
        khasraExtracted: `Extracted ${selectedDoc.parcels_extracted_count} Land Parcels from ${selectedDoc.document_type}`,
        ownerIdentified: "Land Title Holders & Mutation Lineage Recognized",
        metricStandardization: "All Traditional Units Normalized to Standard Hectares",
        ulpinAllocated: "Standardized 14-Digit Bhu-Aadhaar ULPIN Generated",
        dilrmpStatus: selectedDoc.dilrmp_validation
      });
      setIsDigitizing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
              <Scan className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MINISTRY OF RURAL DEVELOPMENT • DOLR ABHILEKHAI 360 • SIH26018</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DoLR AbhilekhAI: Intelligent Land Record Digitization &amp; Validation System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Department of Land Resources (DoLR) DILRMP Modernization: Multilingual Vision-OCR (Kaithi, Modi, Devanagari), Regional Traditional Area Conversion, DILRMP Validation &amp; ULPIN Pre-Allocation
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('gu')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'gu' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>ગુજરાતી</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'docs', label: '📜 Historical Scanned Documents', count: docs.length },
            { id: 'records', label: '🗄️ Extracted Cadastral Parcels', count: records.length },
            { id: 'converter', label: '📐 Regional Area Unit Converter' },
            { id: 'dilrmp', label: '🏛️ DILRMP Modernization Hub' },
            { id: 'stats', label: '📊 AbhilekhAI Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: DOCS
           ========================================================================= */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {docs.map((d) => (
                <button
                  key={d.doc_id}
                  onClick={() => setSelectedDoc(d)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDoc.doc_id === d.doc_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-emerald-400">{d.doc_id}</span>
                    <span className="text-cyan-400">{d.scan_resolution_dpi} DPI</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {d.document_type}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{d.location}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{d.script_language.split('&')[0]}</span>
                    <span className="text-amber-400">{d.ocr_confidence_pct}% OCR</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-emerald-400 font-bold">{selectedDoc.doc_id} • {selectedDoc.location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedDoc.document_type}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedDoc.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 block text-[9px] font-bold uppercase">OCR EXTRACTION &amp; VALIDATION TELEMETRY:</span>
                  <div className="text-white font-sans text-xs">
                    Script &amp; Terminology: <strong className="text-cyan-300">{selectedDoc.script_language}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Extracted Records: {selectedDoc.parcels_extracted_count} Land Title Records Identified
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Scan Quality: {selectedDoc.scan_resolution_dpi} DPI High-Resolution Raw Input
                  </div>
                  <div className="text-rose-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    DILRMP Validation State: {selectedDoc.dilrmp_validation}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">OCR RECOGNITION CONFIDENCE</span><span className="text-emerald-400 font-bold">{selectedDoc.ocr_confidence_pct}% Accuracy</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">EXTRACTED RECORDS</span><span className="text-cyan-400 font-bold">{selectedDoc.parcels_extracted_count} Parcels</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('records')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Inspect Extracted Khasra/Khata Records &amp; 14-Digit ULPINs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Instant Vision-OCR Digitizer</span>
                  </h4>
                  <form onSubmit={handleDigitize} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Historical Record Target</label>
                      <input type="text" readOnly value={`${selectedDoc.document_type} (${selectedDoc.location})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-emerald-400" />
                    </div>
                    <button type="submit" disabled={isDigitizing} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isDigitizing ? 'animate-spin' : ''}`} />
                      <span>{isDigitizing ? 'Applying Multilingual TrOCR & LayoutLMv3...' : 'Digitize & Extract Cadastral Entities'}</span>
                    </button>
                  </form>
                  {ocrResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Khasra Extracted: <strong className="text-emerald-400 font-mono text-xs">{ocrResult.khasraExtracted}</strong></div>
                      <div>Owner Lineage: <span className="text-cyan-300 text-xs">{ocrResult.ownerIdentified}</span></div>
                      <div>Metric Standard: <strong className="text-amber-300 font-mono text-xs">{ocrResult.metricStandardization}</strong></div>
                      <div>Bhu-Aadhaar: <strong className="text-emerald-300 font-mono text-xs">{ocrResult.ulpinAllocated}</strong></div>
                      <div>Validation: <strong className="text-white font-mono text-xs block mt-0.5">{ocrResult.dilrmpStatus}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RECORDS */}
        {tab === 'records' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {records.map((r, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">Khasra #{r.khasra} (Khata #{r.khata})</span>
                  <span className="text-cyan-400 font-bold">{r.ocr_conf} OCR</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{r.owner}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Area: {r.local_area} ({r.metric_area_ha} Ha) | Land: {r.land_type}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-amber-300 font-mono text-[10px]">ULPIN: {r.ulpin}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: CONVERTER */}
        {tab === 'converter' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-4 text-xs font-mono">
            <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Regional Land Unit Standardizer</span>
            </h4>
            <div className="space-y-3 font-sans">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Local Land Area Value</label>
                <input type="number" step="0.1" value={rawArea} onChange={(e) => setRawArea(Number(e.target.value))} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono" />
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">Regional Traditional Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono">
                  {units.map((u, idx) => (
                    <option key={idx} value={u.unit_name}>{u.unit_name} ({u.states_used})</option>
                  ))}
                </select>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Standard Metric:</span>
                <div className="text-xl font-black text-emerald-400">{getHectares()} Hectares</div>
                <div className="text-[11px] text-slate-400">Equivalent to {(Number(getHectares()) * 10000).toLocaleString()} Square Meters / {(Number(getHectares()) * 2.471).toFixed(3)} Acres</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: DILRMP */}
        {tab === 'dilrmp' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
              <Database className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Digital India Land Records Modernization Programme (DILRMP) Gateway</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated ingestion pipeline syncing historical Jamabandi, Khatiyan, and 7/12 records into state revenue databases with cryptographic validation and 14-digit ULPIN pre-allocation.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
