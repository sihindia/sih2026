import React from 'react';
import { 
  X, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Code, 
  Terminal, 
  Rocket, 
  Award, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Zap, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Lightbulb,
  Laptop
} from 'lucide-react';
import { copyToClipboard } from '../utils/export';

interface AboutAndTutorialModalProps {
  onClose: () => void;
  onOpenGuidelines: () => void;
}

export const AboutAndTutorialModal: React.FC<AboutAndTutorialModalProps> = ({ 
  onClose,
  onOpenGuidelines
}) => {
  const [activeSection, setActiveSection] = React.useState<'why' | 'tutorial' | 'team' | 'cheatsheet'>('why');
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    copyToClipboard(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flugelsoft Labs Student Empowerment Initiative</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Software is Easy — Build for India in SIH 2026
              </h2>
              <p className="text-xs sm:text-sm text-brand-100 max-w-2xl leading-relaxed">
                Why we created this platform, why every student should participate in Smart India Hackathon, and a complete zero-cost project setup guide.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-3 border-t border-white/20 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveSection('why')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'why'
                  ? 'bg-white text-brand-700 shadow-md font-extrabold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>Why We Built This & Why SIH?</span>
            </button>

            <button
              onClick={() => setActiveSection('tutorial')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'tutorial'
                  ? 'bg-white text-brand-700 shadow-md font-extrabold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-brand-600" />
              <span>Step-by-Step Project Setup Tutorial</span>
            </button>

            <button
              onClick={() => setActiveSection('team')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'team'
                  ? 'bg-white text-brand-700 shadow-md font-extrabold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Winning Team Playbook</span>
            </button>

            <button
              onClick={() => setActiveSection('cheatsheet')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'cheatsheet'
                  ? 'bg-white text-brand-700 shadow-md font-extrabold'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>Copy-Paste Commands Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          
          {/* SECTION 1: WHY WE BUILT THIS & WHY SIH */}
          {activeSection === 'why' && (
            <div className="space-y-6">
              
              {/* Mission Statement */}
              <div className="bg-brand-50/80 dark:bg-brand-950/40 p-6 rounded-3xl border border-brand-200 dark:border-brand-800 space-y-3">
                <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-black text-base">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>The Mission Behind This Application</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  When browsing government hackathon websites, students often face cluttered portals, hard-to-read tables, scattered PDFs, and an overwhelming feeling that <em>&quot;these problems are too complex for me.&quot;</em>
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong>Flugelsoft Labs</strong> built this open exploration portal with one core belief: <strong>Software is not magic — it is accessible, creative, and for every single student.</strong> Whether you are in your 1st year or final year, studying Computer Science, Electronics, Mechanical, Civil, Agriculture, or Biotechnology, you have the ability to solve real national challenges.
                </p>
              </div>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center font-bold">
                    🚀
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Software is Approachable</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    In 2026, modern frameworks (Vite, React, FastAPI), free AI models (Groq, Gemini), and component libraries make building full applications faster than ever. You don&apos;t need years of experience to create a working prototype.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center font-bold">
                    🇮🇳
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Solve Real Problems</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Smart India Hackathon problem statements come directly from Central Ministries, Indian Railways, Coal Mines, Meteorological Dept, and Healthcare bodies. Your code can impact millions of citizens.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center font-bold">
                    🏆
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Career Accelerant</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Participating in SIH gives you unmatched visibility, direct interaction with government dignitaries & industry mentors, cash prizes up to ₹1,00,000 per problem, and startup incubation support.
                  </p>
                </div>

              </div>

              {/* Overcoming the Fear of Participation */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>3 Common Myths Debunked</span>
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-red-600 dark:text-red-400 block mb-0.5">Myth 1: &quot;I need to be a coding genius to participate.&quot;</strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      <strong>Truth:</strong> SIH jury evaluates <em>clarity of understanding, architectural feasibility, and practical usability</em>. A clean, thoughtful 3-page prototype with good presentation beats an overcomplicated unfinished system every time.
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-red-600 dark:text-red-400 block mb-0.5">Myth 2: &quot;Cloud hosting and AI APIs are expensive.&quot;</strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      <strong>Truth:</strong> Everything demonstrated in this portal uses <strong>100% Free Tiers</strong> (Vercel, Render, Supabase, Groq, OpenStreetMap). You can build, deploy, and demo your entire project with <strong>₹0 cloud expense</strong>.
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-red-600 dark:text-red-400 block mb-0.5">Myth 3: &quot;Non-CS branch students cannot contribute.&quot;</strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      <strong>Truth:</strong> Multi-disciplinary teams perform best! Civil & mechanical engineers understand landslide & sensor kinematics, biotech students excel at medtech workflows, and business students craft winning pitch decks.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SECTION 2: STEP-BY-STEP PROJECT SETUP TUTORIAL */}
          {activeSection === 'tutorial' && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  How to Build & Run Any SIH Project from Scratch (Zero Cost)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Follow this complete step-by-step masterclass to get your frontend, backend, database, and AI working locally and deployed live to the cloud.
                </p>
              </div>

              {/* Step 1: Prerequisites */}
              <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">1</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Install Free Development Tools</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Download and install these 3 free industry-standard tools on your laptop:
                </p>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>VS Code:</strong> Code editor (<a href="https://code.visualstudio.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">code.visualstudio.com</a>)</li>
                  <li><strong>Node.js (LTS v20+):</strong> JavaScript/TypeScript runtime (<a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-brand-600 underline">nodejs.org</a>)</li>
                  <li><strong>Python (v3.10+):</strong> Backend & AI runtime (<a href="https://python.org" target="_blank" rel="noreferrer" className="text-brand-600 underline">python.org</a>)</li>
                </ul>
              </div>

              {/* Step 2: Frontend Setup */}
              <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">2</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">Setup React 18 + Vite + Tailwind Frontend (3 Minutes)</h4>
                  </div>
                  <button
                    onClick={() => handleCopyCode(`npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer lucide-react
npx tailwindcss init -p
npm run dev`, 1)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 1 ? 'Copied!' : 'Copy Commands'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
                  <pre>{`# 1. Create lightning-fast Vite React TypeScript project
npm create vite@latest frontend -- --template react-ts
cd frontend

# 2. Install dependencies & Tailwind CSS
npm install
npm install -D tailwindcss postcss autoprefixer lucide-react
npx tailwindcss init -p

# 3. Start local development server
npm run dev`}</pre>
                </div>
              </div>

              {/* Step 3: Backend API Setup */}
              <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">3</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">Setup Python FastAPI Microservice (2 Minutes)</h4>
                  </div>
                  <button
                    onClick={() => handleCopyCode(`mkdir backend && cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pydantic requests python-dotenv
uvicorn main:app --reload --port 8000`, 2)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 2 ? 'Copied!' : 'Copy Commands'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
                  <pre>{`# 1. Create backend folder and virtual environment
mkdir backend && cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 2. Install FastAPI and Uvicorn
pip install fastapi uvicorn pydantic requests python-dotenv

# 3. Launch server with hot reload
uvicorn main:app --reload --port 8000`}</pre>
                </div>
              </div>

              {/* Step 4: Free Database & Free AI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
                    <span>Free Database (Supabase)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    1. Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">supabase.com</a> and sign up with GitHub.<br />
                    2. Create a free project (500MB PostgreSQL).<br />
                    3. Open the <strong>SQL Editor</strong>, paste your table definitions from our portal&apos;s Starter Kit, and click <strong>RUN</strong>.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs">5</span>
                    <span>Free AI Model (Groq Cloud)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    1. Go to <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">console.groq.com</a>.<br />
                    2. Generate a free API Key in 10 seconds.<br />
                    3. Use <code>llama-3-70b-versatile</code> for instant, zero-cost AI RAG, summarization, and anomaly classification.
                  </p>
                </div>

              </div>

              {/* Step 5: Free Cloud Deployment */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">6</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Deploy Live to the World for $0 (Vercel + Render)</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">Frontend Deployment (Vercel):</strong>
                    Push code to GitHub → Import repo to Vercel → Click <strong>Deploy</strong>. You get a live <code>https://your-app.vercel.app</code> URL with free SSL!
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <strong className="text-slate-900 dark:text-white block mb-1">Backend Deployment (Render):</strong>
                    Create a free Web Service on Render → Connect GitHub → Set Start Command to <code>uvicorn main:app --host 0.0.0.0 --port $PORT</code>.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SECTION 3: WINNING TEAM PLAYBOOK */}
          {activeSection === 'team' && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  How to Build a 6-Member Winning SIH Team
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Smart India Hackathon requires teams of exactly 6 students (with at least 1 female team member). Here is the winning role distribution:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs">Role 1</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Team Leader & Presenter</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Oversees project timeline, coordinates between members, crafts the 5-slide PPT, and delivers the jury pitch with confidence.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-bold text-xs">Role 2 & 3</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Frontend & UI/UX Engineers</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Build responsive dashboards, forms, interactive charts, and maps using React, Vite, and Tailwind CSS.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs">Role 4 & 5</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Backend & AI/Data Engineers</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Develop FastAPI endpoints, integrate Groq/Gemini AI APIs, structure Supabase SQL databases, and write data parsing scripts.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 sm:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs">Role 6</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Domain Specialist, QA & PPT Architect</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Researches official ministry regulations (e.g. Legal Metrology rules, CTRI guidelines, Copernicus datasets), creates realistic test data, verifies edge cases, and designs the pitch presentation.
                  </p>
                </div>

              </div>

              {/* 5 Slide Pitch Winning Formula */}
              <div className="bg-brand-50 dark:bg-brand-950/40 p-6 rounded-3xl border border-brand-200 dark:border-brand-800 space-y-3">
                <h3 className="text-sm font-bold text-brand-950 dark:text-brand-200">
                  The Mandatory 5-Slide SIH Presentation Blueprint
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong className="text-brand-600 block mb-1">Slide 1:</strong>
                    Problem Statement & Real-World Pain Points.
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong className="text-brand-600 block mb-1">Slide 2:</strong>
                    Proposed Innovation & Unique Solution Value.
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong className="text-brand-600 block mb-1">Slide 3:</strong>
                    Technical Architecture & Data Flow Diagram.
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong className="text-brand-600 block mb-1">Slide 4:</strong>
                    Feasibility, Impact & Commercial Viability.
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong className="text-brand-600 block mb-1">Slide 5:</strong>
                    Team Member Roles & Execution Roadmap.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SECTION 4: COPY-PASTE COMMANDS CHEAT SHEET */}
          {activeSection === 'cheatsheet' && (
            <div className="space-y-4">
              
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Terminal Commands Quick Cheat Sheet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Copy and paste these commands directly into your terminal to start building.
                </p>
              </div>

              <div className="space-y-3">
                
                {/* 1. Full Stack Starter */}
                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800 text-[11px]">
                    <span># Complete Full-Stack Rapid Bootstrap</span>
                    <button
                      onClick={() => handleCopyCode(`git init sih2026-app && cd sih2026-app
npm create vite@latest frontend -- --template react-ts -y
cd frontend && npm i && npm i -D tailwindcss postcss autoprefixer lucide-react && npx tailwindcss init -p
cd .. && mkdir backend && cd backend
python3 -m venv venv && source venv/bin/activate
pip install fastapi uvicorn pydantic requests python-dotenv`, 10)}
                      className="text-brand-400 hover:text-brand-300 font-sans font-bold flex items-center gap-1"
                    >
                      {copiedIndex === 10 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === 10 ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap">{`git init sih2026-app && cd sih2026-app
npm create vite@latest frontend -- --template react-ts -y
cd frontend && npm i && npm i -D tailwindcss postcss autoprefixer lucide-react && npx tailwindcss init -p
cd .. && mkdir backend && cd backend
python3 -m venv venv && source venv/bin/activate
pip install fastapi uvicorn pydantic requests python-dotenv`}</pre>
                </div>

                {/* 2. Run Both Frontend and Backend */}
                <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800 text-[11px]">
                    <span># Running Backend & Frontend in Parallel</span>
                    <button
                      onClick={() => handleCopyCode(`# Terminal 1 (Backend):
cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000

# Terminal 2 (Frontend):
cd frontend && npm run dev`, 11)}
                      className="text-brand-400 hover:text-brand-300 font-sans font-bold flex items-center gap-1"
                    >
                      {copiedIndex === 11 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === 11 ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap">{`# Terminal 1 (Backend API):
cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000

# Terminal 2 (Frontend UI):
cd frontend && npm run dev`}</pre>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between flex-wrap gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Powered by <strong>Flugelsoft Labs</strong> — Building next-gen software for Indian innovation.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenGuidelines();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              Download Official Guidelines & PPT
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
            >
              Start Exploring Statements
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
