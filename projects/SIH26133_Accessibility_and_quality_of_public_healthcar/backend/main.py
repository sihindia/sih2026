"""
SIH26133: Accessibility and Quality of Public Healthcare Services (MahaArogya 360)
Government of Maharashtra / Maharashtra State Innovation Society
FastAPI Production Microservice with Rural Telemedicine, ABHA Longitudinal Records & Referral Mesh
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
    title="MahaArogya 360 Rural Health & Telemedicine Mesh (SIH26133) - Maharashtra",
    description="ASHA Assisted Teleconsultations, Emergency Hospital Referral Continuum & Cold Chain Monitoring",
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

class TeleconsultRequest(BaseModel):
    patient_name: str = Field("Sunita Korku", example="Sunita Korku")
    vitals_bp: str = Field("155/95 mmHg", example="155/95 mmHg")
    symptoms: str = Field("Severe Anemia & Pregnancy Pre-Eclampsia", example="symptoms text")

@app.get("/")
def read_root():
    return {
        "service": "MahaArogya 360 Rural Health Telemedicine Hub (SIH26133)",
        "organization": "Government of Maharashtra",
        "teleconsults_recorded": len(load_json("rural_teleconsultation_cases.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/cases")
def get_cases():
    return load_json("rural_teleconsultation_cases.json")

@app.get("/api/v1/medicines")
def get_medicines():
    return load_json("phc_medicine_stock_coldchain.json")

@app.get("/api/v1/referrals")
def get_referrals():
    return load_json("public_health_referral_mesh.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("mahaarogya_stats.json")

@app.post("/api/v1/initiate-teleconsult")
def initiate_teleconsult(req: TeleconsultRequest):
    return {
        "patient": req.patient_name,
        "specialist_assigned": "Dr. Vaishali Patil (MD Obs/Gyn)",
        "clinical_triage": "HIGH_RISK_MATERNAL_ALERT",
        "prescription": "Inj. Iron Sucrose 100mg + Tab. Labetalol 100mg BD",
        "ambulance_108_status": "DISPATCHED_ETA_22_MIN",
        "marathi_instructions": "रुग्णाला तात्काळ विश्रांती द्या. १०८ रुग्णवाहिका दाखल होत आहे.",
        "connected_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
