import React from 'react';
import { Sparkles, Calendar, Building2, LayoutGrid, Search, ArrowRight, Zap, Target, Heart, BookOpen } from 'lucide-react';

interface HeroProps {
  totalSoftware: number;
  totalHardware: number;
  themesCount: number;
  orgsCount: number;
  onSelectQuickTag: (tag: string) => void;
  activeTag: string;
  onOpenAboutTutorial: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalSoftware,
  totalHardware,
  themesCount,
  orgsCount,
  onSelectQuickTag,
  activeTag,
  onOpenAboutTutorial
}) => {
  const quickTags = [
    { label: '🤖 AI & Machine Learning', value: 'AI / Machine Learning' },
    { label: '👁️ Computer Vision', value: 'Computer Vision' },
    { label: '💬 NLP & LLMs', value: 'NLP & LLMs' },
    { label: '🛰️ GIS & Geospatial', value: 'GIS & Geospatial' },
    { label: '🛡️ Cybersecurity & Web3', value: 'Cybersecurity' },
    { label: '🏥 MedTech & Health', value: 'Healthcare & MedTech' },
    { label: '⚡ Disaster & Weather', value: 'Disaster & Weather' },
    { label: '🌾 Agriculture & Rural', value: 'Agriculture & Agritech' },
    { label: '🏛️ GovTech & Public Delivery', value: 'GovTech & Public Delivery' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 py-10 sm:py-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-brand-400/20 via-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          
          {/* Motivation Tagline Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-brand-100 to-indigo-100 text-brand-900 dark:from-brand-950 dark:to-indigo-950 dark:text-brand-200 border border-brand-300/80 dark:border-brand-800 mb-4 shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={onOpenAboutTutorial}>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Software is Easy & for Everyone — Read Our Story & Project Tutorial →</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-400">{totalSoftware} Software</span> Problem Statements
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Synchronized directly from the official SIH 2026 portal with rich keyword tagging, zero-cost tech stack blueprints, live full application runners, and step-by-step beginner tutorials.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{totalSoftware}</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Software PS</div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{themesCount}</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Themes</div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{orgsCount}</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Organizations</div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">20 Sep 2026</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Idea Deadline</div>
            </div>
          </div>

        </div>

        {/* Quick Discovery Tags */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-brand-500" />
              Quick Filters:
            </span>
            {quickTags.map(tag => {
              const isSelected = activeTag === tag.value;
              return (
                <button
                  key={tag.value}
                  onClick={() => onSelectQuickTag(tag.value)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all text-xs flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-400/50'
                      : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
