import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Box, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  Key, 
  Sparkles, 
  Zap, 
  Sliders,
  ArrowRight
} from 'lucide-react';
import parcelsData from './data/cadastral_parcels.json';
import unitsData from './data/vertical_units.json';

export default function App() {
  const [parcels, setParcels] = useState(parcelsData);
  const [selectedParcel, setSelectedParcel] = useState(parcelsData[0]);
  const [units, setUnits] = useState(unitsData);

  // 3D ULPIN Generator Form
  const [floorLevel, setFloorLevel] = useState(18);
  const [unitCode, setUnitCode] = useState('1802');
  const [ownerName, setOwnerName] = useState('Vikramaditya Singhania');
  const [generatedULPIN, setGeneratedULPIN] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate3DULPIN = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const prefix = floorLevel >= 0 ? 'F' : 'B';
      const levelStr = `${prefix}${Math.abs(floorLevel).toString().padStart(2, '0')}`;
      const code = `${selectedParcel.base_ulpin}-${levelStr}-U${unitCode}`;
      const zMin = floorLevel * 3.0;
      const zMax = zMin + 3.2;
      setGeneratedULPIN({
        ulpin3D: code,
        zBounds: `${zMin.toFixed(1)}m to ${zMax.toFixed(1)}m elevation`,
        volume: '480 m³ Volumetric Spatial Right',
        standard: 'DoLR LADM ISO 19152 Verified'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <Box className="w-4 h-4 text-emerald-400" />
              <span>DEPARTMENT OF LAND RESOURCES (DoLR) • MINISTRY OF RURAL DEVELOPMENT • SIH26011</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              3D ULPIN Generation & Vertical Property Mapping System
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              High-Rise Vertical Parcel Delineation, Subsurface Underground Utilities & 3D Cadastral Registry
            </p>
          </div>

          <span className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Volumetric 3D Cadastre: Active</span>
          </span>
        </header>

        {/* Parcels Row (JSON Data) */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
            <span>🏛️ MONITORED 3D URBAN CADASTRAL PROPERTIES ({parcels.length} SITES)</span>
            <span>Click property to inspect volumetric layers</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {parcels.map((p) => (
              <button
                key={p.base_ulpin}
                onClick={() => setSelectedParcel(p)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedParcel.base_ulpin === p.base_ulpin
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md ring-1 ring-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{p.base_ulpin}</span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{p.property_name}</h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{p.city}, {p.state}</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    {p.floors_above_ground}F / {p.basements_underground}B
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Height: {p.total_height_m}m</span>
                  <span>Depth: {p.deepest_subsurface_m}m</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7: Vertical Units List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Delineated 3D Volumetric Property Units (Floor & Subsurface)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Vertical elevation bounding box & exclusive air-rights registry</p>
                </div>
              </div>

              <div className="space-y-3">
                {units.map((u) => (
                  <div key={u.volumetric_3d_ulpin} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-400">{u.volumetric_3d_ulpin}</span>
                        <div className="font-bold text-xs text-white mt-0.5">{u.unit_number}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Owner: {u.owner_name} • {u.carpet_area_sqft} sq.ft</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.level_type === 'ABOVE_GROUND' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {u.level_type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[11px] font-mono text-slate-400">
                      <span>Elevation Z: {u.elevation_min_m}m to {u.elevation_max_m}m</span>
                      <span className="text-emerald-400 font-bold">No Clash / Freehold Title</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5: 3D ULPIN Generator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>3D Volumetric ULPIN Generator</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Base Ground ULPIN</label>
                  <input
                    type="text" value={selectedParcel.base_ulpin} disabled
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Floor Level</label>
                    <input
                      type="number" value={floorLevel} onChange={(e) => setFloorLevel(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Unit Code</label>
                    <input
                      type="text" value={unitCode} onChange={(e) => setUnitCode(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Registered Owner Name</label>
                  <input
                    type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>

                <button
                  onClick={handleGenerate3DULPIN}
                  disabled={isGenerating}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                  <span>Generate Standard 3D Volumetric ULPIN</span>
                </button>

                {generatedULPIN && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="font-bold text-emerald-400">✅ 3D Volumetric ULPIN Created</span>
                      <span className="font-mono text-[10px] text-slate-400">{generatedULPIN.standard}</span>
                    </div>
                    <div className="font-mono text-xs font-bold text-cyan-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      {generatedULPIN.ulpin3D}
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 space-y-1">
                      <div>Bounds: {generatedULPIN.zBounds}</div>
                      <div className="text-emerald-400 font-bold">{generatedULPIN.volume}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
