"""
SIH26019: National Platform for Research and Policy Innovation in Land Governance (DoLR NeetiManthan 360)
Ministry of Rural Development - Department of Land Resources (DoLR)
FastAPI Production Microservice for Policy Simulation, Research Repository & State Governance Index
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
    title="DoLR NeetiManthan 360 Policy Hub (SIH26019) - DoLR / Ministry of Rural Development",
    description="National Digital Platform for Research and Policy Innovation",
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

class SimulateReformRequest(BaseModel):
    coverage_pct: float = Field(95.0, example=95.0)
    stamp_duty_pct: float = Field(4.0, example=4.0)

@app.get("/")
def read_root():
    return {
        "service": "DoLR NeetiManthan 360 Hub (SIH26019)",
        "ministry": "Ministry of Rural Development",
        "department": "Department of Land Resources (DoLR)",
        "research_papers_indexed": len(load_json("applied_research_papers_repository.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/papers")
def get_papers():
    return load_json("applied_research_papers_repository.json")

@app.get("/api/v1/states")
def get_states():
    return load_json("state_land_governance_benchmark_index.json")

@app.get("/api/v1/scenarios")
def get_scenarios():
    return load_json("policy_reform_simulation_scenarios.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("neetimanthan_stats.json")

@app.post("/api/v1/simulate-land-reform")
def simulate_reform(req: SimulateReformRequest):
    litigation_drop = round((req.coverage_pct / 100) * 72, 1)
    capital_unlocked_cr = round((6 - req.stamp_duty_pct) * 18500 + (req.coverage_pct * 420))
    return {
        "cadastral_coverage_pct": req.coverage_pct,
        "stamp_duty_rate_pct": req.stamp_duty_pct,
        "projected_civil_litigation_drop_pct": litigation_drop,
        "dormant_capital_unlocked_inr_cr": capital_unlocked_cr,
        "policy_recommendation": "Enact State Conclusive Titling Bill with State Title Indemnity Fund pool",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
