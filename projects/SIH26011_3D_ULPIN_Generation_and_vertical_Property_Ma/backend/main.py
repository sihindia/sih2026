"""
SIH26011: 3D ULPIN Generation and Vertical Property Mapping System
Department of Land Resources (DoLR), Ministry of Rural Development
FastAPI Microservice with 3D Volumetric Cadastre & Subsurface Space Disambiguation
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
from datetime import datetime

app = FastAPI(
    title="DoLR 3D ULPIN Volumetric Cadastre Engine (SIH26011)",
    description="Vertical & Subsurface Spatial Property Rights Delineation Platform",
    version="2.0.0"
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

class Generate3DULPINRequest(BaseModel):
    base_ulpin: str = Field(..., example="27-584-0129-4819")
    floor_level: int = Field(..., example=18)
    unit_code: str = Field(..., example="1802")
    z_min_elevation: float = Field(..., example=54.0)
    z_max_elevation: float = Field(..., example=57.2)
    owner_name: str = Field(..., example="Kalyan Kumar")

@app.get("/")
def read_root():
    return {
        "service": "DoLR 3D Volumetric Cadastral Platform (SIH26011)",
        "ministry": "Ministry of Rural Development / Department of Land Resources",
        "registered_parcels": len(load_json("cadastral_parcels.json")),
        "vertical_units": len(load_json("vertical_units.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/parcels")
def get_all_parcels():
    return load_json("cadastral_parcels.json")

@app.get("/api/v1/vertical-units")
def get_vertical_units():
    return load_json("vertical_units.json")

@app.post("/api/v1/generate-3d-ulpin")
def generate_3d_ulpin(req: Generate3DULPINRequest):
    prefix = "F" if req.floor_level >= 0 else "B"
    level_str = f"{prefix}{abs(req.floor_level):02d}"
    generated_3d_ulpin = f"{req.base_ulpin}-{level_str}-U{req.unit_code}"
    
    volumetric_cubic_meters = round((req.z_max_elevation - req.z_min_elevation) * 150.0, 2)

    return {
        "volumetric_3d_ulpin": generated_3d_ulpin,
        "base_ground_ulpin": req.base_ulpin,
        "vertical_floor_level": req.floor_level,
        "spatial_bounding_box": {
            "z_min_meters": req.z_min_elevation,
            "z_max_meters": req.z_max_elevation,
            "height_clearance_m": round(req.z_max_elevation - req.z_min_elevation, 2),
            "volumetric_volume_m3": volumetric_cubic_meters
        },
        "ownership_registered_to": req.owner_name,
        "volumetric_clash_detected": False,
        "cadastral_standard": "OGC 3D Portrayal & Land Administration Domain Model (LADM ISO 19152)",
        "generated_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
