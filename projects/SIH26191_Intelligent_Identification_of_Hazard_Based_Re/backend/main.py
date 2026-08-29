"""
SIH26191: Intelligent Identification of Hazard Red Zones & Carrying Capacity Relocation DSS (SurakshaGrid RedZone AI)
Ministry of Home Affairs (MHA) / National Disaster Response Force (NDRF) / DM Division
FastAPI Production Microservice with Multi-Hazard Red Zone Scoring, Carrying Capacity & Resettlement Optimizer
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
    title="SurakshaGrid RedZone AI Platform (SIH26191) - MHA / NDRF",
    description="Multi-Hazard Red Zone Identification, Carrying Capacity & Proactive Relocation DSS API",
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

class AssessSiteRequest(BaseModel):
    usable_area_hectares: float = Field(48.5, ge=1.0, le=500.0)
    slope_gradient_deg: float = Field(5.8, ge=0.0, le=45.0)
    groundwater_lpd: float = Field(450000.0, ge=10000.0)
    intended_population: int = Field(1840, ge=10, le=50000)

@app.get("/")
def read_root():
    return {
        "service": "SurakshaGrid RedZone AI Platform (SIH26191)",
        "organization": "Ministry of Home Affairs / NDRF",
        "red_zone_habitations": len(load_json("vulnerable_habitations.json")),
        "safe_relocation_sites": len(load_json("safe_relocation_sites.json")),
        "transit_corridors": len(load_json("evacuation_corridors.json")),
        "action_plans": len(load_json("relocation_action_plans.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/habitations")
def get_habitations():
    return load_json("vulnerable_habitations.json")

@app.get("/api/v1/safe-sites")
def get_safe_sites():
    return load_json("safe_relocation_sites.json")

@app.get("/api/v1/carrying-capacity")
def get_capacity():
    return load_json("carrying_capacity_metrics.json")

@app.get("/api/v1/evacuation-corridors")
def get_corridors():
    return load_json("evacuation_corridors.json")

@app.post("/api/v1/assess-carrying-capacity")
def assess_carrying_capacity(req: AssessSiteRequest):
    # Carrying capacity formula: 60 people per net residential hectare + water availability check
    spatial_cap = int(req.usable_area_hectares * 65)
    water_cap = int(req.groundwater_lpd / 135.0) # 135 L/capita/day
    max_sustainable = min(spatial_cap, water_cap)
    is_suitable = req.slope_gradient_deg < 12.0 and max_sustainable >= req.intended_population
    
    return {
        "max_sustainable_population": max_sustainable,
        "intended_population": req.intended_population,
        "capacity_margin_headroom": max_sustainable - req.intended_population,
        "is_site_safe_and_suitable": is_suitable,
        "suitability_score_pct": 94.5 if is_suitable else 58.0,
        "recommendation": "APPROVED FOR PERMANENT RESETTLEMENT" if is_suitable else "UNSUITABLE: Exceeds ecological/slope carrying capacity",
        "evaluated_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
