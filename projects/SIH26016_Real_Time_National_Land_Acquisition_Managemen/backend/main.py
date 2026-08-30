"""
SIH26016: Real-Time National Land Acquisition & Management System (DoLR BhoomiAcquire 360)
Ministry of Rural Development - Department of Land Resources (DoLR)
FastAPI Production Microservice for RFCTLARR 2013 Workflow, DBT Compensation & R&R Resettlement
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
    title="DoLR BhoomiAcquire 360 Hub (SIH26016) - DoLR / Ministry of Rural Development",
    description="Real-Time National Land Acquisition & Management System for End-to-End Digital Monitoring and Decision Support",
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

class DisburseCompensationRequest(BaseModel):
    project_id: str = Field("NLAMS-2026-041", example="NLAMS-2026-041")
    family_id: str = Field("FAM-RAJ-104", example="FAM-RAJ-104")
    amount_inr: float = Field(2850000.0, example=2850000.0)

@app.get("/")
def read_root():
    return {
        "service": "DoLR BhoomiAcquire 360 Hub (SIH26016)",
        "ministry": "Ministry of Rural Development",
        "department": "Department of Land Resources (DoLR)",
        "national_portal": "NLAMS (National Land Acquisition & Management System)",
        "projects_monitored": len(load_json("land_acquisition_proposals_registry.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/proposals")
def get_proposals():
    return load_json("land_acquisition_proposals_registry.json")

@app.get("/api/v1/stages")
def get_stages():
    return load_json("rfctlarr_act_stages_workflow.json")

@app.get("/api/v1/families")
def get_families():
    return load_json("displaced_families_resettlement_registry.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("bhoomiacquire_stats.json")

@app.post("/api/v1/disburse-compensation")
def disburse_compensation(req: DisburseCompensationRequest):
    return {
        "project_id": req.project_id,
        "family_id": req.family_id,
        "amount_disbursed_inr": req.amount_inr,
        "payment_rail": "PFMS / Aadhaar Payment Bridge (APB)",
        "status": "DBT_CREDITED_SUCCESSFULLY",
        "utr_number": f"PFMS{random.randint(100000000, 999999999)}",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
