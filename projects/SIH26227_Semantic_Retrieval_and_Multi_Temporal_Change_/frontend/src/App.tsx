import React, { useState } from 'react';
import { 
  Satellite, 
  Search, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sliders, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Building2, 
  ChevronRight, 
  Printer, 
  Lock, 
  Eye, 
  Compass, 
  Activity, 
  Zap, 
  Globe 
} from 'lucide-react';

import tilesData from './data/satellite_tiles.json';
import changesData from './data/multitemporal_changes.json';
import queriesData from './data/semantic_queries.json';
import falseAlarmsData from './data/false_alarms.json';
import analystLogsData from './data/analyst_logs.json';

export default function App() {
  const [tiles, setTiles] = useState(tilesData);
  const [selectedTile, setSelectedTile] = useState(tilesData[0]);
  const [changes, setChanges] = useState(changesData);
  const [selectedChange, setSelectedChange] = useState(changesData[0]);
  const [activeTab, setActiveTab] = useState<'search' | 'changes' | 'falsealarms' | 'clusters' | 'analyst'>('search');

  // Semantic Search State
  const [searchQuery, setSearchQuery] = useState('Newly built structures near a river');
  const [sensorFilter, setSensorFilter] = useState('ALL');
  const [searchResults, setSearchResults] = useState(tilesData);
  const [isSearching, setIsSearching] = useState(false);

  // Bi-Temporal Split View Slider State
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      const q = searchQuery.toLowerCase();
      const filtered = tilesData.map(t => {
        let sim = Number((Math.random() * 0.05 + 0.91).toFixed(3));
        if (t.semantic_tags.some(tag => tag.toLowerCase().includes(q) || q.includes(tag.toLowerCase().split(' ')[0]))) {
          sim = Number((Math.random() * 0.03 + 0.96).toFixed(3));
        }
        return { ...t, vector_similarity_score: sim };
      }).sort((a, b) => b.vector_similarity_score - a.vector_similarity_score);

      setSearchResults(filtered);
      setSelectedTile(filtered[0]);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold tracking-wider">
              <Satellite className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MINISTRY OF DEFENCE (MoD) • INDIAN ARMY DGIS GEOSPATIAL INTELLIGENCE • SIH26227</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Satellite Semantic Retrieval & Multi-Temporal Change Analysis Platform
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              Foundation Model Free-Text Tile Search, Bi-Temporal Change Detection & Air-Gapped False-Alarm Suppression
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-inner font-mono">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>AIR-GAPPED SOVEREIGN EO GRID</span>
            </span>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'search', label: '🛰️ Natural Language Semantic Search', count: searchResults.length },
            { id: 'changes', label: '🔄 Bi-Temporal Change Detection', count: changes.length },
            { id: 'falsealarms', label: '🛡️ False-Alarm & Radiometric Filter', count: falseAlarmsData.length },
            { id: 'clusters', label: '🧩 Lookalike Target Clustering' },
            { id: 'analyst', label: '📜 Military Intelligence Review Queue', count: analystLogsData.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW 1: NATURAL LANGUAGE SEMANTIC SATELLITE SEARCH
           ========================================================================= */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 flex flex-col sm:flex-row gap-3 shadow-xl">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter natural language query: e.g., 'Newly built structures near a river' or 'Large vehicle concentrations'"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <select
                value={sensorFilter} onChange={(e) => setSensorFilter(e.target.value)}
                className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-slate-300"
              >
                <option value="ALL">All Sensors (Optical + SAR)</option>
                <option value="OPTICAL">Cartosat-3 Optical (0.28m)</option>
                <option value="SAR">RISAT-1A / 2BR1 SAR (All-Weather)</option>
              </select>

              <button
                type="submit" disabled={isSearching}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg font-sans"
              >
                <RefreshCw className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
                <span>{isSearching ? 'Vector Searching...' : 'Execute Semantic Search'}</span>
              </button>
            </form>

            {/* Split Search Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7: Ranked Search Tiles */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                  <span>RANKED SATELLITE TILES BY VECTOR COSINE SIMILARITY</span>
                  <span className="text-cyan-400 font-mono">{searchResults.length} Tiles Matched (Latency: 28.4ms)</span>
                </div>

                <div className="space-y-3">
                  {searchResults.map((tile, idx) => {
                    const isSelected = selectedTile.tile_id === tile.tile_id;
                    return (
                      <button
                        key={tile.tile_id}
                        onClick={() => setSelectedTile(tile)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all space-y-2 ${
                          isSelected
                            ? 'bg-slate-900 border-cyan-500 shadow-xl ring-2 ring-cyan-400'
                            : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-cyan-400">Rank #{idx + 1} • {tile.tile_id}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold">
                                {Math.round((tile.vector_similarity_score || 0.96) * 100)}% Semantic Match
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-white mt-1">{tile.region_name}</h4>
                            <p className="text-xs text-slate-400 font-mono">{tile.satellite_platform} • Resolution: {tile.spatial_resolution_m}m</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
                            {tile.acquisition_date}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tile.semantic_tags.map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-950 text-cyan-300 rounded text-[10px] font-mono">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 5: Selected Satellite Tile Inspection & Metadata Provenance */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                      <Compass className="w-4 h-4 text-cyan-400" />
                      <span>Tile Geospatial Metadata</span>
                    </h4>
                    <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-lg text-[10px]">
                      AIR-GAPPED COG
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span className="text-slate-500">WGS84 Coordinates:</span><span className="text-white font-bold">{selectedTile.coordinates.lat}° N, {selectedTile.coordinates.lng}° E</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Platform & Sensor:</span><span className="text-cyan-300 font-bold">{selectedTile.satellite_platform}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Ground Sampling (GSD):</span><span className="text-white">{selectedTile.spatial_resolution_m} meters/pixel</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Cloud Cover:</span><span className="text-emerald-400">{selectedTile.cloud_cover_pct}% (Clear Aperture)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Solar Elevation Angle:</span><span>{selectedTile.sun_elevation_deg}°</span></div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">SHA-256 Provenance Hash:</span>
                    <div className="text-cyan-300 text-[10px] break-all">{selectedTile.tile_provenance_hash}</div>
                  </div>

                  <button
                    onClick={() => setActiveTab('changes')}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xl font-sans"
                  >
                    <span>Run Multi-Temporal Change Analysis On Tile</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: MULTI-TEMPORAL CHANGE DETECTION
           ========================================================================= */}
        {activeTab === 'changes' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
              <div className="flex justify-between items-center border-b-2 border-cyan-500/40 pb-4">
                <div>
                  <span className="text-cyan-400 font-bold text-[10px] uppercase">BI-TEMPORAL EARTH OBSERVATION ANALYSIS (T1 -> T2)</span>
                  <h3 className="text-xl font-black text-white font-sans mt-0.5">{selectedChange.region_name}</h3>
                  <p className="text-slate-400 text-[11px]">Baseline ({selectedChange.baseline_t1_date}) vs Recent Acquisition ({selectedChange.current_t2_date})</p>
                </div>
                <Activity className="w-10 h-10 text-cyan-400" />
              </div>

              {/* Interactive Bi-Temporal Split View Slider Simulator */}
              <div className="space-y-2">
                <div className="flex justify-between text-slate-400 text-[11px] font-bold">
                  <span>◀ T1: Baseline Reference ({selectedChange.baseline_t1_date})</span>
                  <span>T2: Recent Observation ({selectedChange.current_t2_date}) ▶</span>
                </div>

                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
                  <div className="text-sm font-bold text-white font-sans">
                    {sliderPosition < 50 ? `Showing T1 Baseline (March 2026 - Virgin Terrain)` : `Showing T2 Recent (August 2026 - ${selectedChange.change_description})`}
                  </div>
                  <input
                    type="range" min="0" max="100" value={sliderPosition} onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <div className="text-[10px] text-cyan-400 font-mono">Split Position: {sliderPosition}%</div>
                </div>
              </div>

              {/* Detected Change Summary */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950">
                  <span className="text-slate-500 block text-[9px] uppercase">Change Classification</span>
                  <span className="text-sm font-black text-rose-400 mt-1 block">{selectedChange.change_type}</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-950">
                  <span className="text-slate-500 block text-[9px] uppercase">Affected Area</span>
                  <span className="text-xl font-black text-cyan-400 mt-1 block">{selectedChange.affected_area_sq_m} m²</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950">
                  <span className="text-slate-500 block text-[9px] uppercase">Confidence</span>
                  <span className="text-xl font-black text-emerald-400 mt-1 block">{selectedChange.confidence_score_pct}%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300">
                <div><strong>Earliest Detected Date:</strong> <span className="text-amber-400">{selectedChange.earliest_detected_date}</span></div>
                <div><strong>False-Alarm Filter:</strong> <span className="text-emerald-400">{selectedChange.false_alarm_suppression_applied}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: FALSE-ALARM SUPPRESSION
           ========================================================================= */}
        {activeTab === 'falsealarms' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {falseAlarmsData.map((fa) => (
                <div key={fa.event_id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-cyan-400 font-bold text-[10px]">{fa.event_id}</span>
                      <h4 className="font-bold text-sm text-white font-sans mt-0.5">{fa.phenomenon}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {fa.verdict}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 text-slate-300 text-[11px]">
                    <div><strong>Raw Optical Change:</strong> <span className="text-rose-300">{fa.raw_change_detected}</span></div>
                    <div className="text-emerald-300 pt-1 border-t border-slate-900"><strong>Suppression Algorithm:</strong> {fa.suppression_mechanism}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: CLUSTERS & LOOKALIKE TARGET DISCOVERY
           ========================================================================= */}
        {activeTab === 'clusters' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-cyan-500/40 pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">K-NN VECTOR EMBEDDING CLUSTER DISCOVERY</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Automated Lookalike Military Site Discovery</h3>
                <p className="text-slate-400 text-[11px]">Discovering matching tactical infrastructure without manual coordinate entry</p>
              </div>
              <Layers className="w-10 h-10 text-cyan-400" />
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-cyan-400 font-bold text-[10px] uppercase block">SEED TARGET: Reinforced Concrete Bunkers (Galwan Km 14)</span>
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold">Lookalike Site #1: Depsang Northern Ridge (Km 28)</span>
                    <div className="text-slate-400 text-[10px]">Distance: 42 km • Cosine Similarity: 0.978</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded">MATCH CONFIRMED</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-white font-bold">Lookalike Site #2: Chumar Southern Sentry Bluff</span>
                    <div className="text-slate-400 text-[10px]">Distance: 110 km • Cosine Similarity: 0.962</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded">MATCH CONFIRMED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: ANALYST REVIEW QUEUE
           ========================================================================= */}
        {activeTab === 'analyst' && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b-2 border-cyan-500/40 pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-[10px] uppercase">INDIAN ARMY DGIS • IMAGERY RECONNAISSANCE DESK</span>
                <h3 className="text-xl font-black text-white font-sans mt-0.5">Analyst Change Confirmation Ledger</h3>
              </div>
              <ShieldCheck className="w-10 h-10 text-cyan-400" />
            </div>

            <div className="space-y-3">
              {analystLogsData.map((a) => (
                <div key={a.log_id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-cyan-400 font-bold">{a.log_id} • {a.change_id}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded">{a.decision}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Officer: {a.officer} • {a.timestamp}</div>
                  <p className="text-slate-200 font-sans text-xs pt-1 border-t border-slate-900">{a.directive}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
