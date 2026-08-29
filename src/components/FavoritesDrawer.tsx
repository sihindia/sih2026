import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Download, Share2 } from 'lucide-react';
import { ProblemStatement } from '../types';
import { exportToJSON, exportToCSV, downloadMarkdown, generateMarkdownPS } from '../utils/export';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allPS: ProblemStatement[];
  onSelectPS: (ps: ProblemStatement) => void;
  onToggleFavorite: (id: string) => void;
  notes: Record<string, string>;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allPS,
  onSelectPS,
  onToggleFavorite,
  notes
}) => {
  if (!isOpen) return null;

  const favoriteItems = allPS.filter(ps => favorites.includes(ps.id));

  const handleExportFavoritesMarkdown = () => {
    let report = `# SIH 2026 Shortlisted Problem Statements\n\n`;
    report += `Total Shortlisted: ${favoriteItems.length}\n\n---\n\n`;
    favoriteItems.forEach((ps, idx) => {
      report += `## ${idx + 1}. [${ps.ps_number || ps.id}] ${ps.title}\n`;
      report += `**Theme:** ${ps.theme} | **Org:** ${ps.organization} | **Category:** ${ps.category}\n\n`;
      report += `### Description\n${ps.description}\n\n`;
      if (notes[ps.id]) {
        report += `### Team Notes\n${notes[ps.id]}\n\n`;
      }
      report += `---\n\n`;
    });

    downloadMarkdown(report, 'SIH2026_Shortlisted_Problem_Statements.md');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Shortlisted ({favoriteItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-sm">No problem statements shortlisted yet.</p>
              <p className="text-xs mt-1">Bookmark problem statements you want to consider with your team.</p>
            </div>
          ) : (
            favoriteItems.map((ps) => (
              <div
                key={ps.id}
                onClick={() => {
                  onSelectPS(ps);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                    {ps.ps_number || `SIH${ps.id}`}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(ps.id);
                    }}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-600">
                  {ps.title}
                </h4>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {ps.organization}
                </div>

                {notes[ps.id] && (
                  <div className="text-[10px] bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 p-2 rounded-lg truncate">
                    📝 {notes[ps.id]}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {favoriteItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-2">
            <button
              onClick={handleExportFavoritesMarkdown}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Shortlist Report (.md)</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => exportToJSON(favoriteItems, 'sih2026_shortlisted.json')}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                JSON
              </button>
              <button
                onClick={() => exportToCSV(favoriteItems, 'sih2026_shortlisted.csv')}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                CSV
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
