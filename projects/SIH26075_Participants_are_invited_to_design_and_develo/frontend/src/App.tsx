import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Award, 
  BookOpen, 
  RefreshCw, 
  Users, 
  Sliders, 
  Globe 
} from 'lucide-react';

import coursesData from './data/capacity_building_training_courses.json';
import trainersData from './data/trainer_competency_mapping_matrix.json';
import questionsData from './data/mcq_assessment_question_bank.json';
import statsData from './data/capacityconnect_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('en');
  const [courses, setCourses] = useState(coursesData);
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [trainers, setTrainers] = useState(trainersData);
  const [questions, setQuestions] = useState(questionsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'courses' | 'trainers' | 'exams' | 'admin' | 'stats'>('courses');

  // Interactive Certification Exam Simulator
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>({
    score: "92.0% (Passed with Distinction)",
    certId: "ISO-9001:2015 MoES/IMD Credential #MOES-DWR-2026-9812",
    competency: "Level 4: Advanced Operational Radar Polarimetry Specialist",
    status: "DIGITALLY SIGNED CERTIFICATE ISSUED"
  });

  const handleEval = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      setEvalResult({
        score: "92.0% (Passed with Distinction)",
        certId: "ISO-9001:2015 MoES/IMD Credential #MOES-DWR-2026-9812",
        competency: "Level 4: Advanced Operational Radar Polarimetry Specialist",
        status: "DIGITALLY SIGNED CERTIFICATE ISSUED"
      });
      setIsEvaluating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>MoES • CAPACITY CONNECT 360 DIGITAL LMS & COMPETENCY BUILDING PLATFORM • SIH26075</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoES CapacityConnect: Digital Capacity Building & Learning Management Portal
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Tri-Role Architecture (Trainee, Trainer, Admin), Proctored MCQ Assessments, Competency Mapping & Automated ISO Certifications
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'courses', label: '🎓 Courses & Cohorts', count: courses.length },
            { id: 'trainers', label: '👨‍🏫 Trainer Competency', count: trainers.length },
            { id: 'exams', label: '📝 MCQ Assessments', count: questions.length },
            { id: 'admin', label: '🏛️ Admin Gap Dashboard' },
            { id: 'stats', label: '📊 CapacityConnect Stats' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-indigo-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: COURSES
           ========================================================================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((c) => (
                <button
                  key={c.course_id}
                  onClick={() => setSelectedCourse(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedCourse.course_id === c.course_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{c.course_id}</span>
                    <span className="text-cyan-300">{c.enrolled_trainees_count} Trainees</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.course_title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Trainer: {c.lead_trainer_assigned}</div>
                  <div className="text-[10px] text-emerald-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>Avg Score: {c.average_cohort_score_pct}%</span>
                    <span className="text-emerald-400">{c.status.split('_')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedCourse.course_id} • {selectedCourse.enrolled_trainees_count} Enrolled Officers</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedCourse.course_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedCourse.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">SYLLABUS MODULES & CERTIFICATION DETAILS:</span>
                  <div className="text-white font-sans text-xs font-bold">Target Audience: {selectedCourse.target_roles}</div>
                  <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Syllabus: {selectedCourse.core_syllabus}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Assessment: <strong>{selectedCourse.assessment_format}</strong>
                  </div>
                  <div className="text-emerald-300 font-sans text-[11px]">
                    Credential: <strong>{selectedCourse.certification_issued}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">COHORT AVERAGE SCORE</span><span className="text-emerald-400 font-bold">{selectedCourse.average_cohort_score_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MODULES</span><span className="text-indigo-400 font-bold">{selectedCourse.course_modules_count} Specialized Units</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('trainers')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Review Trainer Competency Matrix & Faculty Profiles ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Certification Exam Engine</span>
                  </h4>
                  <form onSubmit={handleEval} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Training Course</label>
                      <input type="text" readOnly value={`${selectedCourse.course_id} (${selectedCourse.course_title.slice(0, 30)})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isEvaluating} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                      <span>{isEvaluating ? 'Grading Assessment & Minting Certificate...' : 'Complete Proctored Assessment'}</span>
                    </button>
                  </form>
                  {evalResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Score: <strong className="text-emerald-400 font-mono text-xs">{evalResult.score}</strong></div>
                      <div>Cert: <strong className="text-indigo-300 font-mono text-xs block mt-0.5">{evalResult.certId}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TRAINERS */}
        {tab === 'trainers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {trainers.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">{t.status}</span>
                <h4 className="font-bold text-sm text-white font-sans">{t.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Domain: <strong className="text-white">{t.domain}</strong></div>
                  <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-900">Rating: ⭐ {t.competency_rating} / 5.0 ({t.courses_conducted} Cohorts)</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: EXAMS */}
        {tab === 'exams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{q.subject}</span>
                <h4 className="font-bold text-sm text-white font-sans">{q.question}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div className="text-emerald-400 font-bold">Correct Answer: {q.correct}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: ADMIN */}
        {tab === 'admin' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Users className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Organizational Competency & Talent Readiness Dashboard</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Real-time analytics tracking training compliance across IMD regional centers, identifying atmospheric modeling competency gaps, and automatically matching subject-matter experts.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-indigo-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
