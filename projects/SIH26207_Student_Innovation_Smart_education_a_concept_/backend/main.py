"""
SIH26207: Student Innovation - Smart Education Platform for Digital Age (VidyaSetu AI)
AICTE / Ministry of Education / MIC-Student Innovation
FastAPI Production Microservice with Adaptive Knowledge Graph, Bhashini Vernacular Engine & ABC Micro-Credentials
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
    title="VidyaSetu AI Smart Education Platform (SIH26207) - AICTE",
    description="Adaptive Learning Paths, Socratic AI Doubt Solver & ABC Micro-Credentials API",
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

class AskDoubtRequest(BaseModel):
    student_question: str = Field(..., example="How does an AVL tree decide whether to do a single or double rotation?")
    module_id: str = Field("MOD-CS-DSA-01", example="MOD-CS-DSA-01")

class RunDiagnosticRequest(BaseModel):
    student_name: str = Field("Student Learner", example="Student Learner")
    quiz_score_pct: float = Field(85.0, ge=0.0, le=100.0)

@app.get("/")
def read_root():
    return {
        "service": "VidyaSetu AI Smart Education Platform (SIH26207)",
        "organization": "AICTE, MIC-Student Innovation / MoE",
        "learning_modules_active": len(load_json("learning_modules.json")),
        "adaptive_paths_tracked": len(load_json("adaptive_paths.json")),
        "virtual_lab_experiments": len(load_json("virtual_experiments.json")),
        "microcredentials_verified": len(load_json("student_microcredentials.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/modules")
def get_modules():
    return load_json("learning_modules.json")

@app.get("/api/v1/paths")
def get_paths():
    return load_json("adaptive_paths.json")

@app.get("/api/v1/glossary")
def get_glossary():
    return load_json("vernacular_glossary.json")

@app.get("/api/v1/experiments")
def get_experiments():
    return load_json("virtual_experiments.json")

@app.get("/api/v1/credentials")
def get_credentials():
    return load_json("student_microcredentials.json")

@app.post("/api/v1/socratic-ai-tutor")
def socratic_ai_tutor(req: AskDoubtRequest):
    return {
        "question": req.student_question,
        "socratic_hint_1": "Consider the sign of the balance factors between the parent node and its heavy child.",
        "socratic_hint_2": "If the parent has a balance factor of +2 (Left-heavy) and the left child has a balance factor of -1 (Right-heavy), what zig-zag shape does this form?",
        "recommended_interactive_lab": "EXP-CS-BST-01 (AVL Self-Righting Lab)",
        "conceptual_key": "Same Signs = Single Rotation (LL or RR). Opposite Signs = Double Rotation (LR or RL)."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
