"""
SIH26035: Non-Automatic Weighing Instruments (NAWI) OIML R-76 Test Report Generator (OIML MetrologyLab 360)
Ministry of Consumer Affairs, Food & Public Distribution - DoCA
FastAPI Production Microservice for OIML R-76 Metrological Evaluation & Type Approval Certificates
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
    title="OIML MetrologyLab 360 Hub (SIH26035) - Ministry of Consumer Affairs",
    description="Automated generation of standardized test reports for Non-Automatic Weighing Instruments (NAWI) as per OIML Recommendation R 76",
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

class CalculateMpeRequest(BaseModel):
    instrument_id: str = Field("NAWI-ER30", example="NAWI-ER30")
    applied_load_kg: float = Field(15.0, example=15.0)
    indicated_reading_kg: float = Field(15.003, example=15.003)

@app.get("/")
def read_root():
    return {
        "service": "OIML MetrologyLab 360 Hub (SIH26035)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "department": "Department of Consumer Affairs (DoCA)",
        "standard": "OIML Recommendation R 76-1:2006 & R 76-2:2007",
        "instruments_cataloged": len(load_json("nawi_tested_instruments_catalog.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/instruments")
def get_instruments():
    return load_json("nawi_tested_instruments_catalog.json")

@app.get("/api/v1/tests")
def get_tests():
    return load_json("oiml_r76_weighing_performance_tests.json")

@app.get("/api/v1/labs")
def get_labs():
    return load_json("rrsl_metrology_laboratories.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("oiml_compliance_stats.json")

@app.post("/api/v1/calculate-mpe")
def calculate_mpe(req: CalculateMpeRequest):
    err = round((req.indicated_reading_kg - req.applied_load_kg) * 1000, 1)
    mpe = 2.5 if req.applied_load_kg <= 2.5 else (5.0 if req.applied_load_kg <= 10.0 else 7.5)
    is_pass = abs(err) <= mpe
    
    return {
        "instrument_id": req.instrument_id,
        "applied_load_kg": req.applied_load_kg,
        "indicated_reading_kg": req.indicated_reading_kg,
        "intrinsic_error_g": f"{err:+} g",
        "maximum_permissible_error_g": f"±{mpe} g",
        "is_within_mpe_tolerance": is_pass,
        "verdict": "PASS" if is_pass else "FAIL",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
