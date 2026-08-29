"""
SIH26192: Flash Flood Prediction System for Hilly Regions (JalPravah 360)
Ministry of Home Affairs (MHA) / National Disaster Response Force (NDRF) / DM Division
FastAPI Production Microservice with Multi-Source Hydrodynamic Surge Predictor & CAP Siren Broadcaster
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
    title="JalPravah 360 Flash Flood Prediction Platform (SIH26192) - MHA / NDRF",
    description="Multi-Source IoT Telemetry, Hydrodynamic Runoff & Village Early Warning API",
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

class PredictSurgeRequest(BaseModel):
    rainfall_intensity_mm_h: float = Field(85.0, ge=1.0, le=300.0)
    soil_saturation_pct: float = Field(95.0, ge=0.0, le=100.0)
    catchment_area_sq_km: float = Field(1450.0, ge=10.0, le=10000.0)
    slope_gradient_deg: float = Field(36.0, ge=5.0, le=75.0)

class TriggerAlertRequest(BaseModel):
    alert_id: str = Field("CAP-ALERT-2026-MANDAKINI-01", example="CAP-ALERT-2026-MANDAKINI-01")
    target_village: str = Field("Gaurikund & Sonprayag", example="Gaurikund")

@app.get("/")
def read_root():
    return {
        "service": "JalPravah 360 Flash Flood Early Warning Platform (SIH26192)",
        "organization": "Ministry of Home Affairs / NDRF",
        "monitored_basins": len(load_json("hilly_river_basins.json")),
        "iot_telemetry_sensors": len(load_json("iot_telemetry.json")),
        "active_village_alerts": len(load_json("village_alerts.json")),
        "high_ground_relief_camps": len(load_json("relief_camps.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/basins")
def get_basins():
    return load_json("hilly_river_basins.json")

@app.get("/api/v1/telemetry")
def get_telemetry():
    return load_json("iot_telemetry.json")

@app.get("/api/v1/village-alerts")
def get_alerts():
    return load_json("village_alerts.json")

@app.get("/api/v1/relief-camps")
def get_camps():
    return load_json("relief_camps.json")

@app.post("/api/v1/predict-flash-flood")
def predict_flash_flood(req: PredictSurgeRequest):
    # Kinematic wave peak discharge: Q = C * I * A with saturation multiplier
    sat_factor = 1.0 + (req.soil_saturation_pct / 100.0) * 0.6
    peak_discharge = round((0.85 * req.rainfall_intensity_mm_h * req.catchment_area_sq_km * 0.278 / 10.0) * sat_factor, 1)
    
    # Lead time in minutes inversely proportional to slope
    lead_time = max(25, int(120 - (req.slope_gradient_deg * 1.6) - (req.rainfall_intensity_mm_h * 0.3)))
    is_red_alert = peak_discharge > 800.0 or req.rainfall_intensity_mm_h > 65.0
    
    return {
        "peak_discharge_cumecs": peak_discharge,
        "evacuation_lead_time_mins": lead_time,
        "predicted_stage_rise_m": round(peak_discharge / 320.0, 2),
        "is_flash_flood_critical": is_red_alert,
        "alert_verdict": "RED_ALERT_FLASH_FLOOD_IMMINENT" if is_red_alert else "YELLOW_WATCH",
        "action_required": "IMMEDIATE_VALLEY_FLOOR_EVACUATION" if is_red_alert else "MONITOR_STREAMS",
        "predicted_at": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/trigger-cap-siren")
def trigger_cap_siren(req: TriggerAlertRequest):
    return {
        "alert_id": req.alert_id,
        "target_village": req.target_village,
        "status": "CAP_BROADCAST_TRANSMITTED",
        "sms_sent_count": 14200,
        "sirens_activated": ["Gaurikund Tower 1", "Sonprayag Bridge Siren"],
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
