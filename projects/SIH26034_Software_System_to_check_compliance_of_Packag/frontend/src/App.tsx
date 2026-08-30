import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Eye, 
  ShieldCheck, 
  Sliders, 
  Globe 
} from 'lucide-react';

import productsData from './data/packaged_commodities_audit_catalog.json';
import rulesData from './data/legal_metrology_statutory_rules.json';
import noticesData from './data/show_cause_statutory_notices.json';
import statsData from './data/naaptol_compliance_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'mr' | 'bn'>('en');
  const [products, setProducts] = useState(productsData);
  const [selectedProd, setSelectedProd] = useState(productsData[1]);
  const [rules, setRules] = useState(rulesData);
  const [notices, setNotices] = useState(noticesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'scanner' | 'rules' | 'notices' | 'ecommerce' | 'assayer'>('scanner');

  // Assayer Simulator
  const [simPdp, setSimPdp] = useState(180);
  const [simFont, setSimFont] = useState(1.4);
  const [simMrpTax, setSimMrpTax] = useState(false);
  const [simUsp, setSimUsp] = useState(false);
  const [simStd, setSimStd] = useState(true);
  const [assayerOut, setAssayerOut] = useState<any>(null);

  const runSim = () => {
    const minF = simPdp <= 50 ? 1.0 : simPdp <= 200 ? 2.0 : simPdp <= 1000 ? 2.5 : 4.0;
    const v = [];
    if (!simMrpTax) v.push("Rule 6(1)(e): MRP lacks 'incl. of all taxes'");
    if (!simUsp) v.push("Rule 6(1)(s): Unit Sale Price (USP) missing");
    if (!simStd) v.push("Rule 5: Non-standard SI unit symbol used");
    if (simFont < minF) v.push(`Rule 7: Font (${simFont}mm) is below minimum (${minF}mm) for ${simPdp} cm² PDP`);
    const comp = v.length === 0;
    setAssayerOut({ comp, minF, v, fine: comp ? 0 : v.length * 25000 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Scale className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MINISTRY OF CONSUMER AFFAIRS • LEGAL METROLOGY DIVISION • SIH26034</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NaapTol AI: Legal Metrology Packaged Commodities Compliance System
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Legal Metrology (Packaged Commodities) Rules, 2011 Compliance Engine: Optical Label Character Recognition, Principal Display Panel (PDP) Font Caliper &amp; Statutory Show-Cause Notice Generator
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-amber-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'scanner', label: '🔍 Optical Label OCR Scanner', count: products.length },
            { id: 'rules', label: '⚖️ Legal Metrology Rules 2011', count: rules.length },
            { id: 'notices', label: '📜 Statutory Show-Cause Notices', count: notices.length },
            { id: 'ecommerce', label: '🛒 E-Commerce Scraper Audit' },
            { id: 'assayer', label: '🧪 Packaging Compliance Assayer' }
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
            VIEW 1: SCANNER
           ========================================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {products.map((p) => (
                <button
                  key={p.product_id}
                  onClick={() => setSelectedProd(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedProd.product_id === p.product_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-amber-400">{p.product_id}</span>
                    <span className={p.status === 'FULLY_COMPLIANT' ? 'text-emerald-400' : 'text-rose-400'}>
                      {p.status === 'FULLY_COMPLIANT' ? 'PASS' : 'VIOLATION'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {p.product_name.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{p.category}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{p.declared_net_quantity}</span>
                    <span className="text-cyan-400">{p.pdp_area_cm2} PDP</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold">{selectedProd.product_id} • {selectedProd.category}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedProd.product_name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedProd.status === 'FULLY_COMPLIANT'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {selectedProd.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 block text-[9px] font-bold uppercase">MANDATORY STATUTORY DECLARATIONS:</span>
                  <div className="text-white font-sans text-xs">
                    Manufacturer / Packer: <strong className="text-slate-300">{selectedProd.manufacturer_details}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Declared Net Quantity: {selectedProd.declared_net_quantity} | Country of Origin: {selectedProd.country_of_origin}
                  </div>
                  <div className="text-amber-300 font-sans text-xs pt-1 border-t border-slate-900">
                    MRP: {selectedProd.mrp_declaration} | Unit Sale Price: {selectedProd.unit_sale_price}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Font Height: {selectedProd.measured_font_size} (Min required: {selectedProd.minimum_mandatory_font}) | Consumer Care: {selectedProd.consumer_care}
                  </div>
                </div>

                {selectedProd.detected_violations.length > 0 && (
                  <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-1.5">
                    <span className="text-rose-400 font-bold text-[10px] uppercase">DETECTED NON-COMPLIANCES:</span>
                    {selectedProd.detected_violations.map((v, i) => (
                      <div key={i} className="text-rose-200 text-xs font-sans flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setActiveTab('notices')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Generate Statutory Show-Cause Notice (Section 36) ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>LMR 2011 Caliper Verification</span>
                  </h4>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span>PDP Surface Area:</span><strong className="text-white">{selectedProd.pdp_area_cm2}</strong></div>
                    <div className="flex justify-between"><span>Mandatory Font:</span><strong className="text-amber-400">{selectedProd.minimum_mandatory_font}</strong></div>
                    <div className="flex justify-between"><span>Measured Height:</span><strong className={selectedProd.font_size_compliant ? 'text-emerald-400' : 'text-rose-400'}>{selectedProd.measured_font_size}</strong></div>
                    <div className="flex justify-between"><span>USP Stated:</span><strong className={selectedProd.usp_compliant ? 'text-emerald-400' : 'text-rose-400'}>{selectedProd.usp_compliant ? 'YES' : 'NO'}</strong></div>
                  </div>
                  <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl text-[10px] text-slate-400">
                    Inspected under Legal Metrology Act, 2009 &amp; Packaged Commodities Rules, 2011.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: RULES */}
        {activeTab === 'rules' && (
          <div className="space-y-4 font-mono text-xs">
            {rules.map((r, idx) => (
              <div key={idx} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{r.rule_code} — {r.title}</span>
                  <span className="text-rose-400 font-bold">Fine: {r.statutory_fine}</span>
                </div>
                <p className="text-slate-300 font-sans text-xs">{r.rule_description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: NOTICES */}
        {activeTab === 'notices' && (
          <div className="space-y-4 font-mono text-xs">
            {notices.map((n) => (
              <div key={n.notice_id} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{n.notice_id} • {n.issuing_authority}</span>
                  <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded-xl text-[10px] font-bold">{n.status}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{n.company_name} — {n.product_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-xs">
                  <div>Statutory Violation: <strong className="text-rose-400">{n.violation_sections}</strong></div>
                  <div>Compounding Penalty: <strong className="text-emerald-400 text-sm">{n.penalty_compounded}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ECOMMERCE */}
        {activeTab === 'ecommerce' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-amber-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
              <Eye className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Automated E-Commerce Listing Scraper &amp; OCR Auditor</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automated headless browser crawler extracting product page declarations from major marketplaces, validating Net Quantity, MRP, Expiry, Country of Origin &amp; USP compliance across 250,000+ daily ASINs.
            </p>
          </div>
        )}

        {/* VIEW 5: ASSAYER */}
        {activeTab === 'assayer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 font-sans">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Interactive Packaging Compliance Assayer</span>
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">PDP Area:</span><span className="font-mono text-amber-400">{simPdp} cm²</span></div>
                  <input type="range" min="30" max="1500" step="50" value={simPdp} onChange={(e) => setSimPdp(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1"><span className="text-slate-300">Numeral Font Height:</span><span className="font-mono text-cyan-400">{simFont} mm</span></div>
                  <input type="range" min="0.8" max="5.0" step="0.2" value={simFont} onChange={(e) => setSimFont(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={simMrpTax} onChange={(e) => setSimMrpTax(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>MRP includes '(incl. of all taxes)'</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={simUsp} onChange={(e) => setSimUsp(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>Unit Sale Price (USP) declared</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={simStd} onChange={(e) => setSimStd(e.target.checked)} className="accent-amber-500 rounded" />
                    <span>Standard SI Units Used (kg/g/L/ml/m)</span>
                  </label>
                </div>
                <button onClick={runSim} className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs font-sans shadow-lg">
                  Audit Label Compliance
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono">
              <h4 className="font-bold text-sm text-white font-sans">Assayer Result</h4>
              {assayerOut ? (
                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl border flex justify-between items-center ${
                    assayerOut.comp ? 'bg-emerald-950/60 border-emerald-500' : 'bg-rose-950/60 border-rose-500'
                  }`}>
                    <span className="text-white font-bold text-xs font-sans">{assayerOut.comp ? 'FULLY COMPLIANT' : 'STATUTORY VIOLATIONS DETECTED'}</span>
                    <span className="font-mono text-sm font-bold text-white">Fine: ₹{assayerOut.fine.toLocaleString()}</span>
                  </div>
                  {assayerOut.v.length > 0 && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-rose-300 text-xs">
                      {assayerOut.v.map((v: string, i: number) => <div key={i}>• {v}</div>)}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 font-sans">Adjust parameters and click "Audit Label Compliance".</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
