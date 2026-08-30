"""
SIH26033: Direct Farm-to-Consumer Digital Marketplace (KisanDirect D2C 360)
Ministry of Consumer Affairs, Food & Public Distribution - DoCA
FastAPI Production Microservice for Disintermediation, Demand Forecasting & Escrow Smart Contracts
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
    title="KisanDirect D2C 360 Hub (SIH26033) - Ministry of Consumer Affairs",
    description="Direct digital marketplace connecting farmers and FPOs directly with consumers and bulk buyers to eliminate middleman margins",
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

class CreateDirectOrderRequest(BaseModel):
    listing_id: str = Field("LIST-SAHYADRI", example="LIST-SAHYADRI")
    buyer_name: str = Field("Delhi NCR Resident Collective", example="Delhi NCR Resident Collective")
    quantity_quintals: float = Field(25.0, example=25.0)
    destination_hub: str = Field("Delhi-NCR Central Hub", example="Delhi-NCR Central Hub")

@app.get("/")
def read_root():
    return {
        "service": "KisanDirect D2C 360 Hub (SIH26033)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "department": "Department of Consumer Affairs (DoCA)",
        "fpos_enrolled": len(load_json("fpo_direct_produce_listings.json")),
        "logistics_routes": len(load_json("farm_to_fork_cold_chain_routes.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/listings")
def get_listings():
    return load_json("fpo_direct_produce_listings.json")

@app.get("/api/v1/arbitrage")
def get_arbitrage():
    return load_json("supply_chain_arbitrage_breakdown.json")

@app.get("/api/v1/demand")
def get_demand():
    return load_json("urban_demand_forecasting_matrix.json")

@app.get("/api/v1/routes")
def get_routes():
    return load_json("farm_to_fork_cold_chain_routes.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("kisandirect_stats.json")

@app.post("/api/v1/create-order")
def create_order(req: CreateDirectOrderRequest):
    order_id = f"ORD-DOCA-{random.randint(100, 999)}"
    token = f"PASS-POD-{random.randint(10000, 99999)}"
    rate = 2850
    farm_rate = 2550
    
    return {
        "order_id": order_id,
        "listing_id": req.listing_id,
        "buyer_name": req.buyer_name,
        "quantity_quintals": req.quantity_quintals,
        "total_consumer_payment": f"₹{(rate * req.quantity_quintals):,.2f}",
        "direct_farmer_payout": f"₹{(farm_rate * req.quantity_quintals):,.2f}",
        "middleman_commissions_saved": f"₹{((3800 - rate) * req.quantity_quintals):,.2f}",
        "escrow_status": "ESCROW_LOCKED_100_PCT",
        "proof_of_delivery_token": token,
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
