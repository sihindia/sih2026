"""
SIH26199: Student Innovation - Technology Ideas in Tertiary Sectors (Hospitality, FinTech, Retail, Media)
AICTE / MIC-Student Innovation / OmniTertiary 360 Platform
FastAPI Production Microservice with OCEN Cashflow Underwriting, ONDC Open Commerce & Hospitality Dynamic Yield API
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
    title="OmniTertiary 360 Open Innovation Platform (SIH26199) - AICTE",
    description="FinTech Cashflow Lending, ONDC Smart Retail, Hospitality Yield & Media Royalty API",
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

class UnderwriteLoanRequest(BaseModel):
    business_name: str = Field(..., example="Sharma Kirana")
    monthly_upi_turnover: float = Field(350000.0, ge=10000.0)
    gst_filing_regular: bool = Field(True)
    requested_loan_amount: float = Field(100000.0, ge=10000.0, le=1000000.0)

class RoomYieldRequest(BaseModel):
    room_id: str = Field("ROOM-JPR-PALACE-01", example="ROOM-JPR-PALACE-01")
    festival_surge_active: bool = Field(True)
    current_occupancy_pct: float = Field(85.0, ge=0.0, le=100.0)

@app.get("/")
def read_root():
    return {
        "service": "OmniTertiary 360 Tertiary Sector Innovation (SIH26199)",
        "organization": "AICTE, MIC-Student Innovation",
        "tertiary_sectors": len(load_json("tertiary_sectors.json")),
        "fintech_loans_underwritten": len(load_json("fintech_loan_underwriting.json")),
        "ondc_retail_items": len(load_json("ondc_inventory.json")),
        "hospitality_rooms_tracked": len(load_json("hospitality_rooms.json")),
        "creator_contracts": len(load_json("creator_royalties.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/sectors")
def get_sectors():
    return load_json("tertiary_sectors.json")

@app.get("/api/v1/fintech")
def get_fintech():
    return load_json("fintech_loan_underwriting.json")

@app.get("/api/v1/ondc-retail")
def get_ondc():
    return load_json("ondc_inventory.json")

@app.get("/api/v1/hospitality")
def get_hospitality():
    return load_json("hospitality_rooms.json")

@app.get("/api/v1/creator-royalties")
def get_royalties():
    return load_json("creator_royalties.json")

@app.post("/api/v1/underwrite-msme-loan")
def underwrite_msme_loan(req: UnderwriteLoanRequest):
    # OCEN cashflow underwriting algorithm
    max_eligible = round(req.monthly_upi_turnover * 0.40, 2)
    sanctioned = min(req.requested_loan_amount, max_eligible)
    credit_score = 810 if req.gst_filing_regular else 720
    
    return {
        "business_name": req.business_name,
        "credit_score": credit_score,
        "max_eligible_cashflow_loan_inr": max_eligible,
        "sanctioned_amount_inr": sanctioned,
        "interest_rate_pct": 10.5 if credit_score > 800 else 13.0,
        "daily_repayment_inr": round((sanctioned * 1.05) / 180, 2),
        "status": "INSTANT_OCEN_SANCTION_APPROVED",
        "disbursed_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
