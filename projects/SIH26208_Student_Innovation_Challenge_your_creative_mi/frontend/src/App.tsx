import React, { useState } from 'react';
import { 
  Dice5, 
  Sparkles, 
  Trophy, 
  Shield, 
  Compass, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  GraduationCap, 
  Building2, 
  ChevronRight, 
  Printer, 
  Share2, 
  Flame, 
  Zap, 
  Globe 
} from 'lucide-react';

import gamesData from './data/civilizational_games.json';
import questsData from './data/historical_quests.json';
import toysData from './data/toycathon_toys.json';
import leaderboardData from './data/student_leaderboard.json';
import quizzesData from './data/heritage_quizzes.json';

export default function App() {
  const [games, setGames] = useState(gamesData);
  const [selectedGame, setSelectedGame] = useState(gamesData[0]);
  const [quests, setQuests] = useState(questsData);
  const [selectedQuest, setSelectedQuest] = useState(questsData[0]);
  const [toys, setToys] = useState(toysData);
  const [selectedToy, setSelectedToy] = useState(toysData[0]);
  const [activeTab, setActiveTab] = useState<'board' | 'quests' | 'toys' | 'leaderboard' | 'museum'>('board');

  // Moksha Patam Live Game State
  const [playerPos, setPlayerPos] = useState(1);
  const [dharmaPoints, setDharmaPoints] = useState(120);
  const [lastThrow, setLastThrow] = useState<number | null>(null);
  const [gameLog, setGameLog] = useState<string[]>(["Game started at Cell 1 (Origin). Throw Cowrie shells to advance."]);

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  const rollCowrieShells = () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    setLastThrow(dice);
    let next = playerPos + dice;
    let logMsg = `Thrown ${dice} Cowrie Shells. Advanced to Cell ${next}.`;

    // Ladders & Snakes
    const ladders: Record<number, [number, string]> = { 12: [32, "Dharma (Righteous Conduct)"], 28: [50, "Vidya (Wisdom)"], 36: [58, "Dhyana (Meditation)"] };
    const snakes: Record<number, [number, string]> = { 44: [22, "Krodha (Anger)"], 56: [18, "Lobha (Greed)"], 62: [14, "Ahankara (Ego)"] };

    if (ladders[next]) {
      const [dest, virtue] = ladders[next];
      logMsg = `🌟 Ascended via Ladder of ${virtue}! Climbed from ${next} ➔ ${dest}.`;
      next = dest;
      setDharmaPoints(prev => prev + 50);
    } else if (snakes[next]) {
      const [dest, vice] = snakes[next];
      logMsg = `⚠️ Encountered Snake of ${vice}! Slid down from ${next} ➔ ${dest}.`;
      next = dest;
      setDharmaPoints(prev => Math.max(0, prev - 20));
    } else {
      setDharmaPoints(prev => prev + dice * 5);
    }

    if (next >= 64) {
      next = 64;
      logMsg = `🎉 Reached Cell 64! MOKSHA (Spiritual Liberation) Achieved!`;
      setDharmaPoints(prev => prev + 200);
    }

    setPlayerPos(next);
    setGameLog(prev => [logMsg, ...prev.slice(0, 4)]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
              <Dice5 className="w-4 h-4 text-amber-400 animate-spin" />
              <span>AICTE • MIC-STUDENT INNOVATION • TOYSCATHON & IKS • SIH26208</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Bhartiya Sanskriti & History: Civilizational Games, IKS Quests & Toycathon Studio
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Vedic Board Mechanics (Moksha Patam, Chaturanga), Harappan Quests & Indigenous 3D Toy Engineering
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-950/80 border border-amber-800 rounded-2xl flex items-center gap-2 font-mono text-xs text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Dharma XP: <strong>{dharmaPoints}</strong></span>
            </div>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'board', label: '🎲 Ancient Board Game Arena', count: games.length },
            { id: 'quests', label: '📜 Civilizational Story Quests', count: quests.length },
            { id: 'toys', label: '🧸 Toycathon 3D Craft Studio', count: toys.length },
            { id: 'leaderboard', label: '🏆 Student Leaderboard & Quiz', count: leaderboardData.length },
            { id: 'museum', label: '🏛️ IKS Digital Museum' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: ANCIENT BOARD GAME ARENA (MOKSHA PATAM & CHATURANGA)
           ========================================================================= */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            {/* Game Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {games.map((g) => (
                <button
                  key={g.game_id}
                  onClick={() => setSelectedGame(g)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                    selectedGame.game_id === g.game_id
                      ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="text-[10px] font-mono text-amber-400 font-bold">{g.game_id}</div>
                  <div className="text-xs font-bold text-white leading-tight">{g.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{g.civilizational_era}</div>
                  <div className="text-[10px] text-cyan-300 pt-1 border-t border-slate-800">{g.origin_region}</div>
                </button>
              ))}
            </div>

            {/* Split Play Area Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Moksha Patam Live Interactive Board */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedGame.title}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">8x8 Vedic Moral & Karma Grid (64 Cells)</h3>
                    <p className="text-xs text-slate-400">{selectedGame.theme}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-bold font-mono">
                    Cell {playerPos} / 64
                  </span>
                </div>

                {/* 8x8 Mini Grid Simulator */}
                <div className="grid grid-cols-8 gap-1.5 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center font-mono text-[10px]">
                  {Array.from({ length: 64 }, (_, i) => 64 - i).map((cellNum) => {
                    const isPlayer = playerPos === cellNum;
                    const isLadder = [12, 28, 36].includes(cellNum);
                    const isSnake = [44, 56, 62].includes(cellNum);
                    const isMoksha = cellNum === 64;

                    return (
                      <div
                        key={cellNum}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg border font-bold transition-all ${
                          isPlayer
                            ? 'bg-amber-500 text-slate-950 font-black shadow-lg scale-105 ring-2 ring-white'
                            : isMoksha
                            ? 'bg-purple-950/80 border-purple-600 text-purple-300'
                            : isLadder
                            ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                            : isSnake
                            ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                            : 'bg-slate-900 border-slate-800/80 text-slate-500'
                        }`}
                      >
                        <span>{cellNum}</span>
                        {isPlayer && <span className="text-[8px] block uppercase font-black">YOU</span>}
                        {isLadder && !isPlayer && <span className="text-[8px] text-emerald-400">🪜</span>}
                        {isSnake && !isPlayer && <span className="text-[8px] text-rose-400">🐍</span>}
                        {isMoksha && !isPlayer && <span className="text-[8px] text-purple-400">🕉️</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Dice Throw Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl font-mono shadow-lg">
                      {lastThrow || '🐚'}
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-mono font-bold">Vedic Dice Randomizer</span>
                      <span className="text-xs font-bold text-white">6 Sacred Cowrie Shells (कौड़ी)</span>
                    </div>
                  </div>

                  <button
                    onClick={rollCowrieShells}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <Dice5 className="w-4 h-4" />
                    <span>Throw Cowrie Shells & Move</span>
                  </button>
                </div>
              </div>

              {/* Right 5: Live Karma Log & NEP Learning Outcomes */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Live Philosophical Karma Log</span>
                    </h4>
                    <span className="font-mono text-[10px] text-amber-400 bg-slate-950 px-2 py-0.5 rounded-lg">
                      NEP 2020 IKS
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    {gameLog.map((log, i) => (
                      <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                        {log}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-bold text-[10px] uppercase font-mono block">
                      🎓 NEP 2020 EDUCATIONAL OUTCOME:
                    </span>
                    <p className="text-slate-300 font-sans leading-relaxed">
                      {selectedGame.nep_learning_outcome}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: CIVILIZATIONAL STORY QUESTS
           ========================================================================= */}
        {activeTab === 'quests' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {quests.map((q) => (
                <div key={q.quest_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold text-[10px]">{q.quest_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{q.title}</h4>
                      <p className="text-slate-400 text-[11px]">{q.era}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-xs">{q.objective}</p>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px]">
                    <div><strong>Puzzle:</strong> <span className="text-cyan-300">{q.puzzle_type}</span></div>
                    <div><strong>Reward:</strong> <span className="text-emerald-400">{q.rewards}</span></div>
                  </div>

                  <button
                    onClick={() => alert(`Starting quest: ${q.title}`)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md"
                  >
                    Start Interactive Quest ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: TOYCATHON 3D CRAFT STUDIO
           ========================================================================= */}
        {activeTab === 'toys' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {toys.map((t) => (
                <div key={t.toy_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-amber-400 font-bold text-[10px]">{t.toy_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{t.name}</h4>
                      <p className="text-slate-400 text-[11px]">{t.origin}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-bold">
                      {t.eco_friendly_score}% Eco
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-slate-300 text-[11px]">
                    <div><strong>Natural Materials:</strong> {t.craft_material}</div>
                    <div className="text-cyan-300 pt-1 border-t border-slate-900"><strong>Physics Law:</strong> {t.physics_concept}</div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading 3D printable STL model: ${t.3d_printable_model}`)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Download 3D STL & AR File</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: STUDENT LEADERBOARD & QUIZZES
           ========================================================================= */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
              
              {/* Left 7: Top Innovators */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>National Toycathon & IKS Innovators</span>
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {leaderboardData.map((s) => (
                    <div key={s.rank} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-amber-400 font-bold">#{s.rank} • {s.student_name}</span>
                        <div className="text-slate-400 text-[11px]">{s.institution} • {s.level}</div>
                        <div className="flex gap-1 mt-1">
                          {s.badges.map((b: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-900 text-cyan-300 rounded text-[9px]">{b}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-amber-300 font-black text-sm">{s.dharma_points}</span>
                        <span className="text-slate-500 text-[9px] block">DHARMA XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5: Heritage Quiz Challenge */}
              <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>IKS Knowledge Quiz Challenge</span>
                </h4>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-white font-sans text-xs leading-relaxed">
                    {quizzesData[quizIdx].question}
                  </p>

                  <div className="space-y-2">
                    {quizzesData[quizIdx].options.map((opt: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setQuizAnswered(i)}
                        className={`w-full p-2.5 rounded-xl border text-left text-[11px] font-sans transition-all ${
                          quizAnswered === i
                            ? i === quizzesData[quizIdx].correct
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizAnswered !== null && (
                    <div className="p-3 bg-slate-900 rounded-xl text-[11px] text-slate-300 pt-2 border-t border-slate-800 font-sans">
                      <strong>Explanation:</strong> {quizzesData[quizIdx].explanation}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: IKS DIGITAL MUSEUM
           ========================================================================= */}
        {activeTab === 'museum' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-amber-500/40 pb-4">
              <div>
                <span className="text-amber-400 font-bold text-[10px] uppercase">INDIAN KNOWLEDGE SYSTEMS (IKS) • NATIONAL HERITAGE</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Civilizational Science & Toymaking Traditions</h3>
              </div>
              <Building2 className="w-12 h-12 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300 font-sans text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h5 className="font-bold text-white">🌿 Eco-Friendly Channapatna Lacquer</h5>
                <p className="text-slate-400 text-[11px]">Invented in Karnataka during Tipu Sultan's era using Wrightia Tinctoria wood and natural vegetable dyes (turmeric, indigo) ensuring 100% non-toxic safety for children.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h5 className="font-bold text-white">⚖️ Thanjavur Equilibrium Mechanics</h5>
                <p className="text-slate-400 text-[11px]">Crafted with a hemispherical clay base that keeps the center of mass near the contact surface, creating a classic self-righting oscillatory physics phenomenon.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
