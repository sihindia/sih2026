"""
SIH26129: System Integration and Interoperability among Government Platforms (MahaSetu 360)
Government of Maharashtra / Maharashtra State Innovation Society
FastAPI Production Microservice with Federated Cross-Department API Mesh & Golden Citizen Records
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
    title="MahaSetu 360 Government Interoperability Platform (SIH26129) - Maharashtra",
    description="Federated Cross-Department API Middleware & Unified Service Delivery Mesh",
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

class OrchestrateAppRequest(BaseModel):
    citizen_name: str = Field("Rajeshwar Shinde", example="Rajeshwar Shinde")
    service_id: str = Field("MAHA-APP-2026-001", example="MAHA-APP-2026-001")

@app.get("/")
def read_root():
    return {
        "service": "MahaSetu 360 Government Interoperability Hub (SIH26129)",
        "organization": "Government of Maharashtra",
        "services_integrated": len(load_json("interoperable_citizen_services.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/services")
def get_services():
    return load_json("interoperable_citizen_services.json")

@app.get("/api/v1/connectors")
def get_connectors():
    return load_json("departmental_connectors_mesh.json")

@app.get("/api/v1/golden-records")
def get_records():
    return load_json("master_citizen_golden_records.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("mahasetu_stats.json")

@app.post("/api/v1/orchestrate-application")
def orchestrate_app(req: OrchestrateAppRequest):
    return {
        "application_id": req.service_id,
        "citizen": req.citizen_name,
        "workflow_state": "CROSS_DEPARTMENT_PARALLEL_APPROVED",
        "documents_auto_fetched": 6,
        "departments_queried": ["Mahabhulekh", "MahaDBT", "MSEDCL", "MEDA"],
        "actual_turnaround_days": 2.5,
        "statutory_sla_days": 15,
        "processed_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
