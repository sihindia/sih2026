import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Video, 
  Share2, 
  Layout, 
  Presentation, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  Clock, 
  Layers, 
  RefreshCw, 
  Printer, 
  ChevronRight, 
  Globe 
} from 'lucide-react';

import docsData from './data/source_intelligence_documents.json';
import artifactsData from './data/generated_transformation_artifacts.json';
import statsData from './data/transformation_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'mr'>('hi');
  const [docs, setDocs] = useState(docsData);
  const [selectedDoc, setSelectedDoc] = useState(docsData[0]);
  const [artifacts, setArtifacts] = useState<any>(artifactsData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'transform' | 'video' | 'advisory' | 'social' | 'slides'>('transform');

  // Multi-format toggles
  const [selectedFormats, setSelectedFormats] = useState({
    video: true,
    advisory: true,
    linkedin: true,
    twitter: true,
    infographic: true,
    execSummary: true,
    slides: true
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleTransform = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab('video');
    }, 450);
  };

  const currentArt = artifacts["CTI-NTRO-2026-089"] || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>NTRO • KRITITRANSFORM 360 GENAI CONTENT TRANSFORMATION ENGINE • SIH26154</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              KritiTransform 360: Automated Gen AI Multi-Modal Content Studio
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Transform Complex Cyber Threat Intelligence into Videos, National Advisories, Social Threads, Infographics & Slide Decks
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'transform', label: '📝 Source Ingestion & Studio' },
            { id: 'video', label: '🎬 Video Script & Storyboard' },
            { id: 'advisory', label: '📜 National Advisory & Exec Brief' },
            { id: 'social', label: '📱 Social Hub (LinkedIn & X Thread)' },
            { id: 'slides', label: '📊 Infographics & Presentation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: INGESTION & STUDIO
           ========================================================================= */}
        {activeTab === 'transform' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {docs.map((d) => (
                <button
                  key={d.doc_id}
                  onClick={() => setSelectedDoc(d)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDoc.doc_id === d.doc_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{d.doc_id}</span>
                    <span className="text-rose-400">{d.urgency}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? d.title_hi : d.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{d.author_agency}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-purple-400 text-xs font-mono font-bold">SOURCE CONTENT INPUT</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedDoc.title}</h3>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 mt-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {lang === 'hi' ? selectedDoc.raw_text_hi : selectedDoc.raw_text}
                </div>
              </div>

              {/* Format selection toggles */}
              <div className="space-y-2">
                <span className="text-slate-400 text-xs uppercase font-bold font-mono">Select Target Output Formats (Multi-Select)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'video', label: '🎬 Video Script Package' },
                    { key: 'advisory', label: '📜 National Advisory' },
                    { key: 'linkedin', label: '💼 LinkedIn Post' },
                    { key: 'twitter', label: '🐦 X (Twitter) Thread' },
                    { key: 'infographic', label: '📊 Infographic Blueprint' },
                    { key: 'execSummary', label: '📑 Executive Brief' },
                    { key: 'slides', label: '🖥️ Presentation Slides' }
                  ].map((f) => (
                    <div key={f.key} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-xs font-bold text-white">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleTransform}>
                <button type="submit" disabled={isGenerating} className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans">
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Synthesizing 7 Deliverables across LLM Pipeline...' : 'Generate All 7 Communication Deliverables Simultaneously ➔'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: VIDEO PACKAGE
           ========================================================================= */}
        {activeTab === 'video' && currentArt.video_package && (
          <div className="space-y-6 font-mono text-xs">
            <div className="bg-slate-900 p-6 rounded-3xl border border-purple-800/80 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-purple-400 font-bold text-[10px] uppercase">AUTO-GENERATED VIDEO PACKAGE</span>
                  <h4 className="text-base font-black text-white font-sans mt-0.5">{currentArt.video_package.title}</h4>
                </div>
                <span className="px-3 py-1 bg-purple-950 text-purple-300 rounded-xl font-bold font-mono">Duration: {currentArt.video_package.target_duration_s}s</span>
              </div>

              <div className="space-y-3 font-sans">
                {currentArt.video_package.scenes.map((s: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono font-bold text-purple-400">
                      <span>Scene {idx + 1}: {s.scene}</span>
                      <span>{s.timestamp}</span>
                    </div>
                    <div className="text-slate-200 text-xs font-serif italic">"{s.voiceover}"</div>
                    <div className="text-[11px] text-slate-400 font-mono">Visual Prompt: <span className="text-amber-300">{s.visual_prompt}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: NATIONAL ADVISORY
           ========================================================================= */}
        {activeTab === 'advisory' && currentArt.national_advisory && (
          <div className="space-y-6 font-mono text-xs">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 shadow-2xl">
              <div className="border-b border-rose-500/40 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-rose-400 font-bold text-[10px]">CERT-IN / NTRO THREAT DIRECTIVE</span>
                  <h4 className="text-lg font-black text-white font-sans mt-0.5">{currentArt.national_advisory.advisory_id}</h4>
                </div>
                <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl font-bold font-mono">
                  {currentArt.national_advisory.severity}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-slate-950 rounded-xl">
                  <strong>Affected Systems:</strong> <span className="text-slate-300">{currentArt.national_advisory.affected_systems}</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <strong className="text-purple-400 uppercase font-mono text-[10px]">Mandatory Remediation Steps:</strong>
                  {currentArt.national_advisory.remediation_steps.map((r: string, idx: number) => (
                    <div key={idx} className="text-slate-200">{r}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: SOCIAL HUB
           ========================================================================= */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
            {/* LinkedIn Post */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-blue-900/60 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-bold text-sm text-white font-sans">💼 LinkedIn Executive Post</h4>
                <span className="text-blue-400 text-[10px]">C-LEVEL SYNTHESIS</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {currentArt.linkedin_post?.body}
              </div>
            </div>

            {/* X Thread */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-bold text-sm text-white font-sans">🐦 X (Twitter) Threat Thread</h4>
                <span className="text-cyan-400 text-[10px]">4 TWEETS</span>
              </div>
              <div className="space-y-2 font-sans text-xs">
                {currentArt.x_twitter_thread?.map((t: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-slate-200">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: INFOGRAPHIC & SLIDES
           ========================================================================= */}
        {activeTab === 'slides' && (
          <div className="space-y-6 font-mono text-xs">
            {/* Infographic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentArt.infographic_blueprint?.quadrants.map((q: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
                  <span className="text-slate-500 text-[9px] uppercase block">{q.title}</span>
                  <span className="text-xl font-black text-purple-400 block">{q.stat}</span>
                  <span className="text-slate-400 text-[10px]">{q.color}</span>
                </div>
              ))}
            </div>

            {/* Presentation Slides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentArt.presentation_slides?.map((slide: any) => (
                <div key={slide.slide_no} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3 font-sans">
                  <div className="text-[10px] font-mono text-purple-400 font-bold">Slide {slide.slide_no}</div>
                  <h5 className="font-bold text-sm text-white">{slide.title}</h5>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {slide.bullets.map((b: string, idx: number) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
