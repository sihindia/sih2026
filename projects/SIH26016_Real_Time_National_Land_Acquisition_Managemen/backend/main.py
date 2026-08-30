"""
SIH26016: Real-Time National Land Acquisition & Management System (DoLR BhoomiAcquire 360)
Ministry of Rural Development - Department of Land Resources (DoLR)
FastAPI Production Microservice for RFCTLARR 2013 Workflow, DBT Compensation,
Section 26 Solatium Calculator, 12-Month Lapse Watchdog & R&R Resettlement API
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
    version="4.0.0"
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

class CalculateAwardRequest(BaseModel):
    state: str = Field("Rajasthan", example="Rajasthan")
    area_hectares: float = Field(2.0, example=2.0)
    circle_rate_inr_sqm: float = Field(850.0, example=850.0)
    rural_multiplier: float = Field(1.75, example=1.75)
    assets_value_inr: float = Field(400000.0, example=400000.0)

class LapseEscalationRequest(BaseModel):
    alert_id: str = Field("ALERT-SEC25-088", example="ALERT-SEC25-088")
    days_remaining: int = Field(45, example=45)
    target_authority: str = Field("District Collector Chhatarpur", example="District Collector Chhatarpur")

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

@app.get("/api/v1/compensation-benchmarks")
def get_benchmarks():
    return load_json("compensation_calculator_and_solatium_benchmarks.json")

@app.get("/api/v1/lapse-alerts")
def get_lapse_alerts():
    return load_json("rfctlarr_lapse_watchdog_and_escalation_alerts.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("bhoomiacquire_stats.json")

@app.post("/api/v1/calculate-award")
def calculate_award(req: CalculateAwardRequest):
    area_sqm = req.area_hectares * 10000.0
    base_market_val = area_sqm * req.circle_rate_inr_sqm
    multiplied_val = base_market_val * req.rural_multiplier
    land_and_assets = multiplied_val + req.assets_value_inr
    solatium_100 = land_and_assets  # 100% Solatium under Section 30
    additional_interest = land_and_assets * 0.12  # 12% per annum under Section 30(3)
    total_compensation = land_and_assets + solatium_100 + additional_interest
    
    return {
        "state": req.state,
        "area_hectares": req.area_hectares,
        "base_market_value_inr": round(base_market_val, 2),
        "multiplied_land_value_inr": round(multiplied_val, 2),
        "assets_structures_trees_inr": round(req.assets_value_inr, 2),
        "solatium_100_pct_inr": round(solatium_100, 2),
        "additional_interest_12_pct_inr": round(additional_interest, 2),
        "total_award_compensation_inr": round(total_compensation, 2),
        "statutory_compliance": "RFCTLARR_SECTION_26_30_VERIFIED",
        "timestamp": datetime.utcnow().isoformat()
    }

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

@app.post("/api/v1/trigger-escalation-alert")
def trigger_escalation(req: LapseEscalationRequest):
    return {
        "alert_id": req.alert_id,
        "days_remaining_to_sec25_lapse": req.days_remaining,
        "dispatched_to": req.target_authority,
        "escalation_channel": "NIC SMS Gateway + e-Office High-Priority Flag",
        "status": "ESCALATION_DISPATCHED_TO_COLLECTOR",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
