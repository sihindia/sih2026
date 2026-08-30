import React from 'react';
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
import { copyToClipboard, downloadMarkdown } from '../utils/export';
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
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end flex-wrap gap-3 shrink-0">
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
