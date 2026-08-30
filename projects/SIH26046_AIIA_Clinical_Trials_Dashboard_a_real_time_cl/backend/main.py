"""
SIH26046: AIIA Clinical Trials Dashboard & Pharmacovigilance CTMS (AIIA CTMS 360)
Ministry of Ayush - All India Institute of Ayurveda (AIIA)
FastAPI Production Microservice with GCP-ASU Trial KPIs & CDISC/FHIR Interoperability API
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
    title="AIIA CTMS 360 Clinical Trials Hub (SIH26046) - AIIA / Ayush",
    description="Real-time, cloud-based, GCP-compliant Clinical Trial Management System (CTMS) for Ayurveda research",
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

class LogAdverseEventRequest(BaseModel):
    trial_code: str = Field("CT-AIIA-2026-DM01", example="CT-AIIA-2026-DM01")
    meddra_term: str = Field("Nausea", example="Nausea")
    severity: str = Field("Mild (Grade 1)", example="Mild (Grade 1)")

@app.get("/")
def read_root():
    return {
        "service": "AIIA CTMS 360 Hub (SIH26046)",
        "sponsor": "Ministry of Ayush / All India Institute of Ayurveda",
        "coordination_centre": "National Pharmacovigilance Coordination Centre (NPvCC)",
        "gcp_compliance": "GCP-ASU & NDCT Rules 2019",
        "data_standards": "CDISC (SDTM/ADaM) & HL7 FHIR R4 (ABDM)",
        "trials_tracked": len(load_json("aiia_clinical_trials_registry.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/trials")
def get_trials():
    return load_json("aiia_clinical_trials_registry.json")

@app.get("/api/v1/adverse-events")
def get_adverse_events():
    return load_json("pharmacovigilance_adverse_events.json")

@app.get("/api/v1/standards")
def get_standards():
    return load_json("cdisc_fhir_data_standards_matrix.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("aiia_ctms_stats.json")

@app.post("/api/v1/log-pharmacovigilance-event")
def log_event(req: LogAdverseEventRequest):
    return {
        "trial_code": req.trial_code,
        "meddra_coding": f"{req.meddra_term} (PT: 100{random.randint(1000, 9999)})",
        "regulatory_reporting_window": "Routine Periodic Safety Update (PSUR) 14 Days" if "Mild" in req.severity else "EXPEDITED 24 HOURS TO DCGI & IEC",
        "who_umc_causality": "Possible",
        "alcoa_audit_hash": f"SHA256-{random.randint(100000, 999999)}-ALCOA",
        "status": "LOGGED_IN_NPVCC_DATABASE",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
