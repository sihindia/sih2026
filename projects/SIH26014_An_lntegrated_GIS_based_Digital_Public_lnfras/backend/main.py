"""
SIH26014: Integrated GIS-Based Digital Public Infrastructure for Land Governance (DoLR LandStack 360)
Ministry of Rural Development - Department of Land Resources (DoLR)
FastAPI Production Microservice with 3-Tier DPI Land Stack, Bhu-Aadhaar & Open API Gateway
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
    title="DoLR LandStack 360 DPI Hub (SIH26014) - DoLR / Ministry of Rural Development",
    description="An lntegrated GIS-based Digital Public lnfrastructure for Land Governance",
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

class QueryULPINRequest(BaseModel):
    ulpin: str = Field("04-001-9012-3341", example="04-001-9012-3341")

@app.get("/")
def read_root():
    return {
        "service": "DoLR LandStack 360 Hub (SIH26014)",
        "ministry": "Ministry of Rural Development",
        "department": "Department of Land Resources (DoLR)",
        "national_pilots": ["Chandigarh (UT)", "Tamil Nadu (TN)"],
        "launch_date": "31 December 2025",
        "parcels_registered": len(load_json("land_stack_dpi_parcels_and_ro_r.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/parcels")
def get_parcels():
    return load_json("land_stack_dpi_parcels_and_ro_r.json")

@app.get("/api/v1/layers")
def get_layers():
    return load_json("dpi_three_tier_layers_architecture.json")

@app.get("/api/v1/apis")
def get_apis():
    return load_json("open_api_departmental_endpoints.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("landstack_stats.json")

@app.post("/api/v1/landstack/search-ulpin")
def search_ulpin(req: QueryULPINRequest):
    return {
        "ulpin": req.ulpin,
        "base_cadastre": "Georeferenced Survey Parcel 3341 (Sub-5cm ORI Ground Truth)",
        "essential_rights": "RoR Mutation Cleared • Commercial Central Zoning",
        "usecase_services": "Property Tax: ₹1,45,000/yr Paid",
        "citizen_bhu_aadhaar_card": "BHU-AADHAAR-DSC-VALIDATED",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
