import React, { useState } from 'react';
import { 
  Pickaxe, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Building2, 
  Database, 
  ShieldCheck, 
  Activity,
  ArrowRight
} from 'lucide-react';
import subData from './data/cil_subsidiaries.json';
import inqData from './data/parliamentary_inquiries.json';

export default function App() {
  const [subsidiaries, setSubsidiaries] = useState(subData);
  const [selectedSub, setSelectedSub] = useState(subData[0]);
  const [inquiries, setInquiries] = useState(inqData);
  const [selectedInq, setSelectedInq] = useState(inqData[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
              <Pickaxe className="w-4 h-4 text-amber-400" />
              <span>MINISTRY OF COAL • COAL INDIA LIMITED (CIL) & CMPDI • SIH26023</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI-Powered Geological, Mining & Statutory Reporting Solution
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated Production Synthesis, Overburden Stripping Analytics & Parliamentary Query Assistant
            </p>
          </div>

          <span className="px-4 py-2 bg-amber-950 text-amber-300 border border-amber-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CMPDI AI Engine: Active</span>
          </span>
        </header>

        {/* Subsidiaries Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>🏭 CIL SUBSIDIARIES & MINING COMMAND AREAS ({subsidiaries.length} COMMANDS)</span>
            <span>Click subsidiary to inspect production stats</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {subsidiaries.map((s) => (
              <button
                key={s.subsidiary_code}
                onClick={() => setSelectedSub(s)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedSub.subsidiary_code === s.subsidiary_code
                    ? 'bg-amber-950/60 border-amber-500 text-white shadow-md ring-1 ring-amber-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{s.subsidiary_code}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{s.name.split(' ')[0]} {s.name.split(' ')[1]}</h3>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                    {s.target_achievement_pct}%
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Prod: {s.raw_coal_production_mt} MT</span>
                  <span className="text-amber-300 font-bold">OBR: {s.obr_stripping_mm3} Mm³</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Selected Subsidiary Production & Geological Profile */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{selectedSub.subsidiary_code} • {selectedSub.name}</span>
                  <h3 className="font-bold text-sm text-white mt-0.5">{selectedSub.flagship_mine}</h3>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  {selectedSub.active_boreholes} Active Boreholes
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">RAW COAL</span>
                  <span className="text-base font-black text-emerald-400">{selectedSub.raw_coal_production_mt} MT</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Target: {selectedSub.annual_target_mt} MT</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">OBR STRIPPING</span>
                  <span className="text-base font-black text-amber-400">{selectedSub.obr_stripping_mm3} Mm³</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Overburden Ex.</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">GCV GRADE</span>
                  <span className="text-xs font-black text-cyan-400 mt-1 block truncate">{selectedSub.gcv_grade.split(' ')[0]}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Gross Calorific</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">SAFETY INCIDENTS</span>
                  <span className="text-base font-black text-emerald-400">{selectedSub.safety_incident_rate}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Per M-Tonnes</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Logistics & Evacuation Infrastructure:</span>
                <p className="text-slate-300 text-[11px]">{selectedSub.dispatch_mode}</p>
              </div>
            </div>
          </div>

          {/* Right 5: Parliamentary Query Assistant */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>AI Parliamentary Query Fast-Response Assistant</span>
              </h4>

              <div className="space-y-2">
                {inquiries.map((q) => (
                  <button
                    key={q.inquiry_id}
                    onClick={() => setSelectedInq(q)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all ${
                      selectedInq.inquiry_id === q.inquiry_id
                        ? 'bg-amber-950/60 border-amber-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-amber-400 font-bold">{q.inquiry_id} ({q.house})</span>
                      <span className="text-emerald-400 font-bold">{(q.confidence_score * 100).toFixed(1)}% Conf</span>
                    </div>
                    <div className="font-bold text-xs text-white mt-1 line-clamp-1">{q.subject}</div>
                  </button>
                ))}
              </div>

              {/* Drafted Response Card */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1">
                  <span>AI DRAFTED MINISTERIAL REPLY</span>
                  <span className="text-emerald-400">{selectedInq.status}</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">{selectedInq.ai_drafted_response}</p>
                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                  Sources Verified: {selectedInq.data_sources_verified.join(', ')}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
