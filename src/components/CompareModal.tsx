import React from 'react';
import { X, Scale, Building2, Calendar, Check, Trash2, ArrowRight } from 'lucide-react';
import { ProblemStatement } from '../types';

interface CompareModalProps {
  comparedItems: ProblemStatement[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectPS: (ps: ProblemStatement) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  comparedItems,
  onClose,
  onRemove,
  onSelectPS
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Problem Statement Comparison ({comparedItems.length}/3)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare problem objectives, ministries, and deliverables side-by-side.
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

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedItems.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-base">No problem statements selected for comparison</p>
              <p className="text-xs mt-1">Click the scale icon on any problem statement card to add it here.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-${comparedItems.length} gap-6`}>
              {comparedItems.map((ps) => (
                <div 
                  key={ps.id}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                        {ps.ps_number || `SIH${ps.id}`}
                      </span>
                      <button
                        onClick={() => onRemove(ps.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {ps.title}
                    </h3>

                    {/* Theme & Org */}
                    <div className="space-y-1.5 text-xs">
                      <div className="font-semibold text-brand-600 dark:text-brand-400">{ps.theme}</div>
                      <div className="text-slate-500 dark:text-slate-400">{ps.organization}</div>
                    </div>

                    {/* Tags */}
                    {ps.tags && ps.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ps.tags.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Objectives Excerpt */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Problem Summary</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-line bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        {ps.sections?.description || ps.description}
                      </p>
                    </div>

                    {/* Expected Solution Excerpt */}
                    {ps.sections?.expected_solution && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Expected Solution</div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-line bg-emerald-50/40 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                          {ps.sections.expected_solution}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectPS(ps);
                    }}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
