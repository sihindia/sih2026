"""
SIH26031: AI-Based Onion Quality Assessment & Digital Grading System
Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution / NAFED
FastAPI Production Microservice with Computer Vision Object Detection Simulation, Caliper Analysis & DBT Payout Formula
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
    title="DoCA / NAFED AI Onion Quality Grading & Payout Platform (SIH26031)",
    description="Computer Vision Defect Delineation, Size Distribution & Direct Benefit Transfer Settlement Engine",
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

class AnalyzeLotRequest(BaseModel):
    sample_size: int = Field(100, ge=20, le=500, description="Number of sample onions to segment")
    variety: str = Field("Nashik Red Garva", example="Nashik Red Garva")
    lot_weight_quintals: float = Field(150.0, ge=5.0, le=1000.0)
    mandi_code: str = Field("APMC-LASALGAON", example="APMC-LASALGAON")

class CustomPayoutRequest(BaseModel):
    grade_a_pct: float = Field(..., ge=0, le=100)
    grade_b_pct: float = Field(..., ge=0, le=100)
    urs_pct: float = Field(..., ge=0, le=100)
    moisture_pct: float = Field(..., ge=8.0, le=25.0)
    lot_weight_quintals: float = Field(..., ge=1.0)
    base_msp: float = Field(2400.0)

@app.get("/")
def read_root():
    return {
        "service": "DoCA AI Onion Quality Grading Platform (SIH26031)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "lots_in_database": len(load_json("procurement_lots.json")),
        "procurement_centers_live": len(load_json("procurement_centers.json")),
        "grading_standards": len(load_json("grading_standards.json")),
        "resolved_disputes": len(load_json("dispute_cases.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/lots")
def get_lots():
    return load_json("procurement_lots.json")

@app.get("/api/v1/lots/{lot_id}")
def get_lot_detail(lot_id: str):
    lots = load_json("procurement_lots.json")
    for l in lots:
        if l["lot_id"] == lot_id:
            return l
    raise HTTPException(status_code=404, detail="Lot not found")

@app.get("/api/v1/lots/{lot_id}/detections")
def get_lot_detections(lot_id: str):
    detections = load_json("sample_detections.json")
    if lot_id in detections:
        return detections[lot_id]
    # Fallback simulated random sample
    return detections.get("LOT-LASALGAON-2026-081", [])

@app.get("/api/v1/centers")
def get_centers():
    return load_json("procurement_centers.json")

@app.get("/api/v1/standards")
def get_standards():
    return load_json("grading_standards.json")

@app.get("/api/v1/disputes")
def get_disputes():
    return load_json("dispute_cases.json")

@app.post("/api/v1/analyze-custom-lot")
def analyze_custom_lot(req: AnalyzeLotRequest):
    # Simulated Computer Vision Model Inference
    # Produce randomized realistic distribution centered around high-grade Rabi onions
    grade_a = round(random.uniform(75.0, 90.0), 1)
    urs = round(random.uniform(1.0, 5.0), 1)
    grade_b = round(100.0 - grade_a - urs, 1)
    
    avg_dia = round(random.uniform(52.0, 64.0), 1)
    sprouting = round(random.uniform(0.2, 1.8), 1)
    mold = round(random.uniform(0.1, 0.9), 1)
    
    base_msp = 2400.0
    quality_premium = 100.0 if grade_a >= 80.0 else (-100.0 if grade_a < 65.0 else 0.0)
    payout_rate = base_msp + quality_premium
    total_settlement = round(payout_rate * req.lot_weight_quintals, 2)

    return {
        "analyzed_at": datetime.utcnow().isoformat(),
        "sample_size": req.sample_size,
        "variety": req.variety,
        "mandi_code": req.mandi_code,
        "lot_weight_quintals": req.lot_weight_quintals,
        "results": {
            "grade_a_pct": grade_a,
            "grade_b_pct": grade_b,
            "urs_reject_pct": urs,
            "avg_diameter_mm": avg_dia,
            "sprouting_rate_pct": sprouting,
            "black_mold_rate_pct": mold,
            "certified_payout_per_qtl": payout_rate,
            "total_settlement_inr": total_settlement,
            "nafed_buffer_eligible": grade_a >= 75.0 and urs <= 5.0,
            "ai_confidence_score": 0.982
        }
    }

@app.post("/api/v1/calculate-payout")
def calculate_payout(req: CustomPayoutRequest):
    # DoCA Formula:
    # If Grade A >= 80%: Premium +Rs 100/qtl
    # If Grade A >= 85%: Premium +Rs 250/qtl (Export grade)
    # If Grade A < 65%: Deduction -Rs 180/qtl
    # Moisture deduction: If > 13%, deduct Rs 50/qtl per 1% excess moisture
    
    premium = 0.0
    if req.grade_a_pct >= 85.0:
        premium += 250.0
    elif req.grade_a_pct >= 80.0:
        premium += 100.0
    elif req.grade_a_pct < 65.0:
        premium -= 180.0
        
    moisture_penalty = 0.0
    if req.moisture_pct > 13.0:
        moisture_penalty = (req.moisture_pct - 13.0) * 50.0

    final_rate = max(1000.0, req.base_msp + premium - moisture_penalty)
    total_payout = round(final_rate * req.lot_weight_quintals, 2)

    return {
        "base_msp": req.base_msp,
        "quality_premium": premium,
        "moisture_penalty": moisture_penalty,
        "final_rate_per_qtl": final_rate,
        "total_payout_inr": total_payout,
        "buffer_storage_recommendation": "SAFE_FOR_BUFFER" if req.grade_a_pct >= 75 and req.moisture_pct <= 13.5 else "PRIORITY_LOCAL_AUCTION"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
