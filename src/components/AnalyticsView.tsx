import React from 'react';
import { ProblemStatement } from '../types';
import { BarChart3, PieChart, Tag, Building2, Layers, CheckCircle2 } from 'lucide-react';

interface AnalyticsViewProps {
  items: ProblemStatement[];
  onSelectTheme: (theme: string) => void;
  onSelectOrg: (org: string) => void;
  onSelectTag: (tag: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  items,
  onSelectTheme,
  onSelectOrg,
  onSelectTag
}) => {
  // Theme counts
  const themeCounts: Record<string, number> = {};
  const orgCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};

  items.forEach(ps => {
    themeCounts[ps.theme] = (themeCounts[ps.theme] || 0) + 1;
    orgCounts[ps.organization] = (orgCounts[ps.organization] || 0) + 1;
    ps.tags?.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedThemes = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]);
  const sortedOrgs = Object.entries(orgCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  const maxTheme = sortedThemes[0]?.[1] || 1;
  const maxOrg = sortedOrgs[0]?.[1] || 1;
  const maxTag = sortedTags[0]?.[1] || 1;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10">
        <h2 className="text-2xl font-black mb-2">SIH 2026 Innovation Analytics & Distribution</h2>
        <p className="text-sm text-brand-100 max-w-2xl leading-relaxed">
          Comprehensive breakdown across themes, ministries, and high-demand technology sectors for all {items.length} Software Problem Statements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Themes Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-brand-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Problem Statements by Theme ({sortedThemes.length})
            </h3>
          </div>

          <div className="space-y-3.5 max-h-96 overflow-y-auto pr-2">
            {sortedThemes.map(([theme, count]) => {
              const pct = Math.round((count / items.length) * 100);
              const barWidth = Math.max(8, Math.round((count / maxTheme) * 100));

              return (
                <div 
                  key={theme}
                  onClick={() => onSelectTheme(theme)}
                  className="group cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    <span className="truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">{theme}</span>
                    <span className="font-mono ml-2 text-slate-500">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-500 group-hover:bg-brand-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Organizations */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Top 10 Sponsoring Ministries & Orgs
            </h3>
          </div>

          <div className="space-y-3.5 max-h-96 overflow-y-auto pr-2">
            {sortedOrgs.map(([org, count]) => {
              const barWidth = Math.max(8, Math.round((count / maxOrg) * 100));

              return (
                <div 
                  key={org}
                  onClick={() => onSelectOrg(org)}
                  className="group cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    <span className="truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{org}</span>
                    <span className="font-mono ml-2 text-slate-500">{count} PS</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 group-hover:bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Technology Stack & Domain Frequency */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Technology & Domain Skill Matrix
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sortedTags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500 dark:hover:border-brand-500 text-left transition-all hover:scale-[1.02] shadow-sm"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                {tag}
              </div>
              <div className="text-xs text-brand-600 dark:text-brand-400 font-mono font-semibold">
                {count} Statements
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
