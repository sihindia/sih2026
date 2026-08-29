"""
SIH26197: Student Innovation - Showcase Rich Cultural Heritage & Traditions of India (Dharohar360)
AICTE / Ministry of Culture / Archaeological Survey of India (ASI)
FastAPI Production Microservice with 3D Monument Explorer, UNESCO ICH Traditions & GI Artisan Registry
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
    title="Dharohar360 Indian Cultural Heritage Platform (SIH26197) - AICTE / ASI",
    description="3D Monument Photogrammetry, UNESCO ICH Traditions, Cultural Trails & GI Artisan Registry API",
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

class GenerateTrailRequest(BaseModel):
    region_preference: str = Field("South India", example="South India")
    interests: List[str] = Field(["Dravidian Architecture", "Bronze Metallurgy"], example=["Dravidian Architecture", "Bronze Metallurgy"])
    duration_days: int = Field(4, ge=2, le=14)

@app.get("/")
def read_root():
    return {
        "service": "Dharohar360 Cultural Heritage Platform (SIH26197)",
        "organization": "AICTE, MIC-Student Innovation / Ministry of Culture",
        "monuments_digitized": len(load_json("monuments_3d_archive.json")),
        "ich_traditions": len(load_json("intangible_heritage.json")),
        "cultural_trails": len(load_json("cultural_trails.json")),
        "gi_artisans_certified": len(load_json("artisan_marketplace.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/monuments")
def get_monuments():
    return load_json("monuments_3d_archive.json")

@app.get("/api/v1/ich-traditions")
def get_ich():
    return load_json("intangible_heritage.json")

@app.get("/api/v1/trails")
def get_trails():
    return load_json("cultural_trails.json")

@app.get("/api/v1/artisans")
def get_artisans():
    return load_json("artisan_marketplace.json")

@app.post("/api/v1/generate-cultural-trail")
def generate_cultural_trail(req: GenerateTrailRequest):
    return {
        "trail_name": f"AI-Curated {req.region_preference} Heritage & Knowledge Journey",
        "duration_days": req.duration_days,
        "themes": req.interests,
        "itinerary": [
            { "day": 1, "destination": "Brihadisvara Temple (Thanjavur)", "activity": "Acoustic frequency & granite interlock study" },
            { "day": 2, "destination": "Swamimalai Lost-Wax Bronze Foundry", "activity": "Master artisan metallurgy workshop" }
        ],
        "generated_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
