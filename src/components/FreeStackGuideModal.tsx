import React from 'react';
import { X, Zap, Cloud, Database, Cpu, Globe, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

interface FreeStackGuideModalProps {
  onClose: () => void;
}

export const FreeStackGuideModal: React.FC<FreeStackGuideModalProps> = ({ onClose }) => {
  const freeServices = [
    {
      category: 'Frontend & UI Hosting',
      provider: 'Vercel / Cloudflare Pages',
      quota: '100% Free, Unlimited Requests, 100GB Bandwidth/mo, Free SSL, Custom Domains',
      bestFor: 'React 18, Vite, Next.js, Tailwind CSS, PWA mobile web apps',
      url: 'https://vercel.com'
    },
    {
      category: 'Backend REST & WebSocket API',
      provider: 'Render.com / Fly.io',
      quota: '750 Free Instance Hours/month, Free SSL, Git auto-deploy',
      bestFor: 'Python FastAPI, Node.js Express, NestJS, Uvicorn asynchronous servers',
      url: 'https://render.com'
    },
    {
      category: 'Relational Database & Vector DB',
      provider: 'Supabase / Neon Postgres',
      quota: '500MB PostgreSQL DB, pgvector Extension, 1GB File Storage, 50k Free MAU Auth',
      bestFor: 'Relational schemas, geospatial data with PostGIS, RAG vector embeddings',
      url: 'https://supabase.com'
    },
    {
      category: 'NoSQL & Realtime Storage',
      provider: 'MongoDB Atlas / Firebase',
      quota: '512MB M0 Free Cluster / 1GB Firestore with realtime listener events',
      bestFor: 'Unstructured IoT sensor readings, document archives, and chat rooms',
      url: 'https://www.mongodb.com/cloud/atlas'
    },
    {
      category: 'Ultra-Fast Free AI & LLM Inference',
      provider: 'Groq Cloud & Google Gemini API',
      quota: '30 req/min for Llama-3-70B, 15 RPM for Gemini 1.5 Flash (1M Token Context)',
      bestFor: 'Zero-cost RAG chatbots, OCR text extraction, automated summarization',
      url: 'https://console.groq.com'
    },
    {
      category: 'Free Maps, GIS & Spatial Tiles',
      provider: 'Leaflet.js + OpenStreetMap / Carto',
      quota: '100% Free Open Source Tiles with zero credit card or billing requirements',
      bestFor: 'Land records, disaster zone maps, vehicle GPS tracking, drone imagery polygons',
      url: 'https://leafletjs.com'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                SIH 2026 Zero-Cost Tech Stack & Free Hosting Blueprint
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complete guide to building, hosting, and demonstrating hackathon applications without spending a rupee.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Free Tier Services Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Recommended 100% Free Services for Hackathon Prototypes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {freeServices.map((srv, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-2 hover:border-brand-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      <span>{srv.category}</span>
                      <a href={srv.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline flex items-center gap-1 font-semibold">
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {srv.provider}
                    </h4>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                      🎁 {srv.quota}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>Best For:</strong> {srv.bestFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 36-Hour Hackathon Execution Strategy */}
          <div className="bg-brand-50/50 dark:bg-brand-950/30 p-5 rounded-2xl border border-brand-200 dark:border-brand-800 space-y-3">
            <h3 className="text-sm font-bold text-brand-950 dark:text-brand-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>36-Hour Winning SIH Sprint Strategy</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-700 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">Hour 0 - 8 (Scaffolding):</strong>
                Initialize Git repository, configure Vite + Tailwind frontend, setup FastAPI backend skeleton, initialize Supabase DB tables.
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">Hour 8 - 20 (Core Logic & AI):</strong>
                Implement domain algorithms, integrate Groq/Gemini free AI models, build dashboard visualizations & map layers.
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">Hour 20 - 30 (Free Deployment):</strong>
                Deploy frontend to Vercel and backend to Render. Verify mobile compatibility and test live API endpoints.
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">Hour 30 - 36 (PPT & Jury Demo):</strong>
                Format 5-slide PPT strictly following official format, seed realistic test data, record backup video walkthrough.
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            Got It, Let&apos;s Build!
          </button>
        </div>

      </div>
    </div>
  );
};
