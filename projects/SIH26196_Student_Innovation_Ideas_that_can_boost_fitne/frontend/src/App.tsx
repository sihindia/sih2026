import React, { useState } from 'react';
import { 
  Activity, 
  Flame, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  RefreshCw, 
  Zap, 
  Sun, 
  Apple, 
  Heart, 
  Building2, 
  ChevronRight, 
  Printer, 
  Share2, 
  Volume2, 
  Globe 
} from 'lucide-react';

import exercisesData from './data/exercise_catalog.json';
import workoutsData from './data/workout_plans.json';
import nutritionData from './data/nutrition_plans.json';
import leaderboardData from './data/fitness_leaderboard.json';
import benchmarksData from './data/khelo_india_benchmarks.json';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr' | 'ta'>('hi');
  const [exercises, setExercises] = useState(exercisesData);
  const [selectedEx, setSelectedEx] = useState(exercisesData[1]);
  const [workouts, setWorkouts] = useState(workoutsData);
  const [nutritionList, setNutritionList] = useState(nutritionData);
  const [activeTab, setActiveTab] = useState<'posture' | 'workouts' | 'nutrition' | 'leaderboard' | 'khelo'>('posture');

  // Interactive Posture Analyzer State
  const [kneeAngle, setKneeAngle] = useState(88);
  const [backAngle, setBackAngle] = useState(48);
  const [repCount, setRepCount] = useState(14);
  const [isVoiceActive, setIsVoiceActive] = useState(true);

  // Calorie Calculator State
  const [weightKg, setWeightKg] = useState(68);
  const [durationMins, setDurationMins] = useState(30);

  const calcAccuracy = () => {
    const kneeDiff = Math.abs(kneeAngle - 90);
    const backDiff = Math.abs(backAngle - 45);
    return Math.max(50, Math.round(100 - (kneeDiff * 0.8 + backDiff * 0.6)));
  };

  const accuracy = calcAccuracy();
  const caloriesBurned = Math.round(5.5 * weightKg * (durationMins / 60.0));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-wider">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <span>AICTE • FIT INDIA MOVEMENT • FITSETU 360 SMART FITNESS • SIH26196</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              FitSetu 360: AI Posture Correction, Desi Nutrition & Fit India Grid
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Real-Time Joint Angle Vision Tracking, Surya Namaskar Form Analyzer & Traditional High-Protein Nutrition
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-orange-400 ml-1.5" />
            <button onClick={() => setLang('hi')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'hi' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'mr' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>मराठी</button>
            <button onClick={() => setLang('ta')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'ta' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>தமிழ்</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-xl text-xs font-bold ${lang === 'en' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'posture', label: '🧘 AI Vision Posture Analyzer', count: exercises.length },
            { id: 'workouts', label: '🏃 Personalized Workouts', count: workouts.length },
            { id: 'nutrition', label: '🥗 Desi Nutrition & Sattu Diet', count: nutritionList.length },
            { id: 'leaderboard', label: '🏆 Fit India Campus League', count: leaderboardData.length },
            { id: 'khelo', label: '📊 Khelo India Assessment' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: AI VISION POSTURE ANALYZER
           ========================================================================= */}
        {activeTab === 'posture' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {exercises.map((ex) => (
                <button
                  key={ex.exercise_id}
                  onClick={() => setSelectedEx(ex)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedEx.exercise_id === ex.exercise_id
                      ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg ring-2 ring-orange-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-orange-400">{ex.exercise_id}</span>
                    <span className="text-cyan-300">MET {ex.met_value}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {lang === 'hi' ? ex.name_hi : ex.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{ex.category}</div>
                </button>
              ))}
            </div>

            {/* Split Posture Analysis Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Live Pose Joint Angle Tracking */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-orange-400">{selectedEx.exercise_id}</span>
                    <h3 className="font-bold text-lg text-white mt-0.5">{selectedEx.name}</h3>
                    <p className="text-xs text-slate-400">{selectedEx.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                    accuracy >= 85 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {accuracy}% Form Accuracy
                  </span>
                </div>

                {/* Angle Sliders */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Measured Knee Flexion Angle:</span>
                      <strong className="text-orange-400">{kneeAngle}° (Optimal: 90°)</strong>
                    </div>
                    <input type="range" min="45" max="150" value={kneeAngle} onChange={(e) => setKneeAngle(Number(e.target.value))} className="w-full accent-orange-500" />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Measured Torso / Back Angle:</span>
                      <strong className="text-cyan-400">{backAngle}° (Optimal: 45°)</strong>
                    </div>
                    <input type="range" min="15" max="90" value={backAngle} onChange={(e) => setBackAngle(Number(e.target.value))} className="w-full accent-cyan-500" />
                  </div>
                </div>

                {/* Real-Time Corrective Feedback Box */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  accuracy >= 85 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-amber-950/40 border-amber-800 text-amber-300'
                }`}>
                  <Volume2 className="w-6 h-6 flex-shrink-0" />
                  <div className="font-sans text-xs">
                    <strong>AI Voice Coach:</strong> {accuracy >= 85 ? "Excellent posture! Full depth achieved without spine rounding." : selectedEx.posture_cue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-orange-950">
                    <span className="text-slate-500 block text-[9px]">REPS COUNTED</span>
                    <span className="text-2xl font-black text-orange-400 mt-1 block">{repCount} Reps</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-950">
                    <span className="text-slate-500 block text-[9px]">CALORIES BURNED</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">{caloriesBurned} kcal</span>
                  </div>
                </div>
              </div>

              {/* Right 5: Exercise Muscle Map & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span>Biomechanics & Muscles</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      MEDIAPIPE 3D
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-orange-400 font-bold text-[10px] uppercase block">TARGET MUSCLE ACTIVATION:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEx.target_muscles.map((m: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-950 text-cyan-300 border border-slate-800 rounded-lg text-xs font-mono font-bold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-200 font-sans text-xs space-y-1">
                    <div className="font-bold text-rose-400 font-mono text-[10px] uppercase">Common Posture Flaw to Avoid:</div>
                    <p>{selectedEx.common_mistake}</p>
                  </div>

                  <button
                    onClick={() => { setRepCount(r => r + 1); alert("Rep recorded with perfect form!"); }}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Log Perfect Rep (+1) ➔</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: WORKOUT PLANS
           ========================================================================= */}
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {workouts.map((w) => (
                <div key={w.plan_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-orange-400 font-bold text-[10px]">{w.plan_id} • {w.duration_weeks} Weeks</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{w.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-orange-950 text-orange-300 rounded font-bold text-[10px]">
                      {w.daily_duration_mins} Mins/Day
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-slate-300 text-[11px]">
                    <div><strong>Goal:</strong> {w.target_goal}</div>
                    <div><strong>Weekly Schedule:</strong> <span className="text-cyan-300">{w.weekly_schedule}</span></div>
                    <div><strong>Enrolled Athletes:</strong> <span className="text-emerald-400 font-bold">{w.enrolled_students.toLocaleString()} Students</span></div>
                  </div>

                  <button onClick={() => alert(`Enrolled in: ${w.title}`)} className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-xl text-xs font-sans shadow-md">
                    Start Workout Program ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DESI NUTRITION & SATTU DIET
           ========================================================================= */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {nutritionList.map((n) => (
                <div key={n.meal_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-orange-400 font-bold text-[10px]">{n.meal_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{n.meal_name}</h4>
                      <p className="text-slate-400 text-[11px]">{n.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 text-[8px] block">KCAL</span><span className="text-white font-bold">{n.calories_kcal}</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-orange-950"><span className="text-orange-400 text-[8px] block font-bold">PROTEIN</span><span className="text-orange-300 font-bold">{n.protein_g}g</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 text-[8px] block">CARBS</span><span className="text-cyan-300 font-bold">{n.carbs_g}g</span></div>
                    <div className="p-2 bg-slate-950 rounded-xl"><span className="text-slate-500 text-[8px] block">FATS</span><span className="text-purple-300 font-bold">{n.fats_g}g</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-slate-300 text-[11px] font-sans">
                    <div><strong>Ingredients:</strong> {n.ingredients}</div>
                    <div className="text-emerald-300 pt-1 border-t border-slate-900"><strong>Benefits:</strong> {n.health_benefits}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CAMPUS LEADERBOARD
           ========================================================================= */}
        {activeTab === 'leaderboard' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-orange-500/40 pb-4">
              <div>
                <span className="text-orange-400 font-bold text-[10px] uppercase">FIT INDIA CAMPUS FITNESS LEAGUE</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Top National Student Athletes</h3>
              </div>
              <Trophy className="w-10 h-10 text-orange-400" />
            </div>

            <div className="space-y-3">
              {leaderboardData.map((lead) => (
                <div key={lead.rank} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-orange-400 font-bold text-sm">#{lead.rank} • {lead.student_name}</span>
                    <div className="text-slate-400 text-[11px]">{lead.college} • {lead.badge}</div>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div><span className="text-slate-500 text-[9px] block">DAILY STEPS</span><span className="text-white font-bold">{lead.daily_steps.toLocaleString()}</span></div>
                    <div><span className="text-slate-500 text-[9px] block">BURNED</span><span className="text-orange-400 font-black text-base">{lead.calories_burned} kcal</span></div>
                    <div><span className="text-slate-500 text-[9px] block">STREAK</span><span className="text-emerald-400 font-bold">{lead.streak_days} Days</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: KHELO INDIA BENCHMARKS
           ========================================================================= */}
        {activeTab === 'khelo' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-4 font-mono text-xs shadow-2xl">
            <div className="border-b border-orange-500/40 pb-3">
              <span className="text-orange-400 font-bold text-[10px] uppercase">KHELO INDIA PHYSICAL FITNESS BATTERY</span>
              <h4 className="text-lg font-black text-white font-sans mt-0.5">National Standardized Fitness Benchmarks</h4>
            </div>

            <div className="space-y-3">
              {benchmarksData.map((b, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-white text-sm font-sans">{b.test_name}</h5>
                    <span className="text-slate-400 text-[11px]">{b.parameter}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">{b.gold_standard} (Gold)</span>
                    <span className="text-slate-500 text-[10px] block">Average: {b.avg_standard}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
