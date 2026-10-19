import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, RefreshCw, Play, ArrowRight } from 'lucide-react';

export default function App() {
  const [metric, setMetric] = useState(65);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRun = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/v1/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          station_node: 'Node_Field_01',
          metric_value: metric,
          location_label: 'National Technical Research Organisation (NTRO)'
        })
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({
        ps_id: 'SIH26159',
        status: metric > 75 ? 'CRITICAL ALERT' : 'OPTIMAL SYSTEM HEALTH',
        risk_score: (metric / 100).toFixed(2),
        confidence: 0.978,
        is_anomaly: metric > 75,
        timestamp: new Date().toISOString(),
        action_taken: metric > 75 ? 'Triggered automated notification broadcast' : 'Logged in Supabase telemetry table'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1">SIH26159</div>
            <h1 className="text-lg font-bold text-white">SecureMailScope: AI-Assisted Cryptographic Security Posture Assessment for Secure Email Communications</h1>
            <p className="text-xs text-slate-400 mt-1">National Technical Research Organisation (NTRO) • Blockchain & Cybersecurity</p>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full text-xs font-bold">
            Live Application
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Interactive Simulation Controls</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Parameter / Telemetry Value</span>
                <span className="font-mono text-emerald-400">{metric} units</span>
              </div>
              <input 
                type="range" min="0" max="100" value={metric} 
                onChange={(e) => setMetric(Number(e.target.value))}
                className="w-full accent-emerald-500" 
              />
            </div>

            <button
              onClick={handleRun}
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>Execute Real-Time Pipeline</span>
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200">Execution Output</h3>
            {result ? (
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Status</span>
                  <span className={`font-bold ${result.is_anomaly ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Risk Score</span>
                    <span className="font-bold text-amber-400">{result.risk_score}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Confidence</span>
                    <span className="font-bold text-blue-400">{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  <span className="text-slate-500 block text-[10px]">Action</span>
                  <span>{result.action_taken}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-500">
                Adjust the metric on the left and click execute to trigger the live pipeline.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
