import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Layers, 
  Zap, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Code, 
  Sliders, 
  Building2, 
  ChevronRight, 
  Printer, 
  Share2, 
  Send, 
  Trophy, 
  Flame, 
  Activity 
} from 'lucide-react';

import modulesData from './data/learning_modules.json';
import pathsData from './data/adaptive_paths.json';
import glossaryData from './data/vernacular_glossary.json';
import experimentsData from './data/virtual_experiments.json';
import credentialsData from './data/student_microcredentials.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'mr'>('hi');
  const [modules, setModules] = useState(modulesData);
  const [selectedModule, setSelectedModule] = useState(modulesData[0]);
  const [experiments, setExperiments] = useState(experimentsData);
  const [selectedExp, setSelectedExp] = useState(experimentsData[0]);
  const [activeTab, setActiveTab] = useState<'modules' | 'tutor' | 'labs' | 'glossary' | 'credentials'>('modules');

  // Socratic Doubt Solver State
  const [doubtQuestion, setDoubtQuestion] = useState('How does an AVL tree decide between single and double rotations?');
  const [isThinking, setIsThinking] = useState(false);
  const [socraticResponse, setSocraticResponse] = useState<any>({
    hint1: "Look at the sign of the balance factors of the unbalance node and its child.",
    hint2: "If parent is +2 (Left) and child is -1 (Right), this creates an LR 'Zig-Zag' imbalance requiring a double rotation.",
    lab: "EXP-CS-BST-01 (AVL Tree Rotation Lab)"
  });

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    setIsThinking(true);
    setTimeout(() => {
      setSocraticResponse({
        hint1: `Analyzing concept: "${doubtQuestion.slice(0, 40)}..."`,
        hint2: "Step 1: Express the condition mathematically. Step 2: Compare balance factor signs (Same Signs = Single LL/RR; Opposite Signs = Double LR/RL).",
        lab: "EXP-CS-BST-01 (AVL Tree Interactive Simulator)"
      });
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-400 animate-bounce" />
              <span>AICTE • MIC-STUDENT INNOVATION • VIDYASETU AI SMART EDUCATION • SIH26207</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              VidyaSetu AI: Smart Adaptive Learning, Socratic Tutor & NCrF Micro-Credentials
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Personalized Knowledge Graphs, Multilingual Bhashini Translation, 3D Virtual Labs & Academic Bank of Credits (ABC)
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'modules', label: '🎓 Adaptive Course Modules', count: modules.length },
            { id: 'tutor', label: '🧠 Socratic AI Doubt Mentor' },
            { id: 'labs', label: '🔬 Interactive 3D Virtual Lab', count: experiments.length },
            { id: 'glossary', label: '🌐 Multilingual Bhashini Glossary', count: glossaryData.length },
            { id: 'credentials', label: '📜 Academic Bank of Credits (ABC)', count: credentialsData.length }
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
            VIEW 1: ADAPTIVE COURSE MODULES
           ========================================================================= */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {modules.map((m) => (
                <button
                  key={m.module_id}
                  onClick={() => setSelectedModule(m)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedModule.module_id === m.module_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{m.module_id}</span>
                    <span className="text-cyan-300">{m.ncrf_credits} NCrF Credits</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? m.title_hi : m.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{m.category}</div>
                  <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{m.comprehension_velocity}</span>
                    <span>{m.completion_rate_pct}% Done</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Module Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Syllabus & Knowledge Graph */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-400">{selectedModule.module_id} • {selectedModule.difficulty}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedModule.title}</h3>
                    <p className="text-xs text-slate-400">{selectedModule.category}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold font-mono">
                    {selectedModule.ncrf_credits} Academic Credits
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 font-bold text-[10px] uppercase font-mono block">TOPICS & KNOWLEDGE GRAPH NODES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModule.topics_covered.map((t: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-900 text-cyan-300 border border-slate-800 rounded-lg text-xs font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-indigo-950">
                    <span className="text-slate-500 block text-[9px]">ENROLLED STUDENTS</span>
                    <span className="text-xl font-black text-indigo-400 mt-1 block">{selectedModule.enrolled_students.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">COMPLETION RATE</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">{selectedModule.completion_rate_pct}%</span>
                  </div>
                </div>
              </div>

              {/* Right 5: Socratic Action Quick Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>Adaptive Study Track</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      AI PERSONALIZED
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Based on your diagnostic assessment, the engine has tailored the curriculum to accelerate past fundamental chapters and focus on deep visual simulation.
                  </p>

                  <button
                    onClick={() => setActiveTab('tutor')}
                    className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Launch 24/7 Socratic AI Doubt Mentor ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: SOCRATIC AI DOUBT MENTOR
           ========================================================================= */}
        {activeTab === 'tutor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-mono">
              
              {/* Left 6: Ask Question Form */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Ask a Conceptual STEM Doubt (Socratic Tutor)</span>
                </h4>
                <form onSubmit={handleAskDoubt} className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Your Technical Question</label>
                    <textarea rows={3} required value={doubtQuestion} onChange={(e) => setDoubtQuestion(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono" />
                  </div>
                  <button type="submit" disabled={isThinking} className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                    <RefreshCw className={`w-4 h-4 ${isThinking ? 'animate-spin' : ''}`} />
                    <span>{isThinking ? 'Socratic AI Reasoning...' : 'Get Guided Socratic Hints'}</span>
                  </button>
                </form>
              </div>

              {/* Right 6: Socratic Guided Response */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Socratic Guidance & Conceptual Hints</span>
                </h4>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="space-y-1">
                    <span className="text-indigo-400 font-bold text-[10px] block uppercase">💡 SOCRATIC HINT #1:</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{socraticResponse.hint1}</p>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-slate-900">
                    <span className="text-cyan-400 font-bold text-[10px] block uppercase">💡 SOCRATIC HINT #2:</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{socraticResponse.hint2}</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl text-[11px] text-emerald-400">
                    <strong>Recommended 3D Lab:</strong> {socraticResponse.lab}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: 3D VIRTUAL LAB & SIMULATOR
           ========================================================================= */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {experiments.map((e) => (
                <div key={e.exp_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-indigo-400 font-bold text-[10px]">{e.exp_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{e.title}</h4>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-xs">{e.concept}</p>

                  <div className="p-3 bg-slate-950 rounded-xl font-mono text-cyan-300 text-[11px] whitespace-pre-wrap border border-slate-800">
                    {e.code_snippet}
                  </div>

                  <button
                    onClick={() => alert(`Launching Interactive Sandbox for: ${e.title}`)}
                    className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md"
                  >
                    Launch Interactive 3D Simulation ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: BHASHINI VERNACULAR GLOSSARY
           ========================================================================= */}
        {activeTab === 'glossary' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-indigo-500/40 pb-3">
              <span className="text-indigo-400 font-bold text-[10px] uppercase">BHASHINI AI • MULTILINGUAL STEM GLOSSARY</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Engineering Terminology in Indian Languages</h4>
            </div>

            <div className="space-y-3">
              {glossaryData.map((g, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-400 font-bold text-sm font-sans">{g.term_en}</span>
                    <span className="text-emerald-400 font-bold">{g.term_hi} • {g.term_ta}</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">{g.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: ACADEMIC BANK OF CREDITS (ABC)
           ========================================================================= */}
        {activeTab === 'credentials' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-indigo-500/40 pb-4">
              <div>
                <span className="text-indigo-400 font-bold text-[10px] uppercase">MINISTRY OF EDUCATION • ACADEMIC BANK OF CREDITS (ABC)</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Verifiable NCrF Micro-Credential Certificate</h3>
              </div>
              <GraduationCap className="w-12 h-12 text-indigo-400" />
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between"><span className="text-slate-500">Student:</span><span className="text-white font-bold font-sans">Rohan Sharma</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Badge:</span><span className="text-indigo-400 font-bold">AICTE Certified Advanced Data Structures</span></div>
              <div className="flex justify-between"><span className="text-slate-500">NCrF Level / Credits:</span><span className="text-emerald-400 font-bold">Level 6.0 (4.0 Credits Deposited to ABC)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">ABC Account:</span><span className="text-cyan-300">ABC-MHRD-2026-9812-4019</span></div>
            </div>

            <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-indigo-400 font-bold text-[10px] uppercase block">CRYPTOGRAPHIC AUDIT SEAL:</span>
                <span className="text-[10px] text-cyan-300 font-mono">{credentialsData[0].cryptographic_hash}</span>
              </div>
              <button onClick={() => alert("ABC Certificate Exported.")} className="px-4 py-2 bg-indigo-500 text-slate-950 font-bold rounded-xl text-xs font-sans">
                Export ABC Digital Certificate
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
