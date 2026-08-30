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
    <div className="relative overflow-hidden bg-white border-b border-slate-200 py-10 sm:py-12">
      {/* Background subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          
          {/* Motivation Tagline Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-[#0B192C] border border-blue-200 mb-4 shadow-sm cursor-pointer hover:scale-105 transition-transform" onClick={onOpenAboutTutorial}>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Software is Easy &amp; for Everyone — Read Our Story &amp; Project Tutorial →</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B192C] leading-tight">
            Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B192C] via-blue-700 to-indigo-800">{totalSoftware} Software</span> Problem Statements
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Synchronized directly from the official SIH 2026 portal with rich keyword tagging, zero-cost tech stack blueprints, live full application runners, and step-by-step beginner tutorials.
          </p>
        </div>

        {/* Stats Grid on Pure White Background */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B192C] shrink-0 font-black">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0B192C]">{totalSoftware}</div>
              <div className="text-xs font-semibold text-slate-500">Software PS</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B192C] shrink-0 font-black">
              <LayoutGrid className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0B192C]">{themesCount}</div>
              <div className="text-xs font-semibold text-slate-500">Themes</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B192C] shrink-0 font-black">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0B192C]">{orgsCount}</div>
              <div className="text-xs font-semibold text-slate-500">Organizations</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#0B192C] shrink-0 font-black">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-[#0B192C] truncate">20 Sep 2026</div>
              <div className="text-xs font-semibold text-slate-500">Idea Deadline</div>
            </div>
          </div>

        </div>

        {/* Quick Discovery Tags */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
            <span className="text-slate-500 font-bold mr-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-[#0B192C]" />
              Quick Filters:
            </span>
            {quickTags.map(tag => {
              const isSelected = activeTag === tag.value;
              return (
                <button
                  key={tag.value}
                  onClick={() => onSelectQuickTag(tag.value)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all text-xs flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0B192C] text-white shadow-md shadow-navy-950/20'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-[#0B192C] hover:text-[#0B192C]'
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
