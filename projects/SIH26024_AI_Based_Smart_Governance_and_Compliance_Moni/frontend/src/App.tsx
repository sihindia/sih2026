import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Wind, 
  Layers, 
  Droplet, 
  Sparkles, 
  FileText, 
  Building2, 
  Lock,
  ArrowRight
} from 'lucide-react';
import recordsData from './data/compliance_records.json';
import violationsData from './data/inspection_violations.json';

export default function App() {
  const [records, setRecords] = useState(recordsData);
  const [selectedMine, setSelectedMine] = useState(recordsData[0]);
  const [violations, setViolations] = useState(violationsData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>MINISTRY OF COAL • CIL SMART GOVERNANCE • SIH26024</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI-Based Smart Governance & Compliance Monitoring System for Coal Mines
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Statutory DGMS Safety Auditing, SPCB Environmental Quality Telemetry & Blockchain Action Log
            </p>
          </div>

          <span className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>DGMS Governance Audit: Online</span>
          </span>
        </header>

        {/* Mines Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>⛏️ MONITORED COAL MINE SITES ({records.length} MINING LEASES)</span>
            <span>Click mine to inspect compliance health</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {records.map((m) => {
              const isWatch = m.statutory_status.includes('WATCHLIST');
              return (
                <button
                  key={m.mine_id}
                  onClick={() => setSelectedMine(m)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedMine.mine_id === m.mine_id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md ring-1 ring-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{m.mine_id}</span>
                      <h3 className="font-bold text-xs text-white mt-0.5">{m.mine_name}</h3>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.location}</div>
                    </div>
                    <span className={`font-mono text-xs font-bold px-2 py-1 rounded border ${
                      isWatch ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-slate-950 text-emerald-400 border-slate-800'
                    }`}>
                      {m.dgms_safety_score}% DGMS
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                    <span>Air: {m.pm10_air_quality_ug_m3} µg/m³</span>
                    <span className={isWatch ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {m.open_violations_count} Open Violations
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Selected Mine Environmental & Safety Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{selectedMine.subsidiary}</span>
                  <h3 className="font-bold text-sm text-white mt-0.5">{selectedMine.mine_name}</h3>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                  Audit: {selectedMine.last_dgms_audit}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">PM10 DUST</span>
                  <span className="text-base font-black text-amber-400">{selectedMine.pm10_air_quality_ug_m3} µg/m³</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Limit: 100 µg/m³</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">EFFLUENT pH</span>
                  <span className="text-base font-black text-emerald-400">{selectedMine.effluent_ph}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Neutral (6.5-8.5)</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">SLOPE RADAR</span>
                  <span className="text-xs font-black text-cyan-400 mt-1 block truncate">{selectedMine.slope_stability_radar}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Real-time Telemetry</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Statutory Explosive & Environmental Clearances:</span>
                <p className="text-slate-300 text-[11px]">PESO License: {selectedMine.explosive_magazine_license} • DGMS Audit Compliant</p>
              </div>
            </div>
          </div>

          {/* Right 5: Violations & Corrective Action Tracker */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Statutory Safety Violations & Escalations</span>
              </h4>

              <div className="space-y-3">
                {violations.map((v) => (
                  <div key={v.violation_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[10px] text-amber-400 font-bold">{v.violation_id}</span>
                        <div className="font-bold text-white text-xs mt-0.5">{v.category}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {v.severity.split('_')[0]}
                      </span>
                    </div>

                    <p className="text-slate-400 text-[11px] leading-relaxed">{v.corrective_action}</p>

                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>Deadline: {v.deadline}</span>
                      <span className="text-emerald-400">{v.status}</span>
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
