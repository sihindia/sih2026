import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  RefreshCw, 
  ShieldCheck, 
  Award, 
  Activity,
  Smile,
  PhoneCall,
  Pill,
  Play
} from 'lucide-react';
import patientsData from './data/patients.json';
import gamesData from './data/games.json';
import remindersData from './data/reminders.json';

export default function App() {
  const [patients, setPatients] = useState(patientsData);
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [reminders, setReminders] = useState(remindersData);

  // Interactive Memory Game State
  const initialCards = [
    { id: 1, text: '🦏 Kaziranga Rhino', match: 'rhino', flipped: false, matched: false },
    { id: 2, text: '🪕 Assamese Bihu Dhol', match: 'dhol', flipped: false, matched: false },
    { id: 3, text: '🌿 Meghalaya Living Root Bridge', match: 'bridge', flipped: false, matched: false },
    { id: 4, text: '🎋 Mizo Bamboo Dance', match: 'cheraw', flipped: false, matched: false },
    { id: 5, text: '🦏 Kaziranga Rhino', match: 'rhino', flipped: false, matched: false },
    { id: 6, text: '🪕 Assamese Bihu Dhol', match: 'dhol', flipped: false, matched: false },
    { id: 7, text: '🌿 Meghalaya Living Root Bridge', match: 'bridge', flipped: false, matched: false },
    { id: 8, text: '🎋 Mizo Bamboo Dance', match: 'cheraw', flipped: false, matched: false }
  ];

  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleCardClick = (index: number) => {
    if (cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flippedCards, index];
    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].match === cards[secondIdx].match) {
        newCards[firstIdx].matched = true;
        newCards[secondIdx].matched = true;
        setScore(prev => prev + 25);
        setFlippedCards([]);
        if (newCards.every(c => c.matched)) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstIdx].flipped = false;
          newCards[secondIdx].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const handleResetGame = () => {
    setCards(initialCards.map(c => ({ ...c, flipped: false, matched: false })));
    setFlippedCards([]);
    setScore(0);
    setGameWon(false);
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'TAKEN' ? 'SCHEDULED' : 'TAKEN' } : r));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION (MDoNER) • SIH26003</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              AI-Based Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Patients in NER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Culturally Inclusive Memory Stimulation, Multilingual Voice Prompts & Caregiver Monitoring Hub
            </p>
          </div>

          <span className="px-4 py-2 bg-purple-950 text-purple-300 border border-purple-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-current" />
            <span>MMSE Cognitive Progress: Active</span>
          </span>
        </header>

        {/* Patient Selection Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>👵 REGISTERED ELDERLY PATIENTS ({patients.length} PATIENTS IN DATASET)</span>
            <span>Click patient profile to monitor</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {patients.map((p) => (
              <button
                key={p.patient_id}
                onClick={() => setSelectedPatient(p)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedPatient.patient_id === p.patient_id
                    ? 'bg-purple-950/60 border-purple-500 text-white shadow-md ring-1 ring-purple-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold">{p.patient_id}</span>
                    <h3 className="font-bold text-sm text-white mt-0.5">{p.name} ({p.age} yrs)</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{p.location} • {p.preferred_language}</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                    MMSE: {p.current_mmse_score}/30
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Interactive Memory Match Game */}
          <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>NER Cultural Heritage Memory Match Game (Adaptive Level 2)</span>
                </h3>
                <p className="text-xs text-slate-400">Stimulates visual recall & temporal recognition using familiar regional icons</p>
              </div>
              <button
                onClick={handleResetGame}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Cards</span>
              </button>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`h-24 p-2 rounded-2xl border flex items-center justify-center text-center font-bold text-xs transition-all ${
                    card.flipped || card.matched
                      ? 'bg-purple-950/80 border-purple-500 text-purple-200 scale-105 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-purple-500/50'
                  }`}
                >
                  {card.flipped || card.matched ? card.text : '🌸 Click to Flip'}
                </button>
              ))}
            </div>

            {gameWon && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-center space-y-1 text-emerald-300 animate-fadeIn">
                <Award className="w-7 h-7 mx-auto text-amber-400" />
                <div className="font-bold text-sm">Wonderful Job, {selectedPatient.name.split(' ')[0]}!</div>
                <p className="text-xs">All cultural memory pairs identified! Score: {score}/100 points.</p>
              </div>
            )}
          </div>

          {/* Right 5: Medication Reminders & Caregiver Analytics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Daily Routine Reminders */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>Daily Medication & Hydration Schedule</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                {reminders.map((rem) => {
                  const isDone = rem.status === 'TAKEN' || rem.status === 'COMPLETED';
                  return (
                    <div
                      key={rem.id}
                      onClick={() => toggleReminder(rem.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isDone ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span className="font-mono text-slate-400">{rem.time}</span>
                          <span>{rem.medicine}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{rem.dose}</div>
                      </div>
                      <CheckCircle2 className={`w-5 h-5 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Caregiver Portal Card */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Primary Caregiver Contact</span>
              </h4>
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <div className="font-bold text-white">{selectedPatient.caregiver_name}</div>
                <div className="font-mono text-blue-400">{selectedPatient.caregiver_phone}</div>
              </div>
              <div className="text-[11px] text-slate-400">
                Cognitive telemetry synchronized with MDoNER Digital Health Tele-Consultation Gateway.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
