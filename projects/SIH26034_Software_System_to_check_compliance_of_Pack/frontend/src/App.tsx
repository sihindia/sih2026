import React, { useState } from 'react';
import { 
  Scan, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Sliders, 
  Search, 
  Scale, 
  Building2, 
  ChevronRight, 
  Printer, 
  Gavel, 
  RefreshCw, 
  QrCode, 
  Camera, 
  Layers, 
  BookOpen, 
  Globe, 
  DollarSign 
} from 'lucide-react';

import productsData from './data/scanned_products.json';
import rulesData from './data/legal_rules.json';
import noticesData from './data/statutory_notices.json';
import auditsData from './data/ecommerce_audits.json';

export default function App() {
  const [products, setProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(productsData[1]); // Violation product
  const [activeTab, setActiveTab] = useState<'scanner' | 'rules' | 'notices' | 'ecommerce' | 'assayer'>('scanner');

  // Custom Assayer State
  const [customName, setCustomName] = useState('Organic Multiflora Honey Glass Jar 500g');
  const [customPDP, setCustomPDP] = useState(150);
  const [hasMrpTax, setHasMrpTax] = useState(false);
  const [hasUSP, setHasUSP] = useState(false);
  const [usesStdUnit, setUsesStdUnit] = useState(true);
  const [measuredFont, setMeasuredFont] = useState(1.4);
  const [assayerResult, setAssayerResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const runAssayer = () => {
    setIsScanning(true);
    setTimeout(() => {
      let minFont = 1.0;
      if (customPDP <= 50) minFont = 1.0;
      else if (customPDP <= 200) minFont = 2.0;
      else if (customPDP <= 1000) minFont = 2.5;
      else minFont = 4.0;

      const violations = [];
      if (!hasMrpTax) violations.push("Rule 6(1)(e): MRP declaration lacks mandatory 'incl. of all taxes' text");
      if (!hasUSP) violations.push("Rule 6(1)(s): Mandatory Unit Sale Price (USP) missing on pre-packaged commodity");
      if (!usesStdUnit) violations.push("Rule 5 & Table-I: Non-standard SI quantity symbol used (e.g. 'gm' instead of 'g')");
      if (measuredFont < minFont) violations.push(`Rule 7 & Table-II: Font height (${measuredFont}mm) is below statutory minimum (${minFont}mm) for ${customPDP} sq.cm PDP`);

      const isComp = violations.length === 0;
      setAssayerResult({
        name: customName,
        pdp: customPDP,
        minFont,
        measuredFont,
        isComp,
        violations,
        penalty: isComp ? 0 : violations.length * 25000
      });
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Scale className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) • LEGAL METROLOGY DIVISION • SIH26034</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Legal Metrology (Packaged Commodities) Rules, 2011 Automated Compliance Scanner
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Computer Vision OCR Label Extraction, Principal Display Panel (PDP) Font Caliper & Statutory Show-Cause Generator
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-amber-950/80 text-amber-300 border border-amber-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>LMR 2011 Engine Active</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scanner', label: '🔍 OCR Label Scanner & Caliper', count: products.length },
            { id: 'rules', label: '⚖️ LMR 2011 Statutory Rulebook', count: rulesData.length },
            { id: 'notices', label: '📜 Section 18 Show-Cause Notices', count: noticesData.length },
            { id: 'ecommerce', label: '🛒 E-Commerce Compliance Crawler', count: auditsData.length },
            { id: 'assayer', label: '🧪 Interactive Custom Label Assayer' }
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
            VIEW 1: OCR LABEL SCANNER & CALIPER
           ========================================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Scanned Commercial Products Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                <span>📦 AUDITED COMMERCIAL PACKAGED COMMODITIES</span>
                <span className="text-amber-400 font-mono">Select product to inspect label bounding boxes</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {products.map((p) => (
                  <button
                    key={p.product_id}
                    onClick={() => setSelectedProduct(p)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedProduct.product_id === p.product_id
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-1 ring-amber-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-amber-400 font-bold">{p.product_id.split('-')[2]}</div>
                    <div className="text-xs font-bold truncate text-white mt-0.5">{p.brand_name}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{p.category}</div>
                    <div className="mt-2 text-[10px] flex justify-between font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className={p.compliance_status === 'FULLY_COMPLIANT' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {p.compliance_status === 'FULLY_COMPLIANT' ? '✓ Compliant' : `✗ ${p.violation_count} Violations`}
                      </span>
                      <span className="text-slate-400">{p.pdp_area_sq_cm} cm²</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Simulated OCR Label Bounding Box Inspector */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{selectedProduct.product_id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 font-mono">
                          {selectedProduct.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white mt-1">{selectedProduct.brand_name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{selectedProduct.manufacturer}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                      selectedProduct.compliance_status === 'FULLY_COMPLIANT'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}>
                      {selectedProduct.compliance_status}
                    </span>
                  </div>

                  {/* Simulated Label Box Visualizer */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="text-slate-400 font-bold text-[10px] uppercase flex justify-between">
                      <span>PRINCIPAL DISPLAY PANEL (PDP) OCR BOUNDING BOXES:</span>
                      <span className="text-amber-400 font-mono">Area: {selectedProduct.pdp_area_sq_cm} cm²</span>
                    </div>

                    {/* Bounding Box 1: MRP */}
                    <div className={`p-3 rounded-xl border flex justify-between items-center ${
                      selectedProduct.mrp_format_compliant
                        ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-600 text-rose-300 ring-1 ring-rose-500'
                    }`}>
                      <div>
                        <span className="text-[9px] uppercase font-bold block text-slate-400">Rule 6(1)(e) • Maximum Retail Price:</span>
                        <span className="font-bold text-sm text-white">{selectedProduct.mrp_format_text}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        selectedProduct.mrp_format_compliant ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-900 text-rose-200'
                      }`}>
                        {selectedProduct.mrp_format_compliant ? 'VALID FORMAT' : 'TAX TEXT MISSING'}
                      </span>
                    </div>

                    {/* Bounding Box 2: Unit Sale Price (USP) */}
                    <div className={`p-3 rounded-xl border flex justify-between items-center ${
                      selectedProduct.unit_sale_price_compliant
                        ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-600 text-rose-300 ring-1 ring-rose-500'
                    }`}>
                      <div>
                        <span className="text-[9px] uppercase font-bold block text-slate-400">Rule 6(1)(s) • Unit Sale Price (USP):</span>
                        <span className="font-bold text-sm text-white">{selectedProduct.unit_sale_price_declared}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        selectedProduct.unit_sale_price_compliant ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-900 text-rose-200'
                      }`}>
                        {selectedProduct.unit_sale_price_compliant ? 'USP COMPLIANT' : 'MISSING (RULE 6(1)(s))'}
                      </span>
                    </div>

                    {/* Bounding Box 3: Net Qty & Font Height */}
                    <div className={`p-3 rounded-xl border flex justify-between items-center ${
                      selectedProduct.font_height_compliant && selectedProduct.standard_unit_verified
                        ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-600 text-rose-300 ring-1 ring-rose-500'
                    }`}>
                      <div>
                        <span className="text-[9px] uppercase font-bold block text-slate-400">Rule 6(1)(c) & Rule 7 • Net Quantity & Font Caliper:</span>
                        <span className="font-bold text-sm text-white">{selectedProduct.declared_net_quantity} (Height: {selectedProduct.numeral_font_height_mm}mm)</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        selectedProduct.font_height_compliant && selectedProduct.standard_unit_verified ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-900 text-rose-200'
                      }`}>
                        {selectedProduct.font_height_compliant ? `≥ ${selectedProduct.min_required_font_height_mm}mm Pass` : `Under-sized (<${selectedProduct.min_required_font_height_mm}mm)`}
                      </span>
                    </div>

                    {/* Bounding Box 4: Consumer Care */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-slate-300">
                      <div>
                        <span className="text-[9px] uppercase font-bold block text-slate-400">Rule 6(1)(j) • Consumer Care Helpline:</span>
                        <span className="text-white text-xs">{selectedProduct.consumer_care_details}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5: Violations & Statutory Action Ledger */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Gavel className="w-4 h-4 text-amber-400" />
                      <span>Legal Metrology Audit Findings</span>
                    </h4>
                    <span className="font-mono text-[10px] text-amber-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      {selectedProduct.audit_timestamp}
                    </span>
                  </div>

                  {selectedProduct.violations.length > 0 ? (
                    <div className="space-y-3 font-mono">
                      <div className="p-3 bg-rose-950/30 border border-rose-800/80 rounded-2xl space-y-2">
                        <span className="text-rose-400 font-bold text-[10px] uppercase block">STATUTORY VIOLATIONS IDENTIFIED:</span>
                        {selectedProduct.violations.map((v: string, idx: number) => (
                          <div key={idx} className="p-2 bg-slate-950 rounded-xl text-rose-200 text-[11px] leading-snug border border-rose-950">
                            <strong>Violation #{idx + 1}:</strong> {v}
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl space-y-1">
                        <div className="flex justify-between text-amber-300 font-bold text-xs">
                          <span>RECOMMENDED ENFORCEMENT ACTION:</span>
                          <span>SECTION 18 NOTICE</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-sans">
                          Issue Show-Cause notice under Section 18 of LM Act, 2009 with compounding penalty ₹{selectedProduct.violation_count * 25000}.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab('notices')}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generate Section 18 Show-Cause Notice</span>
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 font-sans space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="font-bold text-white text-sm">All Declarations Verified Compliant</h4>
                      <p className="text-xs text-slate-400">
                        Product bears all 8 mandatory declarations in compliance with Legal Metrology (Packaged Commodities) Rules, 2011.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: LMR 2011 STATUTORY RULEBOOK
           ========================================================================= */}
        {activeTab === 'rules' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-amber-500/40 pb-4">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">LEGAL METROLOGY ACT, 2009 • STATUTORY PROVISIONS</span>
                <h2 className="text-xl font-black text-white font-sans mt-0.5">Packaged Commodities Rules, 2011 Checklist</h2>
                <p className="text-slate-400 text-[11px]">Mandatory Declarations, Font Height Standards & Statutory Penalties</p>
              </div>
              <BookOpen className="w-10 h-10 text-amber-400" />
            </div>

            <div className="space-y-3">
              {rulesData.map((r) => (
                <div key={r.rule_no} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-bold">{r.rule_no} • {r.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">Fine: {r.penalty_first_offence}</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SECTION 18 SHOW-CAUSE NOTICES
           ========================================================================= */}
        {activeTab === 'notices' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-amber-500/40 pb-4">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">GOVERNMENT OF INDIA • CONTROLLER OF LEGAL METROLOGY</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Statutory Show-Cause Notice Under Section 18</h3>
                <p className="text-slate-400 text-[11px]">Compounding & Prosecution Order Management</p>
              </div>
              <Gavel className="w-10 h-10 text-amber-400" />
            </div>

            <div className="space-y-4">
              {noticesData.map((n) => (
                <div key={n.notice_id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-amber-400 font-bold">{n.notice_id}</span>
                      <h4 className="font-bold text-white font-sans text-sm mt-0.5">To: {n.violator_company}</h4>
                      <div className="text-slate-400 text-[11px]">Product: {n.product_name}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      {n.status}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>Section:</strong> <span className="text-amber-400">{n.section_invoked}</span></div>
                    <div><strong>Authority:</strong> {n.issued_by}</div>
                    <div><strong>Compounding Option:</strong> {n.compounding_provision}</div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                    <span className="text-rose-400 font-bold">Proposed Penalty: ₹{n.penalty_proposed_inr.toLocaleString()}</span>
                    <button onClick={() => alert(`Notice ${n.notice_id} PDF exported.`)} className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Export Official PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: E-COMMERCE ONLINE CRAWLER
           ========================================================================= */}
        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {auditsData.map((a) => (
                <div key={a.portal} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-white font-sans">{a.portal}</h4>
                      <div className="text-slate-400 text-[10px] truncate">{a.listing_url}</div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                    <div className="font-bold text-white font-sans">{a.product}</div>
                    <div className="text-amber-400 font-bold">Score: {a.compliance_score}</div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-900">Action: {a.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: INTERACTIVE CUSTOM LABEL ASSAYER
           ========================================================================= */}
        {activeTab === 'assayer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Custom Label OCR & Caliper Simulator</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Product Description</label>
                  <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs" />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">PDP Area (sq.cm)</span><span className="font-mono text-amber-400">{customPDP} cm²</span></div>
                  <input type="range" min="30" max="1200" step="10" value={customPDP} onChange={(e) => setCustomPDP(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Measured Numeral Font Height (mm)</span><span className="font-mono text-cyan-400">{measuredFont} mm</span></div>
                  <input type="range" min="0.8" max="5.0" step="0.1" value={measuredFont} onChange={(e) => setMeasuredFont(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={hasMrpTax} onChange={(e) => setHasMrpTax(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>Includes "(incl. of all taxes)" alongside MRP</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={hasUSP} onChange={(e) => setHasUSP(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>Unit Sale Price (USP) declared</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input type="checkbox" checked={usesStdUnit} onChange={(e) => setUsesStdUnit(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>Uses standard SI units ('g' / 'kg' / 'L')</span>
                  </label>
                </div>

                <button onClick={runAssayer} disabled={isScanning} className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                  <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Evaluating LMR 2011 Rules...' : 'Execute Legal Metrology Inspection'}</span>
                </button>
              </div>
            </div>

            {/* Assayer Result Output */}
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
              <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Statutory Compliance Evaluation</span>
              </h4>

              {assayerResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                      <span className="text-slate-500 block text-[9px]">MIN REQUIRED FONT</span>
                      <span className="text-2xl font-black text-amber-400">≥ {assayerResult.minFont} mm</span>
                    </div>
                    <div className={`p-3 bg-slate-950 rounded-2xl border ${assayerResult.isComp ? 'border-emerald-950' : 'border-rose-950'}`}>
                      <span className="text-slate-500 block text-[9px]">STATUTORY VERDICT</span>
                      <span className={`text-xl font-black ${assayerResult.isComp ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {assayerResult.isComp ? 'COMPLIANT' : 'VIOLATION'}
                      </span>
                    </div>
                  </div>

                  {assayerResult.violations.length > 0 ? (
                    <div className="p-4 bg-rose-950/30 border border-rose-800 rounded-2xl space-y-1.5 text-rose-200 text-[11px]">
                      <span className="font-bold uppercase text-[9px] text-rose-400">VIOLATIONS:</span>
                      {assayerResult.violations.map((v: string, i: number) => (
                        <div key={i}>• {v}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-emerald-300 text-[11px]">
                      ✓ Product satisfies all Legal Metrology (Packaged Commodities) Rules, 2011 criteria.
                    </div>
                  )}

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">Compounding Penalty</span>
                      <span className="text-lg font-black text-white">₹{assayerResult.penalty.toLocaleString()}</span>
                    </div>
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                      Audited
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 font-sans space-y-2">
                  <Scan className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click "Execute Legal Metrology Inspection" to audit label.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
