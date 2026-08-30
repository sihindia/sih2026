import React from 'react';
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
import { getSeoFriendlyAppUrl } from '../utils/seo';

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
      className="group bg-white rounded-3xl border border-slate-200 hover:border-[#1E3E62] hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              title="Click to copy PS Number"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-50 text-[#0B192C] hover:bg-blue-50 hover:text-blue-900 transition-colors border border-slate-200"
            >
              <span>{ps.ps_number || `SIH${ps.id}`}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />}
            </button>

            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-[#0B192C] border border-blue-200/80">
              {ps.category}
            </span>
          </div>

          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onToggleCompare(ps.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isCompared
                  ? 'bg-amber-100 text-amber-800 font-bold'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleFavorite(ps.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-amber-100 text-amber-600'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
              }`}
              title={isFavorite ? "Remove from bookmarks" : "Bookmark this problem"}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Theme pill */}
        <div className="mb-2.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {ps.theme}
          </span>
        </div>

        {/* Title with search-friendly link */}
        <h3 className="text-base font-extrabold text-[#0B192C] group-hover:text-blue-700 transition-colors leading-snug mb-2">
          <a
            href={getSeoFriendlyAppUrl(ps, false)}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onSelect(ps);
              }
            }}
            className="hover:underline focus:outline-none"
          >
            {ps.title}
          </a>
        </h3>

        {/* Ministry / Org */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{ps.organization}</span>
        </div>

        {/* Description Excerpt */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {previewText}
        </p>

        {/* Tags */}
        {ps.tags && ps.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {ps.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details & Action Buttons with Search-Friendly Anchor Links */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <a
          href={getSeoFriendlyAppUrl(ps, false)}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              handleLaunch(e);
            }
          }}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0B192C] hover:bg-[#1E3E62] text-white flex items-center gap-1.5 shadow-sm shadow-navy-950/20 transition-all"
          title="Launch Full Working Application"
        >
          <Zap className="w-3.5 h-3.5 fill-current text-cyan-400" />
          <span>Launch App</span>
        </a>

        <a
          href={getSeoFriendlyAppUrl(ps, false)}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onSelect(ps);
            }
          }}
          className="flex items-center gap-1 text-[#0B192C] hover:text-blue-700 font-bold group-hover:translate-x-1 transition-transform"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
