"""
SIH26170: AI-Driven Anomaly Detection in Component Burn-In & Screening (BurnInScope 360)
Indian Space Research Organisation (ISRO) / Space Applications Centre (SAC)
FastAPI Production Microservice with Dynamic Outlier & 168h Drift Predictor API
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
    title="BurnInScope 360 Space Component Screening (SIH26170) - ISRO",
    description="AI-Driven Dynamic Outlier & Time-Series Drift Predictor for Space-Grade Electronics",
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

class DriftPredictRequest(BaseModel):
    val_0h: float = Field(18.4, example=18.4)
    val_24h: float = Field(29.8, example=29.8)
    lot_mean: float = Field(10.2, example=10.2)

@app.get("/")
def read_root():
    return {
        "service": "BurnInScope 360 Space Component Screening (SIH26170)",
        "organization": "Indian Space Research Organisation (ISRO)",
        "components_screened": len(load_json("burn_in_components_screening.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/components")
def get_components():
    return load_json("burn_in_components_screening.json")

@app.get("/api/v1/time-series")
def get_time_series():
    return load_json("parametric_time_series_drift.json")

@app.get("/api/v1/explainability")
def get_explainability():
    return load_json("qa_inspector_explainability.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("burnin_stats.json")

@app.post("/api/v1/forecast-168h-drift")
def forecast_drift(req: DriftPredictRequest):
    slope = (req.val_24h - req.val_0h) / 24.0
    forecast_168 = req.val_0h + (slope * 168.0 * 0.92)
    is_outlier = (req.val_0h > req.lot_mean * 1.5) or (slope > 0.05)
    return {
        "val_0h": req.val_0h,
        "val_24h": req.val_24h,
        "calculated_drift_slope": round(slope, 4),
        "forecasted_168h_value": round(forecast_168, 2),
        "is_dynamic_outlier": is_outlier,
        "verdict": "EARLY_REJECTION_RECOMMENDED" if is_outlier else "QUALIFIED_PASS",
        "saved_oven_hours": 144,
        "forecasted_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
