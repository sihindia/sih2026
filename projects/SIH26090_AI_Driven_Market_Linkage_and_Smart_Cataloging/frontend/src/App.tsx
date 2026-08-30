import React, { useState } from 'react';
import { 
  Palette, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Mic, 
  Camera, 
  RefreshCw, 
  ShoppingBag, 
  Scale, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

import casesData from './data/artisan_catalog_showcase_cases.json';
import nlpData from './data/voice_to_catalog_nlp_profiles.json';
import pricingData from './data/dynamic_fair_pricing_models.json';
import statsData from './data/shilpsetu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(casesData[0]);
  const [nlp, setNlp] = useState(nlpData);
  const [pricing, setPricing] = useState(pricingData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'cases' | 'studio' | 'pricing' | 'marketplaces' | 'stats'>('cases');

  // Interactive Voice-to-Catalog Studio Simulator
  const [isProcessing, setIsProcessing] = useState(false);
  const [catalogResult, setCatalogResult] = useState<any>({
    catalogTitle: "Heritage Handwoven Banarasi Katan Silk Saree with Kadwa Zari Brocade",
    studioStatus: "Loom background removed; 4K neutral studio lighting calibrated",
    fairPrice: "₹12,500.00 (Guaranteed direct payout to artisan)",
    middlemanSaved: "₹8,000 middleman commission eliminated (Traders previously paid ₹4,500)"
  });

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setCatalogResult({
        catalogTitle: "Heritage Handwoven Banarasi Katan Silk Saree with Kadwa Zari Brocade",
        studioStatus: "Loom background removed; 4K neutral studio lighting calibrated",
        fairPrice: "₹12,500.00 (Guaranteed direct payout to artisan)",
        middlemanSaved: "₹8,000 middleman commission eliminated (Traders previously paid ₹4,500)"
      });
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-rose-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold tracking-wider">
              <Palette className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MOSJE • SHILPSETU 360 AI SMART CATALOGING & MARKET LINKAGE • SIH26090</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSJE ShilpSetu: AI-Driven Market Linkage & Smart Cataloging Mobile App for Marginalized Artisans
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              AI Photo Studio Background Remover, Multilingual Voice-to-Catalog NLP Generator & Dynamic Fair-Pricing Assistant for Grassroots Craftsmen
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-rose-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cases', label: '🎨 Artisan Catalogs', count: cases.length },
            { id: 'studio', label: '🎙️ Voice-to-Catalog Studio' },
            { id: 'pricing', label: '⚖️ Dynamic Fair Pricing', count: pricing.length },
            { id: 'marketplaces', label: '🛒 GeM & B2B Linkages' },
            { id: 'stats', label: '📊 ShilpSetu Telemetry' }
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
            VIEW 1: CASES
           ========================================================================= */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cases.map((c) => (
                <button
                  key={c.product_id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCase.product_id === c.product_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg ring-2 ring-rose-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-rose-400">{c.product_id}</span>
                    <span className="text-emerald-400">₹{c.suggested_fair_price_inr.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.craft_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.artisan_name}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Labor: {c.labor_hours} Hours</span>
                    <span className="text-emerald-400">{c.gi_tag_status.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-rose-400 font-bold">{selectedCase.product_id} • {selectedCase.cluster_location}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCase.craft_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCase.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-rose-400 block text-[9px] font-bold uppercase">ARTISAN VOICE INPUT & AI STUDIO ENHANCEMENT:</span>
                  <div className="text-amber-300 font-sans text-xs italic">
                    Artisan Voice Note: "{selectedCase.artisan_voice_input}"
                  </div>
                  <div className="text-white font-sans text-xs pt-1 border-t border-slate-900">
                    Generated E-Commerce Listing: <strong className="text-rose-300">{selectedCase.ai_generated_catalog_title}</strong>
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Studio Clean: {selectedCase.ai_studio_enhancement}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    Costing: Raw Materials: ₹{selectedCase.raw_material_cost_inr.toLocaleString()} + Labor ({selectedCase.labor_hours}h): ₹{selectedCase.labor_fair_compensation_inr.toLocaleString()} ➔ Suggested Fair Price: <strong className="text-white">₹{selectedCase.suggested_fair_price_inr.toLocaleString()}</strong>
                  </div>
                  <div className="text-amber-300 font-sans text-[11px]">
                    Anti-Exploitation: {selectedCase.traditional_middleman_cut}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">DIRECT ARTISAN PAYOUT</span><span className="text-emerald-400 font-bold">₹{selectedCase.suggested_fair_price_inr.toLocaleString()}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">AUTHENTICATION PROVENANCE</span><span className="text-rose-400 font-bold">{selectedCase.gi_tag_status.split(' ')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('studio')}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Launch AI Photo Studio & Voice-to-Catalog Converter ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Smart Voice Cataloger Engine</span>
                  </h4>
                  <form onSubmit={handleProcess} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Artisan & Craft Domain</label>
                      <input type="text" readOnly value={`${selectedCase.artisan_name} (${selectedCase.craft_domain})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-rose-400" />
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>{isProcessing ? 'Transcribing & Generating 4K Studio Shot...' : 'Digitize Craft Inventory'}</span>
                    </button>
                  </form>
                  {catalogResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>E-Commerce Title: <strong className="text-rose-300 font-mono text-xs">{catalogResult.catalogTitle}</strong></div>
                      <div>Studio Enhancement: <strong className="text-cyan-300 font-mono text-xs">{catalogResult.studioStatus}</strong></div>
                      <div>Fair Price: <strong className="text-emerald-400 font-mono text-xs">{catalogResult.fairPrice}</strong></div>
                      <div>Savings: <strong className="text-amber-300 font-mono text-xs block mt-0.5">{catalogResult.middlemanSaved}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STUDIO */}
        {tab === 'studio' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <Camera className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">AI Studio & Multilingual Voice-to-Catalog Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Transforms cluttered, rustic smartphone photos into professional e-commerce white-background catalog shots in seconds, while converting dialect speech notes into SEO-rich English product descriptions.
            </p>
          </div>
        )}

        {/* VIEW 3: PRICING */}
        {tab === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {pricing.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold">{p.weight}</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.cost_component}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: MARKETPLACES */}
        {tab === 'marketplaces' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-rose-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
              <ShoppingBag className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Year-Round Direct B2B & Government e-Marketplace (GeM)</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Links rural craft clusters directly with institutional procurement, Dilli Haat, Tribes India, and corporate bulk gifting programs, ending their sole reliance on annual seasonal physical exhibitions.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
