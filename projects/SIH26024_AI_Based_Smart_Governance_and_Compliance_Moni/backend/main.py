"""
SIH26024: AI-Based Smart Governance & Compliance Monitoring System for Coal Mines
Ministry of Coal / Coal India Limited (CIL)
FastAPI Microservice with Statutory DGMS/SPCB Compliance Analytics & Automated Incident Escalations
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
from datetime import datetime

app = FastAPI(
    title="CIL Smart Mine Governance & DGMS Compliance Platform (SIH26024)",
    description="Automated Mine Safety Tracking, Environmental Quality & Blockchain Audit Log",
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

@app.get("/")
def read_root():
    return {
        "service": "CIL Smart Coal Mine Governance Platform (SIH26024)",
        "ministry": "Ministry of Coal",
        "mines_monitored": len(load_json("compliance_records.json")),
        "active_violations": len(load_json("inspection_violations.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/compliance-records")
def get_compliance_records():
    return load_json("compliance_records.json")

@app.get("/api/v1/violations")
def get_violations():
    return load_json("inspection_violations.json")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
