"""
SIH26003: AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in NER
Ministry of Development of North Eastern Region (MDoNER)
FastAPI Backend with Cognitive Scoring Engine & Medication Reminder Dispatcher
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
from datetime import datetime

app = FastAPI(
    title="MDoNER Dementia Cognitive Assistance Engine (SIH26003)",
    description="Adaptive Cognitive Therapeutics & Caregiver Monitoring Platform for NER",
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

class GameScoreSubmission(BaseModel):
    patient_id: str
    game_id: str
    time_taken_seconds: float
    mistakes_count: int
    completed_pairs: int

@app.get("/")
def read_root():
    return {
        "service": "MDoNER Dementia Care & Cognitive Assistance Platform (SIH26003)",
        "region": "North Eastern Region (NER), India",
        "registered_patients": len(load_json("patients.json")),
        "cognitive_games": len(load_json("games.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/patients")
def get_patients():
    return load_json("patients.json")

@app.get("/api/v1/games")
def get_games():
    return load_json("games.json")

@app.get("/api/v1/reminders")
def get_reminders():
    return load_json("reminders.json")

@app.post("/api/v1/submit-game-score")
def submit_game_score(score: GameScoreSubmission):
    accuracy = max(50.0, round(100.0 - (score.mistakes_count * 12.5), 1))
    mmse_delta = +1 if accuracy > 85.0 else 0

    return {
        "patient_id": score.patient_id,
        "session_accuracy_pct": accuracy,
        "reaction_time_seconds": score.time_taken_seconds,
        "cognitive_performance_status": "EXCELLENT RECALL" if accuracy >= 80 else "MODERATE ATTENTION",
        "adapted_next_difficulty": "Level 3 (Challenging)" if accuracy >= 85 else "Level 2 (Reinforcement)",
        "recorded_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
