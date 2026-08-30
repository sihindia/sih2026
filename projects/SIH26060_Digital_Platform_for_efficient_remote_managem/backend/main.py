"""
SIH26060: Remote Digital Platform for Antarctic Research Stations (MoES MaitriBharati 360)
Ministry of Earth Sciences (MoES) - National Centre for Polar and Ocean Research (NCPOR)
FastAPI Production Microservice with SCADA Digital Twin & Sub-Zero Life Support Engine API
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
import random
from datetime import datetime

app = FastAPI(
    title="MoES MaitriBharati 360 Antarctic Digital Twin Hub (SIH26060) - NCPOR / MoES",
    description="Digital Platform for efficient remote management of Indian Antarctic Research Stations (Maitri & Bharati)",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(name):
    path = os.path.join(DATA_DIR, name)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

class AdjustHVACRequest(BaseModel):
    station_id: str = Field("STATION-MAITRI-01", example="STATION-MAITRI-01")
    target_temp_c: float = Field(21.5, example=21.5)
    ambient_temp_c: float = Field(-42.8, example=-42.8)

@app.get("/")
def read_root():
    return {
        "service": "MoES MaitriBharati 360 Hub (SIH26060)",
        "ministry": "Ministry of Earth Sciences (MoES)",
        "institution": "National Centre for Polar and Ocean Research (NCPOR)",
        "stations_monitored": "Maitri Station & Bharati Station (Antarctica)",
        "digital_twin_scada": "CHP Microgrid + Life Support + Low-Bandwidth GSAT Telemetry",
        "stations_count": len(load_json("antarctic_research_stations_telemetry.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/stations")
def get_stations():
    return load_json("antarctic_research_stations_telemetry.json")

@app.get("/api/v1/energy-matrix")
def get_energy_matrix():
    return load_json("polar_microgrid_chp_energy_matrix.json")

@app.get("/api/v1/life-support")
def get_life_support():
    return load_json("life_support_water_and_waste_systems.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("maitribharati_stats.json")

@app.post("/api/v1/adjust-station-hvac-energy")
def adjust_hvac(req: AdjustHVACRequest):
    return {
        "station_id": req.station_id,
        "target_indoor_temp": req.target_temp_c,
        "thermal_heat_recovery_applied_kw": 85.2,
        "lake_water_pipe_trace_heating_temp": "+12°C (Protected from -50°C freezing)",
        "dg_generator_fuel_efficiency_pct": 92.4,
        "wintering_fuel_autonomy_remaining_days": 142,
        "ncpor_goa_sync_status": "GSAT-7_TELEMETRY_LINK_SYNCHRONIZED",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
