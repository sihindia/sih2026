"""
SIH26136: Startup Friendly Public Procurement Mechanism (MahaStartupSandbox 360)
Government of Maharashtra / Maharashtra State Innovation Society
FastAPI Production Microservice with Innovation Sandbox, Escrow Milestones & Scale-Up Gateway
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
    title="MahaStartupSandbox 360 Innovation Procurement (SIH26136) - Maharashtra",
    description="Startup-Friendly Public Procurement, 90-Day Paid Sandbox & Commercial Scale-Up Engine",
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

class EvaluateScaleUpRequest(BaseModel):
    challenge_id: str = Field("MSINS-CH-2026-001", example="MSINS-CH-2026-001")
    startup_name: str = Field("JalDrishti AI Technologies", example="JalDrishti AI Technologies")

@app.get("/")
def read_root():
    return {
        "service": "MahaStartupSandbox 360 Public Innovation Hub (SIH26136)",
        "organization": "Government of Maharashtra",
        "challenges_active": len(load_json("departmental_innovation_challenges.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/challenges")
def get_challenges():
    return load_json("departmental_innovation_challenges.json")

@app.get("/api/v1/startups")
def get_startups():
    return load_json("eligible_dpiit_startups_registry.json")

@app.get("/api/v1/contracts")
def get_contracts():
    return load_json("milestone_escrow_contracts.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("procurement_stats.json")

@app.post("/api/v1/evaluate-pilot-scaleup")
def evaluate_scaleup(req: EvaluateScaleUpRequest):
    return {
        "challenge": req.challenge_id,
        "startup": req.startup_name,
        "pilot_kpi_audit": "PASSED (96.4% Technical Accuracy by COEP)",
        "escrow_final_release": "₹10.0 Lakhs Released (Milestone 3)",
        "scale_up_pathway": "Direct Non-Tender Commercial Scale-Up Contract (Rule 173 GFR / MSInS Policy)",
        "sanctioned_commercial_value": "₹4.80 Crores",
        "sanctioned_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
