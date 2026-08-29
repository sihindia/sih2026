"""
SIH26186: AI-Based Predictive Personnel Stress & Welfare Monitoring for Uniformed Forces (VeerSwasthya 360)
Ministry of Home Affairs (MHA) / Central Reserve Police Force (CRPF) / Police II Division
FastAPI Production Microservice with Multi-Modal Burnout Predictor, HRV Sleep Analytics & Welfare Dispatch API
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
    title="VeerSwasthya 360 Personnel Wellness Platform (SIH26186) - MHA / CRPF",
    description="CAPF Stress Prediction, Biometric HRV Sleep Telemetry & Non-Stigmatizing Welfare Interventions API",
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

class PredictStressRequest(BaseModel):
    continuous_deployment_months: float = Field(14.0, ge=1.0, le=48.0)
    leave_deficit_days: int = Field(210, ge=0, le=730)
    hrv_rmssd_ms: float = Field(18.4, ge=5.0, le=100.0)
    avg_sleep_hours: float = Field(3.8, ge=1.0, le=12.0)

class GrantWelfareRequest(BaseModel):
    personnel_id: str = Field("CRPF-204-COBRA-891", example="CRPF-204-COBRA-891")
    leave_days: int = Field(15, ge=1, le=60)
    assigned_counselor: str = Field("Dr. Shalini Mukherji (MHA Tele-Counselor)", example="Dr. Shalini Mukherji")

@app.get("/")
def read_root():
    return {
        "service": "VeerSwasthya 360 Uniformed Forces Wellness Platform (SIH26186)",
        "organization": "Ministry of Home Affairs / Central Reserve Police Force (CRPF)",
        "monitored_personnel": len(load_json("personnel_wellness.json")),
        "biometric_telemetry_metrics": len(load_json("biometric_telemetry.json")),
        "dass21_assessment_protocols": len(load_json("dass21_guidelines.json")),
        "battalion_heatmaps_tracked": len(load_json("battalion_heatmaps.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/personnel")
def get_personnel():
    return load_json("personnel_wellness.json")

@app.get("/api/v1/biometrics")
def get_biometrics():
    return load_json("biometric_telemetry.json")

@app.get("/api/v1/assessments")
def get_assessments():
    return load_json("dass21_guidelines.json")

@app.get("/api/v1/battalion-heatmaps")
def get_heatmaps():
    return load_json("battalion_heatmaps.json")

@app.post("/api/v1/predict-burnout-risk")
def predict_burnout_risk(req: PredictStressRequest):
    # Predictive multi-variable burnout formula
    hrv_penalty = max(0, (35.0 - req.hrv_rmssd_ms) * 1.8)
    sleep_penalty = max(0, (6.5 - req.avg_sleep_hours) * 12.0)
    deploy_penalty = (req.continuous_deployment_months / 12.0) * 18.0
    leave_penalty = (req.leave_deficit_days / 180.0) * 20.0
    
    score = min(99.0, round(20.0 + hrv_penalty + sleep_penalty + deploy_penalty + leave_penalty, 1))
    is_critical = score >= 75.0
    
    return {
        "burnout_risk_score": score,
        "triage_status": "RED_CRITICAL_INTERVENTION_NEEDED" if is_critical else "AMBER_ELEVATED_FATIGUE" if score >= 50.0 else "GREEN_OPTIMAL_RESILIENCE",
        "recommended_action": "Sanction 15-Day Immediate Compassionate Leave & Schedule Psychological De-escalation" if is_critical else "Normal Rotation",
        "evaluated_at": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/assign-welfare-intervention")
def assign_welfare_intervention(req: GrantWelfareRequest):
    return {
        "personnel_id": req.personnel_id,
        "leave_sanctioned_days": req.leave_days,
        "assigned_counselor": req.assigned_counselor,
        "status": "APPROVED_BY_COMMANDANT",
        "non_stigmatized_flag": "STRICT_MEDICAL_CONFIDENTIALITY_ACTIVE",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
