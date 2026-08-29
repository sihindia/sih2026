"""
SIH26196: Student Innovation - Ideas to Boost Fitness Activities & Keep Fit (FitSetu 360)
AICTE / Ministry of Youth Affairs & Sports / Fit India Movement
FastAPI Production Microservice with AI Pose Posture Analyzer, Calorie Calculator & Desi Nutrition Engine
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
    title="FitSetu 360 AI Fitness Platform (SIH26196) - AICTE / Fit India",
    description="AI Computer Vision Posture Analyzer, Desi Nutrition Planner & Campus Fitness Grid API",
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

class AnalyzePoseRequest(BaseModel):
    exercise_id: str = Field("EX-STRENGTH-SQUAT-02", example="EX-STRENGTH-SQUAT-02")
    measured_knee_angle: float = Field(88.0, ge=30.0, le=180.0)
    measured_back_angle: float = Field(48.0, ge=10.0, le=90.0)

class CalorieBurnRequest(BaseModel):
    weight_kg: float = Field(68.0, ge=30.0, le=200.0)
    duration_mins: float = Field(30.0, ge=1.0, le=300.0)
    exercise_id: str = Field("EX-STRENGTH-SQUAT-02", example="EX-STRENGTH-SQUAT-02")

@app.get("/")
def read_root():
    return {
        "service": "FitSetu 360 AI Fitness Platform (SIH26196)",
        "organization": "AICTE, MIC-Student Innovation / Fit India",
        "exercises_catalogued": len(load_json("exercise_catalog.json")),
        "workout_plans": len(load_json("workout_plans.json")),
        "desi_nutrition_recipes": len(load_json("nutrition_plans.json")),
        "leaderboard_athletes": len(load_json("fitness_leaderboard.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/exercises")
def get_exercises():
    return load_json("exercise_catalog.json")

@app.get("/api/v1/workouts")
def get_workouts():
    return load_json("workout_plans.json")

@app.get("/api/v1/nutrition")
def get_nutrition():
    return load_json("nutrition_plans.json")

@app.get("/api/v1/leaderboard")
def get_leaderboard():
    return load_json("fitness_leaderboard.json")

@app.post("/api/v1/analyze-posture-angle")
def analyze_posture_angle(req: AnalyzePoseRequest):
    # Ideal squat: knee 90 deg, back 45 deg
    knee_diff = abs(req.measured_knee_angle - 90.0)
    back_diff = abs(req.measured_back_angle - 45.0)
    
    accuracy = max(50.0, round(100.0 - (knee_diff * 0.8 + back_diff * 0.6), 1))
    is_good = accuracy >= 85.0
    
    feedback = "PERFECT FORM! Full depth achieved without lumbar rounding." if is_good else "ADJUST POSTURE: Push hips slightly back and keep chest upright."
    
    return {
        "exercise_id": req.exercise_id,
        "posture_accuracy_pct": accuracy,
        "alignment_status": "EXCELLENT_FORM" if is_good else "NEEDS_CORRECTION",
        "real_time_voice_cue": feedback,
        "analyzed_at": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/calculate-calorie-burn")
def calculate_calorie_burn(req: CalorieBurnRequest):
    # Calories = MET * Weight(kg) * (Duration_hours)
    met = 5.5
    calories = round(met * req.weight_kg * (req.duration_mins / 60.0), 1)
    
    return {
        "weight_kg": req.weight_kg,
        "duration_mins": req.duration_mins,
        "total_calories_burned_kcal": calories,
        "equivalent_sattu_burn": f"{round(calories / 280.0, 1)} glasses of Sattu"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
