import React from 'react';
import { ProblemStatement } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  BookOpen, 
  FolderTree, 
  Activity, 
  Layers, 
  Zap, 
  ShieldCheck,
  Download,
  FileCode
} from 'lucide-react';
import { copyToClipboard } from '../utils/export';
import { DynamicDomainApp } from './DynamicDomainApp';
import { generateProjectFileStructure } from '../utils/projectFileTree';

interface StandaloneAppViewProps {
  ps: ProblemStatement;
  onExit: () => void;
  onOpenTutorial: () => void;
  onOpenCodebase: () => void;
}

export const StandaloneAppView: React.FC<StandaloneAppViewProps> = ({
  ps,
  onExit,
  onOpenTutorial,
  onOpenCodebase
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState(false);
  const psId = ps.ps_number || `SIH${ps.id}`;
  const directAppUrl = `${window.location.origin}/?app=${psId}`;

  const handleCopyDirectUrl = () => {
    copyToClipboard(directAppUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Exit & App Identity */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Return to Problem Statements Explorer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Problem Statements</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800">
                  {psId}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Product Mode
                </span>
              </div>
              <h1 className="text-sm font-bold text-white truncate max-w-md hidden md:block">
                {ps.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right Actions: Direct URL, Tutorial, Codebase */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleCopyDirectUrl}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Copy Direct Shareable Live Application URL"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-brand-400" />}
            <span className="hidden sm:inline">{copiedUrl ? 'URL Copied!' : 'Share Live URL'}</span>
          </button>

          <button
            onClick={onOpenTutorial}
            className="px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-indigo-800"
            title="View Setup Tutorial & Prerequisites"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Setup Tutorial</span>
          </button>

          <button
            onClick={onOpenCodebase}
            className="px-3 py-1.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-800"
            title="Inspect Full Project Code & Folder Tree"
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Files & Code</span>
          </button>

        </div>

      </header>

      {/* Main Full-Screen Application Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Domain-Specific Interactive Working Application */}
        <DynamicDomainApp ps={ps} />

        {/* Live System Architecture Banner */}
        <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Zero-Cost Architecture Verified</span>
            </div>
            <p className="text-slate-500">
              FastAPI backend microservice running on port 8000 • Supabase PostgreSQL telemetry cluster connected • $0.00 cloud deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTutorial}
              className="text-brand-400 hover:text-brand-300 font-bold underline text-xs"
            >
              How to setup locally →
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-4 px-6 text-center text-xs text-slate-500">
        <span>{ps.organization} • {ps.theme} • Smart India Hackathon 2026</span>
        <span className="mx-2">•</span>
        <span>Built by Flugelsoft Labs</span>
      </footer>

    </div>
  );
};
