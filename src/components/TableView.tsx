import React from 'react';
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
