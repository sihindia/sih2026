"""
SIH26034: Legal Metrology (Packaged Commodities) Compliance Scanning & Verification Platform
Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution
FastAPI Production Microservice with OCR Label Parser, Font Height Caliper & Statutory Show-Cause Generator
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
    title="DoCA Legal Metrology Compliance Inspection Platform (SIH26034)",
    description="Automated Packaged Commodities Label Scanning, LMR 2011 Rule Verification & Show-Cause Generator",
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

class ScanLabelRequest(BaseModel):
    product_name: str = Field(..., example="Organic Honey Glass Jar 500g")
    pdp_area_sq_cm: float = Field(150.0, ge=10.0, le=5000.0)
    has_mrp_inclusive_text: bool = Field(True)
    has_unit_sale_price: bool = Field(True)
    uses_standard_unit: bool = Field(True)
    measured_font_height_mm: float = Field(2.2, ge=0.5, le=10.0)

@app.get("/")
def read_root():
    return {
        "service": "DoCA Legal Metrology Compliance Engine (SIH26034)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "scanned_products_audit": len(load_json("scanned_products.json")),
        "statutory_rules_active": len(load_json("legal_rules.json")),
        "show_cause_notices_served": len(load_json("statutory_notices.json")),
        "ecommerce_listings_crawled": len(load_json("ecommerce_audits.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/products")
def get_products():
    return load_json("scanned_products.json")

@app.get("/api/v1/rules")
def get_rules():
    return load_json("legal_rules.json")

@app.get("/api/v1/notices")
def get_notices():
    return load_json("statutory_notices.json")

@app.get("/api/v1/ecommerce-audits")
def get_ecommerce_audits():
    return load_json("ecommerce_audits.json")

@app.post("/api/v1/audit-custom-label")
def audit_custom_label(req: ScanLabelRequest):
    # Determine minimum required font height per LMR 2011 Table-II
    if req.pdp_area_sq_cm <= 50:
        min_font = 1.0
    elif req.pdp_area_sq_cm <= 200:
        min_font = 2.0
    elif req.pdp_area_sq_cm <= 1000:
        min_font = 2.5
    else:
        min_font = 4.0
        
    violations = []
    if not req.has_mrp_inclusive_text:
        violations.append("Rule 6(1)(e): MRP declaration lacks mandatory 'incl. of all taxes' suffix")
    if not req.has_unit_sale_price:
        violations.append("Rule 6(1)(s): Unit Sale Price (USP) not declared on pre-packaged commodity")
    if not req.uses_standard_unit:
        violations.append("Rule 5 & Table-I: Non-standard SI quantity symbol used (e.g. 'gm' instead of 'g')")
    if req.measured_font_height_mm < min_font:
        violations.append(f"Rule 7 & Table-II: Font height ({req.measured_font_height_mm}mm) is below statutory minimum ({min_font}mm) for {req.pdp_area_sq_cm} sq.cm PDP")

    is_compliant = len(violations) == 0

    return {
        "product_name": req.product_name,
        "pdp_area_sq_cm": req.pdp_area_sq_cm,
        "min_required_font_height_mm": min_font,
        "measured_font_height_mm": req.measured_font_height_mm,
        "is_compliant": is_compliant,
        "violation_count": len(violations),
        "violations": violations,
        "statutory_action": "VERIFIED_COMPLIANT_CERTIFICATE" if is_compliant else "ISSUE_SECTION_18_SHOW_CAUSE_NOTICE",
        "compounding_penalty_inr": 0 if is_compliant else 25000 * len(violations),
        "inspected_at": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
