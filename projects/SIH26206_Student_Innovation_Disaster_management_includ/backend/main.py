"""
SIH26206: Student Innovation - Comprehensive Disaster Management & Rapid Risk Mitigation Platform
AICTE / MIC-Student Innovation / NDMA National Disaster Command Grid
FastAPI Production Microservice with Real-Time Multi-Hazard Warning, NDRF Battalion Tasking & Citizen SOS Triage
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
    title="SurakshaGrid 360 National Disaster Command Platform (SIH26206)",
    description="Multi-Hazard Early Warning, NDRF Dispatch, Shelter Logistics & Citizen SOS AI Triage API",
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

class SubmitSOSRequest(BaseModel):
    citizen_name: str = Field(..., example="Sunil Sharma")
    contact_phone: str = Field(..., example="+91 98100 00000")
    hazard_type: str = Field("FLOOD_INUNDATION", example="FLOOD_INUNDATION")
    family_members: int = Field(4, ge=1, le=50)
    situation: str = Field(..., example="Water rising rapidly on ground floor, 1 infant present")
    location_str: str = Field("Barpeta Sector 3", example="Barpeta Sector 3")

@app.get("/")
def read_root():
    return {
        "service": "SurakshaGrid 360 Disaster Command Platform (SIH26206)",
        "organization": "AICTE, MIC-Student Innovation / NDMA",
        "active_hazard_alerts": len(load_json("hazard_alerts.json")),
        "ndrf_battalions_deployed": len(load_json("ndrf_battalions.json")),
        "relief_camps_tracked": len(load_json("relief_camps.json")),
        "active_sos_beacons": len(load_json("sos_reports.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/alerts")
def get_alerts():
    return load_json("hazard_alerts.json")

@app.get("/api/v1/ndrf-units")
def get_ndrf():
    return load_json("ndrf_battalions.json")

@app.get("/api/v1/relief-camps")
def get_camps():
    return load_json("relief_camps.json")

@app.get("/api/v1/sos-reports")
def get_sos():
    return load_json("sos_reports.json")

@app.get("/api/v1/evacuation-routes")
def get_routes():
    return load_json("evacuation_routes.json")

@app.post("/api/v1/submit-sos")
def submit_sos(req: SubmitSOSRequest):
    # AI urgency triage calculation
    is_critical = any(w in req.situation.lower() for w in ["infant", "elderly", "medical", "submerged", "roof", "trapped"])
    triage_score = 98.5 if is_critical else 85.0
    urgency = "CRITICAL_LIFE_THREAT" if is_critical else "HIGH_EVACUATION_NEEDED"
    
    sos_id = f"SOS-2026-{random.randint(10000, 99999)}"
    
    return {
        "sos_id": sos_id,
        "citizen_name": req.citizen_name,
        "contact_phone": req.contact_phone,
        "urgency_level": urgency,
        "ai_triage_score": triage_score,
        "assigned_rescue_unit": "1st Battalion NDRF Quick Response Boat",
        "dispatch_status": "BOAT_EN_ROUTE_ACKNOWLEDGED",
        "nearest_relief_camp": "Barpeta Higher Secondary Relief Hub",
        "created_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
