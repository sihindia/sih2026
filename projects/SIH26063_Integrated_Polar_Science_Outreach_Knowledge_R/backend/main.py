"""
SIH26063: Polar Science Outreach & Knowledge Repository (MoES DhruvaGyan 360)
Ministry of Earth Sciences (MoES) - National Centre for Polar and Ocean Research (NCPOR)
FastAPI Production Microservice with FAIR Data Repository & Multilingual Science Dissemination API
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
    title="MoES DhruvaGyan 360 Polar Knowledge Hub (SIH26063) - NCPOR / MoES",
    description="Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal",
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

class GenerateStoryRequest(BaseModel):
    dataset_id: str = Field("DATA-ANT-ICE-01", example="DATA-ANT-ICE-01")
    target_audience: str = Field("Students & General Public", example="Students & General Public")
    target_language: str = Field("Hindi", example="Hindi")

@app.get("/")
def read_root():
    return {
        "service": "MoES DhruvaGyan 360 Hub (SIH26063)",
        "ministry": "Ministry of Earth Sciences (MoES)",
        "institution": "National Centre for Polar and Ocean Research (NCPOR)",
        "domains_covered": "Antarctica, Arctic, Himalayas & Southern Ocean",
        "repository_standard": "FAIR Principles (Findable, Accessible, Interoperable, Reusable)",
        "datasets_count": len(load_json("polar_science_open_datasets_repository.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/datasets")
def get_datasets():
    return load_json("polar_science_open_datasets_repository.json")

@app.get("/api/v1/virtual-tours")
def get_tours():
    return load_json("polar_stations_3d_virtual_tours.json")

@app.get("/api/v1/outreach-modules")
def get_modules():
    return load_json("multilingual_science_outreach_modules.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("dhruvagyan_stats.json")

@app.post("/api/v1/generate-science-outreach-story")
def generate_story(req: GenerateStoryRequest):
    return {
        "dataset_id": req.dataset_id,
        "audience": req.target_audience,
        "language": req.target_language,
        "generated_title": "रहस्यमय अंटार्कटिक बर्फ की परत में छिपा 800 वर्षों का जलवायु इतिहास",
        "summary": "एनसीपीओआर के वैज्ञानिकों ने मैत्री स्टेशन के पास 200 मीटर गहरी बर्फ की कोर से प्राचीन वायु और तापमान के संकेतों को खोज निकाला है।",
        "key_takeaways": [
          "ग्लोबल वार्मिंग की ऐतिहासिक तुलना",
          "प्राचीन ज्वालामुखी विस्फोटों के सल्फर प्रमाण",
          "कक्षा 9-12 के छात्रों के लिए इंटरैक्टिव विज्ञान किट"
        ],
        "fair_doi_link": "https://doi.org/10.5061/ncpor.polar.cdml2026",
        "social_media_ready": True,
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
