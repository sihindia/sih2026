"""
SIH26208: Student Innovation - Toys & Games Based on Indian Civilization, History & Culture
AICTE / Ministry of Education / MIC-Student Innovation
FastAPI Production Microservice with Vedic Board Mechanics, IKS Quests & Toycathon 3D Studio
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
    title="AICTE Bhartiya Sanskriti Toys & Games Innovation Platform (SIH26208)",
    description="Vedic Board Mechanics, Indian Knowledge Systems (IKS) Quests & Indigenous Toycathon Studio API",
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

class PlayMokshaRequest(BaseModel):
    current_position: int = Field(1, ge=1, le=64)
    player_name: str = Field("Student Player", example="Student Player")

class SolveQuestRequest(BaseModel):
    quest_id: str = Field("QUEST-IKS-01", example="QUEST-IKS-01")
    submitted_answer: str = Field(..., example="Interlocking 4:2:1 burnt bricks with lime mortar")

@app.get("/")
def read_root():
    return {
        "service": "AICTE Bhartiya Sanskriti Games Innovation Platform (SIH26208)",
        "organization": "AICTE, MIC-Student Innovation",
        "civilizational_games": len(load_json("civilizational_games.json")),
        "historical_quests": len(load_json("historical_quests.json")),
        "toycathon_toys_catalog": len(load_json("toycathon_toys.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/games")
def get_games():
    return load_json("civilizational_games.json")

@app.get("/api/v1/quests")
def get_quests():
    return load_json("historical_quests.json")

@app.get("/api/v1/toycathon")
def get_toycathon():
    return load_json("toycathon_toys.json")

@app.get("/api/v1/leaderboard")
def get_leaderboard():
    return load_json("student_leaderboard.json")

@app.get("/api/v1/quizzes")
def get_quizzes():
    return load_json("heritage_quizzes.json")

@app.post("/api/v1/play-turn-moksha-patam")
def play_turn_moksha_patam(req: PlayMokshaRequest):
    # 6 cowrie shells throw (values: 1 to 6)
    cowrie_dice = random.randint(1, 6)
    new_pos = req.current_position + cowrie_dice
    
    event = "NORMAL_PROGRESSION"
    event_desc = f"Advanced {cowrie_dice} steps via Cowrie Shell throw."
    
    # Check ladders & snakes
    ladders = { 12: (32, "Dharma (Righteousness)"), 28: (50, "Vidya (Wisdom)"), 36: (58, "Dhyana (Meditation)") }
    snakes = { 44: (22, "Krodha (Anger)"), 56: (18, "Lobha (Greed)"), 62: (14, "Ahankara (Ego)") }
    
    if new_pos in ladders:
        dest, virtue = ladders[new_pos]
        event = "KARMA_LADDER_ASCENSION"
        event_desc = f"Ascended via {virtue}! Climbed from {new_pos} to {dest}."
        new_pos = dest
    elif new_pos in snakes:
        dest, vice = snakes[new_pos]
        event = "VICE_SNAKE_DESCENT"
        event_desc = f"Encountered {vice}! Slid down from {new_pos} to {dest}."
        new_pos = dest
        
    if new_pos >= 64:
        new_pos = 64
        event = "MOKSHA_LIBERATION_ACHIEVED"
        event_desc = "Reached Cell 64: Spiritual Liberation & Victory!"
        
    return {
        "player": req.player_name,
        "cowrie_dice_throw": cowrie_dice,
        "new_position": new_pos,
        "event_type": event,
        "event_description": event_desc,
        "dharma_points_earned": cowrie_dice * 10 if event != "VICE_SNAKE_DESCENT" else 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
