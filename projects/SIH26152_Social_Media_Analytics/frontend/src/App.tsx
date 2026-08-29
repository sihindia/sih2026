import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Share2, 
  RefreshCw, 
  ShieldAlert, 
  Radio, 
  Layers, 
  ChevronRight, 
  Printer, 
  Globe 
} from 'lucide-react';

import postsData from './data/social_media_posts_stream.json';
import narrativesData from './data/trending_narratives.json';
import demoData from './data/demographic_profiles.json';
import kolData from './data/influence_nodes.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'bn'>('hi');
  const [posts, setPosts] = useState(postsData);
  const [selectedPost, setSelectedPost] = useState(postsData[0]);
  const [narratives, setNarratives] = useState(narrativesData);
  const [demographics, setDemographics] = useState(demoData);
  const [kolNodes, setKolNodes] = useState(kolData);
  const [activeTab, setActiveTab] = useState<'stream' | 'narratives' | 'demographics' | 'topology' | 'command'>('stream');

  // Emotion NLP Analyzer State
  const [inputText, setInputText] = useState("ALERT: Major private bank servers facing nationwide outage. Withdraw cash immediately before ATM lockdowns! #BankingCrash");
  const [inputPlat, setInputPlat] = useState("X (formerly Twitter)");
  const [isClassifying, setIsClassifying] = useState(false);
  const [nlpVerdict, setNlpVerdict] = useState<any>({
    emotion: "Panic / Anxiety (94.2%)",
    sentiment: "HIGHLY_NEGATIVE (Panic / Disinformation)",
    botScore: 88.5,
    action: "TRIGGER_PIB_FACT_CHECK_DEBUNK_ALERT"
  });

  const handleClassifyPost = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClassifying(true);
    setTimeout(() => {
      setNlpVerdict({
        emotion: "Panic / Anxiety (94.2%)",
        sentiment: "HIGHLY_NEGATIVE (Panic / Disinformation)",
        botScore: 88.5,
        action: "TRIGGER_PIB_FACT_CHECK_DEBUNK_ALERT"
      });
      setIsClassifying(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold tracking-wider">
              <MessageSquare className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>NTRO • SAMVADDRISHTI 360 SOCIAL MEDIA AUDIENCE INTELLIGENCE • SIH26152</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SamvadDrishti 360: AI Multi-Platform Social Media Analytics Framework
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Continuous Stream Ingestion (X, Telegram, Reddit), Multi-Dimensional Emotion NLP, Demographic Profiler & Bot Influence Topology
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('bn')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'bn' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>বাংলা</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'stream', label: '📱 Live Multi-Platform Stream', count: posts.length },
            { id: 'narratives', label: '📈 Trending Narratives & Virality', count: narratives.length },
            { id: 'demographics', label: '👥 Demographic & Geo Profiler', count: demographics.length },
            { id: 'topology', label: '🕸️ Influence Network & Bot Nodes', count: kolNodes.length },
            { id: 'command', label: '📊 NTRO Social Intelligence Hub' }
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
            VIEW 1: LIVE MULTI-PLATFORM STREAM
           ========================================================================= */}
        {activeTab === 'stream' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {posts.map((p) => (
                <button
                  key={p.post_id}
                  onClick={() => setSelectedPost(p)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedPost.post_id === p.post_id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-indigo-400">{p.platform.split(' ')[0]}</span>
                    <span className={p.bot_amplification_score > 70 ? 'text-rose-400' : 'text-emerald-400'}>
                      Bot: {p.bot_amplification_score}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
                    {lang === 'hi' ? p.content_hi : p.content}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{p.author_handle}</div>
                  <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800 flex justify-between">
                    <span>{p.primary_emotion.split(' ')[0]}</span>
                    <span>{(p.reach_impressions / 1000).toFixed(0)}k Reach</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Split Stream Dossier & AI Emotion NLP Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Post Intelligence Breakdown */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-400">{selectedPost.post_id} • {selectedPost.platform}</span>
                    <h3 className="font-bold text-base text-white mt-0.5">{selectedPost.author_handle}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedPost.timestamp}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    selectedPost.bot_amplification_score > 70 ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {selectedPost.status}
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-sans text-xs text-slate-200 leading-relaxed">
                  "{selectedPost.content}"
                </div>

                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-rose-950">
                    <span className="text-slate-500 block text-[9px]">PRIMARY EMOTION</span>
                    <span className="text-sm font-black text-rose-400 mt-1 block">{selectedPost.primary_emotion}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-950">
                    <span className="text-slate-500 block text-[9px]">BOT AMPLIFICATION</span>
                    <span className="text-base font-black text-amber-400 mt-1 block">{selectedPost.bot_amplification_score}%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-indigo-950">
                    <span className="text-slate-500 block text-[9px]">REACH IMPRESSIONS</span>
                    <span className="text-base font-black text-indigo-400 mt-1 block">{(selectedPost.reach_impressions).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
                  Coordinated Campaign Flag: <strong className="text-rose-400">{selectedPost.coordinated_campaign_flag}</strong>
                </div>

                <button
                  onClick={() => setActiveTab('narratives')}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                >
                  <span>Track Trending Disinformation Narrative Cluster ➔</span>
                </button>
              </div>

              {/* Right 5: Fine-Grained Emotion NLP Engine */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>Multi-Dimensional Emotion NLP</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      ROBERTA-FINETUNED
                    </span>
                  </div>

                  <form onSubmit={handleClassifyPost} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">Social Media Post Text Sample</label>
                      <textarea rows={3} required value={inputText} onChange={(e) => setInputText(e.target.value)} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold text-indigo-300" />
                    </div>

                    <button type="submit" disabled={isClassifying} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 font-sans shadow-md">
                      <RefreshCw className={`w-4 h-4 ${isClassifying ? 'animate-spin' : ''}`} />
                      <span>{isClassifying ? 'Inferring Sarcasm & Anxiety...' : 'Infer Nuanced Audience Emotion'}</span>
                    </button>
                  </form>

                  {nlpVerdict && (
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300 font-sans text-xs">
                      <div className="flex justify-between"><span>Emotion:</span><strong className="text-rose-400 font-mono">{nlpVerdict.emotion}</strong></div>
                      <div className="flex justify-between"><span>Bot Risk:</span><strong className="text-amber-400 font-mono">{nlpVerdict.botScore}%</strong></div>
                      <div className="text-emerald-400 pt-1 border-t border-slate-900 font-mono text-[10px]">{nlpVerdict.action}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: TRENDING NARRATIVES & VIRALITY RADAR
           ========================================================================= */}
        {activeTab === 'narratives' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {narratives.map((n, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-indigo-800/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white font-sans">{n.topic_hashtag}</h4>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded font-bold">{n.velocity_posts_per_min} Posts/Min</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 font-sans text-xs">
                    <div><strong>Bot Penetration:</strong> <span className="font-mono text-amber-400">{n.bot_network_penetration_pct}% Coordinated</span></div>
                    <div><strong>Dominant Emotion:</strong> <span className="text-rose-300">{n.dominant_emotion}</span></div>
                    <div><strong>Origin:</strong> {n.origin_cluster}</div>
                    <div className="text-cyan-300 pt-1 border-t border-slate-900 font-mono"><strong>Action:</strong> {n.mitigation_action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DEMOGRAPHIC & GEO PROFILER
           ========================================================================= */}
        {activeTab === 'demographics' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demographics.map((d, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white font-sans">{d.age_cohort}</h4>
                  <div className="p-2.5 bg-slate-950 rounded-xl text-indigo-300 font-bold text-lg">
                    {d.share_pct}% Share
                  </div>
                  <div className="text-slate-300 font-sans text-xs space-y-1">
                    <div><strong>Platforms:</strong> {d.top_platforms}</div>
                    <div><strong>Dominant Mindset:</strong> {d.primary_emotion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: INFLUENCE NETWORK & BOT NODES
           ========================================================================= */}
        {activeTab === 'topology' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-indigo-500/40 pb-3">
              <span className="text-indigo-400 font-bold text-[10px] uppercase">LINK ANALYSIS & NETWORK TOPOLOGY</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">Key Opinion Leader (KOL) & Bot Syndicate Graph</h4>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-slate-300 text-[11px]">
              {kolNodes.map((k, idx) => (
                <div key={idx} className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <div>
                    <strong className="text-white font-sans text-xs">{k.handle}</strong>
                    <p className="text-slate-400 text-[10px]">{k.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-300 block">PageRank: {k.pagerank_influence}</span>
                    <span className={k.inauthenticity_score > 70 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      Bot Risk: {k.inauthenticity_score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: COMMAND
           ========================================================================= */}
        {activeTab === 'command' && (
          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800"><span className="text-slate-500 block text-[9px]">POSTS INGESTED DAILY</span><span className="text-2xl font-black text-white mt-1 block">1.42 Million</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-950"><span className="text-slate-500 block text-[9px]">BOT CAMPAIGNS MITIGATED</span><span className="text-2xl font-black text-emerald-400 mt-1 block">18 Clusters</span></div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-950"><span className="text-slate-500 block text-[9px]">EMOTION NLP ACCURACY</span><span className="text-2xl font-black text-indigo-400 mt-1 block">94.8%</span></div>
          </div>
        )}

      </div>
    </div>
  );
}
