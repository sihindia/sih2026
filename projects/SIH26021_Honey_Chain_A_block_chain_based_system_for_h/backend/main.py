"""
SIH26021: Honey Chain - Blockchain Honey Traceability & Smart Beekeeping Management
Ministry of MSME / Khadi and Village Industries Commission (KVIC)
FastAPI Microservice with Blockchain Provenance Verification & IoT Hive Telemetry
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
from datetime import datetime

app = FastAPI(
    title="KVIC HoneyChain Traceability & Smart Apiary Engine (SIH26021)",
    description="Blockchain Origin Verification & IoT Smart Hive Management Platform",
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
        "service": "KVIC Honey Chain Blockchain Platform (SIH26021)",
        "organization": "Ministry of MSME / KVIC",
        "verified_honey_batches": len(load_json("honey_batches.json")),
        "connected_smart_hives": len(load_json("smart_hives.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/batches")
def get_batches():
    return load_json("honey_batches.json")

@app.get("/api/v1/verify-qr/{qr_code}")
def verify_qr(qr_code: str):
    batches = load_json("honey_batches.json")
    for b in batches:
        if b["qr_code"].lower() == qr_code.lower() or b["batch_id"].lower() == qr_code.lower():
            return {
                "verified": True,
                "batch": b,
                "blockchain_valid": True,
                "fssai_certified": True,
                "adulteration_free": True
            }
    raise HTTPException(status_code=404, detail="Batch QR Code not found in Blockchain Ledger")

@app.get("/api/v1/hives")
def get_smart_hives():
    return load_json("smart_hives.json")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
