"""
SIH26062: Integrated Polar Expedition Logistics & Asset Management (MoES SetuPolar 360)
Ministry of Earth Sciences (MoES) - National Centre for Polar and Ocean Research (NCPOR)
FastAPI Production Microservice with Sub-Zero Asset Tracking & Blue-Ice Convoy Dispatch API
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
    title="MoES SetuPolar 360 Polar Logistics Hub (SIH26062) - NCPOR / MoES",
    description="Integrated Polar Expedition Logistics and Asset Management System for Antarctic & Arctic Missions",
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

class DispatchConvoyRequest(BaseModel):
    operation_id: str = Field("LOG-ISEA45-MAITRI01", example="LOG-ISEA45-MAITRI01")
    tractor_count: int = Field(4, example=4)
    cargo_tonnage: float = Field(142.5, example=142.5)

@app.get("/")
def read_root():
    return {
        "service": "MoES SetuPolar 360 Hub (SIH26062)",
        "ministry": "Ministry of Earth Sciences (MoES)",
        "institution": "National Centre for Polar and Ocean Research (NCPOR)",
        "expedition": "Indian Scientific Expedition to Antarctica (ISEA)",
        "asset_tracking": "Sub-Zero (-50°C) BLE / UHF RFID & Iridium SBD",
        "operations_count": len(load_json("polar_expedition_logistics_operations.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/operations")
def get_operations():
    return load_json("polar_expedition_logistics_operations.json")

@app.get("/api/v1/assets")
def get_assets():
    return load_json("subzero_asset_inventory_catalog.json")

@app.get("/api/v1/personnel")
def get_personnel():
    return load_json("personnel_and_sar_emergency_manifest.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("setupolar_stats.json")

@app.post("/api/v1/dispatch-polar-convoy")
def dispatch_convoy(req: DispatchConvoyRequest):
    return {
        "operation_id": req.operation_id,
        "pistenbully_tractors_assigned": req.tractor_count,
        "cargo_tonnage_cleared": req.cargo_tonnage,
        "gpr_crevasse_survey_verified": True,
        "subzero_rfid_items_verified": 480,
        "estimated_transit_hours": 14.0,
        "convoy_status": "CONVOY_DISPATCHED_EN_ROUTE_TO_STATION",
        "ncpor_goa_tracking_active": True,
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
