import os

# 1. Update src/components/PSCard.tsx
with open('src/components/PSCard.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React from 'react';
import { 
  Bookmark, 
  Scale, 
  Building, 
  ArrowRight, 
  Copy, 
  Check, 
  Zap
} from 'lucide-react';
import { ProblemStatement } from '../types';
import { copyToClipboard } from '../utils/export';

interface PSCardProps {
  ps: ProblemStatement;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (id: string) => void;
  onSelect: (ps: ProblemStatement) => void;
  onLaunchApp?: (ps: ProblemStatement) => void;
  searchQuery?: string;
}

export const PSCard: React.FC<PSCardProps> = ({
  ps,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onSelect,
  onLaunchApp,
  searchQuery
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(ps.ps_number || ps.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLaunchApp) onLaunchApp(ps);
  };

  const cleanDesc = ps.sections?.description || ps.description;
  const previewText = cleanDesc.length > 200 ? cleanDesc.slice(0, 200) + '...' : cleanDesc;

  return (
    <div 
      onClick={() => onSelect(ps)}
      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-400/80 dark:hover:border-brand-600/80 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              title="Click to copy PS Number"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-700 dark:hover:text-brand-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <span>{ps.ps_number || `SIH${ps.id}`}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />}
            </button>

            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
              {ps.category}
            </span>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onToggleCompare(ps.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isCompared
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleFavorite(ps.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? "Remove from bookmarks" : "Bookmark this problem"}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Theme pill */}
        <div className="mb-2.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            {ps.theme}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug mb-2">
          {ps.title}
        </h3>

        {/* Ministry / Org */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{ps.organization}</span>
        </div>

        {/* Description Excerpt */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {previewText}
        </p>

        {/* Tags */}
        {ps.tags && ps.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {ps.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={handleLaunch}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm shadow-amber-500/20 transition-colors"
          title="Launch Full Working Application"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Launch App</span>
        </button>

        <div className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
''')

# 2. Update src/components/PSDetailModal.tsx to add Launch Full App button
with open('src/components/PSDetailModal.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React from 'react';
import { 
  X, 
  Bookmark, 
  Scale, 
  Copy, 
  Check, 
  Download, 
  Building2, 
  Calendar, 
  Tag, 
  Video, 
  Database, 
  ExternalLink, 
  FileText, 
  Edit3, 
  Save, 
  Sparkles,
  Zap,
  Play,
  Cpu,
  Server,
  Layers,
  Code
} from 'lucide-react';
import { ProblemStatement } from '../types';
import { copyToClipboard, generateMarkdownPS, downloadMarkdown } from '../utils/export';
import { generateSolutionBlueprint, generateStarterProjectFiles } from '../utils/solutionGenerator';
import { InteractiveSimulator } from './InteractiveSimulator';

interface PSDetailModalProps {
  ps: ProblemStatement | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (id: string) => void;
  note: string;
  onSaveNote: (id: string, note: string) => void;
  onLaunchApp?: (ps: ProblemStatement) => void;
}

export const PSDetailModal: React.FC<PSDetailModalProps> = ({
  ps,
  onClose,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  note,
  onSaveNote,
  onLaunchApp
}) => {
  const [localNote, setLocalNote] = React.useState(note || '');
  const [noteSaved, setNoteSaved] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(false);
  const [copiedMd, setCopiedMd] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'solution' | 'simulator' | 'starter' | 'notes'>('overview');

  React.useEffect(() => {
    setLocalNote(note || '');
  }, [note, ps?.id]);

  const blueprint = React.useMemo(() => ps ? generateSolutionBlueprint(ps) : null, [ps]);
  const starterFiles = React.useMemo(() => ps ? generateStarterProjectFiles(ps) : null, [ps]);

  if (!ps || !blueprint || !starterFiles) return null;

  const handleSaveNote = () => {
    onSaveNote(ps.id, localNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleCopyId = () => {
    copyToClipboard(ps.ps_number || ps.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownPS(ps, localNote);
    copyToClipboard(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownPS(ps, localNote);
    downloadMarkdown(md, `SIH2026_${ps.ps_number || ps.id}.md`);
  };

  const handleDownloadStarterReadme = () => {
    downloadMarkdown(starterFiles.readme, `README_${ps.ps_number || ps.id}.md`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-start justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
                  title="Click to copy PS ID"
                >
                  <span>{ps.ps_number || `SIH${ps.id}`}</span>
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                </button>

                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {ps.category} Category
                </span>

                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                  {ps.theme}
                </span>

                {onLaunchApp && (
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchApp(ps);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm shadow-amber-500/20 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Full App</span>
                  </button>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {ps.title}
              </h2>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{ps.organization}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Deadline: <strong>{ps.deadline || '20 September 2026'}</strong></span>
                </div>
                <div>
                  <span>Submitted Ideas: <strong>{ps.submitted_ideas || '0/500'}</strong></span>
                </div>
              </div>
            </div>

            {/* Close & Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleCompare(ps.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isCompared
                    ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isCompared ? "Remove from comparison" : "Add to comparison"}
              >
                <Scale className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorite(ps.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isFavorite
                    ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isFavorite ? "Remove from saved" : "Save / Bookmark"}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-200/60 dark:border-slate-800/80 pt-3 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Problem Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'solution'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>🚀 Zero-Cost Solution Blueprint</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>🎮 Live MVP Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('starter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'starter'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Starter Code Kit</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Team Notes {localNote ? '•' : ''}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {ps.tags && ps.tags.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-brand-500" />
                    <span>Relevant Technology Domains</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ps.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ps.sections?.background && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    Background & Context
                  </h4>
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 whitespace-pre-line">
                    {ps.sections.background}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Problem Statement & Objectives
                </h4>
                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 whitespace-pre-line">
                  {ps.sections?.description || ps.description}
                </div>
              </div>

              {ps.sections?.expected_solution && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Expected Solution & Deliverables
                  </h4>
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 whitespace-pre-line">
                    {ps.sections.expected_solution}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-brand-600 to-indigo-700 p-5 rounded-2xl text-white shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-200 mb-1">
                  Custom Full-Stack Architecture Blueprint
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-brand-50">
                  {blueprint.architectureSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand-500" />
                  <span>Free-Tier Hosting & Technology Stack</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">🖥️ Frontend (Free on Vercel):</strong>
                    <span className="text-slate-600 dark:text-slate-300">{blueprint.techStack.frontend}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">⚙️ Backend (Free on Render):</strong>
                    <span className="text-slate-600 dark:text-slate-300">{blueprint.techStack.backend}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">🗄️ Database (Free on Supabase / Neon):</strong>
                    <span className="text-slate-600 dark:text-slate-300">{blueprint.techStack.database}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">🤖 AI Engine (Free on Groq / Gemini):</strong>
                    <span className="text-slate-600 dark:text-slate-300">{blueprint.techStack.aiMlModel}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && <InteractiveSimulator ps={ps} />}

          {activeTab === 'starter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Starter Repository Scaffolding
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ready-to-use boilerplate with FastAPI backend, Vite frontend, and docker-compose.
                  </p>
                </div>

                <button
                  onClick={handleDownloadStarterReadme}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download README Starter</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
                  <div className="text-slate-500 pb-2 mb-2 border-b border-slate-800"># main.py (FastAPI Zero-Cost Backend)</div>
                  <pre className="whitespace-pre-wrap">{starterFiles.mainPy}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Team Brainstorming & Architecture Notes
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your notes are automatically preserved in your local browser storage.
                  </p>
                </div>
                <button
                  onClick={handleSaveNote}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{noteSaved ? 'Saved!' : 'Save Note'}</span>
                </button>
              </div>

              <textarea
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                placeholder="Jot down proposed tech stack, team roles, system architecture ideas, questions for mentors..."
                rows={12}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none leading-relaxed font-sans"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between flex-wrap gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Copied Markdown!' : 'Copy as Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.md)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onLaunchApp && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchApp(ps);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Launch Full App</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
''')

# 3. Update src/components/SplitView.tsx to add Launch App button
with open('src/components/SplitView.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React from 'react';
import { 
  Building2, 
  Tag, 
  Bookmark, 
  Scale, 
  Calendar, 
  Copy, 
  Check, 
  Download, 
  Save, 
  ExternalLink,
  Edit3,
  Video,
  Database,
  ArrowRight,
  Zap
} from 'lucide-react';
import { ProblemStatement } from '../types';
import { copyToClipboard, generateMarkdownPS, downloadMarkdown } from '../utils/export';

interface SplitViewProps {
  items: ProblemStatement[];
  selectedPS: ProblemStatement | null;
  onSelectPS: (ps: ProblemStatement) => void;
  onLaunchApp?: (ps: ProblemStatement) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
  notes: Record<string, string>;
  onSaveNote: (id: string, note: string) => void;
}

export const SplitView: React.FC<SplitViewProps> = ({
  items,
  selectedPS,
  onSelectPS,
  onLaunchApp,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  notes,
  onSaveNote
}) => {
  const currentPS = selectedPS || (items.length > 0 ? items[0] : null);
  const [localNote, setLocalNote] = React.useState('');
  const [noteSaved, setNoteSaved] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(false);

  React.useEffect(() => {
    if (currentPS) {
      setLocalNote(notes[currentPS.id] || '');
    }
  }, [currentPS?.id, notes]);

  const handleSaveNote = () => {
    if (currentPS) {
      onSaveNote(currentPS.id, localNote);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  const handleCopyId = () => {
    if (currentPS) {
      copyToClipboard(currentPS.ps_number || currentPS.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left List Pane */}
      <div className="lg:col-span-5 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {items.map((ps) => {
          const isSelected = currentPS?.id === ps.id;
          const isFav = favorites.includes(ps.id);
          const isComp = compareList.includes(ps.id);

          return (
            <div
              key={ps.id}
              onClick={() => onSelectPS(ps)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-50/90 dark:bg-brand-950/50 border-brand-500 dark:border-brand-600 shadow-md ring-1 ring-brand-400/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                  {ps.ps_number || `SIH${ps.id}`}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {ps.theme}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1">
                {ps.title}
              </h4>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span className="truncate max-w-[200px]">{ps.organization}</span>
                <div className="flex items-center gap-1.5">
                  {isFav && <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-current" />}
                  {isComp && <Scale className="w-3.5 h-3.5 text-brand-500" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Detail Pane */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 max-h-[calc(100vh-220px)] overflow-y-auto sticky top-40 space-y-6">
        {currentPS ? (
          <>
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
                  >
                    <span>{currentPS.ps_number || `SIH${currentPS.id}`}</span>
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                  </button>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                    {currentPS.theme}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onLaunchApp && (
                    <button
                      onClick={() => onLaunchApp(currentPS)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Launch App</span>
                    </button>
                  )}

                  <button
                    onClick={() => onToggleCompare(currentPS.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      compareList.includes(currentPS.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(currentPS.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      favorites.includes(currentPS.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${favorites.includes(currentPS.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2">
                {currentPS.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{currentPS.organization}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Deadline: <strong>{currentPS.deadline}</strong></span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {currentPS.tags && currentPS.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentPS.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Background */}
            {currentPS.sections?.background && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Background</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  {currentPS.sections.background}
                </p>
              </div>
            )}

            {/* Problem & Objectives */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem & Requirements</h4>
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                {currentPS.sections?.description || currentPS.description}
              </div>
            </div>

            {/* Expected Solution */}
            {currentPS.sections?.expected_solution && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Expected Solution</h4>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-emerald-50/40 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
                  {currentPS.sections.expected_solution}
                </div>
              </div>
            )}

            {/* Scratchpad */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Team Notes & Scratchpad</span>
                </h4>
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1 rounded-lg text-[11px] font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>{noteSaved ? 'Saved!' : 'Save'}</span>
                </button>
              </div>
              <textarea
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                placeholder="Add ideas or plan..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-slate-400">
            Select a problem statement on the left to read full details.
          </div>
        )}
      </div>

    </div>
  );
};
''')

# 4. Update src/components/TableView.tsx to add Launch App button
with open('src/components/TableView.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React from 'react';
import { ProblemStatement } from '../types';
import { Bookmark, Scale, ArrowRight, Copy, Check, Zap } from 'lucide-react';
import { copyToClipboard } from '../utils/export';

interface TableViewProps {
  items: ProblemStatement[];
  onSelectPS: (ps: ProblemStatement) => void;
  onLaunchApp?: (ps: ProblemStatement) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  items,
  onSelectPS,
  onLaunchApp,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
              <th className="py-3.5 px-4 w-24">PS ID</th>
              <th className="py-3.5 px-4 min-w-[280px]">Title</th>
              <th className="py-3.5 px-4 min-w-[140px]">Theme</th>
              <th className="py-3.5 px-4 min-w-[200px]">Organization</th>
              <th className="py-3.5 px-4 w-24">Category</th>
              <th className="py-3.5 px-4 w-28">Submitted</th>
              <th className="py-3.5 px-4 w-28">Deadline</th>
              <th className="py-3.5 px-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
            {items.map((ps) => {
              const isFav = favorites.includes(ps.id);
              const isComp = compareList.includes(ps.id);
              const idStr = ps.ps_number || `SIH${ps.id}`;

              return (
                <tr 
                  key={ps.id}
                  onClick={() => onSelectPS(ps)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                    <button
                      onClick={(e) => handleCopy(idStr, e)}
                      className="hover:underline flex items-center gap-1"
                      title="Copy PS ID"
                    >
                      <span>{idStr}</span>
                      {copiedId === idStr && <Check className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    <div className="line-clamp-2">{ps.title}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {ps.theme}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    <div className="line-clamp-1">{ps.organization}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {ps.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {ps.submitted_ideas || '0/500'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {ps.deadline || '20 Sep 2026'}
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {onLaunchApp && (
                        <button
                          onClick={() => onLaunchApp(ps)}
                          className="p-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200"
                          title="Launch Full App"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                      <button
                        onClick={() => onToggleCompare(ps.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isComp
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title="Compare"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(ps.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav
                            ? 'text-amber-500 fill-current'
                            : 'text-slate-400 hover:text-amber-500'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => onSelectPS(ps)}
                        className="p-1.5 rounded-lg text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950"
                        title="Open Details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
''')

# 5. Update src/App.tsx to wire up FullAppRunner
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write('''import React from 'react';
import rawSoftwareData from './data/software_ps.json';
import rawAllData from './data/all_ps.json';
import { ProblemStatement, FilterState, ViewMode } from './types';
import { 
  getStoredFavorites, 
  toggleStoredFavorite, 
  getStoredNotes, 
  saveStoredNote, 
  getStoredDarkMode, 
  setStoredDarkMode,
  getStoredCompareList,
  toggleStoredCompare
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PSCard } from './components/PSCard';
import { PSDetailModal } from './components/PSDetailModal';
import { SplitView } from './components/SplitView';
import { TableView } from './components/TableView';
import { AnalyticsView } from './components/AnalyticsView';
import { CompareModal } from './components/CompareModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { FreeStackGuideModal } from './components/FreeStackGuideModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FullAppRunner } from './components/FullAppRunner';
import { Pagination } from './components/Pagination';
import { Sparkles, Layers, RefreshCw, ShieldAlert, Heart, ExternalLink, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const softwareData = rawSoftwareData as ProblemStatement[];
  const allData = rawAllData as ProblemStatement[];

  // App State
  const [darkMode, setDarkMode] = React.useState<boolean>(getStoredDarkMode);
  const [favorites, setFavorites] = React.useState<string[]>(getStoredFavorites);
  const [notes, setNotes] = React.useState<Record<string, string>>(getStoredNotes);
  const [compareList, setCompareList] = React.useState<string[]>(getStoredCompareList);
  
  const [selectedPS, setSelectedPS] = React.useState<ProblemStatement | null>(null);
  const [runningAppPS, setRunningAppPS] = React.useState<ProblemStatement | null>(null);
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(24);

  // Modals / Drawers
  const [showCompareModal, setShowCompareModal] = React.useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = React.useState(false);
  const [showFreeStackModal, setShowFreeStackModal] = React.useState(false);
  const [showFavoritesDrawer, setShowFavoritesDrawer] = React.useState(false);

  // Filters
  const initialFilter: FilterState = {
    searchQuery: '',
    category: 'Software',
    selectedThemes: [],
    selectedOrgs: [],
    selectedTags: [],
    sortBy: 'id_asc',
    onlyFavorites: false
  };

  const [filter, setFilter] = React.useState<FilterState>(initialFilter);

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, viewMode]);

  // Apply Dark Mode Class to HTML tag
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredDarkMode(darkMode);
  }, [darkMode]);

  // Derived available options based on chosen category dataset
  const currentDataset = React.useMemo(() => {
    if (filter.category === 'Software') return softwareData;
    if (filter.category === 'Hardware') return allData.filter(d => d.category.toLowerCase() === 'hardware');
    return allData;
  }, [filter.category, softwareData, allData]);

  // Extract themes with counts
  const availableThemes = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      if (ps.theme) counts[ps.theme] = (counts[ps.theme] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Extract orgs with counts
  const availableOrgs = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      if (ps.organization) counts[ps.organization] = (counts[ps.organization] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Extract tags with counts
  const availableTags = React.useMemo(() => {
    const counts: Record<string, number> = {};
    currentDataset.forEach(ps => {
      ps.tags?.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [currentDataset]);

  // Filter and Sort logic
  const filteredItems = React.useMemo(() => {
    return currentDataset.filter(ps => {
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase().trim();
        const matchId = (ps.ps_number || '').toLowerCase().includes(q) || String(ps.id).includes(q);
        const matchTitle = (ps.title || '').toLowerCase().includes(q);
        const matchTheme = (ps.theme || '').toLowerCase().includes(q);
        const matchOrg = (ps.organization || '').toLowerCase().includes(q);
        const matchDesc = (ps.description || '').toLowerCase().includes(q);
        const matchTags = ps.tags?.some(t => t.toLowerCase().includes(q));

        if (!matchId && !matchTitle && !matchTheme && !matchOrg && !matchDesc && !matchTags) {
          return false;
        }
      }

      if (filter.selectedThemes.length > 0 && !filter.selectedThemes.includes(ps.theme)) {
        return false;
      }

      if (filter.selectedOrgs.length > 0 && !filter.selectedOrgs.includes(ps.organization)) {
        return false;
      }

      if (filter.selectedTags.length > 0 && !filter.selectedTags.some(t => ps.tags?.includes(t))) {
        return false;
      }

      if (filter.onlyFavorites && !favorites.includes(ps.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'id_asc') {
        return (Number(a.id) || 0) - (Number(b.id) || 0);
      }
      if (filter.sortBy === 'id_desc') {
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      }
      if (filter.sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      if (filter.sortBy === 'title_desc') {
        return b.title.localeCompare(a.title);
      }
      if (filter.sortBy === 'org_asc') {
        return a.organization.localeCompare(b.organization);
      }
      if (filter.sortBy === 'length_desc') {
        return (b.description?.length || 0) - (a.description?.length || 0);
      }
      return 0;
    });
  }, [currentDataset, filter, favorites]);

  // Paginated Slice for Grid / Table
  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleStoredFavorite(id);
    setFavorites(updated);
  };

  const handleToggleCompare = (id: string) => {
    const updated = toggleStoredCompare(id);
    setCompareList(updated);
  };

  const handleSaveNote = (id: string, note: string) => {
    const updated = saveStoredNote(id, note);
    setNotes(updated);
  };

  const handleQuickTagSelect = (tag: string) => {
    setFilter(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) ? [] : [tag]
    }));
  };

  const handleResetFilters = () => {
    setFilter(prev => ({
      ...initialFilter,
      category: prev.category
    }));
  };

  const comparedItems = React.useMemo(() => {
    return allData.filter(ps => compareList.includes(ps.id));
  }, [compareList, allData]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setShowFavoritesDrawer(true)}
        compareCount={compareList.length}
        onOpenCompare={() => setShowCompareModal(true)}
        onOpenGuidelines={() => setShowGuidelinesModal(true)}
        onOpenFreeStackGuide={() => setShowFreeStackModal(true)}
        filteredItems={filteredItems}
        totalSoftwareCount={softwareData.length}
        totalAllCount={allData.length}
        categoryFilter={filter.category}
        setCategoryFilter={(cat) => setFilter(prev => ({ ...prev, category: cat }))}
      />

      {/* Hero Section */}
      <Hero
        totalSoftware={softwareData.length}
        totalHardware={allData.length - softwareData.length}
        themesCount={availableThemes.length}
        orgsCount={availableOrgs.length}
        onSelectQuickTag={handleQuickTagSelect}
        activeTag={filter.selectedTags[0] || ''}
      />

      {/* Filter and Control Bar */}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        availableThemes={availableThemes}
        availableOrgs={availableOrgs}
        availableTags={availableTags}
        totalResults={filteredItems.length}
        onReset={handleResetFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No problem statements matched your filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Try changing or resetting your search keywords, themes, or organization selections.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedItems.map(ps => (
                    <PSCard
                      key={ps.id}
                      ps={ps}
                      isFavorite={favorites.includes(ps.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isCompared={compareList.includes(ps.id)}
                      onToggleCompare={handleToggleCompare}
                      onSelect={setSelectedPS}
                      onLaunchApp={setRunningAppPS}
                      searchQuery={filter.searchQuery}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredItems.length}
                  onPageChange={handlePageChange}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}

            {viewMode === 'split' && (
              <SplitView
                items={filteredItems}
                selectedPS={selectedPS}
                onSelectPS={setSelectedPS}
                onLaunchApp={setRunningAppPS}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                notes={notes}
                onSaveNote={handleSaveNote}
              />
            )}

            {viewMode === 'table' && (
              <>
                <TableView
                  items={paginatedItems}
                  onSelectPS={setSelectedPS}
                  onLaunchApp={setRunningAppPS}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  compareList={compareList}
                  onToggleCompare={handleToggleCompare}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredItems.length}
                  onPageChange={handlePageChange}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}

            {viewMode === 'analytics' && (
              <AnalyticsView
                items={filteredItems}
                onSelectTheme={(theme) => setFilter(prev => ({ ...prev, selectedThemes: [theme] }))}
                onSelectOrg={(org) => setFilter(prev => ({ ...prev, selectedOrgs: [org] }))}
                onSelectTag={(tag) => setFilter(prev => ({ ...prev, selectedTags: [tag] }))}
              />
            )}
          </>
        )}

      </main>

      {/* Comprehensive Footer with Disclaimer & Copyrights */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Footer Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  SIH
                </div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  Smart India Hackathon 2026 Explorer
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Software Category Problem Statements Directory & Participant Companion.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 flex-wrap">
              <button 
                onClick={() => setShowFreeStackModal(true)}
                className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Zero-Cost Tech Stack</span>
              </button>
              <span>•</span>
              <a 
                href="https://sih.gov.in/sih2026PS" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Official SIH 2026 Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span>•</span>
              <button 
                onClick={() => setShowGuidelinesModal(true)}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Guidelines & PPT
              </button>
              <span>•</span>
              <button 
                onClick={() => setShowFavoritesDrawer(true)}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Saved List ({favorites.length})
              </button>
            </div>
          </div>

          {/* Disclaimer Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Disclaimer</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This platform is an independent exploration and reference tool created to help students, participants, and mentors navigate problem statements effectively. All problem statement titles, problem IDs, descriptions, organization trademarks, themes, and related intellectual property belong exclusively to their respective Government Ministries, Departments, Public Sector Undertakings (PSUs), and the Smart India Hackathon / AICTE / Ministry of Education Innovation Cell (MIC), Government of India. Official registrations, college SPOC nominations, and idea submissions must be submitted directly on the official portal at{' '}
              <a href="https://sih.gov.in" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 font-semibold underline">
                sih.gov.in
              </a>.
            </p>
          </div>

          {/* Bottom Copyrights Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              © 2026 Flugelsoft Labs. All Rights Reserved.
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Designed & Built with precision by Flugelsoft Labs
            </div>
          </div>

        </div>
      </footer>

      {/* Full Detail Modal */}
      {selectedPS && (
        <PSDetailModal
          ps={selectedPS}
          onClose={() => setSelectedPS(null)}
          isFavorite={favorites.includes(selectedPS.id)}
          onToggleFavorite={handleToggleFavorite}
          isCompared={compareList.includes(selectedPS.id)}
          onToggleCompare={handleToggleCompare}
          note={notes[selectedPS.id] || ''}
          onSaveNote={handleSaveNote}
          onLaunchApp={setRunningAppPS}
        />
      )}

      {/* Live Full Application Runner */}
      {runningAppPS && (
        <FullAppRunner
          ps={runningAppPS}
          onClose={() => setRunningAppPS(null)}
        />
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          comparedItems={comparedItems}
          onClose={() => setShowCompareModal(false)}
          onRemove={handleToggleCompare}
          onSelectPS={setSelectedPS}
        />
      )}

      {/* Guidelines Modal */}
      {showGuidelinesModal && (
        <GuidelinesModal
          onClose={() => setShowGuidelinesModal(false)}
        />
      )}

      {/* Free Stack Guide Modal */}
      {showFreeStackModal && (
        <FreeStackGuideModal
          onClose={() => setShowFreeStackModal(false)}
        />
      )}

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavoritesDrawer}
        onClose={() => setShowFavoritesDrawer(false)}
        favorites={favorites}
        allPS={allData}
        onSelectPS={setSelectedPS}
        onToggleFavorite={handleToggleFavorite}
        notes={notes}
      />

    </div>
  );
};
''')

print('All components wired to FullAppRunner successfully!')
