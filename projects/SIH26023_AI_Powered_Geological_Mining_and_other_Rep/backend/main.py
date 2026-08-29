"""
SIH26023: AI-Powered Geological, Mining & Statutory Reporting Solution
Ministry of Coal / Coal India Limited (CIL) & CMPDI
FastAPI Microservice with Automated Parliamentary Question Draft Generator & Geological Analytics
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
from datetime import datetime

app = FastAPI(
    title="CMPDI / CIL AI Mining & Parliamentary Reporting Solution (SIH26023)",
    description="Automated Production Synthesis & Parliamentary Inquiry Response Platform",
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
        "service": "CIL / CMPDI AI Geological Reporting Engine (SIH26023)",
        "ministry": "Ministry of Coal",
        "subsidiaries_integrated": len(load_json("cil_subsidiaries.json")),
        "parliamentary_inquiries": len(load_json("parliamentary_inquiries.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/subsidiaries")
def get_subsidiaries():
    return load_json("cil_subsidiaries.json")

@app.get("/api/v1/parliament-inquiries")
def get_inquiries():
    return load_json("parliamentary_inquiries.json")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
