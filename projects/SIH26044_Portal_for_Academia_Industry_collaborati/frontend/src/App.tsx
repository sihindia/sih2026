import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  Building2, 
  RefreshCw, 
  Coins, 
  Award, 
  FileCheck, 
  Globe 
} from 'lucide-react';

import studentsData from './data/student_skill_mapping_cases.json';
import opportunitiesData from './data/ayush_industry_job_internships.json';
import facultyData from './data/faculty_development_and_consultancy.json';
import statsData from './data/kaushalsetu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sa' | 'mr' | 'ta'>('en');
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(studentsData[0]);
  const [opportunities, setOpportunities] = useState(opportunitiesData);
  const [faculty, setFaculty] = useState(facultyData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'students' | 'jobs' | 'faculty' | 'portfolio' | 'stats'>('students');

  // Interactive Skill Matching Simulator
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>({
    matchedRole: "Phytochemistry & QC Intern @ Dabur Research & Development",
    stipend: "₹25,000 / Month + Lab Research Allowance",
    compatibility: "94.5% Competency Match",
    skillGap: "HPLC Fingerprinting & Schedule T Good Manufacturing Practices",
    recommendation: "Enrolled in 30-Day AYUSH Quality Control Accelerated Program"
  });

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      setMatchResult({
        matchedRole: "Phytochemistry & QC Intern @ Dabur Research & Development",
        stipend: "₹25,000 / Month + Lab Research Allowance",
        compatibility: "94.5% Competency Match",
        skillGap: "HPLC Fingerprinting & Schedule T Good Manufacturing Practices",
        recommendation: "Enrolled in 30-Day AYUSH Quality Control Accelerated Program"
      });
      setIsMatching(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-teal-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold tracking-wider">
              <Briefcase className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>MINISTRY OF AYUSH • KAUSHALSETU 360 ACADEMIA-INDUSTRY SKILL MAPPING • SIH26044</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Ayush KaushalSetu: Academia-Industry Collaboration for Skill Mapping, Internships & Placements
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              All India Institute of Ayurveda (AIIA) Platform for Student Competency Gap Analysis, High-Stipend Herbal Pharma Internships, Faculty Industrial Sabbaticals & Blockchain Digital Skill Portfolios
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-teal-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sa')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sa' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>संस्कृतम्</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'students', label: '👩‍⚕️ Student Skill Profiles', count: students.length },
            { id: 'jobs', label: '💼 Industry Internships', count: opportunities.length },
            { id: 'faculty', label: '👨‍🏫 Faculty Sabbaticals', count: faculty.length },
            { id: 'portfolio', label: '📜 Digital Skill Portfolio' },
            { id: 'stats', label: '📊 KaushalSetu Telemetry' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-teal-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: STUDENTS
           ========================================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {students.map((s) => (
                <button
                  key={s.student_id}
                  onClick={() => setSelectedStudent(s)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedStudent.student_id === s.student_id
                      ? 'bg-teal-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-teal-400">{s.student_id}</span>
                    <span className="text-emerald-400">{s.match_compatibility_pct}% Fit</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {s.student_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{s.institution.split('(')[0]}</div>
                  <div className="text-[10px] text-teal-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{s.target_domain.split('&')[0]}</span>
                    <span className="text-emerald-400">{s.stipend_offered.split('+')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-teal-400 font-bold">{selectedStudent.student_id} • {selectedStudent.institution}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedStudent.student_name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl text-xs font-bold font-mono">
                    {selectedStudent.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-teal-400 block text-[9px] font-bold uppercase">AYUSH SKILL PROFILE & INDUSTRY INTERNSHIP PLACEMENT:</span>
                  <div className="text-white font-sans text-xs">
                    Target Domain: <strong className="text-amber-300">{selectedStudent.target_domain}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900">
                    Verified Strengths: {selectedStudent.verified_strengths}
                  </div>
                  <div className="text-rose-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Identified Skill Gap: {selectedStudent.identified_skill_gap}
                  </div>
                  <div className="text-cyan-300 font-sans text-[11px]">
                    Recommended Upskilling: {selectedStudent.recommended_upskilling}
                  </div>
                  <div className="text-white font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Matched Role: {selectedStudent.matched_internship} ({selectedStudent.stipend_offered})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MATCH COMPATIBILITY</span><span className="text-teal-400 font-bold">{selectedStudent.match_compatibility_pct}%</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">MONTHLY STIPEND</span><span className="text-emerald-400 font-bold">{selectedStudent.stipend_offered.split(' ')[0]}</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore AYUSH Industry Internships & Corporate R&D Openings ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Instant Skill Gap & Internship Match</span>
                  </h4>
                  <form onSubmit={handleMatch} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Scholar Name & Degree</label>
                      <input type="text" readOnly value={`${selectedStudent.student_name} (${selectedStudent.target_domain.split('&')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-teal-400" />
                    </div>
                    <button type="submit" disabled={isMatching} className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isMatching ? 'animate-spin' : ''}`} />
                      <span>{isMatching ? 'Evaluating HPLC & GMP Competencies...' : 'Match Industry Internship & Generate Portfolio'}</span>
                    </button>
                  </form>
                  {matchResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Role: <strong className="text-teal-400 font-mono text-xs">{matchResult.matchedRole}</strong></div>
                      <div>Stipend: <strong className="text-emerald-400 font-mono text-xs">{matchResult.stipend}</strong></div>
                      <div>Compatibility: <strong className="text-amber-300 font-mono text-xs">{matchResult.compatibility}</strong></div>
                      <div>Gaps: <strong className="text-rose-400 font-mono text-xs">{matchResult.skillGap}</strong></div>
                      <div>Action: <strong className="text-white font-mono text-xs block mt-0.5">{matchResult.recommendation}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: JOBS */}
        {tab === 'jobs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {opportunities.map((o, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-teal-400 font-bold">{o.company}</span>
                  <span className="text-emerald-400 font-bold">{o.stipend}</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{o.role} ({o.openings} Openings)</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Required Competencies: {o.skills}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: FACULTY */}
        {tab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {faculty.map((f, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">{f.grant}</span>
                <h4 className="font-bold text-sm text-white font-sans">{f.title}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Collaborators: <strong className="text-amber-300">{f.sponsor}</strong></div>
                  <div>Eligibility: <strong className="text-white">{f.eligibility}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: PORTFOLIO */}
        {tab === 'portfolio' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-teal-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-950 border border-teal-500 flex items-center justify-center text-teal-400">
              <FileCheck className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">Student Digital Skill Portfolio & Blockchain Credentials</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Maintains tamper-proof records of verified lab hours, HPLC/HPTLC chromatography competencies, Schedule T GMP compliance, and industrial supervisor feedback to boost placement success across India's growing AYUSH pharma ecosystem.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-teal-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
