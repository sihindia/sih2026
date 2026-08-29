"""
SIH26193: Enhancing Agriculture, Post-Harvest Value Addition & Produce Management (KrishiSetu 360)
AICTE / Ministry of Agriculture / MoFPI / e-NAM
FastAPI Production Microservice with AI Precision Agronomy, Solar Cold-Chain Telemetry & e-NWR Finance API
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
    title="KrishiSetu 360 Smart Agriculture & Post-Harvest Platform (SIH26193) - AICTE / MoFPI",
    description="Food Processing Value Addition, Solar Cold-Chain & e-NAM Mandi Price Discovery API",
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

class DiagnoseCropRequest(BaseModel):
    crop_name: str = Field("Tomato", example="Tomato")
    visual_symptoms: str = Field("Concentric dark brown leaf spots with yellow halo", example="Dark spots")
    soil_ph: float = Field(5.8, ge=4.0, le=9.0)

class ValueAdditionRequest(BaseModel):
    crop_id: str = Field("CROP-TOMATO-01", example="CROP-TOMATO-01")
    raw_harvest_quantity_kg: float = Field(5000.0, ge=100.0)

@app.get("/")
def read_root():
    return {
        "service": "KrishiSetu 360 Smart Agriculture Platform (SIH26193)",
        "organization": "AICTE, MIC-Student Innovation / Ministry of Agriculture",
        "value_addition_crops": len(load_json("crop_value_addition.json")),
        "crop_disease_rules": len(load_json("crop_disease_diagnostics.json")),
        "solar_cold_storages": len(load_json("cold_storage_grid.json")),
        "enam_mandis_tracked": len(load_json("enam_mandi_prices.json")),
        "fpo_pledged_receipts": len(load_json("fpo_warehouse_receipts.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/crops")
def get_crops():
    return load_json("crop_value_addition.json")

@app.get("/api/v1/cold-storages")
def get_cold_storages():
    return load_json("cold_storage_grid.json")

@app.get("/api/v1/mandi-rates")
def get_mandi():
    return load_json("enam_mandi_prices.json")

@app.get("/api/v1/warehouse-receipts")
def get_receipts():
    return load_json("fpo_warehouse_receipts.json")

@app.post("/api/v1/calculate-value-addition")
def calculate_value_addition(req: ValueAdditionRequest):
    crops = load_json("crop_value_addition.json")
    crop = next((c for c in crops if c["crop_id"] == req.crop_id), crops[0])
    
    raw_val = req.raw_harvest_quantity_kg * crop["raw_farmgate_price_inr_kg"]
    # 1 kg raw produces ~0.35 kg concentrated puree/powder
    processed_qty = req.raw_harvest_quantity_kg * 0.35
    processed_val = processed_qty * crop["processed_price_inr_kg"]
    net_profit = processed_val - raw_val - (req.raw_harvest_quantity_kg * 4.0) # Rs 4/kg processing cost
    
    return {
        "crop_name": crop["crop_name"],
        "raw_sale_revenue_inr": raw_val,
        "processed_sale_revenue_inr": processed_val,
        "net_profit_gain_inr": net_profit,
        "value_uplift_pct": round((net_profit / raw_val) * 100.0, 1),
        "recommended_product": crop["processed_product"],
        "mofpi_subsidy_available": crop["mofpi_pmfme_subsidy"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
