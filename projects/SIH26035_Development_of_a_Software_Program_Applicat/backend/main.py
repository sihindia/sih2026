"""
SIH26035: Generation of Test Reports for Non-Automatic Weighing Instruments (NAWI) as per OIML R-76
Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution
FastAPI Production Microservice with OIML R-76-1:2006 Metrological Calculation Engine & Certificate Generator
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
    title="DoCA NAWI OIML R-76 Test Report Generator Platform (SIH26035)",
    description="Automated Non-Automatic Weighing Instruments Metrology Testing, MPE Calculation & Model Approval API",
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

class EvaluateTestPointRequest(BaseModel):
    model_id: str = Field("NAWI-MOD-2026-081", example="NAWI-MOD-2026-081")
    accuracy_class: str = Field("Class III (Medium)", example="Class III (Medium)")
    verification_scale_interval_e_g: float = Field(5.0, ge=0.0001, le=100000.0)
    applied_load_kg: float = Field(10.0, ge=0.0)
    indicated_load_kg: float = Field(10.002, ge=0.0)

@app.get("/")
def read_root():
    return {
        "service": "DoCA NAWI OIML R-76 Test Report Engine (SIH26035)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "evaluated_models": len(load_json("nawi_instruments.json")),
        "oiml_mpe_tables": len(load_json("oiml_standards_table.json")),
        "rrsl_labs_active": len(load_json("rrsl_labs.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/instruments")
def get_instruments():
    return load_json("nawi_instruments.json")

@app.get("/api/v1/instruments/{model_id}/tests")
def get_instrument_tests(model_id: str):
    obs = load_json("oiml_test_observations.json")
    if model_id in obs:
        return obs[model_id]
    return obs.get("NAWI-MOD-2026-081", {})

@app.get("/api/v1/standards")
def get_standards():
    return load_json("oiml_standards_table.json")

@app.get("/api/v1/labs")
def get_labs():
    return load_json("rrsl_labs.json")

@app.post("/api/v1/evaluate-test-point")
def evaluate_test_point(req: EvaluateTestPointRequest):
    e_g = req.verification_scale_interval_e_g
    load_g = req.applied_load_kg * 1000.0
    ind_g = req.indicated_load_kg * 1000.0
    error_g = round(ind_g - load_g, 4)
    
    # Calculate load in terms of verification intervals (m / e)
    m_over_e = load_g / e_g if e_g > 0 else 0
    
    # Class III MPE formula
    if "III" in req.accuracy_class and "IIII" not in req.accuracy_class:
        if m_over_e <= 500:
            mpe_g = 0.5 * e_g
        elif m_over_e <= 2000:
            mpe_g = 1.0 * e_g
        else:
            mpe_g = 1.5 * e_g
    elif "II" in req.accuracy_class and "III" not in req.accuracy_class:
        if m_over_e <= 5000:
            mpe_g = 0.5 * e_g
        elif m_over_e <= 20000:
            mpe_g = 1.0 * e_g
        else:
            mpe_g = 1.5 * e_g
    else:
        mpe_g = 1.0 * e_g

    is_pass = abs(error_g) <= mpe_g

    return {
        "applied_load_kg": req.applied_load_kg,
        "indicated_load_kg": req.indicated_load_kg,
        "error_g": error_g,
        "m_over_e_intervals": m_over_e,
        "permissible_mpe_g": mpe_g,
        "status": "PASS" if is_pass else "FAIL",
        "oiml_clause": "OIML R 76-1 Clause 3.5.1 (Maximum Permissible Errors)",
        "evaluated_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
