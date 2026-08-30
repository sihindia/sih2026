import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  BookOpen, 
  Brain, 
  RefreshCw, 
  Award, 
  TrendingUp, 
  Sliders, 
  Globe 
} from 'lucide-react';

import officersData from './data/statistical_cadre_competency_profiles.json';
import coursesData from './data/igot_karmayogi_courses_catalog.json';
import quizzesData from './data/ai_generated_mcqs_repository.json';
import statsData from './data/karmayogistat_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [officers, setOfficers] = useState(officersData);
  const [selectedOfficer, setSelectedOfficer] = useState(officersData[0]);
  const [courses, setCourses] = useState(coursesData);
  const [quizzes, setQuizzes] = useState(quizzesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'officers' | 'courses' | 'quiz' | 'credits' | 'stats'>('officers');

  // Interactive Quiz Generation Simulator
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizResult, setQuizResult] = useState<any>({
    topic: "System of National Accounts (SNA 2008) Guidelines",
    count: "10 Bloom's Taxonomy-Aligned MCQs Generated",
    sample: "How should FISIM be allocated between final and intermediate consumption under SNA 2008?",
    credits: "+15 iGOT Competency Credits Synced"
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setQuizResult({
        topic: "System of National Accounts (SNA 2008) Guidelines",
        count: "10 Bloom's Taxonomy-Aligned MCQs Generated",
        sample: "How should FISIM be allocated between final and intermediate consumption under SNA 2008?",
        credits: "+15 iGOT Competency Credits Synced"
      });
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MOSPI • KARMAYOGISTAT 360 AI STATISTICAL LEARNING PLATFORM • SIH26101</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoSPI KarmayogiStat: AI Skill Intelligence & Automated iGOT Assessment Engine
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Official Statistics Competency Gap Mapping, Two-Way iGOT Karmayogi API Sync & LLM-Generated MCQs
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'officers', label: '👨‍💼 Statistical Cadre Profiles', count: officers.length },
            { id: 'courses', label: '🎓 iGOT Karmayogi Courses', count: courses.length },
            { id: 'quiz', label: '📝 AI MCQ & Quiz Engine', count: quizzes.length },
            { id: 'credits', label: '🏆 Adaptive Learning Assistant' },
            { id: 'stats', label: '📊 MoSPI Cadre Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: OFFICERS
           ========================================================================= */}
        {activeTab === 'officers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {officers.map((o) => (
                <button
                  key={o.officer_id}
                  onClick={() => setSelectedOfficer(o)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedOfficer.officer_id === o.officer_id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-cyan-400">{o.officer_id}</span>
                    <span className="text-emerald-400">{o.competency_credits_earned} Credits</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {o.name} ({o.designation})
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{o.department} • {o.cadre}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Gap: {o.identified_skill_gaps.split(' ')[0]}</span>
                    <span className="text-emerald-400 font-bold">Enrolled</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-cyan-400 font-bold">{selectedOfficer.officer_id} • {selectedOfficer.cadre}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedOfficer.name} ({selectedOfficer.designation})</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedOfficer.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-cyan-400 block text-[9px] font-bold uppercase">COMPETENCY MATRIX & IDENTIFIED SKILL GAPS:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div>Macro-Economics: <strong className="text-emerald-400">{selectedOfficer.competency_scores.macro_economics}%</strong></div>
                    <div>Sampling Methods: <strong className="text-emerald-400">{selectedOfficer.competency_scores.survey_sampling}%</strong></div>
                    <div>Python / Big Data: <strong className="text-rose-400">{selectedOfficer.competency_scores.python_big_data}% (Gap)</strong></div>
                    <div>GIS Spatial Stats: <strong className="text-rose-400">{selectedOfficer.competency_scores.gis_spatial_stats}% (Gap)</strong></div>
                  </div>
                  <div className="text-white font-sans text-[11px] pt-1 border-t border-slate-900">
                    Recommended Pathway: <strong className="text-cyan-400">{selectedOfficer.recommended_igot_pathway}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">CURRENT ASSIGNMENT</span><span className="text-cyan-400 font-bold">{selectedOfficer.current_assignment.split(' ')[0]} {selectedOfficer.current_assignment.split(' ')[1]}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">iGOT CREDITS EARNED</span><span className="text-emerald-400 font-bold">{selectedOfficer.competency_credits_earned} Credits</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Generate AI Assessment MCQs from Statistical Manuals ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>LLM Assessment Generator</span>
                  </h4>
                  <form onSubmit={handleGenerate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Statistical Document Title</label>
                      <input type="text" readOnly value="SNA 2008 National Accounts Manual (PDF)" className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-cyan-400" />
                    </div>
                    <button type="submit" disabled={isGenerating} className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Parsing Document & Synthesizing MCQs...' : 'Generate 10 Bloom-Aligned MCQs'}</span>
                    </button>
                  </form>
                  {quizResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Generated: <strong className="text-cyan-400 font-mono text-xs">{quizResult.count}</strong></div>
                      <div>Credits: <strong className="text-emerald-300 font-mono text-xs block mt-0.5">{quizResult.credits}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: COURSES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {courses.map((c, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{c.course_id}</span>
                <h4 className="font-bold text-sm text-white font-sans">{c.course_name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Credits: <strong className="text-emerald-400">{c.credits} Credits</strong></div>
                  <div>Duration: <strong className="text-white">{c.duration_hrs} Hours</strong></div>
                  <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{c.provider}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-cyan-500/40 pb-3 flex justify-between items-center">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">LLM INTELLIGENT ASSESSMENT GENERATOR</span>
                <h4 className="text-lg font-black text-white font-sans mt-0.5">SNA 2008 & Price Index Case Study Evaluation</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-xl font-bold font-mono">Bloom's Level 4</span>
            </div>
            <div className="space-y-3 font-sans text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-white font-bold text-sm">{quizzes[0].question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {quizzes[0].options.map((opt, idx) => (
                    <div key={idx} className={`p-2 rounded-xl border ${opt.startsWith('B') ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="text-emerald-400 text-[11px] pt-2 border-t border-slate-900">
                  <strong>Explanation:</strong> {quizzes[0].explanation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: CREDITS */}
        {activeTab === 'credits' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-400">
              <Award className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Two-Way iGOT Karmayogi Competency Credit Synchronization</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automatically updates officer competency passbook, certifying advanced skills in National Accounts, Python Big Data, and GIS spatial statistics.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
