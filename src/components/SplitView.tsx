import React from 'react';
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
