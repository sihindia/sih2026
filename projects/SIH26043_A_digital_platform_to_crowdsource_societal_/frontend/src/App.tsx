import React, { useState } from 'react';
import { 
  Handshake, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  Building2, 
  RefreshCw, 
  Coins, 
  Award, 
  Layers, 
  Globe 
} from 'lucide-react';

import challengesData from './data/crowdsourced_societal_challenges.json';
import universitiesData from './data/universities_and_heis_matrix.json';
import partnersData from './data/industry_csr_funding_partners.json';
import statsData from './data/sahayogsetu_stats.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'sat' | 'mr' | 'bn'>('en');
  const [challenges, setChallenges] = useState(challengesData);
  const [selectedChallenge, setSelectedChallenge] = useState(challengesData[0]);
  const [universities, setUniversities] = useState(universitiesData);
  const [partners, setPartners] = useState(partnersData);
  const [stats, setStats] = useState(statsData);
  const [activeTab, setActiveTab] = useState<'challenges' | 'universities' | 'industry' | 'nep' | 'stats'>('challenges');

  // Interactive Challenge Routing Simulator
  const [isRouting, setIsRouting] = useState(false);
  const [routeResult, setRouteResult] = useState<any>({
    matchedHEI: "IIT (ISM) Dhanbad (Dept of Environmental Engineering)",
    facultyLead: "Prof. Dr. A. K. Pal (Chair, Mine Water Research Lab)",
    csrSponsor: "BCCL / Coal India CSR Foundation",
    grantAmount: "₹18,50,000 Seed Grant Sanctioned",
    nepCredits: "6 Academic Experiential Credits (NEP 2020 Aligned)"
  });

  const handleRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRouting(true);
    setTimeout(() => {
      setRouteResult({
        matchedHEI: "IIT (ISM) Dhanbad (Dept of Environmental Engineering)",
        facultyLead: "Prof. Dr. A. K. Pal (Chair, Mine Water Research Lab)",
        csrSponsor: "BCCL / Coal India CSR Foundation",
        grantAmount: "₹18,50,000 Seed Grant Sanctioned",
        nepCredits: "6 Academic Experiential Credits (NEP 2020 Aligned)"
      });
      setIsRouting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <Handshake className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>JHARKHAND • SAHAYOGSETU 360 CROWDSOURCING & HEI-INDUSTRY INNOVATION • SIH26043</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Jharkhand SahayogSetu: Digital Platform for Societal Challenges & University-Industry Problem Solving
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Citizen & Panchayat Problem Crowdsourcing with AI Thematic Routing to Higher Education Institutions (IIT, NIT, BAU, BIT Mesra), Industry CSR Co-Funding & NEP 2020 Experiential Credits
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('sat')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'sat' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>ᱥᱟᱱᱛᱟᱲᱤ</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'challenges', label: '💡 Crowdsourced Issues', count: challenges.length },
            { id: 'universities', label: '🎓 Universities & HEIs', count: universities.length },
            { id: 'industry', label: '🏭 Industry CSR Partners', count: partners.length },
            { id: 'nep', label: '📜 NEP 2020 Academic Credits' },
            { id: 'stats', label: '📊 SahayogSetu Telemetry' }
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
            VIEW 1: CHALLENGES
           ========================================================================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {challenges.map((c) => (
                <button
                  key={c.challenge_id}
                  onClick={() => setSelectedChallenge(c)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedChallenge.challenge_id === c.challenge_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{c.challenge_id}</span>
                    <span className="text-emerald-400">₹{(c.grant_awarded_inr / 100000).toFixed(1)}L Grant</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{c.originator.split('(')[0]}</div>
                  <div className="text-[10px] text-indigo-300 pt-1 border-t border-slate-800 flex justify-between font-bold">
                    <span>{c.thematic_domain.split(' ')[0]}</span>
                    <span className="text-cyan-300">{c.assigned_university.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-indigo-400 font-bold">{selectedChallenge.challenge_id} • {selectedChallenge.thematic_domain}</span>
                    <h3 className="font-bold text-base text-white font-sans mt-0.5">{selectedChallenge.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold font-mono">
                    {selectedChallenge.stage}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 block text-[9px] font-bold uppercase">CROWDSOURCED CITIZEN PROBLEM & HEI-INDUSTRY SOLUTION:</span>
                  <div className="text-amber-300 font-sans text-xs">
                    Originator: <strong className="text-white">{selectedChallenge.originator}</strong>
                  </div>
                  <div className="text-slate-300 font-sans text-xs pt-1 border-t border-slate-900">
                    Community Pain Point: "{selectedChallenge.problem_summary}"
                  </div>
                  <div className="text-cyan-300 font-sans text-xs pt-1 border-t border-slate-900 font-bold">
                    Assigned HEI: {selectedChallenge.assigned_university}
                  </div>
                  <div className="text-white font-sans text-[11px]">
                    Faculty Lead: {selectedChallenge.faculty_mentor}
                  </div>
                  <div className="text-emerald-400 font-sans text-[11px]">
                    Industry CSR Sponsor: {selectedChallenge.industry_csr_sponsor} (₹{selectedChallenge.grant_awarded_inr.toLocaleString()} Seed Grant)
                  </div>
                  <div className="text-purple-300 font-sans text-[11px] pt-1 border-t border-slate-900">
                    Deployment Status: {selectedChallenge.solution_status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">R&D SEED GRANT</span><span className="text-emerald-400 font-bold">₹{selectedChallenge.grant_awarded_inr.toLocaleString()}</span></div>
                  <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 block text-[8px]">NEP 2020 CREDITS</span><span className="text-indigo-400 font-bold">6 Academic Credits</span></div>
                </div>

                <button
                  onClick={() => setActiveTab('universities')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Explore Participating Jharkhand Universities & Incubation Hubs ➔</span>
                </button>
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>AI Challenge Match & Routing Engine</span>
                  </h4>
                  <form onSubmit={handleRoute} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Challenge Title & Domain</label>
                      <input type="text" readOnly value={`${selectedChallenge.title} (${selectedChallenge.thematic_domain.split('&')[0]})`} className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-400" />
                    </div>
                    <button type="submit" disabled={isRouting} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isRouting ? 'animate-spin' : ''}`} />
                      <span>{isRouting ? 'Classifying & Matching University Sandbox...' : 'Route Challenge to University Hub'}</span>
                    </button>
                  </form>
                  {routeResult && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-slate-300 font-sans text-xs">
                      <div>Assigned HEI: <strong className="text-cyan-300 font-mono text-xs">{routeResult.matchedHEI}</strong></div>
                      <div>Faculty Lead: <strong className="text-white font-mono text-xs">{routeResult.facultyLead}</strong></div>
                      <div>Industry CSR: <strong className="text-emerald-400 font-mono text-xs">{routeResult.csrSponsor}</strong></div>
                      <div>Grant: <strong className="text-amber-300 font-mono text-xs">{routeResult.grantAmount}</strong></div>
                      <div>Credits: <strong className="text-purple-300 font-mono text-xs block mt-0.5">{routeResult.nepCredits}</strong></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: UNIVERSITIES */}
        {tab === 'universities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {universities.map((u, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">STATE & CENTRAL HEI</span>
                <h4 className="font-bold text-sm text-white font-sans">{u.name}</h4>
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300">
                  <div>Core Domains: <strong className="text-cyan-300">{u.domains}</strong></div>
                  <div className="text-slate-400 text-xs pt-1 border-t border-slate-900">Incubator: {u.incubation}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: INDUSTRY */}
        {tab === 'industry' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {partners.map((p, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">{p.annual_budget} CSR POOL</span>
                <h4 className="font-bold text-sm text-white font-sans">{p.company}</h4>
                <p className="text-slate-300 text-xs font-sans p-3 bg-slate-950 rounded-xl">{p.focus}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: NEP */}
        {tab === 'nep' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-indigo-800/80 max-w-4xl mx-auto space-y-4 text-center font-mono text-xs shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-950 border border-indigo-500 flex items-center justify-center text-indigo-400">
              <Award className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white font-sans">NEP 2020 Experiential Learning & IP Framework</h4>
            <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
              Under National Education Policy 2020, students solve real-world Gram Panchayat challenges, earning mandatory 4-to-8 semester academic credits while retaining joint intellectual property (IP) patent rights with faculty mentors.
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
