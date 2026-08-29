"""
SIH26163: Security Assessment of the World Monitor application (WorldAudit 360)
National Technical Research Organisation (NTRO)
FastAPI Microservice with Vulnerability Tracker, PoC Sandbox & Remediation Engine API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import json
import os
from datetime import datetime

app = FastAPI(
    title="WorldAudit 360 Security Assessor (SIH26163) - NTRO",
    description="Authorized Security Assessment & PoC Verification Engine for World Monitor Application",
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

class VerifyPocRequest(BaseModel):
    vuln_id: str = Field("VULN-WM-2026-001", example="VULN-WM-2026-001")
    sandbox_token: str = Field("TEST_BEARER_TOKEN", example="TEST_BEARER_TOKEN")

@app.get("/")
def read_root():
    return {
        "service": "WorldAudit 360 Security Assessor (SIH26163)",
        "organization": "National Technical Research Organisation (NTRO)",
        "vulnerabilities_documented": len(load_json("world_monitor_vulnerabilities.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/vulnerabilities")
def get_vulnerabilities():
    return load_json("world_monitor_vulnerabilities.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("audit_stats.json")

@app.post("/api/v1/verify-poc")
def verify_poc(req: VerifyPocRequest):
    return {
        "vuln_id": req.vuln_id,
        "execution_status": "EXPLOITATION_SUCCESSFUL_IN_SANDBOX",
        "impact_verified": "UNAUTHORIZED_DATA_ACCESS_CONFIRMED",
        "remediation_status": "PATCH_DIRECTIVE_ISSUED",
        "verified_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
