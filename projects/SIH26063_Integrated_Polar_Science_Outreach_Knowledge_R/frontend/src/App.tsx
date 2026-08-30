import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  Video, 
  RefreshCw, 
  FileText, 
  Layers, 
  Activity, 
  Globe 
} from 'lucide-react';

import datasetsData from './data/polar_science_open_datasets_repository.json';
import toursData from './data/polar_stations_3d_virtual_tours.json';
import modulesData from './data/multilingual_science_outreach_modules.json';
import statsData from './data/dhruvagyan_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta' | 'bn'>('en');
  const [datasets, setDatasets] = useState(datasetsData);
  const [selectedDataset, setSelectedDataset] = useState(datasetsData[0]);
  const [tours, setTours] = useState(toursData);
  const [modules, setModules] = useState(modulesData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'datasets' | 'tours' | 'modules' | 'journalism' | 'stats'>('datasets');

  // Interactive AI Science Journalism Generator
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyResult, setStoryResult] = useState<any>({
    title: "Unlocking 800 Years of Earth's Climate Secrets Trapped in Antarctic Ice",
    summary: "NCPOR scientists extract 200m deep ice cores from Maitri Station reveals prehistoric volcanic eruptions and greenhouse gas baselines.",
    fairDoi: "doi:10.5061/ncpor.polar.cdml2026 (Open NetCDF/CSV Access)",
    targetClass: "High School & College Curriculum Kit (Class 9-12)",
    socialText: "Did you know Antarctic ice cores preserve ancient atmosphere? Read more on MoES DhruvaGyan!"
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setStoryResult({
        title: "Unlocking 800 Years of Earth's Climate Secrets Trapped in Antarctic Ice",
        summary: "NCPOR scientists extract 200m deep ice cores from Maitri Station reveals prehistoric volcanic eruptions and greenhouse gas baselines.",
        fairDoi: "doi:10.5061/ncpor.polar.cdml2026 (Open NetCDF/CSV Access)",
        targetClass: "High School & College Curriculum Kit (Class 9-12)",
        socialText: "Did you know Antarctic ice cores preserve ancient atmosphere? Read more on MoES DhruvaGyan!"
      });
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold tracking-wider">
              <BookOpen className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>MOES / NCPOR • DHRUVAGYAN 360 POLAR SCIENCE REPOSITORY &amp; OUTREACH • SIH26063</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MoES DhruvaGyan: Integrated Polar Science Outreach &amp; Open Knowledge Repository
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              National Centre for Polar and Ocean Research (NCPOR) FAIR-Compliant Open Access Data Repository (Ice Cores, Oceanography, Biodiversity), 3D Virtual Station Tours &amp; Multilingual AI Science Journalism
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'datasets', label: '🔬 Open Research Datasets', count: datasets.length },
            { id: 'tours', label: '🏔️ 3D Virtual Station Tours', count: tours.length },
            { id: 'modules', label: '📖 Educational Modules', count: modules.length },
            { id: 'journalism', label: '✍️ AI Science Journalism' },
            { id: 'stats', label: '📊 DhruvaGyan Telemetry' }
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
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-purple-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: DATASETS
           ========================================================================= */}
        {activeTab === 'datasets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {datasets.map((d) => (
                <button
                  key={d.dataset_id}
                  onClick={() => setSelectedDataset(d)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedDataset.dataset_id === d.dataset_id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-2 ring-purple-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-purple-400">{d.dataset_id}</span>
                    <span className="text-emerald-400">{d.citation_count} Citations</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {d.dataset_title.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">{d.theatre_domain}</div>
                  <div className="text-[10px] text-purple-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{d.file_size_mb} MB</span>
                    <span className="text-emerald-400">{d.fair_compliance_rating.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-purple-400 font-bold">{selectedDataset.dataset_id} • {selectedDataset.theatre_domain}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedDataset.dataset_title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold font-mono">
                    {selectedDataset.access_status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-purple-400 block text-[9px] font-bold uppercase">FAIR-COMPLIANT OPEN SCIENTIFIC PROXIES:</span>
                  <div className="text-white font-sans text-xs">
                    Measured Proxies: <strong className="text-amber-300">{selectedDataset.measured_proxies}</strong>
                  </div>
                  <div className="text-emerald-400 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    DOI Identifier: {selectedDataset.doi_identifier}
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Depth: {selectedDataset.sampling_depth_m}m | Chronological Span: {selectedDataset.chronological_span}
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Compliance: {selectedDataset.fair_compliance_rating} ({selectedDataset.file_size_mb} MB Open NetCDF/CSV)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">GLOBAL CITATIONS</span><span className="text-emerald-400 font-bold">{selectedDataset.citation_count} Peer-Reviewed Papers</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">FAIR OPEN DATA</span><span className="text-purple-400 font-bold">100% Free Open Access</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('tours')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore 3D Virtual Tours of Maitri &amp; Bharati Stations ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Instant Science Outreach Generator</span>
                  </h4>
                  <form onSubmit={handleGenerate} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Select Polar Dataset</label>
                      <input type="text" readOnly value={`${selectedDataset.dataset_id} (${selectedDataset.theatre_domain.split('(')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-purple-400" />
                    </div>
                    <button type="submit" disabled={isGenerating} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Synthesizing Multilingual Science Journalism...' : 'Generate Educational Story & Infographic'}</span>
                    </button>
                  </form>
                  {storyResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Title: <strong className="text-emerald-400 font-mono text-xs">{storyResult.title}</strong></div>
                      <div>Summary: <span className="text-slate-300 text-xs">{storyResult.summary}</span></div>
                      <div>Curriculum: <strong className="text-cyan-300 font-mono text-xs">{storyResult.targetClass}</strong></div>
                      <div>DOI Link: <strong className="text-purple-400 font-mono text-xs">{storyResult.fairDoi}</strong></div>
                      <div>Social Thread: <strong className="text-white font-mono text-xs block mt-0.5">{storyResult.socialText}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TOURS */}
        {tab === 'tours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {tours.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-400 font-bold">{t.location}</span>
                  <span className="text-emerald-400 font-bold">360° VR Ready</span>
                </div>
                <h4 className="font-bold text-sm text-white font-sans">{t.facility}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">Panoramas: {t.panoramas}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-cyan-300 font-mono text-[10px]">URL: {t.virtual_reality_url}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: MODULES */}
        {tab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {modules.map((m, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{m.target_level}</span>
                <h4 className="font-bold text-sm text-white font-sans">{m.topic}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{m.key_takeaway}</p>
                <div className="p-2 bg-slate-950 rounded-xl text-purple-300 font-mono text-[10px]">Languages: {m.languages}</div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: JOURNALISM */}
        {tab === 'journalism' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-purple-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-400">
              <FileText className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">AI Science Journalism &amp; Dissemination Engine</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Automatically converts complex cryospheric peer-reviewed datasets and glaciological ice-core discoveries into bite-sized educational infographics, school curricula, and social media releases in 12+ Indian languages.
            </p>
          </div>
        )}

        {/* VIEW 5: STATS */}
        {tab === 'stats' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">{s.metric}</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">{s.value}</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">{s.trend}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
