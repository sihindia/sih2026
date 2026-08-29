"""
SIH26130: Efficiency in Streamlining Industrial Approvals (MahaUdyog 360)
Government of Maharashtra / Maharashtra State Innovation Society
FastAPI Production Microservice with Single-Window Clearances & Joint Inspection API
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
    title="MahaUdyog 360 Industrial Clearance Hub (SIH26130) - Maharashtra",
    description="Single-Window Industrial Approvals, Joint Inspections & PSI 2019 Incentive Engine",
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

class EvaluateProjectRequest(BaseModel):
    project_name: str = Field("Chakan EV Facility", example="Chakan EV Facility")
    investment_inr_cr: float = Field(145.0, example=145.0)
    zone: str = Field("Zone B", example="Zone B")

@app.get("/")
def read_root():
    return {
        "service": "MahaUdyog 360 Industrial Single-Window Hub (SIH26130)",
        "organization": "Government of Maharashtra",
        "projects_cleared": len(load_json("industrial_approval_applications.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/applications")
def get_applications():
    return load_json("industrial_approval_applications.json")

@app.get("/api/v1/inspections")
def get_inspections():
    return load_json("joint_inspection_schedules.json")

@app.get("/api/v1/incentives")
def get_incentives():
    return load_json("state_industrial_incentives_psi.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("mahaudyog_stats.json")

@app.post("/api/v1/evaluate-clearance-checklist")
def evaluate_project(req: EvaluateProjectRequest):
    return {
        "project": req.project_name,
        "investment": f"₹{req.investment_inr_cr} Crores",
        "mandatory_clearances": ["MIDC Plot Allotment", "MPCB Consent to Establish", "DISH Factory License", "Fire Safety NOC", "MSEDCL Feeder"],
        "estimated_turnaround_days": 11.5,
        "statutory_sla_days": 45,
        "eligible_psi_subsidy_cr": round(req.investment_inr_cr * 0.20, 2),
        "evaluated_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
